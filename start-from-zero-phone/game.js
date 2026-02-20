const RMB = (v) => `¥${Math.round(v).toLocaleString('zh-CN')}`;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rnd = (a, b) => Math.random() * (b - a) + a;
const GAME_VERSION = '1.0.6';
const BENCHMARK_NAME = 'GeekBeak G6';
const FIXED_COMPANY_NAME = 'StartPhone';
const FIXED_MODEL_BASE_NAME = 'Neo';
const BENCHMARK_BASELINE = {
  name: '果核 R²',
  // Nut R2-like baseline for gameplay readability.
  antutu10: 744600,
  geekbench6Single: 1231,
  geekbench6Multi: 3532,
  total: 115
};
const BATTERY_BASELINE = {
  name: '果核 R²',
  hours: 8.8,
  batteryWh: 4510 * 3.85 / 1000
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

const displayForms = {
  symmetry: { name: '上下对称窄边框', cost: 2, score: 6, demand: 0.015, frameAdj: 0.0, topExtra: 0.0 },
  notch: { name: '刘海屏', cost: 6, score: -4, demand: -0.025, frameAdj: 0.15, topExtra: 1.4 },
  hole: { name: '单挖孔', cost: 8, score: 2, demand: 0.01, frameAdj: 0.1, topExtra: 0.2 },
  pill: { name: '双挖孔/药丸', cost: 12, score: 3, demand: 0.015, frameAdj: 0.2, topExtra: 0.45 },
  udc: { name: '屏下前摄', cost: 85, score: 8, demand: 0.022, frameAdj: 0.25, topExtra: 0.1 }
};

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

const bodyOptions = [
  { id: 'plastic', name: '工程塑料', cost: 35, weight: 26, score: 2, structVolume: 4.8 },
  { id: 'aluminum', name: '铝合金中框', cost: 85, weight: 38, score: 7, structVolume: 5.8 },
  { id: 'glass', name: '双面玻璃 + 金属中框', cost: 120, weight: 52, score: 10, structVolume: 6.6 },
  { id: 'aramid', name: '芳纶复合后盖', cost: 180, weight: 40, score: 13, structVolume: 5.6 },
  { id: 'ceramic', name: '陶瓷机身', cost: 220, weight: 60, score: 15, structVolume: 7.0 },
  { id: 'titanium', name: '钛金属中框 + 玻璃', cost: 260, weight: 48, score: 18, structVolume: 6.2 }
];

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
  { id: 'gps_dual', name: '双频 GPS', cost: 12, weight: 0.5, space: 0.2, score: 2, demand: 0.005 },
  { id: 'dynamic_island', name: '灵动岛交互', cost: 8, weight: 0, space: 0.05, score: 2, demand: 0.008 },
  { id: 'active_fan', name: '主动散热风扇', cost: 86, weight: 21, space: 8.4, score: 5, demand: 0.016 },
  { id: 'semi_cooler', name: '冰爽半导体散热风扇', cost: 168, weight: 34, space: 12.2, score: 6, demand: 0.018 },
  { id: 'battery_tech', name: '新型高密度电池技术', cost: 180, weight: 0, space: 0.2, score: 3, demand: 0.006 },
  { id: 'flat_back', name: '纯平背板', cost: 22, weight: 2.5, space: 1.1, score: 5, demand: 0.018 },
  { id: 'magsafe', name: '磁吸生态配件', cost: 25, weight: 4, space: 1.2, score: 3, demand: 0.012 },
  { id: 'fast120', name: '120W 超级快充', cost: 55, weight: 6, space: 2.0, score: 6, demand: 0.02 },
  { id: 'vc', name: '大面积 VC 散热', cost: 35, weight: 8, space: 5.5, score: 4, demand: 0.015 },
  { id: 'satellite', name: '卫星 SOS 通信', cost: 40, weight: 2, space: 1.0, score: 4, demand: 0.007 }
];
const baseExtras = JSON.parse(JSON.stringify(extras));

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
    baseDemand: 1.0,
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
  smallScreenAchievedNotified: false,
  flatBackAchievedNotified: false,
  largeScreenAchievedNotified: false,
  goodLuckAchievedNotified: false,
  noRefreshAchievedNotified: false,
  squeezeToothpasteAchievedNotified: false,
  brandToneAchievedNotified: false,
  achievements: [],
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
  stageEvent: document.getElementById('stageEvent'),
  stageConfig: document.getElementById('stageConfig'),
  stageRun: document.getElementById('stageRun'),
  achieveEntry: document.getElementById('achieveEntry'),
  achieveClose: document.getElementById('achieveClose'),
  achieveCount: document.getElementById('achieveCount'),
  achievePanel: document.getElementById('achievePanel'),
  achieveList: document.getElementById('achieveList'),
  achieveProgressText: document.getElementById('achieveProgressText'),
  achieveProgressFill: document.getElementById('achieveProgressFill'),
  rollEvents: document.getElementById('rollEvents'),
  eventCards: document.getElementById('eventCards'),
  eventHint: document.getElementById('eventHint'),
  confirmEvent: document.getElementById('confirmEvent'),
  quickGuideBtn: document.getElementById('quickGuideBtn'),
  inlineGuideVersion: document.getElementById('inlineGuideVersion'),
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
  camTele: document.getElementById('camTele'),
  camFront: document.getElementById('camFront'),
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
  'thermal_maniac', 'satellite', 'battery_tech', 'magsafe', 'small_screen', 'flat_back', 'large_screen',
  'good_luck', 'no_refresh_shell', 'squeeze_toothpaste', 'brand_tone', 'grand_slam'
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
  '<button type="button" class="quick-guide-detail-entry" data-action="open-rule-detail">查看详细机制</button>',
  `<span class="quick-guide-version">版本：v${GAME_VERSION}</span>`
].join('<br>');

