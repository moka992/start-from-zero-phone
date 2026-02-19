const RMB = (v) => `¥${Math.round(v).toLocaleString('zh-CN')}`;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rnd = (a, b) => Math.random() * (b - a) + a;
const GAME_VERSION = '2.0.0';
const SECRET_TEST_CODE = 'RIKAKA-NEO-2014';
const SECRET_TEST_TRIGGER_TAPS = 7;
const SECRET_TEST_TAP_WINDOW_MS = 2200;
const BENCHMARK_NAME = 'GeekBeak G6';
const FIXED_COMPANY_NAME = 'StartPhone';
const FIXED_MODEL_BASE_NAME = 'Neo';
const BENCHMARK_BASELINE_LEGACY = {
  // 2018年前基线（魔改命名）：参考 OnePlus 2 / Snapdragon 810 公开历史跑分后换算。
  name: '双极 2S（砂岩）',
  antutu10: 235000,
  geekbench6Single: 430,
  geekbench6Multi: 1450,
  total: 78
};
const BENCHMARK_BASELINE_MODERN = {
  name: '果核 R²',
  // Nut R2-like baseline for gameplay readability.
  antutu10: 744600,
  geekbench6Single: 1231,
  geekbench6Multi: 3532,
  total: 115
};
const BENCH_COMPONENT_BASELINE = {
  soc: {
    antutu10: 744600,
    geekbench6Single: 1231,
    geekbench6Multi: 3532
  },
  storage: {
    read: 2100,
    write: 1200,
    ramScore: 17,
    romScore: 18
  },
  // 约对应 2025 初代默认设计中“中高端 OLED + 常见特性”的显示表现。
  displayScore: 82,
  // 约对应“大底主摄 + 超广 + 长焦 + 常见前摄”的综合影像配置。
  cameraComposite: 66
};
const BATTERY_BASELINE = {
  name: '果核 R²',
  hours: 8.8,
  batteryWh: 4510 * 3.85 / 1000
};
const BATTERY_BASELINE_LEGACY = {
  // 2018年前续航基线（魔改命名）：参考 OnePlus 2 时代典型续航水平。
  name: '双极 2S（砂岩）',
  hours: 6.9,
  batteryWh: 3300 * 3.85 / 1000
};
const DEFAULT_LIFECYCLE_MONTHS = 30;
const PREORDER_MONTH_LIMIT = 2;
const PREORDER_PAY_RATIO = 1.0;
const GENERATION_LOAN_PRINCIPAL = 1_000_000;
const GENERATION_LOAN_ANNUAL_RATE = 0.10;
const GENERATION_LOAN_TERM_MONTHS = 6;

const marketArchetypes = [
  {
    key: 'subsidy_boom',
    name: '国家补贴 + 换机潮（Buff）',
    text: '政策刺激叠加消费节，需求弹性大，价格敏感度下降。',
    demand: 1.23,
    cost: 0.96,
    rating: 2
  },
  {
    key: 'geek_wave',
    name: '极客需求上行（Buff）',
    text: '参数党活跃，高性能和新形态更容易获得声量。',
    demand: 1.15,
    cost: 1.0,
    rating: 4
  },
  {
    key: 'normal',
    name: '常态竞争（中性）',
    text: '供需平稳，策略优劣主要看你的配置与定价匹配度。',
    demand: 1.0,
    cost: 1.0,
    rating: 0
  },
  {
    key: 'cold_market',
    name: '消费趋冷（Debuff）',
    text: '用户更谨慎，非刚需换机推迟，中高端承压。',
    demand: 0.86,
    cost: 1.03,
    rating: -2
  },
  {
    key: 'supply_shock',
    name: '供应链波动（Debuff）',
    text: '关键零部件涨价，交付成本上升，容错率降低。',
    demand: 0.93,
    cost: 1.14,
    rating: -1
  },
  {
    key: 'super_competition',
    name: '竞品爆发年（Debuff）',
    text: '同档位机型密集发布，营销成本提高，销量被分流。',
    demand: 0.81,
    cost: 1.06,
    rating: -4
  }
];

const HISTORICAL_START_YEAR = 2014;
const HISTORICAL_HANDOFF_YEAR = 2025;

const historicalSocTimeline = [
  { year: 2014, id: 'h_s801', name: 'SnapDrake 801', tier: '旗舰(老款)', score: 24, cost: 120, risk: 0.8 },
  { year: 2014, id: 'h_s410', name: 'SnapDrake 410', tier: '入门(老款)', score: 13, cost: 58, risk: 0.72 },
  { year: 2014, id: 'h_mt6592', name: 'MedaTek MT6592', tier: '中端(老款)', score: 16, cost: 75, risk: 0.75 },
  { year: 2014, id: 'h_ssa920', name: 'SkySil A920', tier: '中高端(老款)', score: 18, cost: 95, risk: 0.77 },

  { year: 2015, id: 'h_s810', name: 'SnapDrake 810', tier: '旗舰(老款)', score: 26, cost: 145, risk: 0.95 },
  { year: 2015, id: 'h_s615', name: 'SnapDrake 615', tier: '中端(老款)', score: 17, cost: 82, risk: 0.78 },
  { year: 2015, id: 'h_x10', name: 'Helioo X10', tier: '中高端(老款)', score: 20, cost: 102, risk: 0.82 },
  { year: 2015, id: 'h_ssa935', name: 'SkySil A935', tier: '中高端(老款)', score: 21, cost: 108, risk: 0.81 },

  { year: 2016, id: 'h_s820', name: 'SnapDrake 820', tier: '旗舰(老款)', score: 31, cost: 182, risk: 0.9 },
  { year: 2016, id: 'h_s625', name: 'SnapDrake 625', tier: '中端(老款)', score: 23, cost: 118, risk: 0.79 },
  { year: 2016, id: 'h_p10', name: 'Helioo P10', tier: '中低端(老款)', score: 18, cost: 86, risk: 0.76 },
  { year: 2016, id: 'h_ssa950', name: 'SkySil A950', tier: '中高端(老款)', score: 26, cost: 138, risk: 0.84 },

  { year: 2017, id: 'h_s835', name: 'SnapDrake 835', tier: '旗舰(老款)', score: 37, cost: 225, risk: 0.92 },
  { year: 2017, id: 'h_s660', name: 'SnapDrake 660', tier: '中端(老款)', score: 28, cost: 148, risk: 0.82 },
  { year: 2017, id: 'h_p25', name: 'Helioo P25', tier: '中低端(老款)', score: 21, cost: 102, risk: 0.79 },
  { year: 2017, id: 'h_ssa970', name: 'SkySil A970', tier: '中高端(老款)', score: 34, cost: 196, risk: 0.88 },

  { year: 2018, id: 'h_s845', name: 'SnapDrake 845', tier: '旗舰(老款)', score: 44, cost: 285, risk: 0.95 },
  { year: 2018, id: 'h_s710', name: 'SnapDrake 710', tier: '中高端(老款)', score: 34, cost: 188, risk: 0.86 },
  { year: 2018, id: 'h_p60', name: 'Helioo P60', tier: '中端(老款)', score: 27, cost: 138, risk: 0.83 },
  { year: 2018, id: 'h_ssa980', name: 'SkySil A980', tier: '旗舰(老款)', score: 46, cost: 305, risk: 0.96 },

  { year: 2019, id: 'h_s855', name: 'SnapDrake 855', tier: '旗舰(老款)', score: 52, cost: 358, risk: 1.0 },
  { year: 2019, id: 'h_s730', name: 'SnapDrake 730', tier: '中高端(老款)', score: 40, cost: 232, risk: 0.9 },
  { year: 2019, id: 'h_g90t', name: 'Helioo G90T', tier: '中端(老款)', score: 35, cost: 195, risk: 0.92 },
  { year: 2019, id: 'h_ssa990', name: 'SkySil A990', tier: '旗舰(老款)', score: 54, cost: 378, risk: 1.02 },

  { year: 2020, id: 'h_s865', name: 'SnapDrake 865', tier: '旗舰(老款)', score: 60, cost: 455, risk: 1.05 },
  { year: 2020, id: 'h_s765g', name: 'SnapDrake 765G', tier: '中高端(老款)', score: 46, cost: 268, risk: 0.95 },
  { year: 2020, id: 'h_d800u', name: 'DimeCity 800U', tier: '中端(老款)', score: 40, cost: 218, risk: 0.93 },
  { year: 2020, id: 'h_d1000p', name: 'DimeCity 1000+', tier: '次旗舰(老款)', score: 56, cost: 398, risk: 1.01 },

  { year: 2021, id: 'h_s888', name: 'SnapDrake 888', tier: '旗舰(老款)', score: 68, cost: 548, risk: 1.15 },
  { year: 2021, id: 'h_s778g', name: 'SnapDrake 778G', tier: '中高端(老款)', score: 54, cost: 328, risk: 1.0 },
  { year: 2021, id: 'h_d1200', name: 'DimeCity 1200', tier: '次旗舰(老款)', score: 60, cost: 426, risk: 1.04 },
  { year: 2021, id: 'h_t610', name: 'UniSil T610', tier: '入门(老款)', score: 30, cost: 146, risk: 0.88 },

  { year: 2022, id: 'h_8g1', name: 'SnapDrake 8 Gen1', tier: '旗舰(老款)', score: 74, cost: 668, risk: 1.22 },
  { year: 2022, id: 'h_7g1', name: 'SnapDrake 7 Gen1', tier: '中高端(老款)', score: 58, cost: 376, risk: 1.06 },
  { year: 2022, id: 'h_d8100', name: 'DimeCity 8100', tier: '次旗舰(老款)', score: 66, cost: 488, risk: 1.08 },
  { year: 2022, id: 'h_d9000', name: 'DimeCity 9000', tier: '旗舰(老款)', score: 78, cost: 698, risk: 1.18 },

  { year: 2023, id: 'h_8g2', name: 'SnapDrake 8 Gen2', tier: '旗舰(老款)', score: 84, cost: 812, risk: 1.2 },
  { year: 2023, id: 'h_7p2', name: 'SnapDrake 7+ Gen2', tier: '次旗舰(老款)', score: 72, cost: 528, risk: 1.1 },
  { year: 2023, id: 'h_d8200', name: 'DimeCity 8200', tier: '次旗舰(老款)', score: 70, cost: 506, risk: 1.09 },
  { year: 2023, id: 'h_d9200', name: 'DimeCity 9200', tier: '旗舰(老款)', score: 86, cost: 836, risk: 1.2 },

  { year: 2024, id: 'h_8g3', name: 'SnapDrake 8 Gen3', tier: '旗舰(老款)', score: 90, cost: 928, risk: 1.21 },
  { year: 2024, id: 'h_7g3', name: 'SnapDrake 7 Gen3', tier: '中高端', score: 66, cost: 448, risk: 1.05 },
  { year: 2024, id: 'h_d8300', name: 'DimeCity 8300', tier: '次旗舰', score: 78, cost: 598, risk: 1.11 },
  { year: 2024, id: 'h_d9300', name: 'DimeCity 9300', tier: '旗舰', score: 92, cost: 966, risk: 1.24 }
];

const LEGACY_SOC_ID_ALIAS = {
  h_k920: 'h_ssa920',
  h_k935: 'h_ssa935',
  h_k950: 'h_ssa950',
  h_k970: 'h_ssa970',
  h_k980: 'h_ssa980',
  h_k990: 'h_ssa990'
};

const historicalCameraTimeline = [
  { year: 2014, id: 'h_imx214_13', name: 'LumeX IMX214 13MP 主摄', cost: 26, weight: 4.8, score: 11, type: 'main', volume: 1.0 },
  { year: 2014, id: 'h_front_5', name: '5MP 前摄模组', cost: 9, weight: 2.6, score: 4, type: 'front', volume: 0.45 },
  { year: 2015, id: 'h_imx230_21', name: 'LumeX IMX230 21MP 主摄', cost: 34, weight: 5.4, score: 13, type: 'main', volume: 1.2 },
  { year: 2015, id: 'h_front_8', name: '8MP 前摄模组', cost: 12, weight: 2.9, score: 5, type: 'front', volume: 0.48 },
  { year: 2016, id: 'h_imx298_16', name: 'LumeX IMX298 16MP 主摄', cost: 42, weight: 6.1, score: 16, type: 'main', volume: 1.4 },
  { year: 2016, id: 'h_front_13', name: '13MP 前摄模组', cost: 16, weight: 3.4, score: 7, type: 'front', volume: 0.56 },
  { year: 2017, id: 'h_imx362_12', name: 'LumeX IMX362 DualPixel 主摄', cost: 56, weight: 7.0, score: 20, type: 'main', volume: 1.8 },
  { year: 2017, id: 'h_uw_8', name: '8MP 超广角模组', cost: 22, weight: 4.6, score: 8, type: 'ultra', volume: 0.95 },
  { year: 2018, id: 'h_imx363_12', name: 'LumeX IMX363 12MP 主摄', cost: 66, weight: 7.8, score: 23, type: 'main', volume: 2.1 },
  { year: 2018, id: 'h_tele_12', name: '12MP 长焦模组', cost: 46, weight: 7.1, score: 14, type: 'tele', volume: 1.7 },
  { year: 2019, id: 'h_imx586_48', name: 'LumeX IMX586 48MP 主摄', cost: 82, weight: 9.2, score: 28, type: 'main', volume: 2.4 },
  { year: 2019, id: 'h_front_20', name: '20MP 前摄模组', cost: 24, weight: 3.9, score: 9, type: 'front', volume: 0.62 },
  { year: 2020, id: 'h_imx686_64', name: 'LumeX IMX686 64MP 主摄', cost: 98, weight: 10.8, score: 32, type: 'main', volume: 2.8 },
  { year: 2020, id: 'h_hm1_108', name: 'ISO-CELL HM1 108MP 主摄', cost: 118, weight: 12.2, score: 35, type: 'main', volume: 3.1 },
  { year: 2021, id: 'h_imx766_50', name: 'LumeX IMX766 50MP 大底主摄', cost: 126, weight: 12.8, score: 37, type: 'main', volume: 3.0 },
  { year: 2021, id: 'h_gn1_50', name: 'ISO-CELL GN1 50MP 主摄', cost: 132, weight: 13.3, score: 38, type: 'main', volume: 3.2 },
  { year: 2022, id: 'h_imx787_50', name: 'LumeX IMX787 50MP 主摄', cost: 148, weight: 14.4, score: 41, type: 'main', volume: 3.5 },
  { year: 2022, id: 'h_hp1_200', name: 'ISO-CELL HP1 200MP 主摄', cost: 172, weight: 16.1, score: 44, type: 'main', volume: 3.8 },
  { year: 2023, id: 'h_imx890_50', name: 'LumeX IMX890 50MP 主摄', cost: 176, weight: 16.8, score: 46, type: 'main', volume: 4.0 },
  { year: 2023, id: 'h_hp3_200', name: 'ISO-CELL HP3 200MP 主摄', cost: 188, weight: 17.2, score: 47, type: 'main', volume: 4.1 },
  { year: 2024, id: 'h_lyt808_50', name: 'LYT-808 50MP 大底主摄', cost: 198, weight: 18.0, score: 49, type: 'main', volume: 4.4 },
  { year: 2024, id: 'h_hp2_200', name: 'ISO-CELL HP2 200MP 主摄', cost: 212, weight: 18.6, score: 50, type: 'main', volume: 4.5 }
];

const socs = [
  { id: 's480', name: 'SnapDrake 480X', tier: '入门(老款)', score: 22, cost: 72, risk: 0.78 },
  { id: 'g35', name: 'MedaTek Helioo G35X', tier: '入门(老款)', score: 24, cost: 78, risk: 0.8 },
  { id: 'g81', name: 'MedaTek Helioo G81X', tier: '入门', score: 28, cost: 95, risk: 0.82 },
  { id: 't7225', name: 'UniSil T7225', tier: '入门', score: 30, cost: 108, risk: 0.84 },
  { id: 'dim6100', name: 'MedaTek DimeCity 6100+', tier: '中低端', score: 38, cost: 152, risk: 0.88 },
  { id: 's4g2', name: 'SnapDrake 4 Gen2', tier: '中低端', score: 40, cost: 168, risk: 0.9 },
  { id: 'dim6300', name: 'MedaTek DimeCity 6300', tier: '中低端', score: 42, cost: 180, risk: 0.9 },
  { id: 'g99', name: 'MedaTek Helioo G99X', tier: '中端(老款)', score: 46, cost: 210, risk: 0.92 },
  { id: 's6g4', name: 'SnapDrake 6 Gen4', tier: '中端', score: 50, cost: 260, risk: 0.95 },
  { id: 's695', name: 'SnapDrake 695X', tier: '中端(老款)', score: 53, cost: 295, risk: 0.97 },
  { id: 'dim7200', name: 'MedaTek DimeCity 7200', tier: '中端', score: 56, cost: 320, risk: 0.99 },
  { id: 'dim7300', name: 'MedaTek DimeCity 7300', tier: '中端', score: 58, cost: 340, risk: 1.0 },
  { id: 's778g', name: 'SnapDrake 778G+X', tier: '中高端(老款)', score: 62, cost: 390, risk: 1.01 },
  { id: 's7sg3', name: 'SnapDrake 7s Gen3', tier: '中高端', score: 65, cost: 430, risk: 1.03 },
  { id: 'dim8300', name: 'MedaTek DimeCity 8300', tier: '次旗舰', score: 74, cost: 560, risk: 1.07 },
  { id: 'dim8400', name: 'MedaTek DimeCity 8400', tier: '次旗舰', score: 78, cost: 620, risk: 1.1 },
  { id: 's8sg4', name: 'SnapDrake 8s Gen4', tier: '次旗舰', score: 83, cost: 760, risk: 1.14 },
  { id: 's8g3', name: 'SnapDrake 8 Gen3', tier: '旗舰', score: 88, cost: 920, risk: 1.19 },
  { id: 'dim9300', name: 'MedaTek DimeCity 9300+', tier: '旗舰', score: 90, cost: 980, risk: 1.22 },
  { id: 'dim9400', name: 'MedaTek DimeCity 9400', tier: '旗舰+', score: 95, cost: 1210, risk: 1.3 },
  { id: 's8elite', name: 'SnapDrake 8 El1te', tier: '旗舰', score: 92, cost: 1080, risk: 1.24 },
  { id: 's8eliteg5', name: 'SnapDrake 8 El1te Gen5', tier: '旗舰+', score: 98, cost: 1380, risk: 1.35 }
];

// Public benchmark anchors (representative values; some are inferred for gameplay continuity).
const socBenchmarkAnchors = {
  s480: { antutu10: 255000, geekbench6Single: 500, geekbench6Multi: 1550, inferred: true },
  g35: { antutu10: 165000, geekbench6Single: 390, geekbench6Multi: 1280, inferred: true },
  g81: { antutu10: 260675, geekbench6Single: 420, geekbench6Multi: 1391, inferred: false },
  t7225: { antutu10: 290000, geekbench6Single: 450, geekbench6Multi: 1500, inferred: true },
  dim6100: { antutu10: 405000, geekbench6Single: 930, geekbench6Multi: 2320, inferred: true },
  s4g2: { antutu10: 445000, geekbench6Single: 980, geekbench6Multi: 2550, inferred: true },
  dim6300: { antutu10: 428365, geekbench6Single: 1009, geekbench6Multi: 2413, inferred: false },
  g99: { antutu10: 421000, geekbench6Single: 720, geekbench6Multi: 1950, inferred: true },
  s6g4: { antutu10: 759266, geekbench6Single: 1200, geekbench6Multi: 3400, inferred: true },
  s695: { antutu10: 448000, geekbench6Single: 890, geekbench6Multi: 2120, inferred: true },
  dim7200: { antutu10: 742000, geekbench6Single: 1120, geekbench6Multi: 2650, inferred: true },
  dim7300: { antutu10: 671587, geekbench6Single: 1060, geekbench6Multi: 3000, inferred: true },
  s778g: { antutu10: 612000, geekbench6Single: 1100, geekbench6Multi: 2930, inferred: true },
  s7sg3: { antutu10: 807253, geekbench6Single: 1178, geekbench6Multi: 3146, inferred: false },
  dim8300: { antutu10: 1415000, geekbench6Single: 1520, geekbench6Multi: 5020, inferred: true },
  dim8400: { antutu10: 1633597, geekbench6Single: 1571, geekbench6Multi: 6033, inferred: false },
  s8sg4: { antutu10: 2054869, geekbench6Single: 2154, geekbench6Multi: 6880, inferred: false },
  s8g3: { antutu10: 2125000, geekbench6Single: 2230, geekbench6Multi: 7150, inferred: true },
  dim9300: { antutu10: 2120000, geekbench6Single: 2235, geekbench6Multi: 7600, inferred: true },
  dim9400: { antutu10: 2770000, geekbench6Single: 2850, geekbench6Multi: 9200, inferred: true },
  s8elite: { antutu10: 2981542, geekbench6Single: 3122, geekbench6Multi: 9507, inferred: true },
  s8eliteg5: { antutu10: 3872080, geekbench6Single: 3621, geekbench6Multi: 11190, inferred: true }
};

const dynamicSocThermalMap = {};
const dynamicMainCamThermalMap = {};

const displayMaterials = {
  lcd: { name: 'LCD', baseCost: 160, baseWeight: 31, score: 55, powerPenalty: 5 },
  amoled: { name: 'AMOLED', baseCost: 220, baseWeight: 28, score: 66, powerPenalty: 3 },
  oled: { name: 'OLED', baseCost: 260, baseWeight: 24, score: 72, powerPenalty: 2 },
  dual_oled: { name: '双层 OLED', baseCost: 560, baseWeight: 27, score: 88, powerPenalty: 0 },
  eink: { name: '墨水屏', baseCost: 210, baseWeight: 18, score: 40, powerPenalty: -8 },
  foldable: { name: '折叠屏', baseCost: 980, baseWeight: 42, score: 94, powerPenalty: 4 }
};
const baseDisplayMaterials = JSON.parse(JSON.stringify(displayMaterials));

const displayVendors = {
  high: { name: '高端供应链', costFactor: 1.1, scoreAdj: 2.2, bezelBase: 1.5 },
  mid: { name: '中端供应链', costFactor: 1.0, scoreAdj: 0.3, bezelBase: 2.5 },
  low: { name: '低端供应链', costFactor: 0.9, scoreAdj: -1.6, bezelBase: 3.5 }
};

const aspectCostFactor = { '16:9': 1.02, '18:9': 1.0, '19.5:9': 1.03, '20:9': 1.05, '21:9': 1.09, '16:10': 1.1, '4:3': 1.12 };

const displayFeatureMap = {
  high_refresh: { name: '高刷新率', cost: 45, score: 7, weight: 0, power: 3 },
  high_res: { name: '高分辨率', cost: 60, score: 7, weight: 0, power: 2 },
  p3: { name: 'P3', cost: 25, score: 3, weight: 0, power: 0.5 },
  eye: { name: '护眼认证', cost: 18, score: 2, weight: 0, power: 0 },
  ltpo: { name: 'LTPO', cost: 90, score: 6, weight: 0, power: -2 },
  high_pwm: { name: '高频PWM', cost: 20, score: 2, weight: 0, power: 0 }
};
const displayFeatureUnlockYearMap = {
  high_res: 2014,
  p3: 2016,
  high_refresh: 2017,
  eye: 2018,
  high_pwm: 2020,
  ltpo: 2021
};
const TECH_MUSEUM_TREE = [
  { year: 2014, title: '4G普及起点', tags: ['LCD/AMOLED', '18W快充起步', '单摄为主'] },
  { year: 2015, title: '性能爬坡', tags: ['中高端芯片增多', '金属机身走红'] },
  { year: 2016, title: '快充与热管', tags: ['热管散热', '双电芯路线出现'] },
  { year: 2017, title: '全面屏序章', tags: ['刘海/水滴前夜', '高刷开始普及'] },
  { year: 2018, title: '多摄爆发', tags: ['三摄阵容', '120W快充首发代'] },
  { year: 2019, title: '影像大战', tags: ['高像素跃升', '旗舰性能高热'] },
  { year: 2020, title: '新形态试水', tags: ['磁吸生态', '半导体散热出现'] },
  { year: 2021, title: '高端化加速', tags: ['LTPO登场', '卫星SOS出现'] },
  { year: 2022, title: '新旗舰代', tags: ['折叠屏高价期', '双层OLED高价期'] },
  { year: 2023, title: '旗舰下放', tags: ['高性能中端化', '散热堆料常态'] },
  { year: 2024, title: '迈向成熟', tags: ['供应链稳定', '成本与体验平衡'] },
  { year: 2025, title: '现代基线', tags: ['科技树封顶', '进入无尽模式前夜'] }
];

const displayForms = {
  symmetry: { name: '上下对称窄边框', cost: 2, score: 6, demand: 0.015, frameAdj: 0.0, topExtra: 0.0 },
  notch: { name: '刘海屏', cost: 6, score: -4, demand: -0.025, frameAdj: 0.15, topExtra: 1.4 },
  hole: { name: '单挖孔', cost: 8, score: 2, demand: 0.01, frameAdj: 0.1, topExtra: 0.2 },
  pill: { name: '双挖孔/药丸', cost: 12, score: 3, demand: 0.015, frameAdj: 0.2, topExtra: 0.45 },
  udc: { name: '屏下前摄', cost: 85, score: 8, demand: 0.022, frameAdj: 0.25, topExtra: 0.1 },
  mid_notch: { name: '刘海屏', cost: 12, score: 2, demand: 0.012, onlineAdj: 0.018, offlineAdj: 0.056, frameAdj: 0, topExtra: 0 },
  mid_waterdrop: { name: '水滴屏', cost: 10, score: 3, demand: 0.009, onlineAdj: 0.01, offlineAdj: 0.018, frameAdj: 0, topExtra: 0 },
  mid_popup: { name: '升降摄像头', cost: 34, score: 4, demand: 0.013, onlineAdj: 0.062, offlineAdj: 0.026, extraWeight: 9.5, extraSpace: 3.4, frameAdj: 0, topExtra: 0 },
  mid_symmetry: { name: '上下对称窄边框', cost: 9, score: 2, demand: 0.01, onlineAdj: 0.02, offlineAdj: 0.02, frameAdj: 0, topExtra: 0 },
  legacy_normal: { name: '普通', cost: 0, score: -7, demand: -0.018, onlineAdj: 0.0, offlineAdj: 0.0, frameAdj: 0, topExtra: 0 },
  legacy_id: { name: 'ID无边框', cost: 6, score: -2, demand: -0.004, onlineAdj: -0.012, offlineAdj: 0.024, frameAdj: 0, topExtra: 0 },
  legacy_true_narrow: { name: '真·窄边框', cost: 24, score: 3, demand: 0.01, onlineAdj: 0.042, offlineAdj: 0.02, frameAdj: 0, topExtra: 0 },
  legacy_three_side: { name: '三边全面屏', cost: 88, score: 4, demand: 0.016, onlineAdj: 0.068, offlineAdj: -0.018, frameAdj: 0, topExtra: 0 }
};

const DISPLAY_RATIO_OPTIONS_MODERN = ['16:9', '18:9', '19.5:9', '20:9', '21:9', '16:10', '4:3'];
const DISPLAY_RATIO_OPTIONS_LEGACY = ['16:9', '18:9', '16:10'];
const DISPLAY_RATIO_OPTIONS_MID = ['16:9', '18:9', '19.5:9', '20:9', '21:9', '16:10'];

const ramOptions = [
  { id: '4_lp4x', name: '4GB LPDDR4X', cost: 120, score: 6 },
  { id: '6_lp4x', name: '6GB LPDDR4X', cost: 170, score: 9 },
  { id: '8_lp4x', name: '8GB LPDDR4X', cost: 240, score: 13 },
  { id: '8_lp5x', name: '8GB LPDDR5X', cost: 330, score: 17 },
  { id: '12_lp5x', name: '12GB LPDDR5X', cost: 460, score: 22 },
  { id: '16_lp5x', name: '16GB LPDDR5X', cost: 660, score: 29 },
  { id: '24_lp5x', name: '24GB LPDDR5X', cost: 1100, score: 35 }
];

const romOptions = [
  { id: '64_emmc', name: '64GB eMMC', cost: 80, score: 4 },
  { id: '128_ufs22', name: '128GB UFS 2.2', cost: 150, score: 10 },
  { id: '256_ufs31', name: '256GB UFS 3.1', cost: 300, score: 18 },
  { id: '512_ufs40', name: '512GB UFS 4.0', cost: 620, score: 27 },
  { id: '1t_ufs40', name: '1TB UFS 4.0', cost: 1050, score: 35 }
];

const baseRamOptions = JSON.parse(JSON.stringify(ramOptions));
const baseRomOptions = JSON.parse(JSON.stringify(romOptions));
const baseRamCapById = {
  '4_lp4x': 4,
  '6_lp4x': 6,
  '8_lp4x': 8,
  '8_lp5x': 8,
  '12_lp5x': 12,
  '16_lp5x': 16,
  '24_lp5x': 24
};
const baseRomCapById = {
  '64_emmc': 64,
  '128_ufs22': 128,
  '256_ufs31': 256,
  '512_ufs40': 512,
  '1t_ufs40': 1024
};
const baseRomSpeedById = {
  '64_emmc': { read: 250, write: 125 },
  '128_ufs22': { read: 1200, write: 600 },
  '256_ufs31': { read: 2100, write: 1200 },
  '512_ufs40': { read: 4000, write: 2800 },
  '1t_ufs40': { read: 4200, write: 3000 }
};
const historicalRamStartCaps = [0.5, 1, 2, 3, 4, 6, 8];
const historicalRomStartCaps = [4, 16, 32, 64, 128];
const historicalRomStartIo = [
  { read: 90, write: 45 },
  { read: 180, write: 80 },
  { read: 320, write: 150 },
  { read: 520, write: 230 },
  { read: 760, write: 320 }
];

const bodyOptions = [
  { id: 'plastic', name: '工程塑料', cost: 35, weight: 24, score: 2, structVolume: 4.9 },
  { id: 'aluminum', name: '铝合金中框', cost: 85, weight: 27, score: 7, structVolume: 5.2 },
  { id: 'glass', name: '双面玻璃 + 金属中框', cost: 120, weight: 33, score: 10, structVolume: 5.7 },
  { id: 'wood', name: '木质机身', cost: 105, weight: 28, score: 12, structVolume: 6.1 },
  { id: 'aramid', name: '芳纶复合后盖', cost: 180, weight: 25, score: 13, structVolume: 5.4 },
  { id: 'ceramic', name: '陶瓷机身', cost: 220, weight: 30, score: 15, structVolume: 5.9 },
  { id: 'titanium', name: '钛金属中框 + 玻璃', cost: 260, weight: 26, score: 18, structVolume: 5.3 }
];
const BODY_UNLOCK_RULES = {
  plastic: { unlockYear: 2014, earlyPremium: 0.12, settleYear: 2017 },
  aluminum: { unlockYear: 2014, earlyPremium: 0.12, settleYear: 2017 },
  glass: { unlockYear: 2014, earlyPremium: 0.12, settleYear: 2017 },
  wood: { unlockYear: 2014, retireYear: 2018 },
  aramid: { unlockYear: 2016, introPremium: 0.30 },
  ceramic: { unlockYear: 2017, introPremium: 0.35 },
  titanium: { unlockYear: 2023, introPremium: 0.40 }
};

const cameraModules = [
  { id: 'none', name: '无', cost: 0, weight: 0, score: 0, type: 'none', volume: 0 },
  { id: 'basic13', name: '13MP 基础模组', cost: 22, weight: 4.5, score: 8, type: 'normal', volume: 0.85 },
  { id: 'ov13b10', name: 'OV13B1O 13MP 模组', cost: 30, weight: 5, score: 11, type: 'normal', volume: 1.0 },
  { id: 'mx586_48', name: 'LumeX MX586 48MP 经典主摄', cost: 48, weight: 6.5, score: 18, type: 'normal', volume: 1.4 },
  { id: 'jn1_50', name: 'ISO-CELL JN1 50MP 模组', cost: 58, weight: 7.2, score: 20, type: 'normal', volume: 1.6 },
  { id: 'ov64b_64', name: 'OV64B 64MP 主摄', cost: 72, weight: 8.5, score: 24, type: 'main', volume: 2.0 },
  { id: 'mx766_50', name: 'LumeX MX766 50MP 大底主摄', cost: 98, weight: 11, score: 30, type: 'main', volume: 2.5 },
  { id: 'ov50h', name: 'OV5OH 50MP 大底主摄', cost: 105, weight: 12, score: 33, type: 'main', volume: 2.8 },
  { id: 'gn3_50', name: 'ISO-CELL GN3 50MP 旗舰主摄', cost: 146, weight: 13.5, score: 39, type: 'main', volume: 3.1 },
  { id: 'hp3_200', name: 'ISO-CELL HP3 200MP 旗舰主摄', cost: 188, weight: 16.5, score: 44, type: 'main', volume: 3.9 },
  { id: 'hp2_200', name: 'ISO-CELL HP2 200MP 旗舰主摄', cost: 210, weight: 18, score: 48, type: 'main', volume: 4.2 },
  { id: 'lyt900', name: '1英寸 LYT-9OO 旗舰主摄', cost: 238, weight: 21, score: 53, type: 'main', volume: 5.0 },
  { id: 'uw_50', name: '50MP 超广角模组', cost: 66, weight: 8, score: 20, type: 'ultra', volume: 1.8 },
  { id: 'mono_bw', name: '黑白镜头模组', cost: 38, weight: 9.8, score: 14, type: 'mono', volume: 2.3 },
  { id: 'tele_50p', name: '50MP 潜望长焦模组', cost: 132, weight: 15, score: 34, type: 'tele', volume: 3.8 },
  { id: 'front_32', name: '32MP 前摄模组', cost: 36, weight: 4.8, score: 10, type: 'front', volume: 0.7 },
  { id: 'front_g1sq', name: 'G1 正方形前摄传感器', cost: 40, weight: 5.2, score: 13, type: 'front', volume: 0.75 }
];

const baseSocs = JSON.parse(JSON.stringify(socs));
const baseCameraModules = JSON.parse(JSON.stringify(cameraModules));
const baseSocBenchmarkAnchors = JSON.parse(JSON.stringify(socBenchmarkAnchors));

const extras = [
  { id: 'stereo', name: '低音增强立体声单元', cost: 28, weight: 8, space: 2.8, score: 4, demand: 0.02 },
  { id: 'usb3', name: 'USB 3.x 高速接口', cost: 15, weight: 1, space: 0.6, score: 3, demand: 0.01 },
  { id: 'fingerprint', name: '屏下指纹识别', cost: 22, weight: 1.2, space: 0.35, score: 2, demand: 0.008 },
  { id: 'multi_cam_module', name: '多摄模组', cost: 25, weight: 2.2, space: 1.0, score: 1, demand: 0.01 },
  { id: 'ip68_cert', name: 'IP68 防尘防水认证', cost: 36, weight: 2.2, space: 1.3, score: 5, demand: 0.008 },
  { id: 'screen_insurance', name: '碎屏险', cost: 59, weight: 0, space: 0, score: 0, demand: 0 },
  { id: 'typec_port', name: 'Type-C 接口', cost: 24, weight: 0.9, space: 0.55, score: 2, demand: 0 },
  { id: 'nfc_uwb', name: 'UWB', cost: 24, weight: 1, space: 0.1, score: 2, demand: 0.004 },
  { id: 'ir_blaster', name: '红外线遥控', cost: 10, weight: 0.8, space: 1.6, score: 1, demand: 0.004 },
  { id: 'wireless_charge', name: '无线充电', cost: 48, weight: 4.5, space: 1.8, score: 3, demand: 0.012 },
  { id: 'ext_5g', name: '外挂 5G', cost: 150, weight: 0, space: 0, score: 2, demand: 0.006 },
  { id: 'fast_legacy', name: '快充', cost: 16, weight: 1.2, space: 0.45, score: 2, demand: 0.02 },
  { id: 'fast_dual', name: '双电芯快充', cost: 28, weight: 0, space: 0, score: 3, demand: 0.05 },
  { id: 'gps_dual', name: '双频 GPS', cost: 12, weight: 0.5, space: 0.2, score: 2, demand: 0.005 },
  { id: 'hifi_jack', name: 'HIFI级 3.5mm 耳机接口', cost: 14, weight: 1, space: 3.2, score: 2, demand: 0.01 },
  { id: 'dynamic_island', name: '灵动岛交互', cost: 8, weight: 0, space: 0.05, score: 2, demand: 0.008 },
  { id: 'active_fan', name: '主动散热风扇', cost: 43, weight: 21, space: 8.4, score: 5, demand: 0.016 },
  { id: 'semi_cooler', name: '冰爽半导体散热风扇', cost: 84, weight: 34, space: 12.2, score: 6, demand: 0.018 },
  { id: 'dual_cell', name: '双电芯电池方案', cost: 58, weight: 6, space: 2.6, score: 2, demand: 0.01 },
  { id: 'battery_tech', name: '新型高密度电池技术', cost: 180, weight: 0, space: 0.2, score: 3, demand: 0.006 },
  { id: 'flat_back', name: '纯平背板', cost: 22, weight: 2.5, space: 1.1, score: 5, demand: 0.018 },
  { id: 'magsafe', name: '磁吸生态配件', cost: 25, weight: 4, space: 1.2, score: 3, demand: 0.012 },
  { id: 'fast120', name: '120W 超级快充', cost: 55, weight: 6, space: 2.0, score: 6, demand: 0.02 },
  { id: 'vc', name: '大面积 VC 散热', cost: 35, weight: 8, space: 5.5, score: 4, demand: 0.015 },
  { id: 'satellite', name: '卫星 SOS 通信', cost: 40, weight: 2, space: 1.0, score: 4, demand: 0.007 }
];
const baseExtras = JSON.parse(JSON.stringify(extras));
const EXTRA_TIMELINE_RULES = {
  fingerprint: {
    unlockYear: 2014
  },
  fast_legacy: {
    unlockYear: 2014,
    retireYear: 2017
  },
  multi_cam_module: {
    unlockYear: 2014,
    retireYear: 2017,
    launchCost: 25,
    retireCost: 9
  },
  ip68_cert: {
    unlockYear: 2014,
    retireYear: 2018
  },
  typec_port: {
    unlockYear: 2015,
    retireYear: 2017
  },
  nfc_uwb: {
    unlockYear: 2014
  },
  wireless_charge: {
    unlockYear: 2015
  },
  gps_dual: {
    unlockYear: 2018
  },
  dynamic_island: {
    unlockYear: 2022
  },
  ext_5g: {
    unlockYear: 2019,
    retireYear: 2022,
    launchCost: 220,
    retireCost: 150
  },
  fast_dual: {
    unlockYear: 2016,
    retireYear: 2019
  },
  screen_insurance: {
    unlockYear: 2014,
    launchCost: 39
  },
  dual_cell: {
    unlockYear: 2016,
    retireYear: 2019,
    launchCost: 76,
    retireCost: 58
  },
  magsafe: {
    unlockYear: 2020
  },
  semi_cooler: {
    unlockYear: 2020
  },
  hifi_jack: {
    unlockYear: 2018
  },
  fast120: {
    unlockYear: 2018
  },
  satellite: {
    unlockYear: 2021,
    launchCost: 220
  }
};

const chinaRegions = {
  east_core: {
    name: '华东',
    demand: 1.22,
    comp: 1.2,
    tolerance: 1.18,
    logistics: 0.92,
    labor: 1.18,
    rent: 1.34,
    onlineInfra: 1.16,
    offlineInfra: 1.08,
    supplyEco: 1.18,
    rdTalent: 1.16,
    profile: '购买力高、换机频次高、竞争最激烈'
  },
  north_core: {
    name: '华北',
    demand: 1.14,
    comp: 1.15,
    tolerance: 1.12,
    logistics: 0.95,
    labor: 1.14,
    rent: 1.28,
    onlineInfra: 1.11,
    offlineInfra: 1.05,
    supplyEco: 1.08,
    rdTalent: 1.1,
    profile: '高线市场集中、品牌认知强'
  },
  south_coastal: {
    name: '华南',
    demand: 1.18,
    comp: 1.16,
    tolerance: 1.1,
    logistics: 0.93,
    labor: 1.1,
    rent: 1.22,
    onlineInfra: 1.12,
    offlineInfra: 1.06,
    supplyEco: 1.14,
    rdTalent: 1.05,
    profile: '消费活跃、渠道成熟、价格带分化明显'
  },
  central: {
    name: '中部',
    demand: 1.06,
    comp: 1.04,
    tolerance: 0.98,
    logistics: 0.98,
    labor: 0.93,
    rent: 0.88,
    onlineInfra: 0.84,
    offlineInfra: 1.2,
    supplyEco: 0.95,
    rdTalent: 0.94,
    profile: '走量潜力大，对配置与价格平衡敏感'
  },
  southwest: {
    name: '西南',
    demand: 1.02,
    comp: 1.0,
    tolerance: 0.95,
    logistics: 1.03,
    labor: 0.9,
    rent: 0.86,
    onlineInfra: 0.94,
    offlineInfra: 0.98,
    supplyEco: 0.9,
    rdTalent: 0.92,
    profile: '城市群需求稳定，山区物流成本略高'
  },
  northwest: {
    name: '西北',
    demand: 0.9,
    comp: 0.92,
    tolerance: 0.9,
    logistics: 1.08,
    labor: 0.88,
    rent: 0.8,
    onlineInfra: 0.72,
    offlineInfra: 1.26,
    supplyEco: 0.86,
    rdTalent: 0.88,
    profile: '市场分散，渠道覆盖与售后半径挑战更大'
  },
  northeast: {
    name: '东北',
    demand: 0.88,
    comp: 0.9,
    tolerance: 0.9,
    logistics: 1.05,
    labor: 0.91,
    rent: 0.82,
    onlineInfra: 0.76,
    offlineInfra: 1.24,
    supplyEco: 0.9,
    rdTalent: 0.9,
    profile: '换机节奏偏稳，价格敏感度较高'
  },
  hk_mo_tw: {
    name: '港澳台',
    demand: 0.95,
    comp: 1.22,
    tolerance: 1.24,
    logistics: 1.06,
    labor: 1.36,
    rent: 1.52,
    onlineInfra: 1.18,
    offlineInfra: 1.1,
    supplyEco: 0.94,
    rdTalent: 1.06,
    profile: '购买力高、竞争激烈、品牌门槛高'
  }
};

const procurementPlans = {
  spot: {
    name: '现货采购',
    factor: 1.12,
    supply: 0.94,
    upfront: 0,
    renewUpfront: 0,
    coverageMultiplier: 0.0,
    lockCommitRate: 0.0,
    leadMonths: 1,
    note: '单价高、灵活但波动大'
  },
  quarterly: {
    name: '季度合约',
    factor: 1.0,
    supply: 1.0,
    upfront: 150_000,
    renewUpfront: 90_000,
    coverageMultiplier: 1.0,
    lockCommitRate: 0.012,
    leadMonths: 2,
    note: '价格与稳定性均衡，锁量按季度滚动'
  },
  annual: {
    name: '年度合约',
    factor: 0.92,
    supply: 1.08,
    upfront: 420_000,
    renewUpfront: 240_000,
    coverageMultiplier: 2.2,
    lockCommitRate: 0.05,
    leadMonths: 2,
    note: '单价最低但锁量更重，压货风险更高'
  }
};

const marketingProfiles = {
  balanced: { name: '均衡投放', online: 1.0, offline: 1.0, geekBoost: 1.0, monthlyCost: 1.0, onlinePriceFactor: 0.98, offlinePriceFactor: 1.01 },
  geek: { name: '极客社区种草', online: 1.18, offline: 0.9, geekBoost: 1.15, monthlyCost: 1.08, onlinePriceFactor: 0.99, offlinePriceFactor: 1.0 },
  livestream: { name: '直播带货冲量', online: 1.14, offline: 0.94, geekBoost: 0.95, monthlyCost: 1.1, onlinePriceFactor: 0.95, offlinePriceFactor: 1.0 },
  value_ads: { name: '性价比广告流', online: 1.08, offline: 0.98, geekBoost: 0.92, monthlyCost: 1.03, onlinePriceFactor: 0.96, offlinePriceFactor: 1.0 },
  channel: { name: '线下渠道深耕', online: 0.9, offline: 1.14, geekBoost: 1.0, monthlyCost: 1.12, onlinePriceFactor: 0.97, offlinePriceFactor: 1.03 }
};

const campaignLevels = {
  low: { name: '低预算', launchCost: 120_000, demand: 0.95, rating: 0 },
  medium: { name: '中预算', launchCost: 320_000, demand: 1.0, rating: 0.6 },
  high: { name: '高预算', launchCost: 760_000, demand: 1.1, rating: 1.5 }
};

const startupDifficulties = {
  real: {
    name: '真实',
    baseDemand: 1.4,
    trust: 1.0,
    designElasticity: 1.0,
    brandRamp: 1.0,
    marketCapacity: 1.0,
    demandVolatilityMul: 1.0,
    crashProbMul: 1.0,
    reboundProbMul: 0.62,
    slumpRecovery: 0.05
  },
  hard: {
    name: '困难',
    baseDemand: 0.75,
    trust: 0.82,
    designElasticity: 1.2,
    brandRamp: 0.86,
    marketCapacity: 0.82,
    demandVolatilityMul: 1.25,
    crashProbMul: 1.3,
    reboundProbMul: 0.4,
    slumpRecovery: 0.03
  }
};

const memoryMarketLevels = [
  { id: 'stable', name: '存储平稳', factor: 1.0, text: 'DRAM/NAND 供需相对平衡。' },
  { id: 'tight', name: '存储偏紧', factor: 1.32, text: '服务器抢占产能，消费电子采购价明显上行。' },
  { id: 'severe', name: '存储严重紧缺', factor: 1.75, text: '供给偏紧叠加备货，终端与BOM成本显著抬升。' }
];

const provinceMarketData = [
  { region: 'east_core', province: '上海', pop: 24.9, online: 0.9 },
  { region: 'east_core', province: '江苏', pop: 85.2, online: 0.82 },
  { region: 'east_core', province: '浙江', pop: 66.3, online: 0.84 },
  { region: 'north_core', province: '北京', pop: 21.9, online: 0.88 },
  { region: 'north_core', province: '天津', pop: 13.7, online: 0.82 },
  { region: 'north_core', province: '河北', pop: 74.6, online: 0.74 },
  { region: 'south_coastal', province: '广东', pop: 126.6, online: 0.83 },
  { region: 'south_coastal', province: '福建', pop: 41.9, online: 0.79 },
  { region: 'south_coastal', province: '海南', pop: 10.3, online: 0.76 },
  { region: 'central', province: '湖北', pop: 58.3, online: 0.62 },
  { region: 'central', province: '湖南', pop: 66.0, online: 0.6 },
  { region: 'central', province: '江西', pop: 45.2, online: 0.58 },
  { region: 'central', province: '河南', pop: 98.7, online: 0.57 },
  { region: 'central', province: '安徽', pop: 61.3, online: 0.58 },
  { region: 'southwest', province: '四川', pop: 83.7, online: 0.72 },
  { region: 'southwest', province: '重庆', pop: 32.1, online: 0.78 },
  { region: 'southwest', province: '云南', pop: 46.9, online: 0.68 },
  { region: 'southwest', province: '贵州', pop: 38.6, online: 0.67 },
  { region: 'northwest', province: '陕西', pop: 39.5, online: 0.58 },
  { region: 'northwest', province: '甘肃', pop: 24.9, online: 0.49 },
  { region: 'northwest', province: '青海', pop: 5.9, online: 0.46 },
  { region: 'northwest', province: '宁夏', pop: 7.2, online: 0.5 },
  { region: 'northeast', province: '辽宁', pop: 42.6, online: 0.56 },
  { region: 'northeast', province: '吉林', pop: 23.5, online: 0.52 },
  { region: 'northeast', province: '黑龙江', pop: 31.8, online: 0.5 },
  { region: 'northwest', province: '新疆', pop: 25.9, online: 0.47 },
  { region: 'southwest', province: '西藏', pop: 3.6, online: 0.54 },
  { region: 'hk_mo_tw', province: '香港', pop: 7.5, online: 0.93 },
  { region: 'hk_mo_tw', province: '澳门', pop: 0.68, online: 0.94 },
  { region: 'hk_mo_tw', province: '台湾', pop: 23.4, online: 0.92 }
];

const state = {
  initialCash: 10_000_000,
  cash: 10_000_000,
  inventory: 0,
  inventoryBySku: {},
  rating: 50,
  month: 0,
  chosenMarket: null,
  launched: false,
  ended: false,
  memoryMarket: null,
  companyName: FIXED_COMPANY_NAME,
  product: null,
  phaseEnded: false,
  soldTotal: 0,
  revenueTotal: 0,
  costTotal: 0,
  shortEvents: [],
  companyMonthsTotal: 0,
  companySoldTotal: 0,
  companyRevenueTotal: 0,
  companyCostTotal: 0,
  productHistory: [],
  timeline: [],
  loans: [],
  eventRerollUsed: false,
  techCycle: 0,
  memoryCycle: 0,
  displayCycle: 0,
  extraCostCycle: 0,
  lastTechRefreshMonth: 0,
  lastTechRefreshGeneration: 1,
  lastMemoryRefreshMonth: 0,
  lastMemoryRefreshGeneration: 1,
  lastDisplayRefreshMonth: 0,
  lastDisplayRefreshGeneration: 1,
  lastExtraRefreshMonth: 0,
  lastExtraRefreshGeneration: 1,
  batteryFutureCycle: 0,
  lastBatteryRefreshMonth: 0,
  lastBatteryRefreshGeneration: 1,
  fastChargeFutureCycle: 0,
  lastFastChargeRefreshMonth: 0,
  lastFastChargeRefreshGeneration: 1,
  designDeadEndNotified: false,
  minDesignLaunchCostCache: null,
  rating100Notified: false,
  rating90PricingImmunityNotified: false,
  cash1bNotified: false,
  tenYearVeteranNotified: false,
  screenMaterialsUsed: new Set(),
  screenCollectorNotified: false,
  foldableAchievedNotified: false,
  einkAchievedNotified: false,
  futureEinkAchievedNotified: false,
  ebookAchievedNotified: false,
  ultraFlagshipAchievedNotified: false,
  advancedAlloyAchievedNotified: false,
  ceramicAchievedNotified: false,
  noCameraAchievedNotified: false,
  aramidAchievedNotified: false,
  selfieAchievedNotified: false,
  topLcdAchievedNotified: false,
  flagshipLcdDemonAchievedNotified: false,
  thermalManiacAchievedNotified: false,
  satelliteAchievedNotified: false,
  batteryTechAchievedNotified: false,
  magsafeAchievedNotified: false,
  ip68EasyAchievedNotified: false,
  smallScreenAchievedNotified: false,
  flatBackAchievedNotified: false,
  largeScreenAchievedNotified: false,
  goodLuckAchievedNotified: false,
  noRefreshAchievedNotified: false,
  squeezeToothpasteAchievedNotified: false,
  brandToneAchievedNotified: false,
  futureReachedNotified: false,
  achievements: [],
  historicalYear: HISTORICAL_START_YEAR,
  historicalLastRefreshMonth: 0,
  historicalLastRefreshGeneration: 1,
  premiumPriceToleranceCarry: 1.0,
  premiumOnlineDemandCarry: 1.0,
  premiumOfflineDemandCarry: 1.0,
  socPriceCapEnded: false
};

const el = {
  statsBar: document.querySelector('.stats'),
  cash: document.getElementById('cash'),
  inv: document.getElementById('inv'),
  invTransit: document.getElementById('invTransit'),
  rating: document.getElementById('rating'),
  month: document.getElementById('month'),
  monthTotal: document.getElementById('monthTotal'),
  stageEvent: document.getElementById('stageEvent'),
  stageConfig: document.getElementById('stageConfig'),
  stageRun: document.getElementById('stageRun'),
  achieveEntry: document.getElementById('achieveEntry'),
  secretTitle: document.querySelector('.top-head h1'),
  achieveClose: document.getElementById('achieveClose'),
  achieveCount: document.getElementById('achieveCount'),
  achievePanel: document.getElementById('achievePanel'),
  achieveList: document.getElementById('achieveList'),
  achieveProgressText: document.getElementById('achieveProgressText'),
  achieveProgressFill: document.getElementById('achieveProgressFill'),
  techMuseumYear: document.getElementById('techMuseumYear'),
  techMuseumProgressFill: document.getElementById('techMuseumProgressFill'),
  techMuseumTree: document.getElementById('techMuseumTree'),
  techMuseumDone: document.getElementById('techMuseumDone'),
  currentYearTag: document.getElementById('currentYearTag'),
  rollEvents: document.getElementById('rollEvents'),
  eventCards: document.getElementById('eventCards'),
  eventHint: document.getElementById('eventHint'),
  confirmEvent: document.getElementById('confirmEvent'),
  quickGuideBtn: document.getElementById('quickGuideBtn'),
  inlineGuideVersion: document.getElementById('inlineGuideVersion'),
  endlessBadge: document.getElementById('endlessBadge'),
  bootLoading: document.getElementById('bootLoading'),
  bootLoadingText: document.getElementById('bootLoadingText'),
  bootLoadingProgress: document.getElementById('bootLoadingProgress'),
  bootLoadingFill: document.getElementById('bootLoadingFill'),
  bootReload: document.getElementById('bootReload'),
  companyNameHint: document.getElementById('companyNameHint'),
  companyName: document.getElementById('companyName'),
  soc: document.getElementById('soc'),
  region: document.getElementById('region'),
  regionFixed: document.getElementById('regionFixed'),
  modelBaseName: document.getElementById('modelBaseName'),
  modelNameHint: document.getElementById('modelNameHint'),
  designQuiz: document.getElementById('designQuiz'),
  price: document.getElementById('price'),
  startupDifficulty: document.getElementById('startupDifficulty'),
  dispMat: document.getElementById('dispMat'),
  dispVendor: document.getElementById('dispVendor'),
  dispSize: document.getElementById('dispSize'),
  dispRatio: document.getElementById('dispRatio'),
  dispForm: document.getElementById('dispForm'),
  displayFeatures: document.getElementById('displayFeatures'),
  skuBox: document.getElementById('skuBox'),
  skuList: document.getElementById('skuList'),
  skuShareHint: document.getElementById('skuShareHint'),
  addSku: document.getElementById('addSku'),
  body: document.getElementById('body'),
  battery: document.getElementById('battery'),
  backColor: document.getElementById('backColor'),
  frontFrameColor: document.getElementById('frontFrameColor'),
  procurementPlan: document.getElementById('procurementPlan'),
  camMain: document.getElementById('camMain'),
  camUltra: document.getElementById('camUltra'),
  camMono: document.getElementById('camMono'),
  camTele: document.getElementById('camTele'),
  camFront: document.getElementById('camFront'),
  extrasDetails: document.getElementById('extrasDetails'),
  extrasCount: document.getElementById('extrasCount'),
  extras: document.getElementById('extras'),
  marketingFocus: document.getElementById('marketingFocus'),
  campaignLevel: document.getElementById('campaignLevel'),
  units: document.getElementById('units'),
  unitsIntHint: document.getElementById('unitsIntHint'),
  phoneH: document.getElementById('phoneH'),
  phoneW: document.getElementById('phoneW'),
  phoneT: document.getElementById('phoneT'),
  preview: document.getElementById('preview'),
  restartDesign: document.getElementById('restartDesign'),
  launch: document.getElementById('launch'),
  previewBox: document.getElementById('previewBox'),
  previewDetailBox: document.getElementById('previewDetailBox'),
  displayQuickBox: document.getElementById('displayQuickBox'),
  nextMonth: document.getElementById('nextMonth'),
  restock: document.getElementById('restock'),
  takeLoan: document.getElementById('takeLoan'),
  continueNext: document.getElementById('continueNext'),
  runPrimaryRow: document.getElementById('runPrimaryRow'),
  runStopRow: document.getElementById('runStopRow'),
  restockSku: document.getElementById('restockSku'),
  restockUnits: document.getElementById('restockUnits'),
  restockIntHint: document.getElementById('restockIntHint'),
  runMobileDock: document.getElementById('runMobileDock'),
  runMobileDockInv: document.getElementById('runMobileDockInv'),
  runMobileDockQuote: document.getElementById('runMobileDockQuote'),
  runMobileDockAction: document.getElementById('runMobileDockAction'),
  runBriefBox: document.getElementById('runBriefBox'),
  stop: document.getElementById('stop'),
  endCompany: document.getElementById('endCompany'),
  restart: document.getElementById('restart'),
  marketBox: document.getElementById('marketBox'),
  runQuiz: document.getElementById('runQuiz'),
  reportBox: document.getElementById('reportBox'),
  finalBox: document.getElementById('finalBox'),
  sourceNote: document.getElementById('sourceNote'),
  opsChart: document.getElementById('opsChart'),
  opsChartProbe: document.getElementById('opsChartProbe'),
  phoneRenderCanvas: document.getElementById('phoneRenderCanvas'),
  phoneFrontCanvas: document.getElementById('phoneFrontCanvas'),
  previewLightbox: document.getElementById('previewLightbox'),
  previewLightboxClose: document.getElementById('previewLightboxClose'),
  previewLightboxTitle: document.getElementById('previewLightboxTitle'),
  previewLightboxImage: document.getElementById('previewLightboxImage'),
  gameModal: document.getElementById('gameModal'),
  gameModalStack: document.getElementById('gameModalStack'),
  benchPage: document.getElementById('benchPage'),
  benchClose: document.getElementById('benchClose'),
  benchProgressText: document.getElementById('benchProgressText'),
  benchProgressFill: document.getElementById('benchProgressFill'),
  benchFinal: document.getElementById('benchFinal'),
  benchFinalScore: document.getElementById('benchFinalScore'),
  benchSocCard: document.getElementById('benchSocCard'),
  benchSocGameCanvas: document.getElementById('benchSocGameCanvas'),
  benchSocTempCanvas: document.getElementById('benchSocTempCanvas'),
  benchSocMeta: document.getElementById('benchSocMeta'),
  benchSocScore: document.getElementById('benchSocScore'),
  benchDispCard: document.getElementById('benchDispCard'),
  benchDispScore: document.getElementById('benchDispScore'),
  benchCamCard: document.getElementById('benchCamCard'),
  benchCamInfo: document.getElementById('benchCamInfo'),
  benchCamScore: document.getElementById('benchCamScore'),
  benchStorageCard: document.getElementById('benchStorageCard'),
  benchStorageInfo: document.getElementById('benchStorageInfo'),
  benchStorageBits: document.getElementById('benchStorageBits'),
  benchStorageScore: document.getElementById('benchStorageScore'),
  benchBatteryCard: document.getElementById('benchBatteryCard'),
  benchBatterySlide: document.getElementById('benchBatterySlide'),
  benchBatteryScore: document.getElementById('benchBatteryScore')
};

let benchRunToken = 0;
let skuShareValidTimer = 0;
let inventoryUiSyncTimer = 0;
let opsChartProbeTimer = 0;
let opsChartLongPressTimer = 0;
let skuPriceAdjTypingTimer = 0;
let opsChartSuppressClickUntil = 0;
let opsChartTouchStart = null;
let opsChartLayoutMeta = null;
let designRefreshRaf = 0;
let viewportUiRefreshRaf = 0;
let frontPreviewAnimRaf = 0;
let frontPreviewAnimEval = null;
let lastTechMuseumRenderedYear = NaN;
let serviceWorkerBootAttempted = false;
let secretTapCount = 0;
let secretTapTimer = 0;
let secretEntryBound = false;
let secretUnlocked = false;

const designQuizPool = [
  '设计拷问：这代是要做 <strong>跑分战神</strong>，还是 <strong>屏幕卷王</strong>？',
  '设计拷问：你想做 <strong>轻薄小钢炮</strong>，还是 <strong>半斤影像砖</strong>？',
  '设计拷问：SKU 是走 <strong>一招鲜</strong>，还是直接 <strong>全家桶</strong>？'
];

const runQuizPool = [
  '运营拷问：库存见底了，是先 <strong>梭哈补货</strong>，还是先 <strong>观望一月</strong>？',
  '运营拷问：现金发抖时，是 <strong>开贷款续命</strong>，还是 <strong>咬牙硬扛</strong>？',
  '运营拷问：口碑掉线但还能赚，你是 <strong>降价冲榜</strong>，还是 <strong>守价修碑</strong>？'
];

const ACHIEVEMENT_IDS = [
  'the_beginning', 'bench_first', 'first_launch', 'budget_friend', 'thin_margin', 'premium_push',
  'rating_100', 'cash_1b', 'ten_year_veteran', 'screen_collector', 'foldable', 'eink', 'future_eink', 'ebook',
  'ultra_flagship', 'advanced_alloy', 'ceramic', 'no_camera', 'aramid', 'selfie', 'top_lcd', 'flagship_lcd_demon',
  'thermal_maniac', 'satellite', 'battery_tech', 'magsafe', 'ip68_easy', 'small_screen', 'flat_back', 'large_screen',
  'good_luck', 'no_refresh_shell', 'squeeze_toothpaste', 'brand_tone', 'future_reached', 'grand_slam'
];

// Hard block: game-over / restart-required events are never considered achievements.
const NON_ACHIEVEMENT_IDS = new Set([
  'gameover_bankrupt',
  'gameover_reputation',
  'gameover_blackswan',
  'gameover_design_dead_end'
]);

const QUICK_GUIDE_HTML = [
  '目标：活得久、赚得多、口碑高；可持续做多代机，也可企业结算看总成绩。',
  '玩法：先抽市场与难度，再做配置（屏幕/SoC/影像/SKU/营销），立项后按月运营。',
  '经营本质：企业经营是“客观机制 + 主观判断”的组合。市场与周期按规则运行，但你的定价、补货、换代与资源取舍，才是决定结局的关键。',
  '关键：体积能装下、现金别断、定价别离谱、库存别失控；缺货会伤生命周期，压货会拖现金流。',
  '进阶：换代要有变化（屏幕/摄像头/SKU/机身/额外功能），否则会有换代疲劳惩罚。',
  '彩蛋：游戏内有成就系统，欢迎自行探索解锁。',
  `<span class="quick-guide-version">版本：v${GAME_VERSION}</span>`
].join('<br>');

const QUICK_GUIDE_SEEN_KEY = 'start_phone_quick_guide_seen_v1';

function readQuickGuideSeen() {
  try {
    return window.localStorage.getItem(QUICK_GUIDE_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function writeQuickGuideSeen(seen) {
  try {
    window.localStorage.setItem(QUICK_GUIDE_SEEN_KEY, seen ? '1' : '0');
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
}

function refreshQuickGuideButtonState() {
  if (!el.quickGuideBtn) return;
  const seen = readQuickGuideSeen();
  el.quickGuideBtn.classList.toggle('guide-unseen', !seen);
  el.quickGuideBtn.classList.toggle('guide-seen', seen);
}

function renderGameVersionUI() {
  if (el.inlineGuideVersion) {
    el.inlineGuideVersion.textContent = `v${GAME_VERSION}`;
  }
}

function getCurrentStepIndex() {
  if (el.stageRun && !el.stageRun.classList.contains('hidden')) return 3;
  if (el.stageConfig && !el.stageConfig.classList.contains('hidden')) return 2;
  return 1;
}

function resetSecretTapState() {
  secretTapCount = 0;
  if (secretTapTimer) {
    clearTimeout(secretTapTimer);
    secretTapTimer = 0;
  }
}

function ensureSecretDebugPrerequisites() {
  if (!el.region || !el.region.value) assignRandomRegion();
  if (!state.marketPick) {
    if (!Array.isArray(state.marketPool) || !state.marketPool.length) {
      rollThreeMarkets();
    }
    state.marketPick = state.marketPool && state.marketPool.length ? state.marketPool[0] : marketArchetypes[0];
  }
  if (!state.chosenMarket && state.marketPick) {
    state.chosenMarket = state.marketPick;
  }
  updateEventGateState();
}

function forceSyncDesignStateByYear(year) {
  const y = clamp(Math.round(Number(year || HISTORICAL_START_YEAR)), HISTORICAL_START_YEAR, HISTORICAL_HANDOFF_YEAR + 60);
  state.historicalYear = y;
  // Reset historical refresh anchors to avoid stale cadence state after manual year jump.
  state.historicalLastRefreshMonth = Number(state.companyMonthsTotal || 0);
  state.historicalLastRefreshGeneration = getNextGenerationIndex();
  applyHistoricalTechPools(y);
  applyHistoricalExtrasByYear(y);
  refreshTechSelectableOptions();
  refreshMemorySelectableOptions();
  updateDisplayMaterialOptions();
  updateDisplayRatioAndFormOptions();
  updateDisplayFeatureOptions();
  refreshBatteryCapacityInputRange();
  refreshExtrasSelectableOptions();
  enforceLegacyMultiCamGate();
  updateEventGateState();
}

function showSecretCommandHelp() {
  openGameModal(
    '跳关测试指令',
    [
      '<code>help</code> 查看本帮助',
      '<code>step 1|2|3</code> 跳到对应关卡',
      '<code>launch</code> 在设计页直接立项开售',
      '<code>next N</code> 连续推进 N 个月（1-24）',
      '<code>cash N</code> 把现金改为 N',
      '<code>addcash N</code> 现金增加 N',
      '<code>rating N</code> 把口碑改为 1-100',
      '<code>year YYYY</code> 强制切换行业年份',
      '<code>eval</code> 刷新当前设计评估',
      '<code>exit</code> 关闭指令输入'
    ].join('<br>')
  );
}

function runSecretCommand(rawInput) {
  const line = String(rawInput || '').trim();
  if (!line) return { ok: false, text: '空指令' };
  const parts = line.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const arg = parts.slice(1).join(' ').trim();

  if (cmd === 'help') {
    showSecretCommandHelp();
    return { ok: true, text: '已打开指令帮助' };
  }
  if (cmd === 'step') {
    const step = Math.round(Number(arg));
    if (![1, 2, 3].includes(step)) return { ok: false, text: 'step 仅支持 1/2/3' };
    if (step >= 2) ensureSecretDebugPrerequisites();
    if (step === 3 && !state.launched) {
      return { ok: false, text: '尚未开售，先执行 launch 或先进入第2关立项' };
    }
    setStep(step);
    if (step === 2) refreshDesignPanelsLive();
    updateHeader();
    return { ok: true, text: `已跳转到第 ${step} 关` };
  }
  if (cmd === 'cash') {
    const n = Number(arg);
    if (!Number.isFinite(n)) return { ok: false, text: 'cash 参数必须是数字' };
    state.cash = Math.round(n);
    updateHeader();
    return { ok: true, text: `现金已改为 ${RMB(state.cash)}` };
  }
  if (cmd === 'addcash') {
    const n = Number(arg);
    if (!Number.isFinite(n)) return { ok: false, text: 'addcash 参数必须是数字' };
    state.cash += Math.round(n);
    updateHeader();
    return { ok: true, text: `现金已调整，当前 ${RMB(state.cash)}` };
  }
  if (cmd === 'rating') {
    const n = Number(arg);
    if (!Number.isFinite(n)) return { ok: false, text: 'rating 参数必须是数字' };
    state.rating = clamp(Math.round(n), 1, 100);
    updateHeader();
    return { ok: true, text: `口碑已改为 ${Math.round(state.rating)}` };
  }
  if (cmd === 'year') {
    const n = Number(arg);
    if (!Number.isFinite(n)) return { ok: false, text: 'year 参数必须是数字年份' };
    const year = clamp(Math.round(n), HISTORICAL_START_YEAR, HISTORICAL_HANDOFF_YEAR + 60);
    forceSyncDesignStateByYear(year);
    if (getCurrentStepIndex() === 2) {
      refreshDesignPanelsLive();
    } else {
      // Keep design preview fresh even when user is not currently on step 2.
      scheduleRefreshDesignPanelsLive();
    }
    updateHeader();
    return { ok: true, text: `行业年份已切到 ${year}` };
  }
  if (cmd === 'eval') {
    if (getCurrentStepIndex() !== 2) return { ok: false, text: '当前不在设计关卡' };
    refreshDesignPanelsLive();
    return { ok: true, text: '已刷新产品评估' };
  }
  if (cmd === 'launch') {
    ensureSecretDebugPrerequisites();
    if (getCurrentStepIndex() !== 2) setStep(2);
    refreshDesignPanelsLive();
    launch();
    return { ok: true, text: state.launched ? '已执行立项开售' : '立项失败，请先修正设计' };
  }
  if (cmd === 'next') {
    const nRaw = arg ? Number(arg) : 1;
    if (!Number.isFinite(nRaw)) return { ok: false, text: 'next 参数必须是数字' };
    const n = clamp(Math.round(nRaw), 1, 24);
    if (!state.launched) return { ok: false, text: '尚未开售，先执行 launch' };
    if (getCurrentStepIndex() !== 3) setStep(3);
    let done = 0;
    for (let i = 0; i < n; i += 1) {
      if (state.ended || state.phaseEnded) break;
      const before = Number(state.month || 0);
      nextMonth();
      if (Number(state.month || 0) === before) break;
      done += 1;
    }
    updateHeader();
    return { ok: true, text: `已推进 ${done} 个月` };
  }
  return { ok: false, text: `未知指令：${cmd}` };
}

function openSecretCommandPrompt() {
  if (!secretUnlocked) return;
  const line = window.prompt(
    '测试模式已开启\n输入 help 查看指令，输入 exit 关闭。\n（示例：step 2 / launch / next 6 / cash 20000000）',
    ''
  );
  if (line === null) return;
  const text = String(line || '').trim();
  if (!text) return;
  if (/^(exit|quit)$/i.test(text)) {
    showMobileRunDockAction('跳关指令已退出', 'neutral');
    return;
  }
  const result = runSecretCommand(text);
  showMobileRunDockAction(result.text, result.ok ? 'good' : 'bad');
}

function openSecretUnlockPrompt() {
  const code = window.prompt('隐藏测试入口：请输入密令');
  if (code === null) return;
  if (String(code).trim() !== SECRET_TEST_CODE) {
    showMobileRunDockAction('密令错误', 'bad');
    return;
  }
  secretUnlocked = true;
  showMobileRunDockAction('跳关模式已解锁', 'good');
  showSecretCommandHelp();
}

function bindSecretJumpEntry() {
  if (secretEntryBound || !el.secretTitle) return;
  secretEntryBound = true;
  el.secretTitle.addEventListener('click', () => {
    secretTapCount += 1;
    if (secretTapTimer) clearTimeout(secretTapTimer);
    secretTapTimer = window.setTimeout(() => {
      resetSecretTapState();
    }, SECRET_TEST_TAP_WINDOW_MS);
    if (secretTapCount < SECRET_TEST_TRIGGER_TAPS) return;
    resetSecretTapState();
    if (secretUnlocked) openSecretCommandPrompt();
    else openSecretUnlockPrompt();
  });
}

function pickRandom(arr) {
  if (!Array.isArray(arr) || !arr.length) return '';
  return arr[Math.floor(Math.random() * arr.length)];
}

function renderStageQuiz(step) {
  if (el.designQuiz) {
    if (step === 2) {
      el.designQuiz.innerHTML = pickRandom(designQuizPool);
      el.designQuiz.classList.remove('hidden');
    } else {
      el.designQuiz.classList.add('hidden');
    }
  }
  if (el.runQuiz) {
    if (step === 3) {
      el.runQuiz.innerHTML = pickRandom(runQuizPool);
      el.runQuiz.classList.remove('hidden');
    } else {
      el.runQuiz.classList.add('hidden');
    }
  }
}

function updateStartupDifficultyStyle() {
  if (!el.startupDifficulty) return;
  el.startupDifficulty.classList.remove('diff-real', 'diff-hard');
  if (el.startupDifficulty.value === 'hard') {
    el.startupDifficulty.classList.add('diff-hard');
    return;
  }
  el.startupDifficulty.classList.add('diff-real');
}

function shortNum(v) {
  const n = Number(v) || 0;
  if (Math.abs(n) >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${Math.round(n)}`;
}

function hexToRgb(hex) {
  const raw = String(hex || '').replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return { r: 40, g: 58, b: 78 };
  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16)
  };
}

function rgbToCss(rgb, a = 1) {
  return `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${a})`;
}

function refreshBackColorControl() {
  if (!el.backColor) return;
  const color = el.backColor.value || '#2e4a66';
  const holder = el.backColor.closest('.preview-color-control');
  if (holder) {
    holder.style.setProperty('--picked-color', color);
  }
}

function refreshFrontFrameColorControl() {
  if (!el.frontFrameColor) return;
  const color = el.frontFrameColor.value || '#1a232f';
  const holder = el.frontFrameColor.closest('.preview-color-control');
  if (holder) {
    holder.style.setProperty('--picked-color', color);
  }
}

function shiftRgb(rgb, delta) {
  return {
    r: clamp(rgb.r + delta, 0, 255),
    g: clamp(rgb.g + delta, 0, 255),
    b: clamp(rgb.b + delta, 0, 255)
  };
}

function pickBand(v, rules, fallback) {
  for (const r of rules) {
    if (v >= r.min) return r.text;
  }
  return fallback;
}

function cashMood(cash) {
  return pickBand(cash, [
    { min: 12_000_000, text: '<span class="good">现金很宽裕</span>' },
    { min: 6_000_000, text: '<span class="good">现金健康</span>' },
    { min: 2_500_000, text: '<span class="risk-warn">现金开始紧绷</span>' },
    { min: 800_000, text: '<span class="bad">现金危险</span>' }
  ], '<span class="bad">现金濒危</span>');
}

function ratingMood(rating) {
  return pickBand(rating, [
    { min: 82, text: '<span class="good">口碑爆棚</span>' },
    { min: 68, text: '<span class="good">口碑稳定</span>' },
    { min: 52, text: '<span class="risk-warn">口碑一般</span>' },
    { min: 38, text: '<span class="bad">口碑走低</span>' }
  ], '<span class="bad">口碑告急</span>');
}

function regionNarrative(region) {
  const supply = pickBand(region.supplyEco || 1, [
    { min: 1.12, text: '供应链很顺' },
    { min: 0.98, text: '供应链可用' }
  ], '供应链吃紧');
  const rd = pickBand(region.rdTalent || 1, [
    { min: 1.1, text: '研发土壤强' },
    { min: 0.96, text: '研发基础中等' }
  ], '研发资源偏弱');
  const channel = pickBand((region.onlineInfra || 1) + (region.offlineInfra || 1), [
    { min: 2.2, text: '渠道成熟' },
    { min: 1.9, text: '渠道可打' }
  ], '渠道建设压力大');
  const cost = pickBand((region.labor || 1) + (region.rent || 1), [
    { min: 2.4, text: '运营成本偏高' },
    { min: 2.0, text: '运营成本中等' }
  ], '运营成本友好');
  return `${supply}，${rd}，${channel}，${cost}。`;
}

function channelNarrative(onlineShare) {
  if (onlineShare >= 0.66) return '线上是主战场，节奏要快。';
  if (onlineShare <= 0.42) return '线下更吃香，门店体验更关键。';
  return '线上线下都能打，适合均衡推进。';
}

function demandNarrative(phase, growth, stockoutRatio, demandTarget, baseDemand) {
  const phaseText = `当前在${phase}。`;
  const trendText = growth >= 0.16
    ? '需求明显上扬。'
    : growth <= -0.18
      ? '需求正在快速回落。'
      : '需求处于震荡。';
  const supplyText = stockoutRatio > 0.22
    ? '缺货正在放大波动。'
    : '供货暂时稳住了节奏。';
  const strength = baseDemand > 0 ? demandTarget / baseDemand : 0;
  const heatText = strength >= 1.08
    ? '市场热度偏高。'
    : strength <= 0.58
      ? '市场热度偏冷。'
      : '市场热度中性。';
  return `${phaseText}${trendText}${heatText}${supplyText}`;
}

function inventoryNarrative(inventory, sold, unmetDemandUnits) {
  if (inventory <= 0 && unmetDemandUnits > 0) return '<span class="risk-warn">库存见底，丢单明显</span>';
  if (inventory > sold * 2.2) return '<span class="risk-warn">库存偏重，注意滞销</span>';
  if (unmetDemandUnits > sold * 0.25) return '<span class="risk-warn">供不应求，补货要快</span>';
  return '<span class="good">库存节奏正常</span>';
}

function returnNarrative(rate) {
  if (rate >= 0.04) return '<span class="bad">退货风险偏高，口碑承压</span>';
  if (rate >= 0.025) return '<span class="risk-warn">退货风险中等，需盯售后</span>';
  return '<span class="good">退货风险可控</span>';
}

function qualityNarrative(e, returnRate) {
  const quality = pickBand(e.qualityScore, [
    { min: 82, text: '产品力很强' },
    { min: 68, text: '产品力稳健' },
    { min: 55, text: '产品力中规中矩' }
  ], '产品力偏弱');
  const appearance = e.appearanceDemandFactor >= 0.95
    ? '外观容易被接受'
    : e.appearanceDemandFactor >= 0.82
      ? '外观接受度一般'
      : '外观争议较大';
  const reliability = returnRate >= 0.035 ? '稳定性是短板' : '稳定性尚可';
  return `${quality}，${appearance}，${reliability}。`;
}

function pushTimelinePoint() {
  const timelineYear = Math.max(HISTORICAL_START_YEAR, Math.floor(Number(state.historicalYear || HISTORICAL_START_YEAR)));
  const timelineMonth = ((Math.max(0, Number(state.companyMonthsTotal || 0)) % 12) + 1);
  const point = {
    m: state.companyMonthsTotal,
    y: timelineYear,
    ym: timelineMonth,
    cash: state.cash,
    inv: computeTotalInventory(),
    sold: state.companySoldTotal,
    rating: state.rating
  };
  if (!state.timeline.length) {
    state.timeline.push(point);
    return;
  }
  const last = state.timeline[state.timeline.length - 1];
  if (last.m === point.m) {
    state.timeline[state.timeline.length - 1] = point;
  } else {
    state.timeline.push(point);
  }
}

const OPS_CHART_SERIES = [
  { key: 'cash', label: '现金', color: '#6ee7ff' },
  { key: 'inv', label: 'SKU库存', color: '#ffb37a' },
  { key: 'sold', label: '累计销量', color: '#8ee39d' },
  { key: 'rating', label: '口碑', color: '#f8a5ff' }
];

function getOpsChartBasePoints() {
  if (state.timeline.length) return [...state.timeline];
  return [{
    m: 0,
    y: Math.max(HISTORICAL_START_YEAR, Math.floor(Number(state.historicalYear || HISTORICAL_START_YEAR))),
    ym: 1,
    cash: state.cash,
    inv: computeTotalInventory(),
    sold: state.companySoldTotal,
    rating: state.rating
  }];
}

function formatOpsTimelineLabel(pointLike) {
  const p = pointLike || {};
  const year = Math.max(HISTORICAL_START_YEAR, Math.floor(Number(p.y || state.historicalYear || HISTORICAL_START_YEAR)));
  const month = clamp(Math.floor(Number(p.ym || 1)), 1, 12);
  return `${year}/${String(month).padStart(2, '0')}`;
}

function setOpsChartProbeText(text, active = false, autoResetMs = 0) {
  if (!el.opsChartProbe) return;
  el.opsChartProbe.textContent = text;
  el.opsChartProbe.classList.toggle('is-active', Boolean(active));
  if (opsChartProbeTimer) {
    window.clearTimeout(opsChartProbeTimer);
    opsChartProbeTimer = 0;
  }
  if (autoResetMs > 0) {
    opsChartProbeTimer = window.setTimeout(() => {
      if (!el.opsChartProbe) return;
      el.opsChartProbe.textContent = '点图看该月指标；长按看完整周期。';
      el.opsChartProbe.classList.remove('is-active');
      opsChartProbeTimer = 0;
    }, autoResetMs);
  }
}

function getOpsChartPointFromClientX(clientX) {
  if (!el.opsChart || !opsChartLayoutMeta || !opsChartLayoutMeta.points || !opsChartLayoutMeta.points.length) return null;
  const rect = el.opsChart.getBoundingClientRect();
  if (!rect.width) return null;
  const x = clamp(clientX - rect.left, 0, rect.width);
  const padL = Number(opsChartLayoutMeta.padL || 0);
  const plotW = Math.max(1, Number(opsChartLayoutMeta.plotW || 1));
  const minM = Number(opsChartLayoutMeta.minM || 0);
  const mSpan = Math.max(1, Number(opsChartLayoutMeta.mSpan || 1));
  const plotX = clamp(x - padL, 0, plotW);
  const targetM = minM + (plotX / plotW) * mSpan;
  let best = opsChartLayoutMeta.points[0];
  let bestDist = Math.abs(Number(best.m || 0) - targetM);
  for (let i = 1; i < opsChartLayoutMeta.points.length; i += 1) {
    const p = opsChartLayoutMeta.points[i];
    const d = Math.abs(Number(p.m || 0) - targetM);
    if (d < bestDist) {
      best = p;
      bestDist = d;
    }
  }
  return best;
}

function probeOpsChartAtClientX(clientX) {
  const point = getOpsChartPointFromClientX(clientX);
  if (!point) return;
  const msg = `${formatOpsTimelineLabel(point)}｜现金 ¥${Math.round(Number(point.cash || 0)).toLocaleString('zh-CN')}｜库存 ${Math.round(Number(point.inv || 0)).toLocaleString('zh-CN')}｜销量 ${Math.round(Number(point.sold || 0)).toLocaleString('zh-CN')}｜口碑 ${Math.round(Number(point.rating || 0))}`;
  setOpsChartProbeText(msg, true, 2600);
}

function drawOpsChart(ctx, cw, ch, points, isFullView) {
  const isNarrow = cw <= 380;
  const pad = { l: 42, r: 14, t: 24, b: isNarrow ? 34 : 28 };
  const plotW = Math.max(10, cw - pad.l - pad.r);
  const plotH = Math.max(10, ch - pad.t - pad.b);

  ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle = 'rgba(7,16,28,0.92)';
  ctx.fillRect(0, 0, cw, ch);

  ctx.strokeStyle = 'rgba(160,198,236,0.2)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.t + (plotH * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(cw - pad.r, y);
    ctx.stroke();
  }

  const months = points.map((p) => p.m);
  const minM = Math.min(...months);
  const maxM = Math.max(...months);
  const mSpan = Math.max(1, maxM - minM);
  const xAt = (m) => pad.l + ((m - minM) / mSpan) * plotW;

  OPS_CHART_SERIES.forEach((s) => {
    const vals = points.map((p) => Number(p[s.key] || 0));
    let minV = Math.min(...vals);
    let maxV = Math.max(...vals);
    if (Math.abs(maxV - minV) < 1e-6) {
      minV -= 1;
      maxV += 1;
    }
    const yAt = (v) => pad.t + (1 - (v - minV) / (maxV - minV)) * plotH;
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    points.forEach((p, idx) => {
      const x = xAt(p.m);
      const y = yAt(Number(p[s.key] || 0));
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    const lastPoint = points[points.length - 1];
    const lx = xAt(lastPoint.m);
    const ly = yAt(Number(lastPoint[s.key] || 0));
    ctx.beginPath();
    ctx.arc(lx, ly, 2.4, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.fill();
  });

  ctx.strokeStyle = 'rgba(180,210,240,0.45)';
  ctx.beginPath();
  ctx.moveTo(pad.l, pad.t + plotH);
  ctx.lineTo(cw - pad.r, pad.t + plotH);
  ctx.stroke();

  const startPoint = points[0] || { y: HISTORICAL_START_YEAR, ym: 1 };
  const midPoint = points[Math.floor((points.length - 1) / 2)] || startPoint;
  const endPoint = points[points.length - 1] || startPoint;
  const startLabel = formatOpsTimelineLabel(startPoint);
  const midLabel = formatOpsTimelineLabel(midPoint);
  const endLabel = formatOpsTimelineLabel(endPoint);

  ctx.fillStyle = 'rgba(205,224,244,0.9)';
  ctx.font = `${isNarrow ? 10 : 11}px "JetBrains Mono", monospace`;
  ctx.fillText(startLabel, pad.l, ch - 8);
  if (!isNarrow) {
    const midW = ctx.measureText(midLabel).width;
    ctx.fillText(midLabel, pad.l + plotW / 2 - midW / 2, ch - 8);
  }
  const endW = ctx.measureText(endLabel).width;
  ctx.fillText(endLabel, cw - pad.r - endW, ch - 8);
  ctx.fillStyle = 'rgba(166,198,228,0.88)';
  ctx.font = `${isNarrow ? 10 : 11}px "Noto Sans SC", sans-serif`;
  ctx.fillText(isFullView ? '完整周期（独立刻度）' : '最近6个月', pad.l, 13);

  if (!isFullView) {
    opsChartLayoutMeta = {
      points: [...points],
      padL: pad.l,
      plotW,
      minM,
      mSpan
    };
  }
}

function renderOpsChart(options = {}) {
  const canvas = el.opsChart;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 20) return;
  const dpr = window.devicePixelRatio || 1;
  const cw = Math.floor(rect.width);
  const ch = Math.floor(rect.height || 260);
  canvas.width = Math.floor(cw * dpr);
  canvas.height = Math.floor(ch * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const fullCycle = Boolean(options.fullCycle);
  const allPoints = getOpsChartBasePoints();
  const points = fullCycle ? allPoints : allPoints.slice(-6);
  drawOpsChart(ctx, cw, ch, points, fullCycle);
  if (!fullCycle && el.opsChartProbe && !el.opsChartProbe.classList.contains('is-active')) {
    el.opsChartProbe.textContent = isMobileTouchUiForChart()
      ? '点图看该月指标；长按看完整周期。'
      : '点击图表查看完整企业周期。';
  }
}

function openOpsChartFullView() {
  if (!el.previewLightbox || !el.previewLightboxImage) return;
  const points = getOpsChartBasePoints();
  const fullCanvas = document.createElement('canvas');
  fullCanvas.width = 1080;
  fullCanvas.height = 620;
  const ctx = fullCanvas.getContext('2d');
  if (!ctx) return;
  drawOpsChart(ctx, 1080, 620, points, true);
  el.previewLightboxImage.src = fullCanvas.toDataURL('image/png');
  if (el.previewLightboxTitle) {
    el.previewLightboxTitle.textContent = '企业趋势图（完整周期）';
  }
  el.previewLightbox.classList.remove('hidden');
}

function isMobileTouchUiForChart() {
  try {
    return window.matchMedia('(max-width: 900px) and (pointer: coarse)').matches;
  } catch {
    return isMobileViewportForRunDock();
  }
}

function bindOpsChartInteractions() {
  if (!el.opsChart) return;

  el.opsChart.addEventListener('click', (evt) => {
    if (Date.now() < opsChartSuppressClickUntil) {
      evt.preventDefault();
      return;
    }
    if (isMobileTouchUiForChart()) {
      probeOpsChartAtClientX(evt.clientX);
      return;
    }
    openOpsChartFullView();
  });

  el.opsChart.addEventListener('touchstart', (evt) => {
    if (!isMobileTouchUiForChart()) return;
    if (!evt.touches || evt.touches.length !== 1) return;
    const t = evt.touches[0];
    opsChartTouchStart = { x: t.clientX, y: t.clientY };
    if (opsChartLongPressTimer) window.clearTimeout(opsChartLongPressTimer);
    opsChartLongPressTimer = window.setTimeout(() => {
      opsChartSuppressClickUntil = Date.now() + 700;
      setOpsChartProbeText('已打开完整周期图', true, 1200);
      openOpsChartFullView();
      opsChartLongPressTimer = 0;
    }, 550);
  }, { passive: true });

  el.opsChart.addEventListener('touchmove', (evt) => {
    if (!isMobileTouchUiForChart() || !opsChartTouchStart || !evt.touches || !evt.touches.length) return;
    const t = evt.touches[0];
    const moved = Math.hypot((t.clientX - opsChartTouchStart.x), (t.clientY - opsChartTouchStart.y));
    if (moved > 14 && opsChartLongPressTimer) {
      window.clearTimeout(opsChartLongPressTimer);
      opsChartLongPressTimer = 0;
    }
  }, { passive: true });

  el.opsChart.addEventListener('touchend', (evt) => {
    if (!isMobileTouchUiForChart()) return;
    if (opsChartLongPressTimer) {
      window.clearTimeout(opsChartLongPressTimer);
      opsChartLongPressTimer = 0;
      const t = (evt.changedTouches && evt.changedTouches[0]) || null;
      if (t) probeOpsChartAtClientX(t.clientX);
    }
    opsChartSuppressClickUntil = Date.now() + 450;
    opsChartTouchStart = null;
  }, { passive: true });

  el.opsChart.addEventListener('touchcancel', () => {
    if (opsChartLongPressTimer) {
      window.clearTimeout(opsChartLongPressTimer);
      opsChartLongPressTimer = 0;
    }
    opsChartTouchStart = null;
  }, { passive: true });
}

function roundedRectPath(ctx, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

function clearPhonePreview() {
  [el.phoneRenderCanvas, el.phoneFrontCanvas].forEach((canvas) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 20) return;
    const dpr = window.devicePixelRatio || 1;
    const cw = Math.floor(rect.width);
    const ch = Math.floor(rect.height || 280);
    canvas.width = Math.floor(cw * dpr);
    canvas.height = Math.floor(ch * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
  });
}

function openPreviewLightbox(canvas, title) {
  if (!canvas || !el.previewLightbox || !el.previewLightboxImage) return;
  const data = canvas.toDataURL('image/png');
  el.previewLightboxImage.src = data;
  if (el.previewLightboxTitle) {
    el.previewLightboxTitle.textContent = title || '机型预览';
  }
  el.previewLightbox.classList.remove('hidden');
  refreshOverlayLockState();
}

function closePreviewLightbox() {
  if (!el.previewLightbox) return;
  el.previewLightbox.classList.add('hidden');
  refreshOverlayLockState();
}

function setBootLoading(text, isError = false, step = 0, total = 0) {
  if (!el.bootLoading) return;
  el.bootLoading.classList.remove('hidden');
  if (el.bootLoadingText) el.bootLoadingText.textContent = text || '正在加载中，请稍候…';
  if (el.bootReload) el.bootReload.classList.toggle('hidden', !isError);
  if (el.bootLoadingProgress) {
    if (step > 0 && total > 0) el.bootLoadingProgress.textContent = `${step}/${total}`;
    else el.bootLoadingProgress.textContent = '';
  }
  if (el.bootLoadingFill) {
    const pct = (step > 0 && total > 0) ? Math.max(0, Math.min(100, (step / total) * 100)) : 0;
    el.bootLoadingFill.style.width = `${pct}%`;
  }
}

function hideBootLoading() {
  if (!el.bootLoading) return;
  el.bootLoading.classList.add('hidden');
}

function recoverStageAfterRuntimeError() {
  if (state.ended) {
    setStep(3);
    return;
  }
  if (state.launched) {
    setStep(3);
    return;
  }
  if (state.chosenMarket) {
    setStep(2);
    return;
  }
  setStep(1);
}

function reportRuntimeError(context, errLike) {
  if (runtimeErrorHandling) return;
  runtimeErrorHandling = true;
  const err = errLike instanceof Error ? errLike : new Error(String(errLike || 'unknown'));
  const msg = String(err && err.message ? err.message : errLike || 'unknown error');
  const stackLine = err && err.stack ? String(err.stack).split('\n')[1] || '' : '';
  try {
    // Keep diagnostics for local debugging.
    // eslint-disable-next-line no-console
    console.error(`[RuntimeError][${context}]`, err);
  } catch {
    // ignore
  }
  if (el.reportBox) {
    el.reportBox.innerHTML = `<span class="bad">运行异常：${msg}</span><br>已尝试自动恢复界面，请继续操作或重开新局。`;
  }
  if (el.gameModal && el.gameModalStack) {
    const detail = stackLine ? `<br><span class="tiny">定位：${stackLine.replace(/[<>&]/g, '')}</span>` : '';
    openGameModal(
      '运行异常',
      `检测到异常并已尝试恢复界面。<br><span class="risk-warn">错误：${msg.replace(/[<>&]/g, '')}</span>${detail}`
    );
  }
  recoverStageAfterRuntimeError();
  refreshOverlayLockState();
  runtimeErrorHandling = false;
}

function refreshOverlayLockState() {
  if (
    el.gameModal
    && el.gameModalStack
    && !el.gameModal.classList.contains('hidden')
    && el.gameModalStack.children.length === 0
  ) {
    el.gameModal.classList.add('hidden');
  }
  const hasOverlayOpen = Boolean(
    (el.achievePanel && !el.achievePanel.classList.contains('hidden'))
    || (el.gameModal && !el.gameModal.classList.contains('hidden'))
    || (el.previewLightbox && !el.previewLightbox.classList.contains('hidden'))
    || (el.benchPage && !el.benchPage.classList.contains('hidden'))
  );
  document.body.classList.toggle('overlay-open', hasOverlayOpen);
}

function drawFrontDisplayShape(ctx, v, sx, sy, sw, sh, scale) {
  const formName = v.disp.form ? String(v.disp.form.name || '') : '';
  const isLegacyForm = ['普通', 'ID无边框', '真·窄边框', '三边全面屏'].includes(formName);
  const isLegacyThreeSide = formName.includes('三边全面屏');
  const isFoldableMat = Boolean(v && v.disp && v.disp.mat && String(v.disp.mat.name || '') === '折叠屏');
  const islandEnabled = (Array.isArray(v.chosenExtras) ? v.chosenExtras : []).some((ex) => ex.id === 'dynamic_island');
  const frontCamId = v.cams && v.cams.front ? String(v.cams.front.id || '') : 'none';
  if (isLegacyForm) {
    const speakerW = clamp(sw * 0.26, 16, 42);
    const speakerH = clamp(sh * 0.016, 2.2, 4.2);
    const speakerY = Math.max(2, sy - Math.max(5.5, speakerH + 2.8));
    const speakerX = sx + (sw - speakerW) / 2;
    roundedRectPath(ctx, speakerX, speakerY, speakerW, speakerH, speakerH / 2);
    ctx.fillStyle = 'rgba(18,25,36,0.88)';
    ctx.fill();
    if (frontCamId !== 'none') {
      const camR = clamp((2.1 * Math.max(0.35, Number(scale) || 1)) / 2, 1.2, 2.3);
      const camX = isLegacyThreeSide
        ? (sx + sw * 0.5)
        : (sx + sw - Math.max(7, sw * 0.08));
      // 三边全面屏：前摄在下巴区域；其余老形态保持顶部位置。
      const camY = isLegacyThreeSide
        ? (sy + sh + Math.max(camR + 1.2, sh * 0.035))
        : (speakerY + speakerH * 0.5);
      ctx.beginPath();
      ctx.arc(camX, camY, camR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6,10,16,0.96)';
      ctx.fill();
    }
    return;
  }
  if (frontCamId === 'none') return;
  if (formName.includes('升降')) {
    // 升降前摄：机身顶部外凸的小方块，镜头位于方块内部。
    const moduleW = clamp(8.4 * Math.max(0.35, Number(scale) || 1), 10, 17);
    const moduleH = clamp(5.4 * Math.max(0.35, Number(scale) || 1), 7, 13);
    const stemW = moduleW * 0.46;
    const animT = performance.now() / 820;
    const lift = (Math.sin(animT) + 1) * 0.5; // 0..1
    const liftPx = clamp(0.45 + lift * 1.05, 0.45, 1.5);
    const stemH = clamp(moduleH * 0.34 + lift * 0.25, 1.6, 3.9);
    const mx = sx + (sw - moduleW) / 2;
    const my = sy - moduleH - Math.max(0.6, moduleH * 0.22) - liftPx;

    // 与机身连接的短“升降导轨”底座
    roundedRectPath(ctx, mx + (moduleW - stemW) / 2, my + moduleH - stemH * 0.58, stemW, stemH, stemH * 0.42);
    ctx.fillStyle = 'rgba(20,28,40,0.84)';
    ctx.fill();

    // 外凸方块主体
    roundedRectPath(ctx, mx, my, moduleW, moduleH, Math.max(1.8, moduleH * 0.22));
    const mg = ctx.createLinearGradient(mx, my, mx, my + moduleH);
    mg.addColorStop(0, 'rgba(58,72,92,0.97)');
    mg.addColorStop(1, 'rgba(20,29,41,0.98)');
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(162,188,220,0.32)';
    ctx.lineWidth = 0.9;
    ctx.stroke();

    const camR = clamp(moduleH * 0.24, 1.4, 2.8);
    const cx = mx + moduleW * 0.5;
    const cy = my + moduleH * 0.48;
    ctx.beginPath();
    ctx.arc(cx, cy, camR * 1.25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(102,132,166,0.52)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, camR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6,10,16,0.98)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + camR * 0.24, cy - camR * 0.24, camR * 0.28, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(126,184,236,0.52)';
    ctx.fill();
    return;
  }
  const isSmallFrontModule = frontCamId === 'front_32';
  // "前摄模组"走小尺寸（约2.5mm）；其他前摄模组走更大尺寸。
  const frontHoleDiameterMm = isSmallFrontModule ? 2.5 : 4.8;
  const baseR = clamp(
    (frontHoleDiameterMm * Math.max(0.35, Number(scale) || 1)) / 2,
    isSmallFrontModule ? 1.6 : 2.8,
    isSmallFrontModule ? 3.4 : 6.2
  );
  const topY = sy + Math.max(4, sh * 0.04);
  const centerX = isFoldableMat
    ? (sx + Math.max(8, sw * 0.16))
    : (sx + sw / 2);
  ctx.fillStyle = 'rgba(5,8,12,0.96)';
  if (formName.includes('刘海')) {
    const nw = Math.max(baseR * 7.6, Math.min(sw * 0.36, baseR * 10.2));
    const nh = Math.max(baseR * 2.4, Math.min(sh * 0.07, baseR * 3.8));
    roundedRectPath(ctx, centerX - nw / 2, sy, nw, nh, nh * 0.35);
    ctx.fill();
  } else if (formName.includes('水滴')) {
    // 水滴屏是“顶部下半滴”切口，而不是完整水滴。
    const rr = baseR * 1.02;
    const notchTopY = sy - 0.4;
    const notchDepth = clamp(rr * 1.55, 3.2, 8.6);
    const halfW = clamp(rr * 1.08, 2.2, 5.6);
    ctx.beginPath();
    ctx.moveTo(centerX - halfW, notchTopY);
    ctx.quadraticCurveTo(centerX - halfW * 0.84, notchTopY + notchDepth * 0.62, centerX, notchTopY + notchDepth);
    ctx.quadraticCurveTo(centerX + halfW * 0.84, notchTopY + notchDepth * 0.62, centerX + halfW, notchTopY);
    ctx.closePath();
    ctx.fill();
  } else if (formName.includes('单挖孔')) {
    const rr = baseR;
    ctx.beginPath();
    ctx.arc(centerX, topY + rr, rr, 0, Math.PI * 2);
    ctx.fill();
    if (islandEnabled) {
      // Keep single-hole shape as a circle on all devices.
      // "Dynamic island" only adds a subtle glow hint, not a capsule cutout.
      const gx = centerX;
      const gy = topY + rr * 1.25;
      const grad = ctx.createRadialGradient(gx, gy, rr * 0.55, gx, gy, rr * 2.1);
      grad.addColorStop(0, 'rgba(18,32,52,0.42)');
      grad.addColorStop(1, 'rgba(18,32,52,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(gx, gy, rr * 2.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(5,8,12,0.96)';
    }
  } else if (formName.includes('药丸')) {
    const pw = Math.max(baseR * 5.4, Math.min(sw * 0.12, baseR * 7.2));
    const ph = Math.max(baseR * 2.0, Math.min(sh * 0.03, baseR * 2.8));
    roundedRectPath(ctx, centerX - pw / 2, topY, pw, ph, ph / 2);
    ctx.fill();
  } else if (formName.includes('屏下')) {
    ctx.fillStyle = 'rgba(28,44,66,0.35)';
    ctx.beginPath();
    ctx.arc(centerX, topY + Math.max(3, baseR * 1.4), Math.max(baseR * 0.95, 1.5), 0, Math.PI * 2);
    ctx.fill();
  } else if (formName.includes('上下对称窄边框')) {
    const tinyR = clamp(baseR * 0.54, 1.1, 2.2);
    ctx.beginPath();
    ctx.arc(centerX, sy - Math.max(2.4, tinyR * 1.5), tinyR, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLegacyIdBorderIllusion(ctx, v, phoneRect, screenRect, screenRadius) {
  const formName = v && v.disp && v.disp.form ? String(v.disp.form.name || '') : '';
  if (!formName.includes('ID无边框')) return;
  const { x, y, w, h, radius } = phoneRect;
  const { sx, sy, sw, sh } = screenRect;
  const r = Math.max(0, Number(screenRadius || 0));

  // Early "ID bezelless" illusion:
  // 整块深色前玻璃覆盖 + 两侧黑矩阵过渡，视觉上把边框“融进屏幕黑场”。
  ctx.save();
  roundedRectPath(ctx, x, y, w, h, radius);
  ctx.clip();

  // Whole front deep glass tint (stronger than normal frame, but still screen-like).
  const glass = ctx.createLinearGradient(x, y, x, y + h);
  glass.addColorStop(0, 'rgba(8,14,24,0.34)');
  glass.addColorStop(0.48, 'rgba(6,12,20,0.26)');
  glass.addColorStop(1, 'rgba(5,10,16,0.3)');
  ctx.fillStyle = glass;
  ctx.fillRect(x, y, w, h);

  // Dark matrix ring around the visible display area (evenodd fill),
  // with extra side emphasis to mimic ID "hidden bezels".
  ctx.beginPath();
  roundedRectPath(ctx, x + 0.6, y + 0.6, w - 1.2, h - 1.2, Math.max(4, radius - 0.8));
  if (r <= 0.1) {
    ctx.rect(sx, sy, sw, sh);
  } else {
    roundedRectPath(ctx, sx, sy, sw, sh, r);
  }
  ctx.fillStyle = 'rgba(4,8,14,0.4)';
  ctx.fill('evenodd');

  // Side blend bands: bezels look like "screen-adjacent dark glass" rather than obvious borders.
  const sideBandW = Math.max(2.8, (sx - x) * 0.86);
  const bandTop = sy + sh * 0.02;
  const bandH = sh * 0.96;
  const leftBandGrad = ctx.createLinearGradient(x, 0, sx + sideBandW, 0);
  leftBandGrad.addColorStop(0, 'rgba(8,14,22,0.62)');
  leftBandGrad.addColorStop(1, 'rgba(10,18,30,0.16)');
  ctx.fillStyle = leftBandGrad;
  roundedRectPath(ctx, x + 0.8, bandTop, sideBandW, bandH, Math.max(2, sideBandW * 0.35));
  ctx.fill();
  const rightBandX = sx + sw - sideBandW;
  const rightBandGrad = ctx.createLinearGradient(rightBandX, 0, x + w, 0);
  rightBandGrad.addColorStop(0, 'rgba(10,18,30,0.16)');
  rightBandGrad.addColorStop(1, 'rgba(8,14,22,0.62)');
  ctx.fillStyle = rightBandGrad;
  roundedRectPath(ctx, rightBandX, bandTop, sideBandW, bandH, Math.max(2, sideBandW * 0.35));
  ctx.fill();

  // Soft edge transition to reduce "ordinary frame" look.
  const edgeGlow = ctx.createLinearGradient(sx, sy, sx, sy + sh);
  edgeGlow.addColorStop(0, 'rgba(78,128,190,0.04)');
  edgeGlow.addColorStop(0.5, 'rgba(78,128,190,0.0)');
  edgeGlow.addColorStop(1, 'rgba(78,128,190,0.04)');
  ctx.strokeStyle = edgeGlow;
  ctx.lineWidth = 0.9;
  if (r <= 0.1) ctx.strokeRect(sx + 0.5, sy + 0.5, Math.max(1, sw - 1), Math.max(1, sh - 1));
  else {
    roundedRectPath(ctx, sx, sy, sw, sh, r);
    ctx.stroke();
  }

  // Glass highlight sweep across front panel.
  const sweep = ctx.createLinearGradient(x, y, x + w, y + h * 0.25);
  sweep.addColorStop(0, 'rgba(170,220,255,0.09)');
  sweep.addColorStop(0.35, 'rgba(170,220,255,0.02)');
  sweep.addColorStop(1, 'rgba(170,220,255,0)');
  ctx.fillStyle = sweep;
  roundedRectPath(ctx, x + 1.2, y + 1.2, w - 2.4, h * 0.38, Math.max(4, radius - 1.2));
  ctx.fill();

  ctx.restore();
}

function renderPhonePreview(buildEval) {
  const canvas = el.phoneRenderCanvas;
  if (!canvas || !buildEval || !buildEval.input) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 20) return;
  const dpr = window.devicePixelRatio || 1;
  const cw = Math.floor(rect.width);
  const ch = Math.floor(rect.height || 280);
  canvas.width = Math.floor(cw * dpr);
  canvas.height = Math.floor(ch * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cw, ch);

  const v = buildEval.input;
  const wMm = Math.max(35, Number(v.phoneW) || 76);
  const hMm = Math.max(80, Number(v.phoneH) || 160);
  const tMm = clamp(Number(v.phoneT) || 9.5, 3.5, 14);
  // Reduce safety margins so the phone occupies more canvas area.
  const scale = Math.min((cw - 84) / 180, (ch - 46) / 260) * 1.06;
  const fw = wMm * scale;
  const fh = hMm * scale;
  const depthX = tMm * scale * 0.95;
  const depthY = tMm * scale * 0.58;
  const x = (cw - fw - depthX) / 2;
  const y = (ch - fh + depthY) / 2;
  const radius = clamp(Math.min(fw, fh) * 0.08, 8, 24);
  const backRgb = hexToRgb(el.backColor ? el.backColor.value : '#2e4a66');
  const bodyId = String(v.body && v.body.id ? v.body.id : '');
  const frameRgb = hexToRgb('#1a232f');
  const backLight = shiftRgb(backRgb, 18);
  const backDark = shiftRgb(backRgb, -24);
  let frameMid = shiftRgb(frameRgb, -2);
  let frameDark = shiftRgb(frameRgb, -28);
  let frameLight = shiftRgb(frameRgb, 22);
  if (bodyId === 'glass') {
    // Bright chrome-like stainless frame.
    frameMid = hexToRgb('#aebfce');
    frameDark = hexToRgb('#5f7389');
    frameLight = hexToRgb('#e6f1fb');
  } else if (bodyId === 'ceramic') {
    // Ceramic body: frame blends with rear shell, with glossy glaze feel.
    frameMid = shiftRgb(backRgb, 6);
    frameDark = shiftRgb(backRgb, -14);
    frameLight = shiftRgb(backRgb, 30);
  }

  const bgGrad = ctx.createLinearGradient(0, 0, cw, ch);
  bgGrad.addColorStop(0, 'rgba(16,32,50,0.78)');
  bgGrad.addColorStop(1, 'rgba(8,18,31,0.45)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, cw, ch);

  if (String(v.disp?.mat?.name || '') === '折叠屏') {
    // Foldable rear (fully open): one continuous outer frame, narrow center hinge, no blank gap.
    const bodyX = x;
    const bodyY = y;
    const bodyW = fw;
    const bodyH = fh;
    const frameR = clamp(radius, 8, 22);
    const hingeW = clamp(bodyW * 0.024, 2.2, 4.2);
    const hingeX = bodyX + (bodyW - hingeW) / 2;
    const leftW = hingeX - bodyX;
    const rightX = hingeX + hingeW;
    const rightW = bodyX + bodyW - rightX;

    // Continuous outer frame (no top/bottom split).
    roundedRectPath(ctx, bodyX, bodyY, bodyW, bodyH, frameR);
    const frameGrad = ctx.createLinearGradient(bodyX, bodyY, bodyX + bodyW, bodyY + bodyH);
    frameGrad.addColorStop(0, rgbToCss(shiftRgb(frameRgb, 8), 0.78));
    frameGrad.addColorStop(1, rgbToCss(shiftRgb(frameRgb, -22), 0.86));
    ctx.fillStyle = frameGrad;
    ctx.fill();

    // Clip to body so split panels and hinge stay inside one complete border.
    ctx.save();
    roundedRectPath(ctx, bodyX, bodyY, bodyW, bodyH, frameR - 0.6);
    ctx.clip();

    const leftGrad = ctx.createLinearGradient(bodyX, bodyY, bodyX + leftW, bodyY + bodyH);
    leftGrad.addColorStop(0, rgbToCss(shiftRgb(backRgb, 16), 0.98));
    leftGrad.addColorStop(1, rgbToCss(shiftRgb(backRgb, -16), 0.98));
    ctx.fillStyle = leftGrad;
    ctx.fillRect(bodyX, bodyY, leftW, bodyH);

    const rightGrad = ctx.createLinearGradient(rightX, bodyY, rightX + rightW, bodyY + bodyH);
    rightGrad.addColorStop(0, rgbToCss(shiftRgb(backRgb, 12), 0.97));
    rightGrad.addColorStop(1, rgbToCss(shiftRgb(backRgb, -22), 0.98));
    ctx.fillStyle = rightGrad;
    ctx.fillRect(rightX, bodyY, rightW, bodyH);

    // Narrow hinge, flush with both panels and inside top/bottom borders.
    const hingeGrad = ctx.createLinearGradient(hingeX, bodyY, hingeX + hingeW, bodyY);
    hingeGrad.addColorStop(0, rgbToCss(frameDark, 0.9));
    hingeGrad.addColorStop(0.5, rgbToCss(frameLight, 0.52));
    hingeGrad.addColorStop(1, rgbToCss(frameDark, 0.9));
    ctx.fillStyle = hingeGrad;
    ctx.fillRect(hingeX, bodyY, hingeW, bodyH);
    ctx.restore();

    // Re-stroke outer border for crisp complete contour.
    ctx.strokeStyle = rgbToCss(shiftRgb(frameRgb, 20), 0.32);
    ctx.lineWidth = 1;
    roundedRectPath(ctx, bodyX, bodyY, bodyW, bodyH, frameR);
    ctx.stroke();

    const rearCams = [v.cams?.main, v.cams?.ultra, v.cams?.mono, v.cams?.tele].filter((c) => c && c.id !== 'none');
    if (rearCams.length > 0) {
      const pxPerMm = leftW / Math.max(1, wMm * 0.5);
      const calendarYear = Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR);
      const cameraEraT = clamp((calendarYear - 2014) / (2023 - 2014), 0, 1);
      const lensScale = 1 + 0.07 * cameraEraT;
      const gapScale = 1 + 0.06 * cameraEraT;
      const lensRadiusPx = Math.max(2, ((10.2 * lensScale) * pxPerMm) / 2);
      const gapPx = 13.6 * pxPerMm * gapScale;
      const baseX = bodyX + Math.max(3.5, 4 * pxPerMm) + lensRadiusPx;
      const stackCount = Math.min(4, rearCams.length);
      const baseY = bodyY + Math.max(3.5, 4 * pxPerMm) + lensRadiusPx;
      for (let i = 0; i < stackCount; i += 1) {
        const cx = baseX;
        const cy = baseY + i * gapPx;
        ctx.beginPath();
        ctx.arc(cx, cy, lensRadiusPx, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6,10,16,0.97)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(173,205,238,0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, lensRadiusPx * 0.42, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(58,94,130,0.62)';
        ctx.fill();
      }
    }

    ctx.fillStyle = 'rgba(176,205,236,0.86)';
    ctx.font = '12px "Noto Sans SC", sans-serif';
    ctx.fillText('Rear 45°', 10, 18);
    return;
  }

  // Back plate (offset) to simulate 45 degree side depth
  roundedRectPath(ctx, x + depthX, y - depthY, fw, fh, radius);
  ctx.fillStyle = 'rgba(41,56,74,0.9)';
  ctx.fill();

  // Side face (rounded transitions to match front/back corner radius)
  const sideR = clamp(radius * 0.78, 3.2, Math.max(3.2, Math.min(depthX * 0.95, fh * 0.09)));
  ctx.beginPath();
  ctx.moveTo(x + fw, y + sideR);
  ctx.quadraticCurveTo(x + fw, y, x + fw + sideR * 0.52, y - sideR * 0.32);
  ctx.lineTo(x + fw + depthX - sideR * 0.52, y - depthY + sideR * 0.2);
  ctx.quadraticCurveTo(x + fw + depthX, y - depthY, x + fw + depthX, y - depthY + sideR * 0.56);
  ctx.lineTo(x + fw + depthX, y + fh - depthY - sideR * 0.56);
  ctx.quadraticCurveTo(x + fw + depthX, y + fh - depthY, x + fw + depthX - sideR * 0.52, y + fh - depthY + sideR * 0.28);
  ctx.lineTo(x + fw + sideR * 0.48, y + fh - sideR * 0.28);
  ctx.quadraticCurveTo(x + fw, y + fh, x + fw, y + fh - sideR);
  ctx.closePath();
  const sideGrad = ctx.createLinearGradient(x + fw, y, x + fw + depthX, y);
  if (bodyId === 'glass') {
    sideGrad.addColorStop(0, rgbToCss(shiftRgb(frameLight, 8), 0.95));
    sideGrad.addColorStop(0.46, rgbToCss(frameMid, 0.9));
    sideGrad.addColorStop(1, rgbToCss(frameDark, 0.9));
  } else if (bodyId === 'ceramic') {
    sideGrad.addColorStop(0, rgbToCss(frameLight, 0.9));
    sideGrad.addColorStop(0.52, rgbToCss(frameMid, 0.88));
    sideGrad.addColorStop(1, rgbToCss(frameDark, 0.9));
  } else {
    sideGrad.addColorStop(0, rgbToCss(frameMid, 0.82));
    sideGrad.addColorStop(1, rgbToCss(frameDark, 0.92));
  }
  ctx.fillStyle = sideGrad;
  ctx.fill();
  if (bodyId === 'glass' || bodyId === 'ceramic') {
    // Specular highlight stripe to emphasize reflective frame materials.
    const stripeX = x + fw + depthX * 0.22;
    const stripeGrad = ctx.createLinearGradient(stripeX, y, stripeX + depthX * 0.24, y);
    stripeGrad.addColorStop(0, 'rgba(242,250,255,0)');
    stripeGrad.addColorStop(0.5, bodyId === 'glass' ? 'rgba(244,252,255,0.34)' : 'rgba(245,251,255,0.24)');
    stripeGrad.addColorStop(1, 'rgba(242,250,255,0)');
    ctx.fillStyle = stripeGrad;
    ctx.fillRect(x + fw, y - depthY * 0.25, depthX, fh + depthY * 0.55);
  }

  // Top face
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + fw, y);
  ctx.lineTo(x + fw + depthX, y - depthY);
  ctx.lineTo(x + depthX, y - depthY);
  ctx.closePath();
  ctx.fillStyle = bodyId === 'glass'
    ? rgbToCss(shiftRgb(frameLight, 6), 0.86)
    : bodyId === 'ceramic'
      ? rgbToCss(shiftRgb(frameLight, 2), 0.78)
      : rgbToCss(frameLight, 0.66);
  ctx.fill();

  // Pure rear cover (no front screen on this view)
  roundedRectPath(ctx, x, y, fw, fh, radius);
  const backGrad = ctx.createLinearGradient(x, y, x + fw, y + fh);
  backGrad.addColorStop(0, rgbToCss(backLight, 0.96));
  backGrad.addColorStop(1, rgbToCss(backDark, 0.98));
  ctx.fillStyle = backGrad;
  ctx.fill();
  if (bodyId === 'wood') {
    // Lightweight wood grain overlay for preview realism.
    ctx.save();
    roundedRectPath(ctx, x, y, fw, fh, radius);
    ctx.clip();

    const grainA = rgbToCss(shiftRgb(backRgb, 24), 0.2);
    const grainB = rgbToCss(shiftRgb(backRgb, -20), 0.16);
    const grainStep = Math.max(5, fw * 0.035);
    for (let gy = y + 2; gy < y + fh - 2; gy += grainStep) {
      const wave = Math.sin((gy - y) * 0.08) * fw * 0.06;
      ctx.beginPath();
      ctx.moveTo(x - fw * 0.06, gy);
      ctx.bezierCurveTo(
        x + fw * 0.28 + wave * 0.5, gy - 1.2,
        x + fw * 0.68 - wave * 0.45, gy + 1.2,
        x + fw * 1.04, gy + wave * 0.08
      );
      ctx.strokeStyle = ((Math.floor((gy - y) / grainStep) % 2) === 0) ? grainA : grainB;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Subtle "knots" as sharp ellipses along grain direction for a more wood-like look.
    const knots = [
      [x + fw * 0.28, y + fh * 0.34, fw * 0.05, fw * 0.022, -0.1],
      [x + fw * 0.64, y + fh * 0.62, fw * 0.043, fw * 0.019, 0.08]
    ];
    knots.forEach(([kx, ky, rx, ry, rot]) => {
      const knotGrad = ctx.createRadialGradient(kx, ky, Math.max(0.5, ry * 0.2), kx, ky, Math.max(rx, ry));
      knotGrad.addColorStop(0, rgbToCss(shiftRgb(backRgb, -28), 0.2));
      knotGrad.addColorStop(1, rgbToCss(shiftRgb(backRgb, 8), 0));
      ctx.fillStyle = knotGrad;
      ctx.save();
      ctx.translate(kx, ky);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      // Inner ring accent to mimic layered wood growth lines.
      ctx.strokeStyle = rgbToCss(shiftRgb(backRgb, -22), 0.18);
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx * 0.58, ry * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });

    ctx.restore();
  }
  ctx.strokeStyle = rgbToCss(frameMid, 0.45);
  ctx.lineWidth = 1;
  ctx.stroke();

  const launchYear = Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR);
  const hasFingerprint = Array.isArray(v.chosenExtras) && v.chosenExtras.some((x) => x && x.id === 'fingerprint');
  const pxPerMm = fw / Math.max(1, wMm);
  if (hasFingerprint && launchYear <= 2016) {
    const sensorDiaMm = 11;
    const sensorR = Math.max(2.2, (sensorDiaMm * pxPerMm) / 2);
    const sensorCx = x + fw * 0.5;
    const sensorCy = y + fh * 0.3;
    ctx.beginPath();
    ctx.arc(sensorCx, sensorCy, sensorR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(18,28,42,0.42)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(178,210,238,0.58)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(sensorCx, sensorCy, sensorR * 0.55, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(188,220,248,0.34)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Rear cameras: no matrix deco, fixed physical lens size.
  const rearCams = [v.cams?.main, v.cams?.ultra, v.cams?.mono, v.cams?.tele].filter((c) => c && c.id !== 'none');
  const camCount = rearCams.length;
  if (camCount > 0) {
    const calendarYear = Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR);
    // 2014 -> 2023: small linear visual growth for rear lens size.
    const cameraEraT = clamp((calendarYear - 2014) / (2023 - 2014), 0, 1);
    const lensScale = 1 + 0.07 * cameraEraT;
    const gapScale = 1 + 0.06 * cameraEraT;
    // Fixed physical camera ring size in mm so relative size changes with body dimensions.
    const fixedLensDiameterMm = 10.2 * lensScale;
    const lensRadiusPx = Math.max(2, (fixedLensDiameterMm * pxPerMm) / 2);
    const gapPx = 13.6 * pxPerMm * gapScale;
    const edgeOffsetPx = 4 * pxPerMm;
    // Camera anchor should be measured from rear cover edges, not the 45° model bounds.
    const baseX = x + edgeOffsetPx + lensRadiusPx + 0.5 * pxPerMm;
    const baseY = y + edgeOffsetPx + lensRadiusPx + 1.0 * pxPerMm;
    const centers = [];
    for (let i = 0; i < Math.min(4, camCount); i += 1) {
      centers.push([baseX, baseY + i * gapPx]);
    }
    centers.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, lensRadiusPx, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6,10,16,0.97)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(173,205,238,0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, lensRadiusPx * 0.42, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(58,94,130,0.62)';
      ctx.fill();
    });
  }
  ctx.fillStyle = 'rgba(176,205,236,0.86)';
  ctx.font = '12px "Noto Sans SC", sans-serif';
  ctx.fillText('Rear 45°', 10, 18);
}

function renderPhoneFrontPreview(buildEval) {
  const canvas = el.phoneFrontCanvas;
  if (!canvas || !buildEval || !buildEval.input) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 20) return;
  const dpr = window.devicePixelRatio || 1;
  const cw = Math.floor(rect.width);
  const ch = Math.floor(rect.height || 280);
  canvas.width = Math.floor(cw * dpr);
  canvas.height = Math.floor(ch * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cw, ch);

  const v = buildEval.input;
  const wMm = Math.max(35, Number(v.phoneW) || 76);
  const hMm = Math.max(80, Number(v.phoneH) || 160);
  // Reduce safety margins so the phone occupies more canvas area.
  const scale = Math.min((cw - 52) / 180, (ch - 36) / 260) * 1.05;
  const fw = wMm * scale;
  const fh = hMm * scale;
  const x = (cw - fw) / 2;
  const y = (ch - fh) / 2;
  const radius = clamp(Math.min(fw, fh) * 0.08, 8, 24);
  const bezel = buildEval.bezel || { sideBezel: 2.3, topBezel: 2.8, bottomBezel: 3.1 };

  const bgGrad = ctx.createLinearGradient(0, 0, cw, ch);
  bgGrad.addColorStop(0, 'rgba(16,32,50,0.78)');
  bgGrad.addColorStop(1, 'rgba(8,18,31,0.45)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, cw, ch);

  if (String(v.disp?.mat?.name || '') === '折叠屏') {
    // Foldable front should look like a normal slab front; only add a faint center crease.
    const frameRgb = hexToRgb(el.frontFrameColor ? el.frontFrameColor.value : '#1a232f');
    roundedRectPath(ctx, x, y, fw, fh, radius);
    ctx.fillStyle = rgbToCss(shiftRgb(frameRgb, -2), 0.96);
    ctx.fill();
    ctx.strokeStyle = rgbToCss(shiftRgb(frameRgb, 28), 0.26);
    ctx.lineWidth = 1;
    ctx.stroke();

    const maxScreenW = fw - bezel.sideBezel * scale * 2;
    const maxScreenH = fh - (bezel.topBezel + bezel.bottomBezel) * scale;
    const rawScreenW = (buildEval.screenMm ? buildEval.screenMm.widthMm : 0) * scale;
    const rawScreenH = (buildEval.screenMm ? buildEval.screenMm.heightMm : 0) * scale;
    const sw = clamp(rawScreenW || maxScreenW, 12, Math.max(12, maxScreenW));
    const sh = clamp(rawScreenH || maxScreenH, 18, Math.max(18, maxScreenH));
    const topShare = (bezel.topBezel + bezel.bottomBezel) > 0
      ? bezel.topBezel / (bezel.topBezel + bezel.bottomBezel)
      : 0.5;
    const sx = x + (fw - sw) / 2;
    const sy = y + (fh - sh) * topShare;
    roundedRectPath(ctx, sx, sy, sw, sh, Math.max(4, radius * 0.66));
    const screenGrad = ctx.createLinearGradient(sx, sy, sx + sw, sy + sh);
    screenGrad.addColorStop(0, 'rgba(44,120,188,0.74)');
    screenGrad.addColorStop(1, 'rgba(14,28,58,0.88)');
    ctx.fillStyle = screenGrad;
    ctx.fill();
    drawFrontDisplayShape(ctx, v, sx, sy, sw, sh, scale);

    // Faint center crease line in screen color family.
    const creaseX = sx + sw * 0.5;
    const creaseTop = sy + sh * 0.04;
    const creaseBottom = sy + sh * 0.96;
    const creaseGrad = ctx.createLinearGradient(creaseX - 1.1, sy, creaseX + 1.1, sy);
    creaseGrad.addColorStop(0, 'rgba(90,146,196,0)');
    creaseGrad.addColorStop(0.5, 'rgba(110,170,220,0.28)');
    creaseGrad.addColorStop(1, 'rgba(90,146,196,0)');
    ctx.fillStyle = creaseGrad;
    ctx.fillRect(creaseX - 1.1, creaseTop, 2.2, Math.max(8, creaseBottom - creaseTop));

    ctx.fillStyle = 'rgba(176,205,236,0.86)';
    ctx.font = '12px "Noto Sans SC", sans-serif';
    ctx.fillText('Front View', 10, 18);
    return;
  }

  const frameRgb = hexToRgb(el.frontFrameColor ? el.frontFrameColor.value : '#1a232f');
  roundedRectPath(ctx, x, y, fw, fh, radius);
  ctx.fillStyle = rgbToCss(shiftRgb(frameRgb, -2), 0.96);
  ctx.fill();
  ctx.strokeStyle = rgbToCss(shiftRgb(frameRgb, 28), 0.26);
  ctx.lineWidth = 1;
  ctx.stroke();

  const maxScreenW = fw - bezel.sideBezel * scale * 2;
  const maxScreenH = fh - (bezel.topBezel + bezel.bottomBezel) * scale;
  const rawScreenW = (buildEval.screenMm ? buildEval.screenMm.widthMm : 0) * scale;
  const rawScreenH = (buildEval.screenMm ? buildEval.screenMm.heightMm : 0) * scale;
  const sw = clamp(rawScreenW || maxScreenW, 12, Math.max(12, maxScreenW));
  const sh = clamp(rawScreenH || maxScreenH, 18, Math.max(18, maxScreenH));
  const topShare = (bezel.topBezel + bezel.bottomBezel) > 0
    ? bezel.topBezel / (bezel.topBezel + bezel.bottomBezel)
    : 0.5;
  const sx = x + (fw - sw) / 2;
  const sy = y + (fh - sh) * topShare;
  const useLegacyRectScreen = Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR) <= 2016;
  if (useLegacyRectScreen) {
    ctx.beginPath();
    ctx.rect(sx, sy, sw, sh);
  } else {
    roundedRectPath(ctx, sx, sy, sw, sh, Math.max(4, radius * 0.66));
  }
  const screenGrad = ctx.createLinearGradient(sx, sy, sx + sw, sy + sh);
  screenGrad.addColorStop(0, 'rgba(44,120,188,0.74)');
  screenGrad.addColorStop(1, 'rgba(14,28,58,0.88)');
  ctx.fillStyle = screenGrad;
  ctx.fill();
  drawFrontDisplayShape(ctx, v, sx, sy, sw, sh, scale);
  drawLegacyIdBorderIllusion(
    ctx,
    v,
    { x, y, w: fw, h: fh, radius },
    { sx, sy, sw, sh },
    useLegacyRectScreen ? 0 : Math.max(4, radius * 0.66)
  );
  if (rawScreenW > maxScreenW + 0.5 || rawScreenH > maxScreenH + 0.5) {
    ctx.strokeStyle = 'rgba(255,94,108,0.92)';
    ctx.lineWidth = 1.2;
    if (useLegacyRectScreen) {
      ctx.beginPath();
      ctx.rect(sx, sy, sw, sh);
    } else {
      roundedRectPath(ctx, sx, sy, sw, sh, Math.max(4, radius * 0.66));
    }
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(176,205,236,0.86)';
  ctx.font = '12px "Noto Sans SC", sans-serif';
  ctx.fillText('Front View', 10, 18);
}

function updateHeader() {
  pushTimelinePoint();
  syncInventoryTotal();
  renderEndlessModeBadge();
  renderTechMuseumTree();
  if (el.currentYearTag) {
    const y = Math.max(HISTORICAL_START_YEAR, Math.floor(Number(state.historicalYear || HISTORICAL_START_YEAR)));
    el.currentYearTag.textContent = `${y} 年`;
    el.currentYearTag.classList.toggle('is-endless', y > HISTORICAL_HANDOFF_YEAR);
  }
  el.cash.textContent = RMB(state.cash);
  refreshInventoryUiOnly();
  el.rating.textContent = Math.round(state.rating).toString();
  el.month.textContent = String(state.month);
  if (el.monthTotal) {
    el.monthTotal.textContent = `累计 ${Number(state.companyMonthsTotal || 0).toLocaleString('zh-CN')} 月`;
  }
  renderOpsChart();
  renderMobileRunDockQuote();
}

function renderTechMuseumTree() {
  if (!el.techMuseumTree) return;
  const yRaw = Number(state.historicalYear || HISTORICAL_START_YEAR);
  const y = clamp(yRaw, HISTORICAL_START_YEAR, HISTORICAL_HANDOFF_YEAR);
  if (lastTechMuseumRenderedYear === y) return;
  lastTechMuseumRenderedYear = y;
  const reached = TECH_MUSEUM_TREE.filter((n) => y >= n.year).length;
  const total = TECH_MUSEUM_TREE.length || 1;
  const pct = clamp((reached / total) * 100, 0, 100);
  if (el.techMuseumYear) {
    el.techMuseumYear.textContent = `${y >= HISTORICAL_HANDOFF_YEAR ? HISTORICAL_HANDOFF_YEAR : y} 年`;
  }
  if (el.techMuseumProgressFill) {
    el.techMuseumProgressFill.style.width = `${pct.toFixed(2)}%`;
  }
  const currentYearNode = y >= HISTORICAL_HANDOFF_YEAR ? HISTORICAL_HANDOFF_YEAR : y;
  el.techMuseumTree.innerHTML = TECH_MUSEUM_TREE.map((n) => {
    const done = y >= n.year;
    const current = n.year === currentYearNode;
    const cls = `tech-node${done ? ' done' : ''}${current ? ' current' : ''}`;
    const tags = Array.isArray(n.tags) ? n.tags.join('｜') : '';
    return `<div class="${cls}"><div class="tech-node-year">${n.year}</div><div class="tech-node-title">${n.title}</div><div class="tech-node-tags">${tags}</div></div>`;
  }).join('');
  if (el.techMuseumDone) {
    el.techMuseumDone.classList.toggle('hidden', y < HISTORICAL_HANDOFF_YEAR);
  }
}

function renderEndlessModeBadge() {
  if (!el.endlessBadge) return;
  const isEndless = Number(state.historicalYear || HISTORICAL_START_YEAR) >= HISTORICAL_HANDOFF_YEAR;
  el.endlessBadge.classList.toggle('hidden', !isEndless);
}

function refreshInventoryUiOnly() {
  const onHand = getOnHandInventoryUnits();
  const inTransit = calcInTransitUnits();
  if (el.inv) el.inv.textContent = onHand.toLocaleString('zh-CN');
  if (el.invTransit) {
    el.invTransit.textContent = `在途 ${inTransit.toLocaleString('zh-CN')}`;
  }
  renderMobileRunDockInventory();
}

function isFrontPreviewPopupAnimEnabled() {
  if (!el.stageConfig || el.stageConfig.classList.contains('hidden')) return false;
  if (!el.dispForm || el.dispForm.value !== 'mid_popup') return false;
  if (!el.phoneFrontCanvas) return false;
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  } catch {
    // ignore media query errors
  }
  return true;
}

function stopFrontPreviewPopupAnim() {
  if (frontPreviewAnimRaf) {
    window.cancelAnimationFrame(frontPreviewAnimRaf);
    frontPreviewAnimRaf = 0;
  }
}

function frontPreviewPopupAnimTick() {
  if (!isFrontPreviewPopupAnimEnabled()) {
    stopFrontPreviewPopupAnim();
    return;
  }
  try {
    const evalData = frontPreviewAnimEval || evaluateBuild();
    renderPhoneFrontPreview(evalData);
  } catch {
    // ignore draw/eval errors during animation tick
  }
  frontPreviewAnimRaf = window.requestAnimationFrame(frontPreviewPopupAnimTick);
}

function updateFrontPreviewPopupAnimState() {
  if (isFrontPreviewPopupAnimEnabled()) {
    if (!frontPreviewAnimRaf) {
      frontPreviewAnimRaf = window.requestAnimationFrame(frontPreviewPopupAnimTick);
    }
  } else {
    stopFrontPreviewPopupAnim();
  }
}

function setStep(step) {
  const c1 = step === 1;
  const c2 = step === 2;
  const c3 = step === 3;
  el.stageEvent.classList.toggle('hidden', !c1);
  el.stageConfig.classList.toggle('hidden', !c2);
  el.stageRun.classList.toggle('hidden', !c3);
  if (el.statsBar) el.statsBar.classList.toggle('hidden', c1);
  if (el.takeLoan) el.takeLoan.classList.toggle('hidden', !c3);
  refreshMobileRunDock();
  renderStageQuiz(step);
  if (c2) {
    refreshExtrasSelectableOptions();
    // Defer once so canvas/layout sizes are ready, then auto-evaluate.
    requestAnimationFrame(() => refreshDesignPanelsLive());
  }
  updateFrontPreviewPopupAnimState();
}

function computeTotalInventory() {
  return Object.values(state.inventoryBySku || {}).reduce((s, n) => s + (Number(n) || 0), 0);
}

function getOnHandInventoryUnits() {
  const bySku = computeTotalInventory();
  const fromState = Number(state.inventory || 0);
  const hasSkuMap = state.inventoryBySku && Object.keys(state.inventoryBySku).length > 0;
  const onHand = hasSkuMap ? bySku : Math.max(0, fromState);
  state.inventory = onHand;
  return onHand;
}

function syncInventoryTotal() {
  state.inventory = getOnHandInventoryUnits();
}

function calcInTransitUnits() {
  if (!state.product || !Array.isArray(state.product.pipeline)) return 0;
  return state.product.pipeline.reduce((sum, x) => {
    if (!x) return sum;
    const directUnits = Number(x.units ?? x.add ?? x.qty ?? x.count ?? 0) || 0;
    if (directUnits > 0) return sum + Math.max(0, Math.round(directUnits));
    const bySkuMap = x.unitsBySku || x.qtyBySku || null;
    if (bySkuMap && typeof bySkuMap === 'object') {
      const nested = Object.values(bySkuMap).reduce((acc, n) => acc + (Number(n) || 0), 0);
      return sum + Math.max(0, Math.round(nested));
    }
    return sum;
  }, 0);
}

const MAX_SKU_COUNT = 6;
const SKU_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

function getDefaultRamOptionId() {
  const ids = ramOptions.map((x) => x.id);
  if (!ids.length) return '';
  const preferred = ['8_lp5x', '8_lp4x', '6_lp4x', '4_lp4x'];
  for (const id of preferred) if (ids.includes(id)) return id;
  return ids[Math.floor((ids.length - 1) / 2)] || ids[0];
}

function getDefaultRomOptionId() {
  const ids = romOptions.map((x) => x.id);
  if (!ids.length) return '';
  const preferred = ['256_ufs31', '128_ufs22', '64_emmc'];
  for (const id of preferred) if (ids.includes(id)) return id;
  return ids[Math.floor((ids.length - 1) / 2)] || ids[0];
}

function getBodyCostForYear(baseBody, yearRaw) {
  const b = baseBody || null;
  if (!b) return 0;
  const rule = BODY_UNLOCK_RULES[b.id];
  if (!rule) return Number(b.cost || 0);
  const y = Number(yearRaw || HISTORICAL_START_YEAR);
  const unlockYear = Number(rule.unlockYear || HISTORICAL_START_YEAR);
  if (y < unlockYear) return Number(b.cost || 0);
  let factor = 1;

  // Historical early premium: from unlockYear linearly decays to baseline by settleYear.
  const earlyPremium = Number(rule.earlyPremium || 0);
  const settleYear = Number(rule.settleYear || 0);
  if (earlyPremium > 0 && settleYear > unlockYear && y <= settleYear) {
    const tEarly = clamp((y - unlockYear) / (settleYear - unlockYear), 0, 1);
    factor *= (1 + earlyPremium * (1 - tEarly));
  }

  // New-material premium: first 2 years after unlock linearly decays to baseline.
  const introPremium = Number(rule.introPremium || 0);
  if (introPremium > 0) {
    const tIntro = clamp((y - unlockYear) / 2, 0, 1);
    factor *= (1 + introPremium * (1 - tIntro));
  }

  return Math.round(Number(b.cost || 0) * factor);
}

function getBodyOptionsForYear(yearRaw) {
  const y = Number(yearRaw || HISTORICAL_START_YEAR);
  return bodyOptions
    .filter((b) => {
      const rule = BODY_UNLOCK_RULES[b.id];
      if (!rule) return true;
      const unlockYear = Number(rule.unlockYear || HISTORICAL_START_YEAR);
      const retireYear = Number(rule.retireYear || 0);
      if (y < unlockYear) return false;
      if (retireYear > 0 && y > retireYear) return false;
      return true;
    })
    .map((b) => ({ ...b, cost: getBodyCostForYear(b, y) }));
}

function getBodyOptionByIdForYear(id, yearRaw) {
  const options = getBodyOptionsForYear(yearRaw);
  return options.find((x) => x.id === id) || options[0] || null;
}

function addSkuRow(seed = {}) {
  if (!el.skuList) return;
  const count = el.skuList.querySelectorAll('.sku-row').length;
  if (count >= MAX_SKU_COUNT) return;
  const label = SKU_LABELS[count] || String(count + 1);
  const row = document.createElement('div');
  row.className = 'grid4 sku-row';
  row.dataset.label = label;
  row.innerHTML = `
    <label>SKU-${label} 内存
      <select class="sku-ram"></select>
    </label>
    <label>SKU-${label} 存储
      <select class="sku-rom"></select>
    </label>
    <label>SKU-${label} 加价（相对基础定价）
      <input class="sku-price-adj" type="text" inputmode="numeric" pattern="-?[0-9]*" value="${seed.priceAdj ?? 0}" />
    </label>
    <label>SKU-${label} 首发配比（%）
      <input class="sku-share" type="number" min="0" max="100" step="1" value="${seed.share ?? (count === 0 ? 100 : 0)}" />
    </label>
    <button type="button" class="sku-remove">删除 SKU-${label}</button>
  `;
  el.skuList.appendChild(row);
  const ramOptionsHtml = ramOptions.map((x) => `<option value="${x.id}">${x.name}（${RMB(x.cost)}）</option>`).join('');
  const romOptionsHtml = romOptions.map((x) => `<option value="${x.id}">${x.name}（${RMB(x.cost)}）</option>`).join('');
  row.querySelector('.sku-ram').innerHTML = ramOptionsHtml;
  row.querySelector('.sku-rom').innerHTML = romOptionsHtml;
  const ramDefault = getDefaultRamOptionId();
  const romDefault = getDefaultRomOptionId();
  row.querySelector('.sku-ram').value = seed.ram || ramDefault;
  row.querySelector('.sku-rom').value = seed.rom || romDefault;
  refreshSkuButtons();
}

function getRamCapacityGb(ramLike) {
  if (!ramLike) return 0;
  if (Number.isFinite(Number(ramLike.capacityGb))) return Number(ramLike.capacityGb);
  return Number(baseRamCapById[ramLike.id] || 0);
}

function getRomCapacityGb(romLike) {
  if (!romLike) return 0;
  if (Number.isFinite(Number(romLike.capacityGb))) return Number(romLike.capacityGb);
  return Number(baseRomCapById[romLike.id] || 0);
}

function formatRamCapacityLabel(capGbLike) {
  const cap = Number(capGbLike || 0);
  if (cap <= 0) return '0GB';
  const isInt = Math.abs(cap - Math.round(cap)) < 1e-6;
  return `${isInt ? Math.round(cap) : cap.toFixed(1).replace(/\.0$/, '')}GB`;
}

function getRelativeTierByOptionId(optionId, optionList) {
  const list = Array.isArray(optionList) ? optionList : [];
  const n = list.length;
  if (!optionId || n <= 0) return 'mid';
  const idx = list.findIndex((x) => x && x.id === optionId);
  if (idx < 0) return 'mid';
  if (n === 1) return 'mid';
  if (n === 2) return idx === 0 ? 'small' : 'large';
  // Prefer "middle three = mid".
  // This project uses fixed replacement updates (no option-count growth),
  // so this keeps stable tiering across iterations.
  const midCount = n >= 5 ? 3 : Math.max(1, n - 2);
  const midStart = Math.floor((n - midCount) / 2);
  const midEnd = midStart + midCount - 1;
  if (idx < midStart) return 'small';
  if (idx > midEnd) return 'large';
  return 'mid';
}

function getYearPricePreferenceBand(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  if (y <= 2016) return { min: 200, max: 2000 };
  if (y <= 2021) return { min: 2000, max: 3500 };
  return { min: 3000, max: 4000 };
}

function getHistoricalDemandTuning(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  // 2023 年及以前采用三阶段历史需求模型：
  // 2014-2016（功能机向智能机深度替换，走量盘更大）
  // 2017-2019（全面屏与多摄驱动，需求仍高但增速回落）
  // 2020-2023（5G 换机与结构升级，需求高于现代基线）
  if (y <= 2016) {
    return {
      demandMul: 4.2,
      volatilityMul: 0.42,
      crashAdj: -0.16,
      reboundMul: 1.58,
      slumpRecoveryBonus: 0.06,
      demandEndThreshold: 2
    };
  }
  if (y <= 2019) {
    return {
      demandMul: 3.2,
      volatilityMul: 0.52,
      crashAdj: -0.12,
      reboundMul: 1.42,
      slumpRecoveryBonus: 0.048,
      demandEndThreshold: 3
    };
  }
  if (y <= 2023) {
    return {
      demandMul: 2.3,
      volatilityMul: 0.64,
      crashAdj: -0.08,
      reboundMul: 1.28,
      slumpRecoveryBonus: 0.032,
      demandEndThreshold: 4
    };
  }
  return {
    demandMul: 1.0,
    volatilityMul: 1.0,
    crashAdj: 0,
    reboundMul: 1.0,
    slumpRecoveryBonus: 0,
    demandEndThreshold: 10
  };
}

function calcPreferredBandMul(price, band, cfg = {}) {
  const p = Number(price || 0);
  const min = Number(band && band.min || 0);
  const max = Number(band && band.max || min);
  const span = Math.max(1, max - min);
  const center = (min + max) / 2;
  const inBandBoost = Number(cfg.inBandBoost || 1.12);
  const edgeMul = Number(cfg.edgeMul || 1.0);
  const outDropPerSpan = Number(cfg.outDropPerSpan || 0.28);
  const floor = Number(cfg.floor || 0.58);
  if (p >= min && p <= max) {
    const half = Math.max(1, span / 2);
    const ratio = Math.abs(p - center) / half;
    return clamp(inBandBoost - ratio * (inBandBoost - edgeMul), edgeMul, inBandBoost);
  }
  const dist = p < min ? (min - p) : (p - max);
  const outRatio = dist / span;
  return clamp(edgeMul - outRatio * outDropPerSpan, floor, edgeMul);
}

function calcLowPriceMassBaseMul(price, yearLike) {
  const p = Number(price || 0);
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  // 2014-2019 低价盘更强：做温和加权，2020+ 自动回归常态。
  const earlyEraLowPriceBoost = y <= 2019
    ? (1 + clamp((2019 - y) / 5, 0, 1) * 0.08) // 2019:+0%，2014:+8%
    : 1;
  // 低价用户是市场基石：低价机天然更容易拿到大众盘。
  if (p <= 1200) return clamp((1.42 - ((1200 - p) / 1200) * 0.1) * earlyEraLowPriceBoost, 1.3, 1.56);
  if (p <= 2000) return clamp((1.3 - ((2000 - p) / 800) * 0.08) * earlyEraLowPriceBoost, 1.2, 1.42);
  if (p <= 3500) return clamp((1.14 - ((p - 2000) / 1500) * 0.12) * earlyEraLowPriceBoost, 1.02, 1.2);
  if (p <= 5000) return clamp((0.98 - ((p - 3500) / 1500) * 0.08) * earlyEraLowPriceBoost, 0.9, 1.04);
  return clamp((0.9 - ((p - 5000) / 6000) * 0.12) * earlyEraLowPriceBoost, 0.72, 0.96);
}

function refreshMemorySelectableOptions() {
  if (!el.skuList) return;
  const ramOptionsHtml = ramOptions.map((x) => `<option value="${x.id}">${x.name}（${RMB(x.cost)}）</option>`).join('');
  const romOptionsHtml = romOptions.map((x) => `<option value="${x.id}">${x.name}（${RMB(x.cost)}）</option>`).join('');
  [...el.skuList.querySelectorAll('.sku-row')].forEach((row) => {
    const ramSel = row.querySelector('.sku-ram');
    const romSel = row.querySelector('.sku-rom');
    if (!ramSel || !romSel) return;
    const oldRam = ramSel.value;
    const oldRom = romSel.value;
    ramSel.innerHTML = ramOptionsHtml;
    romSel.innerHTML = romOptionsHtml;
    if ([...ramSel.options].some((o) => o.value === oldRam)) ramSel.value = oldRam;
    else ramSel.value = getDefaultRamOptionId();
    if ([...romSel.options].some((o) => o.value === oldRom)) romSel.value = oldRom;
    else romSel.value = getDefaultRomOptionId();
  });
}

function refreshSkuButtons() {
  if (!el.skuList) return;
  const rows = [...el.skuList.querySelectorAll('.sku-row')];
  const single = rows.length === 1;
  if (single) {
    const onlyShare = rows[0].querySelector('.sku-share');
    if (onlyShare) onlyShare.value = '100';
  }
  rows.forEach((row, idx) => {
    const label = SKU_LABELS[idx] || String(idx + 1);
    row.dataset.label = label;
    const labels = row.querySelectorAll('label');
    if (labels[0]) labels[0].childNodes[0].textContent = `SKU-${label} 内存`;
    if (labels[1]) labels[1].childNodes[0].textContent = `SKU-${label} 存储`;
    if (labels[2]) labels[2].childNodes[0].textContent = `SKU-${label} 加价（相对基础定价）`;
    if (labels[3]) labels[3].childNodes[0].textContent = `SKU-${label} 首发配比（%）`;
    const removeBtn = row.querySelector('.sku-remove');
    if (removeBtn) {
      removeBtn.textContent = `删除 SKU-${label}`;
      removeBtn.disabled = rows.length <= 1;
    }
    const shareInput = row.querySelector('.sku-share');
    if (shareInput) {
      shareInput.disabled = single;
      if (single) shareInput.value = '100';
    }
  });
  if (el.addSku) {
    el.addSku.disabled = rows.length >= MAX_SKU_COUNT;
  }
  updateSkuShareValidation(false);
}

function collectSkuShareValidation() {
  if (!el.skuList) return { valid: true, sum: 100, rows: [] };
  const rows = [...el.skuList.querySelectorAll('.sku-row')];
  const items = rows.map((row) => {
    const input = row.querySelector('.sku-share');
    const raw = String(input?.value ?? '').trim();
    const num = Number(raw);
    const isInt = Number.isFinite(num) && Number.isInteger(num);
    const inRange = isInt && num >= 0 && num <= 100;
    return { row, input, raw, num, isInt, inRange };
  });
  if (rows.length === 1 && items[0]?.input) {
    items[0].input.value = '100';
    items[0].num = 100;
    items[0].isInt = true;
    items[0].inRange = true;
  }
  const allValidNums = items.every((x) => x.inRange);
  const sum = items.reduce((s, x) => s + (x.inRange ? x.num : 0), 0);
  const valid = rows.length <= 1 ? allValidNums : (allValidNums && sum === 100);
  return { valid, sum, rows: items };
}

function updateSkuShareValidation(flashOnValid = false) {
  const result = collectSkuShareValidation();
  const rows = result.rows || [];
  rows.forEach((x) => {
    if (!x.input) return;
    x.input.classList.remove('sku-invalid');
    x.input.classList.remove('sku-valid');
  });
  if (skuShareValidTimer) {
    clearTimeout(skuShareValidTimer);
    skuShareValidTimer = 0;
  }

  if (!result.valid) {
    const hasInvalidIntInput = rows.some((x) => !x.inRange);
    rows.forEach((x) => {
      if (!x.input) return;
      x.input.classList.add('sku-invalid');
    });
    if (el.skuShareHint) {
      el.skuShareHint.textContent = hasInvalidIntInput
        ? '仅能输入 0~100 的整数'
        : '请保证配额和是100%';
      el.skuShareHint.classList.remove('hidden');
    }
    if (el.launch && el.stageConfig && !el.stageConfig.classList.contains('hidden')) {
      el.launch.disabled = true;
    }
    return result;
  }

  if (el.skuShareHint) {
    el.skuShareHint.classList.add('hidden');
  }
  if (el.launch && el.stageConfig && !el.stageConfig.classList.contains('hidden')) {
    el.launch.disabled = false;
  }
  if (flashOnValid && rows.length >= 2) {
    rows.forEach((x) => {
      if (!x.input) return;
      x.input.classList.add('sku-valid');
    });
    skuShareValidTimer = window.setTimeout(() => {
      rows.forEach((x) => x.input && x.input.classList.remove('sku-valid'));
      skuShareValidTimer = 0;
    }, 500);
  }
  return result;
}

function initSkuRows() {
  if (!el.skuList) return;
  el.skuList.innerHTML = '';
  addSkuRow({ ram: getDefaultRamOptionId(), rom: getDefaultRomOptionId(), priceAdj: 0, share: 100 });
}

function parseSkuPriceAdj(raw) {
  const txt = String(raw ?? '').trim();
  if (!txt) return 0;
  const n = Number(txt);
  if (!Number.isFinite(n)) return 0;
  return clamp(Math.round(n), -1000, 4000);
}

function buildSkuPlansFromInputs(basePrice) {
  if (!el.skuList) return [];
  const rows = [...el.skuList.querySelectorAll('.sku-row')];
  return rows
    .map((row, idx) => {
      const ramId = row.querySelector('.sku-ram')?.value;
      const romId = row.querySelector('.sku-rom')?.value;
      const share = Number(row.querySelector('.sku-share')?.value || 0);
      const priceAdj = parseSkuPriceAdj(row.querySelector('.sku-price-adj')?.value);
      const ram = ramOptions.find((r) => r.id === ramId);
      const rom = romOptions.find((r) => r.id === romId);
      return {
        id: `sku_${idx + 1}`,
        name: `SKU-${SKU_LABELS[idx] || idx + 1}`,
        ram,
        rom,
        share,
        priceAdj,
        price: Math.round(basePrice + priceAdj)
      };
    })
    .filter((x) => x.share > 0);
}

function allocateUnitsByShare(totalUnits, skuPlans) {
  const raw = skuPlans.map((s) => ({ id: s.id, units: Math.floor(totalUnits * (s.share / 100)) }));
  let used = raw.reduce((sum, x) => sum + x.units, 0);
  let remain = totalUnits - used;
  let idx = 0;
  while (remain > 0 && raw.length > 0) {
    raw[idx % raw.length].units += 1;
    idx += 1;
    remain -= 1;
  }
  return Object.fromEntries(raw.map((x) => [x.id, x.units]));
}

function allocateDemandByWeights(target, weightedRows, inventoryMap) {
  const result = {};
  if (target <= 0 || !weightedRows.length) return result;
  const weightSum = weightedRows.reduce((sum, x) => sum + Math.max(0, x.weight), 0) || 1;
  let remain = target;
  weightedRows.forEach((row, idx) => {
    const planned = idx === weightedRows.length - 1
      ? remain
      : Math.floor(target * (Math.max(0, row.weight) / weightSum));
    const available = Number(inventoryMap[row.id] || 0);
    const sold = Math.max(0, Math.min(planned, available));
    result[row.id] = sold;
    remain -= sold;
  });
  if (remain > 0) {
    for (const row of weightedRows) {
      if (remain <= 0) break;
      const available = Number(inventoryMap[row.id] || 0) - Number(result[row.id] || 0);
      if (available <= 0) continue;
      const extra = Math.min(available, remain);
      result[row.id] = (result[row.id] || 0) + extra;
      remain -= extra;
    }
  }
  return result;
}

function getRegionMarketStats(regionKey, yearLike = state.historicalYear) {
  const rows = provinceMarketData.filter((x) => x.region === regionKey);
  if (!rows.length) return { population: 80, onlinePenetration: 0.72 };
  const population = rows.reduce((s, x) => s + x.pop, 0);
  const onlinePenetrationBase = rows.reduce((s, x) => s + x.pop * x.online, 0) / population;
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  // 2014-2018：整体提高线下占比（等价下调线上渗透），2019+ 恢复当前设定。
  // 递减式修正：2014 最强，2018 仍有提升，避免与后续电商成熟期断层。
  let earlyOfflineShift = 0;
  if (y >= 2014 && y <= 2018) {
    earlyOfflineShift = 0.06 + clamp((2018 - y) / 4, 0, 1) * 0.08; // 2018:0.06 -> 2014:0.14
  }
  const onlinePenetration = clamp(onlinePenetrationBase - earlyOfflineShift, 0.18, 0.9);
  return { population, onlinePenetration };
}

function isStrictIntegerText(raw) {
  return /^[0-9]+$/.test(String(raw ?? '').trim());
}

function normalizeSocId(idLike) {
  const id = String(idLike || '').trim();
  return LEGACY_SOC_ID_ALIAS[id] || id;
}

function validateIntegerInput(inputEl, hintEl, { showHint = true } = {}) {
  if (!inputEl) return true;
  const raw = String(inputEl.value ?? '').trim();
  const valid = isStrictIntegerText(raw);
  inputEl.classList.toggle('input-int-invalid', !valid);
  if (hintEl) {
    if (!showHint) {
      hintEl.classList.add('hidden');
    } else {
      hintEl.classList.toggle('hidden', valid);
    }
  }
  return valid;
}

function parseFlexibleDecimal(raw, fallback = NaN) {
  const txt = String(raw ?? '')
    .trim()
    .replace(/[，、]/g, ',')
    .replace(/[。]/g, '.')
    .replace(/,/g, '.');
  if (!txt) return fallback;
  const n = Number(txt);
  return Number.isFinite(n) ? n : fallback;
}

function getDisplaySizeInch() {
  return parseFlexibleDecimal(el.dispSize ? el.dispSize.value : '', 6.67);
}

function normalizeDisplaySizeInput() {
  if (!el.dispSize) return;
  const n = parseFlexibleDecimal(el.dispSize.value, NaN);
  if (!Number.isFinite(n)) return;
  const clamped = clamp(n, 3.0, 9.0);
  // Keep one decimal for easier mobile input/readability.
  el.dispSize.value = clamped.toFixed(1).replace(/\.0$/, '');
}

function getPhoneDimensionMm(inputEl, fallback, min, max) {
  return clamp(parseFlexibleDecimal(inputEl ? inputEl.value : '', fallback), min, max);
}

function getPhoneHInputMm() {
  return getPhoneDimensionMm(el.phoneH, 169.0, 80, 260);
}

function getPhoneWInputMm() {
  return getPhoneDimensionMm(el.phoneW, 78.0, 35, 180);
}

function getPhoneTInputMm() {
  return getPhoneDimensionMm(el.phoneT, 10.2, 3.5, 14.0);
}

function normalizePhoneDimensionInputs() {
  if (el.phoneH) el.phoneH.value = getPhoneHInputMm().toFixed(1).replace(/\.0$/, '');
  if (el.phoneW) el.phoneW.value = getPhoneWInputMm().toFixed(1).replace(/\.0$/, '');
  if (el.phoneT) el.phoneT.value = getPhoneTInputMm().toFixed(1).replace(/\.0$/, '');
}

function getScreenDimensionsMm(diagonalInch, ratioText) {
  const [a, b] = ratioText.split(':').map((x) => Number(x.trim()));
  const widthUnit = Math.min(a, b);
  const heightUnit = Math.max(a, b);
  const unitDiag = Math.sqrt(widthUnit ** 2 + heightUnit ** 2);
  const widthIn = diagonalInch * (widthUnit / unitDiag);
  const heightIn = diagonalInch * (heightUnit / unitDiag);
  return { widthMm: widthIn * 25.4, heightMm: heightIn * 25.4 };
}

function isFoldableUnlocked() {
  return state.productHistory.length >= 1;
}

function isFoldableSelected() {
  return el.dispMat && el.dispMat.value === 'foldable';
}

function isLegacyDisplayEra(yearLike = state.historicalYear) {
  const y = Number(yearLike || HISTORICAL_START_YEAR);
  return y <= 2016;
}

function isMidDisplayEra(yearLike = state.historicalYear) {
  const y = Number(yearLike || HISTORICAL_START_YEAR);
  return y >= 2017 && y <= 2021;
}

function getDisplayMaterialKeyForEra(matKey, yearLike = state.historicalYear) {
  const k = String(matKey || 'lcd');
  if (k === 'oled' && isMidDisplayEra(yearLike)) return 'amoled';
  return k;
}

function getFoldableSizeCostFactor(sizeInch) {
  const s = Number(sizeInch) || 0;
  return clamp(1 + Math.max(0, s - 7.0) * 0.22 + Math.max(0, s - 7.8) * 0.18, 1.0, 1.72);
}

function updateDisplayMaterialOptions() {
  if (!el.dispMat) return;
  const unlocked = isFoldableUnlocked();
  const current = el.dispMat.value;
  const legacyEra = isLegacyDisplayEra();
  const midEra = isMidDisplayEra();
  const rows = legacyEra
    ? [
      ['lcd', 'LCD'],
      ['amoled', 'AMOLED'],
      ['eink', '墨水屏']
    ]
    : midEra
      ? [
        ['lcd', 'LCD'],
        ['oled', 'OLED'],
        ['eink', '墨水屏']
      ]
    : [
      ['lcd', 'LCD'],
      ['oled', 'OLED'],
      ['dual_oled', '双层 OLED'],
      ['eink', '墨水屏'],
      ...(unlocked ? [['foldable', '折叠屏']] : [])
    ];
  el.dispMat.innerHTML = rows
    .map(([key, name]) => `<option value="${key}">${name}</option>`)
    .join('');
  if (legacyEra && !rows.some(([key]) => key === current)) {
    el.dispMat.value = 'lcd';
  } else if (midEra && current === 'amoled') {
    // 2017-2021: AMOLED 命名升级为 OLED，性能沿用。
    el.dispMat.value = 'oled';
  } else if (midEra && !rows.some(([key]) => key === current)) {
    el.dispMat.value = 'oled';
  } else if (current === 'foldable' && !unlocked) {
    el.dispMat.value = 'oled';
  } else if (rows.some(([key]) => key === current)) {
    el.dispMat.value = current;
  } else {
    el.dispMat.value = legacyEra ? 'lcd' : 'oled';
  }
}

function updateDisplayRatioAndFormOptions() {
  const y = Number(state.historicalYear || HISTORICAL_START_YEAR);
  const legacyEra = isLegacyDisplayEra(y);
  const midEra = isMidDisplayEra(y);

  if (el.dispRatio) {
    const currentRatio = String(el.dispRatio.value || '');
    const ratios = legacyEra ? DISPLAY_RATIO_OPTIONS_LEGACY : (midEra ? DISPLAY_RATIO_OPTIONS_MID : DISPLAY_RATIO_OPTIONS_MODERN);
    el.dispRatio.innerHTML = ratios.map((r) => `<option value="${r}">${r}</option>`).join('');
    if (ratios.includes(currentRatio)) {
      el.dispRatio.value = currentRatio;
    } else {
      el.dispRatio.value = ratios.includes('18:9') ? '18:9' : ratios[0];
    }
  }

  if (el.dispForm) {
    const currentForm = String(el.dispForm.value || '');
    const formKeys = legacyEra
      ? ['legacy_normal', 'legacy_id', 'legacy_true_narrow', 'legacy_three_side']
      : midEra
        ? ['mid_notch', 'mid_waterdrop', 'mid_popup', 'mid_symmetry']
        : ['symmetry', 'notch', 'hole', 'pill', 'udc'];
    el.dispForm.innerHTML = formKeys
      .filter((key) => Boolean(displayForms[key]))
      .map((key) => `<option value="${key}">${displayForms[key].name}</option>`)
      .join('');
    if (formKeys.includes(currentForm)) {
      el.dispForm.value = currentForm;
    } else {
      el.dispForm.value = legacyEra ? 'legacy_normal' : (midEra ? 'mid_waterdrop' : 'hole');
    }
  }
}

function getDisplayFeatureUnlockYear(featureKey) {
  return Number(displayFeatureUnlockYearMap[String(featureKey || '')] || HISTORICAL_START_YEAR);
}

function updateDisplayFeatureOptions() {
  if (!el.displayFeatures) return;
  const y = Number(state.historicalYear || HISTORICAL_START_YEAR);
  const checked = new Set(
    [...el.displayFeatures.querySelectorAll('input[type="checkbox"]:checked')]
      .map((i) => String(i.value || ''))
  );
  const featureOrder = ['high_refresh', 'high_res', 'p3', 'eye', 'ltpo', 'high_pwm'];
  el.displayFeatures.innerHTML = featureOrder
    .filter((key) => Boolean(displayFeatureMap[key]))
    .filter((key) => y >= getDisplayFeatureUnlockYear(key))
    .map((key) => {
      const f = displayFeatureMap[key];
      const checkedAttr = checked.has(key) ? 'checked' : '';
      return `<label><input type="checkbox" value="${key}" ${checkedAttr} /> ${f.name}</label>`;
    })
    .join('');
}

function getHistoricalDisplayCostFactor(yearLike, matKey) {
  const y = clamp(Number(yearLike || HISTORICAL_START_YEAR), HISTORICAL_START_YEAR, HISTORICAL_HANDOFF_YEAR);
  const mKey = String(matKey || '');
  // 2022-2025: 材质/比例/形态/开口与 2025 一致，仅折叠屏与双层 OLED 保留“早期溢价”并线性回落。
  if ((mKey === 'foldable' || mKey === 'dual_oled') && y >= 2022 && y <= HISTORICAL_HANDOFF_YEAR) {
    const t = (y - 2022) / (HISTORICAL_HANDOFF_YEAR - 2022); // 2022->0, 2025->1
    const startMulMap = {
      foldable: 1.9,
      dual_oled: 1.6
    };
    const startMul = startMulMap[mKey] || 1.0;
    return clamp(startMul + (1 - startMul) * t, 1.0, startMul);
  }
  if (!['lcd', 'amoled', 'oled', 'eink'].includes(mKey)) return 1.0;
  const t = (y - HISTORICAL_START_YEAR) / (HISTORICAL_HANDOFF_YEAR - HISTORICAL_START_YEAR);
  const startMulMap = {
    lcd: 1.62,
    amoled: 1.68,
    oled: 1.68,
    eink: 1.55
  };
  const startMul = startMulMap[mKey] || 1.5;
  return clamp(startMul + (1 - startMul) * t, 1.0, startMul);
}

function getScreenRatioBand(formKey, matKey) {
  if (String(formKey || '').startsWith('legacy_')) {
    if (formKey === 'legacy_three_side') return { min: 0.78, max: 0.86, label: '三边全面屏建议 78%-86%' };
    if (formKey === 'legacy_true_narrow') return { min: 0.74, max: 0.82, label: '真·窄边框建议 74%-82%' };
    if (formKey === 'legacy_id') return { min: 0.68, max: 0.76, label: 'ID无边框建议 68%-76%' };
    return { min: 0.62, max: 0.72, label: '普通形态建议 62%-72%' };
  }
  if (String(formKey || '').startsWith('mid_')) {
    if (formKey === 'mid_popup') return { min: 0.84, max: 0.91, label: '升降摄像头建议 84%-91%' };
    if (formKey === 'mid_notch') return { min: 0.8, max: 0.88, label: '刘海屏建议 80%-88%' };
    if (formKey === 'mid_waterdrop') return { min: 0.82, max: 0.9, label: '水滴屏建议 82%-90%' };
    return { min: 0.8, max: 0.87, label: '对称窄边框建议 80%-87%' };
  }
  // 审美与工程常见区间（游戏化近似）
  if (matKey === 'foldable') return { min: 0.78, max: 0.9, label: '折叠屏建议 78%-90%' };
  if (matKey === 'eink') return { min: 0.75, max: 0.85, label: '墨水屏建议 75%-85%' };
  if (formKey === 'symmetry') return { min: 0.8, max: 0.85, label: '对称窄边框建议 80%-85%' };
  if (formKey === 'hole' || formKey === 'udc' || formKey === 'pill') return { min: 0.85, max: 0.95, label: '挖孔/屏下建议 85%-95%' };
  return { min: 0.8, max: 0.9, label: '该形态建议 80%-90%' };
}

function getDisplayBottomReserveMm(matKey, sizeInch) {
  // LCD 下边驱动层通常在 2.5~3.5mm 区间，做成随尺寸轻微变化的游戏化近似。
  if (matKey === 'lcd') {
    const s = clamp(sizeInch, 3.0, 9.0);
    const t = (s - 3.0) / (9.0 - 3.0); // 0..1
    return 3.5 - t * 1.0; // 3.0" -> 3.5mm, 9.0" -> 2.5mm
  }
  const map = { amoled: 0.4, oled: 0.15, dual_oled: 0.35, eink: 1.8, foldable: 0.65 };
  return map[matKey] || 1.0;
}

function getDisplayBezelGeometry(matKey, vendorKey, formKey, sizeInch) {
  const vendor = displayVendors[vendorKey];
  const form = displayForms[formKey];
  if (String(formKey || '').startsWith('legacy_')) {
    const legacyPreset = {
      legacy_normal: { side: 6.8, top: 12.5, bottom: 15.5 },
      legacy_id: { side: 5.2, top: 10.8, bottom: 13.6 },
      legacy_true_narrow: { side: 4.0, top: 8.8, bottom: 11.6 },
      // 三边全面屏：上/左/右更窄，下巴保留明显宽度。
      legacy_three_side: { side: 2.4, top: 3.4, bottom: 9.2 }
    };
    const p = legacyPreset[formKey] || legacyPreset.legacy_normal;
    const vendorAdj = vendorKey === 'high' ? -0.6 : vendorKey === 'low' ? 0.7 : 0;
    const matAdjLegacyMap = { lcd: 0.35, amoled: 0.1, eink: 0.9 };
    const matAdjLegacy = matAdjLegacyMap[matKey] || 0.2;
    const sideBezel = Math.max(2.2, p.side + vendorAdj + matAdjLegacy);
    const topBezel = Math.max(sideBezel + 1.0, p.top + vendorAdj * 0.75 + matAdjLegacy * 0.6);
    const bottomBezel = Math.max(topBezel + 1.4, p.bottom + vendorAdj * 0.9 + getDisplayBottomReserveMm(matKey, sizeInch) * 1.25);
    return { sideBezel, topBezel, bottomBezel };
  }
  if (String(formKey || '').startsWith('mid_')) {
    const midPreset = {
      mid_notch: { side: 2.8, top: 4.7, bottom: 5.4 },
      mid_waterdrop: { side: 2.6, top: 4.2, bottom: 5.2 },
      mid_popup: { side: 2.45, top: 3.2, bottom: 4.8 },
      mid_symmetry: { side: 2.9, top: 4.4, bottom: 5.1 }
    };
    const p = midPreset[formKey] || midPreset.mid_waterdrop;
    const vendorAdj = vendorKey === 'high' ? -0.3 : vendorKey === 'low' ? 0.42 : 0;
    const matAdjMidMap = { lcd: 0.34, oled: 0.12, amoled: 0.12, eink: 0.78 };
    const matAdjMid = matAdjMidMap[matKey] || 0.2;
    const sideBezel = Math.max(1.7, p.side + vendorAdj + matAdjMid);
    const topBezel = Math.max(sideBezel + 0.65, p.top + vendorAdj * 0.66 + matAdjMid * 0.5);
    const bottomBezel = Math.max(topBezel + 0.9, p.bottom + vendorAdj * 0.75 + getDisplayBottomReserveMm(matKey, sizeInch) * 1.08);
    return { sideBezel, topBezel, bottomBezel };
  }
  const matAdjMap = { lcd: 0.35, oled: 0.0, dual_oled: 0.15, eink: 0.75, foldable: 0.55 };
  const matAdj = matAdjMap[matKey] || 0;
  const sideBezel = Math.max(1.2, vendor.bezelBase + matAdj + (form.frameAdj || 0));
  const topBezel = sideBezel + (form.topExtra || 0);
  const bottomBezel = sideBezel + getDisplayBottomReserveMm(matKey, sizeInch);
  return { sideBezel, topBezel, bottomBezel };
}

const defaultForbiddenNameDictionary = {
  sexual: [
    '色情', '黄色', '淫秽', '淫乱', '淫荡', '淫水', '淫娃', '淫妇', '淫魔', '淫贱', '猥亵', '嫖娼', '卖淫', '援交', '约炮', '开房',
    '强奸', '轮奸', '迷奸', '兽交', '幼交', '乱伦', '性虐', '性奴', '性交易', '情色', '成人影片', '成人视频', '成人直播', '脱衣',
    '爆乳', '巨乳', '丰乳', '美乳', '私处', '阴道', '阴部', '阴蒂', '阴茎', '龟头', '包皮', '处女膜', '精液', '射精', '口爆',
    '口交', '肛交', '舔阴', '舔乳', '内射', '后入', '车震', '群交', '一夜情', '情趣用品', '催情', '春药', '偷拍', '裸照', '裸聊',
    '裸模', '全裸', '裸体', '裸奔', '无码', '有码', '毛片', '黄图', '黄漫', '黄书', '黄站', 'AV', 'AV片', 'AV在线', '色图',
    '色站', '色片', '色播', '色欲', '色诱', '骚货', '骚逼', '骚穴', '骚娘们', '发情', '勾引', '调教', 'sm', 's&m',
    'porn', 'pornhub', 'xvideos', 'xnxx', 'sex', 'sexy', 'hentai', 'nude', 'naked', 'fetish', 'nsfw', 'blowjob', 'handjob',
    'deepthroat', 'cum', 'cumshot', 'creampie', 'anal', 'orgasm', 'erotic', 'escort', 'brothel', 'whore', 'slut', 'fuck', 'fucking',
    '操逼', '吃逼', '吃鸡吧', '吃鸡巴', '鸡巴', '鸡吧', '屌', '吊', 'jb', 'j8', 'nmsl', '打飞机',
    '被日', '挨操', '堕胎', '避孕', '屁眼', '马眼', '逼眼', '逼洞', '尿道', '阴唇', '外阴', '子宫', '卵巢', '宫颈', '输卵管', '前列腺',
    '直肠', '肛门', '肛肠', '生殖器', '男根', '阳具', '乳交', '自慰', '手淫', '奸淫',
    '操屁眼', '操直肠', '舔逼', '舔屁眼', '舔逼眼',
    'jiba', 'j8', 'jb', 'yindao', 'yinbu', 'yinjing', 'yindi', 'gangjiao', 'koujiao', 'neishe', 'houru', 'lunjian',
    'chibi', '吃bi', 'chi bi', 'caobi', 'caopiyan', 'caozhichang', 'tianbi', 'tianpiyan', 'tianbiyan'
  ],
  abuse: [
    '他妈逼', '他妈的', '他妈', '你妈', '你妈的', '妈逼', '操你妈', '草你妈', '艹你妈', 'cnm', 'cnm',
    '傻逼', '傻b', '煞笔', '沙比', '傻叉', '智障', '脑残', '废物', '狗东西', '滚蛋', '去死', '王八蛋',
    '贱人', '婊子', '婊', '垃圾', '杂种', '死妈', '死全家', '妈卖批', 'mmp', 'sb', '2b'
  ],
  gore: [
    '血腥', '血浆', '血案', '血流成河', '碎尸', '分尸', '肢解', '砍头', '斩首', '爆头', '割喉', '开膛', '挖眼', '断肢', '断头',
    '虐杀', '屠杀', '屠城', '灭门', '活埋', '凌迟', '绞刑', '枪决', '处决', '枪杀', '刺杀', '捅死', '毒杀', '谋杀', '凶杀',
    '恐袭', '恐怖袭击', '袭击平民', '爆炸袭击', '炸弹', '炸药', '引爆', '自杀式袭击', '人肉炸弹', '生化武器', '化学武器',
    '极端组织', '圣战', '斩人', '砍人', '嗜血', '尸体', '尸块', '尸山', '尸骨', '骷髅', '枪战', '火并', '黑帮仇杀',
    'torture', 'behead', 'beheading', 'gore', 'gory', 'slaughter', 'massacre', 'decapitate', 'dismember', 'bloodbath',
    'terror', 'terrorist', 'isis', 'islamicstate', 'jihadi', 'bombing', 'explosive', 'murder', 'serialkiller', 'snuff'
  ],
  political: [
    '法轮功', '台独', '港独', '疆独', '藏独', '东突', '六四', '天安门事件', '颠覆国家政权', '分裂国家', '煽动颠覆', '反党', '反共',
    '推翻政府', '颜色革命', '民主墙', '街头革命', '游行示威', '非法集会', '罢工罢课', '政治迫害', '政治暗杀', '政变', '兵变',
    '暴动', '叛乱', '起义军', '独立公投', '港人治港', '光复香港', '香港独立', '台湾独立', '西藏独立', '新疆独立', '民族仇恨',
    '宗教极端', '圣战组织', '基地组织', '恐怖组织', '纳粹', '新纳粹', '白人至上', '反华', '反中', '反政府', '敏感政治',
    'taidu', 'gangdu', 'jiangdu', 'zangdu', 'dongtu', 'liusi', 'falungong', 'fandang', 'fangong', 'fanzhengfu',
    'td', 'gd', 'jd', 'zd', 'flg', 'ls', 'dt'
  ],
  religion: [
    '邪教', '极端宗教', '宗教极端主义', '圣战', '圣战分子', '宗教恐怖主义', '宗教仇恨', '宗派仇杀',
    '异端审判', '焚经', '焚寺', '焚教堂', '焚清真寺', '极端布道', '仇恨传教', '恐怖传教',
    'isis', 'islamicstate', 'alqaeda', '基地组织', '达伊沙', '哈里发国',
    'xiejiao', 'shengzhan', 'jidizu', 'jidizuzhi', 'zongjiaokongbu', 'jihad', 'jihadi', 'khilafah',
    'xj', 'sz', 'jdz'
  ],
  politicalNames: [
    '毛泽东', '邓小平', '江泽民', '胡锦涛', '习近平', '李克强', '李强', '温家宝', '朱镕基', '赵紫阳', '华国锋', '周恩来',
    '孙中山', '蒋介石', '蒋中正', '袁世凯', '宋美龄', '薄熙来', '王岐山', '韩正', '蔡奇', '李希', '丁薛祥', '陈敏尔',
    '马英九', '蔡英文', '赖清德', '陈水扁', '连战', '韩国瑜', '柯文哲', '朱立伦', '李登辉', '洪秀柱', '林郑月娥',
    '梁振英', '董建华', '何厚铧', '崔世安', '贺一诚', '达赖', '达赖喇嘛', '班禅', '热比娅', '吾尔开希', '王丹', '柴玲',
    '刘晓波', '艾未未', '郭文贵', '奥巴马', '拜登', '特朗普', '川普', '希拉里', '普京', '泽连斯基', '默克尔', '朔尔茨',
    '马克龙', '勒庞', '苏纳克', '约翰逊', '安倍晋三', '岸田文雄', '菅义伟', '石破茂', '文在寅', '尹锡悦', '金正恩',
    '莫迪', '内塔尼亚胡', '甘地', '卡斯特罗', '查韦斯', '马杜罗',
    '江青', '四人帮', '张春桥', '姚文元', '王洪文'
  ]
};

let forbiddenNameDictionary = JSON.parse(JSON.stringify(defaultForbiddenNameDictionary));
const NAME_MODERATION_LEVEL = 'ultra';

const forbiddenNameRegexRules = [
  { category: '涉黄/性暗示', pattern: /(操|艹|草|日|搞|舔)\s*(屁眼|直肠|逼眼|逼洞|逼|鸡巴|鸡吧|阴道|阴部|肛门|肛肠|尿道)/i },
  { category: '涉黄/性暗示', pattern: /(操屁眼|操直肠|舔逼|舔屁眼|舔逼眼|被日|挨操|口交|肛交|内射|后入|群交|乱伦|兽交|幼交|强奸|迷奸)/i },
  { category: '低俗辱骂', pattern: /(操你妈|草你妈|艹你妈|他妈逼|妈逼|傻逼|煞笔|婊子|死全家)/i },
  { category: '血腥暴力', pattern: /(爆头|斩首|肢解|碎尸|屠杀|灭门|人肉炸弹|恐怖袭击)/i },
  { category: '政治敏感', pattern: /(颠覆国家政权|分裂国家|煽动颠覆|台独|港独|疆独|藏独|六四)/i },
  { category: '宗教极端', pattern: /(邪教|极端宗教|宗教恐怖主义|圣战分子|仇恨传教|基地组织|isis|alqaeda)/i }
];

const forbiddenNameStrictRules = [
  { category: '涉黄/性暗示', pattern: /(操|艹|草|日|干|搞|舔).{0,3}(逼|屄|鸡巴|鸡吧|阴道|阴部|肛门|肛肠|直肠|屁眼|尿道)/i },
  { category: '涉黄/性暗示', pattern: /(性|淫|黄|色|裸|炮).{0,4}(交|爱|行为|内容|视频|直播|播|服务|交易)/i },
  { category: '低俗辱骂', pattern: /(妈逼|他妈|你妈|傻逼|煞笔|婊|杂种|死全家|cnm|mmp|sb|2b)/i },
  { category: '血腥暴力', pattern: /(杀|屠|炸|爆|斩|肢解|碎尸|恐袭|恐怖袭击).{0,4}(人|城|平民|事件|行动|组织)?/i },
  { category: '政治敏感', pattern: /(颠覆|分裂国家|煽动颠覆|台独|港独|疆独|藏独|六四|反共|反党)/i },
  { category: '宗教极端', pattern: /(邪教|圣战|极端宗教|宗教恐怖主义|基地组织|isis|alqaeda)/i },
  { category: '涉黄/性暗示', pattern: /(吃\s*bi|chi\s*bi)/i },
  { category: '涉黄/性暗示', pattern: /(?:^|[^a-z])(jiba|yindao|yinbu|yinjing|gangjiao|koujiao|chibi|caopiyan|caozhichang|tianbi)(?:[^a-z]|$)/i },
  { category: '政治敏感', pattern: /(?:^|[^a-z])(taidu|gangdu|jiangdu|zangdu|falungong|liusi|fandang|fangong|fanzhengfu|td|gd|jd|zd|flg|dt)(?:[^a-z]|$)/i },
  { category: '宗教极端', pattern: /(?:^|[^a-z])(xiejiao|shengzhan|zongjiaokongbu|jihad|jihadi|isis|alqaeda|xj|sz|jdz)(?:[^a-z]|$)/i }
];

const forbiddenNameUltraRoots = [
  ['涉黄/性暗示', ['sex', 'porn', 'hentai', 'nsfw', 'jiba', 'jb', 'j8', 'yindao', 'yinjing', 'yinbu', 'chibi', 'caobi', 'tianbi', 'koujiao', 'gangjiao', 'neishe', 'piaochang']],
  ['低俗辱骂', ['cnm', 'mmp', 'sb', '2b', 'shabi', 'nmsl', 'tamade', 'mabi']],
  ['血腥暴力', ['kill', 'murder', 'slaughter', 'massacre', 'behead', 'bomb', 'terror', 'explosive', 'gore']],
  ['政治敏感', ['taidu', 'gangdu', 'jiangdu', 'zangdu', 'falungong', 'liusi', 'fandang', 'fangong', 'fanzhengfu', 'flg', 'td', 'gd', 'jd', 'zd', 'dt']],
  ['宗教极端', ['xiejiao', 'shengzhan', 'jihad', 'jihadi', 'isis', 'alqaeda', 'khilafah', 'zongjiaokongbu', 'jdz', 'xj', 'sz']]
];

function sanitizeForbiddenDictionary(raw) {
  const result = {};
  const allowedKeys = ['sexual', 'abuse', 'gore', 'political', 'religion', 'politicalNames'];
  allowedKeys.forEach((key) => {
    const list = raw && Array.isArray(raw[key]) ? raw[key] : [];
    result[key] = [...new Set(
      list
        .map((x) => String(x || '').trim())
        .filter((x) => x.length >= 1 && x.length <= 32)
    )];
  });
  return result;
}

async function loadForbiddenNameDictionary() {
  try {
    const resp = await fetch('dict/forbidden_names.json', { cache: 'no-store' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const payload = await resp.json();
    const dict = sanitizeForbiddenDictionary(payload);
    const loadedCount = Object.values(dict).reduce((sum, arr) => sum + arr.length, 0);
    if (loadedCount < 50) throw new Error('词条数量过少');
    forbiddenNameDictionary = dict;
  } catch (err) {
    forbiddenNameDictionary = JSON.parse(JSON.stringify(defaultForbiddenNameDictionary));
    console.warn('[forbidden-dict] 加载失败，已使用内置兜底词典：', err);
  }
}

function normalizeNameForDictionary(raw) {
  return String(raw || '')
    .toLowerCase()
    .replace(/[\s_\-.·•,，。!！?？:：;；'"`~^*+\\/|()[\]{}<>]/g, '');
}

function normalizeNameForUltra(raw) {
  return normalizeNameForDictionary(raw)
    .replace(/[0o]/g, 'o')
    .replace(/[1il!]/g, 'i')
    .replace(/[3]/g, 'e')
    .replace(/[4@]/g, 'a')
    .replace(/[5$]/g, 's')
    .replace(/[7]/g, 't')
    .replace(/[8]/g, 'b');
}

function matchForbiddenCategory(name) {
  const normalized = normalizeNameForDictionary(name);
  if (NAME_MODERATION_LEVEL === 'ultra') {
    const ultraNormalized = normalizeNameForUltra(name);
    for (const [category, roots] of forbiddenNameUltraRoots) {
      for (const root of roots) {
        const r = normalizeNameForUltra(root);
        if (r && ultraNormalized.includes(r)) {
          return { hit: root, category };
        }
      }
    }
  }
  if (NAME_MODERATION_LEVEL === 'strict' || NAME_MODERATION_LEVEL === 'ultra') {
    for (const rule of forbiddenNameStrictRules) {
      const m = String(name || '').match(rule.pattern);
      if (m) return { hit: m[0], category: rule.category };
    }
  }
  for (const rule of forbiddenNameRegexRules) {
    const m = String(name || '').match(rule.pattern);
    if (m) return { hit: m[0], category: rule.category };
  }
  const categories = [
    ['sexual', '涉黄/性暗示'],
    ['abuse', '低俗辱骂'],
    ['gore', '血腥暴力'],
    ['political', '政治敏感'],
    ['religion', '宗教极端'],
    ['politicalNames', '政治人物']
  ];
  for (const [key, label] of categories) {
    const words = forbiddenNameDictionary[key] || [];
    for (const word of words) {
      const normalizedWord = normalizeNameForDictionary(word);
      if (normalizedWord && normalized.includes(normalizedWord)) {
        return { hit: word, category: label };
      }
    }
  }
  return null;
}

const blockedBrandNamePatterns = [
  /华为|huawei/i,
  /小米|xiaomi|mi\s*phone/i,
  /苹果|apple|iphone/i,
  /三星|samsung|galaxy/i,
  /蓝狐|blaufox|bluefox/i,
  /oppo/i,
  /步步高|bbk/i,
  /vivo|iqoo|i\s*qoo/i,
  /荣耀|honor/i,
  /一加|oneplus|1\+|one\s*plus/i,
  /魅族|meizu/i,
  /realme|真我/i,
  /红米|redmi/i,
  /努比亚|nubia/i,
  /中兴|zte/i,
  /联想|lenovo|motorola|moto/i,
  /诺基亚|nokia/i,
  /索尼|sony|xperia/i
];

function validateCompanyName(raw) {
  const name = (raw || '').trim();
  if (name.length < 2 || name.length > 24) {
    return { ok: false, msg: '企业名称需为 2~24 个字符。', name };
  }
  if (!/^[\u4e00-\u9fa5A-Za-z]+$/.test(name)) {
    return { ok: false, msg: '企业名称仅支持中文和英文字母，不允许数字或特殊字符。', type: 'format', name };
  }
  const forbiddenMatch = matchForbiddenCategory(name);
  if (forbiddenMatch) {
    return {
      ok: false,
      msg: `企业名称包含违禁词「${forbiddenMatch.hit}」（${forbiddenMatch.category}），请更换。`,
      type: 'forbidden',
      name
    };
  }
  if (blockedBrandNamePatterns.some((p) => p.test(name))) {
    return { ok: false, msg: '企业名称包含已有主流品牌名称，请更换为原创名称。', type: 'brand', name };
  }
  return { ok: true, msg: '', type: 'ok', name };
}

function validateModelName(raw) {
  const name = (raw || '').trim();
  if (name.length < 2 || name.length > 20) {
    return { ok: false, msg: '机型命名需为 2~20 位。', name };
  }
  if (!/^[A-Za-z0-9]+$/.test(name)) {
    return { ok: false, msg: '机型命名仅支持英文字母和数字。', type: 'format', name };
  }
  const forbiddenMatch = matchForbiddenCategory(name);
  if (forbiddenMatch) {
    return {
      ok: false,
      msg: `机型命名包含违禁词「${forbiddenMatch.hit}」（${forbiddenMatch.category}），请更换。`,
      type: 'forbidden',
      name
    };
  }
  if (blockedBrandNamePatterns.some((p) => p.test(name))) {
    return { ok: false, msg: '请试试更有创意的名称。', type: 'brand', name };
  }
  return { ok: true, msg: '', type: 'ok', name };
}

function getNextGenerationIndex() {
  return state.productHistory.length + 1;
}

function composeModelName(baseName, genIdx) {
  return `${baseName} Gen${genIdx}`;
}

function jaccardSimilarity(setA, setB) {
  const a = setA instanceof Set ? setA : new Set();
  const b = setB instanceof Set ? setB : new Set();
  const union = new Set([...a, ...b]);
  if (!union.size) return 1;
  let inter = 0;
  union.forEach((x) => {
    if (a.has(x) && b.has(x)) inter += 1;
  });
  return inter / union.size;
}

function buildSpecSnapshotFromInput(inputLike, weightedSkuPrice = 0, skuPlans = []) {
  if (!inputLike) return null;
  const disp = inputLike.disp || {};
  const cams = inputLike.cams || {};
  const body = inputLike.body || {};
  const extrasArr = Array.isArray(inputLike.chosenExtras) ? inputLike.chosenExtras : [];
  const featureArr = Array.isArray(disp.features) ? disp.features : [];
  const skuArr = Array.isArray(skuPlans) ? skuPlans : [];
  const skuSignatures = skuArr
    .map((s) => `${String(s?.ram?.id || s?.ramId || '')}+${String(s?.rom?.id || s?.romId || '')}@${Math.round(Number(s?.share || 0))}`)
    .filter((x) => x !== '+@0')
    .sort();

  let maxRamScore = 0;
  let maxRomScore = 0;
  skuArr.forEach((s) => {
    maxRamScore = Math.max(maxRamScore, Number((s && s.ram && s.ram.score) || s?.ramScore || 0));
    maxRomScore = Math.max(maxRomScore, Number((s && s.rom && s.rom.score) || s?.romScore || 0));
  });

  return {
    socId: String(inputLike.soc?.id || ''),
    socTier: String(inputLike.soc?.tier || ''),
    displayMat: String(disp.mat?.name || ''),
    displayForm: String(disp.form?.name || ''),
    displaySize: Number(disp.size || 0),
    featureIds: featureArr.map((f) => String(f?.id || f?.name || '')).filter(Boolean).sort(),
    bodyId: String(body.id || ''),
    battery: Number(inputLike.battery || 0),
    phoneH: Number(inputLike.phoneH || 0),
    phoneW: Number(inputLike.phoneW || 0),
    phoneT: Number(inputLike.phoneT || 0),
    camMain: String(cams.main?.id || 'none'),
    camUltra: String(cams.ultra?.id || 'none'),
    camMono: String(cams.mono?.id || 'none'),
    camTele: String(cams.tele?.id || 'none'),
    camFront: String(cams.front?.id || 'none'),
    extraIds: extrasArr.map((x) => String(x?.id || '')).filter(Boolean).sort(),
    skuSignatures,
    skuCount: skuSignatures.length,
    weightedPrice: Number(weightedSkuPrice || 0),
    maxRamScore,
    maxRomScore
  };
}

function getLastGenerationSpecSnapshot() {
  const last = state.productHistory && state.productHistory.length
    ? state.productHistory[state.productHistory.length - 1]
    : null;
  if (!last) return null;
  if (last.specSnapshot) return last.specSnapshot;

  // Fallback for legacy saves without structured snapshot.
  const displayText = String(last.display || '');
  const sizeMatch = displayText.match(/(\d+(?:\.\d+)?)"/);
  return {
    socId: '',
    socTier: '',
    displayMat: String(displayText.split(' ')[0] || ''),
    displayForm: '',
    displaySize: sizeMatch ? Number(sizeMatch[1]) : 0,
    featureIds: [],
    bodyId: '',
    battery: 0,
    phoneH: 0,
    phoneW: 0,
    phoneT: 0,
    camMain: 'none',
    camUltra: 'none',
    camMono: 'none',
    camTele: 'none',
    camFront: 'none',
    extraIds: [],
    skuSignatures: [],
    skuCount: 0,
    weightedPrice: 0,
    maxRamScore: 0,
    maxRomScore: 0
  };
}

function calcGenerationNovelty(currentSpec, previousSpec, difficultyName = '真实') {
  if (!currentSpec || !previousSpec) {
    return {
      score: 100,
      demandMul: 1.0,
      tag: '首代产品或无上代参考',
      warning: ''
    };
  }

  let score = 0;
  let changedCount = 0;
  const bumpChanged = (changed) => {
    if (changed) changedCount += 1;
    return changed;
  };

  const socChanged = bumpChanged(currentSpec.socId && previousSpec.socId && currentSpec.socId !== previousSpec.socId);
  if (socChanged) score += 22;

  const matChanged = bumpChanged(currentSpec.displayMat !== previousSpec.displayMat);
  if (matChanged) score += 12;

  const formChanged = bumpChanged(currentSpec.displayForm !== previousSpec.displayForm);
  if (formChanged) score += 7;

  const sizeDiff = Math.abs((currentSpec.displaySize || 0) - (previousSpec.displaySize || 0));
  const sizeChanged = bumpChanged(sizeDiff >= 0.2);
  score += Math.min(10, sizeDiff * 4.5);
  if (sizeChanged) score += 2;

  const currentFeatureSet = new Set(currentSpec.featureIds || []);
  const previousFeatureSet = new Set(previousSpec.featureIds || []);
  const featureDiffRatio = (1 - jaccardSimilarity(currentFeatureSet, previousFeatureSet));
  const featureUnion = new Set([...currentFeatureSet, ...previousFeatureSet]);
  let featureDeltaCount = 0;
  featureUnion.forEach((id) => {
    const inCurrent = currentFeatureSet.has(id);
    const inPrevious = previousFeatureSet.has(id);
    if (inCurrent !== inPrevious) featureDeltaCount += 1;
  });
  if (featureDeltaCount > 0) {
    changedCount += Math.min(6, featureDeltaCount);
  }
  score += featureDiffRatio * 12;
  score += Math.min(8, featureDeltaCount * 1.4);

  const bodyChanged = bumpChanged(currentSpec.bodyId && previousSpec.bodyId && currentSpec.bodyId !== previousSpec.bodyId);
  if (bodyChanged) score += 7;

  const batteryDiff = Math.abs((currentSpec.battery || 0) - (previousSpec.battery || 0));
  const batteryChanged = bumpChanged(batteryDiff >= 400);
  score += Math.min(8, batteryDiff / 350);
  if (batteryChanged) score += 2;

  const phoneHDiff = Math.abs((currentSpec.phoneH || 0) - (previousSpec.phoneH || 0));
  const phoneWDiff = Math.abs((currentSpec.phoneW || 0) - (previousSpec.phoneW || 0));
  const phoneTDiff = Math.abs((currentSpec.phoneT || 0) - (previousSpec.phoneT || 0));
  const bodySizeDiffScore = Math.min(10, phoneHDiff * 0.42 + phoneWDiff * 0.55 + phoneTDiff * 2.1);
  const bodySizeChanged = bumpChanged(phoneHDiff >= 1.5 || phoneWDiff >= 1 || phoneTDiff >= 0.2);
  score += bodySizeDiffScore;
  if (bodySizeChanged) score += 2;

  const mainCamChanged = bumpChanged(currentSpec.camMain !== previousSpec.camMain);
  if (mainCamChanged) score += 8;

  const ultraCamChanged = bumpChanged(currentSpec.camUltra !== previousSpec.camUltra);
  if (ultraCamChanged) score += 5;

  const monoCamChanged = bumpChanged(currentSpec.camMono !== previousSpec.camMono);
  if (monoCamChanged) score += 5;

  const teleCamChanged = bumpChanged(currentSpec.camTele !== previousSpec.camTele);
  if (teleCamChanged) score += 5;

  const frontCamChanged = bumpChanged(currentSpec.camFront !== previousSpec.camFront);
  if (frontCamChanged) score += 5;

  const currentExtrasSet = new Set(currentSpec.extraIds || []);
  const previousExtrasSet = new Set(previousSpec.extraIds || []);
  const extraDiffRatio = (1 - jaccardSimilarity(currentExtrasSet, previousExtrasSet));
  const extraUnion = new Set([...currentExtrasSet, ...previousExtrasSet]);
  let extraDeltaCount = 0;
  extraUnion.forEach((id) => {
    const inCurrent = currentExtrasSet.has(id);
    const inPrevious = previousExtrasSet.has(id);
    if (inCurrent !== inPrevious) extraDeltaCount += 1;
  });
  if (extraDeltaCount > 0) {
    changedCount += Math.min(6, extraDeltaCount);
  }
  score += extraDiffRatio * 11;
  score += Math.min(10, extraDeltaCount * 1.8);

  const currentSkuSet = new Set(currentSpec.skuSignatures || []);
  const previousSkuSet = new Set(previousSpec.skuSignatures || []);
  const skuDiffRatio = (1 - jaccardSimilarity(currentSkuSet, previousSkuSet));
  const skuUnion = new Set([...currentSkuSet, ...previousSkuSet]);
  let skuDeltaCount = 0;
  skuUnion.forEach((sig) => {
    const inCurrent = currentSkuSet.has(sig);
    const inPrevious = previousSkuSet.has(sig);
    if (inCurrent !== inPrevious) skuDeltaCount += 1;
  });
  if (skuDeltaCount > 0 || (currentSpec.skuCount || 0) !== (previousSpec.skuCount || 0)) {
    changedCount += Math.min(6, Math.max(skuDeltaCount, Math.abs((currentSpec.skuCount || 0) - (previousSpec.skuCount || 0))));
  }
  score += skuDiffRatio * 12;
  score += Math.min(9, skuDeltaCount * 1.6);

  score += Math.min(6, Math.abs((currentSpec.weightedPrice || 0) - (previousSpec.weightedPrice || 0)) / 1000 * 6);
  score += Math.min(7, Math.abs((currentSpec.maxRamScore + currentSpec.maxRomScore) - (previousSpec.maxRamScore + previousSpec.maxRomScore)) * 0.16);

  const noveltyScore = clamp(Math.round(score), 0, 100);
  const hardMode = String(difficultyName || '').includes('困难');
  const fatigueBypassChanges = hardMode ? 4 : 3;
  if (changedCount >= fatigueBypassChanges) {
    return {
      score: noveltyScore,
      demandMul: 1.0,
      tag: `换代改动充足（${changedCount}项）`,
      warning: ''
    };
  }

  if (noveltyScore < 18) {
    return {
      score: noveltyScore,
      demandMul: 0.68,
      tag: '换代疲劳（严重）',
      warning: '请对产品换代，否则会严重影响销量。'
    };
  }
  if (noveltyScore < 32) {
    return {
      score: noveltyScore,
      demandMul: 0.78,
      tag: '换代疲劳（明显）',
      warning: '本代改动偏小，市场新鲜感下降明显。'
    };
  }
  if (noveltyScore < 48) {
    return {
      score: noveltyScore,
      demandMul: 0.9,
      tag: '换代改动偏保守',
      warning: '建议拉开差异化，避免“挤牙膏式换代”。'
    };
  }
  return {
    score: noveltyScore,
    demandMul: 1.0,
    tag: '换代差异合理',
    warning: ''
  };
}

function updateModelNameHint() {
  if (!el.modelNameHint || !el.modelBaseName) return;
  const check = validateModelName(el.modelBaseName.value);
  if (!el.modelBaseName.value.trim()) {
    el.modelNameHint.className = 'muted';
    el.modelNameHint.textContent = '机型命名需为 2~20 位，仅支持英文字母和数字，并通过违禁词与品牌词审查。';
    return;
  }
  if (!check.ok) {
    el.modelNameHint.className = 'bad';
    el.modelNameHint.textContent = `命名校验：${check.msg}`;
    return;
  }
  const nextName = composeModelName(check.name, getNextGenerationIndex());
  el.modelNameHint.className = 'good';
  el.modelNameHint.textContent = `命名校验通过：${nextName}`;
}

function getDisplayLiveEstimate() {
  const matKey = el.dispMat.value;
  const effectiveMatKey = getDisplayMaterialKeyForEra(matKey, state.historicalYear);
  const vendorKey = el.dispVendor.value;
  const ratio = el.dispRatio.value;
  const size = getDisplaySizeInch();
  const formKey = el.dispForm.value;
  const features = [...el.displayFeatures.querySelectorAll('input:checked')].map((i) => displayFeatureMap[i.value]);

  const mat = { ...(displayMaterials[effectiveMatKey] || displayMaterials.lcd) };
  if (matKey === 'oled' && effectiveMatKey === 'amoled') mat.name = 'OLED';
  const vendor = displayVendors[vendorKey];
  const form = displayForms[formKey];
  const sizeFactor = Math.pow(size / 6.5, 1.15);
  const ratioFactor = aspectCostFactor[ratio] || 1.03;
  const featureCostMultiplier = effectiveMatKey === 'eink' ? 2.8 : 1.0;
  const featureCost = features.reduce((s, f) => s + f.cost, 0) * featureCostMultiplier;
  const ratioNoveltyCostMul = (ratio === '4:3' || ratio === '16:10') && matKey !== 'foldable' && !isLegacyDisplayEra() ? 1.08 : 1.0;
  const foldableSizeMul = matKey === 'foldable' ? getFoldableSizeCostFactor(size) : 1.0;
  const dim = getScreenDimensionsMm(size, ratio);
  const bezel = getDisplayBezelGeometry(matKey, vendorKey, formKey, size);
  const band = getScreenRatioBand(formKey, matKey);
  const phoneH = getPhoneHInputMm();
  const phoneW = getPhoneWInputMm();
  const frontAreaCm2 = (phoneH * phoneW) / 100;
  const screenAreaCm2 = (dim.widthMm * dim.heightMm) / 100;
  const screenToBodyRatio = clamp(screenAreaCm2 / Math.max(1, frontAreaCm2), 0.45, 0.96);
  const ratioMid = (band.min + band.max) / 2;
  const highTightness = Math.max(0, screenToBodyRatio - ratioMid);
  const lowLoose = Math.max(0, ratioMid - screenToBodyRatio);
  const ratioCostFactor = clamp(1 + highTightness * 1.1 - lowLoose * 0.25, 0.9, 1.22);
  const bezelCostFactor = clamp(1 + Math.max(0, 2.5 - bezel.sideBezel) * 0.16, 0.92, 1.28);
  const bezelDemandFactor = clamp(1.07 - Math.max(0, bezel.sideBezel - 1.5) * 0.12, 0.68, 1.08);
  const historicalCostMul = getHistoricalDisplayCostFactor(state.historicalYear, effectiveMatKey);
  const displayCost = ((mat.baseCost * historicalCostMul * sizeFactor * ratioFactor + featureCost + form.cost) * foldableSizeMul) * vendor.costFactor * ratioCostFactor * bezelCostFactor * ratioNoveltyCostMul;
  return {
    displayCost,
    dim,
    mat,
    vendor,
    form,
    featureCostMultiplier,
    screenToBodyRatio,
    band,
    ratioCostFactor,
    ratioNoveltyCostMul,
    foldableSizeMul,
    bezel,
    bezelCostFactor,
    bezelDemandFactor
  };
}

function fillOptions() {
  const setSelectIfExists = (selectEl, value, fallback = '') => {
    if (!selectEl) return;
    const opts = [...selectEl.options].map((o) => o.value);
    if (opts.includes(value)) {
      selectEl.value = value;
      return;
    }
    if (fallback && opts.includes(fallback)) {
      selectEl.value = fallback;
      return;
    }
    if (opts.length) selectEl.value = opts[0];
  };

  const prevSoc = el.soc ? normalizeSocId(el.soc.value) : '';
  const activeSocs = socs
    .filter((s) => !s.retired)
    .slice()
    .sort((a, b) => (Number(a.cost || 0) - Number(b.cost || 0)) || (Number(a.score || 0) - Number(b.score || 0)));
  el.soc.innerHTML = activeSocs
    .map((s) => `<option value="${s.id}">${s.name}（${s.tier}，估价 ${RMB(s.cost)}）</option>`)
    .join('');
  if (el.soc) {
    const fallbackSoc = activeSocs.some((s) => s.id === 'dim7300') ? 'dim7300' : (activeSocs[0]?.id || '');
    el.soc.value = activeSocs.some((s) => s.id === prevSoc) ? prevSoc : fallbackSoc;
  }
  updateDisplayMaterialOptions();

  el.region.innerHTML = Object.entries(chinaRegions)
    .map(([key, r], idx) => `<option value="${key}" ${idx === 0 ? 'selected' : ''}>${r.name}</option>`)
    .join('');
  el.dispVendor.innerHTML = Object.entries(displayVendors)
    .map(([key, v]) => `<option value="${key}">${v.name}</option>`)
    .join('');
  el.dispVendor.value = 'mid';
  updateDisplayRatioAndFormOptions();
  updateDisplayFeatureOptions();

  const quoteOpts = Object.entries(procurementPlans)
    .map(([key, q]) => `<option value="${key}">${q.name}（系数 ${q.factor.toFixed(2)}）</option>`)
    .join('');
  el.procurementPlan.innerHTML = quoteOpts;
  el.procurementPlan.value = 'quarterly';

  initSkuRows();
  const currentYear = Number(state.historicalYear || HISTORICAL_START_YEAR);
  const prevBody = el.body ? el.body.value : '';
  const bodyOpts = getBodyOptionsForYear(currentYear);
  el.body.innerHTML = bodyOpts.map((x) => `<option value="${x.id}">${x.name}（${RMB(x.cost)}）</option>`).join('');
  if (el.body) {
    const hasPrevBody = bodyOpts.some((x) => x.id === prevBody);
    if (hasPrevBody) el.body.value = prevBody;
    else if (bodyOpts.some((x) => x.id === 'aluminum')) el.body.value = 'aluminum';
    else if (bodyOpts.some((x) => x.id === 'plastic')) el.body.value = 'plastic';
    else el.body.value = bodyOpts[0]?.id || '';
  }

  const prevMain = el.camMain ? el.camMain.value : '';
  const prevUltra = el.camUltra ? el.camUltra.value : '';
  const prevMono = el.camMono ? el.camMono.value : '';
  const prevTele = el.camTele ? el.camTele.value : '';
  const prevFront = el.camFront ? el.camFront.value : '';
  const activeCameras = cameraModules
    .filter((x) => !x.retired)
    .slice()
    .sort((a, b) => (Number(a.cost || 0) - Number(b.cost || 0)) || (Number(a.score || 0) - Number(b.score || 0)));
  const cameraOpt = activeCameras.map((x) => `<option value="${x.id}">${x.name}${x.cost ? `（${RMB(x.cost)}）` : ''}</option>`).join('');
  el.camMain.innerHTML = cameraOpt;
  el.camUltra.innerHTML = cameraOpt;
  if (el.camMono) el.camMono.innerHTML = cameraOpt;
  el.camTele.innerHTML = cameraOpt;
  el.camFront.innerHTML = cameraOpt;
  const hasCam = (id) => activeCameras.some((x) => x.id === id);
  el.camMain.value = hasCam(prevMain) ? prevMain : (hasCam('ov50h') ? 'ov50h' : (activeCameras[0]?.id || 'none'));
  el.camUltra.value = hasCam(prevUltra) ? prevUltra : (hasCam('uw_50') ? 'uw_50' : 'none');
  if (el.camMono) el.camMono.value = hasCam(prevMono) ? prevMono : 'none';
  el.camTele.value = hasCam(prevTele) ? prevTele : 'none';
  el.camFront.value = hasCam(prevFront) ? prevFront : (hasCam('front_32') ? 'front_32' : 'none');

  // Year-aware safe defaults: ensure 2014 opening build can launch directly.
  if (currentYear <= 2016) {
    // Keep default as conservative and low-risk for legacy era.
    setSelectIfExists(el.dispMat, 'lcd');
    updateDisplayRatioAndFormOptions();
    updateDisplayFeatureOptions();
    setSelectIfExists(el.dispVendor, 'mid', 'low');
    if (el.dispSize) el.dispSize.value = '4.6';
    setSelectIfExists(el.dispRatio, '16:9', '18:9');
    setSelectIfExists(el.dispForm, 'legacy_normal');
    setSelectIfExists(el.body, 'plastic');
    if (el.battery) el.battery.value = '3000';
    if (el.price) el.price.value = '1599';
    if (el.units) el.units.value = '2000';
    if (el.phoneH) el.phoneH.value = '135';
    if (el.phoneW) el.phoneW.value = '72';
    if (el.phoneT) el.phoneT.value = '8.8';
    setSelectIfExists(el.procurementPlan, 'quarterly');
    setSelectIfExists(el.marketingFocus, 'balanced');
    setSelectIfExists(el.campaignLevel, 'low', 'medium');
    // Legacy era camera default: single rear + front, avoid multi-cam mandatory module conflict.
    const mainLegacy = activeCameras.find((x) => x.id !== 'none' && (x.type === 'main' || x.type === 'normal'));
    const frontLegacy = activeCameras.find((x) => x.id !== 'none' && x.type === 'front');
    setSelectIfExists(el.camMain, mainLegacy ? mainLegacy.id : 'none');
    setSelectIfExists(el.camUltra, 'none');
    if (el.camMono) setSelectIfExists(el.camMono, 'none');
    setSelectIfExists(el.camTele, 'none');
    setSelectIfExists(el.camFront, frontLegacy ? frontLegacy.id : 'none');
    if (el.skuList) {
      const row = el.skuList.querySelector('.sku-row');
      if (row) {
        const ramSel = row.querySelector('.sku-ram');
        const romSel = row.querySelector('.sku-rom');
        const priceAdj = row.querySelector('.sku-price-adj');
        const share = row.querySelector('.sku-share');
        if (ramSel && ramOptions.length) ramSel.value = ramOptions[0].id;
        if (romSel && romOptions.length) romSel.value = romOptions[0].id;
        if (priceAdj) priceAdj.value = '0';
        if (share) share.value = '100';
      }
    }
  }

  refreshExtrasSelectableOptions();
  if (currentYear <= 2016 && el.extras) {
    [...el.extras.querySelectorAll('input:checked')].forEach((i) => {
      i.checked = false;
    });
    refreshExtrasSelectableOptions();
  }
  enforceLegacyMultiCamGate();

  el.marketingFocus.innerHTML = Object.entries(marketingProfiles)
    .map(([key, m]) => `<option value="${key}">${m.name}</option>`)
    .join('');
  el.campaignLevel.innerHTML = Object.entries(campaignLevels)
    .map(([key, c]) => `<option value="${key}">${c.name}（首发 ${RMB(c.launchCost)}）</option>`)
    .join('');
  if (currentYear <= 2016) {
    el.marketingFocus.value = 'balanced';
    el.campaignLevel.value = 'low';
  } else {
    el.marketingFocus.value = 'balanced';
    el.campaignLevel.value = 'medium';
  }
  if (el.modelBaseName) el.modelBaseName.value = FIXED_MODEL_BASE_NAME;
  updateStartupDifficultyStyle();
  updateModelNameHint();
  refreshBatteryCapacityInputRange();
}

function refreshBatteryCapacityInputRange() {
  if (!el.battery) return;
  const maxCap = getBatteryCapacityMax(state.historicalYear);
  el.battery.min = '1500';
  el.battery.max = String(maxCap);
  const current = Number(el.battery.value);
  if (Number.isFinite(current) && current > maxCap) {
    el.battery.value = String(maxCap);
  }
}

function refreshExtrasSelectableOptions() {
  if (!el.extras) return;
  const checked = new Set(
    [...el.extras.querySelectorAll('input:checked')]
      .map((i) => i.value)
  );
  const y = Number(state.historicalYear || HISTORICAL_START_YEAR);
  const needsDualCellForFastDual = y >= 2016 && y <= 2019;
  const effectiveDispMatKey = getDisplayMaterialKeyForEra(el.dispMat ? el.dispMat.value : 'lcd', y);
  const underDisplayFingerprintAllowed = ['oled', 'dual_oled', 'foldable'].includes(effectiveDispMatKey);
  const dualCellChecked = checked.has('dual_cell');
  const fast120Checked = checked.has('fast120');
  const fastDualChecked = checked.has('fast_dual');
  const visibleExtras = extras.filter((x) => x.available !== false);
  const selectedVisibleCount = visibleExtras.reduce((n, x) => n + (checked.has(x.id) ? 1 : 0), 0);
  el.extras.innerHTML = visibleExtras.map((x) => {
    const blockedByDualCell = x.id === 'fast_dual' && needsDualCellForFastDual && !dualCellChecked;
    const blockedByDisplay = x.id === 'fingerprint' && y >= 2017 && !underDisplayFingerprintAllowed;
    const blockedByMutual =
      (x.id === 'fast_dual' && fast120Checked)
      || (x.id === 'fast120' && fastDualChecked);
    const blocked = blockedByDualCell || blockedByMutual || blockedByDisplay;
    const checkedAttr = checked.has(x.id) && !blocked ? 'checked' : '';
    const disabledAttr = blocked ? 'disabled' : '';
    const note = blockedByDualCell
      ? '｜需先选择“双电芯电池方案”'
      : blockedByDisplay
        ? '｜2017年后仅 OLED/双层OLED/折叠屏可选'
      : blockedByMutual
        ? '｜与另一条超级快充路径二选一'
        : '';
    return `<label><input type="checkbox" value="${x.id}" ${checkedAttr} ${disabledAttr} /> ${x.name}（+${RMB(x.cost)}，+${x.weight}g）${note}</label>`;
  }).join('');
  if (el.extrasCount) {
    el.extrasCount.textContent = `已选 ${selectedVisibleCount} 项`;
  }
  enforceLegacyMultiCamGate();
}

function enforceLegacyMultiCamGate() {
  const y = Number(state.historicalYear || HISTORICAL_START_YEAR);
  const needsModuleGate = y < 2017;
  const moduleChecked = Boolean(el.extras && el.extras.querySelector('input[value="multi_cam_module"]:checked'));
  const lockRearAux = needsModuleGate && !moduleChecked;
  [el.camUltra, el.camMono, el.camTele].forEach((sel) => {
    if (!sel) return;
    if (lockRearAux) {
      sel.value = 'none';
      sel.disabled = true;
      sel.title = '2017年前需先勾选“多摄模组”';
    } else {
      sel.disabled = false;
      sel.title = '';
    }
  });
}

function refreshTechSelectableOptions() {
  const activeSocs = socs
    .filter((s) => !s.retired)
    .slice()
    .sort((a, b) => (Number(a.cost || 0) - Number(b.cost || 0)) || (Number(a.score || 0) - Number(b.score || 0)));
  const currentSoc = el.soc ? normalizeSocId(el.soc.value) : '';
  if (el.soc) {
    el.soc.innerHTML = activeSocs
      .map((s) => `<option value="${s.id}">${s.name}（${s.tier}，估价 ${RMB(s.cost)}）</option>`)
      .join('');
    const fallbackSoc = activeSocs.some((s) => s.id === 'dim7300') ? 'dim7300' : (activeSocs[0]?.id || '');
    el.soc.value = activeSocs.some((s) => s.id === currentSoc) ? currentSoc : fallbackSoc;
  }

  const activeCameras = cameraModules
    .filter((x) => !x.retired)
    .slice()
    .sort((a, b) => (Number(a.cost || 0) - Number(b.cost || 0)) || (Number(a.score || 0) - Number(b.score || 0)));
  const currentMain = el.camMain ? el.camMain.value : '';
  const currentUltra = el.camUltra ? el.camUltra.value : '';
  const currentMono = el.camMono ? el.camMono.value : '';
  const currentTele = el.camTele ? el.camTele.value : '';
  const currentFront = el.camFront ? el.camFront.value : '';
  const hasCam = (id) => activeCameras.some((x) => x.id === id);
  const cameraOpt = activeCameras.map((x) => `<option value="${x.id}">${x.name}${x.cost ? `（${RMB(x.cost)}）` : ''}</option>`).join('');

  if (el.camMain) {
    el.camMain.innerHTML = cameraOpt;
    el.camMain.value = hasCam(currentMain) ? currentMain : (hasCam('ov50h') ? 'ov50h' : (activeCameras[0]?.id || 'none'));
  }
  if (el.camUltra) {
    el.camUltra.innerHTML = cameraOpt;
    el.camUltra.value = hasCam(currentUltra) ? currentUltra : (hasCam('uw_50') ? 'uw_50' : 'none');
  }
  if (el.camMono) {
    el.camMono.innerHTML = cameraOpt;
    el.camMono.value = hasCam(currentMono) ? currentMono : 'none';
  }
  if (el.camTele) {
    el.camTele.innerHTML = cameraOpt;
    el.camTele.value = hasCam(currentTele) ? currentTele : 'none';
  }
  if (el.camFront) {
    el.camFront.innerHTML = cameraOpt;
    el.camFront.value = hasCam(currentFront) ? currentFront : (hasCam('front_32') ? 'front_32' : 'none');
  }
  enforceLegacyMultiCamGate();
}

function estimateSocBenchmarkByScore(score) {
  // Keep growing with tech cycles: no fixed ceiling for benchmark anchors.
  const techRound = Math.max(0, Number(state.techCycle || 0));
  const dynamicScoreCap = 130 + techRound * 9;
  const s = clamp(Number(score || 0), 20, dynamicScoreCap) / 100;
  const antutu10 = Math.round(120_000 + Math.pow(s, 2.4) * 3_850_000);
  const geekbench6Single = Math.round(320 + Math.pow(s, 2.1) * 3_500);
  const geekbench6Multi = Math.round(1_150 + Math.pow(s, 2.05) * 10_600);
  return { antutu10, geekbench6Single, geekbench6Multi, inferred: true };
}

function normalizeSocTierByScore(soc) {
  const sc = Number(soc.score || 0);
  if (sc >= 96) return '旗舰+';
  if (sc >= 89) return '旗舰';
  if (sc >= 81) return '次旗舰';
  if (sc >= 72) return '中高端';
  if (sc >= 59) return '中端';
  if (sc >= 48) return '中低端';
  if (sc >= 34) return '入门';
  return '入门(老款)';
}

function evolveExistingSocPool() {
  let retiredThisRound = 0;
  socs.forEach((soc) => {
    if (soc.retired) return;
    // First tech refresh: all explicitly labeled "老款" leave the catalog.
    if ((state.techCycle || 0) === 1 && String(soc.tier || '').includes('老款')) {
      soc.retired = true;
      retiredThisRound += 1;
      return;
    }
    soc.age = (soc.age || 0) + 1;
    soc.cost = Math.max(62, Math.round(soc.cost * 0.93));
    soc.score = Math.max(18, Number((soc.score * 0.985).toFixed(1)));
    soc.tier = normalizeSocTierByScore(soc);
    soc.risk = clamp((soc.risk || 1) * 0.985, 0.68, 1.5);
    // Hard lifespan cap: a SoC should not survive more than 4 refresh rounds.
    if ((soc.age || 0) >= 4) {
      soc.retired = true;
      retiredThisRound += 1;
      return;
    }
    // Speed up obsolescence so older platforms leave the market sooner.
    if ((soc.age || 0) >= 2 && soc.score <= 38) {
      soc.retired = true;
      retiredThisRound += 1;
      return;
    }
    if ((soc.age || 0) >= 3 && soc.score <= 50) {
      soc.retired = true;
      retiredThisRound += 1;
      return;
    }
    if ((soc.age || 0) >= 3 && soc.score <= 62 && String(soc.tier || '').includes('入门')) {
      soc.retired = true;
      retiredThisRound += 1;
    }
  });
  // Ensure each refresh round retires enough old chips to keep the list clean.
  const activeAfter = socs.filter((s) => !s.retired).length;
  const minRetireTarget = activeAfter >= 22 ? 3 : 2;
  while (retiredThisRound < minRetireTarget) {
    const candidate = socs
      .filter((s) => !s.retired && (s.age || 0) >= 2)
      .sort((a, b) => {
        const ageGap = Number(b.age || 0) - Number(a.age || 0);
        if (ageGap !== 0) return ageGap;
        const scoreGap = Number(a.score || 0) - Number(b.score || 0);
        if (scoreGap !== 0) return scoreGap;
        return Number(a.cost || 0) - Number(b.cost || 0);
      })[0];
    if (!candidate) break;
    candidate.retired = true;
    retiredThisRound += 1;
  }
  return retiredThisRound;
}

function pickSpreadCandidates(list, count) {
  if (!Array.isArray(list) || !list.length || count <= 0) return [];
  if (count >= list.length) return [...list];
  if (count === 1) return [list[Math.floor(list.length / 2)]];
  const picked = [];
  const used = new Set();
  for (let i = 0; i < count; i += 1) {
    const idx = Math.round((i * (list.length - 1)) / (count - 1));
    if (used.has(idx)) continue;
    used.add(idx);
    picked.push(list[idx]);
  }
  // fill if rounding produced duplicates
  for (let i = 0; picked.length < count && i < list.length; i += 1) {
    if (used.has(i)) continue;
    used.add(i);
    picked.push(list[i]);
  }
  return picked;
}

function addNewGenerationSoc(addQuota = 3) {
  const cycle = Math.max(1, state.techCycle || 1);
  const quota = clamp(Number(addQuota || 0), 0, 6);
  if (quota <= 0) return 0;
  const active = socs.filter((s) => !s.retired);
  const topScore = active.length ? Math.max(...active.map((s) => Number(s.score || 0))) : 98;
  const topCost = active.length ? Math.max(...active.map((s) => Number(s.cost || 0))) : 1380;
  const midScore = active.length ? active.reduce((a, b) => a + Number(b.score || 0), 0) / active.length : 64;
  const lowScore = active.length ? Math.min(...active.map((s) => Number(s.score || 0))) : 30;
  const lowCost = active.length ? Math.min(...active.map((s) => Number(s.cost || 0))) : 95;
  const yearMark = 2026 + cycle;

  const socCandidates = [
    {
      id: `gx_${cycle}`,
      name: `Helioo Gx${cycle}`,
      tier: '入门',
      score: Math.round(clamp(lowScore + 6 + cycle * 0.3, 30, 48)),
      cost: Math.round(clamp(lowCost * 1.06, 88, 260)),
      risk: clamp(0.88 + cycle * 0.006, 0.84, 1.06),
      age: 0
    },
    {
      id: `s6neo_${cycle}`,
      name: `SnapDrake 6 Neo Gen${cycle + 4}`,
      tier: '中端',
      score: Math.round(Math.max(60, midScore + 3)),
      cost: Math.round(topCost * 0.48),
      risk: clamp(1.0 + cycle * 0.007, 0.96, 1.22),
      age: 0
    },
    {
      id: `s7neo_${cycle}`,
      name: `SnapDrake 7 Neo Gen${cycle + 3}`,
      tier: '中高端',
      score: Math.round(Math.max(66, midScore + 8)),
      cost: Math.round(topCost * 0.62),
      risk: clamp(1.08 + cycle * 0.008, 1.0, 1.3),
      age: 0
    },
    {
      id: `s8neo_${cycle}`,
      name: `SnapDrake 8 Neo Gen${cycle + 2}`,
      tier: '次旗舰',
      score: Math.round(topScore + 2),
      cost: Math.round(topCost * 0.86),
      risk: clamp(1.2 + cycle * 0.009, 1.1, 1.42),
      age: 0
    },
    {
      id: `dimx_${cycle}`,
      name: `MedaTek DimeCity X${yearMark}`,
      tier: '旗舰',
      score: Math.round(topScore + 5),
      cost: Math.round(topCost * 1.07),
      risk: clamp(1.26 + cycle * 0.01, 1.2, 1.48),
      age: 0
    },
    {
      id: `s8elite_x${cycle}`,
      name: `SnapDrake 8 El1te X${cycle}`,
      tier: '旗舰+',
      score: Math.round(topScore + 8),
      cost: Math.round(topCost * 1.11),
      risk: clamp(1.32 + cycle * 0.01, 1.25, 1.55),
      age: 0
    }
  ];

  const selected = pickSpreadCandidates(socCandidates, quota);
  let added = 0;
  selected.forEach((soc) => {
    if (socs.some((x) => x.id === soc.id)) return;
    socs.push(soc);
    socBenchmarkAnchors[soc.id] = estimateSocBenchmarkByScore(soc.score);
    dynamicSocThermalMap[soc.id] = clamp(0.72 + (soc.score / 100) * 0.9 + (soc.tier.includes('旗舰') ? 0.1 : 0), 0.76, 1.75);
    added += 1;
  });
  return added;
}

function evolveExistingCameraPool() {
  let retiredThisRound = 0;
  cameraModules.forEach((cam) => {
    if (cam.retired || cam.id === 'none') return;
    cam.age = (cam.age || 0) + 1;
    cam.cost = Math.max(14, Math.round(cam.cost * 0.95));
    cam.score = Math.max(4, Number((cam.score * 0.985).toFixed(1)));
    // Sensors also iterate faster now; low-end and aging modules retire earlier.
    if ((cam.age || 0) >= 4 && cam.cost <= 52) {
      cam.retired = true;
      retiredThisRound += 1;
      return;
    }
    if ((cam.age || 0) >= 6 && cam.score <= 16) {
      cam.retired = true;
      retiredThisRound += 1;
    }
  });
  // Keep cadence: if no sensor retired naturally, retire one aging low-end module.
  if (retiredThisRound === 0) {
    const candidate = cameraModules
      .filter((c) => !c.retired && c.id !== 'none' && (c.age || 0) >= 3)
      .sort((a, b) => (Number(a.score || 0) - Number(b.score || 0)) || (Number(a.cost || 0) - Number(b.cost || 0)))[0];
    if (candidate) candidate.retired = true;
    retiredThisRound += candidate ? 1 : 0;
  }
  return retiredThisRound;
}

function addNewGenerationCamera(addQuota = 3) {
  const cycle = Math.max(1, state.techCycle || 1);
  const quota = clamp(Number(addQuota || 0), 0, 6);
  if (quota <= 0) return 0;
  const activeMain = cameraModules.filter((x) => !x.retired && x.type === 'main');
  const topMain = activeMain.length ? activeMain.reduce((a, b) => (a.score > b.score ? a : b)) : { score: 53, cost: 238 };
  const midMain = activeMain.length ? activeMain[Math.floor(activeMain.length / 2)] : { score: 33, cost: 105 };

  const candidates = [
    {
      id: `main_lite_${cycle}`,
      name: `LiteCam ${cycle} 入门主摄`,
      cost: Math.round(clamp(midMain.cost * 0.78, 36, 160)),
      weight: 8.6,
      score: Math.round(clamp(midMain.score - 4, 16, 42)),
      type: 'main',
      volume: 2.1,
      age: 0
    },
    {
      id: `ovx_${cycle}`,
      name: `OVX${cycle} 50MP 新主摄`,
      cost: Math.round(midMain.cost * 1.1),
      weight: 12.8,
      score: Math.round(midMain.score + 5),
      type: 'main',
      volume: 3.2,
      age: 0
    },
    {
      id: `lytx_${cycle}`,
      name: `1英寸 LYT-X${cycle} 旗舰主摄`,
      cost: Math.round(topMain.cost * 1.12),
      weight: 22.5,
      score: Math.round(topMain.score + 4),
      type: 'main',
      volume: 5.4,
      age: 0
    },
    {
      id: `front_x${cycle}`,
      name: `${36 + cycle * 2}MP 前摄模组`,
      cost: Math.round(38 + cycle * 4),
      weight: 5.2,
      score: Math.round(12 + cycle * 1.2),
      type: 'front',
      volume: 0.75,
      age: 0
    },
    {
      id: `front_g1sq_x${cycle}`,
      name: `G${cycle + 1} 正方形前摄传感器`,
      cost: Math.round(40 + cycle * 5),
      weight: 5.3,
      score: Math.round(13 + cycle * 1.6),
      type: 'front',
      volume: 0.78,
      age: 0
    },
    {
      id: `uwx_${cycle}`,
      name: `UWX${cycle} 超广角模组`,
      cost: Math.round(clamp(midMain.cost * 0.72, 48, 150)),
      weight: 8.4,
      score: Math.round(clamp(midMain.score - 3, 18, 36)),
      type: 'ultra',
      volume: 1.9,
      age: 0
    }
  ];

  const selected = pickSpreadCandidates(candidates, quota);
  // Ensure flagship camera cadence doesn't lag behind SoC cadence.
  // For quota >= 2, force one current-gen flagship main sensor into the batch.
  if (quota >= 2) {
    const flagship = candidates.find((x) => x.id === `lytx_${cycle}`);
    if (flagship && !selected.some((x) => x.id === flagship.id)) {
      const replaceIdx = selected.findIndex((x) => x.id.startsWith('main_lite_') || x.id.startsWith('front_') || x.id.startsWith('uwx_'));
      if (replaceIdx >= 0) selected[replaceIdx] = flagship;
      else selected[0] = flagship;
    }
  }
  let added = 0;
  selected.forEach((cam) => {
    if (cameraModules.some((x) => x.id === cam.id)) return;
    cameraModules.push(cam);
    added += 1;
  });

  dynamicMainCamThermalMap[`lytx_${cycle}`] = 0.52;
  dynamicMainCamThermalMap[`ovx_${cycle}`] = 0.29;
  return added;
}

function formatRomCapacityLabel(capGb) {
  const n = Number(capGb || 0);
  if (n >= 1024) {
    const tb = n / 1024;
    const txt = Number.isInteger(tb) ? String(tb) : tb.toFixed(2).replace(/\.?0+$/, '');
    return `${txt}TB`;
  }
  return `${Math.round(n)}GB`;
}

function evolveMemoryPools() {
  // Safety guard: memory evolution is replacement-only; keep option counts stable.
  if (ramOptions.length !== baseRamOptions.length) {
    ramOptions.splice(0, ramOptions.length, ...JSON.parse(JSON.stringify(baseRamOptions)));
  }
  if (romOptions.length !== baseRomOptions.length) {
    romOptions.splice(0, romOptions.length, ...JSON.parse(JSON.stringify(baseRomOptions)));
  }
  const cycle = Math.max(0, Number(state.memoryCycle || 0));
  const ramTechByCycleLow = ['LPDDR4X', 'LPDDR5', 'LPDDR5X', 'LPDDR6', 'LPDDR6X', 'LPDDR7'];
  const ramTechByCycleHigh = ['LPDDR5X', 'LPDDR6', 'LPDDR6X', 'LPDDR7', 'LPDDR7X'];
  const romTechSeq = ['eMMC', 'UFS 2.2', 'UFS 3.1', 'UFS 4.0', 'UFS 4.1', 'UFS 5.0'];
  const romBaseTechIndex = {
    '64_emmc': 0,
    '128_ufs22': 1,
    '256_ufs31': 2,
    '512_ufs40': 3,
    '1t_ufs40': 3
  };

  ramOptions.forEach((opt) => {
    const base = baseRamOptions.find((x) => x.id === opt.id) || opt;
    const baseCap = Number(baseRamCapById[opt.id] || getRamCapacityGb(base) || 0);
    const cap = baseCap + cycle * 4;
    const isLowTier = String(opt.id || '').includes('lp4x');
    const techPool = isLowTier ? ramTechByCycleLow : ramTechByCycleHigh;
    const tech = techPool[Math.min(cycle, techPool.length - 1)];
    opt.capacityGb = cap;
    opt.name = `${cap}GB ${tech}`;
    opt.cost = Math.round(Number(base.cost || 0) * (1 + cycle * 0.06) + cycle * 14 + Math.max(0, (cap - baseCap)) * 2.6);
    opt.score = Math.round(Number(base.score || 0) + cycle * 3 + Math.max(0, (cap - baseCap)) * 0.35);
  });

  romOptions.forEach((opt) => {
    const base = baseRomOptions.find((x) => x.id === opt.id) || opt;
    const baseCap = Number(baseRomCapById[opt.id] || getRomCapacityGb(base) || 0);
    const cap = baseCap + cycle * 16;
    const baseIo = baseRomSpeedById[opt.id] || { read: 2100, write: 1200 };
    const baseTechIdx = Number(romBaseTechIndex[opt.id] || 2);
    const tech = romTechSeq[Math.min(baseTechIdx + cycle, romTechSeq.length - 1)];
    opt.capacityGb = cap;
    opt.name = `${formatRomCapacityLabel(cap)} ${tech}`;
    opt.cost = Math.round(Number(base.cost || 0) * (1 + cycle * 0.055) + cycle * 22 + Math.max(0, (cap - baseCap)) * 0.35);
    opt.read = Math.round(baseIo.read * Math.pow(1.11, cycle));
    opt.write = Math.round(baseIo.write * Math.pow(1.115, cycle));
    opt.score = Math.round(Number(base.score || 0) + cycle * 3.4 + Math.max(0, (cap - baseCap)) * 0.03);
  });
}

function getHistoricalRamTechByYear(year, idx) {
  if (year <= 2015) {
    const arr = ['LPDDR2', 'LPDDR2', 'LPDDR3', 'LPDDR3', 'LPDDR3', 'LPDDR3', 'LPDDR3'];
    return arr[idx] || 'LPDDR3';
  }
  if (year <= 2017) {
    const arr = ['LPDDR2', 'LPDDR3', 'LPDDR3', 'LPDDR3', 'LPDDR4', 'LPDDR4', 'LPDDR4'];
    return arr[idx] || 'LPDDR4';
  }
  if (year <= 2019) {
    const arr = ['LPDDR3', 'LPDDR3', 'LPDDR4', 'LPDDR4', 'LPDDR4X', 'LPDDR4X', 'LPDDR4X'];
    return arr[idx] || 'LPDDR4X';
  }
  if (year <= 2021) {
    const arr = ['LPDDR3', 'LPDDR4', 'LPDDR4X', 'LPDDR4X', 'LPDDR4X', 'LPDDR5', 'LPDDR5'];
    return arr[idx] || 'LPDDR5';
  }
  const arr = ['LPDDR4X', 'LPDDR4X', 'LPDDR5', 'LPDDR5', 'LPDDR5X', 'LPDDR5X', 'LPDDR5X'];
  return arr[idx] || 'LPDDR5X';
}

function getHistoricalRomTechByYear(year, idx) {
  if (year <= 2015) {
    const arr = ['eMMC 4.5', 'eMMC 5.0', 'eMMC 5.0', 'eMMC 5.1', 'eMMC 5.1'];
    return arr[idx] || 'eMMC 5.1';
  }
  if (year <= 2017) {
    const arr = ['eMMC 5.0', 'eMMC 5.1', 'eMMC 5.1', 'UFS 2.0', 'UFS 2.0'];
    return arr[idx] || 'UFS 2.0';
  }
  if (year <= 2019) {
    const arr = ['eMMC 5.1', 'eMMC 5.1', 'UFS 2.1', 'UFS 2.1', 'UFS 2.1'];
    return arr[idx] || 'UFS 2.1';
  }
  if (year <= 2021) {
    const arr = ['eMMC 5.1', 'UFS 2.1', 'UFS 2.2', 'UFS 3.0', 'UFS 3.1'];
    return arr[idx] || 'UFS 3.1';
  }
  const arr = ['eMMC 5.1', 'UFS 2.2', 'UFS 3.1', 'UFS 4.0', 'UFS 4.0'];
  return arr[idx] || 'UFS 4.0';
}

function roundRamCapacityForEra(capGb) {
  const v = Number(capGb || 0);
  if (v <= 4) return Math.round(v * 2) / 2;
  return Math.max(1, Math.round(v));
}

function roundRomCapacityForEra(capGb) {
  const v = Number(capGb || 0);
  if (v <= 16) return Math.max(4, Math.round(v / 4) * 4);
  if (v <= 64) return Math.round(v / 8) * 8;
  if (v <= 256) return Math.round(v / 16) * 16;
  if (v <= 512) return Math.round(v / 32) * 32;
  return Math.round(v / 64) * 64;
}

function applyHistoricalMemoryPoolsByYear(yearLike) {
  const y = clamp(Number(yearLike || HISTORICAL_START_YEAR), HISTORICAL_START_YEAR, HISTORICAL_HANDOFF_YEAR);
  if (y >= HISTORICAL_HANDOFF_YEAR) {
    ramOptions.splice(0, ramOptions.length, ...JSON.parse(JSON.stringify(baseRamOptions)));
    romOptions.splice(0, romOptions.length, ...JSON.parse(JSON.stringify(baseRomOptions)));
    return;
  }
  const t = clamp((y - HISTORICAL_START_YEAR) / (HISTORICAL_HANDOFF_YEAR - HISTORICAL_START_YEAR), 0, 1);
  const ramCostMul = 0.34 + t * 0.66;
  const ramScoreMul = 0.36 + t * 0.64;
  const romCostMul = 0.36 + t * 0.64;
  const romScoreMul = 0.34 + t * 0.66;

  ramOptions.forEach((opt, idx) => {
    const base = baseRamOptions[idx] || opt;
    const startCap = Number(historicalRamStartCaps[idx] || 1);
    const baseCap = Number(baseRamCapById[base.id] || getRamCapacityGb(base) || startCap);
    const cap = roundRamCapacityForEra(startCap + (baseCap - startCap) * t);
    const tech = getHistoricalRamTechByYear(y, idx);
    opt.capacityGb = cap;
    opt.name = `${formatRamCapacityLabel(cap)} ${tech}`;
    opt.cost = Math.max(10, Math.round(Number(base.cost || 0) * ramCostMul + Math.max(0, cap - startCap) * 2.2));
    opt.score = Math.max(1, Math.round(Number(base.score || 0) * ramScoreMul + Math.max(0, cap - startCap) * 0.28));
  });

  romOptions.forEach((opt, idx) => {
    const base = baseRomOptions[idx] || opt;
    const startCap = Number(historicalRomStartCaps[idx] || 16);
    const startIo = historicalRomStartIo[idx] || { read: 320, write: 150 };
    const baseCap = Number(baseRomCapById[base.id] || getRomCapacityGb(base) || startCap);
    const baseIo = baseRomSpeedById[base.id] || { read: 2100, write: 1200 };
    const cap = roundRomCapacityForEra(startCap + (baseCap - startCap) * t);
    const tech = getHistoricalRomTechByYear(y, idx);
    const read = Math.round(startIo.read + (baseIo.read - startIo.read) * t);
    const write = Math.round(startIo.write + (baseIo.write - startIo.write) * t);
    opt.capacityGb = cap;
    opt.name = `${formatRomCapacityLabel(cap)} ${tech}`;
    opt.cost = Math.max(10, Math.round(Number(base.cost || 0) * romCostMul + Math.max(0, cap - startCap) * 0.22));
    opt.read = read;
    opt.write = write;
    opt.score = Math.max(1, Math.round(Number(base.score || 0) * romScoreMul + (read / Math.max(1, baseIo.read)) * 0.8));
  });
}

function getHistoricalEraCostFactor(yearLike) {
  const year = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  if (year >= HISTORICAL_HANDOFF_YEAR) return 1.0;
  const t = clamp((year - HISTORICAL_START_YEAR) / (HISTORICAL_HANDOFF_YEAR - HISTORICAL_START_YEAR), 0, 1);
  return Number((0.56 + t * 0.44).toFixed(4));
}

function getBatteryEnergyDensityByYear(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  // 2021 年及之后：接近当前（2025）方案。
  if (y >= 2021) {
    let density = 655;
    // 进入架空未来后：每12个月/每代新机，电池体积需求再降 1%（同容量更省空间）。
    if (y >= HISTORICAL_HANDOFF_YEAR) {
      const cyc = Math.max(0, Number(state.batteryFutureCycle || 0));
      density *= Math.pow(1 / 0.99, cyc);
    }
    return density;
  }
  // 2021 年之前：能量密度更低，电池体积需求更大。
  // 2014 -> 2020 由低到高平滑过渡。
  const t = clamp((y - HISTORICAL_START_YEAR) / (2020 - HISTORICAL_START_YEAR), 0, 1);
  return Number((505 + t * (615 - 505)).toFixed(2));
}

function getBatteryCapacityMax(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  const baseMax = 10500;
  if (y < HISTORICAL_HANDOFF_YEAR) return baseMax;
  const cyc = Math.max(0, Number(state.batteryFutureCycle || 0));
  return baseMax + cyc * 500;
}

function isExtraAvailableAtYear(extraId, yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  const rule = EXTRA_TIMELINE_RULES[extraId];
  if (!rule) return true;
  const unlockYear = Number(rule.unlockYear || HISTORICAL_START_YEAR);
  const retireYear = Number(rule.retireYear || 9999);
  return y >= unlockYear && y <= retireYear;
}

function getExtraHistoricalCost(extraBaseLike, yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  const baseCost = Number(extraBaseLike && extraBaseLike.cost || 0);
  const id = String(extraBaseLike && extraBaseLike.id || '');
  const rule = EXTRA_TIMELINE_RULES[id];
  if (!rule) return baseCost;
  if (id === 'dual_cell') {
    const unlockYear = Number(rule.unlockYear || 2016);
    const retireYear = Number(rule.retireYear || 2019);
    const launchCost = Number(rule.launchCost || baseCost);
    const retireCost = Number(rule.retireCost || baseCost);
    if (y <= unlockYear) return launchCost;
    if (y >= retireYear) return retireCost;
    const t = clamp((y - unlockYear) / Math.max(1, retireYear - unlockYear), 0, 1);
    return Math.round(launchCost + (retireCost - launchCost) * t);
  }
  if (id === 'screen_insurance') {
    const unlockYear = Number(rule.unlockYear || 2014);
    const launchCost = Number(rule.launchCost || baseCost);
    if (y <= unlockYear) return launchCost;
    if (y >= HISTORICAL_HANDOFF_YEAR) return baseCost;
    const t = clamp((y - unlockYear) / Math.max(1, HISTORICAL_HANDOFF_YEAR - unlockYear), 0, 1);
    return Math.round(launchCost + (baseCost - launchCost) * t);
  }
  if (id === 'multi_cam_module') {
    const unlockYear = Number(rule.unlockYear || 2014);
    const retireYear = Number(rule.retireYear || 2017);
    const launchCost = Number(rule.launchCost || baseCost);
    const retireCost = Number(rule.retireCost || baseCost);
    if (y <= unlockYear) return launchCost;
    if (y >= retireYear) return retireCost;
    const t = clamp((y - unlockYear) / Math.max(1, retireYear - unlockYear), 0, 1);
    return Math.round(launchCost + (retireCost - launchCost) * t);
  }
  if (id === 'satellite') {
    const unlockYear = Number(rule.unlockYear || 2021);
    const launchCost = Number(rule.launchCost || baseCost);
    if (y < unlockYear) return launchCost;
    if (y >= HISTORICAL_HANDOFF_YEAR) return baseCost;
    const t = clamp((y - unlockYear) / Math.max(1, HISTORICAL_HANDOFF_YEAR - unlockYear), 0, 1);
    return Math.round(launchCost + (baseCost - launchCost) * t);
  }
  return baseCost;
}

function getSuperFastChargePowerByYearAndCycle(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  if (y < 2018) return 120;
  if (y < HISTORICAL_HANDOFF_YEAR) return 120;
  const cyc = Math.max(0, Number(state.fastChargeFutureCycle || 0));
  return Math.min(360, 120 + cyc * 5);
}

function getEarlyFastChargePower(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  if (y < 2014 || y > 2017) return 33;
  const t = clamp((y - 2014) / 3, 0, 1);
  return Math.round(18 + t * (33 - 18));
}

function getDualCellFastChargePower(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  if (y < 2016 || y > 2019) return 90;
  return Math.round(45 + (y - 2016) * 15);
}

function applyHistoricalExtrasByYear(yearLike) {
  const y = Number(yearLike || HISTORICAL_START_YEAR);
  extras.forEach((x) => {
    const base = baseExtras.find((b) => b.id === x.id) || x;
    x.available = isExtraAvailableAtYear(x.id, y);
    x.name = String(base.name || x.name);
    x.weight = Number(base.weight || x.weight || 0);
    x.space = Number(base.space || x.space || 0);
    x.score = Number(base.score || x.score || 0);
    x.demand = Number(base.demand || x.demand || 0);
    x.onlineDemandMul = Number(base.onlineDemandMul || 1);
    x.offlineDemandMul = Number(base.offlineDemandMul || 1);
    x.powerRel = Number(base.powerRel || 0);
    x.thermalMul = Number(base.thermalMul || 1);
    if (y < HISTORICAL_HANDOFF_YEAR) {
      x.cost = getExtraHistoricalCost(base, y);
    } else {
      x.cost = Number(base.cost || x.cost || 0);
    }
    if (x.id === 'typec_port') {
      // 2015-2017: Type-C 初期导入，成本与热度溢价会快速回落到下限。
      const legacy = y >= 2015 && y <= 2017;
      x.name = 'Type-C 接口';
      if (legacy) {
        const t = clamp((y - 2015) / 2, 0, 1); // 2015->0, 2017->1
        const launchCost = 68;
        const floorCost = 24;
        const onlineBoostStart = 1.12;
        const onlineBoostFloor = 1.05;
        x.cost = Math.round(launchCost + (floorCost - launchCost) * t);
        x.onlineDemandMul = Number((onlineBoostStart + (onlineBoostFloor - onlineBoostStart) * t).toFixed(4));
      }
    }
    if (x.id === 'ext_5g') {
      // 2019-2022: 外挂 5G，高成本、对散热/续航有负担，市场热度红利逐年衰减。
      const startYear = 2019;
      const endYear = 2022;
      const t = clamp((y - startYear) / Math.max(1, endYear - startYear), 0, 1);
      const launchCost = 220;
      const floorCost = 150;
      x.name = '外挂 5G';
      x.cost = Math.round(launchCost + (floorCost - launchCost) * t);
      x.weight = 0;
      x.space = 0;
      x.score = 2;
      x.demand = 0.006;
      // 热度影响：线上大幅、线下小幅；2019->2022 线性减小到下限。
      x.onlineDemandMul = Number((1.18 + (1.06 - 1.18) * t).toFixed(4));
      x.offlineDemandMul = Number((1.05 + (1.02 - 1.05) * t).toFixed(4));
      // 性能副作用：热压较大、续航有一定影响（同样逐年减小）。
      x.thermalMul = Number((1.18 + (1.08 - 1.18) * t).toFixed(4));
      x.powerRel = Number((0.085 + (0.045 - 0.085) * t).toFixed(4));
    }
    if (x.id === 'fingerprint') {
      if (y <= 2016) {
        x.name = '指纹识别';
        x.cost = 16;
        x.weight = 1.0;
        x.space = 0.42;
        x.score = 2;
        x.demand = 0.008;
      } else {
        x.name = '屏下指纹识别';
        x.cost = Number(base.cost || x.cost || 22);
        x.weight = Number(base.weight || x.weight || 1.2);
        x.space = Number(base.space || x.space || 0.35);
        x.score = Number(base.score || x.score || 2);
        x.demand = Number(base.demand || x.demand || 0.008);
      }
    }
    if (x.id === 'fast120') {
      const power = getSuperFastChargePowerByYearAndCycle(y);
      x.name = `${power}W 超级快充`;
      if (y >= 2018 && y < HISTORICAL_HANDOFF_YEAR) {
        // 2018 时高成本高占用高热度，逐年线性回归到 2025 初始参数。
        const t = clamp((y - 2018) / Math.max(1, HISTORICAL_HANDOFF_YEAR - 2018), 0, 1);
        const launchCost = 188;
        const launchWeight = 10.5;
        const launchSpace = 4.5;
        const launchScore = 5;
        const launchDemand = 0.065;
        x.cost = Math.round(launchCost + (Number(base.cost || 0) - launchCost) * t);
        x.weight = Number((launchWeight + (Number(base.weight || 0) - launchWeight) * t).toFixed(2));
        x.space = Number((launchSpace + (Number(base.space || 0) - launchSpace) * t).toFixed(3));
        x.score = Number((launchScore + (Number(base.score || 0) - launchScore) * t).toFixed(2));
        x.demand = Number((launchDemand + (Number(base.demand || 0) - launchDemand) * t).toFixed(4));
      } else {
        x.cost = Number(base.cost || x.cost || 0);
        x.weight = Number(base.weight || x.weight || 0);
        x.space = Number(base.space || x.space || 0);
        x.score = Number(base.score || x.score || 0);
        x.demand = Number(base.demand || x.demand || 0);
      }
    }
    if (x.id === 'fast_legacy') {
      const early = y >= 2014 && y <= 2017;
      const power = getEarlyFastChargePower(y);
      x.name = early ? `${power}W 快充` : String(base.name || x.name);
      x.cost = Number(base.cost || x.cost || 0);
      x.score = early ? (1.8 + (power - 18) / 15) : Number(base.score || x.score || 0);
      x.demand = early ? 0.024 : Number(base.demand || x.demand || 0);
    }
    if (x.id === 'multi_cam_module') {
      const legacy = y <= 2017;
      x.cost = legacy ? getExtraHistoricalCost(base, y) : Number(base.cost || x.cost || 0);
      x.weight = Number(base.weight || x.weight || 0);
      x.space = Number(base.space || x.space || 0);
      x.score = Number(base.score || x.score || 0);
      x.demand = Number(base.demand || x.demand || 0);
    }
    if (x.id === 'fast_dual') {
      const legacy = y >= 2016 && y <= 2019;
      const power = getDualCellFastChargePower(y);
      x.name = legacy ? `${power}W 双电芯超级快充` : String(base.name || x.name);
      // 保持低价、无额外体积/重量提升。
      x.cost = Number(base.cost || x.cost || 0);
      x.weight = Number(base.weight || 0);
      x.space = Number(base.space || 0);
      x.score = legacy ? Number((3 + (power - 45) / 30).toFixed(2)) : Number(base.score || x.score || 0);
      x.demand = legacy ? 0.068 : Number(base.demand || x.demand || 0);
    }
    if (x.id === 'vc') {
      const isHeatPipeEra = y < 2016;
      if (isHeatPipeEra) {
        x.name = '热管散热';
        // 价格与 VC 相近；体积占用显著更大。
        x.cost = Number(base.cost || x.cost || 0);
        x.space = Number((Number(base.space || x.space || 0) * 1.85).toFixed(3));
        // 热管时代在发烧友圈更容易形成讨论热度。
        x.demand = Math.max(Number(base.demand || 0), 0.026);
      }
    }
    if (x.id === 'flat_back') {
      const isDecoEra = y < 2018;
      if (isDecoEra) {
        x.name = '矩阵DECO';
        x.cost = Number((Number(base.cost || x.cost || 0) * 0.68).toFixed(0));
        x.weight = Number((Number(base.weight || x.weight || 0) * 0.65).toFixed(2));
        x.space = Number((Number(base.space || x.space || 0) * 0.62).toFixed(3));
      }
    }
    if (x.id === 'wireless_charge' && y >= 2015) {
      // 2015+ 无线充电逐代更紧凑：重量/体积随时间下降，并设置下限。
      const launchWeight = 7.2;
      const launchSpace = 2.9;
      const t = clamp((y - 2015) / Math.max(1, HISTORICAL_HANDOFF_YEAR - 2015), 0, 1);
      const targetWeight = launchWeight + (Number(base.weight || x.weight || 0) - launchWeight) * t;
      const targetSpace = launchSpace + (Number(base.space || x.space || 0) - launchSpace) * t;
      x.weight = Number(clamp(targetWeight, 2.2, launchWeight).toFixed(2));
      x.space = Number(clamp(targetSpace, 1.1, launchSpace).toFixed(3));
      x.cost = Number(base.cost || x.cost || 0);
    }
    if (x.id === 'nfc_uwb') {
      // 2014-2022: NFC；2023+（含架空未来）: UWB。重量/体积/需求保持一致，2023 起价格小幅上调。
      if (y <= 2022) {
        x.name = 'NFC';
        x.cost = 18;
      } else {
        x.name = 'UWB';
        x.cost = Number(base.cost || x.cost || 0);
      }
      x.weight = Number(base.weight || x.weight || 1);
      x.space = Number(base.space || x.space || 0.1);
      x.score = Number(base.score || x.score || 2);
      x.demand = Number(base.demand || x.demand || 0.004);
    }
    if (x.id === 'magsafe' && y >= 2020) {
      // 2020+ 磁吸生态逐年小幅减重/减占用（线性微调并设下限）。
      const years = y - 2020;
      const weightMul = clamp(1 - years * 0.008, 0.85, 1.0);
      const spaceMul = clamp(1 - years * 0.007, 0.84, 1.0);
      x.weight = Number((Number(base.weight || x.weight || 0) * weightMul).toFixed(2));
      x.space = Number((Number(base.space || x.space || 0) * spaceMul).toFixed(3));
      x.cost = Number(base.cost || x.cost || 0);
    }
  });
}

function getHistoricalWindowMinYear(year) {
  return Math.max(HISTORICAL_START_YEAR, Number(year || HISTORICAL_START_YEAR) - 3);
}

function buildHistoricalSocPool(year) {
  const y = Number(year || HISTORICAL_START_YEAR);
  const minYear = getHistoricalWindowMinYear(y);
  return historicalSocTimeline
    .filter((x) => x.year >= minYear && x.year <= y)
    .map((x) => ({ ...x, age: 0, retired: false }))
    .sort((a, b) => (Number(a.cost || 0) - Number(b.cost || 0)) || (Number(a.score || 0) - Number(b.score || 0)));
}

function buildHistoricalCameraPool(year) {
  const y = Number(year || HISTORICAL_START_YEAR);
  const minYear = getHistoricalWindowMinYear(y);
  const pool = historicalCameraTimeline
    .filter((x) => x.year >= minYear && x.year <= y)
    .map((x) => ({ ...x, age: 0, retired: false }))
    .sort((a, b) => (Number(a.cost || 0) - Number(b.cost || 0)) || (Number(a.score || 0) - Number(b.score || 0)));
  return [
    { id: 'none', name: '无', cost: 0, weight: 0, score: 0, type: 'none', volume: 0, age: 0, retired: false },
    ...pool
  ];
}

function restoreModernTechPoolsOnly() {
  socs.splice(0, socs.length, ...JSON.parse(JSON.stringify(baseSocs)));
  cameraModules.splice(0, cameraModules.length, ...JSON.parse(JSON.stringify(baseCameraModules)));
  ramOptions.splice(0, ramOptions.length, ...JSON.parse(JSON.stringify(baseRamOptions)));
  romOptions.splice(0, romOptions.length, ...JSON.parse(JSON.stringify(baseRomOptions)));
  Object.keys(dynamicSocThermalMap).forEach((k) => { delete dynamicSocThermalMap[k]; });
  Object.keys(dynamicMainCamThermalMap).forEach((k) => { delete dynamicMainCamThermalMap[k]; });
  Object.keys(socBenchmarkAnchors).forEach((k) => { delete socBenchmarkAnchors[k]; });
  Object.assign(socBenchmarkAnchors, JSON.parse(JSON.stringify(baseSocBenchmarkAnchors)));
}

function applyHistoricalTechPools(year) {
  const y = clamp(Number(year || HISTORICAL_START_YEAR), HISTORICAL_START_YEAR, HISTORICAL_HANDOFF_YEAR);
  if (y >= HISTORICAL_HANDOFF_YEAR) {
    restoreModernTechPoolsOnly();
    applyHistoricalMemoryPoolsByYear(y);
    return;
  }
  socs.splice(0, socs.length, ...buildHistoricalSocPool(y));
  cameraModules.splice(0, cameraModules.length, ...buildHistoricalCameraPool(y));
  applyHistoricalMemoryPoolsByYear(y);
  Object.keys(dynamicSocThermalMap).forEach((k) => { delete dynamicSocThermalMap[k]; });
  Object.keys(dynamicMainCamThermalMap).forEach((k) => { delete dynamicMainCamThermalMap[k]; });
  Object.keys(socBenchmarkAnchors).forEach((k) => { delete socBenchmarkAnchors[k]; });
  Object.assign(socBenchmarkAnchors, JSON.parse(JSON.stringify(baseSocBenchmarkAnchors)));
  socs.forEach((soc) => {
    if (!socBenchmarkAnchors[soc.id]) {
      socBenchmarkAnchors[soc.id] = estimateSocBenchmarkByScore(soc.score);
    }
    dynamicSocThermalMap[soc.id] = clamp(0.68 + (Number(soc.score || 0) / 100) * 0.82, 0.7, 1.55);
  });
  cameraModules.forEach((cam) => {
    if (cam.type === 'main' && cam.id !== 'none') {
      dynamicMainCamThermalMap[cam.id] = clamp(0.16 + (Number(cam.score || 0) / 100) * 0.48, 0.18, 0.58);
    }
  });
}

function maybeAdvanceHistoricalEra(trigger = 'time') {
  if (state.historicalYear >= HISTORICAL_HANDOFF_YEAR) return false;
  const nextGen = getNextGenerationIndex();
  const timeDue = (state.companyMonthsTotal - (state.historicalLastRefreshMonth || 0)) >= 12;
  // Historical era (2014-2024) advances strictly by 12-month cadence only.
  if (!timeDue) return false;

  const prevYear = Number(state.historicalYear || HISTORICAL_START_YEAR);
  const nextYear = Math.min(HISTORICAL_HANDOFF_YEAR, prevYear + 1);
  state.historicalYear = nextYear;
  state.historicalLastRefreshMonth = state.companyMonthsTotal;
  state.historicalLastRefreshGeneration = nextGen;

  applyHistoricalTechPools(nextYear);
  applyHistoricalExtrasByYear(nextYear);
  refreshTechSelectableOptions();
  refreshMemorySelectableOptions();
  refreshExtrasSelectableOptions();
  if (el.stageConfig && !el.stageConfig.classList.contains('hidden')) {
    refreshDesignPanelsLive();
  }

  if (nextYear >= HISTORICAL_HANDOFF_YEAR) {
    // Lock future-refresh baselines at handoff month so 2025 starts from aligned default values.
    state.batteryFutureCycle = Math.max(0, Number(state.batteryFutureCycle || 0));
    state.fastChargeFutureCycle = Math.max(0, Number(state.fastChargeFutureCycle || 0));
    state.lastBatteryRefreshMonth = state.companyMonthsTotal;
    state.lastBatteryRefreshGeneration = nextGen;
    state.lastFastChargeRefreshMonth = state.companyMonthsTotal;
    state.lastFastChargeRefreshGeneration = nextGen;
    if (!state.futureReachedNotified) {
      state.futureReachedNotified = true;
      addAchievementCard('future_reached', '你已达到未来', '时间线已进入 2025+ 架空未来阶段。');
      openGameModal(
        '成就解锁',
        '行业时间线推进到 <strong>2025</strong>。<br>恭喜达成 <strong>你已达到未来</strong> 成就！<br>你已进入架空历史阶段，标题旁将显示 <strong>无尽模式</strong>。',
        'celebrate'
      );
    } else {
      openGameModal(
        '时代推进',
        '行业时间线推进到 <strong>2025</strong>。<br>你已进入现代配置池阶段，后续将按既有机制继续向未来演化。'
      );
    }
    return true;
  }

  openGameModal(
    '历史阶段更新',
    `行业时间推进到 <strong>${nextYear}</strong> 年：主流 SoC 与传感器池已按时代更新。<br>本轮价格体系已完成同步，请重新检查配置与定价。`
  );
  return true;
}

function maybeRefreshMemoryPools(trigger = 'time') {
  if (state.historicalYear < HISTORICAL_HANDOFF_YEAR) return false;
  const nextGen = getNextGenerationIndex();
  const unlocked = nextGen >= 3 || state.companyMonthsTotal >= 30;
  if (!unlocked) return false;
  const timeDue = (state.companyMonthsTotal - (state.lastMemoryRefreshMonth || 0)) >= 24;
  const genDue = trigger === 'generation' && (nextGen - (state.lastMemoryRefreshGeneration || 1)) >= 2;
  if (!timeDue && !genDue) return false;
  state.memoryCycle = (state.memoryCycle || 0) + 1;
  evolveMemoryPools();
  refreshMemorySelectableOptions();
  if (el.stageConfig && !el.stageConfig.classList.contains('hidden')) {
    refreshDesignPanelsLive();
  }
  state.lastMemoryRefreshMonth = state.companyMonthsTotal;
  state.lastMemoryRefreshGeneration = nextGen;
  openGameModal(
    '存储代际更新',
    `存储供应链进入新周期：内存与存储规格整体迭代。<br>本次已更新（第 <strong>${state.memoryCycle}</strong> 轮），建议重新检查 SKU 组合与定价。`
  );
  return true;
}

function maybeRefreshDisplayScoreProgress(trigger = 'time') {
  if (state.historicalYear < HISTORICAL_HANDOFF_YEAR) return false;
  const nextGen = getNextGenerationIndex();
  const unlocked = nextGen >= 3 || state.companyMonthsTotal >= 30;
  if (!unlocked) return false;
  const timeDue = (state.companyMonthsTotal - (state.lastDisplayRefreshMonth || 0)) >= 24;
  const genDue = trigger === 'generation' && (nextGen - (state.lastDisplayRefreshGeneration || 1)) >= 2;
  if (!timeDue && !genDue) return false;
  state.displayCycle = (state.displayCycle || 0) + 1;
  Object.values(displayMaterials).forEach((mat) => {
    if (!mat) return;
    mat.baseCost = Math.max(0, Number(mat.baseCost || 0) + 5);
  });
  state.lastDisplayRefreshMonth = state.companyMonthsTotal;
  state.lastDisplayRefreshGeneration = nextGen;
  updateDisplayMaterialOptions();
  if (el.stageConfig && !el.stageConfig.classList.contains('hidden')) {
    refreshDesignPanelsLive();
  }
  return true;
}

function maybeRefreshExtraCosts(trigger = 'time') {
  if (state.historicalYear < HISTORICAL_HANDOFF_YEAR) return false;
  const nextGen = getNextGenerationIndex();
  const unlocked = nextGen >= 3 || state.companyMonthsTotal >= 30;
  if (!unlocked) return false;
  const timeDue = (state.companyMonthsTotal - (state.lastExtraRefreshMonth || 0)) >= 12;
  const genDue = trigger === 'generation' && nextGen > (state.lastExtraRefreshGeneration || 1);
  if (!timeDue && !genDue) return false;

  extras.forEach((x) => {
    x.cost = Math.max(0, Number(x.cost || 0) + 1);
  });
  state.extraCostCycle = (state.extraCostCycle || 0) + 1;
  state.lastExtraRefreshMonth = state.companyMonthsTotal;
  state.lastExtraRefreshGeneration = nextGen;
  refreshExtrasSelectableOptions();
  if (el.stageConfig && !el.stageConfig.classList.contains('hidden')) {
    refreshDesignPanelsLive();
  }
  return true;
}

function maybeRefreshFutureBatteryDensity(trigger = 'time') {
  if (state.historicalYear < HISTORICAL_HANDOFF_YEAR) return false;
  const nextGen = getNextGenerationIndex();
  const timeDue = (state.companyMonthsTotal - (state.lastBatteryRefreshMonth || 0)) >= 12;
  const genDue = trigger === 'generation' && nextGen > (state.lastBatteryRefreshGeneration || 1);
  if (!timeDue && !genDue) return false;
  state.batteryFutureCycle = Math.max(0, Number(state.batteryFutureCycle || 0)) + 1;
  state.lastBatteryRefreshMonth = state.companyMonthsTotal;
  state.lastBatteryRefreshGeneration = nextGen;
  if (el.stageConfig && !el.stageConfig.classList.contains('hidden')) {
    refreshDesignPanelsLive();
  }
  return true;
}

function maybeRefreshFutureFastChargePower(trigger = 'time') {
  if (state.historicalYear < HISTORICAL_HANDOFF_YEAR) return false;
  const nextGen = getNextGenerationIndex();
  const timeDue = (state.companyMonthsTotal - (state.lastFastChargeRefreshMonth || 0)) >= 12;
  const genDue = trigger === 'generation' && nextGen > (state.lastFastChargeRefreshGeneration || 1);
  if (!timeDue && !genDue) return false;
  state.fastChargeFutureCycle = Math.max(0, Number(state.fastChargeFutureCycle || 0)) + 1;
  state.lastFastChargeRefreshMonth = state.companyMonthsTotal;
  state.lastFastChargeRefreshGeneration = nextGen;
  applyHistoricalExtrasByYear(state.historicalYear);
  refreshExtrasSelectableOptions();
  if (el.stageConfig && !el.stageConfig.classList.contains('hidden')) {
    refreshDesignPanelsLive();
  }
  return true;
}

function maybeTriggerSocPriceCapEnding() {
  if (state.ended || state.socPriceCapEnded) return false;
  const SOC_PRICE_CAP = 3000;
  const activeSocs = socs.filter((s) => !s.retired);
  if (!activeSocs.length) return false;
  const maxSocCost = Math.max(...activeSocs.map((s) => Number(s.cost || 0)));
  if (maxSocCost <= SOC_PRICE_CAP) return false;
  state.socPriceCapEnded = true;
  endGame(`SoC 价格达到 ${RMB(maxSocCost)}，企业进入阶段性毕业结局。`);
  if (el.reportBox) {
    el.reportBox.innerHTML = `SoC 单价突破 <strong>${RMB(SOC_PRICE_CAP)}</strong>，你已成长为超大体量企业。<br>当前建议：重开新局再出发。`;
  }
  openGameModal(
    '游戏结束',
    `您已经拥有了庞大的手机企业（当前 SoC 价格 ${RMB(maxSocCost)}），现在是时候再出发了。`,
    'celebrate'
  );
  showMobileRunDockAction('阶段通关：SoC 价格突破 3000', 'good');
  applyRestartCtaState('celebrate');
  if (window.matchMedia('(max-width: 760px)').matches) {
    if (el.stageRun && !el.stageRun.classList.contains('hidden')) {
      el.stageRun.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  return true;
}

function maybeRefreshTechComponentPool(trigger = 'time') {
  if (state.historicalYear < HISTORICAL_HANDOFF_YEAR) return false;
  const nextGen = getNextGenerationIndex();
  const unlocked = nextGen >= 3 || state.companyMonthsTotal >= 30;
  if (!unlocked) return false;
  const timeDue = (state.companyMonthsTotal - (state.lastTechRefreshMonth || 0)) >= 12;
  const genDue = trigger === 'generation' && nextGen > (state.lastTechRefreshGeneration || 1);
  if (!timeDue && !genDue) return false;

  state.techCycle = (state.techCycle || 0) + 1;
  // Endless era year advances by SoC-generation updates.
  // After 2025, each SoC refresh moves timeline +1 year.
  state.historicalYear = Math.max(HISTORICAL_HANDOFF_YEAR, Number(state.historicalYear || HISTORICAL_HANDOFF_YEAR)) + 1;
  const preSocActive = socs.filter((s) => !s.retired).length;
  const preCamActive = cameraModules.filter((c) => !c.retired && c.id !== 'none').length;
  const socRetired = evolveExistingSocPool();
  const camRetired = evolveExistingCameraPool();
  const socActiveAfterRetire = socs.filter((s) => !s.retired).length;
  const camActiveAfterRetire = cameraModules.filter((c) => !c.retired && c.id !== 'none').length;
  const cycleDrift = state.techCycle % 3 === 0 ? 1 : 0; // occasional slight expansion
  const socTargetActive = clamp(preSocActive + cycleDrift, preSocActive - 1, preSocActive + 1);
  const camTargetActive = clamp(preCamActive + cycleDrift, preCamActive - 1, preCamActive + 1);
  const socAddQuota = clamp(socTargetActive - socActiveAfterRetire + (socRetired > 2 ? 1 : 0), 0, 6);
  // Camera updates are slightly faster than before (especially noticeable on flagship sensors).
  const camRefreshBonus = state.techCycle % 2 === 1 ? 1 : 0;
  const camAddQuota = clamp(camTargetActive - camActiveAfterRetire + (camRetired > 2 ? 1 : 0) + camRefreshBonus, 0, 6);
  addNewGenerationSoc(socAddQuota);
  addNewGenerationCamera(camAddQuota);
  refreshTechSelectableOptions();
  updateDisplayMaterialOptions();
  if (el.stageConfig && !el.stageConfig.classList.contains('hidden')) {
    refreshDesignPanelsLive();
  }

  state.lastTechRefreshMonth = state.companyMonthsTotal;
  state.lastTechRefreshGeneration = nextGen;
  if (maybeTriggerSocPriceCapEnding()) return true;

  openGameModal(
    '代际更新',
    `行业进入新一轮更新：新旗舰/新中端已入场，老款芯片与传感器开始下沉或淘汰。<br>本次更新已生效（第 <strong>${state.techCycle}</strong> 轮，当前年份 <strong>${state.historicalYear}</strong>），建议重新检查配置与定价。`
  );
  return true;
}

function resetTechPoolsToBase() {
  Object.keys(displayMaterials).forEach((k) => {
    if (!baseDisplayMaterials[k]) return;
    displayMaterials[k] = JSON.parse(JSON.stringify(baseDisplayMaterials[k]));
  });
  socs.splice(0, socs.length, ...JSON.parse(JSON.stringify(baseSocs)));
  cameraModules.splice(0, cameraModules.length, ...JSON.parse(JSON.stringify(baseCameraModules)));
  ramOptions.splice(0, ramOptions.length, ...JSON.parse(JSON.stringify(baseRamOptions)));
  romOptions.splice(0, romOptions.length, ...JSON.parse(JSON.stringify(baseRomOptions)));
  extras.splice(0, extras.length, ...JSON.parse(JSON.stringify(baseExtras)));
  Object.keys(dynamicSocThermalMap).forEach((k) => { delete dynamicSocThermalMap[k]; });
  Object.keys(dynamicMainCamThermalMap).forEach((k) => { delete dynamicMainCamThermalMap[k]; });
  Object.keys(socBenchmarkAnchors).forEach((k) => { delete socBenchmarkAnchors[k]; });
  Object.assign(socBenchmarkAnchors, JSON.parse(JSON.stringify(baseSocBenchmarkAnchors)));
  state.historicalYear = HISTORICAL_START_YEAR;
  state.historicalLastRefreshMonth = 0;
  state.historicalLastRefreshGeneration = 1;
  state.batteryFutureCycle = 0;
  state.lastBatteryRefreshMonth = 0;
  state.lastBatteryRefreshGeneration = 1;
  state.fastChargeFutureCycle = 0;
  state.lastFastChargeRefreshMonth = 0;
  state.lastFastChargeRefreshGeneration = 1;
  applyHistoricalTechPools(state.historicalYear);
  applyHistoricalExtrasByYear(state.historicalYear);
}

function trendArrows(factor) {
  if (factor >= 1.15) return '↑↑';
  if (factor >= 1.05) return '↑';
  if (factor <= 0.85) return '↓↓';
  if (factor <= 0.95) return '↓';
  return '';
}

function trendText(factor, text) {
  const arrow = trendArrows(factor);
  return arrow ? `${arrow} ${text}` : text;
}

function marketFactorLabel(type, factor) {
  const bigMove = factor >= 1.15 || factor <= 0.85;
  if (type === 'demand') {
    const text = factor >= 1.15
      ? '大幅升温'
      : factor >= 1.05
        ? '温和升温'
        : factor <= 0.85
          ? '大幅降温'
          : factor <= 0.95
            ? '略微降温'
            : '基本平稳';
    return `${bigMove ? '<span class="risk-warn">' : ''}${trendText(factor, text)}${bigMove ? '</span>' : ''}`;
  }
  const text = factor >= 1.15
    ? '大幅上涨'
    : factor >= 1.05
      ? '略有上涨'
      : factor <= 0.85
        ? '大幅回落'
        : factor <= 0.95
          ? '略有回落'
          : '基本平稳';
  return `${bigMove ? '<span class="risk-warn">' : ''}${trendText(factor, text)}${bigMove ? '</span>' : ''}`;
}

function rollThreeMarkets() {
  const titleClassByKey = {
    subsidy_boom: 'market-buff-strong',
    super_competition: 'market-debuff-strong'
  };
  const pool = [...marketArchetypes].sort(() => Math.random() - 0.5).slice(0, 3);
  state.marketPool = pool;
  state.marketPick = null;
  updateEventGateState();
  el.eventCards.innerHTML = pool.map((m, i) => `
    <article class="card" data-idx="${i}">
      <h4 class="${titleClassByKey[m.key] || ''}">${m.name}</h4>
      <p>${m.text}</p>
      <p>需求：${marketFactorLabel('demand', m.demand)} / 成本：${marketFactorLabel('cost', m.cost)} / 口碑偏移 ${m.rating > 0 ? '+' : ''}${m.rating}</p>
    </article>
  `).join('');

  [...el.eventCards.querySelectorAll('.card')].forEach((card) => {
    card.addEventListener('click', () => {
      [...el.eventCards.querySelectorAll('.card')].forEach((c) => c.classList.remove('sel'));
      card.classList.add('sel');
      state.marketPick = state.marketPool[Number(card.dataset.idx)];
      updateEventGateState();
    });
  });
}

function assignRandomRegion() {
  const keys = Object.keys(chinaRegions);
  if (!keys.length || !el.region) return;
  const key = keys[Math.floor(Math.random() * keys.length)];
  el.region.value = key;
  el.region.disabled = true;
  if (el.regionFixed) {
    el.regionFixed.value = chinaRegions[key].name;
  }
}

function updateEventGateState() {
  const hasMarket = Boolean(state.marketPick);
  const hasRegion = Boolean(el.region && el.region.value && chinaRegions[el.region.value]);
  const ready = hasMarket && hasRegion;
  el.confirmEvent.disabled = !ready;

  if (!hasMarket) {
    el.eventHint.textContent = '请选择 1 个市场环境。';
    return;
  }
  if (!hasRegion) return;
  el.eventHint.textContent = `已选环境：${state.marketPick.name}｜行业年份 ${state.historicalYear || HISTORICAL_START_YEAR}`;
}

function selectedValues() {
  const socRaw = socs.find((x) => x.id === normalizeSocId(el.soc.value));
  const bodyRaw = getBodyOptionByIdForYear(el.body.value, state.historicalYear);
  const soc = socRaw ? { ...socRaw } : null;
  const body = bodyRaw ? { ...bodyRaw } : null;
  const region = chinaRegions[el.region.value];
  const marketStats = getRegionMarketStats(el.region.value, state.historicalYear);
  const procurement = procurementPlans[el.procurementPlan.value];
  const marketing = marketingProfiles[el.marketingFocus.value];
  const campaign = campaignLevels[el.campaignLevel.value];
  const startupDifficulty = startupDifficulties[el.startupDifficulty.value] || startupDifficulties.real;
  const effectiveDispMatKey = getDisplayMaterialKeyForEra(el.dispMat.value, state.historicalYear);
  const effectiveDispMat = { ...(displayMaterials[effectiveDispMatKey] || displayMaterials.lcd) };
  if (el.dispMat.value === 'oled' && effectiveDispMatKey === 'amoled') {
    effectiveDispMat.name = 'OLED';
  }

  const disp = {
    mat: effectiveDispMat,
    vendor: { ...displayVendors[el.dispVendor.value] },
    form: { ...displayForms[el.dispForm.value] },
    size: getDisplaySizeInch(),
    ratio: el.dispRatio.value,
    features: [...el.displayFeatures.querySelectorAll('input:checked')].map((i) => ({ ...displayFeatureMap[i.value] }))
  };

  const cams = {
    main: { ...(cameraModules.find((x) => x.id === el.camMain.value) || { id: 'none', name: '无', cost: 0, weight: 0, score: 0, type: 'none', volume: 0 }) },
    ultra: { ...(cameraModules.find((x) => x.id === el.camUltra.value) || { id: 'none', name: '无', cost: 0, weight: 0, score: 0, type: 'none', volume: 0 }) },
    mono: { ...(cameraModules.find((x) => x.id === (el.camMono ? el.camMono.value : 'none')) || { id: 'none', name: '无', cost: 0, weight: 0, score: 0, type: 'none', volume: 0 }) },
    tele: { ...(cameraModules.find((x) => x.id === el.camTele.value) || { id: 'none', name: '无', cost: 0, weight: 0, score: 0, type: 'none', volume: 0 }) },
    front: { ...(cameraModules.find((x) => x.id === el.camFront.value) || { id: 'none', name: '无', cost: 0, weight: 0, score: 0, type: 'none', volume: 0 }) }
  };

  const chosenExtras = [...el.extras.querySelectorAll('input:checked')]
    .map((i) => extras.find((x) => x.id === i.value))
    .filter(Boolean)
    .map((x) => ({ ...x }));

  const basePrice = Number(el.price.value);
  const skuPlans = buildSkuPlansFromInputs(basePrice);

  return {
    soc,
    procurement,
    body,
    region,
    marketStats,
    marketing,
    campaign,
    startupDifficulty,
    calendarYear: Number(state.historicalYear || HISTORICAL_HANDOFF_YEAR),
    modelBaseName: FIXED_MODEL_BASE_NAME,
    disp,
    cams,
    chosenExtras,
    skuPlans,
    price: Number(el.price.value),
    units: Number(el.units.value),
    battery: Number(el.battery.value),
    phoneH: getPhoneHInputMm(),
    phoneW: getPhoneWInputMm(),
    phoneT: getPhoneTInputMm()
  };
}

function estimateSocOverheatSeconds(thermalPressure, socLabScoreForHeat) {
  let temp = 26;
  let t = 0;
  const dt = 0.12;
  while (temp < 95 && t < 8) {
    const baseRise = 0.34 + thermalPressure * 0.56 + socLabScoreForHeat / 420;
    const heatProgress = clamp((temp - 26) / (95 - 26), 0, 1);
    const curveMul = 1.12 - 0.34 * Math.pow(heatProgress, 1.45);
    const rise = baseRise * curveMul;
    temp = clamp(temp + rise, 26, 99.5);
    t += dt;
  }
  return clamp(t, 0, 8);
}

function calcFeatureDemandBaselineFromInput(inputLike) {
  const input = inputLike || {};
  const chosenExtras = Array.isArray(input.chosenExtras) ? input.chosenExtras : [];
  const launchYear = Number(input.calendarYear || HISTORICAL_HANDOFF_YEAR);
  const formDemand = Number((input.disp && input.disp.form && input.disp.form.demand) || 0);
  const rearCameraCount = [input?.cams?.main, input?.cams?.ultra, input?.cams?.mono, input?.cams?.tele]
    .filter((x) => x && x.id !== 'none')
    .length;
  const launchExtraDemand = chosenExtras.reduce((sum, x) => sum + Number((x && x.demand) || 0), 0);
  const launchDemandAddMul = Math.max(0.05, 1 + launchExtraDemand + formDemand);
  const activeIds = new Set(
    chosenExtras
      .map((x) => String((x && x.id) || ''))
      .filter(Boolean)
  );
  const hasScreenInsurance = activeIds.has('screen_insurance');
  const hasIp68Cert = activeIds.has('ip68_cert');
  const hasNfcUwb = activeIds.has('nfc_uwb');
  const hasIrBlaster = activeIds.has('ir_blaster');
  const hasWirelessCharge = activeIds.has('wireless_charge');
  const hasFingerprint = activeIds.has('fingerprint');
  const hasEarlyFastCharge = activeIds.has('fast_legacy');
  const hasDualFastCharge = activeIds.has('fast_dual');
  const hasDualCell = activeIds.has('dual_cell');
  const hasHeatPipe = activeIds.has('vc') && launchYear < 2016;
  const hasMatrixDeco = activeIds.has('flat_back') && launchYear < 2018;
  const hasLegacyMultiCamBoost = launchYear < 2017 && rearCameraCount >= 2 && activeIds.has('multi_cam_module');
  const extraOnlineDemandMul = chosenExtras.reduce(
    (m, x) => m * clamp(Number((x && x.onlineDemandMul) || 1), 0.8, 1.4),
    1
  );
  const extraOfflineDemandMul = chosenExtras.reduce(
    (m, x) => m * clamp(Number((x && x.offlineDemandMul) || 1), 0.85, 1.35),
    1
  );
  const launchOnlineFeatureMul =
    (hasScreenInsurance ? 1.03 : 1.0)
    * (hasIp68Cert ? 1.024 : 1.0)
    * (hasNfcUwb ? 1.022 : 1.0)
    * (hasIrBlaster ? 1.018 : 1.0)
    * (hasWirelessCharge ? 1.025 : 1.0)
    * (hasFingerprint ? 1.03 : 1.0)
    * (hasEarlyFastCharge ? 1.05 : 1.0)
    * (hasLegacyMultiCamBoost ? 1.14 : 1.0)
    * (hasDualFastCharge ? 1.1 : 1.0)
    * (hasDualCell ? 1.06 : 1.0)
    * (hasHeatPipe ? 1.12 : 1.0)
    * extraOnlineDemandMul;
  const launchOfflineFeatureMul =
    (hasScreenInsurance ? 1.1 : 1.0)
    * (hasIp68Cert ? 1.03 : 1.0)
    * (hasWirelessCharge ? 1.085 : 1.0)
    * (hasFingerprint ? 1.06 : 1.0)
    * (hasEarlyFastCharge ? 1.045 : 1.0)
    * (hasDualFastCharge ? 1.12 : 1.0)
    * (hasMatrixDeco ? 1.14 : 1.0)
    * extraOfflineDemandMul;
  return {
    launchYear,
    formDemand,
    launchExtraDemand,
    launchDemandAddMul,
    launchOnlineFeatureMul,
    launchOfflineFeatureMul
  };
}

function calcRuntimeFeatureDemandAdjustment(productLike, yearLike) {
  const p = productLike || {};
  const input = p.input || {};
  const year = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  const baseline = p.featureDemandBaseline || calcFeatureDemandBaselineFromInput(input);
  const chosenExtras = Array.isArray(input.chosenExtras) ? input.chosenExtras : [];
  const launchYear = Number(baseline.launchYear || input.calendarYear || HISTORICAL_HANDOFF_YEAR);
  const activeExtras = chosenExtras.filter((x) => isExtraAvailableAtYear(String((x && x.id) || ''), year));
  const activeIds = new Set(
    activeExtras
      .map((x) => String((x && x.id) || ''))
      .filter(Boolean)
  );
  const rearCameraCount = [input?.cams?.main, input?.cams?.ultra, input?.cams?.mono, input?.cams?.tele]
    .filter((x) => x && x.id !== 'none')
    .length;
  const currentExtraDemand = activeExtras.reduce((sum, x) => sum + Number((x && x.demand) || 0), 0);
  const currentDemandAddMul = Math.max(0.05, 1 + currentExtraDemand + Number(baseline.formDemand || 0));
  const hasScreenInsurance = activeIds.has('screen_insurance');
  const hasIp68Cert = activeIds.has('ip68_cert');
  const hasNfcUwb = activeIds.has('nfc_uwb');
  const hasIrBlaster = activeIds.has('ir_blaster');
  const hasWirelessCharge = activeIds.has('wireless_charge');
  const hasFingerprint = activeIds.has('fingerprint');
  const hasEarlyFastCharge = activeIds.has('fast_legacy');
  const hasDualFastCharge = activeIds.has('fast_dual');
  const hasDualCell = activeIds.has('dual_cell');
  const hasHeatPipe = activeIds.has('vc') && launchYear < 2016;
  const hasMatrixDeco = activeIds.has('flat_back') && launchYear < 2018;
  const hasLegacyMultiCamBoost = launchYear < 2017 && rearCameraCount >= 2 && activeIds.has('multi_cam_module');
  const currentExtraOnlineDemandMul = activeExtras.reduce(
    (m, x) => m * clamp(Number((x && x.onlineDemandMul) || 1), 0.8, 1.4),
    1
  );
  const currentExtraOfflineDemandMul = activeExtras.reduce(
    (m, x) => m * clamp(Number((x && x.offlineDemandMul) || 1), 0.85, 1.35),
    1
  );
  const currentOnlineFeatureMul =
    (hasScreenInsurance ? 1.03 : 1.0)
    * (hasIp68Cert ? 1.024 : 1.0)
    * (hasNfcUwb ? 1.022 : 1.0)
    * (hasIrBlaster ? 1.018 : 1.0)
    * (hasWirelessCharge ? 1.025 : 1.0)
    * (hasFingerprint ? 1.03 : 1.0)
    * (hasEarlyFastCharge ? 1.05 : 1.0)
    * (hasLegacyMultiCamBoost ? 1.14 : 1.0)
    * (hasDualFastCharge ? 1.1 : 1.0)
    * (hasDualCell ? 1.06 : 1.0)
    * (hasHeatPipe ? 1.12 : 1.0)
    * currentExtraOnlineDemandMul;
  const currentOfflineFeatureMul =
    (hasScreenInsurance ? 1.1 : 1.0)
    * (hasIp68Cert ? 1.03 : 1.0)
    * (hasWirelessCharge ? 1.085 : 1.0)
    * (hasFingerprint ? 1.06 : 1.0)
    * (hasEarlyFastCharge ? 1.045 : 1.0)
    * (hasDualFastCharge ? 1.12 : 1.0)
    * (hasMatrixDeco ? 1.14 : 1.0)
    * currentExtraOfflineDemandMul;
  const launchOnline = Math.max(0.05, Number(baseline.launchOnlineFeatureMul || 1));
  const launchOffline = Math.max(0.05, Number(baseline.launchOfflineFeatureMul || 1));
  const launchDemand = Math.max(0.05, Number(baseline.launchDemandAddMul || 1));
  const onlineShare = clamp(Number(p.onlineShare || 0.56), 0.2, 0.9);
  const offlineShare = 1 - onlineShare;
  const demandRatio = currentDemandAddMul / launchDemand;
  const channelRatio =
    (currentOnlineFeatureMul * onlineShare + currentOfflineFeatureMul * offlineShare)
    / Math.max(0.05, launchOnline * onlineShare + launchOffline * offlineShare);
  const retiredCount = chosenExtras.length - activeExtras.length;
  return {
    mul: clamp(demandRatio * channelRatio, 0.25, 1.12),
    retiredCount: Math.max(0, retiredCount)
  };
}

function getBenchmarkBaselineByYear(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  return y < 2018 ? BENCHMARK_BASELINE_LEGACY : BENCHMARK_BASELINE_MODERN;
}

function getBatteryBaselineByYear(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  return y < 2018 ? BATTERY_BASELINE_LEGACY : BATTERY_BASELINE;
}

function getBenchmarkDemandReferenceTotalByYear(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  // Demand-side dynamic baseline:
  // 2014 -> 2017: 64 -> 78 (legacy flagship era)
  // 2018 -> 2025: 78 -> 115 (modern baseline era)
  // 2026+        : keep rising mildly with technology progression.
  if (y <= 2014) return 64;
  if (y <= 2017) {
    const t = (y - 2014) / 3;
    return 64 + (78 - 64) * t;
  }
  if (y <= HISTORICAL_HANDOFF_YEAR) {
    const t = (y - 2018) / Math.max(1, (HISTORICAL_HANDOFF_YEAR - 2018));
    return 78 + (115 - 78) * t;
  }
  const futureYears = y - HISTORICAL_HANDOFF_YEAR;
  return 115 + futureYears * 3.6;
}

function calcVirtualBenchmark(v, avgRamScore, avgRomScore, displayScore, cameraScore, batteryLabScore, thermalPressure) {
  const socRef = socBenchmarkAnchors[v.soc.id] || socBenchmarkAnchors.dim7300;
  const techRound = Math.max(0, Number(state.techCycle || 0));
  const hasActiveFan = Array.isArray(v.chosenExtras) && v.chosenExtras.some((x) => x.id === 'active_fan');
  const hasVCBoost = Array.isArray(v.chosenExtras) && v.chosenExtras.some((x) => x.id === 'vc');
  const isHeatPipeEra = Number(v && v.calendarYear || HISTORICAL_HANDOFF_YEAR) < 2016;
  const hasSemiBoost = Array.isArray(v.chosenExtras) && v.chosenExtras.some((x) => x.id === 'semi_cooler');
  const year = Math.max(HISTORICAL_START_YEAR, Number(v && v.calendarYear || HISTORICAL_HANDOFF_YEAR));

  // Use baseline-normalized performance ratios to keep long-range progression continuous.
  const socNorm =
    0.48 * (Number(socRef.antutu10 || 0) / BENCH_COMPONENT_BASELINE.soc.antutu10)
    + 0.24 * (Number(socRef.geekbench6Single || 0) / BENCH_COMPONENT_BASELINE.soc.geekbench6Single)
    + 0.28 * (Number(socRef.geekbench6Multi || 0) / BENCH_COMPONENT_BASELINE.soc.geekbench6Multi);
  const yearTrendMul = clamp(0.88 + (year - HISTORICAL_START_YEAR) * 0.014 + techRound * 0.012, 0.8, 2.6);
  const socLabScoreRaw = Math.max(34, 38 + 60 * Math.pow(Math.max(0.22, socNorm) * yearTrendMul, 0.78));
  const vcSocBoost = hasVCBoost ? (isHeatPipeEra ? 0.05 : 0.1) : 0;
  const socBoostMul = 1 + (hasActiveFan ? 0.1 : 0) + vcSocBoost + (hasSemiBoost ? 0.2 : 0);
  const socLabScoreForHeat = Math.max(34, socLabScoreRaw * socBoostMul);
  // Cooling extras scale with heat load so they can keep up with long-term SoC growth.
  const coolingFollowFactor =
    (hasVCBoost ? (0.55 + techRound * 0.06) : 0)
    + (hasActiveFan ? (0.8 + techRound * 0.08) : 0)
    + (hasSemiBoost ? (1.4 + techRound * 0.1) : 0);
  const heatLoadGrowth = Math.max(0, socLabScoreForHeat - 120) / 120;
  const coolingFollowScale = 1 + coolingFollowFactor * heatLoadGrowth;
  const socHeatScoreEffective = socLabScoreForHeat / Math.max(1, coolingFollowScale);
  const socOverheatSec = estimateSocOverheatSeconds(thermalPressure, socHeatScoreEffective);
  // If overheat occurs before 6s, SoC score linearly drops up to 50%.
  const socThermalPenaltyRatio = socOverheatSec < 6
    ? clamp(1 - ((6 - socOverheatSec) / 6) * 0.5, 0.5, 1)
    : 1;
  const socLabScore = Math.max(30, socLabScoreForHeat * socThermalPenaltyRatio);

  const storageSpeedMap = {
    '64_emmc': { read: 250, write: 125 },
    '128_ufs22': { read: 1200, write: 600 },
    '256_ufs31': { read: 2100, write: 1200 },
    '512_ufs40': { read: 4000, write: 2800 },
    '1t_ufs40': { read: 4200, write: 3000 }
  };
  const weightedStorage = v.skuPlans.reduce((acc, sku) => {
    const dynamicIo = sku && sku.rom
      ? { read: Number(sku.rom.read), write: Number(sku.rom.write) }
      : null;
    const baseIo = storageSpeedMap[sku.rom.id] || storageSpeedMap['256_ufs31'];
    const io = {
      read: Number.isFinite(dynamicIo && dynamicIo.read) && dynamicIo.read > 0 ? dynamicIo.read : baseIo.read,
      write: Number.isFinite(dynamicIo && dynamicIo.write) && dynamicIo.write > 0 ? dynamicIo.write : baseIo.write
    };
    const share = sku.share / 100;
    acc.read += io.read * share;
    acc.write += io.write * share;
    return acc;
  }, { read: 0, write: 0 });
  const storageNorm =
    0.42 * (weightedStorage.read / BENCH_COMPONENT_BASELINE.storage.read)
    + 0.30 * (weightedStorage.write / BENCH_COMPONENT_BASELINE.storage.write)
    + 0.16 * (avgRamScore / BENCH_COMPONENT_BASELINE.storage.ramScore)
    + 0.12 * (avgRomScore / BENCH_COMPONENT_BASELINE.storage.romScore);
  const storageLabScore = Math.max(28, 34 + 62 * Math.pow(Math.max(0.2, storageNorm), 0.82));

  const displayNorm = Math.max(0.2, Number(displayScore || 0) / BENCH_COMPONENT_BASELINE.displayScore);
  const displayLabScore = Math.max(32, 40 + 58 * Math.pow(displayNorm, 0.88));

  const main = v.cams.main.id === 'none' ? 0 : v.cams.main.score;
  const ultra = v.cams.ultra.id === 'none' ? 0 : v.cams.ultra.score;
  const mono = v.cams.mono && v.cams.mono.id !== 'none' ? v.cams.mono.score : 0;
  const tele = v.cams.tele.id === 'none' ? 0 : v.cams.tele.score;
  const front = v.cams.front.id === 'none' ? 0 : v.cams.front.score;
  const camEra = Math.max(0, (year - HISTORICAL_START_YEAR) * 0.42 + techRound * 0.85);
  const hasAnyCamera = main > 0 || ultra > 0 || mono > 0 || tele > 0 || front > 0;
  const monoBonusMul = mono > 0 ? 1.1 : 1.0;
  const cameraComposite =
    main * 1.0
    + ultra * 0.45
    + mono * 0.52
    + tele * 0.60
    + front * 0.25
    + (main > 0 && ultra > 0 && tele > 0 ? 4.5 : 0)
    + camEra;
  const cameraNorm = Math.max(0.15, cameraComposite / BENCH_COMPONENT_BASELINE.cameraComposite);
  const cameraLabScore = hasAnyCamera
    ? Math.max(0, (36 + 66 * Math.pow(cameraNorm, 0.82)) * monoBonusMul)
    : 0;

  const totalRaw =
    socLabScore * 0.39
    + storageLabScore * 0.15
    + displayLabScore * 0.12
    + cameraLabScore * 0.17
    + batteryLabScore * 0.17;
  // Keep compatibility with existing in-game baseline reading (R2 ≈ 115),
  // while preserving long-term growth continuity.
  const total = Math.round(totalRaw * 1.15);
  const benchmarkBaseline = getBenchmarkBaselineByYear(v && v.calendarYear);
  const baselineRatio = total / Math.max(1, Number(benchmarkBaseline.total || BENCHMARK_BASELINE_MODERN.total));
  const baselineDeltaPct = (baselineRatio - 1) * 100;
  const baselineTag = baselineRatio >= 1.3
    ? '越级领先'
    : baselineRatio >= 1.1
      ? '明显领先'
      : baselineRatio >= 0.95
        ? '同档接近'
        : baselineRatio >= 0.8
          ? '略弱一档'
          : '落后较多';

  const benchmarkDemandRefTotal = Math.max(1, getBenchmarkDemandReferenceTotalByYear(v && v.calendarYear));
  const benchmarkDemandRatio = total / benchmarkDemandRefTotal;
  const demandYear = Number(v && v.calendarYear || HISTORICAL_HANDOFF_YEAR);
  const benchInfluence = demandYear <= 2016 ? 0.34 : demandYear <= 2019 ? 0.4 : demandYear <= 2023 ? 0.48 : 0.58;
  const benchDownWeight = demandYear <= 2016 ? 0.42 : demandYear <= 2019 ? 0.5 : demandYear <= 2023 ? 0.64 : 1.0;
  const benchmarkDelta = benchmarkDemandRatio - 1;
  const benchmarkEffectiveDelta = benchmarkDelta >= 0
    ? benchmarkDelta * benchInfluence
    : benchmarkDelta * benchInfluence * benchDownWeight;
  const benchmarkDemandFloor = demandYear <= 2016 ? 0.94 : demandYear <= 2019 ? 0.92 : demandYear <= 2023 ? 0.89 : 0.84;
  const benchmarkDemandMul = clamp(1 + benchmarkEffectiveDelta, benchmarkDemandFloor, 1.34);

  return {
    total,
    socLabScore: Math.round(socLabScore),
    socLabScoreForHeat: Math.round(socLabScoreForHeat),
    socHeatScoreEffective: Math.round(socHeatScoreEffective),
    coolingFollowScale,
    storageLabScore: Math.round(storageLabScore),
    displayLabScore: Math.round(displayLabScore),
    cameraLabScore: Math.round(cameraLabScore),
    batteryLabScore: Math.round(batteryLabScore),
    socOverheatSec,
    socThermalPenaltyRatio,
    socReference: socRef,
    benchmarkBaseline,
    baselineRatio,
    baselineDeltaPct,
    baselineTag,
    benchmarkDemandRefTotal,
    benchmarkDemandRatio,
    benchmarkDemandMul,
    benchmarkGeekBonus: (socLabScore - 90) * 0.13 + (cameraLabScore - 95) * 0.08
  };
}

function benchmarkRatioText(ratio) {
  const pct = clamp((Number(ratio) || 0) * 100, 0, 999);
  return `${Math.round(pct)}%`;
}

function getDisplayMaterialKeysForYear(yearLike) {
  const y = Number(yearLike || HISTORICAL_START_YEAR);
  const legacyEra = isLegacyDisplayEra(y);
  const midEra = isMidDisplayEra(y);
  const unlocked = isFoldableUnlocked();
  if (legacyEra) return ['lcd', 'amoled', 'eink'];
  if (midEra) return ['lcd', 'oled', 'eink'];
  return ['lcd', 'oled', 'dual_oled', 'eink', ...(unlocked ? ['foldable'] : [])];
}

function getDisplayFormKeysForYear(yearLike) {
  const y = Number(yearLike || HISTORICAL_START_YEAR);
  if (isLegacyDisplayEra(y)) return ['legacy_normal', 'legacy_id', 'legacy_true_narrow', 'legacy_three_side'];
  if (isMidDisplayEra(y)) return ['mid_notch', 'mid_waterdrop', 'mid_popup', 'mid_symmetry'];
  return ['symmetry', 'notch', 'hole', 'pill', 'udc'];
}

function getDisplayFeatureKeysForYear(yearLike) {
  const y = Number(yearLike || HISTORICAL_START_YEAR);
  return ['high_refresh', 'high_res', 'p3', 'eye', 'ltpo', 'high_pwm']
    .filter((key) => Boolean(displayFeatureMap[key]))
    .filter((key) => y >= getDisplayFeatureUnlockYear(key));
}

function estimateSocLabScoreByOption(socOption) {
  const soc = socOption || {};
  const socRef = socBenchmarkAnchors[soc.id] || estimateSocBenchmarkByScore(soc.score || 0);
  const socNorm =
    0.48 * (Number(socRef.antutu10 || 0) / BENCH_COMPONENT_BASELINE.soc.antutu10)
    + 0.22 * (Number(socRef.geekbench6Single || 0) / BENCH_COMPONENT_BASELINE.soc.geekbench6Single)
    + 0.30 * (Number(socRef.geekbench6Multi || 0) / BENCH_COMPONENT_BASELINE.soc.geekbench6Multi);
  return Math.max(30, 26 + 74 * Math.pow(Math.max(0.2, socNorm), 0.86));
}

function estimateStorageLabScoreByTopTier() {
  const maxRamScore = Math.max(0, ...ramOptions.map((x) => Number(x && x.score || 0)));
  const maxRomScore = Math.max(0, ...romOptions.map((x) => Number(x && x.score || 0)));
  const storageNorm =
    0.58 * (maxRomScore / BENCH_COMPONENT_BASELINE.storage.romScore)
    + 0.42 * (maxRamScore / BENCH_COMPONENT_BASELINE.storage.ramScore);
  return Math.max(28, 34 + 62 * Math.pow(Math.max(0.2, storageNorm), 0.82));
}

function estimateCameraLabScoreByTopTier(yearLike) {
  const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
  const activeCameras = cameraModules.filter((x) => !x.retired);
  if (!activeCameras.length) return 0;
  const nonNone = activeCameras.filter((x) => x.id !== 'none');
  const rearPool = nonNone.filter((x) => x.type !== 'front');
  const main = rearPool.length ? Math.max(...rearPool.map((x) => Number(x.score || 0))) : 0;
  const ultra = main;
  const mono = main;
  const tele = main;
  const frontPool = nonNone.filter((x) => x.type === 'front');
  const front = frontPool.length ? Math.max(...frontPool.map((x) => Number(x.score || 0))) : 0;
  const camEra = Math.max(0, (y - HISTORICAL_START_YEAR) * 0.42 + Math.max(0, Number(state.techCycle || 0)) * 0.85);
  const cameraComposite =
    main * 1.0
    + ultra * 0.45
    + mono * 0.52
    + tele * 0.60
    + front * 0.25
    + (main > 0 && ultra > 0 && tele > 0 ? 4.5 : 0)
    + camEra;
  const cameraNorm = Math.max(0.15, cameraComposite / BENCH_COMPONENT_BASELINE.cameraComposite);
  return Math.max(0, (36 + 66 * Math.pow(cameraNorm, 0.82)) * (mono > 0 ? 1.1 : 1.0));
}

function calcHiddenPeakUnitCostReference(v, context = {}) {
  const y = Number(v && v.calendarYear || HISTORICAL_HANDOFF_YEAR);
  const eraCostFactor = Number(context.eraCostFactor || 1);
  const eraOpsFactor = Number(context.eraOpsFactor || 1);
  const memoryMarketFactor = Number(context.memoryMarketFactor || 1);
  const marketCostFactor = Number((state.marketPick && state.marketPick.cost) || 1);
  const procurementFactor = Number(v && v.procurement && v.procurement.factor || 1);

  const maxSocCost = Math.max(0, ...socs.filter((x) => !x.retired).map((x) => Number(x.cost || 0))) * procurementFactor * eraCostFactor;

  const activeCameras = cameraModules.filter((x) => !x.retired && x.id !== 'none');
  const rearPool = activeCameras.filter((x) => x.type !== 'front');
  const frontPool = activeCameras.filter((x) => x.type === 'front');
  const maxRearCamCost = rearPool.length ? Math.max(...rearPool.map((x) => Number(x.cost || 0))) : 0;
  const maxFrontCamCost = frontPool.length ? Math.max(...frontPool.map((x) => Number(x.cost || 0))) : 0;
  const maxCameraCost = (maxRearCamCost * 4 + maxFrontCamCost) * procurementFactor * eraCostFactor;

  const maxBodyCost = Math.max(0, ...getBodyOptionsForYear(y).map((x) => Number(x.cost || 0))) * eraCostFactor;
  const batteryMaxCap = getBatteryCapacityMax(y);
  const maxBatteryCost = (batteryMaxCap * 0.048 + 35) * eraCostFactor;
  const maxExtraCost = extras
    .filter((x) => isExtraAvailableAtYear(String(x && x.id || ''), y))
    .reduce((sum, x) => sum + Number(getExtraHistoricalCost(x, y) || 0), 0) * eraCostFactor;

  const displayMatKeys = getDisplayMaterialKeysForYear(y);
  const displayFormKeys = getDisplayFormKeysForYear(y).filter((k) => Boolean(displayForms[k]));
  const displayFeatureKeys = getDisplayFeatureKeysForYear(y);
  const maxVendorCostFactor = Math.max(1, ...Object.values(displayVendors).map((x) => Number(x.costFactor || 1)));
  const maxRatioFactor = Math.max(1, ...Object.values(aspectCostFactor).map((x) => Number(x || 1)));
  const maxDisplayCost = displayMatKeys.reduce((matMax, rawMatKey) => {
    const effectiveMatKey = getDisplayMaterialKeyForEra(rawMatKey, y);
    const mat = displayMaterials[effectiveMatKey] || displayMaterials.lcd;
    const featureCostMultiplier = rawMatKey === 'eink' ? 2.8 : 1.0;
    const featureCost = displayFeatureKeys.reduce((s, key) => s + Number((displayFeatureMap[key] && displayFeatureMap[key].cost) || 0), 0) * featureCostMultiplier;
    const maxFormCost = Math.max(0, ...displayFormKeys.map((key) => Number((displayForms[key] && displayForms[key].cost) || 0)));
    const historicalDisplayCostMul = getHistoricalDisplayCostFactor(y, effectiveMatKey);
    const sizeFactor = Math.pow(9 / 6.5, 1.15);
    const foldableSizeMul = rawMatKey === 'foldable' ? getFoldableSizeCostFactor(9) : 1.0;
    const ratioNoveltyCostMul = (!isLegacyDisplayEra(y) && rawMatKey !== 'foldable') ? 1.08 : 1.0;
    const cost = (
      (Number(mat.baseCost || 0) * historicalDisplayCostMul * sizeFactor * maxRatioFactor + featureCost + maxFormCost)
      * foldableSizeMul
    ) * maxVendorCostFactor * 1.28 * ratioNoveltyCostMul * eraCostFactor;
    return Math.max(matMax, cost);
  }, 0);

  const maxRamCost = Math.max(0, ...ramOptions.map((x) => Number(x && x.cost || 0)));
  const maxRomCost = Math.max(0, ...romOptions.map((x) => Number(x && x.cost || 0)));
  const maxMemoryCost = (maxRamCost + maxRomCost) * procurementFactor * memoryMarketFactor * eraCostFactor;
  const commonComponentCost = maxSocCost + maxDisplayCost + maxBodyCost + maxCameraCost + maxBatteryCost + maxExtraCost;
  const logisticsCost = (36 * Number((v && v.region && v.region.logistics) || 1) + Math.max(0, (Number((v && v.region && v.region.comp) || 1) - 1) * 22)) * eraOpsFactor;
  const componentCost = commonComponentCost + maxMemoryCost;
  const assemblyCost = 80 + componentCost * 0.085;
  return Math.max(1, (componentCost + assemblyCost + logisticsCost) * marketCostFactor);
}

function calcDynamicPerfPricingDemandMul(v, unitCost, weightedSkuPrice, virtualBench, hiddenPeakUnitCostRef) {
  const y = Number(v && v.calendarYear || HISTORICAL_HANDOFF_YEAR);
  const diffName = String(v && v.startupDifficulty && v.startupDifficulty.name || '真实');
  const highPriceThreshold = diffName === '困难' ? 1.10 : 1.15;
  const maxSocLab = Math.max(1, ...socs.filter((x) => !x.retired).map((x) => estimateSocLabScoreByOption(x)));
  const maxCameraLab = Math.max(1, estimateCameraLabScoreByTopTier(y));
  const maxStorageLab = Math.max(1, estimateStorageLabScoreByTopTier());
  const maxPerf = maxSocLab + maxCameraLab + maxStorageLab;
  const currentPerf =
    Number((virtualBench && virtualBench.socLabScore) || 0)
    + Number((virtualBench && virtualBench.cameraLabScore) || 0)
    + Number((virtualBench && virtualBench.storageLabScore) || 0);
  const perfRatio = clamp(currentPerf / Math.max(1, maxPerf), 0, 1.25);
  const highPriceGate = Number(weightedSkuPrice || 0) > Number(hiddenPeakUnitCostRef || 1) * highPriceThreshold;

  let mul = 1.0;
  if (highPriceGate) {
    if (perfRatio < 0.75) {
      const t = (0.75 - perfRatio) / 0.75;
      mul *= clamp(1 - t * 0.5, 0.5, 1.0);
    } else {
      const t = (perfRatio - 0.75) / 0.25;
      mul *= clamp(1 + t * 0.18, 1.0, 1.18);
    }
  }

  if (perfRatio < 0.25) {
    const marginRatio = Number(weightedSkuPrice || 0) / Math.max(1, Number(unitCost || 0));
    let lowPerfMassMul;
    if (marginRatio <= 1.3) {
      lowPerfMassMul = 1.42;
    } else {
      const t = clamp((marginRatio - 1.3) / 1.0, 0, 1);
      lowPerfMassMul = 1.42 - t * 0.42;
    }
    mul *= clamp(lowPerfMassMul, 1.0, 1.42);
  }

  return {
    mul: clamp(mul, 0.55, 1.62),
    perfRatio
  };
}

function baselineBandClass(ratio) {
  const v = Number(ratio) || 0;
  if (v > 1.3) return 'perf-high';
  if (v < 0.9) return 'perf-low';
  return 'perf-mid';
}

function getSocGenerationIndex(socId) {
  const id = String(socId || '');
  const m = id.match(/_(?:x)?(\d+)$/i);
  if (!m) return 0;
  return Math.max(0, Number(m[1]) || 0);
}

function calcBatteryEndurance(v, screenMm, displayFeatureKeys) {
  const batteryBaseline = getBatteryBaselineByYear(v && v.calendarYear);
  const batteryWh = v.battery * 3.85 / 1000;
  const effectiveMatKey = getDisplayMaterialKeyForEra(el.dispMat.value, v && v.calendarYear);
  const baselineDim = getScreenDimensionsMm(6.67, '20:9');
  const baselineArea = baselineDim.widthMm * baselineDim.heightMm;
  const screenArea = screenMm.widthMm * screenMm.heightMm;
  const sizeRel = Math.pow(Math.max(0.5, screenArea / Math.max(1, baselineArea)), 0.72);

  const matPowerRel = {
    lcd: 1.12,
    amoled: 1.04,
    oled: 1.0,
    dual_oled: 1.28,
    eink: 0.42,
    foldable: 1.38
  };
  const matRel = matPowerRel[effectiveMatKey] || 1.0;
  const highRefreshRel = displayFeatureKeys.includes('high_refresh') ? 1.08 : 0.9;
  const ltpoRel = (displayFeatureKeys.includes('ltpo') && ['amoled', 'oled', 'dual_oled', 'foldable'].includes(effectiveMatKey)) ? 0.9 : 1.0;
  const highResRel = displayFeatureKeys.includes('high_res') ? 1.09 : 1.0;
  const colorRel = (displayFeatureKeys.includes('p3') ? 1.01 : 1.0) * (displayFeatureKeys.includes('high_pwm') ? 1.01 : 1.0);
  const screenRel = matRel * sizeRel * highRefreshRel * ltpoRel * highResRel * colorRel;

  const socPowerRel = {
    s480: 0.98,
    g35: 0.95,
    g81: 0.92,
    t7225: 0.96,
    dim6100: 0.96,
    s4g2: 0.97,
    dim6300: 1.01,
    g99: 0.99,
    s6g4: 0.98,
    s695: 0.99,
    dim7200: 0.97,
    dim7300: 0.95,
    s778g: 1.01,
    dim8300: 1.04,
    s7sg3: 1.0,
    dim8400: 1.06,
    s8sg4: 1.12,
    s8g3: 1.14,
    dim9300: 1.17,
    dim9400: 1.21,
    s8elite: 1.18,
    s8eliteg5: 1.24
  };
  const socGenIdx = getSocGenerationIndex(v.soc.id);
  // Newer SoC generations are slightly more efficient at similar performance levels.
  const socGenEfficiencyMul = clamp(1 - socGenIdx * 0.007, 0.93, 1.0);
  const socRel = (socPowerRel[v.soc.id] || 1.0) * socGenEfficiencyMul;

  const extraPowerRel = {
    satellite: 0.06,
    stereo: 0.03,
    vc: 0.02,
    semi_cooler: 0.04,
    magsafe: 0.02,
    fast_dual: 0.015,
    fast120: 0.02,
    dynamic_island: 0.005
  };
  const otherRel = 1 + v.chosenExtras.reduce((sum, x) => {
    const staticRel = Number(extraPowerRel[x.id] || 0);
    const dynamicRel = Number((x && x.powerRel) || 0);
    return sum + staticRel + dynamicRel;
  }, 0);

  const powerIndex = clamp(socRel * 0.36 + screenRel * 0.44 + otherRel * 0.2, 0.55, 1.95);
  const hasSemiCooler = Array.isArray(v.chosenExtras) && v.chosenExtras.some((x) => x.id === 'semi_cooler');
  const hoursRaw = batteryBaseline.hours * (batteryWh / batteryBaseline.batteryWh) / powerIndex;
  const hours = hasSemiCooler ? hoursRaw * 0.95 : hoursRaw;
  const endurancePct = Math.max(45, (hours / batteryBaseline.hours) * 100);
  const batteryLabScore = Math.max(35, 20 + endurancePct * 0.8);

  let onlineDemandMul = 1.0;
  let offlineDemandMul = 1.0;
  if (hours < 8) {
    const deficit = 8 - hours;
    onlineDemandMul = clamp(1 - deficit * 0.06, 0.6, 1.0);
    offlineDemandMul = clamp(1 - deficit * 0.08, 0.52, 1.0);
  } else {
    const surplus = Math.min(hours - 8, 6);
    onlineDemandMul = clamp(1 + surplus * 0.01, 1.0, 1.06);
    offlineDemandMul = clamp(1 + surplus * 0.02, 1.0, 1.12);
  }

  const tag = hours < 8
    ? '续航低于 8 小时，体验会拖累销量'
    : hours >= 11
      ? '续航表现优秀，线下接受度更高'
      : '续航中规中矩';

  return {
    baseline: batteryBaseline,
    hours,
    endurancePct,
    batteryLabScore,
    onlineDemandMul,
    offlineDemandMul,
    tag
  };
}

function evaluateBuild() {
  const v = selectedValues();
  const issues = [];
  const modelNameCheck = validateModelName(v.modelBaseName);
  const skuShareCheck = collectSkuShareValidation();

  if (!state.marketPick) issues.push('请先在第一层选择市场环境。');
  if (!v.soc || !v.body) issues.push('配置项不完整。');
  if (!modelNameCheck.ok) issues.push(modelNameCheck.msg);
  if (v.disp.size < 3.0 || v.disp.size > 9.0) issues.push('屏幕尺寸需在 3.0~9.0 英寸。');
  if (el.dispMat.value === 'foldable' && !isFoldableUnlocked()) issues.push('折叠屏需在进入第二代产品后解锁。');
  if (v.price < 200 || v.price > 19999) issues.push('定价需在 200~19999。');
  if (v.units < 1000 || v.units > 150000) issues.push('首批产量需在 1000~150000。');
  const batteryMaxCap = getBatteryCapacityMax(v.calendarYear);
  if (v.battery < 1500 || v.battery > batteryMaxCap) issues.push(`电池容量需在 1500~${batteryMaxCap}mAh。`);

  if (v.phoneH < 80 || v.phoneH > 260) issues.push('机身高度需在 80~260mm。');
  if (v.phoneW < 35 || v.phoneW > 180) issues.push('机身宽度需在 35~180mm。');
  if (v.phoneT < 3.5 || v.phoneT > 14) issues.push('机身厚度需在 3.5~14.0mm。');

  if (!v.skuPlans.length) {
    issues.push('至少配置 1 个 SKU 且首发配比大于 0%。');
  }
  if (!skuShareCheck.valid) {
    if (skuShareCheck.rows.some((x) => !x.inRange)) {
      issues.push('SKU 首发配比仅支持 0~100 的整数。');
    }
    if (skuShareCheck.rows.length >= 2) {
      issues.push(`SKU 首发配比总和需为 100%，当前为 ${Math.round(skuShareCheck.sum)}%。`);
    }
  }
  if (v.skuPlans.some((s) => !s.ram || !s.rom)) {
    issues.push('SKU 的内存或存储配置不完整。');
  }
  if (v.skuPlans.some((s) => s.price < 200 || s.price > 29999)) {
    issues.push('SKU 价格需在 200~29999 区间（基础价 + SKU 加价）。');
  }

  const sizeFactor = Math.pow(v.disp.size / 6.5, 1.15);
  const ratioFactor = aspectCostFactor[v.disp.ratio] || 1.03;
  const featureCostMultiplier = el.dispMat.value === 'eink' ? 2.8 : 1.0;
  const effectiveDispMatKey = getDisplayMaterialKeyForEra(el.dispMat.value, v.calendarYear);
  const ratioNovelty = v.disp.ratio === '4:3' || v.disp.ratio === '16:10';
  const ratioNoveltyNonFoldable = ratioNovelty && el.dispMat.value !== 'foldable' && !isLegacyDisplayEra(v.calendarYear);
  const ratioNoveltyCostMul = ratioNoveltyNonFoldable ? 1.08 : 1.0;
  const ratioNoveltyDemandMul = ratioNoveltyNonFoldable ? 0.72 : 1.0;
  const featureCost = v.disp.features.reduce((s, f) => s + f.cost, 0) * featureCostMultiplier;
  const featureScore = v.disp.features.reduce((s, f) => s + f.score, 0);
  const displayFeatureKeys = [...el.displayFeatures.querySelectorAll('input:checked')].map((i) => i.value);
  const formCost = v.disp.form.cost;
  const displayWeight = v.disp.mat.baseWeight * Math.pow(v.disp.size / 6.5, 1.1) + v.disp.features.reduce((s, f) => s + f.weight, 0);
  const bezel = getDisplayBezelGeometry(el.dispMat.value, el.dispVendor.value, el.dispForm.value, v.disp.size);
  const bezelCostFactor = clamp(1 + Math.max(0, 2.5 - bezel.sideBezel) * 0.16, 0.92, 1.28);
  const bezelDemandFactor = clamp(1.07 - Math.max(0, bezel.sideBezel - 1.5) * 0.12, 0.68, 1.08);
  const bezelScoreAdj = clamp((2.5 - bezel.sideBezel) * 4.2, -6, 6);
  const displayScoreBase = v.disp.mat.score + v.disp.vendor.scoreAdj + featureScore + v.disp.form.score + bezelScoreAdj;
  const displayScoreGrowthMul = Math.pow(1.1, Math.max(0, Number(state.displayCycle || 0)));
  const displayScore = displayScoreBase * displayScoreGrowthMul;


  const screenMm = getScreenDimensionsMm(v.disp.size, v.disp.ratio);
  const maxScreenW = v.phoneW - 2 * bezel.sideBezel;
  const maxScreenH = v.phoneH - (bezel.topBezel + bezel.bottomBezel);
  if (screenMm.widthMm > maxScreenW || screenMm.heightMm > maxScreenH) {
    issues.push(`屏幕可视区约 ${screenMm.widthMm.toFixed(1)}x${screenMm.heightMm.toFixed(1)}mm，已超过当前机身可容纳正面开口（约 ${maxScreenW.toFixed(1)}x${maxScreenH.toFixed(1)}mm）。`);
  }

  const camList = [v.cams.main, v.cams.ultra, v.cams.mono, v.cams.tele, v.cams.front].filter((x) => x.id !== 'none');
  if (v.disp.form === displayForms.udc && v.cams.front.id === 'none') issues.push('屏下前摄形态需要至少选择一个前摄模组。');
  if (v.disp.form !== displayForms.udc && v.cams.front.id !== 'none' && v.cams.front.volume > 0.9 && v.disp.form.name.includes('刘海')) {
    issues.push('大尺寸前摄模组与刘海方案冲突风险较高，建议改为挖孔/药丸或降低前摄规格。');
  }
  const hasMainCamera = v.cams.main.id !== 'none';
  const hasFrontCamera = v.cams.front.id !== 'none';
  const rearCameraCount = [v.cams.main, v.cams.ultra, v.cams.mono, v.cams.tele].filter((x) => x && x.id !== 'none').length;
  const hasMultiCamModule = v.chosenExtras.some((x) => x.id === 'multi_cam_module');
  if (Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR) < 2017 && rearCameraCount >= 2 && !hasMultiCamModule) {
    issues.push('2017年前多摄系统需额外选择“多摄模组”。');
  }
  const totalCameraCount = camList.length;
  let cameraDemandFactor = 1.0;
  let cameraDemandTag = '影像配置常规';
  if (!hasFrontCamera) {
    cameraDemandFactor *= 0.78;
    cameraDemandTag = '无前摄惩罚';
  }
  if (!hasMainCamera) {
    cameraDemandFactor *= 0.58;
    cameraDemandTag = cameraDemandTag === '影像配置常规' ? '无主摄重惩罚' : `${cameraDemandTag} + 无主摄`;
  }
  if (totalCameraCount === 0) {
    cameraDemandFactor *= 0.22;
    cameraDemandTag = '无任何摄像头极重惩罚';
  }
  cameraDemandFactor = clamp(cameraDemandFactor, 0.1, 1.0);

  const cameraCostRaw = camList.reduce((s, c) => s + c.cost, 0);
  const cameraWeight = camList.reduce((s, c) => s + c.weight, 0);
  const cameraScore = camList.reduce((s, c) => s + c.score, 0);
  const cameraVolumeRaw = camList.reduce((s, c) => s + c.volume, 0);
  // Historical-era camera stacks are generally less complex and easier to pack.
  const historicalCameraVolumeRelief = v.calendarYear < HISTORICAL_HANDOFF_YEAR
    ? clamp(1 - (HISTORICAL_HANDOFF_YEAR - v.calendarYear) * 0.012, 0.86, 1.0)
    : 1.0;
  const cameraVolume = cameraVolumeRaw * historicalCameraVolumeRelief;

  const extraCost = v.chosenExtras.reduce((s, x) => s + x.cost, 0);
  const extraWeight = v.chosenExtras.reduce((s, x) => s + x.weight, 0);
  const extraScore = v.chosenExtras.reduce((s, x) => s + x.score, 0);
  const extraDemandBoost = v.chosenExtras.reduce((s, x) => s + x.demand, 0) + v.disp.form.demand;
  const extraSpace = v.chosenExtras.reduce((s, x) => s + x.space, 0);
  const formExtraWeight = Number(v.disp.form.extraWeight || 0);
  const formExtraSpace = Number(v.disp.form.extraSpace || 0);
  const hasFlatBack = v.chosenExtras.some((x) => x.id === 'flat_back');
  const hasMatrixDeco = hasFlatBack && Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR) < 2018;
  const hasBatteryTech = v.chosenExtras.some((x) => x.id === 'battery_tech');
  const hasDynamicIsland = v.chosenExtras.some((x) => x.id === 'dynamic_island');
  const hasScreenInsurance = v.chosenExtras.some((x) => x.id === 'screen_insurance');
  const hasIp68Cert = v.chosenExtras.some((x) => x.id === 'ip68_cert');
  const hasNfcUwb = v.chosenExtras.some((x) => x.id === 'nfc_uwb');
  const hasIrBlaster = v.chosenExtras.some((x) => x.id === 'ir_blaster');
  const hasWirelessCharge = v.chosenExtras.some((x) => x.id === 'wireless_charge');
  const hasEarlyFastCharge = v.chosenExtras.some((x) => x.id === 'fast_legacy');
  const hasDualFastCharge = v.chosenExtras.some((x) => x.id === 'fast_dual');
  const hasDualCell = v.chosenExtras.some((x) => x.id === 'dual_cell');
  const hasFastCharge = v.chosenExtras.some((x) => x.id === 'fast120');
  const extraOnlineDemandMul = v.chosenExtras.reduce(
    (m, x) => m * clamp(Number(x.onlineDemandMul || 1), 0.8, 1.4),
    1
  );
  const extraThermalMul = v.chosenExtras.reduce(
    (m, x) => m * clamp(Number(x.thermalMul || 1), 0.85, 1.45),
    1
  );
  if (hasFastCharge && hasDualFastCharge) {
    issues.push('两条超级快充路径不可同时启用，请二选一。');
  }
  const isPreModernSuperFastEra = hasFastCharge && Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR) >= 2018 && Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR) < HISTORICAL_HANDOFF_YEAR;
  const preModernFastT = isPreModernSuperFastEra
    ? clamp((Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR) - 2018) / Math.max(1, HISTORICAL_HANDOFF_YEAR - 2018), 0, 1)
    : 1;
  const preModernFastThermalMul = isPreModernSuperFastEra ? (1.16 - preModernFastT * 0.16) : 1.0;
  const preModernFastReliabilityPenalty = isPreModernSuperFastEra ? (4.2 - preModernFastT * 4.2) : 0;
  if (hasFlatBack && cameraVolume > 6.0 && v.phoneT < 9.5) {
    issues.push('纯平背板与当前大体积相机组合冲突，建议增厚机身或降低相机规格。');
  }

  if (v.chosenExtras.some((x) => x.id === 'fast120') && v.battery < 4200) {
    issues.push('120W 快充通常需要更高规格电池，建议电池至少 4200mAh。');
  }

  const batteryWh = v.battery * 3.85 / 1000;
  // Mild integration uplift: keep model behavior, slightly improve packing efficiency.
  const integrationUplift = {
    battery: 0.96,
    camera: 0.96,
    display: 0.95,
    board: 0.95,
    base: 0.95,
    body: 0.96,
    extras: 0.95
  };
  const effectiveEnergyDensity = getBatteryEnergyDensityByYear(v.calendarYear);
  const dualCellVolumeMul = hasDualCell ? 1.2 : 1.0;
  const batteryVolume = (batteryWh / effectiveEnergyDensity * 1000) * dualCellVolumeMul * (hasBatteryTech ? 0.7 : 1.0) * integrationUplift.battery;
  const batteryWeight = v.battery * 0.011 + 6;
  const batteryCost = v.battery * 0.048 + 35;
  const extVolume = (v.phoneH * v.phoneW * v.phoneT) / 1000;
  const internalRatio = clamp(0.57 - (v.phoneT < 7.6 ? 0.055 : 0) + (v.phoneT > 9.5 ? 0.035 : 0), 0.48, 0.63);
  const effectiveInternalVolume = extVolume * internalRatio;
  const displayAreaCm2 = (screenMm.widthMm * screenMm.heightMm) / 100;
  const frontAreaCm2 = (v.phoneH * v.phoneW) / 100;
  const screenToBodyRatio = clamp(displayAreaCm2 / Math.max(1, frontAreaCm2), 0.45, 0.94);
  const ratioBand = getScreenRatioBand(el.dispForm.value, el.dispMat.value);
  const ratioMid = (ratioBand.min + ratioBand.max) / 2;
  const highTightness = Math.max(0, screenToBodyRatio - ratioMid);
  const lowLoose = Math.max(0, ratioMid - screenToBodyRatio);
  const ratioCostFactor = clamp(1 + highTightness * 1.1 - lowLoose * 0.25, 0.9, 1.22);
  const ratioDemandFactor =
    screenToBodyRatio < ratioBand.min
      ? clamp(0.92 - (ratioBand.min - screenToBodyRatio) * 2.2, 0.62, 0.98)
      : screenToBodyRatio > ratioBand.max
        ? clamp(0.9 - (screenToBodyRatio - ratioBand.max) * 2.6, 0.58, 0.96)
        : 1.0;
  const ratioBandWarning = (screenToBodyRatio < ratioBand.min || screenToBodyRatio > ratioBand.max)
    ? `屏占比 ${(screenToBodyRatio * 100).toFixed(1)}% 偏离建议区间 ${(ratioBand.min * 100).toFixed(0)}%-${(ratioBand.max * 100).toFixed(0)}%，会影响销量与成本。`
    : '';
  const screenRatioOvershoot = Math.max(0, screenToBodyRatio - ratioBand.max);
  const screenRatioExtremeOvershoot = Math.max(0, screenToBodyRatio - 0.95);
  // Screen-to-body above band max increases研发难度线性上升；
  // above 95% enters a steeper linear zone.
  const screenRatioRndMul = clamp(
    1 + screenRatioOvershoot * 4.8 + screenRatioExtremeOvershoot * 8.6,
    1.0,
    1.95
  );
  const screenRatioPremiumGain = clamp(
    screenRatioOvershoot * 0.32 + screenRatioExtremeOvershoot * 0.56,
    0,
    0.22
  );
  const screenRatioRepGain = clamp(
    screenRatioOvershoot * 13.5 + screenRatioExtremeOvershoot * 18.0,
    0,
    2.4
  );
  const screenRatioChallengeTag = screenRatioOvershoot > 0
    ? `高屏占比工艺（研发系数 x${screenRatioRndMul.toFixed(2)}）`
    : '屏占比工艺常规';
  const foldableSizeMul = el.dispMat.value === 'foldable' ? getFoldableSizeCostFactor(v.disp.size) : 1.0;
  const historicalDisplayCostMul = getHistoricalDisplayCostFactor(v.calendarYear, effectiveDispMatKey);
  const displayCost = ((v.disp.mat.baseCost * historicalDisplayCostMul * sizeFactor * ratioFactor + featureCost + formCost) * foldableSizeMul) * v.disp.vendor.costFactor * ratioCostFactor * bezelCostFactor * ratioNoveltyCostMul;
  const eraCostFactor = getHistoricalEraCostFactor(v.calendarYear);
  const eraOpsFactor = clamp(0.72 + eraCostFactor * 0.28, 0.72, 1.0);
  const volumePerInch = extVolume / Math.max(3.0, v.disp.size);
  let appearanceDemandFactor = 1.0;
  let appearanceDebuffTag = '外观比例正常';

  // 小屏但机身很大：当前市场审美下会显著降低吸引力。
  if (v.disp.size <= 6.0 && (v.phoneH >= 166 || v.phoneW >= 76)) {
    appearanceDemandFactor *= 0.82;
    appearanceDebuffTag = '小屏大机身惩罚';
  }
  // 屏占比偏低：边框与无效面积过大。
  if (screenToBodyRatio < 0.78) {
    appearanceDemandFactor *= clamp(0.88 + (screenToBodyRatio - 0.72) * 1.6, 0.72, 0.98);
    appearanceDebuffTag = appearanceDebuffTag === '外观比例正常' ? '低屏占比惩罚' : `${appearanceDebuffTag} + 低屏占比`;
  }
  // 机身体积相对屏幕过大：视觉笨重感。
  if (volumePerInch > 16.2) {
    appearanceDemandFactor *= clamp(1.02 - (volumePerInch - 16.2) * 0.055, 0.72, 1.0);
    appearanceDebuffTag = appearanceDebuffTag === '外观比例正常' ? '笨重外观惩罚' : `${appearanceDebuffTag} + 笨重外观`;
  }
  appearanceDemandFactor = clamp(appearanceDemandFactor, 0.62, 1.02);
  let mainstreamSizeDemandFactor = 1.0;
  let mainstreamSizeTag = '主流尺寸';
  if (v.disp.size < 5.8) {
    mainstreamSizeDemandFactor = clamp(1 - (5.8 - v.disp.size) * 0.24, 0.72, 1.0);
    mainstreamSizeTag = '小尺寸小众惩罚';
  } else if (v.disp.size > 7.0) {
    mainstreamSizeDemandFactor = clamp(1 - (v.disp.size - 7.0) * 0.9, 0.82, 1.0);
    mainstreamSizeTag = '超大尺寸小众惩罚';
  }
  const displayThickness = ({ lcd: 1.15, amoled: 1.02, oled: 0.92, dual_oled: 1.25, eink: 1.38, foldable: 1.62 })[effectiveDispMatKey] || 1.0;
  const displayVolume = (displayAreaCm2 * displayThickness / 10) * integrationUplift.display;
  const avgRamScore = v.skuPlans.length ? v.skuPlans.reduce((s, x) => s + x.ram.score * (x.share / 100), 0) : 0;
  const avgRomScore = v.skuPlans.length ? v.skuPlans.reduce((s, x) => s + x.rom.score * (x.share / 100), 0) : 0;
  const batteryEval = calcBatteryEndurance(v, screenMm, displayFeatureKeys);
  const hasVC = v.chosenExtras.some((x) => x.id === 'vc');
  const hasActiveFan = v.chosenExtras.some((x) => x.id === 'active_fan');
  const hasSemiCooler = v.chosenExtras.some((x) => x.id === 'semi_cooler');
  const isHeatPipeEra = Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR) < 2016;
  const hasHeatPipe = hasVC && isHeatPipeEra;
  const socThermalMap = {
    s480: 0.78, g35: 0.72, g81: 0.74, t7225: 0.76, dim6100: 0.8, s4g2: 0.82,
    dim6300: 0.84, g99: 0.85, s6g4: 0.92, s695: 0.9, dim7200: 0.95, dim7300: 0.96,
    s778g: 0.98, dim8300: 1.06, s7sg3: 1.02, dim8400: 1.12, s8sg4: 1.2, s8g3: 1.28,
    dim9300: 1.3, dim9400: 1.38, s8elite: 1.36, s8eliteg5: 1.48
  };
  const mainCamThermalMap = {
    none: 0.0, basic13: 0.06, ov13b10: 0.08, mx586_48: 0.12, jn1_50: 0.14, ov64b_64: 0.18,
    mx766_50: 0.2, ov50h: 0.24, gn3_50: 0.3, hp3_200: 0.36, hp2_200: 0.38, lyt900: 0.46
  };
  let socThermal = dynamicSocThermalMap[v.soc.id] ?? socThermalMap[v.soc.id] ?? 1.0;
  let mainCamThermal = dynamicMainCamThermalMap[v.cams.main.id] ?? mainCamThermalMap[v.cams.main.id] ?? 0.14;
  // Early SoC/sensors (2014-2024) have lower performance targets, thus lower thermal demand.
  if (v.calendarYear < HISTORICAL_HANDOFF_YEAR) {
    const yearsToModern = HISTORICAL_HANDOFF_YEAR - v.calendarYear;
    const historicalThermalRelief = clamp(1 - yearsToModern * 0.018, 0.8, 1.0);
    const historicalCamThermalRelief = clamp(1 - yearsToModern * 0.015, 0.83, 1.0);
    socThermal *= historicalThermalRelief;
    mainCamThermal *= historicalCamThermalRelief;
  }
  const bodyThermalFactorMap = {
    aluminum: 0.92,
    glass: 0.9,
    plastic: 1.0,
    titanium: 1.0,
    aramid: 1.08,
    ceramic: 1.12
  };
  const bodyThermalFactor = bodyThermalFactorMap[v.body.id] || 1.0;
  // Thermal dissipation is tied to exposed body surface area (mm^2).
  const bodySurfaceAreaMm2 = 2 * (v.phoneH * v.phoneW + v.phoneH * v.phoneT + v.phoneW * v.phoneT);
  const baselineSurfaceAreaMm2 = 2 * (161 * 75 + 161 * 8.6 + 75 * 8.6);
  const surfaceAreaThermalFactor = clamp(
    Math.pow(baselineSurfaceAreaMm2 / Math.max(1, bodySurfaceAreaMm2), 0.55),
    0.82,
    1.24
  );
  // Cooling tech also evolves with the component cycle: newer eras are slightly better by default.
  const coolingTechRound = clamp(Number(state.techCycle || 0), 0, 10);
  const baselineCoolingMul = clamp(1 - coolingTechRound * 0.018, 0.82, 1.0);
  // VC: reduce thermal pressure by 45%~80%.
  const vcCoolingMul = hasVC ? clamp(0.55 - coolingTechRound * 0.03, 0.2, 0.55) : 1.0;
  // Heat pipe era has 20% weaker cooling effect than VC.
  const vcCoolingMulAdjusted = hasHeatPipe
    ? clamp(1 - (1 - vcCoolingMul) * 0.8, 0.25, 1.0)
    : vcCoolingMul;
  // Active fan: reduce thermal pressure by 55%~90%.
  const fanCoolingMul = hasActiveFan ? clamp(0.45 - coolingTechRound * 0.04, 0.1, 0.45) : 1.0;
  // Semiconductor cooler: target 75%~110% reduction zone.
  // Multiplier can dip below zero to represent over-cooling headroom; final pressure is floored later.
  const semiCoolingMul = hasSemiCooler ? clamp(0.25 - coolingTechRound * 0.035, -0.1, 0.25) : 1.0;
  const thermalPressureRaw = (
    (socThermal + mainCamThermal + (totalCameraCount >= 3 ? 0.08 : 0))
      * vcCoolingMul
      * (vcCoolingMulAdjusted / Math.max(0.0001, vcCoolingMul))
      * fanCoolingMul
      * semiCoolingMul
      * baselineCoolingMul
      * bodyThermalFactor
      * surfaceAreaThermalFactor
  );
  const dualCellThermalMul = hasDualCell ? 1.11 : 1.0;
  // Slight global uplift so all SoCs are a bit easier to overheat.
  const thermalPressure = clamp(thermalPressureRaw * dualCellThermalMul * preModernFastThermalMul * extraThermalMul * 1.1, 0.02, 2.2);
  const virtualBench = calcVirtualBenchmark(
    v,
    avgRamScore,
    avgRomScore,
    displayScore,
    cameraScore,
    batteryEval.batteryLabScore,
    thermalPressure
  );
  // Memory space model (dynamic 3-tier by current option ladder):
  // lowest tier -> small, highest tier -> large, middle three -> mid.
  const weightedRomSpaceTier = v.skuPlans.length
    ? v.skuPlans.reduce((sum, sku) => {
      const rel = getRelativeTierByOptionId(sku && sku.rom && sku.rom.id, romOptions);
      const tier = rel === 'small' ? 0.86 : rel === 'large' ? 1.14 : 1.0;
      return sum + tier * (sku.share / 100);
    }, 0)
    : 1.0;
  const weightedRamSpaceTier = v.skuPlans.length
    ? v.skuPlans.reduce((sum, sku) => {
      const rel = getRelativeTierByOptionId(sku && sku.ram && sku.ram.id, ramOptions);
      const tier = rel === 'small' ? 0.9 : rel === 'large' ? 1.12 : 1.0;
      return sum + tier * (sku.share / 100);
    }, 0)
    : 1.0;
  const memoryPackageVolume = 1.38 * weightedRomSpaceTier * weightedRamSpaceTier;
  // Earlier generations: simpler performance targets and board complexity, so less occupied volume.
  const socSpaceLoad = clamp((Number(v.soc.score || 0) - 20) / 100, 0, 1.4);
  const socBoardCoreVolume = 4.8 + socSpaceLoad * 3.4 + (Number(v.soc.risk || 0) * 0.9);
  const historicalBoardRelief = v.calendarYear < HISTORICAL_HANDOFF_YEAR
    ? clamp((HISTORICAL_HANDOFF_YEAR - v.calendarYear) * 0.08, 0, 0.88)
    : 0;
  const boardVolume = Math.max(
    4.6,
    (socBoardCoreVolume + memoryPackageVolume + 1.8 - historicalBoardRelief) * integrationUplift.board
  );
  const mandatoryBaseVolume = 7.5 * integrationUplift.base;
  const occupiedVolume =
    batteryVolume
    + cameraVolume * integrationUplift.camera
    + displayVolume
    + boardVolume
    + mandatoryBaseVolume
    + v.body.structVolume * integrationUplift.body
    + (extraSpace + formExtraSpace) * integrationUplift.extras;
  const remainingVolume = effectiveInternalVolume - occupiedVolume;
  if (remainingVolume < 0) {
    issues.push(`体积超限：机身有效内部体积约 ${effectiveInternalVolume.toFixed(1)}cm³，但当前组件占用约 ${occupiedVolume.toFixed(1)}cm³。`);
  }

  const socCost = v.soc.cost * v.procurement.factor * eraCostFactor;
  const memoryMarketFactor = state.memoryMarket ? state.memoryMarket.factor : 1.0;
  const cameraCost = cameraCostRaw * v.procurement.factor * eraCostFactor;
  const bodyCost = v.body.cost * eraCostFactor;
  const displayCostForPricing = displayCost * eraCostFactor;
  const batteryCostForPricing = batteryCost * eraCostFactor;
  const extraCostForPricing = extraCost * eraCostFactor;
  const commonComponentCost = socCost + displayCostForPricing + bodyCost + cameraCost + batteryCostForPricing + extraCostForPricing;
  const logisticsCost = (36 * v.region.logistics + Math.max(0, (v.region.comp - 1) * 22)) * eraOpsFactor;
  const marketCostFactor = state.marketPick ? state.marketPick.cost : 1;
  const skuCosting = v.skuPlans.map((sku) => {
    const memoryCost = (sku.ram.cost + sku.rom.cost) * v.procurement.factor * memoryMarketFactor * eraCostFactor;
    const componentCost = commonComponentCost + memoryCost;
    const assemblyCost = 80 + componentCost * 0.085;
    const unitCost = (componentCost + assemblyCost + logisticsCost) * marketCostFactor;
    return {
      ...sku,
      memoryCost,
      componentCost,
      unitCost
    };
  });
  const memoryCost = skuCosting.reduce((s, x) => s + x.memoryCost * (x.share / 100), 0);
  const componentCost = skuCosting.reduce((s, x) => s + x.componentCost * (x.share / 100), 0);
  const unitCost = skuCosting.reduce((s, x) => s + x.unitCost * (x.share / 100), 0);
  const weightedSkuPrice = skuCosting.reduce((s, x) => s + x.price * (x.share / 100), 0);
  const hiddenPeakUnitCostRef = calcHiddenPeakUnitCostReference(v, {
    eraCostFactor,
    eraOpsFactor,
    memoryMarketFactor
  });
  const perfPricingDemand = calcDynamicPerfPricingDemandMul(
    v,
    unitCost,
    weightedSkuPrice,
    virtualBench,
    hiddenPeakUnitCostRef
  );
  const currentSpecSnapshot = buildSpecSnapshotFromInput(v, weightedSkuPrice, v.skuPlans);
  const lastSpecSnapshot = getLastGenerationSpecSnapshot();
  const novelty = calcGenerationNovelty(currentSpecSnapshot, lastSpecSnapshot, v.startupDifficulty?.name || '真实');

  const procurementUpfront = v.procurement.upfront * clamp(1.06 - (v.region.supplyEco - 1) * 0.55, 0.84, 1.15) * eraOpsFactor;
  const supplyStability = clamp(v.procurement.supply * v.region.supplyEco, 0.82, 1.25);
  const contractCoverageUnits = v.procurement.coverageMultiplier > 0
    ? Math.ceil(v.units * v.procurement.coverageMultiplier)
    : 0;
  const lockCommitUnits = Math.max(0, contractCoverageUnits - v.units);
  const lockCommitCost = lockCommitUnits * unitCost * (v.procurement.lockCommitRate || 0) * eraOpsFactor;

  const complexity = (v.soc.risk + camList.length * 0.08 + v.chosenExtras.length * 0.05 + (displayScore > 85 ? 0.08 : 0));
  const rdCostFactor = clamp(1.12 - (v.region.rdTalent - 1) * 0.58, 0.86, 1.18);
  const rndCost = (1_050_000 * complexity + (displayCostForPricing + cameraCost) * 400) * rdCostFactor * screenRatioRndMul * eraOpsFactor;
  const firstBatchCost = unitCost * v.units;
  const initialCost = rndCost + firstBatchCost + procurementUpfront + lockCommitCost + v.campaign.launchCost * eraOpsFactor;

  const boardWeight = 68;
  const totalWeight = boardWeight + displayWeight + v.body.weight + batteryWeight + cameraWeight + extraWeight + formExtraWeight;

  const geekExtras = new Set(['usb3', 'vc', 'semi_cooler', 'satellite', 'fast120', 'magsafe']);
  const geekBonus = v.chosenExtras.reduce((s, x) => s + (geekExtras.has(x.id) ? 1 : 0), 0) * 2.2;
  const hasFlagshipSoc = v.soc.tier.includes('旗舰');
  const isUltraFlagshipSoc = v.soc.tier.includes('旗舰+');
  const hasOneInchMain = ['lyt900'].includes(v.cams.main.id);
  const hasLargeMain = ['mx766_50', 'ov50h', 'gn3_50', 'hp3_200', 'hp2_200', 'lyt900'].includes(v.cams.main.id);
  const hasCameraMatrix = v.cams.main.id !== 'none' && v.cams.ultra.id !== 'none' && v.cams.tele.id !== 'none';
  const hasUsb3 = v.chosenExtras.some((x) => x.id === 'usb3');
  const thermalDemandMul = clamp(1.03 - Math.max(0, thermalPressure - 1) * 0.22, 0.74, 1.03);
  const thermalQualityPenalty = clamp(Math.max(0, thermalPressure - 1) * 8, 0, 9);
  const qualityScore = clamp(
    0.34 * v.soc.score
      + 0.18 * displayScore
      + 0.14 * (avgRamScore + avgRomScore)
      + 0.2 * cameraScore
      + 0.07 * v.body.score
      + 0.07 * extraScore
      + (v.battery >= 5000 ? 4 : -1)
      + (batteryEval.endurancePct - 100) * 0.05
      + (virtualBench.total - 100) * 0.05
      - (hasDualCell ? 2.8 : 0)
      - preModernFastReliabilityPenalty
      - thermalQualityPenalty
      + (v.region.rdTalent - 1) * 8.5,
    15,
    100
  );
  const thermalTag = thermalPressure >= 1.45
    ? '高热风险（建议 VC + 更大机身表面积）'
    : thermalPressure >= 1.15
      ? '散热压力中等'
      : '散热压力可控';
  const manyDisplayFeatures = v.disp.features.length >= 3;
  const isSmallScreen = v.disp.size < 5.5;
  const geekSpecialBonus =
    (v.battery >= 7000 ? 9 : v.battery >= 6200 ? 6 : 0)
    + (hasOneInchMain ? 10 : hasLargeMain ? 4 : 0)
    + (hasCameraMatrix ? 6 : 0)
    + (isSmallScreen ? 6 : 0)
    + (el.dispMat.value === 'lcd' && manyDisplayFeatures ? 7 : 0)
    + (el.dispMat.value === 'eink' && v.disp.features.length >= 2 ? 9 : 0)
    + (el.dispMat.value === 'dual_oled' ? 8 : 0)
    + (hasUsb3 ? 6 : 0)
    + (hasVC ? 5 : 0)
    + (hasActiveFan ? 6 : 0)
    + (hasSemiCooler ? 8 : 0)
    + (isUltraFlagshipSoc ? 12 : hasFlagshipSoc ? 8 : 0);
  const geekAttraction = clamp(
    v.soc.score * 0.4 + cameraScore * 0.24 + (featureScore + v.disp.form.score) * 0.32 + geekBonus + geekSpecialBonus + virtualBench.benchmarkGeekBonus,
    0,
    100
  );

  const appearanceRetailBoost = clamp(
    0.86
      + (screenToBodyRatio - 0.78) * 1.1
      + (bezelDemandFactor - 0.85) * 0.72
      + (appearanceDemandFactor - 0.82) * 0.95,
    0.72,
    1.3
  );
  const offlinePreferencePoints =
    (displayFeatureKeys.includes('eye') ? 4 : 0)
    + (displayFeatureKeys.includes('ltpo') ? 4 : 0)
    + (displayFeatureKeys.includes('p3') ? 3 : 0)
    + (v.chosenExtras.some((x) => x.id === 'magsafe') ? 3 : 0)
    + (hasWirelessCharge ? 3 : 0)
    + (v.chosenExtras.some((x) => x.id === 'fast120') ? 4 : 0)
    + (v.chosenExtras.some((x) => x.id === 'gps_dual') ? 2 : 0)
    + (v.cams.front.id === 'front_g1sq' || String(v.cams.front.id || '').startsWith('front_g1sq_x') ? 8 : 0);
  const offlinePreferenceBoost = clamp(1 + offlinePreferencePoints * 0.018, 1.0, 1.28);
  const premiumPriceToleranceCarry = state.premiumPriceToleranceCarry || 1.0;
  const premiumOnlineDemandCarry = state.premiumOnlineDemandCarry || 1.0;
  const premiumOfflineDemandCarry = state.premiumOfflineDemandCarry || 1.0;

  const popFactor = clamp(Math.sqrt(v.marketStats.population / 150), 0.72, 1.5);
  const foldableOnlineBoost = el.dispMat.value === 'foldable'
    ? clamp(1.06 + (v.disp.size - 7.0) * 0.06, 1.06, 1.22)
    : 1.0;
  const foldableOfflineBoost = el.dispMat.value === 'foldable'
    ? clamp(1.14 + (v.disp.size - 7.0) * 0.1, 1.14, 1.36)
    : 1.0;
  const bodyChannelPreference = {
    online: v.body.id === 'aramid' ? 1.1 : (v.body.id === 'wood' ? 1.08 : 1.0),
    offline: v.body.id === 'ceramic' ? 1.1 : (v.body.id === 'wood' ? 1.08 : 1.0)
  };
  const onlinePotentialRaw = clamp(
    0.68
      + v.marketStats.onlinePenetration * v.marketing.online * v.region.onlineInfra
      + (geekAttraction / 100) * 0.48 * v.marketing.geekBoost,
    0.72,
    1.65
  );
  const offlinePotentialRaw = clamp(
    (0.82 + (1 - v.marketStats.onlinePenetration) * v.marketing.offline * v.region.offlineInfra) * appearanceRetailBoost * offlinePreferenceBoost,
    0.75,
    1.46
  );
  const onlinePotential = clamp(
    (onlinePotentialRaw + (hasDynamicIsland ? 0.08 : 0) + Number(v.disp.form.onlineAdj || 0))
      * foldableOnlineBoost
      * bodyChannelPreference.online
      * (hasScreenInsurance ? 1.03 : 1.0)
      * (hasIp68Cert ? 1.024 : 1.0)
      * (hasNfcUwb ? 1.022 : 1.0)
      * (hasIrBlaster ? 1.018 : 1.0)
      * (hasWirelessCharge ? 1.025 : 1.0)
      * (hasEarlyFastCharge ? 1.05 : 1.0)
      * ((Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR) < 2017 && rearCameraCount >= 2) ? 1.14 : 1.0)
      * (hasDualFastCharge ? 1.1 : 1.0)
      * (hasDualCell ? 1.06 : 1.0)
      * (hasHeatPipe ? 1.12 : 1.0)
      * extraOnlineDemandMul
      * premiumOnlineDemandCarry
      * batteryEval.onlineDemandMul,
    0.58,
    2.2
  );
  const offlinePotential = clamp(
    (offlinePotentialRaw + (hasDynamicIsland ? 0.06 : 0) + Number(v.disp.form.offlineAdj || 0) + (v.cams.front.id === 'front_g1sq' || String(v.cams.front.id || '').startsWith('front_g1sq_x') ? 0.09 : 0))
      * foldableOfflineBoost
      * bodyChannelPreference.offline
      * (hasScreenInsurance ? 1.1 : 1.0)
      * (hasIp68Cert ? 1.03 : 1.0)
      * (hasWirelessCharge ? 1.085 : 1.0)
      * (hasEarlyFastCharge ? 1.045 : 1.0)
      * (hasDualFastCharge ? 1.12 : 1.0)
      * (hasMatrixDeco ? 1.14 : 1.0)
      * premiumOfflineDemandCarry
      * batteryEval.offlineDemandMul,
    0.5,
    2.25
  );
  const channelFactor = onlinePotential * 0.62 + offlinePotential * 0.38;
  const onlineShare = clamp(
    (onlinePotential * v.marketStats.onlinePenetration) / (onlinePotential * v.marketStats.onlinePenetration + offlinePotential * (1 - v.marketStats.onlinePenetration)),
    0.28,
    0.9
  );
  const offlineShare = 1 - onlineShare;
  const offlineCostIndex = clamp(v.region.labor * 0.52 + v.region.rent * 0.48, 0.78, 1.65);
  const onlineCostIndex = clamp(1.0 + (v.region.logistics - 1) * 0.24 - (v.region.onlineInfra - 1) * 0.1, 0.86, 1.3);

  const pricePressure = clamp(weightedSkuPrice / (unitCost * 1.85), 0.55, 1.7);
  const priceFit = clamp(1.32 - (pricePressure - v.region.tolerance * 0.95 * premiumPriceToleranceCarry), 0.4, 1.55);
  const yearPriceBand = getYearPricePreferenceBand(v.calendarYear);
  const yearPricePrefOnline = calcPreferredBandMul(weightedSkuPrice, yearPriceBand, {
    inBandBoost: 1.12,
    edgeMul: 1.0,
    outDropPerSpan: 0.3,
    floor: 0.56
  });
  const yearPricePrefOffline = calcPreferredBandMul(weightedSkuPrice, yearPriceBand, {
    inBandBoost: 1.1,
    edgeMul: 1.0,
    outDropPerSpan: 0.28,
    floor: 0.6
  });
  const lowPriceMassBaseMul = calcLowPriceMassBaseMul(weightedSkuPrice, v.calendarYear);
  const entryTierBaseMul = clamp(
    1
      + (String(v.soc.tier || '').includes('入门') ? 0.08 : 0)
      + (String(v.soc.tier || '').includes('中低端') ? 0.04 : 0)
      + (weightedSkuPrice <= 1599 ? 0.06 : weightedSkuPrice <= 1999 ? 0.04 : 0),
    1,
    1.2
  );
  // 性价比旗舰加成：
  // 条件：SoC 处于中高端/次旗舰/旗舰(+)，且存在至少一个 SKU 同时使用中档及以上内存与存储；
  // 当售价/成本 < 2.0 启动加成，越接近 1.3（成本+30%）增益越大，<=1.3 达到上限。
  const isHighSocForValue =
    String(v.soc.tier || '').includes('中高端')
    || String(v.soc.tier || '').includes('次旗舰')
    || String(v.soc.tier || '').includes('旗舰');
  const hasMidHighMemSku = (v.skuPlans || []).some((sku) => {
    if (!sku || !sku.ram || !sku.rom) return false;
    const ramTier = getRelativeTierByOptionId(sku.ram.id, ramOptions);
    const romTier = getRelativeTierByOptionId(sku.rom.id, romOptions);
    return ramTier !== 'small' && romTier !== 'small';
  });
  const valuePriceRatio = weightedSkuPrice / Math.max(1, unitCost);
  let valueChampionMul = 1.0;
  if (isHighSocForValue && hasMidHighMemSku && valuePriceRatio < 2.0) {
    if (valuePriceRatio <= 1.3) {
      valueChampionMul = 1.38;
    } else {
      const t = clamp((2.0 - valuePriceRatio) / 0.7, 0, 1);
      valueChampionMul = 1 + t * 0.38;
    }
  }
  const priceToCostRatio = Math.max(0, weightedSkuPrice / Math.max(1, unitCost));
  const pricingImmunity = state.rating > 90;
  const linearStartRatio = state.rating > 75 ? 2.0 : 1.75;
  const exponentialStartRatio = state.rating > 75 ? 3.25 : 3.0;
  let pricingCredibilityMul = 1.0;
  if (!pricingImmunity && priceToCostRatio > linearStartRatio) {
    if (priceToCostRatio <= exponentialStartRatio) {
      // Between linearStart and exponentialStart: linear demand penalty.
      const linearT = (priceToCostRatio - linearStartRatio) / Math.max(0.01, (exponentialStartRatio - linearStartRatio));
      pricingCredibilityMul = clamp(1 - linearT * 0.4, 0.6, 1.0);
    } else {
      // Above exponentialStart: demand drops exponentially.
      const extra = priceToCostRatio - exponentialStartRatio;
      pricingCredibilityMul = clamp(0.6 * Math.exp(-extra * 0.9), 0.08, 0.6);
    }
  }
  const pricingWarningLevel = pricingImmunity
    ? 'immune'
    : priceToCostRatio > exponentialStartRatio
    ? 'critical'
    : priceToCostRatio > linearStartRatio
      ? 'warn'
      : 'none';
  const designDemandElasticity = clamp(
    Math.pow(clamp(qualityScore / 72, 0.45, 1.5), 1.35)
      * Math.pow(clamp(priceFit, 0.45, 1.5), 1.55)
      * Math.pow(clamp(appearanceDemandFactor * ratioDemandFactor * bezelDemandFactor, 0.45, 1.3), 1.2)
      * cameraDemandFactor
      * thermalDemandMul
      * mainstreamSizeDemandFactor
      * ratioNoveltyDemandMul
      * v.startupDifficulty.designElasticity,
    0.18,
    1.95
  );
  const launchTrustFactor = clamp(
    (0.44
      + (qualityScore - 60) / 220
      + (geekAttraction - 50) / 320
      + (v.region.rdTalent - 1) * 0.22
      - Math.max(0, weightedSkuPrice - 2999) / 13000
      - Math.max(0, v.units - 18000) / 120000)
      * v.startupDifficulty.trust,
    0.2,
    0.8
  );
  // Multi-lane demand model: online and offline react to different design traits.
  const onlineMarketWeight = clamp(v.marketStats.onlinePenetration, 0.25, 0.92);
  const offlineMarketWeight = 1 - onlineMarketWeight;
  const hasHighEndMemorySku = skuCosting.some((s) => {
    if (!s || !s.ram || !s.rom) return false;
    return getRamCapacityGb(s.ram) >= 16 && getRomCapacityGb(s.rom) >= 960;
  });
  const hasProCameraPack = hasOneInchMain || (hasCameraMatrix && hasLargeMain);
  const featureBreadth = clamp(
    0.84
      + v.chosenExtras.length * 0.028
      + v.disp.features.length * 0.02
      + (hasDynamicIsland ? 0.025 : 0),
    0.72,
    1.34
  );
  const premiumSignal = clamp(
    0.9
      + (isUltraFlagshipSoc ? 0.14 : hasFlagshipSoc ? 0.08 : 0)
      + (hasProCameraPack ? 0.1 : 0)
      + (hasHighEndMemorySku ? 0.08 : 0)
      + Math.max(0, (virtualBench.total - 110) / 420),
    0.82,
    1.42
  );
  const perfAcceptance = clamp(
    0.76
      + Math.max(0, (virtualBench.total - 85) / 180)
      + Math.max(0, (qualityScore - 58) / 260),
    0.62,
    1.48
  );
  const aestheticAcceptance = clamp(
    0.72
      + (appearanceDemandFactor - 0.74) * 0.72
      + (bezelDemandFactor - 0.78) * 0.66
      + (ratioDemandFactor - 0.78) * 0.56
      + (mainstreamSizeDemandFactor - 0.8) * 0.5
      + (screenToBodyRatio >= 0.87 ? 0.03 : 0),
    0.58,
    1.45
  );
  const materialOnlinePref = clamp(
    0.92
      + (v.body.id === 'aramid' ? 0.08 : 0)
      + (v.body.id === 'wood' ? 0.06 : 0)
      + (v.body.id === 'titanium' ? 0.05 : 0)
      + (el.dispMat.value === 'foldable' ? 0.09 : 0)
      + (el.dispMat.value === 'eink' ? 0.05 : 0)
      - (v.body.id === 'plastic' ? 0.04 : 0),
    0.78,
    1.3
  );
  const materialOfflinePref = clamp(
    0.92
      + (v.body.id === 'ceramic' ? 0.1 : 0)
      + (v.body.id === 'wood' ? 0.06 : 0)
      + (v.body.id === 'titanium' ? 0.06 : 0)
      + (v.body.id === 'glass' ? 0.04 : 0)
      + (el.dispMat.value === 'foldable' ? 0.12 : 0)
      - (el.dispMat.value === 'eink' ? 0.06 : 0)
      - (v.body.id === 'plastic' ? 0.06 : 0),
    0.74,
    1.36
  );
  const onlinePriceAcceptance = clamp(
    clamp(
      1.0
        + (priceFit - 1) * 0.6
        + (premiumSignal - 1) * 0.22
        - Math.max(0, pricePressure - 1.08) * 0.26,
      0.64,
      1.28
    ) * yearPricePrefOnline,
    0.5,
    1.45
  );
  const offlinePriceAcceptance = clamp(
    clamp(
      0.98
        + (priceFit - 1) * 0.48
        + (aestheticAcceptance - 1) * 0.16
        - Math.max(0, pricePressure - 1.05) * 0.32,
      0.58,
      1.24
    ) * yearPricePrefOffline,
    0.5,
    1.42
  );
  const flagshipCameraCount = [v.cams.main, v.cams.ultra, v.cams.mono, v.cams.tele].filter((c) => c && c.id !== 'none' && Number(c.score || 0) >= 34).length;
  const hasMultipleFlagshipCams = flagshipCameraCount >= 2;
  const isHighQualityLcd = el.dispMat.value === 'lcd' && v.disp.features.length >= 3 && displayScore >= 62;
  const isBigScreen = v.disp.size >= 6.7;
  const isHighScreenBody = screenToBodyRatio >= 0.89;
  const isSlimPhone = v.phoneT <= 8.1 && totalWeight <= 215;
  const isThinPhone = v.phoneT <= 7.8;
  const isLightPhone = totalWeight <= 190;
  const isUltraThinLightPhone = v.phoneT <= 7.2 && totalWeight <= 172;
  const isEarlySlimEra = Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR) >= 2014
    && Number(v.calendarYear || HISTORICAL_HANDOFF_YEAR) <= 2019;
  const earlySlimDemandMulOnline = isEarlySlimEra
    ? clamp(
      1
        + (isThinPhone ? 0.08 : 0)
        + (isLightPhone ? 0.08 : 0)
        + (isUltraThinLightPhone ? 0.06 : 0),
      1,
      1.24
    )
    : 1;
  const earlySlimDemandMulOffline = isEarlySlimEra
    ? clamp(
      1
        + (isThinPhone ? 0.1 : 0)
        + (isLightPhone ? 0.06 : 0)
        + (isUltraThinLightPhone ? 0.06 : 0),
      1,
      1.24
    )
    : 1;
  const isImagingStrong = Number(virtualBench.cameraLabScore || 0) >= 112 || cameraScore >= 88;
  const onlineGeekPreference = clamp(
    0.86
      + (v.disp.size < 6.0 ? 0.12 : 0)
      + (el.dispMat.value === 'lcd' ? 0.08 : 0)
      + (isHighQualityLcd ? 0.08 : 0)
      + (el.dispMat.value === 'eink' ? 0.16 : 0)
      + (hasFlagshipSoc ? 0.1 : 0)
      + (isUltraFlagshipSoc ? 0.04 : 0),
    0.66,
    1.46
  );
  const offlineMassPreference = clamp(
    0.84
      + (isBigScreen ? 0.11 : 0)
      + (isHighScreenBody ? 0.1 : 0)
      + (isSlimPhone ? 0.08 : 0)
      + (hasMultipleFlagshipCams ? 0.1 : 0)
      + (isImagingStrong ? 0.08 : 0),
    0.64,
    1.5
  );
  const onlineDesignDemand = clamp(
    perfAcceptance
      * featureBreadth
      * premiumSignal
      * materialOnlinePref
      * onlinePriceAcceptance
      * onlineGeekPreference
      * earlySlimDemandMulOnline
      * thermalDemandMul
      * batteryEval.onlineDemandMul
      * clamp(0.82 + geekAttraction / 150, 0.75, 1.5),
    0.4,
    2.35
  );
  const offlineDesignDemand = clamp(
    clamp(0.84 + qualityScore / 175, 0.78, 1.4)
      * featureBreadth
      * aestheticAcceptance
      * materialOfflinePref
      * offlinePriceAcceptance
      * offlineMassPreference
      * earlySlimDemandMulOffline
      * batteryEval.offlineDemandMul
      * clamp(0.8 + offlinePreferenceBoost * 0.3 + appearanceRetailBoost * 0.24, 0.72, 1.5),
    0.42,
    2.45
  );
  const onlineStructuralDemand = clamp(
    onlinePotential
      * (0.88 + v.marketing.online * 0.22)
      * (0.9 + v.region.onlineInfra * 0.14)
      * onlineMarketWeight,
    0.22,
    2.2
  );
  const offlineStructuralDemand = clamp(
    offlinePotential
      * (0.88 + v.marketing.offline * 0.2)
      * (0.9 + v.region.offlineInfra * 0.16)
      * offlineMarketWeight,
    0.22,
    2.3
  );
  const demandScaleBase = 4_600
    * v.startupDifficulty.baseDemand
    * v.region.demand
    * popFactor
    * designDemandElasticity
    * novelty.demandMul
    * v.campaign.demand
    * (state.marketPick ? state.marketPick.demand : 1)
    * launchTrustFactor
    * (1 + extraDemandBoost)
    * pricingCredibilityMul
    * getHistoricalDemandTuning(v.calendarYear).demandMul
    * lowPriceMassBaseMul
    * entryTierBaseMul
    * valueChampionMul
    * perfPricingDemand.mul
    / (v.region.comp / supplyStability);
  const onlineDemandTrack = onlineStructuralDemand * onlineDesignDemand;
  const offlineDemandTrack = offlineStructuralDemand * offlineDesignDemand;
  const baseDemand = demandScaleBase * (onlineDemandTrack * 0.56 + offlineDemandTrack * 0.44);
  const featureDemandBaseline = calcFeatureDemandBaselineFromInput(v);

  const grossMargin = (weightedSkuPrice - unitCost) / Math.max(1, weightedSkuPrice);
  let strategy = '均衡';
  if (v.soc.tier.includes('旗舰') && v.units < 20000 && weightedSkuPrice > 4999) strategy = '高端小批量高风险';
  if (v.soc.tier.includes('入门') && v.units > 30000 && weightedSkuPrice < 1999) strategy = '走量低端低风险';

  return {
    issues,
    input: v,
    modelNameCheck,
    modelGeneration: getNextGenerationIndex(),
    modelName: modelNameCheck.ok ? composeModelName(modelNameCheck.name, getNextGenerationIndex()) : '',
    displayCost: displayCostForPricing,
    displayWeight,
    screenMm,
    batteryVolume,
    extVolume,
    effectiveInternalVolume,
    occupiedVolume,
    remainingVolume,
    ratioBand,
    ratioBandWarning,
    screenRatioOvershoot,
    screenRatioExtremeOvershoot,
    screenRatioRndMul,
    screenRatioPremiumGain,
    screenRatioRepGain,
    screenRatioChallengeTag,
    ratioCostFactor,
    ratioDemandFactor,
    bezel,
    bezelCostFactor,
    bezelDemandFactor,
    screenToBodyRatio,
    volumePerInch,
    appearanceDemandFactor,
    appearanceDebuffTag,
    mainstreamSizeDemandFactor,
    mainstreamSizeTag,
    cameraDemandFactor,
    cameraDemandTag,
    thermalPressure,
    thermalDemandMul,
    thermalTag,
    ratioNoveltyCostMul,
    ratioNoveltyDemandMul,
    ratioNoveltyNonFoldable,
    foldableSizeMul,
    foldableOnlineBoost,
    foldableOfflineBoost,
    premiumPriceToleranceCarry,
    premiumOnlineDemandCarry,
    premiumOfflineDemandCarry,
    socCost,
    cameraCost,
    memoryCost,
    bodyCost,
    extraCost: extraCostForPricing,
    eraCostFactor,
    weightedSkuPrice,
    skuCosting,
    componentCost,
    unitCost,
    rndCost,
    firstBatchCost,
    initialCost,
    rdCostFactor,
    procurementUpfront,
    lockCommitCost,
    lockCommitUnits,
    supplyStability,
    contractCoverageUnits,
    totalWeight,
    qualityScore,
    geekAttraction,
    virtualBench,
    batteryEval,
    onlineShare,
    offlineShare,
    appearanceRetailBoost,
    offlinePreferenceBoost,
    avgMemScore: avgRamScore + avgRomScore,
    onlineCostIndex,
    offlineCostIndex,
    channelFactor,
    onlineDesignDemand,
    offlineDesignDemand,
    onlineDemandTrack,
    offlineDemandTrack,
    popFactor,
    designDemandElasticity,
    launchTrustFactor,
    baseDemand,
    grossMargin,
    strategy,
    priceFit,
    priceToCostRatio,
    pricingCredibilityMul,
    pricingWarningLevel,
    pricingImmunity,
    pricingLinearStartRatio: linearStartRatio,
    pricingExponentialStartRatio: exponentialStartRatio,
    hiddenPeakUnitCostRef,
    perfPricingDemandMul: perfPricingDemand.mul,
    perfPricingRatio: perfPricingDemand.perfRatio,
    valueChampionMul,
    memoryMarketFactor,
    noveltyScore: novelty.score,
    noveltyDemandMul: novelty.demandMul,
    noveltyTag: novelty.tag,
    noveltyWarning: novelty.warning,
    featureDemandBaseline,
    specSnapshot: currentSpecSnapshot
  };
}

function renderPreview() {
  const e = evaluateBuild();
  frontPreviewAnimEval = e;
  renderPhonePreview(e);
  renderPhoneFrontPreview(e);
  updateFrontPreviewPopupAnimState();
  const volumeOk = e.remainingVolume >= 0;
  const maxScreenW = e.input.phoneW - 2 * e.bezel.sideBezel;
  const maxScreenH = e.input.phoneH - (e.bezel.topBezel + e.bezel.bottomBezel);
  const screenFit = e.screenMm.widthMm <= maxScreenW && e.screenMm.heightMm <= maxScreenH;
  const benchmarkClass = baselineBandClass(e.virtualBench.baselineRatio);
  const enduranceRatio = (e.batteryEval.endurancePct || 0) / 100;
  const enduranceClass = baselineBandClass(enduranceRatio);
  const issueItems = [
    ...e.issues,
    ...(screenFit ? [] : ['屏幕开口与机身可容纳空间不匹配。']),
    ...(volumeOk ? [] : ['机内空间不足，请缩减部件体积或增大机身。'])
  ];
  const uniqIssues = Array.from(new Set(issueItems));
  const issueHtml = uniqIssues.length
    ? `<ul class="health-list">${uniqIssues.map((x) => `<li class="bad">${x}</li>`).join('')}</ul>`
    : '<div class="good">未发现硬性设计冲突，可以立项开售。</div>';

  const compactRows = [
    { t: '行业年份', b: `<strong>${e.input.calendarYear}</strong>` },
    { t: '机型', b: `<strong>${e.modelName || 'Neo Gen?'}</strong>` },
    {
      t: '单台制造成本',
      b: e.pricingWarningLevel === 'critical'
        ? `<span class="bad"><strong>${RMB(e.unitCost)}</strong>｜注意售价</span>`
        : `<strong>${RMB(e.unitCost)}</strong>`
    },
    { t: `${BENCHMARK_NAME} 得分`, b: `<span class="${benchmarkClass}"><strong>${e.virtualBench.total}</strong>（基线 ${benchmarkRatioText(e.virtualBench.baselineRatio)}）</span>` },
    { t: '续航评测', b: `<span class="${enduranceClass}"><strong>${e.batteryEval.hours.toFixed(1)} 小时</strong>（基线 ${Math.round(e.batteryEval.endurancePct)}%）</span>` },
    { t: '换代新鲜度', b: `${e.noveltyDemandMul < 1 ? `<span class="bad"><strong>${e.noveltyTag}</strong>（需求系数 x${e.noveltyDemandMul.toFixed(2)}）</span>${e.noveltyWarning ? `｜${e.noveltyWarning}` : ''}` : `<span class="good"><strong>${e.noveltyTag}</strong></span>`}` },
    { t: '屏幕-机身关系', b: `屏幕约 ${e.screenMm.widthMm.toFixed(1)} x ${e.screenMm.heightMm.toFixed(1)} mm｜机身可容纳开口约 ${maxScreenW.toFixed(1)} x ${maxScreenH.toFixed(1)} mm｜${screenFit ? '<span class="good">匹配正常</span>' : '<span class="bad">尺寸冲突</span>'}` },
    { t: '设计问题检查', b: issueHtml }
  ];
  el.previewBox.innerHTML = compactRows
    .map((row) => `<div class="overview-item"><div class="overview-title">${row.t}</div><div class="overview-body">${row.b}</div></div>`)
    .join('');

  const launchStockTension = clamp((Math.round(e.baseDemand) - e.input.units) / Math.max(1, Math.round(e.baseDemand)), -0.6, 0.95);
  const returnProfile = calcQualityReturnProfile(e);
  const skuMixText = e.skuCosting
    .map((s) => `${s.name} ${s.ram.name}+${s.rom.name}`)
    .join(' / ');
  const stockAdvice = launchStockTension > 0.12
    ? '<span class="risk-warn">首发备货偏保守，容易断货</span>'
    : launchStockTension < -0.25
      ? '<span class="risk-warn">首发备货偏激进，注意压货</span>'
      : '<span class="good">首发备货节奏平衡</span>';
  const screenRatioBenefitParts = [];
  if ((e.screenRatioRepGain || 0) > 0) screenRatioBenefitParts.push(`口碑 +${(e.screenRatioRepGain || 0).toFixed(1)}`);
  if ((e.screenRatioPremiumGain || 0) > 0) screenRatioBenefitParts.push(`下代高价接受度 +${((e.screenRatioPremiumGain || 0) * 100).toFixed(1)}%`);

  const thermalPerfImpact = e.virtualBench.socOverheatSec < 6
    ? (e.virtualBench.socThermalPenaltyRatio <= 0.75
      ? '<span class="bad">严重影响性能</span>'
      : '<span class="risk-warn">轻微影响性能</span>')
    : '<span class="good">性能释放稳定</span>';

  if (el.previewDetailBox) {
    const benchBaseline = e.virtualBench && e.virtualBench.benchmarkBaseline
      ? e.virtualBench.benchmarkBaseline
      : getBenchmarkBaselineByYear(e.input && e.input.calendarYear);
    el.previewDetailBox.innerHTML = [
      `行业年份：<strong>${e.input.calendarYear}</strong>`,
      `机型：<strong>${e.modelName || 'Neo Gen?'}</strong>｜定位：<strong>${e.strategy}</strong>`,
      `市场氛围：${state.marketPick ? state.marketPick.name : '常态竞争'}。${state.marketPick ? state.marketPick.text : ''}`,
      `区域画像：${regionNarrative(e.input.region)}`,
      `渠道建议：${channelNarrative(e.onlineShare)}`,
      `设计驱动：线上轨道 x${e.onlineDemandTrack.toFixed(2)}（设计适配 x${e.onlineDesignDemand.toFixed(2)}）｜线下轨道 x${e.offlineDemandTrack.toFixed(2)}（设计适配 x${e.offlineDesignDemand.toFixed(2)}）`,
      `${BENCHMARK_NAME}：综合 <strong>${e.virtualBench.total}</strong>｜SoC ${e.virtualBench.socLabScore}｜存储 ${e.virtualBench.storageLabScore}｜屏幕 ${e.virtualBench.displayLabScore}｜影像 ${e.virtualBench.cameraLabScore}｜续航 ${e.virtualBench.batteryLabScore}`,
      `基线对照：<strong>${benchBaseline.name}</strong> = ${benchBaseline.total}；当前为基线的 ${benchmarkRatioText(e.virtualBench.baselineRatio)}（${e.virtualBench.baselineTag}）`,
      `续航评测：约 <strong>${e.batteryEval.hours.toFixed(1)} 小时</strong>（${(e.batteryEval.baseline && e.batteryEval.baseline.name) || BATTERY_BASELINE.name}=100%，当前 ${Math.round(e.batteryEval.endurancePct)}%）｜${e.batteryEval.tag}`,
      `换代新鲜度：${e.noveltyDemandMul < 1 ? `<span class="bad">${e.noveltyTag}</span>（需求系数 x${e.noveltyDemandMul.toFixed(2)}）` : `<span class="good">${e.noveltyTag}</span>`}${e.noveltyWarning ? `｜<span class="bad">${e.noveltyWarning}</span>` : ''}`,
      `散热评估：${e.thermalPressure <= 1.12 ? '<span class="good">散热压力可控</span>' : e.thermalPressure <= 1.38 ? `<span class="risk-warn">${e.thermalTag}</span>` : `<span class="bad">${e.thermalTag}</span>`}｜${thermalPerfImpact}`,
      `屏幕-机身关系：屏幕约 ${e.screenMm.widthMm.toFixed(1)} x ${e.screenMm.heightMm.toFixed(1)} mm，机身可容纳开口约 ${maxScreenW.toFixed(1)} x ${maxScreenH.toFixed(1)} mm，${screenFit ? '<span class="good">匹配正常</span>' : '<span class="bad">尺寸冲突</span>'}`,
      `影像市场反馈：${e.cameraDemandFactor >= 0.95 ? '<span class="good">影像配置对销量无明显拖累</span>' : e.cameraDemandFactor >= 0.65 ? `<span class="risk-warn">${e.cameraDemandTag}</span>` : `<span class="bad">${e.cameraDemandTag}</span>`}`,
      `资金关键项：单台制造成本 <strong>${RMB(e.unitCost)}</strong>${e.pricingWarningLevel === 'critical' ? '｜<span class="bad">注意售价</span>' : e.pricingWarningLevel === 'warn' ? '｜<span class="risk-warn">售价偏激进</span>' : ''}｜研发成本 <strong>${RMB(e.rndCost)}</strong>｜总启动成本 <strong>${RMB(e.initialCost)}</strong>`,
      ...(screenRatioBenefitParts.length ? [`高屏占比收益：${screenRatioBenefitParts.join('｜')}`] : []),
      `采购影响：${e.input.procurement.name}（单价系数 x${e.input.procurement.factor.toFixed(2)}｜锁量首付 ${RMB(e.procurementUpfront)}｜锁量承诺 ${e.lockCommitUnits > 0 ? `${e.lockCommitUnits.toLocaleString('zh-CN')} 台 / ${RMB(e.lockCommitCost)}` : '无'}｜补货交期约 ${e.input.procurement.leadMonths} 月）`,
      `体积可行性：${volumeOk ? '<span class="good">可以量产</span>' : '<span class="bad">内部空间过载，需重做</span>'}`,
      `售后风险：${returnNarrative(returnProfile.rate)}`,
      `首发节奏：${stockAdvice}`,
      `SKU 阵容：${skuMixText}`
    ].join('<br>');
  }
}

function benchIsAlive(token) {
  return token === benchRunToken && !!el.benchPage && !el.benchPage.classList.contains('hidden');
}

function benchSleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function setBenchCardActive(node) {
  [el.benchSocCard, el.benchDispCard, el.benchCamCard, el.benchStorageCard, el.benchBatteryCard]
    .forEach((card) => {
      if (!card) return;
      card.classList.toggle('active', card === node);
    });
}

function setBenchScore(node, score, done = false) {
  if (!node) return;
  node.textContent = done ? `${Math.round(score)} 分` : '等待测试';
  node.classList.remove('pending', 'done');
  node.classList.add(done ? 'done' : 'pending');
}

function updateBenchProgress(step, total = 5) {
  const s = clamp(Math.round(Number(step) || 0), 0, total);
  const pct = Math.round((s / Math.max(1, total)) * 100);
  if (el.benchProgressText) el.benchProgressText.textContent = `${s}/${total}`;
  if (el.benchProgressFill) el.benchProgressFill.style.width = `${pct}%`;
}

function fitCanvas(canvas) {
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 10 || rect.height < 10) return null;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: Math.floor(rect.width), h: Math.floor(rect.height) };
}

function drawBenchSocGame(t, temp) {
  const pack = fitCanvas(el.benchSocGameCanvas);
  if (!pack) return;
  const { ctx, w, h } = pack;
  ctx.clearRect(0, 0, w, h);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, 'rgba(7,16,28,0.96)');
  bg.addColorStop(1, 'rgba(12,34,56,0.92)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  const laneY = h * 0.56;
  ctx.strokeStyle = 'rgba(109,180,232,0.35)';
  ctx.beginPath();
  ctx.moveTo(10, laneY);
  ctx.lineTo(w - 10, laneY);
  ctx.stroke();
  const shipX = 18 + ((t * 95) % Math.max(20, w - 50));
  const shipY = laneY - 20 + Math.sin(t * 4.1) * 6;
  ctx.fillStyle = 'rgba(118,240,191,0.9)';
  ctx.fillRect(shipX, shipY, 18, 12);
  ctx.fillStyle = 'rgba(255,130,120,0.92)';
  ctx.fillRect(shipX - 5, shipY + 3, 4, 6);
  for (let i = 0; i < 8; i += 1) {
    const bx = w - ((t * 130 + i * 72) % (w + 20));
    const bh = 8 + ((i * 13 + Math.floor(t * 10)) % 30);
    ctx.fillStyle = 'rgba(96,150,198,0.52)';
    ctx.fillRect(bx, laneY + 2, 10, bh);
  }
  ctx.fillStyle = 'rgba(186,214,244,0.9)';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText(`GPU Scene · ${temp.toFixed(1)}°C`, 10, 14);
}

function drawBenchTempChart(temps) {
  const pack = fitCanvas(el.benchSocTempCanvas);
  if (!pack) return;
  const { ctx, w, h } = pack;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(8,15,26,0.95)';
  ctx.fillRect(0, 0, w, h);
  const pad = { l: 28, r: 8, t: 10, b: 18 };
  const pw = Math.max(20, w - pad.l - pad.r);
  const ph = Math.max(20, h - pad.t - pad.b);
  ctx.strokeStyle = 'rgba(136,182,224,0.26)';
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.t + (ph * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(w - pad.r, y);
    ctx.stroke();
  }
  const minT = 20;
  const maxT = 100;
  ctx.strokeStyle = 'rgba(255,136,132,0.95)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  temps.forEach((temp, idx) => {
    const x = pad.l + (idx / Math.max(1, temps.length - 1)) * pw;
    const y = pad.t + (1 - (temp - minT) / (maxT - minT)) * ph;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.fillStyle = 'rgba(198,220,244,0.86)';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('Temp °C', 4, 12);
}

async function runBenchSocTest(e, token) {
  setBenchCardActive(el.benchSocCard);
  setBenchScore(el.benchSocScore, 0, false);
  let temp = 26;
  const temps = [temp];
  const start = performance.now();
  while (benchIsAlive(token)) {
    const t = (performance.now() - start) / 1000;
    drawBenchSocGame(t, temp);
    drawBenchTempChart(temps);
    if (el.benchSocMeta) el.benchSocMeta.textContent = `温度：${temp.toFixed(1)}°C｜进行中...`;
    if (temp >= 95 || t >= 8) break;
    await benchSleep(120);
    if (!benchIsAlive(token)) return false;
    const socHeatScore = Number(e.virtualBench.socHeatScoreEffective || e.virtualBench.socLabScoreForHeat || e.virtualBench.socLabScore || 0);
    const baseRise = 0.34 + e.thermalPressure * 0.56 + socHeatScore / 420;
    const heatProgress = clamp((temp - 26) / (95 - 26), 0, 1);
    // Curved climb: fast ramp-up first, then slow near thermal ceiling.
    const curveMul = 1.12 - 0.34 * Math.pow(heatProgress, 1.45);
    // Continuous small jitter (sensor sampling / workload fluctuation feel).
    const microNoise = Math.sin(t * 2.35) * 0.05 + Math.sin(t * 6.9 + temp * 0.02) * 0.03;
    // Occasional tiny spikes, but bounded to avoid changing stop logic.
    const spikeGate = Math.max(0, Math.sin(t * 3.7 + 0.6));
    const spike = Math.pow(spikeGate, 7) * 0.2;
    const rise = baseRise * curveMul * (1 + microNoise + spike);
    temp = clamp(temp + rise, 26, 99.5);
    temps.push(temp);
  }
  if (!benchIsAlive(token)) return false;
  drawBenchSocGame(8, temp);
  drawBenchTempChart(temps);
  if (el.benchSocMeta) {
    const endTag = temp >= 95 ? '达到温度上限，测试终止' : '达到时长上限，测试终止';
    el.benchSocMeta.textContent = `温度：${temp.toFixed(1)}°C｜${endTag}`;
  }
  setBenchScore(el.benchSocScore, e.virtualBench.socLabScore, true);
  await benchSleep(260);
  return benchIsAlive(token);
}

async function runBenchDisplayTest(e, token) {
  setBenchCardActive(el.benchDispCard);
  setBenchScore(el.benchDispScore, 0, false);
  const start = performance.now();
  while (benchIsAlive(token) && performance.now() - start < 3000) {
    if (el.benchDispScore) el.benchDispScore.textContent = `测试中 ${'.'.repeat(1 + (Math.floor((performance.now() - start) / 480) % 3))}`;
    await benchSleep(150);
  }
  if (!benchIsAlive(token)) return false;
  setBenchScore(el.benchDispScore, e.virtualBench.displayLabScore, true);
  await benchSleep(220);
  return benchIsAlive(token);
}

async function runBenchCameraTest(e, token) {
  setBenchCardActive(el.benchCamCard);
  setBenchScore(el.benchCamScore, 0, false);
  const cams = [e.input.cams.main, e.input.cams.ultra, e.input.cams.mono, e.input.cams.tele, e.input.cams.front].filter((x) => x && x.id !== 'none');
  if (el.benchCamInfo) {
    el.benchCamInfo.textContent = cams.length
      ? `启用 ${cams.length} 颗摄像头：${cams.map((x) => x.name).join('｜')}`
      : '无摄像头模组';
  }
  await benchSleep(2000);
  if (!benchIsAlive(token)) return false;
  setBenchScore(el.benchCamScore, e.virtualBench.cameraLabScore, true);
  await benchSleep(220);
  return benchIsAlive(token);
}

async function runBenchStorageTest(e, token) {
  setBenchCardActive(el.benchStorageCard);
  setBenchScore(el.benchStorageScore, 0, false);
  if (el.benchStorageInfo) {
    el.benchStorageInfo.innerHTML = e.skuCosting
      .map((s) => `${s.name}：${s.ram.name} + ${s.rom.name}`)
      .join('<br>');
  }
  const start = performance.now();
  while (benchIsAlive(token) && performance.now() - start < 3000) {
    if (el.benchStorageBits) {
      const bits = Array.from({ length: 48 }, () => (Math.random() > 0.5 ? '1' : '0')).join('');
      el.benchStorageBits.textContent = bits.replace(/(.{8})/g, '$1 ').trim();
    }
    await benchSleep(110);
  }
  if (!benchIsAlive(token)) return false;
  setBenchScore(el.benchStorageScore, e.virtualBench.storageLabScore, true);
  await benchSleep(220);
  return benchIsAlive(token);
}

async function runBenchBatteryTest(e, token) {
  setBenchCardActive(el.benchBatteryCard);
  setBenchScore(el.benchBatteryScore, 0, false);
  const slides = ['模拟视频播放场景', '模拟表格浏览场景', '模拟游戏渲染场景'];
  const start = performance.now();
  while (benchIsAlive(token) && performance.now() - start < 5000) {
    const idx = Math.floor((performance.now() - start) / 1600) % slides.length;
    if (el.benchBatterySlide) el.benchBatterySlide.textContent = slides[idx];
    await benchSleep(150);
  }
  if (!benchIsAlive(token)) return false;
  setBenchScore(el.benchBatteryScore, e.virtualBench.batteryLabScore, true);
  await benchSleep(220);
  return benchIsAlive(token);
}

function resetBenchPage(e) {
  if (el.benchFinal) el.benchFinal.classList.add('hidden');
  if (el.benchFinalScore) el.benchFinalScore.textContent = '0';
  updateBenchProgress(0, 5);
  setBenchCardActive(null);
  setBenchScore(el.benchSocScore, 0, false);
  setBenchScore(el.benchDispScore, 0, false);
  setBenchScore(el.benchCamScore, 0, false);
  setBenchScore(el.benchStorageScore, 0, false);
  setBenchScore(el.benchBatteryScore, 0, false);
  if (el.benchSocMeta) el.benchSocMeta.textContent = '温度：26.0°C｜进行中...';
  if (el.benchCamInfo) el.benchCamInfo.textContent = '读取摄像头配置中...';
  if (el.benchStorageInfo) el.benchStorageInfo.textContent = '读取 SKU 配置中...';
  if (el.benchStorageBits) el.benchStorageBits.textContent = '0101 0101 0101 ...';
  if (el.benchBatterySlide) el.benchBatterySlide.textContent = '模拟视频播放场景';
  if (e && el.benchStorageInfo) {
    el.benchStorageInfo.innerHTML = e.skuCosting.map((s) => `${s.name}：${s.ram.name} + ${s.rom.name}`).join('<br>');
  }
}

function closeBenchPage() {
  benchRunToken += 1;
  if (el.benchPage) el.benchPage.classList.add('hidden');
  document.body.classList.remove('bench-page-open');
  refreshOverlayLockState();
}

async function openBenchPage() {
  if (!hasAchievement('bench_first')) {
    addAchievementCard('bench_first', '不服就跑个分', '首次进入跑分页面。');
    openGameModal(
      '成就解锁',
      '第一次点开跑分页，恭喜达成 <strong>不服就跑个分</strong> 成就！'
    );
  }
  let e = null;
  try {
    e = evaluateBuild();
    renderPreview();
  } catch (err) {
    const detail = err && err.message ? `（${String(err.message)}）` : '';
    const msg = `<span class="bad">跑分初始化失败，请调整一个配置后重试。${detail}</span>`;
    if (el.previewBox) el.previewBox.innerHTML = msg;
    if (el.previewDetailBox) el.previewDetailBox.innerHTML = msg;
    return;
  }
  if (!el.benchPage) return;
  el.benchPage.classList.remove('hidden');
  document.body.classList.add('bench-page-open');
  refreshOverlayLockState();
  const token = benchRunToken + 1;
  benchRunToken = token;
  resetBenchPage(e);
  updateBenchProgress(1, 5);
  const okSoc = await runBenchSocTest(e, token);
  if (!okSoc) return;
  updateBenchProgress(2, 5);
  const okDisp = await runBenchDisplayTest(e, token);
  if (!okDisp) return;
  updateBenchProgress(3, 5);
  const okCam = await runBenchCameraTest(e, token);
  if (!okCam) return;
  updateBenchProgress(4, 5);
  const okStorage = await runBenchStorageTest(e, token);
  if (!okStorage) return;
  updateBenchProgress(5, 5);
  const okBattery = await runBenchBatteryTest(e, token);
  if (!okBattery) return;
  if (!benchIsAlive(token)) return;
  setBenchCardActive(null);
  if (el.benchFinalScore) el.benchFinalScore.textContent = String(Math.round(e.virtualBench.total));
  if (el.benchFinal) el.benchFinal.classList.remove('hidden');
}

function updateDisplayQuickBox() {
  if (!el.displayQuickBox) return;
  const size = getDisplaySizeInch();
  if (!Number.isFinite(size) || size < 3.0 || size > 9.0) {
    el.displayQuickBox.innerHTML = '<span class="bad">屏幕尺寸超出范围（3.0~9.0 英寸）。</span>';
    return;
  }
  if (isFoldableSelected() && !isFoldableUnlocked()) {
    el.displayQuickBox.innerHTML = '<span class="bad">折叠屏需在第二代产品解锁后才能使用。</span>';
    return;
  }
  let est = null;
  try {
    est = getDisplayLiveEstimate();
  } catch (err) {
    el.displayQuickBox.innerHTML = '<span class="bad">屏幕参数暂时无法计算，请检查材质/供应商/形态设置。</span>';
    return;
  }
  if (!est || !est.mat || !est.vendor || !est.form || !est.bezel || !est.dim) {
    el.displayQuickBox.innerHTML = '<span class="bad">屏幕参数不完整，请重新选择屏幕配置。</span>';
    return;
  }
  const phoneH = getPhoneHInputMm();
  const phoneW = getPhoneWInputMm();
  const maxW = phoneW - 2 * est.bezel.sideBezel;
  const maxH = phoneH - (est.bezel.topBezel + est.bezel.bottomBezel);
  const fit = est.dim.widthMm <= maxW && est.dim.heightMm <= maxH;

  el.displayQuickBox.innerHTML = [
    `屏幕方向：<strong>${est.mat.name}</strong>｜${est.vendor.name}｜${est.form.name}`,
    `观感判断：${est.bezelDemandFactor >= 0.94 ? '<span class="good">窄边框观感更现代</span>' : '<span class="risk-warn">边框观感中等</span>'}`,
    `制造压力：${est.ratioCostFactor > 1.08 || est.foldableSizeMul > 1.08 ? '<span class="risk-warn">工艺和成本压力偏高</span>' : '<span class="good">制造压力可控</span>'}`,
    `机身适配：${fit ? '<span class="good">当前机身可以容纳该屏幕</span>' : '<span class="bad">当前机身放不下该屏幕</span>'}`
  ].join('<br>');
}

function launch() {
  if (!validateIntegerInput(el.units, el.unitsIntHint, { showHint: true })) {
    const msg = '<span class="bad">首批产量仅支持整数，请调整后再开售。</span>';
    if (el.previewBox) el.previewBox.innerHTML = msg;
    if (el.previewDetailBox) el.previewDetailBox.innerHTML = msg;
    return;
  }
  const e = evaluateBuild();
  if (e.issues.length) {
    const msg = `<span class="bad">${e.issues.join('<br>')}</span>`;
    el.previewBox.innerHTML = msg;
    if (el.previewDetailBox) el.previewDetailBox.innerHTML = msg;
    return;
  }
  if (e.initialCost > state.cash) {
    const msg = `<span class="bad">资金不足：需要 ${RMB(e.initialCost)}，当前 ${RMB(state.cash)}。</span>`;
    el.previewBox.innerHTML = msg;
    if (el.previewDetailBox) el.previewDetailBox.innerHTML = msg;
    return;
  }

  state.product = e;
  markScreenMaterialProduced(el.dispMat ? el.dispMat.value : '');
  checkScreenCollectorMilestone();
  const safeAchievementChecks = [
    checkFirstLaunchAchievement,
    checkFoldableAchievement,
    checkEinkAchievement,
    checkFutureEinkAchievement,
    checkEbookAchievement,
    checkUltraFlagshipAchievement,
    checkAdvancedAlloyAchievement,
    checkCeramicAchievement,
    checkNoCameraAchievement,
    checkAramidAchievement,
    checkSelfieAchievement,
    checkTopLcdAchievement,
    checkFlagshipLcdDemonAchievement,
    checkThermalManiacAchievement,
    checkSatelliteAchievement,
    checkBatteryTechAchievement,
    checkMagsafeAchievement,
    checkIp68EasyAchievement,
    checkSmallScreenAchievement,
    checkFlatBackAchievement,
    checkLargeScreenAchievement,
    checkNoRefreshAchievement,
    checkSqueezeToothpasteAchievement,
    checkBrandToneAchievement,
    checkBudgetFriendAchievement,
    checkThinMarginAchievement,
    checkPremiumPushAchievement
  ];
  safeAchievementChecks.forEach((fn) => {
    try {
      fn(e);
    } catch (err) {
      try {
        // eslint-disable-next-line no-console
        console.error('[LaunchAchievementError]', fn && fn.name ? fn.name : 'unknown', err);
      } catch {
        // ignore
      }
    }
  });
  state.product.modelBaseName = e.modelNameCheck.name;
  state.product.modelGeneration = e.modelGeneration;
  state.product.modelName = e.modelName;
  state.product.loanDecision = 'pending';
  state.product.loanId = null;
  state.product.producedTotal = e.input.units;
  state.product.contractUnits = e.contractCoverageUnits;
  state.product.procurementRenewals = 0;
  state.product.pipeline = [];
  state.product.skuStats = e.skuCosting.map((s) => ({
    id: s.id,
    name: s.name,
    ramId: s.ram.id,
    romId: s.rom.id,
    ramName: s.ram.name,
    romName: s.rom.name,
    ramScore: s.ram.score,
    romScore: s.rom.score,
    share: s.share,
    price: s.price,
    unitCost: s.unitCost,
    sold: 0
  }));
  state.product.preorderBacklogBySku = Object.fromEntries(e.skuCosting.map((s) => [s.id, 0]));
  state.product.preorderCreatedTotal = 0;
  state.product.preorderFulfilledTotal = 0;
  state.product.preorderCashTotal = 0;
  state.product.lifecycleMaxMonths = DEFAULT_LIFECYCLE_MONTHS;
  state.product.marketCapacity = Math.round(
    e.baseDemand * (DEFAULT_LIFECYCLE_MONTHS * 0.62) * clamp(0.72 + e.qualityScore / 220, 0.72, 1.28) * e.input.startupDifficulty.marketCapacity
  );
  state.product.marketConsumed = 0;
  state.product.idleNoStockMonths = 0;
  state.product.stockoutStress = 0;
  state.product.demandSlump = 0;
  state.product.demandHistory = [];
  state.product.leadPenaltyMonthsRemain = 0;
  state.product.leadPenaltyExtra = 0;
  state.cash -= e.initialCost;
  state.inventoryBySku = allocateUnitsByShare(e.input.units, e.skuCosting);
  syncInventoryTotal();
  state.costTotal += e.initialCost;
  state.companyCostTotal += e.initialCost;
  const isFoldableModel = e.input.disp.mat.name === '折叠屏';
  const isFlagshipSoc = e.input.soc.tier.includes('旗舰');
  const isFlagshipCamera = ['gn3_50', 'hp3_200', 'hp2_200', 'lyt900'].includes(e.input.cams.main.id);
  const hasTopRamSku = (e.skuCosting || []).some((s) => getRamCapacityGb(s && s.ram) >= 16);
  let premiumSignalScore = 0;
  if (isFoldableModel) premiumSignalScore += 1.3;
  if (isFlagshipSoc) premiumSignalScore += 1.0;
  if (isFlagshipCamera) premiumSignalScore += 1.0;
  if (hasTopRamSku) premiumSignalScore += 0.8;
  if (isFlagshipSoc && isFlagshipCamera) premiumSignalScore += 0.5;
  const bodyReputationBoost = ['aramid', 'ceramic', 'titanium'].includes(e.input.body.id) ? 1.4 : 0;
  const premiumImmediateRating = clamp(premiumSignalScore * 0.35, 0, 1.8);
  const nextPriceTolGain = premiumSignalScore * 0.055;
  const nextOnlineDemandGain = premiumSignalScore * 0.05;
  const nextOfflineDemandGain = premiumSignalScore * (isFoldableModel ? 0.085 : 0.05);
  state.premiumPriceToleranceCarry = clamp((state.premiumPriceToleranceCarry || 1) + nextPriceTolGain + (e.screenRatioPremiumGain || 0), 1.0, 1.65);
  state.premiumOnlineDemandCarry = clamp((state.premiumOnlineDemandCarry || 1) + nextOnlineDemandGain, 1.0, 1.65);
  state.premiumOfflineDemandCarry = clamp((state.premiumOfflineDemandCarry || 1) + nextOfflineDemandGain, 1.0, 1.75);

  const launchRatingDeltaRaw =
    (state.marketPick.rating || 0)
    + e.input.campaign.rating
    + (e.qualityScore - 55) * 0.08
    + premiumImmediateRating
    + bodyReputationBoost
    + (e.screenRatioRepGain || 0);
  const launchRatingDelta = applyRatingDeltaByDifficulty(
    launchRatingDeltaRaw,
    e.input.startupDifficulty?.name || '真实',
    e.input.calendarYear
  );
  state.rating = clamp(state.rating + launchRatingDelta, 1, 100);
  checkRatingMilestones();
  if (state.ended) return;
  state.month = 0;
  state.soldTotal = 0;
  state.revenueTotal = 0;
  state.shortEvents = [];
  state.launched = true;
  state.ended = false;
  state.phaseEnded = false;
  if (el.continueNext) el.continueNext.classList.add('hidden');

  setStep(3);
  if (el.restockSku) {
    el.restockSku.innerHTML = state.product.skuStats
      .map((s, idx) => `<option value="${s.id}" ${idx === 0 ? 'selected' : ''}>${s.name} ${s.ramName}+${s.romName}</option>`)
      .join('');
  }
  el.marketBox.innerHTML = [
    `企业：<strong>${state.companyName || '未命名科技'}</strong>（${e.input.region.name}）`,
    `机型：<strong>${e.modelName}</strong>｜难度：<strong>${e.input.startupDifficulty.name}</strong>`,
    `${BENCHMARK_NAME} 热度：综合 <strong>${e.virtualBench.total}</strong>（约为 ${(e.virtualBench.benchmarkBaseline && e.virtualBench.benchmarkBaseline.name) || getBenchmarkBaselineByYear(e.input && e.input.calendarYear).name} 的 ${benchmarkRatioText(e.virtualBench.baselineRatio)}，${e.virtualBench.baselineTag}）`,
    `续航基线：约 ${e.batteryEval.hours.toFixed(1)} 小时（${(e.batteryEval.baseline && e.batteryEval.baseline.name) || BATTERY_BASELINE.name}=100%，当前 ${Math.round(e.batteryEval.endurancePct)}%）`,
    `本局市场：<strong>${state.marketPick.name}</strong>，${state.marketPick.text}`,
    `区域一句话：${regionNarrative(e.input.region)}`,
    `渠道倾向：${channelNarrative(e.onlineShare)}`,
    `存储行情：${state.memoryMarket ? state.memoryMarket.name : '存储平稳'}。贷款可在运营期手动决定是否使用。`
  ].join('<br>');
  el.reportBox.innerHTML = [
    `已开售 <strong>${e.modelName}</strong>，可以开始推进月份。`,
    `首发打法：${e.input.marketing.name} + ${e.input.campaign.name}。`,
    `SKU 首发：${state.product.skuStats.map((s) => `${s.name} ${s.ramName}+${s.romName}`).join('；')}`,
    premiumSignalScore > 0
      ? '<span class="good">高端形象已立住，下代冲高更容易。</span>'
      : '<span class="risk-warn">高端形象未建立，建议后续靠产品力拉口碑。</span>',
    '操作建议：先推进月份看市场反馈，再决定是否补货和贷款。'
  ].join('<br>');
  renderRunBrief('本月重点：等待推进月份。');
  el.finalBox.innerHTML = '结算后显示最终表现。';
  showMobileRunDockAction('已开售，等待运营操作', 'neutral');
  renderMobileRunDockQuote();
  updateHeader();
}

function monthlyNoise() {
  const pool = [
    { name: '博主测评加成', demand: 1.08, rating: 1.4, cost: 1.0 },
    { name: '平台补贴周', demand: 1.12, rating: 0.6, cost: 0.98 },
    { name: '竞品降价', demand: 0.9, rating: -1, cost: 1.0 },
    { name: '售后争议', demand: 0.86, rating: -2.2, cost: 1.02 },
    { name: '供应稳定', demand: 1.03, rating: 0.3, cost: 0.96 },
    { name: '常规波动', demand: 1.0, rating: 0, cost: 1.0 }
  ];
  return pool[Math.floor(Math.random() * pool.length)];
}

const blackSwanEvents = [
  {
    id: 'supplier_fire',
    level: 'high',
    name: '核心供应商突发事故',
    reason: '上游封测厂区火灾并停工，核心器件短期断供。',
    weight: 20,
    demandMul: 0.88,
    costMul: 1.12,
    ratingDelta: -1.8,
    pipelineDelay: 1,
    leadPenaltyMonths: 3,
    leadPenaltyExtra: 1
  },
  {
    id: 'battery_recall',
    level: 'high',
    name: '电池安全争议',
    reason: '社媒集中扩散续航鼓包案例，触发专项检测与召回。',
    weight: 14,
    demandMul: 0.72,
    costMul: 1.22,
    ratingDelta: -8.5,
    cashHit: 980_000
  },
  {
    id: 'channel_freeze',
    level: 'high',
    name: '渠道回款冻结',
    reason: '渠道商资金链承压，部分账期大幅拉长。',
    weight: 16,
    demandMul: 0.94,
    costMul: 1.08,
    ratingDelta: -1.2,
    receivableHoldRatio: 0.28
  },
  {
    id: 'flagship_ambush',
    level: 'high',
    name: '竞品代际碾压',
    reason: '头部厂商提前发布高配低价新机，价格锚点重置。',
    weight: 18,
    demandMul: 0.68,
    costMul: 1.0,
    ratingDelta: -2.8
  },
  {
    id: 'policy_penalty',
    level: 'lethal',
    name: '合规重罚与强制整改',
    reason: '关键合规项未通过，监管罚款并限制发货窗口。',
    weight: 8,
    demandMul: 0.6,
    costMul: 1.18,
    ratingDelta: -5.5,
    cashHit: 3_200_000,
    leadPenaltyMonths: 4,
    leadPenaltyExtra: 2
  },
  {
    id: 'supply_ban',
    level: 'lifecycle',
    name: '关键器件断供令',
    reason: '核心器件遭遇出口限制，后续补货不可持续。',
    weight: 7,
    demandMul: 0.55,
    ratingDelta: -3.5,
    forcePhaseEnd: true
  },
  {
    id: 'instant_crash',
    level: 'lethal',
    name: '资本链断裂事件',
    reason: '外部融资撤回叠加票据违约，短期偿付能力骤降。',
    weight: 4,
    demandMul: 0.52,
    ratingDelta: -6.5,
    cashHit: 6_000_000,
    instantKill: true
  }
];

const opportunityEvents = [
  {
    id: 'top_reviewer',
    name: '顶流博主主动深度评测',
    reason: '头部数码博主给出高分长评，话题快速破圈。',
    weight: 22,
    demandMul: 1.2,
    costMul: 0.98,
    ratingDelta: 4.6,
    onlineMul: 1.08
  },
  {
    id: 'headline_report',
    name: '主流媒体正向报道',
    reason: '产品被多个科技媒体集中报道，品牌可信度上升。',
    weight: 18,
    demandMul: 1.12,
    costMul: 0.99,
    ratingDelta: 3.8,
    onlineMul: 1.04
  },
  {
    id: 'tech_breakthrough',
    name: '核心技术突破报道',
    reason: '关键技术方案获行业关注，品牌技术认知显著上扬。',
    weight: 12,
    demandMul: 1.08,
    costMul: 0.98,
    ratingDelta: 4.2,
    onlineMul: 1.06
  },
  {
    id: 'capital_favor',
    name: '获得资本青睐',
    reason: '产业资本跟投并扩展供应链信用额度。',
    weight: 14,
    demandMul: 1.06,
    costMul: 0.96,
    ratingDelta: 1.0,
    cashBoost: 1_600_000
  },
  {
    id: 'platform_featured',
    name: '电商平台首页推荐',
    reason: '平台活动流量倾斜，线上点击与转化提升。',
    weight: 16,
    demandMul: 1.14,
    costMul: 1.0,
    ratingDelta: 0.8,
    onlineMul: 1.12
  },
  {
    id: 'award_shortlist',
    name: '年度创新奖入围',
    reason: '设计与体验获得奖项提名，品牌势能走强。',
    weight: 12,
    demandMul: 1.1,
    costMul: 0.99,
    ratingDelta: 3.9
  }
];

function scaleOpportunityRatingDeltaByDifficulty(delta, diffName) {
  if (diffName === '真实') return delta * 1.3;
  if (diffName === '困难') return delta * 0.82;
  return delta;
}

function pickWeighted(items) {
  const total = items.reduce((s, x) => s + Math.max(0, x.weight || 0), 0);
  if (total <= 0) return null;
  let r = Math.random() * total;
  for (const item of items) {
    r -= Math.max(0, item.weight || 0);
    if (r <= 0) return item;
  }
  return items[items.length - 1] || null;
}

function rollBlackSwan(p) {
  const hardMode = p.input.startupDifficulty?.name === '困难';
  let chance = hardMode ? 0.18 : 0.12;
  if (state.month >= 6) chance += 0.05;
  if (state.cash < 2_000_000) chance += 0.06;
  if ((p.stockoutStress || 0) > 0.55) chance += 0.05;
  chance = clamp(chance, 0.08, 0.42);
  if (Math.random() > chance) return null;
  return pickWeighted(blackSwanEvents);
}

function rollOpportunity(p, swan) {
  const hardMode = p.input.startupDifficulty?.name === '困难';
  let chance = hardMode ? 0.15 : 0.22;
  if (state.month <= 3) chance -= 0.04;
  if (state.rating >= 65) chance += 0.05;
  if (p.geekAttraction >= 70) chance += 0.03;
  if ((p.stockoutStress || 0) > 0.45) chance -= 0.05;
  if ((p.demandSlump || 0) > 0.35) chance -= 0.04;
  if (swan && (swan.level === 'lethal' || swan.level === 'lifecycle')) chance -= 0.08;
  chance = clamp(chance, 0.06, 0.42);
  if (Math.random() > chance) return null;
  return pickWeighted(opportunityEvents);
}

function calcLifecycleState(month, lifecycleMaxMonths, stockoutStress = 0, demandSlump = 0) {
  const maxM = Math.max(12, lifecycleMaxMonths || DEFAULT_LIFECYCLE_MONTHS);
  const m = clamp(month, 1, maxM);
  const introEnd = Math.max(2, Math.round(maxM * 0.16));
  const growthEnd = Math.max(introEnd + 2, Math.round(maxM * 0.4));
  const matureEnd = Math.max(growthEnd + 2, Math.round(maxM * 0.68));
  const lerp = (a, b, t) => a + (b - a) * clamp(t, 0, 1);
  let phase = '导入期';
  let curve = 1;
  if (m <= introEnd) {
    phase = '导入期';
    curve = lerp(0.72, 1.06, m / Math.max(1, introEnd));
  } else if (m <= growthEnd) {
    phase = '成长期';
    curve = lerp(1.06, 1.26, (m - introEnd) / Math.max(1, growthEnd - introEnd));
  } else if (m <= matureEnd) {
    phase = '成熟期';
    curve = lerp(1.26, 1.01, (m - growthEnd) / Math.max(1, matureEnd - growthEnd));
  } else {
    phase = '衰退期';
    curve = lerp(1.01, 0.22, (m - matureEnd) / Math.max(1, maxM - matureEnd));
  }
  const declineBias = clamp(
    1
      - Math.max(0, m / maxM - 0.55) * (0.28 + stockoutStress * 0.34 + demandSlump * 0.42),
    0.38,
    1.0
  );
  const life = clamp(curve * declineBias, 0.08, 1.35);
  return { life, phase };
}

function calcDynamicPhaseState(p, month, fallbackPhase) {
  const history = Array.isArray(p.demandHistory) ? p.demandHistory : [];
  const latest = history.length ? history[history.length - 1] : 0;
  const peak = history.length ? Math.max(...history) : Math.max(1, Math.round(p.baseDemand || 1));
  const last2 = history.slice(-2);
  const prev2 = history.slice(-4, -2);
  const recentAvg = last2.length ? last2.reduce((s, x) => s + x, 0) / last2.length : latest;
  const prevAvg = prev2.length ? prev2.reduce((s, x) => s + x, 0) / prev2.length : recentAvg;
  const growth = prevAvg > 0 ? (recentAvg - prevAvg) / prevAvg : 0;
  const peakRatio = peak > 0 ? latest / peak : 1;
  const dropFromPeak = 1 - peakRatio;
  let phase = fallbackPhase;
  let lifeAdj = 1;

  if (month <= 2 && history.length < 2) {
    phase = '导入期';
    lifeAdj = 0.94;
  } else if (growth > 0.2 && peakRatio >= 0.62) {
    phase = '成长期';
    lifeAdj = clamp(1.06 + growth * 0.35, 1.05, 1.28);
  } else if (growth < -0.22 || peakRatio < 0.56 || dropFromPeak > 0.44) {
    phase = '衰退期';
    lifeAdj = clamp(0.9 - Math.max(-growth, 0) * 0.52 - Math.max(0, dropFromPeak - 0.25) * 0.4, 0.38, 0.9);
  } else if (Math.abs(growth) <= 0.12 && peakRatio >= 0.72) {
    phase = '成熟期';
    lifeAdj = clamp(1 - Math.abs(growth) * 0.08, 0.95, 1.03);
  } else {
    if (fallbackPhase === '衰退期' && growth > 0.08 && peakRatio >= 0.64) {
      phase = '成熟期';
      lifeAdj = 0.97;
    } else {
      phase = fallbackPhase;
      lifeAdj = 1;
    }
  }

  return {
    phase,
    lifeAdj,
    growth,
    peakRatio,
    latest,
    peak
  };
}

function calcQualityReturnProfile(buildLike) {
  const input = buildLike && buildLike.input ? buildLike.input : {};
  const qualityScore = Number(buildLike && buildLike.qualityScore ? buildLike.qualityScore : 60);
  const extras = Array.isArray(input.chosenExtras) ? input.chosenExtras : [];
  const extrasCount = extras.length;
  const hasVC = extras.some((x) => x && x.id === 'vc');
  const hasDualCell = extras.some((x) => x && x.id === 'dual_cell');
  const hasFast120 = extras.some((x) => x && x.id === 'fast120');
  const hasIp68 = extras.some((x) => x && x.id === 'ip68_cert');
  const hasMultiCamModule = extras.some((x) => x && x.id === 'multi_cam_module');
  const y = Number(input.calendarYear || HISTORICAL_HANDOFF_YEAR);
  const vendorName = input.disp && input.disp.vendor ? String(input.disp.vendor.name || '') : '';
  const bodyName = input.body ? String(input.body.name || '') : '';
  const displayMatName = input.disp && input.disp.mat ? String(input.disp.mat.name || '') : '';
  const socTier = input.soc ? String(input.soc.tier || '') : '';
  const isFlagshipSoc = socTier.includes('旗舰');

  const qualityPenalty = clamp((68 - qualityScore) / 2200, 0, 0.012);
  const vendorPenalty = vendorName.includes('低端') ? 0.007 : vendorName.includes('中端') ? 0.002 : 0;
  const bodyPenalty = bodyName.includes('工程塑料') ? 0.004 : 0;
  const extraPenalty = extrasCount > 3 ? Math.min(0.006, (extrasCount - 3) * 0.002) : 0;
  const dualCellPenalty = hasDualCell ? 0.0045 : 0;
  const multiCamModulePenalty = hasMultiCamModule ? 0.0022 : 0;
  const preModernFast120Penalty = (hasFast120 && y >= 2018 && y < HISTORICAL_HANDOFF_YEAR)
    ? clamp(0.0075 - ((y - 2018) / Math.max(1, HISTORICAL_HANDOFF_YEAR - 2018)) * 0.0075, 0, 0.0075)
    : 0;
  const thermalPenalty = (isFlagshipSoc && !hasVC) ? 0.0055 : 0;
  const displayPenalty = displayMatName === '折叠屏'
    ? 0.009
    : displayMatName === '墨水屏'
      ? 0.006
      : 0;
  const ip68Relief = hasIp68 ? 0.0075 : 0;
  const baseRate = 0.0025;

  const rate = clamp(
    baseRate + qualityPenalty + vendorPenalty + bodyPenalty + extraPenalty + dualCellPenalty + multiCamModulePenalty + preModernFast120Penalty + thermalPenalty + displayPenalty - ip68Relief,
    0.001,
    0.048
  );

  return {
    rate,
    factors: {
      qualityPenalty,
      vendorPenalty,
      bodyPenalty,
      extraPenalty,
      dualCellPenalty,
      multiCamModulePenalty,
      preModernFast120Penalty,
      thermalPenalty,
      displayPenalty,
      ip68Relief
    }
  };
}

function calcGenerationLoanRepayAmount() {
  return Math.round(
    GENERATION_LOAN_PRINCIPAL * (1 + GENERATION_LOAN_ANNUAL_RATE * (GENERATION_LOAN_TERM_MONTHS / 12))
  );
}

function renderRunBrief(html, options = {}) {
  if (!el.runBriefBox) return;
  el.runBriefBox.innerHTML = html;
  el.runBriefBox.classList.toggle('is-end', Boolean(options.highlightEnd));
}

function renderAchievementPanel() {
  if (el.achieveCount) {
    const count = Array.isArray(state.achievements) ? state.achievements.length : 0;
    el.achieveCount.textContent = String(count);
  }
  if (!el.achieveList) return;
  const list = Array.isArray(state.achievements) ? state.achievements : [];
  const total = ACHIEVEMENT_IDS.length;
  const validAchieved = new Set(
    list
      .map((x) => (x && x.id ? x.id : ''))
      .filter((id) => ACHIEVEMENT_IDS.includes(id))
  );
  const n = Math.min(validAchieved.size, total);
  if (el.achieveProgressText) el.achieveProgressText.textContent = `${n}/${total}`;
  if (el.achieveProgressFill) {
    const pct = total > 0 ? (n / total) * 100 : 0;
    el.achieveProgressFill.style.width = `${pct.toFixed(2)}%`;
  }
  if (!list.length) {
    el.achieveList.innerHTML = '<div class="achieve-empty">暂无已达成成就，继续推进看看会解锁什么。</div>';
    return;
  }
  el.achieveList.innerHTML = list
    .map((x) => `<div class="achieve-item"><strong>${x.name}</strong><div class="tiny">${x.desc}</div></div>`)
    .join('');
}

function addAchievementCard(id, name, desc) {
  if (!id) return;
  if (NON_ACHIEVEMENT_IDS.has(id) || String(id).startsWith('gameover_')) return;
  if (!Array.isArray(state.achievements)) state.achievements = [];
  if (state.achievements.some((x) => x.id === id)) return;
  state.achievements.push({
    id,
    name: name || '未命名成就',
    desc: desc || '',
    companyMonth: state.companyMonthsTotal || 0
  });
  renderAchievementPanel();
  maybeUnlockGrandSlamAchievement();
}

function hasAchievement(id) {
  if (!id || !Array.isArray(state.achievements)) return false;
  return state.achievements.some((x) => x && x.id === id);
}

function syncAchievementNotifiedFlagsFromList() {
  state.rating100Notified = hasAchievement('rating_100');
  state.cash1bNotified = hasAchievement('cash_1b');
  state.tenYearVeteranNotified = hasAchievement('ten_year_veteran');
  state.screenCollectorNotified = hasAchievement('screen_collector');
  state.foldableAchievedNotified = hasAchievement('foldable');
  state.einkAchievedNotified = hasAchievement('eink');
  state.futureEinkAchievedNotified = hasAchievement('future_eink');
  state.ebookAchievedNotified = hasAchievement('ebook');
  state.ultraFlagshipAchievedNotified = hasAchievement('ultra_flagship');
  state.advancedAlloyAchievedNotified = hasAchievement('advanced_alloy');
  state.ceramicAchievedNotified = hasAchievement('ceramic');
  state.noCameraAchievedNotified = hasAchievement('no_camera');
  state.aramidAchievedNotified = hasAchievement('aramid');
  state.selfieAchievedNotified = hasAchievement('selfie');
  state.topLcdAchievedNotified = hasAchievement('top_lcd');
  state.flagshipLcdDemonAchievedNotified = hasAchievement('flagship_lcd_demon');
  state.thermalManiacAchievedNotified = hasAchievement('thermal_maniac');
  state.satelliteAchievedNotified = hasAchievement('satellite');
  state.batteryTechAchievedNotified = hasAchievement('battery_tech');
  state.magsafeAchievedNotified = hasAchievement('magsafe');
  state.ip68EasyAchievedNotified = hasAchievement('ip68_easy');
  state.smallScreenAchievedNotified = hasAchievement('small_screen');
  state.flatBackAchievedNotified = hasAchievement('flat_back');
  state.largeScreenAchievedNotified = hasAchievement('large_screen');
  state.goodLuckAchievedNotified = hasAchievement('good_luck');
  state.noRefreshAchievedNotified = hasAchievement('no_refresh_shell');
  state.squeezeToothpasteAchievedNotified = hasAchievement('squeeze_toothpaste');
  state.brandToneAchievedNotified = hasAchievement('brand_tone');
  state.futureReachedNotified = hasAchievement('future_reached');
}

function maybeUnlockGrandSlamAchievement() {
  if (!Array.isArray(state.achievements)) return;
  const grandSlamId = 'grand_slam';
  if (!ACHIEVEMENT_IDS.includes(grandSlamId)) return;
  const hasGrandSlam = state.achievements.some((x) => x.id === grandSlamId);
  if (hasGrandSlam) return;
  const achieved = new Set(state.achievements.map((x) => x.id));
  const others = ACHIEVEMENT_IDS.filter((id) => id !== grandSlamId);
  const allOthersDone = others.every((id) => achieved.has(id));
  if (!allOthersDone) return;
  addAchievementCard('grand_slam', '大满贯！', '已收集除“大满贯”外的全部成就，达成全成就收集。');
  openGameModal(
    '成就解锁',
    '你已经把其余成就全部拿下，恭喜达成 <strong>大满贯！</strong><br>这波属于“成就列表已被你清空”。',
    'celebrate'
  );
}

function openAchievementPanel() {
  if (!el.achievePanel) return;
  renderAchievementPanel();
  el.achievePanel.classList.remove('hidden');
  refreshOverlayLockState();
}

function closeAchievementPanel() {
  if (!el.achievePanel) return;
  el.achievePanel.classList.add('hidden');
  refreshOverlayLockState();
}

let gameModalSeq = 0;
let gameoverCtaLatched = false;
let celebrateCtaLatched = false;
let runtimeErrorHandling = false;

function applyRestartCtaState(mode = 'none') {
  const restartBtns = [el.restart, el.restartDesign].filter(Boolean);
  restartBtns.forEach((btn) => btn.classList.remove('gameover-cta', 'celebrate-cta'));
  if (mode === 'gameover') {
    restartBtns.forEach((btn) => btn.classList.add('gameover-cta'));
    if (window.matchMedia('(max-width: 760px)').matches) {
      if (el.stageRun && !el.stageRun.classList.contains('hidden')) {
        el.stageRun.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  } else if (mode === 'celebrate') {
    restartBtns.forEach((btn) => btn.classList.add('celebrate-cta'));
  }
}

function closeGameModalById(id) {
  if (!el.gameModal || !el.gameModalStack) return;
  const node = el.gameModalStack.querySelector(`.game-modal-card[data-modal-id="${id}"]`);
  if (!node) return;
  const closedAction = String(node.getAttribute('data-action') || '');
  node.remove();
  const hasCards = el.gameModalStack.children.length > 0;
  if (!hasCards) {
    el.gameModal.classList.add('hidden');
  }
  refreshOverlayLockState();
  if (closedAction === 'celebrate' && !gameoverCtaLatched) {
    celebrateCtaLatched = true;
  }
  if (gameoverCtaLatched) {
    applyRestartCtaState('gameover');
    return;
  }
  applyRestartCtaState(celebrateCtaLatched ? 'celebrate' : 'none');
}

function openGameModal(title, bodyHtml, action = 'normal') {
  if (!el.gameModal || !el.gameModalStack) return;
  const id = String(++gameModalSeq);
  const card = document.createElement('div');
  const actionKey = ['gameover', 'celebrate'].includes(action) ? action : 'normal';
  card.className = `game-modal-card modal-${actionKey}`;
  card.dataset.modalId = id;
  card.dataset.action = action;
  card.innerHTML = [
    `<h3>${title || '提示'}</h3>`,
    `<div class="game-modal-body">${bodyHtml || ''}</div>`,
    '<div class="row"><button type="button" class="accent game-modal-close">关闭</button></div>'
  ].join('');
  if (action === 'gameover') {
    gameoverCtaLatched = true;
    celebrateCtaLatched = false;
    el.gameModalStack.prepend(card);
    applyRestartCtaState('gameover');
  } else {
    el.gameModalStack.appendChild(card);
    if (!gameoverCtaLatched && action === 'celebrate') {
      applyRestartCtaState('celebrate');
    }
  }
  el.gameModal.classList.remove('hidden');
  refreshOverlayLockState();
}

function closeLastGameModal() {
  if (!el.gameModalStack) return;
  const cards = el.gameModalStack.querySelectorAll('.game-modal-card');
  if (!cards.length) return;
  const last = cards[cards.length - 1];
  const id = last.getAttribute('data-modal-id');
  if (id) closeGameModalById(id);
}

function checkRatingMilestones() {
  if (state.ended) return;
  if (state.rating <= 1) {
    endGame('口碑跌穿地板，企业信誉崩盘。');
    openGameModal(
      '游戏结束',
      '口碑已经低到 <strong>1</strong>，用户评论区开始“全员避雷”。<br>这波属于“参数还在，信任没了”。',
      'gameover'
    );
    return;
  }
  if (state.rating >= 100) {
    if (!state.rating100Notified) {
      state.rating100Notified = true;
      addAchievementCard('rating_100', '口碑封神', '口碑到达100，评论区进入免检状态。');
      openGameModal(
        '口碑封神',
        '口碑到达 <strong>100</strong>！<br>你现在是“评论区免检产品”，继续运营看你能不能把销量也拉满。',
        'celebrate'
      );
    }
  } else {
    state.rating100Notified = false;
  }
  if (state.rating > 90 && !state.rating90PricingImmunityNotified) {
    state.rating90PricingImmunityNotified = true;
    openGameModal(
      '口碑护城河',
      '当前口碑已超过 <strong>90</strong>！<br>消费者默认“你家这代不会太离谱”，高溢价需求惩罚已临时免疫。'
    );
  }
}

function checkCashMilestones() {
  if (state.ended) return;
  if (state.cash >= 1_000_000_000) {
    if (!state.cash1bNotified) {
      state.cash1bNotified = true;
      addAchievementCard('cash_1b', '超强现金流', '企业现金突破10亿。');
      openGameModal(
        '现金流成就解锁',
        '现金已突破 <strong>10亿</strong>！<br>你现在是“财报区开挂选手”，资金池厚到可以把焦虑当装饰品。',
        'celebrate'
      );
    }
  } else {
    state.cash1bNotified = false;
  }
}

function checkTenYearVeteranMilestone() {
  if (state.ended) return;
  if (Number(state.companyMonthsTotal || 0) >= 120) {
    if (!state.tenYearVeteranNotified) {
      state.tenYearVeteranNotified = true;
      addAchievementCard('ten_year_veteran', '十年老兵', '企业经营总月数达到120个月。');
      openGameModal(
        '成就解锁',
        '企业已经跑到 <strong>120 个月</strong>！恭喜达成 <strong>十年老兵</strong> 成就。<br>这波是“友商换了几轮，你还在稳定输出”。',
        'celebrate'
      );
    }
  } else {
    state.tenYearVeteranNotified = false;
  }
}

function markScreenMaterialProduced(matKey) {
  if (!matKey || !displayMaterials[matKey]) return;
  if (!(state.screenMaterialsUsed instanceof Set)) state.screenMaterialsUsed = new Set();
  state.screenMaterialsUsed.add(matKey);
}

function checkScreenCollectorMilestone() {
  if (state.ended) return;
  const allMatKeys = Object.keys(displayMaterials || {});
  const collectedCount = state.screenMaterialsUsed instanceof Set ? state.screenMaterialsUsed.size : 0;
  if (allMatKeys.length > 0 && collectedCount >= allMatKeys.length && !state.screenCollectorNotified) {
    state.screenCollectorNotified = true;
    addAchievementCard('screen_collector', '屏幕收集者', '完成全部屏幕材质发售收集。');
    openGameModal(
      '成就解锁',
      '你已经把全材质屏幕都做了一遍，恭喜达成 <strong>屏幕收集者</strong>！<br>从 LCD 到折叠屏，这波属于“屏幕图鉴全亮”。'
    );
  }
}

function checkFoldableAchievement(buildLike) {
  if (state.ended || state.foldableAchievedNotified) return;
  const isFoldable = Boolean(buildLike && buildLike.input && buildLike.input.disp && buildLike.input.disp.mat && buildLike.input.disp.mat.name === '折叠屏');
  if (!isFoldable) return;
  state.foldableAchievedNotified = true;
  addAchievementCard('foldable', '折叠屏！', '成功发售折叠屏机型。');
  openGameModal(
    '成就解锁',
    '你已经把折叠屏机型成功发售！恭喜达成 <strong>折叠屏！</strong> 成就。<br>这波是“口袋里装平板，气场直接拉满”。'
  );
}

function checkEinkAchievement(buildLike) {
  if (state.ended || state.einkAchievedNotified) return;
  const isEink = Boolean(buildLike && buildLike.input && buildLike.input.disp && buildLike.input.disp.mat && buildLike.input.disp.mat.name === '墨水屏');
  if (!isEink) return;
  state.einkAchievedNotified = true;
  addAchievementCard('eink', '墨水屏！', '成功发售墨水屏机型。');
  openGameModal(
    '成就解锁',
    '你已经把墨水屏机型成功发售！恭喜达成 <strong>墨水屏！</strong> 成就。<br>这波是“续航像开挂，刷新率靠信仰”。'
  );
}

function checkFutureEinkAchievement(buildLike) {
  if (state.ended || state.futureEinkAchievedNotified) return;
  const disp = buildLike && buildLike.input ? buildLike.input.disp : null;
  const matName = disp && disp.mat ? String(disp.mat.name || '') : '';
  if (matName !== '墨水屏') return;
  const featureNames = Array.isArray(disp && disp.features)
    ? disp.features.map((f) => String((f && f.name) || ''))
    : [];
  const hasLtpo = featureNames.some((name) => name.includes('LTPO'));
  const hasHighRefresh = featureNames.some((name) => name.includes('高刷新'));
  if (!hasLtpo || !hasHighRefresh) return;
  state.futureEinkAchievedNotified = true;
  addAchievementCard('future_eink', '未来墨水屏！', '墨水屏 + LTPO + 高刷新率成功发售。');
  openGameModal(
    '成就解锁',
    '你把墨水屏、LTPO 和高刷新凑到了一台机子上！恭喜达成 <strong>未来墨水屏！</strong> 成就。<br>这波是“纸感和丝滑我全都要”。'
  );
}

function checkEbookAchievement(buildLike) {
  if (state.ended || state.ebookAchievedNotified) return;
  const disp = buildLike && buildLike.input ? buildLike.input.disp : null;
  const matName = disp && disp.mat ? String(disp.mat.name || '') : '';
  const ratio = disp ? String(disp.ratio || '') : '';
  if (matName !== '墨水屏' || ratio !== '4:3') return;
  state.ebookAchievedNotified = true;
  addAchievementCard('ebook', '电子书', '4:3 墨水屏机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了 <strong>4:3 墨水屏</strong> 机型，恭喜达成 <strong>电子书</strong> 成就！<br>这波是“翻页感拉满，阅读党直接开香槟”。'
  );
}

function hasMaxMemorySku(skuList) {
  const list = Array.isArray(skuList) ? skuList : [];
  const maxRamCap = ramOptions.reduce((m, x) => Math.max(m, getRamCapacityGb(x)), 0);
  const maxRomCap = romOptions.reduce((m, x) => Math.max(m, getRomCapacityGb(x)), 0);
  if (maxRamCap <= 0 || maxRomCap <= 0) return false;
  return list.some((sku) => {
    if (!sku || !sku.ram || !sku.rom) return false;
    return getRamCapacityGb(sku.ram) >= maxRamCap && getRomCapacityGb(sku.rom) >= maxRomCap;
  });
}

function checkUltraFlagshipAchievement(buildLike) {
  if (state.ended || state.ultraFlagshipAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const socTier = input && input.soc ? String(input.soc.tier || '') : '';
  const isUltraSoc = socTier.includes('旗舰+');
  if (!isUltraSoc) return;
  const skuList = Array.isArray(buildLike && buildLike.skuCosting) ? buildLike.skuCosting : [];
  if (!hasMaxMemorySku(skuList)) return;
  state.ultraFlagshipAchievedNotified = true;
  addAchievementCard('ultra_flagship', '旗舰中的旗舰', '旗舰+SoC并含满配内存+满配存储 SKU成功发售。');
  openGameModal(
    '成就解锁',
    '你把旗舰+ SoC 和满配内存+满配存储同时端上来了，恭喜达成 <strong>旗舰中的旗舰</strong> 成就！<br>这波属于“参数表先发言，发布会后补充”。'
  );
}

function checkAdvancedAlloyAchievement(buildLike) {
  if (state.ended || state.advancedAlloyAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const bodyId = input && input.body ? String(input.body.id || '') : '';
  if (bodyId !== 'titanium') return;
  state.advancedAlloyAchievedNotified = true;
  addAchievementCard('advanced_alloy', '先进合金', '钛金属中框+玻璃机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了钛合金中框+玻璃机型，恭喜达成 <strong>先进合金</strong> 成就！<br>这波是“手感一摸就知道，预算一看就沉默”。'
  );
}

function checkCeramicAchievement(buildLike) {
  if (state.ended || state.ceramicAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const bodyId = input && input.body ? String(input.body.id || '') : '';
  if (bodyId !== 'ceramic') return;
  state.ceramicAchievedNotified = true;
  addAchievementCard('ceramic', '温润如玉', '陶瓷机身机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了陶瓷机身机型，恭喜达成 <strong>温润如玉</strong> 成就！<br>这波是“观感高级，手感讲究，钱包先抖”。'
  );
}

function checkNoCameraAchievement(buildLike) {
  if (state.ended || state.noCameraAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const cams = input && input.cams ? input.cams : null;
  if (!cams) return;
  const noMain = !cams.main || cams.main.id === 'none';
  const noUltra = !cams.ultra || cams.ultra.id === 'none';
  const noMono = !cams.mono || cams.mono.id === 'none';
  const noTele = !cams.tele || cams.tele.id === 'none';
  const noFront = !cams.front || cams.front.id === 'none';
  if (!(noMain && noUltra && noMono && noTele && noFront)) return;
  state.noCameraAchievedNotified = true;
  addAchievementCard('no_camera', '苞米', '全无摄像头机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了“全无摄像头”机型，恭喜达成 <strong>苞米</strong> 成就！<br>这波是“主打一个不拍照，只管打电话和刷机”。'
  );
}

function checkAramidAchievement(buildLike) {
  if (state.ended || state.aramidAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const bodyId = input && input.body ? String(input.body.id || '') : '';
  if (bodyId !== 'aramid') return;
  state.aramidAchievedNotified = true;
  addAchievementCard('aramid', '能防弹吗？', '芳纶复合后盖机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了芳纶复合后盖机型，恭喜达成 <strong>能防弹吗？</strong> 成就！<br>这波是“后盖一看很硬核，参数一看也不含糊”。'
  );
}

function checkSelfieAchievement(buildLike) {
  if (state.ended || state.selfieAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const frontCam = input && input.cams ? input.cams.front : null;
  const frontCost = Number(frontCam && frontCam.cost ? frontCam.cost : 0);
  if (!(frontCam && frontCam.id !== 'none' && frontCost > 100)) return;
  state.selfieAchievedNotified = true;
  addAchievementCard('selfie', '自拍神器', '高规格前摄（成本>100）机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了高规格前摄机型，恭喜达成 <strong>自拍神器</strong> 成就！<br>这波是“后置先放一边，前置必须站C位”。'
  );
}

function checkTopLcdAchievement(buildLike) {
  if (state.ended || state.topLcdAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const disp = input && input.disp ? input.disp : null;
  const matName = disp && disp.mat ? String(disp.mat.name || '') : '';
  if (matName !== 'LCD') return;
  const selectedNames = new Set(
    Array.isArray(disp && disp.features) ? disp.features.map((f) => String((f && f.name) || '')) : []
  );
  const allFeatureNames = Object.values(displayFeatureMap || {}).map((f) => String((f && f.name) || ''));
  const hasAllFeatures = allFeatureNames.length > 0 && allFeatureNames.every((name) => selectedNames.has(name));
  if (!hasAllFeatures) return;
  state.topLcdAchievedNotified = true;
  addAchievementCard('top_lcd', '顶级LCD？！', 'LCD材质并全屏幕额外功能成功发售。');
  openGameModal(
    '成就解锁',
    '你把 LCD 的屏幕技术全拉满并成功发售，恭喜达成 <strong>顶级LCD？！</strong> 成就！<br>这波是“LCD 还能这样卷？参数党都沉默了”。'
  );
}

function checkFlagshipLcdDemonAchievement(buildLike) {
  if (state.ended || state.flagshipLcdDemonAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  if (!input) return;
  const disp = input.disp || {};
  const matName = disp.mat ? String(disp.mat.name || '') : '';
  if (matName !== 'LCD') return;
  const selectedNames = new Set(
    Array.isArray(disp.features) ? disp.features.map((f) => String((f && f.name) || '')) : []
  );
  const allFeatureNames = Object.values(displayFeatureMap || {}).map((f) => String((f && f.name) || ''));
  const hasAllDisplayFeatures = allFeatureNames.length > 0 && allFeatureNames.every((name) => selectedNames.has(name));
  if (!hasAllDisplayFeatures) return;

  const socTier = input.soc ? String(input.soc.tier || '') : '';
  if (!socTier.includes('旗舰+')) return;

  const skuList = Array.isArray(buildLike && buildLike.skuCosting) ? buildLike.skuCosting : [];
  if (!hasMaxMemorySku(skuList)) return;

  const extraCount = Array.isArray(input.chosenExtras) ? input.chosenExtras.length : 0;
  if (extraCount < 4) return;

  state.flagshipLcdDemonAchievedNotified = true;
  addAchievementCard('flagship_lcd_demon', '旗舰LCD魔王', 'LCD全特性+旗舰+SoC+满配内存存储+4项额外功能成功发售。');
  openGameModal(
    '成就解锁',
    '你把 LCD 全特性、旗舰+芯片、满配内存存储、以及一堆额外功能塞进同一台机子，恭喜达成 <strong>旗舰LCD魔王</strong> 成就！<br>这波是“配置单像战书，友商看完先沉默”。'
  );
}

function checkThermalManiacAchievement(buildLike) {
  if (state.ended || state.thermalManiacAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const extras = Array.isArray(input && input.chosenExtras) ? input.chosenExtras : [];
  const hasVC = extras.some((x) => x && x.id === 'vc');
  const hasFan = extras.some((x) => x && x.id === 'active_fan');
  if (!(hasVC && hasFan)) return;
  state.thermalManiacAchievedNotified = true;
  addAchievementCard('thermal_maniac', '散热狂魔', 'VC均热板+散热风扇机型成功发售。');
  openGameModal(
    '成就解锁',
    '你把 VC 均热板和散热风扇一起端上来了，恭喜达成 <strong>散热狂魔</strong> 成就！<br>这波是“性能先别急，先给温度上强度”。'
  );
}

function checkSatelliteAchievement(buildLike) {
  if (state.ended || state.satelliteAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const extras = Array.isArray(input && input.chosenExtras) ? input.chosenExtras : [];
  const hasSatellite = extras.some((x) => x && x.id === 'satellite');
  if (!hasSatellite) return;
  state.satelliteAchievedNotified = true;
  addAchievementCard('satellite', '天空属于？', '带卫星SOS通信机型成功发售。');
  openGameModal(
    '成就解锁',
    '你把卫星 SOS 通信做进量产机了，恭喜达成 <strong>天空属于？</strong> 成就！<br>这波是“地面信号不稳？那就直接抬头找星星”。'
  );
}

function checkBatteryTechAchievement(buildLike) {
  if (state.ended || state.batteryTechAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const extras = Array.isArray(input && input.chosenExtras) ? input.chosenExtras : [];
  const hasBatteryTech = extras.some((x) => x && x.id === 'battery_tech');
  const hasFast120 = extras.some((x) => x && x.id === 'fast120');
  if (!(hasBatteryTech && hasFast120)) return;
  state.batteryTechAchievedNotified = true;
  addAchievementCard('battery_tech', '电池科技', '高密度电池技术+超级快充机型成功发售。');
  openGameModal(
    '成就解锁',
    '你把高密度电池和超级快充一起端上来了，恭喜达成 <strong>电池科技</strong> 成就！<br>这波是“续航和回血都要，充电头先冒汗”。'
  );
}

function checkMagsafeAchievement(buildLike) {
  if (state.ended || state.magsafeAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const extras = Array.isArray(input && input.chosenExtras) ? input.chosenExtras : [];
  const hasMagsafe = extras.some((x) => x && x.id === 'magsafe');
  if (!hasMagsafe) return;
  state.magsafeAchievedNotified = true;
  addAchievementCard('magsafe', '磁能科技', '磁吸生态配件机型成功发售。');
  openGameModal(
    '成就解锁',
    '你把磁吸生态配件做进量产机了，恭喜达成 <strong>磁能科技</strong> 成就！<br>这波是“咔哒一吸，仪式感和生态位一起就位”。'
  );
}

function checkIp68EasyAchievement(buildLike) {
  if (state.ended || state.ip68EasyAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const extras = Array.isArray(input && input.chosenExtras) ? input.chosenExtras : [];
  const hasIp68 = extras.some((x) => x && x.id === 'ip68_cert');
  if (!hasIp68) return;
  state.ip68EasyAchievedNotified = true;
  addAchievementCard('ip68_easy', '洒洒水咯', '包含 IP68 功能的机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了带 <strong>IP68</strong> 的机型，恭喜达成 <strong>洒洒水咯</strong> 成就！<br>这波是“下雨天也稳，水杯翻了也稳”。'
  );
}

function checkSmallScreenAchievement(buildLike) {
  if (state.ended || state.smallScreenAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const size = Number(input && input.disp ? input.disp.size : 0);
  if (!(size > 0 && size < 6)) return;
  state.smallScreenAchievedNotified = true;
  addAchievementCard('small_screen', '小屏手机的理想', '屏幕小于6寸机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了小于 6 寸的小屏机，恭喜达成 <strong>小屏手机的理想</strong> 成就！<br>这波是“单手握持党狂喜，论坛瞬间开香槟”。'
  );
}

function checkFlatBackAchievement(buildLike) {
  if (state.ended || state.flatBackAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const y = Number(input && input.calendarYear || state.historicalYear || HISTORICAL_HANDOFF_YEAR);
  // 2018年前该功能在时间线上显示为“矩阵DECO”，不计入“纯平背板”成就。
  if (y < 2018) return;
  const extras = Array.isArray(input && input.chosenExtras) ? input.chosenExtras : [];
  const hasFlatBack = extras.some((x) => x && x.id === 'flat_back');
  if (!hasFlatBack) return;
  state.flatBackAchievedNotified = true;
  addAchievementCard('flat_back', '消灭矩阵', '纯平背板机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了纯平背板机型，恭喜达成 <strong>消灭矩阵</strong> 成就！<br>这波是“背面干净利落，视觉强迫症当场治愈”。'
  );
}

function checkLargeScreenAchievement(buildLike) {
  if (state.ended || state.largeScreenAchievedNotified) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const size = Number(input && input.disp ? input.disp.size : 0);
  if (!(size > 8)) return;
  state.largeScreenAchievedNotified = true;
  addAchievementCard('large_screen', '大就是好', '屏幕大于8寸机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了大于 8 寸的机型，恭喜达成 <strong>大就是好</strong> 成就！<br>这波是“口袋先别想，观感先拉满”。'
  );
}

function checkGoodLuckAchievement(opportunity) {
  if (state.ended || state.goodLuckAchievedNotified || !opportunity) return;
  const strongBuffIds = new Set(['top_reviewer', 'headline_report', 'tech_breakthrough']);
  const isStrongBuff = strongBuffIds.has(String(opportunity.id || ''));
  if (!isStrongBuff) return;
  state.goodLuckAchievedNotified = true;
  addAchievementCard('good_luck', '好运降临', '运营中命中顶级强 buff 事件。');
  openGameModal(
    '成就解锁',
    `本月强力加成命中：<strong>${opportunity.name}</strong>。<br>恭喜达成 <strong>好运降临</strong> 成就！<br>这波属于“天时地利人和，一把就把热度打穿”。`
  );
}

function checkNoRefreshAchievement(buildLike) {
  if (state.ended || state.noRefreshAchievedNotified) return;
  const noveltyTag = String((buildLike && buildLike.noveltyTag) || '');
  const noveltyMul = Number((buildLike && buildLike.noveltyDemandMul) || 1);
  const isSevereFatigue = noveltyTag.includes('换代疲劳（严重）') || noveltyMul <= 0.68;
  if (!isSevereFatigue) return;
  state.noRefreshAchievedNotified = true;
  addAchievementCard('no_refresh_shell', '科技以不换壳为本', '严重换代疲劳机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了“换代疲劳（严重）”机型，恭喜达成 <strong>科技以不换壳为本</strong> 成就！<br>这波是“发布会PPT翻到最后，观众发现和上代像双胞胎”。'
  );
}

function checkSqueezeToothpasteAchievement(buildLike) {
  if (state.ended || state.squeezeToothpasteAchievedNotified) return;
  const noveltyTag = String((buildLike && buildLike.noveltyTag) || '');
  const noveltyMul = Number((buildLike && buildLike.noveltyDemandMul) || 1);
  const isSevere = noveltyTag.includes('换代疲劳（严重）') || noveltyMul <= 0.68;
  const isObvious = noveltyTag.includes('换代疲劳（明显）') || noveltyMul <= 0.78;
  if (!isObvious || isSevere) return;
  state.squeezeToothpasteAchievedNotified = true;
  addAchievementCard('squeeze_toothpaste', '挤牙膏', '明显换代疲劳机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了“换代疲劳（明显）”机型，恭喜达成 <strong>挤牙膏</strong> 成就！<br>这波是“参数有变，体感要靠想象力补完”。'
  );
}

function checkBrandToneAchievement(buildLike) {
  if (state.ended || state.brandToneAchievedNotified) return;
  const noveltyTag = String((buildLike && buildLike.noveltyTag) || '');
  const noveltyMul = Number((buildLike && buildLike.noveltyDemandMul) || 1);
  const isSevere = noveltyTag.includes('换代疲劳（严重）') || noveltyMul <= 0.68;
  const isObvious = noveltyTag.includes('换代疲劳（明显）') || noveltyMul <= 0.78;
  const isConservative = noveltyTag.includes('换代改动偏保守') || noveltyMul <= 0.9;
  if (!isConservative || isSevere || isObvious) return;
  state.brandToneAchievedNotified = true;
  addAchievementCard('brand_tone', '打造品牌调性', '保守换代机型成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了“换代改动偏保守”机型，恭喜达成 <strong>打造品牌调性</strong> 成就！<br>这波是“变化不大，但味道要对，用户一眼就认得你”。'
  );
}

function checkFirstLaunchAchievement() {
  if (state.ended || hasAchievement('first_launch')) return;
  addAchievementCard('first_launch', '运营的本当上手', '第一次完成立项并开售。');
  openGameModal(
    '成就解锁',
    '你完成了第一次立项并开售，恭喜达成 <strong>运营的本当上手</strong> 成就！'
  );
}

function checkBudgetFriendAchievement(buildLike) {
  if (state.ended || hasAchievement('budget_friend')) return;
  const input = buildLike && buildLike.input ? buildLike.input : null;
  const skuList = Array.isArray(buildLike && buildLike.skuCosting) ? buildLike.skuCosting : [];
  if (!input || !input.soc || !skuList.length) return;

  const activeSocs = (Array.isArray(socs) ? socs : []).filter((s) => s && !s.retired);
  if (!activeSocs.length) return;
  const cheapestSocCost = Math.min(...activeSocs.map((s) => Number(s.cost || 0)));
  if (Number(input.soc.cost || 0) !== cheapestSocCost) return;

  const minRam = getCheapestByCost(ramOptions);
  const minRom = getCheapestByCost(romOptions);
  if (!minRam || !minRom) return;
  const hasMinSku = skuList.some((s) => s && s.ram && s.rom && s.ram.id === minRam.id && s.rom.id === minRom.id);
  if (!hasMinSku) return;

  addAchievementCard('budget_friend', '用低价交个朋友', '最便宜 SoC + 最低内存存储 SKU 成功发售。');
  openGameModal(
    '成就解锁',
    '你成功发售了“最便宜 SoC + 最低内存存储 SKU”机型，恭喜达成 <strong>用低价交个朋友</strong> 成就！'
  );
}

function checkThinMarginAchievement(buildLike) {
  if (state.ended || hasAchievement('thin_margin')) return;
  const unitCost = Number(buildLike && buildLike.unitCost ? buildLike.unitCost : 0);
  const weightedPrice = Number(buildLike && buildLike.weightedSkuPrice ? buildLike.weightedSkuPrice : 0);
  if (!(unitCost > 0 && weightedPrice > 0)) return;
  const ratio = weightedPrice / unitCost;
  if (!(ratio > 1 && ratio <= 1.3)) return;
  addAchievementCard('thin_margin', '薄利多销', '定价高于成本且在成本+30%以内成功发售。');
  openGameModal(
    '成就解锁',
    '你以“薄利策略”成功发售机型，恭喜达成 <strong>薄利多销</strong> 成就！'
  );
}

function checkPremiumPushAchievement(buildLike) {
  if (state.ended || hasAchievement('premium_push')) return;
  const unitCost = Number(buildLike && buildLike.unitCost ? buildLike.unitCost : 0);
  const weightedPrice = Number(buildLike && buildLike.weightedSkuPrice ? buildLike.weightedSkuPrice : 0);
  if (!(unitCost > 0 && weightedPrice > 0)) return;
  const ratio = weightedPrice / unitCost;
  if (!(ratio > 3)) return;
  addAchievementCard('premium_push', '冲高之路', '定价高于生产成本200%以上成功发售。');
  openGameModal(
    '成就解锁',
    '你把定价拉到成本 3 倍以上并成功发售，恭喜达成 <strong>冲高之路</strong> 成就！'
  );
}

function updateDesignRestartButtonState() {
  if (!el.restartDesign) return;
  if (!el.stageConfig || el.stageConfig.classList.contains('hidden')) {
    el.restartDesign.classList.remove('restart-alert');
    return;
  }
  const oldUnits = el.units ? el.units.value : '';
  let shouldAlert = false;
  try {
    if (el.units) el.units.value = '1000';
    const minEval = evaluateBuild();
    shouldAlert = Boolean(minEval && Number(minEval.initialCost || 0) > Number(state.cash || 0));
  } catch (err) {
    shouldAlert = false;
  } finally {
    if (el.units) el.units.value = oldUnits;
  }
  el.restartDesign.classList.toggle('restart-alert', shouldAlert);
}

function snapshotDesignInputs() {
  const valueIds = [
    'soc', 'price', 'dispMat', 'dispVendor', 'dispSize', 'dispRatio', 'dispForm',
    'body', 'battery', 'procurementPlan', 'camMain', 'camUltra', 'camMono', 'camTele', 'camFront',
    'marketingFocus', 'campaignLevel', 'units', 'phoneH', 'phoneW', 'phoneT', 'backColor', 'frontFrameColor'
  ];
  const values = {};
  valueIds.forEach((id) => {
    const node = el[id];
    if (!node) return;
    values[id] = node.value;
  });
  const displayChecks = el.displayFeatures
    ? [...el.displayFeatures.querySelectorAll('input[type="checkbox"]')].map((c) => ({ value: c.value, checked: c.checked }))
    : [];
  const extraChecks = el.extraChecks
    ? [...el.extraChecks.querySelectorAll('input[type="checkbox"]')].map((c) => ({ value: c.value, checked: c.checked }))
    : [];
  const skuRows = el.skuList
    ? [...el.skuList.querySelectorAll('.sku-row')].map((row) => ({
      ram: row.querySelector('.sku-ram')?.value || getDefaultRamOptionId(),
      rom: row.querySelector('.sku-rom')?.value || getDefaultRomOptionId(),
      priceAdj: row.querySelector('.sku-price-adj')?.value || '0',
      share: row.querySelector('.sku-share')?.value || '0'
    }))
    : [];
  return { values, displayChecks, extraChecks, skuRows };
}

function restoreDesignInputs(snapshot) {
  if (!snapshot) return;
  Object.entries(snapshot.values || {}).forEach(([id, value]) => {
    const node = el[id];
    if (!node) return;
    if (id === 'soc') {
      node.value = normalizeSocId(value);
      return;
    }
    node.value = value;
  });
  if (el.displayFeatures) {
    const checks = new Map((snapshot.displayChecks || []).map((x) => [x.value, x.checked]));
    [...el.displayFeatures.querySelectorAll('input[type="checkbox"]')].forEach((c) => {
      if (c.disabled) {
        c.checked = false;
      } else if (checks.has(c.value)) {
        c.checked = Boolean(checks.get(c.value));
      }
    });
  }
  if (el.extraChecks) {
    const checks = new Map((snapshot.extraChecks || []).map((x) => [x.value, x.checked]));
    [...el.extraChecks.querySelectorAll('input[type="checkbox"]')].forEach((c) => {
      if (checks.has(c.value)) c.checked = Boolean(checks.get(c.value));
    });
  }
  if (el.skuList) {
    const rows = snapshot.skuRows && snapshot.skuRows.length
      ? snapshot.skuRows
      : [{ ram: getDefaultRamOptionId(), rom: getDefaultRomOptionId(), priceAdj: '0', share: '100' }];
    el.skuList.innerHTML = '';
    rows.forEach((seed) => addSkuRow(seed));
    refreshSkuButtons();
    updateSkuShareValidation(false);
  }
}

function getCheapestByCost(list) {
  const arr = Array.isArray(list) ? list : [];
  return arr.reduce((best, x) => {
    if (!x) return best;
    if (!best) return x;
    return Number(x.cost || 0) < Number(best.cost || 0) ? x : best;
  }, null);
}

function calcMinFeasibleDesignLaunchCost() {
  if (!state.marketPick || !el.region) return null;
  const cacheKey = [
    state.marketPick.key || 'none',
    el.region.value || 'none',
    state.memoryMarket ? state.memoryMarket.id : 'stable'
  ].join('|');
  const cache = state.minDesignLaunchCostCache;
  if (cache && cache.key === cacheKey && Number.isFinite(cache.cost)) {
    return cache.cost;
  }

  const snapshot = snapshotDesignInputs();
  let minCost = Number.POSITIVE_INFINITY;
  try {
    const cheapestSoc = getCheapestByCost(socs);
    const cheapestBody = getCheapestByCost(getBodyOptionsForYear(state.historicalYear));
    const cheapestRam = getCheapestByCost(ramOptions);
    const cheapestRom = getCheapestByCost(romOptions);
    const planKeys = Object.keys(procurementPlans);
    if (!cheapestSoc || !cheapestBody || !cheapestRam || !cheapestRom || !planKeys.length) {
      state.minDesignLaunchCostCache = { key: cacheKey, cost: Number.POSITIVE_INFINITY };
      return Number.POSITIVE_INFINITY;
    }

    if (el.soc) el.soc.value = cheapestSoc.id;
    if (el.price) el.price.value = '200';
    if (el.dispMat) el.dispMat.value = 'lcd';
    if (el.dispVendor) el.dispVendor.value = 'low';
    if (el.dispSize) el.dispSize.value = '3.0';
    if (el.dispRatio) el.dispRatio.value = '18:9';
    if (el.dispForm) el.dispForm.value = 'symmetry';
    if (el.body) el.body.value = cheapestBody.id;
    if (el.battery) el.battery.value = '1500';
    if (el.camMain) el.camMain.value = 'none';
    if (el.camUltra) el.camUltra.value = 'none';
    if (el.camMono) el.camMono.value = 'none';
    if (el.camTele) el.camTele.value = 'none';
    if (el.camFront) el.camFront.value = 'none';
    if (el.marketingFocus) el.marketingFocus.value = 'balanced';
    if (el.campaignLevel) el.campaignLevel.value = 'low';
    if (el.units) el.units.value = '1000';
    if (el.phoneH) el.phoneH.value = '120';
    if (el.phoneW) el.phoneW.value = '60';
    if (el.phoneT) el.phoneT.value = '8.0';

    if (el.displayFeatures) {
      [...el.displayFeatures.querySelectorAll('input[type="checkbox"]')].forEach((c) => { c.checked = false; });
    }
    if (el.extraChecks) {
      [...el.extraChecks.querySelectorAll('input[type="checkbox"]')].forEach((c) => { c.checked = false; });
    }

    if (el.skuList) {
      el.skuList.innerHTML = '';
      addSkuRow({ ram: cheapestRam.id, rom: cheapestRom.id, priceAdj: 0, share: 100 });
      refreshSkuButtons();
      updateSkuShareValidation(false);
    }

    planKeys.forEach((key) => {
      if (el.procurementPlan) el.procurementPlan.value = key;
      const evalResult = evaluateBuild();
      if (!evalResult.issues.length && Number.isFinite(evalResult.initialCost)) {
        minCost = Math.min(minCost, evalResult.initialCost);
      }
    });
  } catch (err) {
    minCost = Number.POSITIVE_INFINITY;
  } finally {
    restoreDesignInputs(snapshot);
  }

  state.minDesignLaunchCostCache = { key: cacheKey, cost: minCost };
  return minCost;
}

function checkDesignDeadEndByCash() {
  if (!el.stageConfig || el.stageConfig.classList.contains('hidden')) return;
  if (state.ended || !state.marketPick) return;
  const minCost = calcMinFeasibleDesignLaunchCost();
  if (!Number.isFinite(minCost)) return;
  if (Number(state.cash || 0) < minCost) {
    if (!state.designDeadEndNotified) {
      state.designDeadEndNotified = true;
      endGame('现金不足以支持任何可行的最低 1000 台量产方案。');
      openGameModal(
        '游戏结束',
        `现金已经不足以覆盖最低可行方案的 <strong>1000 台</strong>启动成本（约 ${RMB(minCost)}）。<br>这波属于“再生产失败，工厂连开机费都不够”。`,
        'gameover'
      );
    }
    return;
  }
  state.designDeadEndNotified = false;
}

function placeContinueNext(mode = 'auto') {
  if (!el.continueNext) return;
  const target = mode === 'manual' ? el.runStopRow : el.runPrimaryRow;
  if (target && el.continueNext.parentElement !== target) {
    target.appendChild(el.continueNext);
  }
}

function applyRatingDeltaByDifficulty(delta, diffName, yearLike = HISTORICAL_HANDOFF_YEAR) {
  if (diffName === '真实') {
    const y = Number(yearLike || HISTORICAL_HANDOFF_YEAR);
    if (delta >= 0) {
      const posMul = y <= 2016
        ? 1.28
        : y <= 2019
          ? 1.24
          : y <= 2023
            ? 1.22
            : 1.2;
      return delta * posMul;
    }
    const negMul = y <= 2016
      ? 0.58
      : y <= 2019
        ? 0.64
        : y <= 2023
          ? 0.68
          : 0.72;
    return delta * negMul;
  }
  return delta;
}

function calcRestockQuote() {
  const p = state.product;
  if (!p || !state.launched || state.phaseEnded || state.ended) return null;
  const restockRaw = String(el.restockUnits ? el.restockUnits.value : '').trim();
  if (!isStrictIntegerText(restockRaw)) return null;
  const add = Number(restockRaw);
  const skuId = el.restockSku ? el.restockSku.value : '';
  const sku = (p.skuStats || []).find((x) => x.id === skuId);
  if (!sku || add < 1000 || add > 200000) return null;
  let renewalCost = 0;
  let lockCommitRenewCost = 0;
  const nextProduced = p.producedTotal + add;
  if (p.input.procurement.coverageMultiplier > 0 && nextProduced > p.contractUnits) {
    renewalCost = p.input.procurement.renewUpfront;
    const extendUnits = Math.ceil(add * Math.max(0.8, p.input.procurement.coverageMultiplier));
    const extraCommitUnits = Math.max(0, extendUnits - add);
    lockCommitRenewCost = extraCommitUnits * (sku.unitCost || p.unitCost) * (p.input.procurement.lockCommitRate || 0);
  }
  const skuCostBase = sku.unitCost || p.unitCost;
  const totalCost = add * skuCostBase * (state.marketPick.cost * 0.98) / p.supplyStability + 140_000 + renewalCost + lockCommitRenewCost;
  return {
    sku,
    add,
    totalCost,
    affordable: totalCost <= Number(state.cash || 0)
  };
}

function renderMobileRunDockQuote(options = {}) {
  if (!el.runMobileDockQuote) return;
  const restockUnitsIsInteger = validateIntegerInput(el.restockUnits, el.restockIntHint, { showHint: true });
  if (!restockUnitsIsInteger) {
    el.runMobileDockQuote.textContent = '补货数量仅支持整数';
    el.runMobileDockQuote.classList.remove('is-good', 'is-bad', 'is-bump');
    el.runMobileDockQuote.classList.add('is-bad');
    return;
  }
  const quote = calcRestockQuote();
  if (!quote) {
    el.runMobileDockQuote.textContent = state.launched ? '请选择补货 SKU 与数量' : '等待开售';
    el.runMobileDockQuote.classList.remove('is-good', 'is-bad', 'is-bump');
    return;
  }
  el.runMobileDockQuote.textContent = `${quote.sku.name} ${quote.add.toLocaleString('zh-CN')} 台 · ${RMB(quote.totalCost)}`;
  el.runMobileDockQuote.classList.toggle('is-good', quote.affordable);
  el.runMobileDockQuote.classList.toggle('is-bad', !quote.affordable);
  if (options.bump) {
    el.runMobileDockQuote.classList.remove('is-bump');
    void el.runMobileDockQuote.offsetWidth;
    el.runMobileDockQuote.classList.add('is-bump');
    window.setTimeout(() => {
      if (!el.runMobileDockQuote) return;
      el.runMobileDockQuote.classList.remove('is-bump');
    }, 520);
  }
}

function renderMobileRunDockInventory() {
  if (!el.runMobileDockInv) return;
  const inv = getOnHandInventoryUnits();
  el.runMobileDockInv.textContent = `库存 ${inv.toLocaleString('zh-CN')}`;
}

function ensureInventoryUiSyncTimer() {
  if (inventoryUiSyncTimer) return;
  inventoryUiSyncTimer = window.setInterval(() => {
    if (!el.stageRun || el.stageRun.classList.contains('hidden')) return;
    refreshInventoryUiOnly();
  }, 1800);
}

function isMobileViewportForRunDock() {
  try {
    return window.matchMedia('(max-width: 760px)').matches;
  } catch {
    return window.innerWidth <= 760;
  }
}

function updateRunDockViewportAnchor() {
  if (!el.runMobileDock) return;
  const base = 8;
  let extra = 0;
  if (isMobileViewportForRunDock() && window.visualViewport) {
    const vv = window.visualViewport;
    const layoutHeight = Math.max(
      window.innerHeight || 0,
      document.documentElement ? (document.documentElement.clientHeight || 0) : 0
    );
    const visualBottom = (vv.offsetTop || 0) + (vv.height || 0);
    // Positive gap means browser UI / viewport contraction is eating bottom space.
    extra = Math.max(0, Math.round(layoutHeight - visualBottom));
  }
  el.runMobileDock.style.setProperty('--run-dock-bottom', `calc(${Math.round(base + extra)}px + env(safe-area-inset-bottom, 0px))`);
}

function syncRunDockLayoutGap() {
  const varName = '--mobile-run-dock-h';
  let h = 0;
  if (el.runMobileDock && !el.runMobileDock.classList.contains('hidden')) {
    const rect = el.runMobileDock.getBoundingClientRect();
    h = Math.max(0, Math.ceil(rect.height || 0));
  }
  document.documentElement.style.setProperty(varName, `${h}px`);
  if (el.stageRun) {
    el.stageRun.style.setProperty(varName, `${h}px`);
  }
}

function showMobileRunDockAction(message, type = 'neutral') {
  if (!el.runMobileDockAction) return;
  el.runMobileDockAction.textContent = message;
  el.runMobileDockAction.classList.remove('is-good', 'is-bad', 'is-neutral', 'is-pop');
  el.runMobileDockAction.classList.add(type === 'good' ? 'is-good' : type === 'bad' ? 'is-bad' : 'is-neutral');
  void el.runMobileDockAction.offsetWidth;
  el.runMobileDockAction.classList.add('is-pop');
  window.setTimeout(() => {
    if (!el.runMobileDockAction) return;
    el.runMobileDockAction.classList.remove('is-pop');
  }, 420);
}

function refreshMobileRunDock() {
  if (!el.runMobileDock) return;
  const shouldShow = isMobileViewportForRunDock() && !el.stageRun.classList.contains('hidden');
  el.runMobileDock.classList.toggle('hidden', !shouldShow);
  if (!shouldShow) {
    syncRunDockLayoutGap();
    return;
  }
  updateRunDockViewportAnchor();
  renderMobileRunDockInventory();
  renderMobileRunDockQuote();
  window.requestAnimationFrame(syncRunDockLayoutGap);
}

function resetRestockButtonState() {
  if (!el.restock) return;
  el.restock.classList.remove('restock-success', 'restock-fail');
}

function markRestockFailed() {
  if (!el.restock) return;
  el.restock.classList.remove('restock-success');
  el.restock.classList.add('restock-fail');
}

function flashRestockSuccess() {
  if (!el.restock) return;
  el.restock.classList.remove('restock-fail', 'restock-success');
  // Force reflow so repeated success clicks can replay animation.
  void el.restock.offsetWidth;
  el.restock.classList.add('restock-success');
  window.setTimeout(() => {
    if (!el.restock) return;
    el.restock.classList.remove('restock-success');
  }, 820);
}

function takeGenerationLoan() {
  if (!state.product || !state.launched || state.phaseEnded || state.ended) {
    el.reportBox.innerHTML = '当前没有可申请贷款的在售机型。';
    showMobileRunDockAction('贷款操作失败（当前不可申请）', 'bad');
    return;
  }
  const p = state.product;
  if (p.loanDecision === 'taken') {
    el.reportBox.innerHTML = '本代贷款已使用，无法重复申请。';
    showMobileRunDockAction('贷款操作失败（已使用）', 'bad');
    return;
  }
  if (p.loanDecision === 'declined') {
    el.reportBox.innerHTML = '你已放弃本代贷款，不能再次申请。';
    showMobileRunDockAction('贷款操作失败（已放弃）', 'bad');
    return;
  }
  const repayAmount = calcGenerationLoanRepayAmount();
  const dueCompanyMonth = state.companyMonthsTotal + GENERATION_LOAN_TERM_MONTHS;
  const loan = {
    id: `L${Date.now()}${Math.floor(Math.random() * 1000)}`,
    modelName: p.modelName || '未知机型',
    productGen: p.modelGeneration || (state.productHistory.length + 1),
    principal: GENERATION_LOAN_PRINCIPAL,
    annualRate: GENERATION_LOAN_ANNUAL_RATE,
    repayAmount,
    takenCompanyMonth: state.companyMonthsTotal,
    dueCompanyMonth,
    settled: false
  };
  state.loans.push(loan);
  p.loanDecision = 'taken';
  p.loanId = loan.id;
  state.cash += GENERATION_LOAN_PRINCIPAL;
  resetRestockButtonState();
  updateHeader();
  checkCashMilestones();
  el.reportBox.innerHTML = '已使用本代贷款：现金已补充。到期时会自动扣款，请提前留足现金。';
  showMobileRunDockAction('已使用本代贷款', 'good');
  renderMobileRunDockQuote({ bump: true });
}

function declineGenerationLoan() {
  if (!state.product || !state.launched || state.phaseEnded || state.ended) {
    el.reportBox.innerHTML = '当前没有可放弃贷款的在售机型。';
    return;
  }
  const p = state.product;
  if (p.loanDecision === 'taken') {
    el.reportBox.innerHTML = '本代贷款已使用，不能放弃。';
    return;
  }
  if (p.loanDecision === 'declined') {
    el.reportBox.innerHTML = '本代贷款已放弃。';
    return;
  }
  p.loanDecision = 'declined';
  el.reportBox.innerHTML = '已放弃本代贷款；本代运营期间不再提供该笔贷款。';
}

function nextMonth() {
  if (state.phaseEnded) {
    el.reportBox.innerHTML = '当前机型周期已结束，请选择“进入下一代机型”或“企业结算”。';
    showMobileRunDockAction('推进失败（当前机型已结束）', 'bad');
    return;
  }
  if (!state.launched || state.ended) {
    el.reportBox.innerHTML = '请先开售。';
    showMobileRunDockAction('推进失败（尚未开售）', 'bad');
    return;
  }

  state.month += 1;
  state.companyMonthsTotal += 1;
  maybeAdvanceHistoricalEra('time');
  maybeRefreshTechComponentPool('time');
  maybeRefreshMemoryPools('time');
  maybeRefreshDisplayScoreProgress('time');
  maybeRefreshExtraCosts('time');
  maybeRefreshFutureBatteryDensity('time');
  maybeRefreshFutureFastChargePower('time');
  if (state.ended || !state.product) {
    updateHeader();
    return;
  }
  resetRestockButtonState();
  const p = state.product;
  const dueLoans = state.loans.filter((x) => !x.settled && x.dueCompanyMonth <= state.companyMonthsTotal);
  const loanDueThisMonth = dueLoans.reduce((sum, x) => sum + x.repayAmount, 0);
  dueLoans.forEach((x) => { x.settled = true; });
  if (loanDueThisMonth > 0) {
    state.cash -= loanDueThisMonth;
    state.costTotal += loanDueThisMonth;
    state.companyCostTotal += loanDueThisMonth;
    if (state.cash <= 0) {
      el.reportBox.innerHTML = '本月触发贷款还款，扣款后现金为负。<br><span class="bad">企业破产。</span>';
      endGame('贷款到期扣款后资金链断裂，企业破产。');
      openGameModal(
        '游戏结束',
        '现金已经为负，账本写着：<strong>破产</strong>。<br>这波是“销量未必输，现金流先走了”。',
        'gameover'
      );
      showMobileRunDockAction('已推进下一月（触发破产）', 'bad');
      return;
    }
  }
  const noise = monthlyNoise();
  const swan = rollBlackSwan(p);
  const opportunity = rollOpportunity(p, swan);
  const runtimeFeatureAdjustment = calcRuntimeFeatureDemandAdjustment(p, state.historicalYear);
  state.shortEvents.push(noise.name);
  if (swan) state.shortEvents.push(`黑天鹅:${swan.name}`);
  if (opportunity) state.shortEvents.push(`机遇:${opportunity.name}`);
  if (runtimeFeatureAdjustment.retiredCount > 0) {
    state.shortEvents.push(`时代更替: ${runtimeFeatureAdjustment.retiredCount} 项历史功能红利退场`);
  }
  checkGoodLuckAchievement(opportunity);

  const swanDemandMul = swan ? (swan.demandMul || 1) : 1;
  const swanCostMul = swan ? (swan.costMul || 1) : 1;
  const swanRatingDelta = swan ? (swan.ratingDelta || 0) : 0;
  const swanCashHit = swan ? (swan.cashHit || 0) : 0;
  const swanReceivableHoldRatio = swan ? (swan.receivableHoldRatio || 0) : 0;
  const swanForcePhaseEnd = Boolean(swan && swan.forcePhaseEnd);
  const swanInstantKill = Boolean(swan && swan.instantKill);
  const oppDemandMul = opportunity ? (opportunity.demandMul || 1) : 1;
  const oppCostMul = opportunity ? (opportunity.costMul || 1) : 1;
  const oppRatingDelta = opportunity
    ? scaleOpportunityRatingDeltaByDifficulty(
      (opportunity.ratingDelta || 0),
      p.input.startupDifficulty?.name || '真实'
    )
    : 0;
  const oppCashBoost = opportunity ? (opportunity.cashBoost || 0) : 0;
  const oppOnlineMul = opportunity ? (opportunity.onlineMul || 1) : 1;

  if (swan && swan.pipelineDelay > 0 && p.pipeline.length) {
    p.pipeline = p.pipeline.map((x) => ({ ...x, arriveMonth: x.arriveMonth + swan.pipelineDelay }));
  }
  if (swan && swan.leadPenaltyMonths > 0) {
    p.leadPenaltyMonthsRemain = Math.max(p.leadPenaltyMonthsRemain || 0, swan.leadPenaltyMonths);
    p.leadPenaltyExtra = Math.max(p.leadPenaltyExtra || 0, swan.leadPenaltyExtra || 0);
  }

  const arrivals = p.pipeline.filter((x) => x.arriveMonth <= state.month);
  const arrivedBySku = {};
  const preorderDeliveredBySku = {};
  let preorderDeliveredThisMonth = 0;
  let arrivedThisMonth = 0;
  arrivals.forEach((x) => {
    arrivedThisMonth += x.units;
    const resolvedSkuId = x.skuId || ((p.skuStats && p.skuStats[0]) ? p.skuStats[0].id : '');
    if (!resolvedSkuId) return;
    let incoming = x.units;
    const backlog = Number((p.preorderBacklogBySku || {})[resolvedSkuId] || 0);
    const fulfillPreorder = Math.min(incoming, backlog);
    if (fulfillPreorder > 0) {
      p.preorderBacklogBySku[resolvedSkuId] -= fulfillPreorder;
      preorderDeliveredBySku[resolvedSkuId] = (preorderDeliveredBySku[resolvedSkuId] || 0) + fulfillPreorder;
      preorderDeliveredThisMonth += fulfillPreorder;
      p.preorderFulfilledTotal += fulfillPreorder;
      incoming -= fulfillPreorder;
    }
    if (incoming > 0) {
      arrivedBySku[resolvedSkuId] = (arrivedBySku[resolvedSkuId] || 0) + incoming;
    }
  });
  Object.entries(arrivedBySku).forEach(([skuId, units]) => {
    state.inventoryBySku[skuId] = (state.inventoryBySku[skuId] || 0) + units;
  });
  syncInventoryTotal();
  p.pipeline = p.pipeline.filter((x) => x.arriveMonth > state.month);

  const lifecycleState = calcLifecycleState(
    state.month,
    p.lifecycleMaxMonths || DEFAULT_LIFECYCLE_MONTHS,
    p.stockoutStress || 0,
    p.demandSlump || 0
  );
  const dynamicPhaseState = calcDynamicPhaseState(p, state.month, lifecycleState.phase);
  const life = clamp(lifecycleState.life * dynamicPhaseState.lifeAdj, 0.05, 1.42);
  const brandRamp = clamp(
    (0.46 + Math.log1p(state.month) * 0.17 + (state.rating - 50) / 180) * (p.input.startupDifficulty?.brandRamp || 1),
    0.42,
    1.22
  );
  const reputation = clamp(0.78 + state.rating / 180, 0.72, 1.3);
  const diff = p.input.startupDifficulty || startupDifficulties.real;
  const isHard = diff.name === '困难';
  const launchYear = Number(p.input && p.input.calendarYear || state.historicalYear || HISTORICAL_HANDOFF_YEAR);
  const historicalTuning = getHistoricalDemandTuning(p.input && p.input.calendarYear);
  const earlyDemandStabilityMul = launchYear <= 2016
    ? 0.72
    : launchYear <= 2019
      ? 0.8
      : launchYear <= 2023
        ? 0.88
        : 1.0;
  const phaseVolatilityAdj = dynamicPhaseState.phase === '导入期'
    ? -0.08
    : dynamicPhaseState.phase === '成长期'
      ? -0.03
      : dynamicPhaseState.phase === '成熟期'
        ? 0.04
        : 0.12;
  const phaseCrashAdj = dynamicPhaseState.phase === '导入期'
    ? 0.01
    : dynamicPhaseState.phase === '成长期'
      ? -0.02
      : dynamicPhaseState.phase === '成熟期'
        ? 0.03
        : 0.08;
  const phaseReboundAdj = dynamicPhaseState.phase === '导入期'
    ? -0.01
    : dynamicPhaseState.phase === '成长期'
      ? 0.04
      : dynamicPhaseState.phase === '成熟期'
        ? 0.01
        : -0.05;
  const baseVolatility = state.month <= 2
    ? 0.34
    : state.month <= 6
      ? 0.42
      : state.month <= 12
        ? 0.56
        : 0.72;
  const volatilitySpan = clamp(
    (baseVolatility + phaseVolatilityAdj)
      * (1 + (p.stockoutStress || 0) * 0.55)
      * (diff.demandVolatilityMul || 1.0)
      * (historicalTuning.volatilityMul || 1.0)
      * earlyDemandStabilityMul,
    0.12,
    1.15
  );
  const randomness = clamp(1 + rnd(-volatilitySpan, volatilitySpan), 0.05, 2.15);
  const crashBaseProb = state.month <= 3
    ? 0.04
    : state.month <= 9
      ? 0.09
      : state.month <= 15
        ? 0.15
        : 0.24;
  const crashProb = clamp(
    crashBaseProb * (diff.crashProbMul || 1.0)
      + phaseCrashAdj
      + (p.stockoutStress || 0) * 0.22
      + (noise.demand < 0.92 ? 0.08 : 0)
      + (swanDemandMul < 0.85 ? 0.12 : 0)
      - (oppDemandMul > 1.1 ? 0.04 : 0)
      + ((p.demandSlump || 0) * 0.18)
      + (historicalTuning.crashAdj || 0),
    0.03,
    0.85
  ) * earlyDemandStabilityMul;
  let demandShockMul = 1;
  let slumpDelta = 0;
  if (Math.random() < crashProb) {
    const severeCrashProb = clamp(
      0.18
        + (p.stockoutStress || 0) * 0.35
        + (state.month > 12 ? 0.08 : 0)
        + (isHard ? 0.08 : 0)
        + ((p.demandSlump || 0) * 0.25),
      0.12,
      0.82
    );
    if (Math.random() < severeCrashProb) {
      const earlyShockGuard = launchYear <= 2023 ? 0.35 : 0;
      demandShockMul = rnd(0 + earlyShockGuard, 0.18 + earlyShockGuard);
      if (launchYear > 2023 && Math.random() < 0.32) demandShockMul = 0;
      slumpDelta = rnd(0.2, 0.42) * earlyDemandStabilityMul;
    } else {
      const earlyShockGuard = launchYear <= 2023 ? 0.12 : 0;
      demandShockMul = rnd(0.22 + earlyShockGuard, 0.72 + earlyShockGuard * 0.5);
      slumpDelta = rnd(0.08, 0.22) * earlyDemandStabilityMul;
    }
  } else {
    const reboundProb = clamp(
      0.08
        + phaseReboundAdj
        + Math.max(0, (state.rating - 72) / 220)
        + (noise.demand > 1.05 ? 0.06 : 0)
        - ((p.demandSlump || 0) * 0.25),
      0.03,
      0.22
    );
    if (Math.random() < reboundProb * (diff.reboundProbMul || 1.0) * (historicalTuning.reboundMul || 1.0)) {
      demandShockMul = rnd(1.02, 1.14);
    }
    slumpDelta = -Math.max(0.01, (diff.slumpRecovery || 0.04) + (historicalTuning.slumpRecoveryBonus || 0));
  }
  p.demandSlump = clamp((p.demandSlump || 0) + slumpDelta, 0, 0.85);
  const slumpMul = clamp(1 - p.demandSlump, 0.08, 1.0);
  const onlinePulse = clamp((0.9 + p.onlineShare * 0.28 + (p.geekAttraction / 100) * 0.12) * oppOnlineMul, 0.88, 1.45);
  const stockoutDecay = clamp(1 - (p.stockoutStress || 0) * 0.28 - p.idleNoStockMonths * 0.06, 0.32, 1.02);
  const remainingMarket = Math.max(0, p.marketCapacity - p.marketConsumed);
  const saturationFactor = clamp(remainingMarket / Math.max(1, p.marketCapacity), 0.16, 1.0);
  const isRealFirstGenFirstMonth = diff.name === '真实' && Number(p.modelGeneration || 1) === 1 && state.month === 1;
  const isEarlyEraColdStart = launchYear >= 2014 && launchYear <= 2019;
  const earlyEraColdStartEase = isEarlyEraColdStart
    ? (0.05 + clamp((2019 - launchYear) / 5, 0, 1) * 0.03) // 2019:+0.05, 2014:+0.08
    : 0;
  const coldStartMul = isRealFirstGenFirstMonth
    ? clamp(
      0.78
        + Math.max(0, (state.rating - 50) / 520)
        + Math.max(0, ((p.qualityScore || 60) - 60) / 620),
      0.78 + earlyEraColdStartEase,
      0.9 + earlyEraColdStartEase
    )
    : 1.0;
  const earlyEraDemandBoostMul = launchYear <= 2015
    ? 1.65
    : launchYear <= 2016
      ? 1.5
      : launchYear <= 2019
        ? 1.34
        : launchYear <= 2023
          ? 1.18
          : 1.0;
  const demandRaw =
    p.baseDemand
    * life
    * brandRamp
    * reputation
    * randomness
    * noise.demand
    * swanDemandMul
    * oppDemandMul
    * demandShockMul
    * slumpMul
    * onlinePulse
    * stockoutDecay
    * saturationFactor
    * coldStartMul
    * earlyEraDemandBoostMul
    * runtimeFeatureAdjustment.mul;
  const launchMonthCap = isRealFirstGenFirstMonth ? 1500 : Number.POSITIVE_INFINITY;
  const demand = Math.max(0, Math.min(remainingMarket, demandRaw, launchMonthCap));

  const inventoryBefore = state.inventory;
  const rawDemandTarget = Math.max(0, Math.round(demand));
  const lastDemand = Array.isArray(p.demandHistory) && p.demandHistory.length
    ? Number(p.demandHistory[p.demandHistory.length - 1] || 0)
    : null;
  let demandTarget = rawDemandTarget;
  if (lastDemand !== null) {
    const blended = lastDemand + (rawDemandTarget - lastDemand) * 0.42;
    const prevMomentum = Number(p.demandMomentum || 0);
    const dir = Math.sign(rawDemandTarget - lastDemand);
    const momentum = dir === 0
      ? prevMomentum * 0.45
      : (Math.sign(prevMomentum) === dir
        ? clamp(prevMomentum * 0.58 + dir * 120, -420, 420)
        : clamp(prevMomentum * 0.32 + dir * 80, -320, 320));
    p.demandMomentum = momentum;
    const trendCandidate = Math.round(blended + momentum);
    const trendSwingCap = launchYear <= 2016
      ? 520
      : launchYear <= 2019
        ? 640
        : launchYear <= 2023
          ? 760
          : 1000;
    const lower = Math.max(0, lastDemand - trendSwingCap);
    const upper = lastDemand + trendSwingCap;
    demandTarget = clamp(trendCandidate, lower, upper);
  } else {
    p.demandMomentum = 0;
  }
  // Strong early-era protection: avoid unrealistic "tens of units per month" in 2014-2019.
  let earlyDemandFloor = 0;
  if (launchYear <= 2015) earlyDemandFloor = 520;
  else if (launchYear <= 2016) earlyDemandFloor = 440;
  else if (launchYear <= 2019) earlyDemandFloor = 320;
  else if (launchYear <= 2023) earlyDemandFloor = 210;
  // Keep early-stage protection, but let late-life products naturally decline and delist.
  const allowEarlyFloor =
    earlyDemandFloor > 0
    && state.month <= 14
    && dynamicPhaseState.phase !== '衰退期'
    && (p.demandSlump || 0) < 0.42
    && saturationFactor > 0.22;
  if (allowEarlyFloor) {
    const hardMul = (diff.name === '困难') ? 0.68 : 1.0;
    const floorByBase = Math.max(0, Math.round((Number(p.baseDemand || 0) || 0) * 0.22));
    const lifeFloorScale = clamp(life, 0.5, 1.0);
    const dynamicFloor = Math.max(
      Math.round(earlyDemandFloor * hardMul * lifeFloorScale),
      Math.round(floorByBase * hardMul * lifeFloorScale)
    );
    demandTarget = Math.max(demandTarget, Math.min(remainingMarket, dynamicFloor));
  }
  p.demandHistory = Array.isArray(p.demandHistory) ? p.demandHistory : [];
  p.demandHistory.push(demandTarget);
  if (p.demandHistory.length > 18) p.demandHistory.shift();
  const soldTarget = Math.max(0, Math.min(state.inventory, demandTarget));
  const dynamicOnlineShare = clamp(
    p.onlineShare * (0.92 + (onlinePulse - 0.88) * 0.42 + rnd(-0.03, 0.03)),
    0.24,
    0.92
  );
  const onlineTarget = Math.round(demandTarget * dynamicOnlineShare);
  const offlineTarget = demandTarget - onlineTarget;
  const avgMemScore = Math.max(1, p.avgMemScore || (p.skuStats || []).reduce((s, x) => s + x.ramScore + x.romScore, 0) / Math.max(1, (p.skuStats || []).length));
  const onlineWeightedRows = (p.skuStats || []).map((s) => {
    const priceIndex = s.price / Math.max(1, p.weightedSkuPrice || s.price);
    const perfIndex = (s.ramScore + s.romScore) / avgMemScore;
    const weight = (s.share / 100)
      * clamp(1.06 + (perfIndex - 1) * 0.95 + (p.geekAttraction / 100) * 0.22 - (priceIndex - 1) * 0.35, 0.3, 1.9);
    return { id: s.id, weight };
  });
  const offlineWeightedRows = (p.skuStats || []).map((s) => {
    const priceIndex = s.price / Math.max(1, p.weightedSkuPrice || s.price);
    const perfIndex = (s.ramScore + s.romScore) / avgMemScore;
    const weight = (s.share / 100)
      * clamp(1.08 + ((p.offlinePreferenceBoost || 1) - 1) * 0.65 - (priceIndex - 1) * 0.7 + (1.05 - perfIndex) * 0.25, 0.3, 1.8);
    return { id: s.id, weight };
  });
  const pseudoInfiniteStock = Object.fromEntries((p.skuStats || []).map((s) => [s.id, 9_999_999]));
  const targetOnlineBySku = allocateDemandByWeights(onlineTarget, onlineWeightedRows, pseudoInfiniteStock);
  const targetOfflineBySku = allocateDemandByWeights(offlineTarget, offlineWeightedRows, pseudoInfiniteStock);
  const soldOnlineBySku = allocateDemandByWeights(onlineTarget, onlineWeightedRows, state.inventoryBySku);
  const inventoryAfterOnline = {};
  (p.skuStats || []).forEach((s) => {
    inventoryAfterOnline[s.id] = Math.max(0, (state.inventoryBySku[s.id] || 0) - (soldOnlineBySku[s.id] || 0));
  });
  const soldOfflineBySku = allocateDemandByWeights(offlineTarget, offlineWeightedRows, inventoryAfterOnline);
  const soldBySku = {};
  const unmetBySku = {};
  (p.skuStats || []).forEach((s) => {
    soldBySku[s.id] = (soldOnlineBySku[s.id] || 0) + (soldOfflineBySku[s.id] || 0);
    unmetBySku[s.id] = Math.max(0, (targetOnlineBySku[s.id] || 0) + (targetOfflineBySku[s.id] || 0) - soldBySku[s.id]);
  });
  const sold = Object.values(soldBySku).reduce((sum, x) => sum + x, 0);
  const unmetDemandUnits = Object.values(unmetBySku).reduce((sum, x) => sum + x, 0);
  const preorderCreatedBySku = {};
  let preorderUnitsNew = 0;
  let preorderCashIn = 0;
  if (state.month <= PREORDER_MONTH_LIMIT && unmetDemandUnits > 0) {
    (p.skuStats || []).forEach((s) => {
      const qty = unmetBySku[s.id] || 0;
      if (qty <= 0) return;
      preorderCreatedBySku[s.id] = qty;
      p.preorderBacklogBySku[s.id] = (p.preorderBacklogBySku[s.id] || 0) + qty;
      preorderUnitsNew += qty;
      preorderCashIn += qty * s.price * PREORDER_PAY_RATIO;
    });
    if (preorderUnitsNew > 0) {
      p.preorderCreatedTotal += preorderUnitsNew;
      p.preorderCashTotal += preorderCashIn;
      state.cash += preorderCashIn;
      state.revenueTotal += preorderCashIn;
      state.companyRevenueTotal += preorderCashIn;
      p.marketConsumed += preorderUnitsNew;
    }
  }
  let soldOnline = 0;
  let soldOffline = 0;
  let onlineRevenue = 0;
  let offlineRevenue = 0;
  let onlineCogs = 0;
  let offlineCogs = 0;
  const skuMonthParts = [];
  const skuOnlineParts = [];
  const skuOfflineParts = [];
  (p.skuStats || []).forEach((s) => {
    const onlineQty = soldOnlineBySku[s.id] || 0;
    const offlineQty = soldOfflineBySku[s.id] || 0;
    const skuSold = onlineQty + offlineQty;
    if (skuSold <= 0) return;
    soldOnline += onlineQty;
    soldOffline += offlineQty;
    const onlineASP = s.price * p.input.marketing.onlinePriceFactor * rnd(0.985, 1.01);
    const offlineASP = s.price * p.input.marketing.offlinePriceFactor * rnd(0.99, 1.015);
    const skuOnlineRevenue = onlineQty * onlineASP;
    const skuOfflineRevenue = offlineQty * offlineASP;
    onlineRevenue += skuOnlineRevenue;
    offlineRevenue += skuOfflineRevenue;
    onlineCogs += onlineQty * s.unitCost;
    offlineCogs += offlineQty * s.unitCost;
    skuMonthParts.push(`${s.name} ${s.ramName}+${s.romName}：${skuSold.toLocaleString('zh-CN')} 台`);
    if (onlineQty > 0) skuOnlineParts.push(`${s.name}:${onlineQty.toLocaleString('zh-CN')}`);
    if (offlineQty > 0) skuOfflineParts.push(`${s.name}:${offlineQty.toLocaleString('zh-CN')}`);
    state.inventoryBySku[s.id] = Math.max(0, (state.inventoryBySku[s.id] || 0) - skuSold);
    s.sold = (s.sold || 0) + skuSold;
  });
  const revenue = onlineRevenue + offlineRevenue;
  const returnProfile = calcQualityReturnProfile(p);
  const expectedReturnRate = returnProfile.rate;
  const returnRateCap = 0.049;
  const returnedUnits = sold > 0
    ? Math.min(sold, Math.floor(sold * returnRateCap), Math.round(sold * expectedReturnRate * rnd(0.88, 1.12)))
    : 0;
  const effectiveReturnRate = sold > 0 ? returnedUnits / sold : 0;
  const returnLoss = Math.round((sold > 0 ? (revenue * effectiveReturnRate) : 0) * 0.9);
  syncInventoryTotal();
  const unsold = state.inventory;

  const marketing = Math.max(30_000, sold * rnd(32, 115) * p.input.marketing.monthlyCost);
  const onlineOps =
    (
      48_000
      + soldOnline * (12 + 2.6 * p.input.region.logistics)
      + onlineRevenue * 0.026
    ) * p.onlineCostIndex * noise.cost / p.supplyStability;
  const offlineLaborOps = soldOffline * 10.5 * p.input.region.labor;
  const offlineRentOps = (62_000 + soldOffline * 6.2) * p.input.region.rent;
  const offlineOps = (offlineLaborOps + offlineRentOps) * noise.cost / p.supplyStability;
  const channel = onlineOps + offlineOps;
  const storage = unsold * 9;
  const qa = sold * clamp((100 - p.qualityScore) / 120, 0.05, 0.45) * 4.5;
  const monthCost = (marketing + channel + storage + qa) * swanCostMul * oppCostMul;
  const onlineGross = onlineRevenue - onlineCogs;
  const offlineGross = offlineRevenue - offlineCogs;
  const grossTotal = onlineGross + offlineGross;
  const onlineNet = onlineGross - onlineOps;
  const offlineNet = offlineGross - offlineOps;

  const receivableHold = revenue * swanReceivableHoldRatio;
  state.cash += revenue - receivableHold - monthCost - swanCashHit - returnLoss + oppCashBoost;
  state.revenueTotal += revenue;
  state.costTotal += monthCost + swanCashHit + returnLoss;
  state.soldTotal += sold;
  state.companyRevenueTotal += revenue;
  state.companyCostTotal += monthCost + swanCashHit + returnLoss;
  state.companySoldTotal += sold;
  p.marketConsumed += sold;
  const stockoutRatio = demandTarget > 0 ? Math.max(0, (demandTarget - sold) / demandTarget) : 0;
  const effectiveStockoutRatio = state.month <= PREORDER_MONTH_LIMIT ? stockoutRatio * 0.45 : stockoutRatio;
  const qualityDrift = (p.qualityScore - 65) / 85;
  const stalePenalty = (state.month > 12 && unsold > p.producedTotal * 0.35) ? -0.8 : 0;
  const returnPenalty = effectiveReturnRate * 34;
  const ratingDeltaRaw =
    noise.rating
    + swanRatingDelta
    + oppRatingDelta
    + qualityDrift
    - returnPenalty
    - (effectiveStockoutRatio * 3.4)
    + stalePenalty
    + rnd(-0.9, 0.8);
  const ratingDelta = applyRatingDeltaByDifficulty(
    ratingDeltaRaw,
    p.input.startupDifficulty?.name || '真实',
    p.input.calendarYear
  );
  state.rating = clamp(state.rating + ratingDelta, 1, 100);
  checkRatingMilestones();
  if (state.ended) return;
  checkCashMilestones();
  if (state.ended) return;
  checkTenYearVeteranMilestone();
  if (state.ended) return;
  p.stockoutStress = clamp(
    (p.stockoutStress || 0) * 0.66
      + stockoutRatio * 0.78
      + (unmetDemandUnits > sold * 0.45 ? 0.08 : 0)
      + (state.inventory === 0 && p.pipeline.length === 0 ? 0.06 : -0.04),
    0,
    1.15
  );

  if (state.inventory === 0 && p.pipeline.length === 0) p.idleNoStockMonths += 1;
  else p.idleNoStockMonths = 0;
  if (p.leadPenaltyMonthsRemain > 0) {
    p.leadPenaltyMonthsRemain -= 1;
    if (p.leadPenaltyMonthsRemain <= 0) p.leadPenaltyExtra = 0;
  }

  const soldRate = p.producedTotal > 0 ? (state.soldTotal / p.producedTotal) * 100 : 0;
  const arrivalSkuText = Object.keys(arrivedBySku).length
    ? Object.entries(arrivedBySku).map(([skuId, units]) => {
      const s = (p.skuStats || []).find((x) => x.id === skuId);
      return `${s ? s.name : skuId}+${units.toLocaleString('zh-CN')} 台`;
    }).join('，')
    : '无';
  const preorderDeliveredText = Object.keys(preorderDeliveredBySku).length
    ? Object.entries(preorderDeliveredBySku).map(([skuId, units]) => {
      const s = (p.skuStats || []).find((x) => x.id === skuId);
      return `${s ? s.name : skuId}+${units.toLocaleString('zh-CN')} 台`;
    }).join('，')
    : '无';
  const preorderBacklogTotal = Object.values(p.preorderBacklogBySku || {}).reduce((sum, x) => sum + (Number(x) || 0), 0);
  const inventorySkuText = (p.skuStats || [])
    .map((s) => `${s.name}:${(state.inventoryBySku[s.id] || 0).toLocaleString('zh-CN')}`)
    .join('，');

  const supplierHealth = Math.round(clamp(
    92
      - (p.stockoutStress || 0) * 26
      - p.idleNoStockMonths * 4
      - (p.leadPenaltyMonthsRemain || 0) * 7
      - (swan && (swan.id === 'supplier_fire' || swan.id === 'supply_ban') ? 22 : 0),
    5,
    99
  ));
  const sentimentHeat = Math.round(clamp(
    46
      + (50 - state.rating) * 0.85
      + Math.max(0, -noise.rating) * 10
      + Math.max(0, -swanRatingDelta) * 2.8
      - Math.max(0, oppRatingDelta) * 2.1
      + effectiveReturnRate * 120
      + stockoutRatio * 45,
    5,
    99
  ));
  const receivableRisk = Math.round(clamp(
    18
      + dynamicOnlineShare * 22
      + swanReceivableHoldRatio * 100
      + (state.cash < 2_000_000 ? 15 : 0)
      + (p.input.startupDifficulty?.name === '困难' ? 6 : 0),
    3,
    99
  ));
  const supplierMood = pickBand(supplierHealth, [
    { min: 78, text: '稳' },
    { min: 56, text: '有波动' }
  ], '偏紧');
  const sentimentMood = pickBand(100 - sentimentHeat, [
    { min: 60, text: '友好' },
    { min: 36, text: '中性' }
  ], '偏压抑');
  const receivableMood = pickBand(100 - receivableRisk, [
    { min: 62, text: '顺畅' },
    { min: 42, text: '一般' }
  ], '偏慢');
  const signalText = `<span class="risk-info">预警：供应链${supplierMood}｜舆情${sentimentMood}｜回款${receivableMood}</span>`;
  const swanLevelClass = swan && (swanInstantKill || swan.level === 'lethal' || swan.level === 'lifecycle')
    ? 'risk-danger'
    : 'risk-warn';
  const opportunityText = opportunity
    ? `<span class="good">机遇：${opportunity.name}</span>（${opportunity.reason}）`
    : '';
  const swanText = swan
    ? `<span class="${swanLevelClass}">黑天鹅：${swan.name}</span>（${swan.reason}）`
    : '';
  const eventParts = [`<strong>${noise.name}</strong>`];
  if (swanText) eventParts.push(swanText);
  if (opportunityText) eventParts.push(opportunityText);
  const eventLine = `本月风向：${eventParts.join(' + ')}｜${signalText}`;
  const monthNet = revenue - receivableHold - monthCost - swanCashHit - returnLoss + oppCashBoost;
  const onlineState = onlineNet >= 0 ? '<span class="good">线上贡献为正</span>' : '<span class="risk-warn">线上承压</span>';
  const offlineState = offlineNet >= 0 ? '<span class="good">线下贡献为正</span>' : '<span class="risk-warn">线下承压</span>';
  const monthState = monthNet >= 0 ? '<span class="good">本月经营是赚钱的</span>' : '<span class="bad">本月经营在亏损</span>';
  const hypeState = dynamicOnlineShare >= 0.62 ? '讨论热度偏线上' : dynamicOnlineShare <= 0.4 ? '成交更依赖线下' : '线上线下热度均衡';
  const reputationState = ratingDelta >= 0 ? '<span class="good">口碑在回升</span>' : '<span class="bad">口碑在下滑</span>';

  const keyEventText = swan
    ? `<span class="${swanLevelClass}">黑天鹅：${swan.name}</span>`
    : opportunity
      ? `<span class="good">机遇：${opportunity.name}</span>`
      : `<span class="risk-info">常规波动：${noise.name}</span>`;
  const preorderSkuText = Object.keys(preorderCreatedBySku).length
    ? Object.entries(preorderCreatedBySku).map(([skuId, units]) => {
      const s = (p.skuStats || []).find((x) => x.id === skuId);
      return `${s ? s.name : skuId} ${units.toLocaleString('zh-CN')}台`;
    }).join('；')
    : '无新增预订';
  renderRunBrief([
    `<strong>本月重点（M${state.month}）</strong>`,
    `重要事件：${keyEventText}`,
    `本月销量：<strong>${sold.toLocaleString('zh-CN')} 台</strong>（线上 ${soldOnline.toLocaleString('zh-CN')} / 线下 ${soldOffline.toLocaleString('zh-CN')}）`,
    `预订SKU单量：${preorderSkuText}`
  ].join('<br>'));

  el.reportBox.innerHTML = [
    eventLine,
    `市场节奏：${demandNarrative(dynamicPhaseState.phase, dynamicPhaseState.growth, stockoutRatio, demandTarget, p.baseDemand)}`,
    `渠道反馈：${onlineState}，${offlineState}；${hypeState}。`,
    `供需状态：${inventoryNarrative(state.inventory, sold, unmetDemandUnits)}。`,
    `售后体感：${returnNarrative(effectiveReturnRate)}。`,
    `经营体感：${monthState}，${cashMood(state.cash)}。`,
    `品牌状态：${reputationState}，${ratingMood(state.rating)}。`,
    loanDueThisMonth > 0 ? '<span class="bad">本月触发贷款还款，现金压力上升。</span>' : '本月无贷款到期。'
  ].join('<br>');

  if (state.cash <= 0) {
    endGame('资金链断裂，企业破产。');
    openGameModal(
      '游戏结束',
      '现金已经为负，账本写着：<strong>破产</strong>。<br>这波是“销量未必输，现金流先走了”。',
      'gameover'
    );
    showMobileRunDockAction('已推进下一月（触发破产）', 'bad');
    return;
  }
  if (swanInstantKill) {
    endGame(`黑天鹅致命事件：${swan.name}。`);
    openGameModal(
      '游戏结束',
      `黑天鹅来了：<strong>${swan.name}</strong>。<br>${swan.reason || '市场突发极端冲击，企业直接被抬走。'}<br>这波属于“不是你不会运营，是天上先掉了个陨石”。`,
      'gameover'
    );
    showMobileRunDockAction('已推进下一月（黑天鹅致命）', 'bad');
    return;
  }
  if (swanForcePhaseEnd) {
    finishProductPhase(`黑天鹅触发退市：${swan.name}。`);
    return;
  }
  const demandEndThreshold = Number((historicalTuning && historicalTuning.demandEndThreshold) || 10);
  if (demandTarget < demandEndThreshold) {
    finishProductPhase(`市场需求量降至 ${demandTarget} 台（低于 ${demandEndThreshold}），产品生命周期结束。`);
    return;
  }
  if (state.month >= p.lifecycleMaxMonths) {
    finishProductPhase(`产品生命周期结束（${p.lifecycleMaxMonths} 个月）。`);
    return;
  }
  if (
    state.month >= 10
    && state.inventory === 0
    && p.pipeline.length === 0
    && p.idleNoStockMonths >= 3
    && (p.marketCapacity - p.marketConsumed) < p.marketCapacity * 0.12
  ) {
    finishProductPhase('需求基本见顶且连续缺货无补产，机型进入退市阶段。');
    return;
  }

  updateHeader();
  checkCashMilestones();
  showMobileRunDockAction('已推进下一月', 'good');
  renderMobileRunDockQuote({ bump: true });
}

function restock() {
  if (state.phaseEnded) {
    markRestockFailed();
    el.reportBox.innerHTML = '旧机型已退市，无法补货。请进入下一代机型。';
    showMobileRunDockAction('补货失败（机型已退市）', 'bad');
    renderMobileRunDockQuote({ bump: true });
    return;
  }
  if (!state.launched || state.ended) {
    markRestockFailed();
    el.reportBox.innerHTML = '当前不可追加生产。';
    showMobileRunDockAction('补货失败（当前不可追加）', 'bad');
    renderMobileRunDockQuote({ bump: true });
    return;
  }
  const restockUnitsIsInteger = validateIntegerInput(el.restockUnits, el.restockIntHint, { showHint: true });
  if (!restockUnitsIsInteger) {
    markRestockFailed();
    el.reportBox.innerHTML = '<span class="bad">补货数量仅支持整数，请调整后重试。</span>';
    showMobileRunDockAction('补货失败（仅支持整数）', 'bad');
    renderMobileRunDockQuote({ bump: true });
    return;
  }
  const p = state.product;
  const quote = calcRestockQuote();
  if (!quote) {
    markRestockFailed();
    el.reportBox.innerHTML = '<span class="bad">补货数量需在 1000~200000 台。</span>';
    showMobileRunDockAction('补货失败（数量或 SKU 无效）', 'bad');
    renderMobileRunDockQuote({ bump: true });
    return;
  }
  const { sku, add } = quote;
  let renewalCost = 0;
  let lockCommitRenewCost = 0;
  let coverageInfo = '合约覆盖内';
  const nextProduced = p.producedTotal + add;

  if (p.input.procurement.coverageMultiplier > 0 && nextProduced > p.contractUnits) {
    renewalCost = p.input.procurement.renewUpfront;
    p.procurementRenewals += 1;
    const extendUnits = Math.ceil(add * Math.max(0.8, p.input.procurement.coverageMultiplier));
    p.contractUnits += extendUnits;
    const extraCommitUnits = Math.max(0, extendUnits - add);
    lockCommitRenewCost = extraCommitUnits * sku.unitCost * (p.input.procurement.lockCommitRate || 0);
    coverageInfo = `触发续约 +${extendUnits.toLocaleString('zh-CN')} 台覆盖`;
  }

  const cost = quote.totalCost;
  if (cost > state.cash) {
    markRestockFailed();
    el.reportBox.innerHTML = '<span class="bad">追加失败：现金不足。</span>';
    showMobileRunDockAction('补货失败（现金不足）', 'bad');
    renderMobileRunDockQuote({ bump: true });
    return;
  }

  const leadPenalty = p.leadPenaltyMonthsRemain > 0 ? (p.leadPenaltyExtra || 0) : 0;
  const arriveMonth = state.month + Math.max(1, (p.input.procurement.leadMonths || 1) + leadPenalty);
  state.cash -= cost;
  state.costTotal += cost;
  state.companyCostTotal += cost;
  p.producedTotal += add;
  p.pipeline.push({ skuId: sku.id, units: add, arriveMonth });
  if (el.invTransit) {
    el.invTransit.textContent = `在途 ${calcInTransitUnits().toLocaleString('zh-CN')}`;
  }
  flashRestockSuccess();
  el.reportBox.innerHTML = `已追加生产 ${sku.name}（${sku.ramName}+${sku.romName}），库存将在后续月份分批到货。`;
  showMobileRunDockAction(`成功补货 ${add.toLocaleString('zh-CN')} 台`, 'good');
  renderMobileRunDockQuote({ bump: true });
  updateHeader();
}

function verdictEnterprise(net, roi, rating, months, gens) {
  if (net > 12_000_000 && roi > 0.9 && rating >= 78) return '这波是“教科书级开局”了：既赚麻了又被夸麻了。';
  if (net > 5_000_000 && roi > 0.35 && rating >= 70) return '赢麻体质：销量和口碑都在线，友商看了想连夜改发布会。';
  if (net > 0 && rating >= 75) return '人气和利润双修：这牌子已经从“新势力”进化到“有点东西”。';
  if (net > 0 && rating < 65) return '账上是笑着的，论坛是吵着的：典型“卖得动但不被吹”。';
  if (net <= 0 && rating >= 75) return '叫好不叫座本座：评测区封神，财务表流泪。';
  if (net <= 0 && months < 8) return '速通失败：创业像开盲盒，你这把开到“现金流地狱”。';
  if (net <= 0 && gens >= 2) return '硬撑多代仍未翻盘：精神可嘉，CFO 血压不稳。';
  return '这局属于“理想很丰满，报表很骨感”，下把先稳供应链和定价。';
}

function verdictProduct(record) {
  if (!record) return '暂无本代锐评。';
  const net = Number(record.net || 0);
  const rating = Number(record.ratingEnd || 0);
  const months = Number(record.months || 0);
  const sold = Number(record.sold || 0);
  if (net > 3_000_000 && rating >= 78) return '本代直接起飞：参数、口碑、销量三线通关。';
  if (net > 0 && rating >= 72 && sold >= 50_000) return '稳稳毕业：不是神机，但是真正会卖。';
  if (net > 0 && rating < 65) return '销量能打，评论区不太服：标准“务实机”。';
  if (net <= 0 && rating >= 75) return '机圈白月光：人人说好，财务说不行。';
  if (net < -2_000_000 && months <= 6) return '早期暴雷：还没等口碑发酵，现金先见底。';
  if (months >= 24 && net > 0) return '长跑型选手：不炸裂，但特别能熬。';
  return '这代有亮点但没打穿市场，像一台“差一点就爆”的机子。';
}

function archiveCurrentProduct(reason, extra = {}) {
  const p = state.product;
  if (!p || p.archived) return null;
  const preorderBacklogTotal = Object.values(p.preorderBacklogBySku || {}).reduce((sum, x) => sum + (Number(x) || 0), 0);
  const productNet = state.revenueTotal - state.costTotal - (extra.contractWriteOff || 0);
  const record = {
    idx: state.productHistory.length + 1,
    reason,
    modelName: p.modelName || `Gen${state.productHistory.length + 1}`,
    modelBaseName: p.modelBaseName || '',
    name: `${p.input.soc.name} / ${p.input.disp.mat.name} / ${Math.round(p.weightedSkuPrice)}档`,
    months: state.month,
    sold: state.soldTotal,
    revenue: state.revenueTotal,
    cost: state.costTotal,
    net: productNet,
    ratingEnd: Math.round(state.rating),
    sku: (p.skuStats || []).map((s) => `${s.name} ${s.ramName}+${s.romName} ${s.share}%`),
    priceBand: `${RMB(Math.min(...(p.skuStats || []).map((s) => s.price)))} ~ ${RMB(Math.max(...(p.skuStats || []).map((s) => s.price)))}`,
    quality: Number(p.qualityScore || 0).toFixed(1),
    baseDemand: Math.round(p.baseDemand || 0),
    startupDifficulty: p.input.startupDifficulty?.name || '真实',
    region: p.input.region.name,
    soc: p.input.soc.name,
    display: `${p.input.disp.mat.name} ${p.input.disp.size}" ${p.input.disp.ratio} ${p.input.disp.form.name}`,
    specSnapshot: buildSpecSnapshotFromInput(
      p.input,
      Number(p.weightedSkuPrice || 0),
      (p.skuStats || []).map((s) => ({
        ramScore: s.ramScore,
        romScore: s.romScore
      }))
    ),
    qualityScore: Number(p.qualityScore || 0),
    geekAttraction: Number(p.geekAttraction || 0),
    onlineShare: Number(p.onlineShare || 0),
    offlineShare: Number(p.offlineShare || 0),
    loanDecision: p.loanDecision || 'pending',
    loanUsed: p.loanDecision === 'taken',
    preorders: {
      created: p.preorderCreatedTotal || 0,
      fulfilled: p.preorderFulfilledTotal || 0,
      backlog: preorderBacklogTotal
    },
    ...extra
  };
  state.productHistory.push(record);
  p.archived = true;
  return record;
}

function liquidateLegacyInventory(product) {
  if (!product) return { revenue: 0, units: 0 };
  const liquidationRatio = product?.input?.startupDifficulty?.name === '困难' ? 0.2 : 0.3;
  let units = 0;
  let revenue = 0;
  (product.skuStats || []).forEach((s) => {
    const left = Number(state.inventoryBySku[s.id] || 0);
    if (left <= 0) return;
    units += left;
    revenue += left * s.price * liquidationRatio;
    state.inventoryBySku[s.id] = 0;
  });
  syncInventoryTotal();
  return { revenue, units };
}

function finishProductPhase(reason, source = 'auto') {
  if (!state.product || state.phaseEnded) return;
  const p = state.product;
  const preorderBacklogTotal = Object.values(p.preorderBacklogBySku || {}).reduce((sum, x) => sum + (Number(x) || 0), 0);
  const liquidation = liquidateLegacyInventory(p);
  if (liquidation.revenue > 0) {
    state.cash += liquidation.revenue;
    state.revenueTotal += liquidation.revenue;
    state.companyRevenueTotal += liquidation.revenue;
  }
  const archived = archiveCurrentProduct(reason, {
    liquidationRevenue: liquidation.revenue,
    liquidationUnits: liquidation.units,
    preorderCanceled: preorderBacklogTotal
  });
  state.phaseEnded = true;
  state.launched = false;
  state.product = null;
  state.month = 0;
  state.soldTotal = 0;
  state.revenueTotal = 0;
  state.costTotal = 0;
  placeContinueNext(source === 'manual' ? 'manual' : 'auto');
  if (el.continueNext) el.continueNext.classList.remove('hidden');
  const statusLabel = source === 'manual' ? '玩家手动停产结算' : '产品生命周期自动结束';
  renderRunBrief([
    '<strong>本月重点（状态变更）</strong>',
    `<span class="bad">已触发：${statusLabel}</span>`,
    `原因：${reason}`
  ].join('<br>'), { highlightEnd: true });
  el.reportBox.innerHTML = [
    `<strong>${reason}</strong>`,
    `机型：<strong>${archived && archived.modelName ? archived.modelName : '未知机型'}</strong> 已退市并清仓。`,
    preorderBacklogTotal > 0 ? '<span class="risk-warn">未交付预订已自动取消。</span>' : '预订已全部收尾。',
    `本代锐评：<strong>${verdictProduct(archived)}</strong>`,
    '你可以选择“进入下一代机型”继续经营，或点击“企业结算”结束公司。'
  ].join('<br>');
  el.finalBox.innerHTML = '公司未结算：可继续下一代，或企业结算查看全流程成绩。';
  if (source === 'manual') {
    showMobileRunDockAction('已完成产品停产结算', 'good');
  } else {
    showMobileRunDockAction('产品生命周期结束', 'bad');
  }
  renderMobileRunDockQuote();
  updateHeader();
  checkCashMilestones();
}

function endGame(reason) {
  state.ended = true;
  if (state.product && !state.product.archived) {
    const p = state.product;
    const preorderBacklogTotal = Object.values(p.preorderBacklogBySku || {}).reduce((sum, x) => sum + (Number(x) || 0), 0);
    archiveCurrentProduct('结束经营时在售机型结算', {
      liquidationRevenue: 0,
      liquidationUnits: 0,
      preorderCanceled: preorderBacklogTotal,
      unsoldUnits: computeTotalInventory()
    });
  }
  state.product = null;
  state.launched = false;
  state.phaseEnded = false;
  if (el.continueNext) el.continueNext.classList.add('hidden');

  const net = state.companyRevenueTotal - state.companyCostTotal;
  const roi = net / state.initialCash;
  const market = Math.round(state.rating);
  const productLines = state.productHistory.length
    ? state.productHistory.map((x) =>
      `第${x.idx}代 ${x.modelName || `Gen${x.idx}`}：${verdictProduct(x)}`)
    : ['暂无机型记录。'];

  el.finalBox.innerHTML = [
    `<strong>${reason}</strong>`,
    `企业：${state.companyName || '未命名科技'}（${chinaRegions[el.region.value]?.name || '未知'}）`,
    `经营总结：${net >= 0 ? '<span class="good">公司整体盈利</span>' : '<span class="bad">公司整体亏损</span>'}，${ratingMood(market)}。`,
    `经营风格：${roi >= 0.5 ? '激进高回报' : roi >= 0.1 ? '稳健推进' : '高压求生'}。`,
    `企业锐评：<strong>${verdictEnterprise(net, roi, market, state.companyMonthsTotal, state.productHistory.length)}</strong>`,
    '--- 每代机型表现 ---',
    ...productLines
  ].join('<br>');

  if (String(reason || '').includes('玩家主动企业结算')) {
    showMobileRunDockAction('已完成企业结算', 'good');
  } else {
    showMobileRunDockAction('游戏结束，请重开新局', 'bad');
  }
  renderMobileRunDockQuote();
  updateHeader();
}

function restart() {
  stopFrontPreviewPopupAnim();
  frontPreviewAnimEval = null;
  resetRestockButtonState();
  resetTechPoolsToBase();
  closePreviewLightbox();
  closeBenchPage();
  if (el.gameModalStack) el.gameModalStack.innerHTML = '';
  if (el.gameModal) el.gameModal.classList.add('hidden');
  gameoverCtaLatched = false;
  celebrateCtaLatched = false;
  applyRestartCtaState('none');
  closeAchievementPanel();
  refreshOverlayLockState();
  state.cash = state.initialCash;
  state.inventory = 0;
  state.inventoryBySku = {};
  state.rating = 50;
  state.month = 0;
  state.chosenMarket = null;
  state.memoryMarket = null;
  state.companyName = FIXED_COMPANY_NAME;
  state.launched = false;
  state.ended = false;
  state.phaseEnded = false;
  state.product = null;
  state.soldTotal = 0;
  state.revenueTotal = 0;
  state.costTotal = 0;
  state.shortEvents = [];
  state.companyMonthsTotal = 0;
  state.companySoldTotal = 0;
  state.companyRevenueTotal = 0;
  state.companyCostTotal = 0;
  state.productHistory = [];
  state.timeline = [];
  state.loans = [];
  state.eventRerollUsed = false;
  state.techCycle = 0;
  state.memoryCycle = 0;
  state.displayCycle = 0;
  state.extraCostCycle = 0;
  state.batteryFutureCycle = 0;
  state.fastChargeFutureCycle = 0;
  state.lastTechRefreshMonth = 0;
  state.lastTechRefreshGeneration = 1;
  state.lastMemoryRefreshMonth = 0;
  state.lastMemoryRefreshGeneration = 1;
  state.lastDisplayRefreshMonth = 0;
  state.lastDisplayRefreshGeneration = 1;
  state.lastExtraRefreshMonth = 0;
  state.lastExtraRefreshGeneration = 1;
  state.lastBatteryRefreshMonth = 0;
  state.lastBatteryRefreshGeneration = 1;
  state.lastFastChargeRefreshMonth = 0;
  state.lastFastChargeRefreshGeneration = 1;
  state.designDeadEndNotified = false;
  state.minDesignLaunchCostCache = null;
  state.rating100Notified = false;
  state.rating90PricingImmunityNotified = false;
  state.cash1bNotified = false;
  state.tenYearVeteranNotified = false;
  state.screenMaterialsUsed = new Set();
  state.screenCollectorNotified = false;
  state.foldableAchievedNotified = false;
  state.einkAchievedNotified = false;
  state.futureEinkAchievedNotified = false;
  state.ebookAchievedNotified = false;
  state.ultraFlagshipAchievedNotified = false;
  state.advancedAlloyAchievedNotified = false;
  state.ceramicAchievedNotified = false;
  state.noCameraAchievedNotified = false;
  state.aramidAchievedNotified = false;
  state.selfieAchievedNotified = false;
  state.topLcdAchievedNotified = false;
  state.flagshipLcdDemonAchievedNotified = false;
  state.thermalManiacAchievedNotified = false;
  state.satelliteAchievedNotified = false;
  state.batteryTechAchievedNotified = false;
  state.magsafeAchievedNotified = false;
  state.ip68EasyAchievedNotified = false;
  state.smallScreenAchievedNotified = false;
  state.flatBackAchievedNotified = false;
  state.largeScreenAchievedNotified = false;
  state.goodLuckAchievedNotified = false;
  state.noRefreshAchievedNotified = false;
  state.squeezeToothpasteAchievedNotified = false;
  state.brandToneAchievedNotified = false;
  state.futureReachedNotified = false;
  state.socPriceCapEnded = false;
  state.premiumPriceToleranceCarry = 1.0;
  state.premiumOnlineDemandCarry = 1.0;
  state.premiumOfflineDemandCarry = 1.0;
  syncAchievementNotifiedFlagsFromList();

  el.reportBox.innerHTML = '等待月报。';
  renderRunBrief('本月重点：等待推进月份。');
  el.finalBox.innerHTML = '结算后显示最终表现。';
  el.previewBox.innerHTML = '等待计算。';
  if (el.previewDetailBox) el.previewDetailBox.innerHTML = '详细评估：等待计算。';
  clearPhonePreview();
  el.eventHint.textContent = `请选择 1 个，它将影响整局。当前行业年份 ${state.historicalYear || HISTORICAL_START_YEAR}`;
  if (el.rollEvents) {
    el.rollEvents.disabled = false;
    el.rollEvents.textContent = '刷新随机情况';
  }
  if (el.modelBaseName) el.modelBaseName.value = FIXED_MODEL_BASE_NAME;
  if (el.restart) el.restart.classList.remove('gameover-cta', 'celebrate-cta');
  if (el.restartDesign) el.restartDesign.classList.remove('gameover-cta', 'celebrate-cta');
  fillOptions();
  validateIntegerInput(el.units, el.unitsIntHint, { showHint: false });
  validateIntegerInput(el.restockUnits, el.restockIntHint, { showHint: false });
  updateModelNameHint();
  assignRandomRegion();
  if (el.restockSku) el.restockSku.innerHTML = '';
  placeContinueNext('auto');
  if (el.continueNext) el.continueNext.classList.add('hidden');
  rollThreeMarkets();
  renderAchievementPanel();
  showMobileRunDockAction('等待操作', 'neutral');
  renderMobileRunDockQuote();
  setStep(1);
  updateHeader();
}

function refreshDesignPanelsLive() {
  refreshBackColorControl();
  refreshFrontFrameColorControl();
  if (!el.stageConfig || el.stageConfig.classList.contains('hidden')) return;
  updateDisplayMaterialOptions();
  updateDisplayRatioAndFormOptions();
  updateDisplayFeatureOptions();
  refreshBatteryCapacityInputRange();
  refreshExtrasSelectableOptions();
  const skuValidation = updateSkuShareValidation(false);
  const unitsIsInteger = validateIntegerInput(el.units, el.unitsIntHint, { showHint: true });
  if (el.launch && (!skuValidation.valid || !unitsIsInteger)) {
    el.launch.disabled = true;
  }
  if (!unitsIsInteger) {
    const msg = '<span class="bad">首批产量仅支持整数，请调整输入。</span>';
    if (el.previewBox) el.previewBox.innerHTML = msg;
    if (el.previewDetailBox) el.previewDetailBox.innerHTML = msg;
    return;
  }
  updateDisplayQuickBox();
  try {
    renderPreview();
    const active = document.activeElement;
    const editingSkuPriceAdj = active instanceof HTMLInputElement && active.classList.contains('sku-price-adj');
    if (!editingSkuPriceAdj) {
      updateDesignRestartButtonState();
      checkDesignDeadEndByCash();
    }
  } catch (err) {
    const detail = err && err.message ? `（${String(err.message)}）` : '';
    const msg = `<span class="bad">自动评估失败，请调整一个配置后重试。${detail}</span>`;
    el.previewBox.innerHTML = msg;
    if (el.previewDetailBox) el.previewDetailBox.innerHTML = msg;
    if (el.restartDesign) el.restartDesign.classList.remove('restart-alert');
  }
  updateFrontPreviewPopupAnimState();
}

function scheduleRefreshDesignPanelsLive() {
  if (designRefreshRaf) return;
  designRefreshRaf = window.requestAnimationFrame(() => {
    designRefreshRaf = 0;
    refreshDesignPanelsLive();
  });
}

function scheduleViewportUiRefresh(options = {}) {
  const includeDesign = Boolean(options.includeDesign);
  if (viewportUiRefreshRaf) return;
  viewportUiRefreshRaf = window.requestAnimationFrame(() => {
    viewportUiRefreshRaf = 0;
    renderOpsChart();
    updateRunDockViewportAnchor();
    refreshMobileRunDock();
    if (includeDesign) scheduleRefreshDesignPanelsLive();
  });
}

function isLowPowerMobileDevice() {
  let coarse = false;
  try {
    coarse = window.matchMedia('(pointer: coarse)').matches;
  } catch {
    coarse = false;
  }
  if (!coarse) return false;
  const cores = Number(navigator.hardwareConcurrency || 0);
  const mem = Number(navigator.deviceMemory || 0);
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  return saveData || (cores > 0 && cores <= 4) || (mem > 0 && mem <= 4);
}

function applyPerformanceProfile() {
  const lowPower = isLowPowerMobileDevice();
  document.body.classList.toggle('perf-lite', lowPower);
}

function registerServiceWorkerDeferred() {
  if (serviceWorkerBootAttempted) return;
  serviceWorkerBootAttempted = true;
  if (!('serviceWorker' in navigator)) return;
  const register = () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(register, { timeout: 2000 });
  } else {
    window.setTimeout(register, 900);
  }
}

function enableButtonPressFeedback() {
  const clearPressed = (btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    btn.classList.remove('is-pressing');
  };

  document.addEventListener('pointerdown', (evt) => {
    const btn = evt.target instanceof Element ? evt.target.closest('button') : null;
    if (!(btn instanceof HTMLButtonElement) || btn.disabled) return;
    btn.classList.add('is-pressing');
  }, true);

  document.addEventListener('pointerup', (evt) => {
    const btn = evt.target instanceof Element ? evt.target.closest('button') : null;
    clearPressed(btn);
  }, true);

  document.addEventListener('pointercancel', (evt) => {
    const btn = evt.target instanceof Element ? evt.target.closest('button') : null;
    clearPressed(btn);
  }, true);

  document.addEventListener('pointerleave', (evt) => {
    const btn = evt.target instanceof Element ? evt.target.closest('button') : null;
    clearPressed(btn);
  }, true);

  document.addEventListener('keyup', (evt) => {
    if (!(evt.target instanceof HTMLButtonElement)) return;
    evt.target.classList.remove('is-pressing');
  }, true);

  document.addEventListener('keydown', (evt) => {
    if (!(evt.target instanceof HTMLButtonElement)) return;
    if (evt.key !== 'Enter' && evt.key !== ' ') return;
    evt.target.classList.add('is-pressing');
    window.setTimeout(() => evt.target.classList.remove('is-pressing'), 140);
  }, true);
}

function bind() {
  if (!window.__startPhoneRuntimeGuardInstalled) {
    window.__startPhoneRuntimeGuardInstalled = true;
    window.addEventListener('error', (evt) => {
      reportRuntimeError('window.error', evt && evt.error ? evt.error : (evt && evt.message ? evt.message : 'unknown'));
    });
    window.addEventListener('unhandledrejection', (evt) => {
      reportRuntimeError('unhandledrejection', evt && evt.reason ? evt.reason : 'promise rejected');
    });
  }
  enableButtonPressFeedback();
  bindSecretJumpEntry();
  ensureInventoryUiSyncTimer();
  renderAchievementPanel();
  refreshOverlayLockState();
  refreshBackColorControl();
  if (el.extrasDetails) {
    if ((window.innerWidth || 0) > 760) el.extrasDetails.open = true;
    else el.extrasDetails.open = false;
  }
  if (el.achieveEntry) {
    el.achieveEntry.addEventListener('click', openAchievementPanel);
  }
  if (el.achieveClose) {
    el.achieveClose.addEventListener('click', closeAchievementPanel);
  }
  if (el.achievePanel) {
    el.achievePanel.addEventListener('click', (evt) => {
      if (evt.target === el.achievePanel) closeAchievementPanel();
    });
  }
  el.rollEvents.addEventListener('click', () => {
    if (state.eventRerollUsed) return;
    rollThreeMarkets();
    state.eventRerollUsed = true;
    el.rollEvents.disabled = true;
    el.rollEvents.textContent = '已刷新';
  });
  if (el.quickGuideBtn) {
    el.quickGuideBtn.addEventListener('click', () => {
      openGameModal('玩法速览', QUICK_GUIDE_HTML);
      writeQuickGuideSeen(true);
      refreshQuickGuideButtonState();
    });
  }
  if (el.modelBaseName) el.modelBaseName.addEventListener('input', updateModelNameHint);
  el.confirmEvent.addEventListener('click', () => {
    if (!state.marketPick) return;
    state.chosenMarket = state.marketPick;
    state.companyName = FIXED_COMPANY_NAME;
    const roll = Math.random();
    state.memoryMarket = roll < 0.35
      ? memoryMarketLevels[0]
      : roll < 0.8
        ? memoryMarketLevels[1]
        : memoryMarketLevels[2];
    el.eventHint.textContent = `已选环境：${state.marketPick.name}｜行业年份 ${state.historicalYear || HISTORICAL_START_YEAR}`;
    setStep(2);
    refreshDesignPanelsLive();
    if (!hasAchievement('the_beginning')) {
      addAchievementCard('the_beginning', '一切的开始', '首次进入手机设计阶段。');
      openGameModal(
        '成就解锁',
        '你已从市场阶段正式进入设计阶段，恭喜达成 <strong>一切的开始</strong> 成就！'
      );
    }
  });

  el.preview.addEventListener('click', openBenchPage);
  el.launch.addEventListener('click', launch);
  el.nextMonth.addEventListener('click', nextMonth);
  el.restock.addEventListener('click', restock);
  if (el.restockSku) {
    el.restockSku.addEventListener('change', () => renderMobileRunDockQuote({ bump: true }));
  }
  if (el.restockUnits) {
    const onRestockUnitsInput = () => {
      validateIntegerInput(el.restockUnits, el.restockIntHint, { showHint: true });
      renderMobileRunDockQuote({ bump: true });
    };
    el.restockUnits.addEventListener('input', onRestockUnitsInput);
    el.restockUnits.addEventListener('change', onRestockUnitsInput);
  }
  if (el.units) {
    const onUnitsInput = () => {
      validateIntegerInput(el.units, el.unitsIntHint, { showHint: true });
      refreshDesignPanelsLive();
    };
    el.units.addEventListener('input', onUnitsInput);
    el.units.addEventListener('change', onUnitsInput);
  }
  if (el.restartDesign) el.restartDesign.addEventListener('click', restart);
  if (el.takeLoan) el.takeLoan.addEventListener('click', takeGenerationLoan);
  if (el.continueNext) {
    el.continueNext.addEventListener('click', () => {
      if (!state.phaseEnded || state.ended) {
        showMobileRunDockAction('进入下一代失败（当前不可用）', 'bad');
        return;
      }
      resetRestockButtonState();
      const roll = Math.random();
      state.memoryMarket = roll < 0.35
        ? memoryMarketLevels[0]
        : roll < 0.8
          ? memoryMarketLevels[1]
          : memoryMarketLevels[2];
      state.phaseEnded = false;
      placeContinueNext('auto');
      if (el.continueNext) el.continueNext.classList.add('hidden');
      el.reportBox.innerHTML = `已进入下一代机型研发阶段。现金与口碑会继承，本代市场记忆也会延续。<br>当前存储行情：${state.memoryMarket.name}。`;
      renderRunBrief('本月重点：等待推进月份。');
      maybeAdvanceHistoricalEra('generation');
      maybeRefreshTechComponentPool('generation');
      maybeRefreshMemoryPools('generation');
      maybeRefreshDisplayScoreProgress('generation');
      maybeRefreshExtraCosts('generation');
      maybeRefreshFutureBatteryDensity('generation');
      maybeRefreshFutureFastChargePower('generation');
      if (state.ended) {
        updateHeader();
        return;
      }
      setStep(2);
      showMobileRunDockAction('进入下一代机型研发', 'neutral');
      renderMobileRunDockQuote();
      updateModelNameHint();
      updateDisplayMaterialOptions();
      refreshDesignPanelsLive();
      updateHeader();
    });
  }
  el.stop.addEventListener('click', () => {
    if (!state.product || state.phaseEnded || state.ended || !state.launched) {
      el.reportBox.innerHTML = '当前没有在售机型可做产品停产结算。';
      showMobileRunDockAction('停产失败（当前无在售机型）', 'bad');
      return;
    }
    finishProductPhase('玩家主动对当前机型执行停产结算。', 'manual');
  });
  if (el.endCompany) {
    el.endCompany.addEventListener('click', () => {
      if (state.ended) {
        el.reportBox.innerHTML = '企业已结算。';
        showMobileRunDockAction('企业结算失败（已结算）', 'bad');
        return;
      }
      showMobileRunDockAction('企业结算中…', 'neutral');
      endGame('玩家主动企业结算。');
    });
  }
  el.restart.addEventListener('click', restart);
  if (el.addSku) {
    el.addSku.addEventListener('click', () => {
      addSkuRow({ ram: getDefaultRamOptionId(), rom: getDefaultRomOptionId(), priceAdj: 300, share: 0 });
      updateSkuShareValidation(false);
      refreshDesignPanelsLive();
    });
  }
  if (el.skuList) {
    el.skuList.addEventListener('click', (evt) => {
      const target = evt.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.classList.contains('sku-remove')) return;
      const row = target.closest('.sku-row');
      if (!row) return;
      row.remove();
      refreshSkuButtons();
      updateSkuShareValidation(false);
      refreshDesignPanelsLive();
    });
    el.skuList.addEventListener('input', (evt) => {
      const target = evt.target;
      if (target instanceof HTMLInputElement && target.classList.contains('sku-price-adj')) {
        // Keep typing smooth: avoid full refresh/re-render on every keystroke.
        updateSkuShareValidation(false);
        if (skuPriceAdjTypingTimer) {
          clearTimeout(skuPriceAdjTypingTimer);
          skuPriceAdjTypingTimer = 0;
        }
        skuPriceAdjTypingTimer = window.setTimeout(() => {
          skuPriceAdjTypingTimer = 0;
          scheduleRefreshDesignPanelsLive();
        }, 220);
        return;
      }
      const flash = target instanceof HTMLElement && target.classList.contains('sku-share');
      updateSkuShareValidation(Boolean(flash));
      refreshDesignPanelsLive();
    });
    el.skuList.addEventListener('change', (evt) => {
      const target = evt.target;
      if (skuPriceAdjTypingTimer) {
        clearTimeout(skuPriceAdjTypingTimer);
        skuPriceAdjTypingTimer = 0;
      }
      const flash = target instanceof HTMLElement && target.classList.contains('sku-share');
      updateSkuShareValidation(Boolean(flash));
      refreshDesignPanelsLive();
    });
    el.skuList.addEventListener('focusout', (evt) => {
      const target = evt.target;
      if (!(target instanceof HTMLInputElement) || !target.classList.contains('sku-price-adj')) return;
      target.value = String(parseSkuPriceAdj(target.value));
      updateSkuShareValidation(false);
      refreshDesignPanelsLive();
    });
  }
  window.addEventListener('resize', () => {
    scheduleViewportUiRefresh({ includeDesign: true });
  }, { passive: true });
  window.addEventListener('scroll', () => {
    scheduleViewportUiRefresh({ includeDesign: false });
  }, { passive: true });
  window.addEventListener('orientationchange', () => {
    scheduleViewportUiRefresh({ includeDesign: true });
  }, { passive: true });
  if (window.visualViewport) {
    const handleVisualViewportChange = () => {
      scheduleViewportUiRefresh({ includeDesign: false });
    };
    window.visualViewport.addEventListener('resize', handleVisualViewportChange, { passive: true });
    window.visualViewport.addEventListener('scroll', handleVisualViewportChange, { passive: true });
  }

  [
    el.soc, el.price, el.dispMat, el.dispVendor, el.dispSize, el.dispRatio, el.dispForm,
    el.body, el.battery, el.backColor, el.frontFrameColor, el.procurementPlan, el.camMain, el.camUltra, el.camMono, el.camTele, el.camFront,
    el.marketingFocus, el.campaignLevel, el.units, el.phoneH, el.phoneW, el.phoneT
  ].forEach((node) => {
    if (!node) return;
    node.addEventListener('input', scheduleRefreshDesignPanelsLive);
    node.addEventListener('change', scheduleRefreshDesignPanelsLive);
  });
  if (el.displayFeatures) el.displayFeatures.addEventListener('change', scheduleRefreshDesignPanelsLive);
  if (el.extras) el.extras.addEventListener('change', scheduleRefreshDesignPanelsLive);
  if (el.dispSize) {
    el.dispSize.addEventListener('blur', () => {
      normalizeDisplaySizeInput();
      scheduleRefreshDesignPanelsLive();
    });
    el.dispSize.addEventListener('change', () => {
      normalizeDisplaySizeInput();
      scheduleRefreshDesignPanelsLive();
    });
  }
  [el.phoneH, el.phoneW, el.phoneT].forEach((node) => {
    if (!node) return;
    node.addEventListener('blur', () => {
      normalizePhoneDimensionInputs();
      scheduleRefreshDesignPanelsLive();
    });
    node.addEventListener('change', () => {
      normalizePhoneDimensionInputs();
      scheduleRefreshDesignPanelsLive();
    });
  });
  if (el.startupDifficulty) {
    el.startupDifficulty.addEventListener('change', updateStartupDifficultyStyle);
  }
  if (el.phoneRenderCanvas) {
    el.phoneRenderCanvas.addEventListener('click', () => openPreviewLightbox(el.phoneRenderCanvas, '背面 45° 放大预览'));
  }
  if (el.phoneFrontCanvas) {
    el.phoneFrontCanvas.addEventListener('click', () => openPreviewLightbox(el.phoneFrontCanvas, '正面屏幕 放大预览'));
  }
  bindOpsChartInteractions();
  if (el.previewLightboxClose) {
    el.previewLightboxClose.addEventListener('click', closePreviewLightbox);
  }
  if (el.benchClose) {
    el.benchClose.addEventListener('click', closeBenchPage);
  }
  if (el.gameModal) {
    el.gameModal.addEventListener('click', (evt) => {
      if (evt.target === el.gameModal) {
        closeLastGameModal();
        return;
      }
      const target = evt.target instanceof Element ? evt.target.closest('.game-modal-close') : null;
      if (!(target instanceof HTMLElement)) return;
      const card = target.closest('.game-modal-card');
      const id = card ? card.getAttribute('data-modal-id') : '';
      if (id) closeGameModalById(id);
    });
  }
  if (el.benchPage) {
    el.benchPage.addEventListener('click', (evt) => {
      if (evt.target === el.benchPage) closeBenchPage();
    });
  }
  if (el.previewLightbox) {
    el.previewLightbox.addEventListener('click', (evt) => {
      if (evt.target === el.previewLightbox) closePreviewLightbox();
    });
  }
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeAchievementPanel();
      closePreviewLightbox();
      closeBenchPage();
      closeLastGameModal();
    }
  });
}

function fillSources() {
  const links = [
    ['Qualcomm 8 Elite 产品页', 'https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-elite-mobile-platform'],
    ['Qualcomm 8 Gen 3 产品页', 'https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-gen-3-mobile-platform'],
    ['Qualcomm 4 Gen 2 产品页', 'https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-4-series-mobile-platforms/snapdragon-4-gen-2-mobile-platform'],
    ['Qualcomm 8 Elite Gen 5 产品简述', 'https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/snapdragon-8-elite-gen-5-product-brief.pdf'],
    ['Qualcomm 7s Gen 3 产品简述', 'https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/snapdragon-7s-gen-3-product-brief.pdf'],
    ['MediaTek Helio G35 官方页', 'https://www.mediatek.com/products/smartphones-2/mediatek-helio-g35'],
    ['MediaTek Dimensity 6100+ 官方页', 'https://www.mediatek.com/products/smartphones-2/mediatek-dimensity-6100-plus'],
    ['MediaTek Helio G81 官方页', 'https://www.mediatek.com/products/smartphones-2/mediatek-helio-g81'],
    ['MediaTek Dimensity 7300 官方页', 'https://www.mediatek.com/products/smartphones-2/mediatek-dimensity-7300'],
    ['MediaTek Dimensity 9400 官方页', 'https://www.mediatek.com/products/smartphones-2/mediatek-dimensity-9400'],
    ['UNISOC T7225 官方页', 'https://www.unisoc.com/en_us/home/TZNSQYCP/about/38/1742'],
    ['TechInsights 转述：Galaxy S25 Ultra 组件成本', 'https://electronics360.globalspec.com/article/21108/galaxy-s25-ultra-material-costs-estimated-at-528'],
    ['TechInsights 转述：Mate 60 Pro+ 组件成本', 'https://electronics360.globalspec.com/article/20319/huawei-mate-60-pro-material-costs-revealed'],
    ['TCL CSOT 手机显示业务', 'https://www.tcl.com/global/en/tcl-csot/products/smart-device-display'],
    ['BOE 柔性 OLED 资料', 'https://www.boe.com/en/technology/oled/'],
    ['Tianma 中小尺寸显示业务', 'https://www.tianma.com/en/products/small-medium-size-display/'],
    ['OV50H 产品页', 'https://www.ovt.com/products/ov50h40/'],
    ['OV13B10 产品页', 'https://www.ovt.com/products/ov13b10/'],
    ['OV64B 产品页', 'https://www.ovt.com/products/ov64b40/'],
    ['Samsung ISOCELL HP2 产品页', 'https://semiconductor.samsung.com/image-sensor/mobile-image-sensor/isocell-hp2/'],
    ['Samsung ISOCELL HP3 产品页', 'https://semiconductor.samsung.com/image-sensor/mobile-image-sensor/isocell-hp3/'],
    ['Samsung ISOCELL GN3 产品页', 'https://semiconductor.samsung.com/image-sensor/mobile-image-sensor/isocell-gn3/'],
    ['NanoReview SoC 基准库（AnTuTu / Geekbench）', 'https://nanoreview.net/en/soc-list/rating'],
    ['GSMArena：Smartisan Nut R2 规格', 'https://www.gsmarena.com/smartisan_nut_r2-10445.php'],
    ['Notebookcheck：Snapdragon 865 功耗与性能评测', 'https://www.notebookcheck.net/Qualcomm-Snapdragon-865-5G-Processor-Benchmarks-and-Specs.443773.0.html'],
    ['DXOMARK Camera：Xiaomi 14 Ultra', 'https://www.dxomark.com/xiaomi-14-ultra-camera-test/'],
    ['DXOMARK Camera：Samsung Galaxy S23 Ultra', 'https://www.dxomark.com/samsung-galaxy-s23-ultra-camera-test/'],
    ['XDA：UFS 2.2/3.1/4.0 与 eMMC 速度层级说明', 'https://www.xda-developers.com/what-ufs-4-how-is-it-better-than-ufs-3-1/'],
    ['Samsung：UFS 4.0 性能数据', 'https://semiconductor.samsung.com/estorage/ufs/ufs-4-0/']
  ];

  el.sourceNote.innerHTML = links
    .map((x) => `<a href="${x[1]}" target="_blank" rel="noreferrer">${x[0]}</a>`)
    .join(' | ')
    + '<br>注：游戏内所有价格均为“参考估算值”，基于公开规格与公开拆解成本锚点推算，不代表真实商务采购合同。';
}

async function boot() {
  applyPerformanceProfile();
  const preSeed = document.getElementById('preSeed');
  if (preSeed) preSeed.remove();
  const instantWelcome = document.getElementById('instantWelcome');
  if (instantWelcome) instantWelcome.classList.add('hidden');
  if (el.bootLoading) el.bootLoading.classList.remove('hidden');
  if (el.bootReload) {
    el.bootReload.addEventListener('click', () => window.location.reload());
  }
  const totalSteps = 5;
  setBootLoading('已进入游戏，正在初始化…', false, 1, totalSteps);
  try {
    setBootLoading('正在加载系统组件…', false, 2, totalSteps);
    resetTechPoolsToBase();
    setBootLoading('正在加载词典与配置…', false, 3, totalSteps);
    await loadForbiddenNameDictionary();
    setBootLoading('正在构建设计与运营面板…', false, 4, totalSteps);
    fillOptions();
    validateIntegerInput(el.units, el.unitsIntHint, { showHint: false });
    validateIntegerInput(el.restockUnits, el.restockIntHint, { showHint: false });
    assignRandomRegion();
    bind();
    renderGameVersionUI();
    fillSources();
    rollThreeMarkets();
    updateHeader();
    setStep(1);
    updateDisplayQuickBox();
    updateEventGateState();
    refreshQuickGuideButtonState();
    setBootLoading('加载完成，准备开玩…', false, 5, totalSteps);
    window.setTimeout(hideBootLoading, 180);
    registerServiceWorkerDeferred();
  } catch (err) {
    reportRuntimeError('boot', err);
    const msg = err && err.message ? String(err.message) : '未知错误';
    setBootLoading(`加载失败：${msg}。请点击“刷新重试”。`, true, 0, totalSteps);
  }
}

boot();
