#!/usr/bin/env bash
set -euo pipefail

DOMAIN="start-from-zero-phone.top"
REPO="https://github.com/moka992/start-from-zero-phone.git"
SRC="/opt/start-from-zero-phone"
TAG_V1="v1.0.5"
TAG_V2="v2.0.1"

WEB_SELECTOR="/var/www/start-from-zero-phone-selector"
WEB_V1="/var/www/start-from-zero-phone-v105"
WEB_V2="/var/www/start-from-zero-phone-v201"

ensure_repo() {
  if [ -d "$SRC/.git" ]; then
    git -C "$SRC" fetch --tags origin
  else
    git clone --depth=1 "$REPO" "$SRC"
    git -C "$SRC" fetch --tags origin
  fi
}

force_fetch_tag() {
  local tag="$1"
  git -C "$SRC" tag -d "$tag" >/dev/null 2>&1 || true
  git -C "$SRC" fetch origin "refs/tags/${tag}:refs/tags/${tag}"
}

deploy_tag() {
  local tag="$1"
  local target="$2"
  git -C "$SRC" checkout -f "tags/${tag}"
  mkdir -p "$target"
  rsync -av --delete "$SRC/手机端简化版/" "$target/"
}

main() {
  echo "[1/5] 准备仓库: $SRC"
  ensure_repo

  echo "[2/5] 拉取标签: $TAG_V1, $TAG_V2"
  force_fetch_tag "$TAG_V1"
  force_fetch_tag "$TAG_V2"

  echo "[3/5] 部署版本目录"
  deploy_tag "$TAG_V1" "$WEB_V1"
  deploy_tag "$TAG_V2" "$WEB_V2"

  echo "[4/5] 部署版本选择页"
  # 选择页模板仅在 main 分支维护，不在历史 tag 中，先切回 main 再同步。
  git -C "$SRC" checkout -f origin/main
  mkdir -p "$WEB_SELECTOR"
  rsync -av --delete "$SRC/deploy/selector/" "$WEB_SELECTOR/"

  chown -R www-data:www-data "$WEB_SELECTOR" "$WEB_V1" "$WEB_V2"

  echo "[5/5] 重载 Nginx"
  nginx -t
  systemctl reload nginx

  echo "部署完成"
  echo "选择页: https://${DOMAIN}/"
  echo "v1: https://${DOMAIN}/v1/"
  echo "v2: https://${DOMAIN}/v2/"
}

main "$@"
