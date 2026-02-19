# 多版本文件化部署（v1 + v2）

本目录用于把部署动作“文件化”，避免长期维护一条很长的命令。

## 目录说明

- `nginx/start-from-zero-phone.multiversion.conf`
  - Nginx 站点配置模板（根路径版本选择页 + `/v1/` + `/v2/`）
- `selector/index.html`
  - 版本选择页模板
- `scripts/deploy-multiversion.sh`
  - 一键部署脚本（按 Git tag 拉取并部署）

## 一次性初始化（服务器）

1. 把本仓库拉到服务器（例如 `/opt/start-from-zero-phone`）
2. 安装 Nginx 配置模板到站点配置
3. 执行部署脚本

### 推荐执行顺序

```bash
cd /opt/start-from-zero-phone
sudo cp deploy/nginx/start-from-zero-phone.multiversion.conf /etc/nginx/sites-available/start-from-zero-phone
sudo ln -sf /etc/nginx/sites-available/start-from-zero-phone /etc/nginx/sites-enabled/start-from-zero-phone
sudo nginx -t && sudo systemctl reload nginx
sudo bash deploy/scripts/deploy-multiversion.sh
```

## 日常更新

只需在服务器执行：

```bash
cd /opt/start-from-zero-phone
sudo git fetch --tags origin
sudo git reset --hard origin/main
sudo bash deploy/scripts/deploy-multiversion.sh
```

## 可调参数

打开 `deploy/scripts/deploy-multiversion.sh` 可修改：

- `DOMAIN` 域名
- `TAG_V1` 旧版本标签（默认 `v1.0.5`）
- `TAG_V2` 新版本标签（默认 `v2.0.1`）
- 各版本发布目录路径