const DETAILED_MECHANICS_HTML = [
  '<strong>1. 核心目标与流程</strong>',
  '目标：在现金、口碑、销量、库存之间做平衡，尽可能长期经营并持续换代。',
  '流程：随机市场 -> 设计手机 -> 立项开售 -> 月度运营 -> 产品结算/企业结算。',
  '起始资金：¥10,000,000；默认单代生命周期上限：30 个月。',
  '',
  '<strong>2. 设计参数如何影响结果（量化）</strong>',
  '质量分（设计核心）：0.34*SoC + 0.18*屏幕 + 0.14*(内存+存储) + 0.20*影像 + 0.07*机身 + 0.07*额外功能；并叠加散热/续航等修正。',
  '综合跑分（GeekBeak G6）权重：SoC 39% + 存储 15% + 屏幕 12% + 影像 17% + 续航 17%。',
  '极客吸引度：SoC、影像、屏幕形态/功能占大头，会更明显放大线上需求。',
  '影像惩罚：无前摄约 x0.78；无主摄约 x0.58；完全无摄像头约 x0.22（强惩罚）。',
  '散热影响：热压力越高，热相关需求系数会从约 1.03 下降到最低约 0.74；并且会压制有效性能释放。',
  '线下偏好加成：护眼/LTPO/P3/快充/磁吸/GPS 等偏好点数累计，线下偏好上限约 x1.28。',
  '',
  '<strong>3. 成本与采购（量化）</strong>',
  '总启动成本 = 研发成本 + 首批生产成本 + 营销首发成本 + 合约首付（如有）。',
  '采购档位：现货（单价系数 1.12，交期约1月）/季度合约（1.00，交期约2月）/年度合约（0.92，交期约2月）。',
  '锁量风险：季度和年度会带来首付与锁量承诺，降低单价但提高压货风险。',
  '',
  '<strong>4. 需求算法（简化解释）</strong>',
  '需求不是随机数，而是“区域基础盘 x 设计匹配 x 渠道匹配 x 生命周期 x 事件扰动 x 定价可信度”的组合。',
  '基础需求主干：以常数 4600 为底盘，叠加难度、区域、市场环境、设计弹性、营销、跑分与口碑等系数。',
  '线上线下拆分：线上更吃参数与声量，线下更吃观感、续航和渠道匹配。',
  '换代疲劳：新一代改动太少会触发需求惩罚（保守/明显/严重）。',
  '',
  '<strong>5. 定价与口碑阈值</strong>',
  '定价可信度按“售价/成本”判定：口碑<=75 时，1.75 倍起线性惩罚，3.0 倍后指数下滑。',
  '若口碑>75：阈值放宽到 2.0 与 3.25；若口碑>90：免疫该高价惩罚。',
  '口碑会在月度运营中随销量、缺货、退货、事件与质量表现动态变化。',
  '',
  '<strong>6. 运营规则（关键数值）</strong>',
  '缺货预订：前 2 个月缺货可转预订，预订款按 100% 立即入账（用于缓解冷启动现金流）。',
  '代际贷款：每代可选 100 万，年化 10%，6 个月后自动扣回本息。',
  '清库存变现：产品结算时，真实难度按 SKU 售价约 30% 变现；困难难度约 20%。',
  '',
  '<strong>7. 难度差异（真实 vs 困难）</strong>',
  '真实：baseDemand 1.00 / trust 1.00 / designElasticity 1.00 / brandRamp 1.00 / marketCapacity 1.00。',
  '困难：baseDemand 0.75 / trust 0.82 / designElasticity 1.20 / brandRamp 0.86 / marketCapacity 0.82。',
  '一句话：真实更均衡，困难对现金流和策略容错要求更高。',
  '',
  '<strong>8. 胜负与结束</strong>',
  '常见失败：现金为负、口碑崩盘、设计无法立项、致命黑天鹅。',
  '你可以主动“产品停产结算”或“企业结算”；也可以持续经营多代冲长期成绩。',
  '<span class="muted">注：以上为 v1.0.6 的核心量化规则摘要。</span>'
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
  const point = {
    m: state.companyMonthsTotal,
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
    cash: state.cash,
    inv: computeTotalInventory(),
    sold: state.companySoldTotal,
    rating: state.rating
  }];
}

