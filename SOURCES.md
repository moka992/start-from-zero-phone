# 数据来源与估算口径（更新于 2026-02-16）

本项目中的价格是“用于游戏平衡的估算值”，不是供应链合同价。

## 1) SoC 型号范围（官方规格来源）
- Qualcomm Snapdragon 8 Elite: https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-elite-mobile-platform
- Qualcomm Snapdragon 8 Elite Gen 5 Product Brief: https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/snapdragon-8-elite-gen-5-product-brief.pdf
- Qualcomm Snapdragon 7s Gen 3 Product Brief: https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/snapdragon-7s-gen-3-product-brief.pdf
- MediaTek Helio G81: https://www.mediatek.com/products/smartphones-2/mediatek-helio-g81
- MediaTek Dimensity 7300: https://www.mediatek.com/products/smartphones-2/mediatek-dimensity-7300
- UNISOC T7225: https://www.unisoc.com/en_us/home/TZNSQYCP/about/38/1742

## 2) 成本锚点（公开拆解转述）
- Galaxy S25 Ultra BoM (TechInsights 转述): https://electronics360.globalspec.com/article/21108/galaxy-s25-ultra-material-costs-estimated-at-528
  - 文中给出的关键锚点（USD）：
    - SoC subsystem: 145
    - Display subsystem: 42.42
    - Memory subsystem: 66.89
    - Main frame: 19.60
- Huawei Mate 60 Pro+ BoM (TechInsights 转述): https://electronics360.globalspec.com/article/20319/huawei-mate-60-pro-material-costs-revealed
  - 文中给出的关键锚点（USD）：
    - SoC subsystem: 65
    - Memory subsystem: 49.04
    - Display subsystem: 29.18

## 2.1) 存储涨价周期参考（TrendForce）
- DDR4/LPDDR4X 供应偏紧与涨价：
  - https://www.trendforce.com/presscenter/news/20250707-12633.html
  - https://www.trendforce.com/presscenter/news/20250811-12667.html
- DDR5 价格上行：
  - https://www.trendforce.com/presscenter/news/20251029-12758.html
- NAND / UFS 涨价：
  - https://www.trendforce.com/presscenter/news/20250709-12638.html
  - https://www.trendforce.com/presscenter/news/20250925-12736.html
  - https://www.trendforce.com/presscenter/news/20251201-12807.html

## 3) 屏幕厂商与传感器产品来源
- BOE OLED: https://www.boe.com/en/technology/oled/
- TCL CSOT smart device display: https://www.tcl.com/global/en/tcl-csot/products/smart-device-display
- Tianma small-medium display: https://www.tianma.com/en/products/small-medium-size-display/
- OmniVision OV50H: https://www.ovt.com/products/ov50h40/
- OmniVision OV13B10: https://www.ovt.com/products/ov13b10/
- Samsung ISOCELL HP2: https://semiconductor.samsung.com/image-sensor/mobile-image-sensor/isocell-hp2/

## 4) 估算方法
- 汇率假设：1 USD ~= 7.2 CNY。
- 先用旗舰机公开 BoM 锚定“组件相对权重”。
- 再按性能档位、工艺难度、供应商溢价、特性堆叠做比例缩放。
- 屏幕采用：材质基价 * 尺寸系数 * 比例切割系数 * 厂商系数 + 特性加价。
- 电池采用体积约束：
  - 能量换算 Wh = mAh * 3.85 / 1000
  - 体积估算基于有效体积能量密度约 560 Wh/L（含封装与结构折损）
  - 当电池体积显著超过可用空间时判定设计不可行。

## 5) 使用建议
- 若你后续要做“更真实采购模拟”，建议把供应商拆成：
  - 现货 / 合约 / 包销
  - MOQ 阶梯价
  - 交期风险（延期、良率波动）

## 6) 区域销量参数说明
- 中国区域内“省级人口规模”和“线上渗透率”在本版本用于游戏建模（加权汇总为区域系数）。
- 参数口径为近年公开统计的近似值，用于相对比较，不作为精确统计发布数据。

## 7) 企业命名违禁词词典来源（用于游戏内容审核）
- 敏感词库（综合分类，含政治/涉黄/暴恐/人物等）：
  - https://github.com/TianShengg/sensitive-vocabulary
- 具体分类文件（原始文本）：
  - 涉黄类：`https://raw.githubusercontent.com/TianShengg/sensitive-vocabulary/main/%E6%B6%89%E9%BB%84%E7%B1%BB.txt`
  - 暴恐类：`https://raw.githubusercontent.com/TianShengg/sensitive-vocabulary/main/%E6%9A%B4%E6%81%90%E7%B1%BB.txt`
  - 涉政类：`https://raw.githubusercontent.com/TianShengg/sensitive-vocabulary/main/%E6%B6%89%E6%94%BF%E7%B1%BB.txt`
  - 反动词库：`https://raw.githubusercontent.com/TianShengg/sensitive-vocabulary/main/%E5%8F%8D%E5%8A%A8%E8%AF%8D%E5%BA%93.txt`
  - 领导人名库：`https://raw.githubusercontent.com/TianShengg/sensitive-vocabulary/main/%E9%A2%86%E5%AF%BC%E4%BA%BA%E5%90%8D%E5%BA%93.txt`
- 其他开源词库（交叉校对）：
  - Konsheng 敏感词库（多维度分类）：`https://github.com/konsheng/Sensitive-lexicon`
  - jkiss 屏蔽词库（分类文本）：`https://github.com/jkiss/blockedwords`
  - jkiss 政治类原始文本示例：`https://raw.githubusercontent.com/jkiss/blockedwords/master/R34S4S5A6M7P8E9%E7%B1%BB.txt`