function drawOpsChart(ctx, cw, ch, points, isFullView) {
  const pad = { l: 42, r: 16, t: 26, b: 28 };
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

  ctx.fillStyle = 'rgba(205,224,244,0.9)';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText(`月 ${minM}`, pad.l, ch - 8);
  ctx.fillText(`月 ${Math.round((minM + maxM) / 2)}`, pad.l + plotW / 2 - 20, ch - 8);
  ctx.fillText(`月 ${maxM}`, cw - pad.r - 46, ch - 8);
  ctx.fillStyle = 'rgba(166,198,228,0.88)';
  ctx.font = '11px "Noto Sans SC", sans-serif';
  ctx.fillText(isFullView ? '完整周期（独立刻度）' : '最近6个月（独立刻度）', pad.l, 14);
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
  const isFoldableMat = Boolean(v && v.disp && v.disp.mat && String(v.disp.mat.name || '') === '折叠屏');
  const islandEnabled = (Array.isArray(v.chosenExtras) ? v.chosenExtras : []).some((ex) => ex.id === 'dynamic_island');
  const frontCamId = v.cams && v.cams.front ? String(v.cams.front.id || '') : 'none';
  if (frontCamId === 'none') return;
  const isSmallFrontModule = frontCamId === 'front_32';
  // "前摄模组"走小尺寸（约2.5mm）；其他前摄模组走更大尺寸。
  const frontHoleDiameterMm = isSmallFrontModule ? 2.5 : 4.8;
  const baseR = clamp(
    (frontHoleDiameterMm * Math.max(0.35, Number(scale) || 1)) / 2,
    isSmallFrontModule ? 1.6 : 2.8,
    isSmallFrontModule ? 3.4 : 6.2
  );
  const topY = sy + Math.max(4, sh * 0.04);
  // 折叠屏前摄位置偏左上，直板保持顶部居中。
  const centerX = isFoldableMat
    ? (sx + Math.max(8, sw * 0.16))
    : (sx + sw / 2);
  ctx.fillStyle = 'rgba(5,8,12,0.96)';
  if (formName.includes('刘海')) {
    const nw = Math.max(baseR * 7.6, Math.min(sw * 0.36, baseR * 10.2));
    const nh = Math.max(baseR * 2.4, Math.min(sh * 0.07, baseR * 3.8));
    roundedRectPath(ctx, centerX - nw / 2, sy, nw, nh, nh * 0.35);
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
  }
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
  const tMm = clamp(Number(v.phoneT) || 9.5, 6.5, 14);
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

    const rearCams = [v.cams?.main, v.cams?.ultra, v.cams?.tele].filter((c) => c && c.id !== 'none');
    if (rearCams.length > 0) {
      const pxPerMm = leftW / Math.max(1, wMm * 0.5);
      const lensRadiusPx = Math.max(2, ((10.2 * 1.15) * pxPerMm) / 2);
      const gapPx = 13.6 * pxPerMm;
      const baseX = bodyX + Math.max(3.5, 4 * pxPerMm) + lensRadiusPx + 0.5 * pxPerMm;
      const stackCount = Math.min(3, rearCams.length);
      const baseY = bodyY + Math.max(3.5, 4 * pxPerMm) + lensRadiusPx + 1.0 * pxPerMm;
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
  ctx.strokeStyle = rgbToCss(frameMid, 0.45);
  ctx.lineWidth = 1;
  ctx.stroke();

  // Rear cameras: no matrix deco, fixed physical lens size.
  const rearCams = [v.cams?.main, v.cams?.ultra, v.cams?.tele].filter((c) => c && c.id !== 'none');
  const camCount = rearCams.length;
  if (camCount > 0) {
    // Fixed physical camera ring size in mm so relative size changes with body dimensions.
    const pxPerMm = fw / Math.max(1, wMm);
    const fixedLensDiameterMm = 10.2 * 1.15;
    const lensRadiusPx = Math.max(2, (fixedLensDiameterMm * pxPerMm) / 2);
    const gapPx = 13.6 * pxPerMm;
    const edgeOffsetPx = 4 * pxPerMm;
    // Camera anchor should be measured from rear cover edges, not the 45° model bounds.
    const baseX = x + edgeOffsetPx + lensRadiusPx + 0.5 * pxPerMm;
    const baseY = y + edgeOffsetPx + lensRadiusPx + 1.0 * pxPerMm;
    const centers = [];
    for (let i = 0; i < Math.min(3, camCount); i += 1) {
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
  roundedRectPath(ctx, sx, sy, sw, sh, Math.max(4, radius * 0.66));
  const screenGrad = ctx.createLinearGradient(sx, sy, sx + sw, sy + sh);
  screenGrad.addColorStop(0, 'rgba(44,120,188,0.74)');
  screenGrad.addColorStop(1, 'rgba(14,28,58,0.88)');
  ctx.fillStyle = screenGrad;
  ctx.fill();
  drawFrontDisplayShape(ctx, v, sx, sy, sw, sh, scale);
  if (rawScreenW > maxScreenW + 0.5 || rawScreenH > maxScreenH + 0.5) {
    ctx.strokeStyle = 'rgba(255,94,108,0.92)';
    ctx.lineWidth = 1.2;
    roundedRectPath(ctx, sx, sy, sw, sh, Math.max(4, radius * 0.66));
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(176,205,236,0.86)';
  ctx.font = '12px "Noto Sans SC", sans-serif';
  ctx.fillText('Front View', 10, 18);
}

function updateHeader() {
  pushTimelinePoint();
  syncInventoryTotal();
  el.cash.textContent = RMB(state.cash);
  refreshInventoryUiOnly();
  el.rating.textContent = Math.round(state.rating).toString();
  el.month.textContent = String(state.month);
  renderOpsChart();
  renderMobileRunDockQuote();
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
    // Defer once so canvas/layout sizes are ready, then auto-evaluate.
    requestAnimationFrame(() => refreshDesignPanelsLive());
  }
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
      <input class="sku-price-adj" type="number" min="-1000" max="4000" step="100" value="${seed.priceAdj ?? 0}" />
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
  row.querySelector('.sku-ram').value = seed.ram || '8_lp5x';
  row.querySelector('.sku-rom').value = seed.rom || '256_ufs31';
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
    else ramSel.value = '8_lp5x';
    if ([...romSel.options].some((o) => o.value === oldRom)) romSel.value = oldRom;
    else romSel.value = '256_ufs31';
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
  addSkuRow({ ram: '8_lp5x', rom: '256_ufs31', priceAdj: 0, share: 100 });
}

function buildSkuPlansFromInputs(basePrice) {
  if (!el.skuList) return [];
  const rows = [...el.skuList.querySelectorAll('.sku-row')];
  return rows
    .map((row, idx) => {
      const ramId = row.querySelector('.sku-ram')?.value;
      const romId = row.querySelector('.sku-rom')?.value;
      const share = Number(row.querySelector('.sku-share')?.value || 0);
      const priceAdj = Number(row.querySelector('.sku-price-adj')?.value || 0);
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

function getRegionMarketStats(regionKey) {
  const rows = provinceMarketData.filter((x) => x.region === regionKey);
  if (!rows.length) return { population: 80, onlinePenetration: 0.72 };
  const population = rows.reduce((s, x) => s + x.pop, 0);
  const onlinePenetration = rows.reduce((s, x) => s + x.pop * x.online, 0) / population;
  return { population, onlinePenetration };
}

function isStrictIntegerText(raw) {
  return /^[0-9]+$/.test(String(raw ?? '').trim());
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

function getFoldableSizeCostFactor(sizeInch) {
  const s = Number(sizeInch) || 0;
  return clamp(1 + Math.max(0, s - 7.0) * 0.22 + Math.max(0, s - 7.8) * 0.18, 1.0, 1.72);
}

function updateDisplayMaterialOptions() {
  if (!el.dispMat) return;
  const unlocked = isFoldableUnlocked();
  const current = el.dispMat.value;
  const rows = [
    ['lcd', 'LCD'],
    ['oled', 'OLED'],
    ['dual_oled', '双层 OLED'],
    ['eink', '墨水屏'],
    ['foldable', unlocked ? '折叠屏' : '折叠屏（第二代解锁）']
  ];
  el.dispMat.innerHTML = rows
    .map(([key, name]) => `<option value="${key}" ${key === 'foldable' && !unlocked ? 'disabled' : ''}>${name}</option>`)
    .join('');
  if (current === 'foldable' && !unlocked) {
    el.dispMat.value = 'oled';
  } else if (rows.some(([key]) => key === current)) {
    el.dispMat.value = current;
  }
}

function getScreenRatioBand(formKey, matKey) {
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
  const map = { oled: 0.15, dual_oled: 0.35, eink: 1.8, foldable: 0.65 };
  return map[matKey] || 1.0;
}

function getDisplayBezelGeometry(matKey, vendorKey, formKey, sizeInch) {
  const vendor = displayVendors[vendorKey];
  const form = displayForms[formKey];
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
  const vendorKey = el.dispVendor.value;
  const ratio = el.dispRatio.value;
  const size = Number(el.dispSize.value);
  const formKey = el.dispForm.value;
  const features = [...el.displayFeatures.querySelectorAll('input:checked')].map((i) => displayFeatureMap[i.value]);

  const mat = displayMaterials[matKey];
  const vendor = displayVendors[vendorKey];
  const form = displayForms[formKey];
  const sizeFactor = Math.pow(size / 6.5, 1.15);
  const ratioFactor = aspectCostFactor[ratio] || 1.03;
  const featureCostMultiplier = matKey === 'eink' ? 2.8 : 1.0;
  const featureCost = features.reduce((s, f) => s + f.cost, 0) * featureCostMultiplier;
  const ratioNoveltyCostMul = (ratio === '4:3' || ratio === '16:10') && matKey !== 'foldable' ? 1.08 : 1.0;
  const foldableSizeMul = matKey === 'foldable' ? getFoldableSizeCostFactor(size) : 1.0;
  const dim = getScreenDimensionsMm(size, ratio);
  const bezel = getDisplayBezelGeometry(matKey, vendorKey, formKey, size);
  const band = getScreenRatioBand(formKey, matKey);
  const phoneH = Number(el.phoneH.value);
  const phoneW = Number(el.phoneW.value);
  const frontAreaCm2 = (phoneH * phoneW) / 100;
  const screenAreaCm2 = (dim.widthMm * dim.heightMm) / 100;
  const screenToBodyRatio = clamp(screenAreaCm2 / Math.max(1, frontAreaCm2), 0.45, 0.96);
  const ratioMid = (band.min + band.max) / 2;
  const highTightness = Math.max(0, screenToBodyRatio - ratioMid);
  const lowLoose = Math.max(0, ratioMid - screenToBodyRatio);
  const ratioCostFactor = clamp(1 + highTightness * 1.1 - lowLoose * 0.25, 0.9, 1.22);
  const bezelCostFactor = clamp(1 + Math.max(0, 2.5 - bezel.sideBezel) * 0.16, 0.92, 1.28);
  const bezelDemandFactor = clamp(1.07 - Math.max(0, bezel.sideBezel - 1.5) * 0.12, 0.68, 1.08);
  const displayCost = ((mat.baseCost * sizeFactor * ratioFactor + featureCost + form.cost) * foldableSizeMul) * vendor.costFactor * ratioCostFactor * bezelCostFactor * ratioNoveltyCostMul;
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
  const prevSoc = el.soc ? el.soc.value : '';
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

  el.dispForm.innerHTML = Object.entries(displayForms)
    .map(([key, f], idx) => `<option value="${key}" ${idx === 2 ? 'selected' : ''}>${f.name}</option>`)
    .join('');
  el.dispVendor.innerHTML = Object.entries(displayVendors)
    .map(([key, v]) => `<option value="${key}">${v.name}</option>`)
    .join('');
  el.dispVendor.value = 'mid';

  const quoteOpts = Object.entries(procurementPlans)
    .map(([key, q]) => `<option value="${key}">${q.name}（系数 ${q.factor.toFixed(2)}）</option>`)
    .join('');
  el.procurementPlan.innerHTML = quoteOpts;
  el.procurementPlan.value = 'quarterly';

  initSkuRows();
  el.body.innerHTML = bodyOptions.map((x, idx) => `<option value="${x.id}" ${idx === 1 ? 'selected' : ''}>${x.name}（${RMB(x.cost)}）</option>`).join('');

  const prevMain = el.camMain ? el.camMain.value : '';
  const prevUltra = el.camUltra ? el.camUltra.value : '';
  const prevTele = el.camTele ? el.camTele.value : '';
  const prevFront = el.camFront ? el.camFront.value : '';
  const activeCameras = cameraModules
    .filter((x) => !x.retired)
    .slice()
    .sort((a, b) => (Number(a.cost || 0) - Number(b.cost || 0)) || (Number(a.score || 0) - Number(b.score || 0)));
  const cameraOpt = activeCameras.map((x) => `<option value="${x.id}">${x.name}${x.cost ? `（${RMB(x.cost)}）` : ''}</option>`).join('');
  el.camMain.innerHTML = cameraOpt;
  el.camUltra.innerHTML = cameraOpt;
  el.camTele.innerHTML = cameraOpt;
  el.camFront.innerHTML = cameraOpt;
  const hasCam = (id) => activeCameras.some((x) => x.id === id);
  el.camMain.value = hasCam(prevMain) ? prevMain : (hasCam('ov50h') ? 'ov50h' : (activeCameras[0]?.id || 'none'));
  el.camUltra.value = hasCam(prevUltra) ? prevUltra : (hasCam('uw_50') ? 'uw_50' : 'none');
  el.camTele.value = hasCam(prevTele) ? prevTele : 'none';
  el.camFront.value = hasCam(prevFront) ? prevFront : (hasCam('front_32') ? 'front_32' : 'none');

  refreshExtrasSelectableOptions();

  el.marketingFocus.innerHTML = Object.entries(marketingProfiles)
    .map(([key, m]) => `<option value="${key}">${m.name}</option>`)
    .join('');
  el.campaignLevel.innerHTML = Object.entries(campaignLevels)
    .map(([key, c]) => `<option value="${key}">${c.name}（首发 ${RMB(c.launchCost)}）</option>`)
    .join('');
  el.marketingFocus.value = 'balanced';
  el.campaignLevel.value = 'medium';
  if (el.modelBaseName) el.modelBaseName.value = FIXED_MODEL_BASE_NAME;
  updateStartupDifficultyStyle();
  updateModelNameHint();
}

function refreshExtrasSelectableOptions() {
  if (!el.extras) return;
  const checked = new Set(
    [...el.extras.querySelectorAll('input:checked')]
      .map((i) => i.value)
  );
  el.extras.innerHTML = extras.map((x) => `
    <label><input type="checkbox" value="${x.id}" ${checked.has(x.id) ? 'checked' : ''} /> ${x.name}（+${RMB(x.cost)}，+${x.weight}g）</label>
  `).join('');
}

function refreshTechSelectableOptions() {
  const activeSocs = socs
    .filter((s) => !s.retired)
    .slice()
    .sort((a, b) => (Number(a.cost || 0) - Number(b.cost || 0)) || (Number(a.score || 0) - Number(b.score || 0)));
  const currentSoc = el.soc ? el.soc.value : '';
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
  if (el.camTele) {
    el.camTele.innerHTML = cameraOpt;
    el.camTele.value = hasCam(currentTele) ? currentTele : 'none';
  }
  if (el.camFront) {
    el.camFront.innerHTML = cameraOpt;
    el.camFront.value = hasCam(currentFront) ? currentFront : (hasCam('front_32') ? 'front_32' : 'none');
  }
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

function maybeRefreshMemoryPools(trigger = 'time') {
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
  const nextGen = getNextGenerationIndex();
  const unlocked = nextGen >= 3 || state.companyMonthsTotal >= 30;
  if (!unlocked) return false;
  const timeDue = (state.companyMonthsTotal - (state.lastTechRefreshMonth || 0)) >= 12;
  const genDue = trigger === 'generation' && nextGen > (state.lastTechRefreshGeneration || 1);
  if (!timeDue && !genDue) return false;

  state.techCycle = (state.techCycle || 0) + 1;
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
    `行业进入新一轮更新：新旗舰/新中端已入场，老款芯片与传感器开始下沉或淘汰。<br>本次更新已生效（第 <strong>${state.techCycle}</strong> 轮），建议重新检查配置与定价。`
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
  el.eventHint.textContent = `已选环境：${state.marketPick.name}`;
}

function selectedValues() {
  const socRaw = socs.find((x) => x.id === el.soc.value);
  const bodyRaw = bodyOptions.find((x) => x.id === el.body.value);
  const soc = socRaw ? { ...socRaw } : null;
  const body = bodyRaw ? { ...bodyRaw } : null;
  const region = chinaRegions[el.region.value];
  const marketStats = getRegionMarketStats(el.region.value);
  const procurement = procurementPlans[el.procurementPlan.value];
  const marketing = marketingProfiles[el.marketingFocus.value];
  const campaign = campaignLevels[el.campaignLevel.value];
  const startupDifficulty = startupDifficulties[el.startupDifficulty.value] || startupDifficulties.real;

  const disp = {
    mat: { ...displayMaterials[el.dispMat.value] },
    vendor: { ...displayVendors[el.dispVendor.value] },
    form: { ...displayForms[el.dispForm.value] },
    size: Number(el.dispSize.value),
    ratio: el.dispRatio.value,
    features: [...el.displayFeatures.querySelectorAll('input:checked')].map((i) => ({ ...displayFeatureMap[i.value] }))
  };

  const cams = {
    main: { ...(cameraModules.find((x) => x.id === el.camMain.value) || { id: 'none', name: '无', cost: 0, weight: 0, score: 0, type: 'none', volume: 0 }) },
    ultra: { ...(cameraModules.find((x) => x.id === el.camUltra.value) || { id: 'none', name: '无', cost: 0, weight: 0, score: 0, type: 'none', volume: 0 }) },
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
    modelBaseName: FIXED_MODEL_BASE_NAME,
    disp,
    cams,
    chosenExtras,
    skuPlans,
    price: Number(el.price.value),
    units: Number(el.units.value),
    battery: Number(el.battery.value),
    phoneH: Number(el.phoneH.value),
    phoneW: Number(el.phoneW.value),
    phoneT: Number(el.phoneT.value)
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

function calcVirtualBenchmark(v, avgRamScore, avgRomScore, displayScore, cameraScore, batteryLabScore, thermalPressure) {
  const socRef = socBenchmarkAnchors[v.soc.id] || socBenchmarkAnchors.dim7300;
  const parseGenFromId = (id) => {
    const m = String(id || '').match(/_(?:x)?(\d+)$/i);
    return m ? Math.max(0, Number(m[1]) || 0) : 0;
  };
  const techRound = Math.max(0, Number(state.techCycle || 0));
  const hasActiveFan = Array.isArray(v.chosenExtras) && v.chosenExtras.some((x) => x.id === 'active_fan');
  const hasVCBoost = Array.isArray(v.chosenExtras) && v.chosenExtras.some((x) => x.id === 'vc');
  const hasSemiBoost = Array.isArray(v.chosenExtras) && v.chosenExtras.some((x) => x.id === 'semi_cooler');
  const socLabScoreRaw = Math.max(
    55,
    50
      + socRef.antutu10 / 40_000
      + socRef.geekbench6Single / 90
      + socRef.geekbench6Multi / 220
  );
  const socBoostMul = 1 + (hasActiveFan ? 0.1 : 0) + (hasVCBoost ? 0.1 : 0) + (hasSemiBoost ? 0.2 : 0);
  const socLabScoreForHeat = Math.max(55, socLabScoreRaw * socBoostMul);
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
  const storageLabScore = Math.max(
    50,
    55
      + weightedStorage.read / 90
      + weightedStorage.write / 120
      + avgRamScore * 0.75
      + avgRomScore * 0.45
  );

  const displayLabScore = Math.max(60, 64 + displayScore * 1.02);

  const main = v.cams.main.id === 'none' ? 0 : v.cams.main.score;
  const ultra = v.cams.ultra.id === 'none' ? 0 : v.cams.ultra.score;
  const tele = v.cams.tele.id === 'none' ? 0 : v.cams.tele.score;
  const front = v.cams.front.id === 'none' ? 0 : v.cams.front.score;
  const camGenAvg = (
    parseGenFromId(v.cams.main.id)
    + parseGenFromId(v.cams.ultra.id)
    + parseGenFromId(v.cams.tele.id)
    + parseGenFromId(v.cams.front.id)
  ) / 4;
  const camEra = Math.max(0, techRound * 0.9 + camGenAvg * 0.9);
  const hasAnyCamera = main > 0 || ultra > 0 || tele > 0 || front > 0;
  const cameraLabScore = hasAnyCamera
    ? Math.max(
      35,
      46
        + main * 1.25
        + ultra * 0.65
        + tele * 0.78
        + front * 0.34
        + camEra * 2.8
        + (main > 0 && ultra > 0 && tele > 0 ? 6 : 0)
    )
    : 0;

  const total = Math.round(
    socLabScore * 0.39
    + storageLabScore * 0.15
    + displayLabScore * 0.12
    + cameraLabScore * 0.17
    + batteryLabScore * 0.17
  );
  const baselineRatio = total / BENCHMARK_BASELINE.total;
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
    baselineRatio,
    baselineDeltaPct,
    baselineTag,
    benchmarkDemandMul: clamp(0.92 + (total - 100) / 420, 0.78, 1.26),
    benchmarkGeekBonus: (socLabScore - 90) * 0.13 + (cameraLabScore - 95) * 0.08
  };
}

function benchmarkRatioText(ratio) {
  const pct = clamp((Number(ratio) || 0) * 100, 0, 999);
  return `${Math.round(pct)}%`;
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
  const batteryWh = v.battery * 3.85 / 1000;
  const baselineDim = getScreenDimensionsMm(6.67, '20:9');
  const baselineArea = baselineDim.widthMm * baselineDim.heightMm;
  const screenArea = screenMm.widthMm * screenMm.heightMm;
  const sizeRel = Math.pow(Math.max(0.5, screenArea / Math.max(1, baselineArea)), 0.72);

  const matPowerRel = {
    lcd: 1.12,
    oled: 1.0,
    dual_oled: 1.28,
    eink: 0.42,
    foldable: 1.38
  };
  const matRel = matPowerRel[el.dispMat.value] || 1.0;
  const highRefreshRel = displayFeatureKeys.includes('high_refresh') ? 1.08 : 0.9;
  const ltpoRel = (displayFeatureKeys.includes('ltpo') && ['oled', 'dual_oled', 'foldable'].includes(el.dispMat.value)) ? 0.9 : 1.0;
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
    fast120: 0.02,
    dynamic_island: 0.005
  };
  const otherRel = 1 + v.chosenExtras.reduce((sum, x) => sum + (extraPowerRel[x.id] || 0), 0);

  const powerIndex = clamp(socRel * 0.36 + screenRel * 0.44 + otherRel * 0.2, 0.55, 1.95);
  const hasSemiCooler = Array.isArray(v.chosenExtras) && v.chosenExtras.some((x) => x.id === 'semi_cooler');
  const hoursRaw = BATTERY_BASELINE.hours * (batteryWh / BATTERY_BASELINE.batteryWh) / powerIndex;
  const hours = hasSemiCooler ? hoursRaw * 0.95 : hoursRaw;
  const endurancePct = Math.max(45, (hours / BATTERY_BASELINE.hours) * 100);
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
  if (v.price < 999 || v.price > 19999) issues.push('定价需在 999~19999。');
  if (v.units < 1000 || v.units > 150000) issues.push('首批产量需在 1000~150000。');
  if (v.battery < 1500 || v.battery > 10000) issues.push('电池容量需在 1500~10000mAh。');

  if (v.phoneH < 80 || v.phoneH > 260) issues.push('机身高度需在 80~260mm。');
  if (v.phoneW < 35 || v.phoneW > 180) issues.push('机身宽度需在 35~180mm。');
  if (v.phoneT < 6.5 || v.phoneT > 14) issues.push('机身厚度需在 6.5~14.0mm。');

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
  if (v.skuPlans.some((s) => s.price < 699 || s.price > 29999)) {
    issues.push('SKU 价格需在 699~29999 区间（基础价 + SKU 加价）。');
  }

  const sizeFactor = Math.pow(v.disp.size / 6.5, 1.15);
  const ratioFactor = aspectCostFactor[v.disp.ratio] || 1.03;
  const featureCostMultiplier = el.dispMat.value === 'eink' ? 2.8 : 1.0;
  const ratioNovelty = v.disp.ratio === '4:3' || v.disp.ratio === '16:10';
  const ratioNoveltyNonFoldable = ratioNovelty && el.dispMat.value !== 'foldable';
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

  const camList = [v.cams.main, v.cams.ultra, v.cams.tele, v.cams.front].filter((x) => x.id !== 'none');
  if (v.disp.form === displayForms.udc && v.cams.front.id === 'none') issues.push('屏下前摄形态需要至少选择一个前摄模组。');
  if (v.disp.form !== displayForms.udc && v.cams.front.id !== 'none' && v.cams.front.volume > 0.9 && v.disp.form.name.includes('刘海')) {
    issues.push('大尺寸前摄模组与刘海方案冲突风险较高，建议改为挖孔/药丸或降低前摄规格。');
  }
  const hasMainCamera = v.cams.main.id !== 'none';
  const hasFrontCamera = v.cams.front.id !== 'none';
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
  const cameraVolume = camList.reduce((s, c) => s + c.volume, 0);

  const extraCost = v.chosenExtras.reduce((s, x) => s + x.cost, 0);
  const extraWeight = v.chosenExtras.reduce((s, x) => s + x.weight, 0);
  const extraScore = v.chosenExtras.reduce((s, x) => s + x.score, 0);
  const extraDemandBoost = v.chosenExtras.reduce((s, x) => s + x.demand, 0) + v.disp.form.demand;
  const extraSpace = v.chosenExtras.reduce((s, x) => s + x.space, 0);
  const hasFlatBack = v.chosenExtras.some((x) => x.id === 'flat_back');
  const hasBatteryTech = v.chosenExtras.some((x) => x.id === 'battery_tech');
  const hasDynamicIsland = v.chosenExtras.some((x) => x.id === 'dynamic_island');
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
  const effectiveEnergyDensity = 655;
  const batteryVolume = (batteryWh / effectiveEnergyDensity * 1000) * (hasBatteryTech ? 0.7 : 1.0) * integrationUplift.battery;
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
  const displayCost = ((v.disp.mat.baseCost * sizeFactor * ratioFactor + featureCost + formCost) * foldableSizeMul) * v.disp.vendor.costFactor * ratioCostFactor * bezelCostFactor * ratioNoveltyCostMul;
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
  const displayThickness = ({ lcd: 1.15, oled: 0.92, dual_oled: 1.25, eink: 1.38, foldable: 1.62 })[el.dispMat.value] || 1.0;
  const displayVolume = (displayAreaCm2 * displayThickness / 10) * integrationUplift.display;
  const avgRamScore = v.skuPlans.length ? v.skuPlans.reduce((s, x) => s + x.ram.score * (x.share / 100), 0) : 0;
  const avgRomScore = v.skuPlans.length ? v.skuPlans.reduce((s, x) => s + x.rom.score * (x.share / 100), 0) : 0;
  const batteryEval = calcBatteryEndurance(v, screenMm, displayFeatureKeys);
  const hasVC = v.chosenExtras.some((x) => x.id === 'vc');
  const hasActiveFan = v.chosenExtras.some((x) => x.id === 'active_fan');
  const hasSemiCooler = v.chosenExtras.some((x) => x.id === 'semi_cooler');
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
  const socThermal = dynamicSocThermalMap[v.soc.id] ?? socThermalMap[v.soc.id] ?? 1.0;
  const mainCamThermal = dynamicMainCamThermalMap[v.cams.main.id] ?? mainCamThermalMap[v.cams.main.id] ?? 0.14;
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
  // Active fan: reduce thermal pressure by 55%~90%.
  const fanCoolingMul = hasActiveFan ? clamp(0.45 - coolingTechRound * 0.04, 0.1, 0.45) : 1.0;
  // Semiconductor cooler: target 75%~110% reduction zone.
  // Multiplier can dip below zero to represent over-cooling headroom; final pressure is floored later.
  const semiCoolingMul = hasSemiCooler ? clamp(0.25 - coolingTechRound * 0.035, -0.1, 0.25) : 1.0;
  const thermalPressureRaw = (
    (socThermal + mainCamThermal + (totalCameraCount >= 3 ? 0.08 : 0))
      * vcCoolingMul
      * fanCoolingMul
      * semiCoolingMul
      * baselineCoolingMul
      * bodyThermalFactor
      * surfaceAreaThermalFactor
  );
  // Slight global uplift so all SoCs are a bit easier to overheat.
  const thermalPressure = clamp(thermalPressureRaw * 1.1, 0.02, 2.2);
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
  const boardVolume = (7.9 + (v.soc.risk * 1.52) + memoryPackageVolume) * integrationUplift.board;
  const mandatoryBaseVolume = 7.5 * integrationUplift.base;
  const occupiedVolume =
    batteryVolume
    + cameraVolume * integrationUplift.camera
    + displayVolume
    + boardVolume
    + mandatoryBaseVolume
    + v.body.structVolume * integrationUplift.body
    + extraSpace * integrationUplift.extras;
  const remainingVolume = effectiveInternalVolume - occupiedVolume;
  if (remainingVolume < 0) {
    issues.push(`体积超限：机身有效内部体积约 ${effectiveInternalVolume.toFixed(1)}cm³，但当前组件占用约 ${occupiedVolume.toFixed(1)}cm³。`);
  }

  const socCost = v.soc.cost * v.procurement.factor;
  const memoryMarketFactor = state.memoryMarket ? state.memoryMarket.factor : 1.0;
  const cameraCost = cameraCostRaw * v.procurement.factor;
  const bodyCost = v.body.cost;
  const commonComponentCost = socCost + displayCost + bodyCost + cameraCost + batteryCost + extraCost;
  const logisticsCost = 36 * v.region.logistics + Math.max(0, (v.region.comp - 1) * 22);
  const marketCostFactor = state.marketPick ? state.marketPick.cost : 1;
  const skuCosting = v.skuPlans.map((sku) => {
    const memoryCost = (sku.ram.cost + sku.rom.cost) * v.procurement.factor * memoryMarketFactor;
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
  const currentSpecSnapshot = buildSpecSnapshotFromInput(v, weightedSkuPrice, v.skuPlans);
  const lastSpecSnapshot = getLastGenerationSpecSnapshot();
  const novelty = calcGenerationNovelty(currentSpecSnapshot, lastSpecSnapshot, v.startupDifficulty?.name || '真实');

  const procurementUpfront = v.procurement.upfront * clamp(1.06 - (v.region.supplyEco - 1) * 0.55, 0.84, 1.15);
  const supplyStability = clamp(v.procurement.supply * v.region.supplyEco, 0.82, 1.25);
  const contractCoverageUnits = v.procurement.coverageMultiplier > 0
    ? Math.ceil(v.units * v.procurement.coverageMultiplier)
    : 0;
  const lockCommitUnits = Math.max(0, contractCoverageUnits - v.units);
  const lockCommitCost = lockCommitUnits * unitCost * (v.procurement.lockCommitRate || 0);

  const complexity = (v.soc.risk + camList.length * 0.08 + v.chosenExtras.length * 0.05 + (displayScore > 85 ? 0.08 : 0));
  const rdCostFactor = clamp(1.12 - (v.region.rdTalent - 1) * 0.58, 0.86, 1.18);
  const rndCost = (1_050_000 * complexity + (displayCost + cameraCost) * 400) * rdCostFactor * screenRatioRndMul;
  const firstBatchCost = unitCost * v.units;
  const initialCost = rndCost + firstBatchCost + procurementUpfront + lockCommitCost + v.campaign.launchCost;

  const boardWeight = 68;
  const totalWeight = boardWeight + displayWeight + v.body.weight + batteryWeight + cameraWeight + extraWeight;

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
    online: v.body.id === 'aramid' ? 1.1 : 1.0,
    offline: v.body.id === 'ceramic' ? 1.1 : 1.0
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
    (onlinePotentialRaw + (hasDynamicIsland ? 0.08 : 0))
      * foldableOnlineBoost
      * bodyChannelPreference.online
      * premiumOnlineDemandCarry
      * batteryEval.onlineDemandMul,
    0.58,
    2.2
  );
  const offlinePotential = clamp(
    (offlinePotentialRaw + (hasDynamicIsland ? 0.06 : 0) + (v.cams.front.id === 'front_g1sq' || String(v.cams.front.id || '').startsWith('front_g1sq_x') ? 0.09 : 0))
      * foldableOfflineBoost
      * bodyChannelPreference.offline
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
      + (v.body.id === 'titanium' ? 0.06 : 0)
      + (v.body.id === 'glass' ? 0.04 : 0)
      + (el.dispMat.value === 'foldable' ? 0.12 : 0)
      - (el.dispMat.value === 'eink' ? 0.06 : 0)
      - (v.body.id === 'plastic' ? 0.06 : 0),
    0.74,
    1.36
  );
  const onlinePriceAcceptance = clamp(
    1.0
      + (priceFit - 1) * 0.6
      + (premiumSignal - 1) * 0.22
      - Math.max(0, pricePressure - 1.08) * 0.26,
    0.64,
    1.28
  );
  const offlinePriceAcceptance = clamp(
    0.98
      + (priceFit - 1) * 0.48
      + (aestheticAcceptance - 1) * 0.16
      - Math.max(0, pricePressure - 1.05) * 0.32,
    0.58,
    1.24
  );
  const flagshipCameraCount = [v.cams.main, v.cams.ultra, v.cams.tele].filter((c) => c && c.id !== 'none' && Number(c.score || 0) >= 34).length;
  const hasMultipleFlagshipCams = flagshipCameraCount >= 2;
  const isHighQualityLcd = el.dispMat.value === 'lcd' && v.disp.features.length >= 3 && displayScore >= 62;
  const isBigScreen = v.disp.size >= 6.7;
  const isHighScreenBody = screenToBodyRatio >= 0.89;
  const isSlimPhone = v.phoneT <= 8.1 && totalWeight <= 215;
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
    * virtualBench.benchmarkDemandMul
    * v.campaign.demand
    * (state.marketPick ? state.marketPick.demand : 1)
    * launchTrustFactor
    * (1 + extraDemandBoost)
    * pricingCredibilityMul
    / (v.region.comp / supplyStability);
  const onlineDemandTrack = onlineStructuralDemand * onlineDesignDemand;
  const offlineDemandTrack = offlineStructuralDemand * offlineDesignDemand;
  const baseDemand = demandScaleBase * (onlineDemandTrack * 0.56 + offlineDemandTrack * 0.44);

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
    displayCost,
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
    extraCost,
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
    memoryMarketFactor,
    noveltyScore: novelty.score,
    noveltyDemandMul: novelty.demandMul,
    noveltyTag: novelty.tag,
    noveltyWarning: novelty.warning,
    specSnapshot: currentSpecSnapshot
  };
}

function renderPreview() {
  const e = evaluateBuild();
  renderPhonePreview(e);
  renderPhoneFrontPreview(e);
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
    el.previewDetailBox.innerHTML = [
      `机型：<strong>${e.modelName || 'Neo Gen?'}</strong>｜定位：<strong>${e.strategy}</strong>`,
      `市场氛围：${state.marketPick ? state.marketPick.name : '常态竞争'}。${state.marketPick ? state.marketPick.text : ''}`,
      `区域画像：${regionNarrative(e.input.region)}`,
      `渠道建议：${channelNarrative(e.onlineShare)}`,
      `设计驱动：线上轨道 x${e.onlineDemandTrack.toFixed(2)}（设计适配 x${e.onlineDesignDemand.toFixed(2)}）｜线下轨道 x${e.offlineDemandTrack.toFixed(2)}（设计适配 x${e.offlineDesignDemand.toFixed(2)}）`,
      `${BENCHMARK_NAME}：综合 <strong>${e.virtualBench.total}</strong>｜SoC ${e.virtualBench.socLabScore}｜存储 ${e.virtualBench.storageLabScore}｜屏幕 ${e.virtualBench.displayLabScore}｜影像 ${e.virtualBench.cameraLabScore}｜续航 ${e.virtualBench.batteryLabScore}`,
      `基线对照：<strong>${BENCHMARK_BASELINE.name}</strong> = ${BENCHMARK_BASELINE.total}；当前为基线的 ${benchmarkRatioText(e.virtualBench.baselineRatio)}（${e.virtualBench.baselineTag}）`,
      `续航评测：约 <strong>${e.batteryEval.hours.toFixed(1)} 小时</strong>（${BATTERY_BASELINE.name}=100%，当前 ${Math.round(e.batteryEval.endurancePct)}%）｜${e.batteryEval.tag}`,
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
  const cams = [e.input.cams.main, e.input.cams.ultra, e.input.cams.tele, e.input.cams.front].filter((x) => x && x.id !== 'none');
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
  const size = Number(el.dispSize.value);
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
  const phoneH = Number(el.phoneH.value);
  const phoneW = Number(el.phoneW.value);
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
    e.input.startupDifficulty?.name || '真实'
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
    `${BENCHMARK_NAME} 热度：综合 <strong>${e.virtualBench.total}</strong>（约为 ${BENCHMARK_BASELINE.name} 的 ${benchmarkRatioText(e.virtualBench.baselineRatio)}，${e.virtualBench.baselineTag}）`,
    `续航基线：约 ${e.batteryEval.hours.toFixed(1)} 小时（${BATTERY_BASELINE.name}=100%，当前 ${Math.round(e.batteryEval.endurancePct)}%）`,
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
  const vendorName = input.disp && input.disp.vendor ? String(input.disp.vendor.name || '') : '';
  const bodyName = input.body ? String(input.body.name || '') : '';
  const displayMatName = input.disp && input.disp.mat ? String(input.disp.mat.name || '') : '';
  const socTier = input.soc ? String(input.soc.tier || '') : '';
  const isFlagshipSoc = socTier.includes('旗舰');

  const qualityPenalty = clamp((68 - qualityScore) / 2200, 0, 0.012);
  const vendorPenalty = vendorName.includes('低端') ? 0.007 : vendorName.includes('中端') ? 0.002 : 0;
  const bodyPenalty = bodyName.includes('工程塑料') ? 0.004 : 0;
  const extraPenalty = extrasCount > 3 ? Math.min(0.006, (extrasCount - 3) * 0.002) : 0;
  const thermalPenalty = (isFlagshipSoc && !hasVC) ? 0.0055 : 0;
  const displayPenalty = displayMatName === '折叠屏'
    ? 0.009
    : displayMatName === '墨水屏'
      ? 0.006
      : 0;
  const baseRate = 0.0025;

  const rate = clamp(
    baseRate + qualityPenalty + vendorPenalty + bodyPenalty + extraPenalty + thermalPenalty + displayPenalty,
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
      thermalPenalty,
      displayPenalty
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
  const noMain = cams.main && cams.main.id === 'none';
  const noUltra = cams.ultra && cams.ultra.id === 'none';
  const noTele = cams.tele && cams.tele.id === 'none';
  const noFront = cams.front && cams.front.id === 'none';
  if (!(noMain && noUltra && noTele && noFront)) return;
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
    'body', 'battery', 'procurementPlan', 'camMain', 'camUltra', 'camTele', 'camFront',
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
      ram: row.querySelector('.sku-ram')?.value || '8_lp5x',
      rom: row.querySelector('.sku-rom')?.value || '256_ufs31',
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
    if (node) node.value = value;
  });
  if (el.displayFeatures) {
    const checks = new Map((snapshot.displayChecks || []).map((x) => [x.value, x.checked]));
    [...el.displayFeatures.querySelectorAll('input[type="checkbox"]')].forEach((c) => {
      if (checks.has(c.value)) c.checked = Boolean(checks.get(c.value));
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
      : [{ ram: '8_lp5x', rom: '256_ufs31', priceAdj: '0', share: '100' }];
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
    const cheapestBody = getCheapestByCost(bodyOptions);
    const cheapestRam = getCheapestByCost(ramOptions);
    const cheapestRom = getCheapestByCost(romOptions);
    const planKeys = Object.keys(procurementPlans);
    if (!cheapestSoc || !cheapestBody || !cheapestRam || !cheapestRom || !planKeys.length) {
      state.minDesignLaunchCostCache = { key: cacheKey, cost: Number.POSITIVE_INFINITY };
      return Number.POSITIVE_INFINITY;
    }

    if (el.soc) el.soc.value = cheapestSoc.id;
    if (el.price) el.price.value = '999';
    if (el.dispMat) el.dispMat.value = 'lcd';
    if (el.dispVendor) el.dispVendor.value = 'low';
    if (el.dispSize) el.dispSize.value = '3.0';
    if (el.dispRatio) el.dispRatio.value = '18:9';
    if (el.dispForm) el.dispForm.value = 'symmetry';
    if (el.body) el.body.value = cheapestBody.id;
    if (el.battery) el.battery.value = '1500';
    if (el.camMain) el.camMain.value = 'none';
    if (el.camUltra) el.camUltra.value = 'none';
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

function applyRatingDeltaByDifficulty(delta, diffName) {
  if (diffName === '真实') {
    return delta >= 0 ? delta * 1.2 : delta * 0.72;
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
  }, 1000);
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
  if (!shouldShow) return;
  updateRunDockViewportAnchor();
  renderMobileRunDockInventory();
  renderMobileRunDockQuote();
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
  maybeRefreshTechComponentPool('time');
  maybeRefreshMemoryPools('time');
  maybeRefreshDisplayScoreProgress('time');
  maybeRefreshExtraCosts('time');
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
  state.shortEvents.push(noise.name);
  if (swan) state.shortEvents.push(`黑天鹅:${swan.name}`);
  if (opportunity) state.shortEvents.push(`机遇:${opportunity.name}`);
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
      * (diff.demandVolatilityMul || 1.0),
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
      + ((p.demandSlump || 0) * 0.18),
    0.03,
    0.85
  );
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
      demandShockMul = rnd(0, 0.18);
      if (Math.random() < 0.32) demandShockMul = 0;
      slumpDelta = rnd(0.2, 0.42);
    } else {
      demandShockMul = rnd(0.22, 0.72);
      slumpDelta = rnd(0.08, 0.22);
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
    if (Math.random() < reboundProb * (diff.reboundProbMul || 1.0)) {
      demandShockMul = rnd(1.02, 1.14);
    }
    slumpDelta = -Math.max(0.01, diff.slumpRecovery || 0.04);
  }
  p.demandSlump = clamp((p.demandSlump || 0) + slumpDelta, 0, 0.85);
  const slumpMul = clamp(1 - p.demandSlump, 0.08, 1.0);
  const onlinePulse = clamp((0.9 + p.onlineShare * 0.28 + (p.geekAttraction / 100) * 0.12) * oppOnlineMul, 0.88, 1.45);
  const stockoutDecay = clamp(1 - (p.stockoutStress || 0) * 0.28 - p.idleNoStockMonths * 0.06, 0.32, 1.02);
  const remainingMarket = Math.max(0, p.marketCapacity - p.marketConsumed);
  const saturationFactor = clamp(remainingMarket / Math.max(1, p.marketCapacity), 0.16, 1.0);
  const isRealFirstGenFirstMonth = diff.name === '真实' && Number(p.modelGeneration || 1) === 1 && state.month === 1;
  const coldStartMul = isRealFirstGenFirstMonth
    ? clamp(
      0.78
        + Math.max(0, (state.rating - 50) / 520)
        + Math.max(0, ((p.qualityScore || 60) - 60) / 620),
      0.78,
      0.9
    )
    : 1.0;
  const demandRaw = p.baseDemand * life * brandRamp * reputation * randomness * noise.demand * swanDemandMul * oppDemandMul * demandShockMul * slumpMul * onlinePulse * stockoutDecay * saturationFactor * coldStartMul;
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
    const lower = Math.max(0, lastDemand - 1000);
    const upper = lastDemand + 1000;
    demandTarget = clamp(trendCandidate, lower, upper);
  } else {
    p.demandMomentum = 0;
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
    p.input.startupDifficulty?.name || '真实'
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
  if (demandTarget < 10) {
    finishProductPhase(`市场需求量降至 ${demandTarget} 台（低于 10），产品生命周期结束。`);
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
  state.lastTechRefreshMonth = 0;
  state.lastTechRefreshGeneration = 1;
  state.lastMemoryRefreshMonth = 0;
  state.lastMemoryRefreshGeneration = 1;
  state.lastDisplayRefreshMonth = 0;
  state.lastDisplayRefreshGeneration = 1;
  state.lastExtraRefreshMonth = 0;
  state.lastExtraRefreshGeneration = 1;
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
  state.smallScreenAchievedNotified = false;
  state.flatBackAchievedNotified = false;
  state.largeScreenAchievedNotified = false;
  state.goodLuckAchievedNotified = false;
  state.noRefreshAchievedNotified = false;
  state.squeezeToothpasteAchievedNotified = false;
  state.brandToneAchievedNotified = false;
  state.achievements = [];
  state.socPriceCapEnded = false;
  state.premiumPriceToleranceCarry = 1.0;
  state.premiumOnlineDemandCarry = 1.0;
  state.premiumOfflineDemandCarry = 1.0;

  el.reportBox.innerHTML = '等待月报。';
  renderRunBrief('本月重点：等待推进月份。');
  el.finalBox.innerHTML = '结算后显示最终表现。';
  el.previewBox.innerHTML = '等待计算。';
  if (el.previewDetailBox) el.previewDetailBox.innerHTML = '详细评估：等待计算。';
  clearPhonePreview();
  el.eventHint.textContent = '请选择 1 个，它将影响整局。';
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
    updateDesignRestartButtonState();
    checkDesignDeadEndByCash();
  } catch (err) {
    const detail = err && err.message ? `（${String(err.message)}）` : '';
    const msg = `<span class="bad">自动评估失败，请调整一个配置后重试。${detail}</span>`;
    el.previewBox.innerHTML = msg;
    if (el.previewDetailBox) el.previewDetailBox.innerHTML = msg;
    if (el.restartDesign) el.restartDesign.classList.remove('restart-alert');
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
  ensureInventoryUiSyncTimer();
  renderAchievementPanel();
  refreshOverlayLockState();
  refreshBackColorControl();
  refreshFrontFrameColorControl();
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
    el.eventHint.textContent = `已选环境：${state.marketPick.name}`;
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
      maybeRefreshTechComponentPool('generation');
      maybeRefreshMemoryPools('generation');
      maybeRefreshDisplayScoreProgress('generation');
      maybeRefreshExtraCosts('generation');
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
      addSkuRow({ ram: '12_lp5x', rom: '256_ufs31', priceAdj: 300, share: 0 });
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
      const flash = target instanceof HTMLElement && target.classList.contains('sku-share');
      updateSkuShareValidation(Boolean(flash));
      refreshDesignPanelsLive();
    });
    el.skuList.addEventListener('change', (evt) => {
      const target = evt.target;
      const flash = target instanceof HTMLElement && target.classList.contains('sku-share');
      updateSkuShareValidation(Boolean(flash));
      refreshDesignPanelsLive();
    });
  }
  window.addEventListener('resize', () => {
    renderOpsChart();
    updateRunDockViewportAnchor();
    refreshMobileRunDock();
    refreshDesignPanelsLive();
  });
  window.addEventListener('scroll', () => {
    updateRunDockViewportAnchor();
    refreshMobileRunDock();
  }, { passive: true });
  window.addEventListener('orientationchange', () => {
    updateRunDockViewportAnchor();
    refreshMobileRunDock();
  });
  if (window.visualViewport) {
    const handleVisualViewportChange = () => {
      updateRunDockViewportAnchor();
      refreshMobileRunDock();
    };
    window.visualViewport.addEventListener('resize', handleVisualViewportChange);
    window.visualViewport.addEventListener('scroll', handleVisualViewportChange);
  }

  [
    el.soc, el.price, el.dispMat, el.dispVendor, el.dispSize, el.dispRatio, el.dispForm,
    el.body, el.battery, el.backColor, el.frontFrameColor, el.procurementPlan, el.camMain, el.camUltra, el.camTele, el.camFront,
    el.marketingFocus, el.campaignLevel, el.units, el.phoneH, el.phoneW, el.phoneT
  ].forEach((node) => {
    if (!node) return;
    node.addEventListener('input', refreshDesignPanelsLive);
    node.addEventListener('change', refreshDesignPanelsLive);
  });
  if (el.displayFeatures) el.displayFeatures.addEventListener('change', refreshDesignPanelsLive);
  if (el.extras) el.extras.addEventListener('change', refreshDesignPanelsLive);
  if (el.startupDifficulty) {
    el.startupDifficulty.addEventListener('change', updateStartupDifficultyStyle);
  }
  if (el.phoneRenderCanvas) {
    el.phoneRenderCanvas.addEventListener('click', () => openPreviewLightbox(el.phoneRenderCanvas, '背面 45° 放大预览'));
  }
  if (el.phoneFrontCanvas) {
    el.phoneFrontCanvas.addEventListener('click', () => openPreviewLightbox(el.phoneFrontCanvas, '正面屏幕 放大预览'));
  }
  if (el.opsChart) {
    el.opsChart.addEventListener('click', openOpsChartFullView);
  }
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
      const actionEl = evt.target instanceof Element ? evt.target.closest('[data-action="open-rule-detail"]') : null;
      if (actionEl) {
        openGameModal('详细机制说明', DETAILED_MECHANICS_HTML);
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
  } catch (err) {
    reportRuntimeError('boot', err);
    const msg = err && err.message ? String(err.message) : '未知错误';
    setBootLoading(`加载失败：${msg}。请点击“刷新重试”。`, true, 0, totalSteps);
  }
}

boot();
