const RMB = (v) => `¥${Math.round(v).toLocaleString('zh-CN')}`;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rnd = (a, b) => Math.random() * (b - a) + a;
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
  { id: 'g81', name: 'MedaTek Helioo G81X', tier: '入门', score: 28, cost: 95, risk: 0.82 },
  { id: 't7225', name: 'UniSil T7225', tier: '入门', score: 30, cost: 108, risk: 0.84 },
  { id: 'dim6300', name: 'MedaTek DimeCity 6300', tier: '中低端', score: 42, cost: 180, risk: 0.9 },
  { id: 's6g4', name: 'SnapDrake 6 Gen4', tier: '中端', score: 50, cost: 260, risk: 0.95 },
  { id: 'dim7300', name: 'MedaTek DimeCity 7300', tier: '中端', score: 58, cost: 340, risk: 1.0 },
  { id: 's7sg3', name: 'SnapDrake 7s Gen3', tier: '中高端', score: 65, cost: 430, risk: 1.03 },
  { id: 'dim8400', name: 'MedaTek DimeCity 8400', tier: '次旗舰', score: 78, cost: 620, risk: 1.1 },
  { id: 's8sg4', name: 'SnapDrake 8s Gen4', tier: '次旗舰', score: 83, cost: 760, risk: 1.14 },
  { id: 's8elite', name: 'SnapDrake 8 El1te', tier: '旗舰', score: 92, cost: 1080, risk: 1.24 },
  { id: 's8eliteg5', name: 'SnapDrake 8 El1te Gen5', tier: '旗舰+', score: 98, cost: 1380, risk: 1.35 }
];

const displayMaterials = {
  lcd: { name: 'LCD', baseCost: 160, baseWeight: 31, score: 55, powerPenalty: 5 },
  oled: { name: 'OLED', baseCost: 260, baseWeight: 24, score: 72, powerPenalty: 2 },
  dual_oled: { name: '双层 OLED', baseCost: 560, baseWeight: 27, score: 88, powerPenalty: 0 },
  eink: { name: '墨水屏', baseCost: 210, baseWeight: 18, score: 40, powerPenalty: -8 },
  foldable: { name: '折叠屏', baseCost: 980, baseWeight: 42, score: 94, powerPenalty: 4 }
};

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
  { id: 'jn1_50', name: 'ISO-CELL JN1 50MP 模组', cost: 58, weight: 7.2, score: 20, type: 'normal', volume: 1.6 },
  { id: 'ov50h', name: 'OV5OH 50MP 大底主摄', cost: 105, weight: 12, score: 33, type: 'main', volume: 2.8 },
  { id: 'hp2_200', name: 'ISO-CELL HP2 200MP 旗舰主摄', cost: 210, weight: 18, score: 48, type: 'main', volume: 4.2 },
  { id: 'lyt900', name: '1英寸 LYT-9OO 旗舰主摄', cost: 238, weight: 21, score: 53, type: 'main', volume: 5.0 },
  { id: 'uw_50', name: '50MP 超广角模组', cost: 66, weight: 8, score: 20, type: 'ultra', volume: 1.8 },
  { id: 'tele_50p', name: '50MP 潜望长焦模组', cost: 132, weight: 15, score: 34, type: 'tele', volume: 3.8 },
  { id: 'front_32', name: '32MP 前摄模组', cost: 36, weight: 4.8, score: 10, type: 'front', volume: 0.7 }
];

const extras = [
  { id: 'stereo', name: '低音增强立体声单元', cost: 28, weight: 8, space: 2.8, score: 4, demand: 0.02 },
  { id: 'usb3', name: 'USB 3.x 高速接口', cost: 15, weight: 1, space: 0.6, score: 3, demand: 0.01 },
  { id: 'gps_dual', name: '双频 GPS', cost: 12, weight: 0.5, space: 0.2, score: 2, demand: 0.005 },
  { id: 'flat_back', name: '纯平背板', cost: 22, weight: 2.5, space: 1.1, score: 5, demand: 0.018 },
  { id: 'magsafe', name: '磁吸生态配件', cost: 25, weight: 4, space: 1.2, score: 3, demand: 0.012 },
  { id: 'fast120', name: '120W 超级快充', cost: 55, weight: 6, space: 2.0, score: 6, demand: 0.02 },
  { id: 'vc', name: '大面积 VC 散热', cost: 35, weight: 8, space: 5.5, score: 4, demand: 0.015 },
  { id: 'satellite', name: '卫星 SOS 通信', cost: 40, weight: 2, space: 1.0, score: 4, demand: 0.007 }
];

const chinaRegions = {
  east_core: {
    name: '华东核心（沪苏浙）',
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
    name: '华北核心（京津冀）',
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
    name: '华南沿海（粤闽琼）',
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
    name: '中部（鄂湘赣豫皖）',
    demand: 1.06,
    comp: 1.04,
    tolerance: 0.98,
    logistics: 0.98,
    labor: 0.93,
    rent: 0.88,
    onlineInfra: 0.98,
    offlineInfra: 1.01,
    supplyEco: 0.95,
    rdTalent: 0.94,
    profile: '走量潜力大，对配置与价格平衡敏感'
  },
  southwest: {
    name: '西南（川渝云贵）',
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
    name: '西北（陕甘青宁）',
    demand: 0.9,
    comp: 0.92,
    tolerance: 0.9,
    logistics: 1.08,
    labor: 0.88,
    rent: 0.8,
    onlineInfra: 0.9,
    offlineInfra: 0.92,
    supplyEco: 0.86,
    rdTalent: 0.88,
    profile: '市场分散，渠道覆盖与售后半径挑战更大'
  },
  northeast: {
    name: '东北（辽吉黑）',
    demand: 0.88,
    comp: 0.9,
    tolerance: 0.9,
    logistics: 1.05,
    labor: 0.91,
    rent: 0.82,
    onlineInfra: 0.93,
    offlineInfra: 0.95,
    supplyEco: 0.9,
    rdTalent: 0.9,
    profile: '换机节奏偏稳，价格敏感度较高'
  },
  xinjiang_tibet: {
    name: '新疆 + 西藏',
    demand: 0.74,
    comp: 0.78,
    tolerance: 0.86,
    logistics: 1.24,
    labor: 0.95,
    rent: 0.76,
    onlineInfra: 0.82,
    offlineInfra: 0.84,
    supplyEco: 0.76,
    rdTalent: 0.8,
    profile: '边远市场，物流与备件成本高'
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
    baseDemand: 0.78,
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
  { region: 'central', province: '湖北', pop: 58.3, online: 0.76 },
  { region: 'central', province: '湖南', pop: 66.0, online: 0.74 },
  { region: 'central', province: '江西', pop: 45.2, online: 0.73 },
  { region: 'central', province: '河南', pop: 98.7, online: 0.72 },
  { region: 'central', province: '安徽', pop: 61.3, online: 0.73 },
  { region: 'southwest', province: '四川', pop: 83.7, online: 0.72 },
  { region: 'southwest', province: '重庆', pop: 32.1, online: 0.78 },
  { region: 'southwest', province: '云南', pop: 46.9, online: 0.68 },
  { region: 'southwest', province: '贵州', pop: 38.6, online: 0.67 },
  { region: 'northwest', province: '陕西', pop: 39.5, online: 0.74 },
  { region: 'northwest', province: '甘肃', pop: 24.9, online: 0.65 },
  { region: 'northwest', province: '青海', pop: 5.9, online: 0.64 },
  { region: 'northwest', province: '宁夏', pop: 7.2, online: 0.7 },
  { region: 'northeast', province: '辽宁', pop: 42.6, online: 0.73 },
  { region: 'northeast', province: '吉林', pop: 23.5, online: 0.7 },
  { region: 'northeast', province: '黑龙江', pop: 31.8, online: 0.69 },
  { region: 'xinjiang_tibet', province: '新疆', pop: 25.9, online: 0.63 },
  { region: 'xinjiang_tibet', province: '西藏', pop: 3.6, online: 0.54 },
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
  companyName: '',
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
  premiumPriceToleranceCarry: 1.0,
  premiumOnlineDemandCarry: 1.0,
  premiumOfflineDemandCarry: 1.0
};

const el = {
  cash: document.getElementById('cash'),
  inv: document.getElementById('inv'),
  rating: document.getElementById('rating'),
  month: document.getElementById('month'),
  stepEvt: document.getElementById('stepEvt'),
  stepCfg: document.getElementById('stepCfg'),
  stepRun: document.getElementById('stepRun'),
  stageEvent: document.getElementById('stageEvent'),
  stageConfig: document.getElementById('stageConfig'),
  stageRun: document.getElementById('stageRun'),
  rollEvents: document.getElementById('rollEvents'),
  eventCards: document.getElementById('eventCards'),
  eventHint: document.getElementById('eventHint'),
  confirmEvent: document.getElementById('confirmEvent'),
  companyNameHint: document.getElementById('companyNameHint'),
  companyName: document.getElementById('companyName'),
  soc: document.getElementById('soc'),
  region: document.getElementById('region'),
  modelBaseName: document.getElementById('modelBaseName'),
  modelNameHint: document.getElementById('modelNameHint'),
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
  addSku: document.getElementById('addSku'),
  body: document.getElementById('body'),
  battery: document.getElementById('battery'),
  procurementPlan: document.getElementById('procurementPlan'),
  camMain: document.getElementById('camMain'),
  camUltra: document.getElementById('camUltra'),
  camTele: document.getElementById('camTele'),
  camFront: document.getElementById('camFront'),
  extras: document.getElementById('extras'),
  marketingFocus: document.getElementById('marketingFocus'),
  campaignLevel: document.getElementById('campaignLevel'),
  units: document.getElementById('units'),
  phoneH: document.getElementById('phoneH'),
  phoneW: document.getElementById('phoneW'),
  phoneT: document.getElementById('phoneT'),
  preview: document.getElementById('preview'),
  launch: document.getElementById('launch'),
  previewBox: document.getElementById('previewBox'),
  displayQuickBox: document.getElementById('displayQuickBox'),
  nextMonth: document.getElementById('nextMonth'),
  restock: document.getElementById('restock'),
  takeLoan: document.getElementById('takeLoan'),
  declineLoan: document.getElementById('declineLoan'),
  continueNext: document.getElementById('continueNext'),
  restockSku: document.getElementById('restockSku'),
  restockUnits: document.getElementById('restockUnits'),
  stop: document.getElementById('stop'),
  endCompany: document.getElementById('endCompany'),
  restart: document.getElementById('restart'),
  marketBox: document.getElementById('marketBox'),
  reportBox: document.getElementById('reportBox'),
  finalBox: document.getElementById('finalBox'),
  sourceNote: document.getElementById('sourceNote'),
  opsChart: document.getElementById('opsChart')
};

function shortNum(v) {
  const n = Number(v) || 0;
  if (Math.abs(n) >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${Math.round(n)}`;
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

function renderOpsChart() {
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
  ctx.clearRect(0, 0, cw, ch);

  const pad = { l: 42, r: 14, t: 24, b: 24 };
  const plotW = Math.max(10, cw - pad.l - pad.r);
  const plotH = Math.max(10, ch - pad.t - pad.b);

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

  const points = state.timeline.length ? state.timeline : [{
    m: 0,
    cash: state.cash,
    inv: computeTotalInventory(),
    sold: state.companySoldTotal,
    rating: state.rating
  }];
  const months = points.map((p) => p.m);
  const minM = Math.min(...months);
  const maxM = Math.max(...months);
  const mSpan = Math.max(1, maxM - minM);
  const xAt = (m) => pad.l + ((m - minM) / mSpan) * plotW;

  const series = [
    { key: 'cash', label: '现金', color: '#6ee7ff' },
    { key: 'inv', label: '库存', color: '#ffb37a' },
    { key: 'sold', label: '累计销量', color: '#8ee39d' },
    { key: 'rating', label: '口碑', color: '#f8a5ff' }
  ];
  series.forEach((s, i) => {
    const vals = points.map((p) => Number(p[s.key] || 0));
    let minV = Math.min(...vals);
    let maxV = Math.max(...vals);
    if (Math.abs(maxV - minV) < 1e-6) {
      minV -= 1;
      maxV += 1;
    }
    const yAt = (v) => pad.t + (1 - (v - minV) / (maxV - minV)) * plotH;
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((p, idx) => {
      const x = xAt(p.m);
      const y = yAt(Number(p[s.key] || 0));
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    const latest = vals[vals.length - 1];
    ctx.fillStyle = s.color;
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText(`${s.label}:${shortNum(latest)}`, pad.l + i * 118, 14);
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
  ctx.fillText(`月 ${maxM}`, cw - pad.r - 44, ch - 8);
}

function updateHeader() {
  pushTimelinePoint();
  syncInventoryTotal();
  el.cash.textContent = RMB(state.cash);
  el.inv.textContent = state.inventory.toLocaleString('zh-CN');
  el.rating.textContent = Math.round(state.rating).toString();
  el.month.textContent = String(state.month);
  renderOpsChart();
}

function setStep(step) {
  const c1 = step === 1;
  const c2 = step === 2;
  const c3 = step === 3;
  el.stageEvent.classList.toggle('hidden', !c1);
  el.stageConfig.classList.toggle('hidden', !c2);
  el.stageRun.classList.toggle('hidden', !c3);
  el.stepEvt.classList.toggle('active', c1);
  el.stepCfg.classList.toggle('active', c2);
  el.stepRun.classList.toggle('active', c3);
}

function computeTotalInventory() {
  return Object.values(state.inventoryBySku || {}).reduce((s, n) => s + (Number(n) || 0), 0);
}

function syncInventoryTotal() {
  state.inventory = computeTotalInventory();
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

function refreshSkuButtons() {
  if (!el.skuList) return;
  const rows = [...el.skuList.querySelectorAll('.sku-row')];
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
  });
  if (el.addSku) {
    el.addSku.disabled = rows.length >= MAX_SKU_COUNT;
  }
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
  el.soc.innerHTML = socs
    .map((s, idx) => `<option value="${s.id}" ${idx === 4 ? 'selected' : ''}>${s.name}（${s.tier}，估价 ${RMB(s.cost)}）</option>`)
    .join('');
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

  const cameraOpt = cameraModules.map((x) => `<option value="${x.id}">${x.name}${x.cost ? `（${RMB(x.cost)}）` : ''}</option>`).join('');
  el.camMain.innerHTML = cameraOpt;
  el.camUltra.innerHTML = cameraOpt;
  el.camTele.innerHTML = cameraOpt;
  el.camFront.innerHTML = cameraOpt;
  el.camMain.value = 'ov50h';
  el.camUltra.value = 'uw_50';
  el.camTele.value = 'none';
  el.camFront.value = 'front_32';

  el.extras.innerHTML = extras.map((x, idx) => `
    <label><input type="checkbox" value="${x.id}" /> ${x.name}（+${RMB(x.cost)}，+${x.weight}g）</label>
  `).join('');

  el.marketingFocus.innerHTML = Object.entries(marketingProfiles)
    .map(([key, m]) => `<option value="${key}">${m.name}</option>`)
    .join('');
  el.campaignLevel.innerHTML = Object.entries(campaignLevels)
    .map(([key, c]) => `<option value="${key}">${c.name}（首发 ${RMB(c.launchCost)}）</option>`)
    .join('');
  el.marketingFocus.value = 'balanced';
  el.campaignLevel.value = 'medium';
  if (el.modelBaseName) el.modelBaseName.value = 'Neo';
  updateModelNameHint();
}

function rollThreeMarkets() {
  const pool = [...marketArchetypes].sort(() => Math.random() - 0.5).slice(0, 3);
  state.marketPool = pool;
  state.marketPick = null;
  updateEventGateState();
  el.eventCards.innerHTML = pool.map((m, i) => `
    <article class="card" data-idx="${i}">
      <h4>${m.name}</h4>
      <p>${m.text}</p>
      <p>需求系数 ${m.demand.toFixed(2)} / 成本系数 ${m.cost.toFixed(2)} / 口碑偏移 ${m.rating > 0 ? '+' : ''}${m.rating}</p>
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

function updateEventGateState() {
  const nameCheck = validateCompanyName(el.companyName ? el.companyName.value : '');
  const hasMarket = Boolean(state.marketPick);
  const hasRegion = Boolean(el.region && el.region.value && chinaRegions[el.region.value]);
  const ready = hasMarket && hasRegion && nameCheck.ok;
  el.confirmEvent.disabled = !ready;

  if (!hasMarket) {
    el.eventHint.textContent = '请选择 1 个市场环境。';
    return;
  }
  if (!hasRegion) {
    el.eventHint.textContent = '请选择企业成立区域。';
    return;
  }
  if (!nameCheck.ok) {
    el.eventHint.textContent = nameCheck.msg;
    if (el.companyNameHint) {
      if (nameCheck.name.length > 0) {
        el.companyNameHint.className = 'bad';
        el.companyNameHint.textContent = `命名校验：${nameCheck.msg}`;
      } else {
        el.companyNameHint.className = 'muted';
        el.companyNameHint.textContent = '企业名称需为 2~24 个字符，仅支持中文和英文字母，且不得包含违禁词或主流品牌名。';
      }
    }
    return;
  }

  if (el.companyNameHint) {
    el.companyNameHint.className = 'good';
    el.companyNameHint.textContent = `命名校验通过：${nameCheck.name}`;
  }
  el.eventHint.textContent = `已选：${state.marketPick.name}；企业：${nameCheck.name}；成立区域：${chinaRegions[el.region.value].name}`;
}

function selectedValues() {
  const soc = socs.find((x) => x.id === el.soc.value);
  const body = bodyOptions.find((x) => x.id === el.body.value);
  const region = chinaRegions[el.region.value];
  const marketStats = getRegionMarketStats(el.region.value);
  const procurement = procurementPlans[el.procurementPlan.value];
  const marketing = marketingProfiles[el.marketingFocus.value];
  const campaign = campaignLevels[el.campaignLevel.value];
  const startupDifficulty = startupDifficulties[el.startupDifficulty.value] || startupDifficulties.real;

  const disp = {
    mat: displayMaterials[el.dispMat.value],
    vendor: displayVendors[el.dispVendor.value],
    form: displayForms[el.dispForm.value],
    size: Number(el.dispSize.value),
    ratio: el.dispRatio.value,
    features: [...el.displayFeatures.querySelectorAll('input:checked')].map((i) => displayFeatureMap[i.value])
  };

  const cams = {
    main: cameraModules.find((x) => x.id === el.camMain.value),
    ultra: cameraModules.find((x) => x.id === el.camUltra.value),
    tele: cameraModules.find((x) => x.id === el.camTele.value),
    front: cameraModules.find((x) => x.id === el.camFront.value)
  };

  const chosenExtras = [...el.extras.querySelectorAll('input:checked')]
    .map((i) => extras.find((x) => x.id === i.value));

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
    modelBaseName: (el.modelBaseName ? el.modelBaseName.value : '').trim(),
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

function evaluateBuild() {
  const v = selectedValues();
  const issues = [];
  const modelNameCheck = validateModelName(v.modelBaseName);

  if (!state.marketPick) issues.push('请先在第一层选择市场环境。');
  if (!v.soc || !v.body) issues.push('配置项不完整。');
  if (!modelNameCheck.ok) issues.push(modelNameCheck.msg);
  if (v.disp.size < 3.0 || v.disp.size > 9.0) issues.push('屏幕尺寸需在 3.0~9.0 英寸。');
  if (el.dispMat.value === 'foldable' && !isFoldableUnlocked()) issues.push('折叠屏需在进入第二代产品后解锁。');
  if (v.price < 999 || v.price > 19999) issues.push('定价需在 999~19999。');
  if (v.units < 1000 || v.units > 150000) issues.push('首批产量需在 1000~150000。');
  if (v.battery < 3000 || v.battery > 10000) issues.push('电池容量需在 3000~10000mAh。');

  if (v.phoneH < 80 || v.phoneH > 260) issues.push('机身高度需在 80~260mm。');
  if (v.phoneW < 35 || v.phoneW > 180) issues.push('机身宽度需在 35~180mm。');
  if (v.phoneT < 6.5 || v.phoneT > 14) issues.push('机身厚度需在 6.5~14.0mm。');

  if (!v.skuPlans.length) {
    issues.push('至少配置 1 个 SKU 且首发配比大于 0%。');
  }
  const skuShareSum = v.skuPlans.reduce((s, x) => s + x.share, 0);
  if (Math.round(skuShareSum) !== 100) {
    issues.push(`SKU 首发配比总和需为 100%，当前为 ${skuShareSum.toFixed(0)}%。`);
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
  const displayScore = v.disp.mat.score + v.disp.vendor.scoreAdj + featureScore + v.disp.form.score + bezelScoreAdj;

  if (v.disp.features.some((x) => x.name === 'LTPO') && ['lcd', 'eink'].includes(el.dispMat.value)) {
    issues.push('LTPO 仅适用于 OLED/双层 OLED。');
  }

  const screenMm = getScreenDimensionsMm(v.disp.size, v.disp.ratio);
  const maxScreenW = v.phoneW - 2 * bezel.sideBezel;
  const maxScreenH = v.phoneH - (bezel.topBezel + bezel.bottomBezel);
  if (screenMm.widthMm > maxScreenW || screenMm.heightMm > maxScreenH) {
    issues.push(`屏幕可视区约 ${screenMm.widthMm.toFixed(1)}x${screenMm.heightMm.toFixed(1)}mm，已超过当前机身可容纳正面开口（约 ${maxScreenW.toFixed(1)}x${maxScreenH.toFixed(1)}mm）。`);
  }

  const camList = [v.cams.main, v.cams.ultra, v.cams.tele, v.cams.front].filter((x) => x.id !== 'none');
  if (v.cams.main.id === 'none') issues.push('主摄不能为“无”。');
  if (v.disp.form === displayForms.udc && v.cams.front.id === 'none') issues.push('屏下前摄形态需要至少选择一个前摄模组。');
  if (v.disp.form !== displayForms.udc && v.cams.front.id !== 'none' && v.cams.front.volume > 0.9 && v.disp.form.name.includes('刘海')) {
    issues.push('大尺寸前摄模组与刘海方案冲突风险较高，建议改为挖孔/药丸或降低前摄规格。');
  }

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
  if (hasFlatBack && cameraVolume > 6.0 && v.phoneT < 9.5) {
    issues.push('纯平背板与当前大体积相机组合冲突，建议增厚机身或降低相机规格。');
  }

  if (v.chosenExtras.some((x) => x.id === 'fast120') && v.battery < 4200) {
    issues.push('120W 快充通常需要更高规格电池，建议电池至少 4200mAh。');
  }

  const batteryWh = v.battery * 3.85 / 1000;
  const effectiveEnergyDensity = 640;
  const batteryVolume = batteryWh / effectiveEnergyDensity * 1000;
  const batteryWeight = v.battery * 0.011 + 6;
  const batteryCost = v.battery * 0.048 + 35;
  const extVolume = (v.phoneH * v.phoneW * v.phoneT) / 1000;
  const internalRatio = clamp(0.56 - (v.phoneT < 7.6 ? 0.06 : 0) + (v.phoneT > 9.5 ? 0.03 : 0), 0.47, 0.62);
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
  const displayThickness = ({ lcd: 1.2, oled: 0.95, dual_oled: 1.3, eink: 1.45, foldable: 1.7 })[el.dispMat.value] || 1.0;
  const displayVolume = displayAreaCm2 * displayThickness / 10;
  const avgRamScore = v.skuPlans.length ? v.skuPlans.reduce((s, x) => s + x.ram.score * (x.share / 100), 0) : 0;
  const avgRomScore = v.skuPlans.length ? v.skuPlans.reduce((s, x) => s + x.rom.score * (x.share / 100), 0) : 0;
  const boardVolume = 8.6 + (v.soc.risk * 1.6) + (avgRamScore + avgRomScore) * 0.06;
  const mandatoryBaseVolume = 7.8;
  const occupiedVolume = batteryVolume + cameraVolume + displayVolume + boardVolume + mandatoryBaseVolume + v.body.structVolume + extraSpace;
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

  const procurementUpfront = v.procurement.upfront * clamp(1.06 - (v.region.supplyEco - 1) * 0.55, 0.84, 1.15);
  const supplyStability = clamp(v.procurement.supply * v.region.supplyEco, 0.82, 1.25);
  const contractCoverageUnits = v.procurement.coverageMultiplier > 0
    ? Math.ceil(v.units * v.procurement.coverageMultiplier)
    : 0;

  const complexity = (v.soc.risk + camList.length * 0.08 + v.chosenExtras.length * 0.05 + (displayScore > 85 ? 0.08 : 0));
  const rdCostFactor = clamp(1.12 - (v.region.rdTalent - 1) * 0.58, 0.86, 1.18);
  const rndCost = (1_050_000 * complexity + (displayCost + cameraCost) * 400) * rdCostFactor;
  const firstBatchCost = unitCost * v.units;
  const initialCost = rndCost + firstBatchCost + procurementUpfront + v.campaign.launchCost;

  const boardWeight = 68;
  const totalWeight = boardWeight + displayWeight + v.body.weight + batteryWeight + cameraWeight + extraWeight;

  const qualityScore = clamp(
    0.34 * v.soc.score
      + 0.18 * displayScore
      + 0.14 * (avgRamScore + avgRomScore)
      + 0.2 * cameraScore
      + 0.07 * v.body.score
      + 0.07 * extraScore
      + (v.battery >= 5000 ? 4 : -1)
      + (v.region.rdTalent - 1) * 8.5,
    15,
    100
  );

  const geekExtras = new Set(['usb3', 'vc', 'satellite', 'fast120', 'magsafe']);
  const geekBonus = v.chosenExtras.reduce((s, x) => s + (geekExtras.has(x.id) ? 1 : 0), 0) * 2.2;
  const hasFlagshipSoc = v.soc.tier.includes('旗舰');
  const isUltraFlagshipSoc = v.soc.tier.includes('旗舰+');
  const hasOneInchMain = ['lyt900'].includes(v.cams.main.id);
  const hasLargeMain = ['ov50h', 'hp2_200', 'lyt900'].includes(v.cams.main.id);
  const hasCameraMatrix = v.cams.main.id !== 'none' && v.cams.ultra.id !== 'none' && v.cams.tele.id !== 'none';
  const hasUsb3 = v.chosenExtras.some((x) => x.id === 'usb3');
  const hasVC = v.chosenExtras.some((x) => x.id === 'vc');
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
    + (isUltraFlagshipSoc ? 12 : hasFlagshipSoc ? 8 : 0);
  const geekAttraction = clamp(
    v.soc.score * 0.4 + cameraScore * 0.24 + (featureScore + v.disp.form.score) * 0.32 + geekBonus + geekSpecialBonus,
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
    + (v.chosenExtras.some((x) => x.id === 'gps_dual') ? 2 : 0);
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
  const onlinePotential = clamp(onlinePotentialRaw * foldableOnlineBoost * premiumOnlineDemandCarry, 0.72, 2.2);
  const offlinePotential = clamp(offlinePotentialRaw * foldableOfflineBoost * premiumOfflineDemandCarry, 0.75, 2.25);
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
  const designDemandElasticity = clamp(
    Math.pow(clamp(qualityScore / 72, 0.45, 1.5), 1.35)
      * Math.pow(clamp(priceFit, 0.45, 1.5), 1.55)
      * Math.pow(clamp(appearanceDemandFactor * ratioDemandFactor * bezelDemandFactor, 0.45, 1.3), 1.2)
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

  const baseDemand = 4_600 * v.startupDifficulty.baseDemand
    * v.region.demand
    * popFactor
    * channelFactor
    * designDemandElasticity
    * v.campaign.demand
    * (state.marketPick ? state.marketPick.demand : 1)
    * launchTrustFactor
    * (1 + extraDemandBoost)
    / (v.region.comp / supplyStability);

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
    supplyStability,
    contractCoverageUnits,
    totalWeight,
    qualityScore,
    geekAttraction,
    onlineShare,
    offlineShare,
    appearanceRetailBoost,
    offlinePreferenceBoost,
    avgMemScore: avgRamScore + avgRomScore,
    onlineCostIndex,
    offlineCostIndex,
    channelFactor,
    popFactor,
    designDemandElasticity,
    launchTrustFactor,
    baseDemand,
    grossMargin,
    strategy,
    priceFit,
    memoryMarketFactor
  };
}

function renderPreview() {
  const e = evaluateBuild();
  if (e.issues.length) {
    el.previewBox.innerHTML = `<span class="bad">${e.issues.join('<br>')}</span>`;
    return;
  }

  const marginCls = e.grossMargin >= 0 ? 'good' : 'bad';
  const volumeOk = e.remainingVolume >= 0;
  const launchRatingFromQuality = (e.qualityScore - 55) * 0.08;
  const launchRatingDeltaEst = (state.marketPick ? state.marketPick.rating : 0) + e.input.campaign.rating + launchRatingFromQuality;
  const launchStockTension = clamp((Math.round(e.baseDemand) - e.input.units) / Math.max(1, Math.round(e.baseDemand)), -0.6, 0.95);
  const returnProfile = calcQualityReturnProfile(e);
  const reputationHints = [];
  if (e.qualityScore < 70) reputationHints.push('提升产品力评分（优先 SoC/屏幕/主摄），可抬高“品质漂移”项。');
  if (launchStockTension > 0.12) reputationHints.push('首批量偏低，缺货率可能抬升并拖累口碑；建议增加首批或提前补货。');
  if (e.grossMargin < 0.08) reputationHints.push('毛利过薄会限制营销和售后投入，长期口碑维护难度上升。');
  if (!e.input.disp.features.some((x) => x.name === '护眼认证')) reputationHints.push('线下用户更看重护眼认证，补上可改善线下反馈。');
  if (e.input.marketing.name.includes('直播')) reputationHints.push('直播冲量能提销量，但需关注售后争议事件对口碑的放大。');
  if (!reputationHints.length) reputationHints.push('当前口碑路径较健康：保持供货稳定并规避黑天鹅即可稳步上行。');

  el.previewBox.innerHTML = [  
    `策略：<strong>${e.strategy}</strong>，市场环境：<strong>${state.marketPick.name}</strong>`,
    `机型命名：<strong>${e.modelName || '未通过命名校验'}</strong>`,
    `启动难度：<strong>${e.input.startupDifficulty.name}</strong>`,
    `中国区域：<strong>${e.input.region.name}</strong>（${e.input.region.profile}）`,
    `区域能力画像：供应链生态 ${e.input.region.supplyEco.toFixed(2)} / 研发人才 ${e.input.region.rdTalent.toFixed(2)} / 线上基础设施 ${e.input.region.onlineInfra.toFixed(2)} / 线下渠道成熟度 ${e.input.region.offlineInfra.toFixed(2)} / 人力成本 ${e.input.region.labor.toFixed(2)} / 房租成本 ${e.input.region.rent.toFixed(2)}`,
    `本局存储行情：<strong>${state.memoryMarket ? state.memoryMarket.name : '存储平稳'}</strong>（系数 x${e.memoryMarketFactor.toFixed(2)}）`,
    `区域人口规模（估）：${e.input.marketStats.population.toFixed(1)} 百万人，线上渗透率（加权）：${(e.input.marketStats.onlinePenetration * 100).toFixed(1)}%`,
    `采购方案：${e.input.procurement.name}，合约锁量成本 ${RMB(e.procurementUpfront)}，首批覆盖量 ${e.contractCoverageUnits ? `${e.contractCoverageUnits.toLocaleString('zh-CN')} 台` : '无锁量'}`,
    `营销方案：${e.input.marketing.name} + ${e.input.campaign.name}（首发预算 ${RMB(e.input.campaign.launchCost)}）`,
    `SKU 配置：${e.skuCosting.map((s) => `${s.name} ${s.ram.name}+${s.rom.name}（配比 ${s.share}% / 价格 ${RMB(s.price)} / 成本 ${RMB(s.unitCost)}）`).join('；')}`,
    `SoC 成本 ${RMB(e.socCost)} | 屏幕成本 ${RMB(e.displayCost)} | 存储（加权）${RMB(e.memoryCost)} | 影像 ${RMB(e.cameraCost)} | 机身 ${RMB(e.bodyCost)} | 电池+特色 ${RMB(e.extraCost + (e.input.battery * 0.048 + 35))}`,
    `单台制造成本（加权）：<strong>${RMB(e.unitCost)}</strong>，SKU 加权均价 ${RMB(e.weightedSkuPrice)}，毛利率 <strong class="${marginCls}">${(e.grossMargin * 100).toFixed(1)}%</strong>`,
    `研发成本：${RMB(e.rndCost)}（研发系数 x${e.rdCostFactor.toFixed(2)}），首批投入：${RMB(e.firstBatchCost)}，总启动成本：<strong>${RMB(e.initialCost)}</strong>`,
    `机身尺寸：${e.input.phoneH.toFixed(1)} x ${e.input.phoneW.toFixed(1)} x ${e.input.phoneT.toFixed(1)} mm，屏幕几何：${e.screenMm.widthMm.toFixed(1)} x ${e.screenMm.heightMm.toFixed(1)} mm`,
    `整机估重：<strong>${e.totalWeight.toFixed(1)}g</strong>，外部体积 ${e.extVolume.toFixed(1)}cm³，内部有效体积 ${e.effectiveInternalVolume.toFixed(1)}cm³，部件占用 ${e.occupiedVolume.toFixed(1)}cm³，余量 ${e.remainingVolume.toFixed(1)}cm³ ${volumeOk ? '<span class="good">(可行)</span>' : '<span class="bad">(过载)</span>'}`,
    `边框能力：侧边约 ${e.bezel.sideBezel.toFixed(2)}mm / 上边 ${e.bezel.topBezel.toFixed(2)}mm / 下边 ${e.bezel.bottomBezel.toFixed(2)}mm，边框成本系数 x${e.bezelCostFactor.toFixed(2)}，边框审美系数 x${e.bezelDemandFactor.toFixed(2)}`,
    `外观比例：屏占比 ${(e.screenToBodyRatio * 100).toFixed(1)}%（建议 ${(e.ratioBand.min * 100).toFixed(0)}%-${(e.ratioBand.max * 100).toFixed(0)}%），每英寸体积 ${e.volumePerInch.toFixed(2)} cm³/in，审美系数 x${e.appearanceDemandFactor.toFixed(2)}（${e.appearanceDebuffTag}），屏占比销量系数 x${e.ratioDemandFactor.toFixed(2)}`,
    `尺寸大众化系数：x${e.mainstreamSizeDemandFactor.toFixed(2)}（${e.mainstreamSizeTag}，<5.8" 与 >7.0" 线性下滑）`,
    `${e.ratioNoveltyNonFoldable ? `<span class="bad">比例小众惩罚：非折叠屏使用 ${e.input.disp.ratio}，需求系数 x${e.ratioNoveltyDemandMul.toFixed(2)}，屏幕成本系数 x${e.ratioNoveltyCostMul.toFixed(2)}。</span>` : `比例适配：需求系数 x${e.ratioNoveltyDemandMul.toFixed(2)}，屏幕成本系数 x${e.ratioNoveltyCostMul.toFixed(2)}。`}`,
    `${e.input.disp.mat.name === '折叠屏' ? `折叠屏加成：大尺寸成本系数 x${e.foldableSizeMul.toFixed(2)}，线上吸引力 x${e.foldableOnlineBoost.toFixed(2)}，线下吸引力 x${e.foldableOfflineBoost.toFixed(2)}（线下更强）。` : ''}`,
    `预计售后退货率：<strong>${(returnProfile.rate * 100).toFixed(2)}%</strong>（封顶 4.8%，低端屏幕供应链/工程塑料/功能过多/旗舰无VC/折叠与墨水屏会抬升）`,
    `品牌溢价资产：价格接受度 x${e.premiumPriceToleranceCarry.toFixed(2)}，线上高价需求 x${e.premiumOnlineDemandCarry.toFixed(2)}，线下高价需求 x${e.premiumOfflineDemandCarry.toFixed(2)}（由前代高端产品沉淀）`,
    `${e.ratioBandWarning ? `<span class="bad">${e.ratioBandWarning}</span>` : '<span class="good">屏占比处于建议区间，外观接受度稳定。</span>'}`,
    `产品力评分：<strong>${e.qualityScore.toFixed(1)}</strong>/100，极客吸引度 ${e.geekAttraction.toFixed(1)}（更偏线上），外观零售加成 x${e.appearanceRetailBoost.toFixed(2)}，线下偏好加成 x${e.offlinePreferenceBoost.toFixed(2)}（护眼/LTPO/P3/磁吸/快充/双频GPS），预估线上/线下销量占比 ${(e.onlineShare * 100).toFixed(1)}% / ${(e.offlineShare * 100).toFixed(1)}%`,
    `口碑启动拆解：市场环境 ${state.marketPick ? (state.marketPick.rating >= 0 ? '+' : '') + state.marketPick.rating : '+0'} + 首发营销 ${e.input.campaign.rating >= 0 ? '+' : ''}${e.input.campaign.rating.toFixed(1)} + 产品力转化 ${launchRatingFromQuality >= 0 ? '+' : ''}${launchRatingFromQuality.toFixed(2)} ≈ <strong>${launchRatingDeltaEst >= 0 ? '+' : ''}${launchRatingDeltaEst.toFixed(2)}</strong>`,
    `口碑运营风险：首发供需张力 ${(launchStockTension * 100).toFixed(1)}%（>0 代表潜在缺货口碑压力）；后续每月将按“随机事件 + 黑天鹅 + 品质漂移 - 缺货惩罚 - 滞销惩罚”结算。`,
    `口碑提升建议：${reputationHints.join(' ')}`,
    `新品牌信任系数 x${e.launchTrustFactor.toFixed(2)}，设计弹性系数 x${e.designDemandElasticity.toFixed(2)}（设计和定价会更明显影响生死）`,
    `渠道成本指数：线上 ${e.onlineCostIndex.toFixed(2)} / 线下 ${e.offlineCostIndex.toFixed(2)}`,
    `月需求基线约 <strong>${Math.round(e.baseDemand).toLocaleString('zh-CN')}</strong> 台（人口系数 ${e.popFactor.toFixed(2)}，渠道系数 ${e.channelFactor.toFixed(2)}）`
  ].join('<br>');
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
  const est = getDisplayLiveEstimate();
  const phoneH = Number(el.phoneH.value);
  const phoneW = Number(el.phoneW.value);
  const maxW = phoneW - 2 * est.bezel.sideBezel;
  const maxH = phoneH - (est.bezel.topBezel + est.bezel.bottomBezel);
  const fit = est.dim.widthMm <= maxW && est.dim.heightMm <= maxH;

  el.displayQuickBox.innerHTML = [
    `屏幕规格实时预览：<strong>${est.dim.widthMm.toFixed(1)} x ${est.dim.heightMm.toFixed(1)} mm</strong>（${size.toFixed(2)}\" ${el.dispRatio.value}）`,
    `屏幕方案：${est.mat.name} / ${est.vendor.name} / ${est.form.name}`,
    `单片屏幕估价：<strong>${RMB(est.displayCost)}</strong>${est.featureCostMultiplier > 1 ? `（特性加价倍率 x${est.featureCostMultiplier.toFixed(1)}）` : ''}${est.ratioNoveltyCostMul > 1 ? `（比例惩罚 x${est.ratioNoveltyCostMul.toFixed(2)}）` : ''}${est.foldableSizeMul > 1 ? `（折叠大尺寸 x${est.foldableSizeMul.toFixed(2)}）` : ''}`,
    `边框估计：侧边 ${est.bezel.sideBezel.toFixed(2)}mm / 上边 ${est.bezel.topBezel.toFixed(2)}mm / 下边 ${est.bezel.bottomBezel.toFixed(2)}mm，边框成本系数 x${est.bezelCostFactor.toFixed(2)}，审美系数 x${est.bezelDemandFactor.toFixed(2)}`,
    `建议屏占比区间：${(est.band.min * 100).toFixed(0)}%-${(est.band.max * 100).toFixed(0)}%，当前 ${(est.screenToBodyRatio * 100).toFixed(1)}%，制造成本系数 x${est.ratioCostFactor.toFixed(2)}`,
    `机身可容纳开口：${maxW.toFixed(1)} x ${maxH.toFixed(1)} mm ${fit ? '<span class="good">(可放入)</span>' : '<span class="bad">(放不下)</span>'}`
  ].join('<br>');
}

function launch() {
  const e = evaluateBuild();
  if (e.issues.length) {
    el.previewBox.innerHTML = `<span class="bad">${e.issues.join('<br>')}</span>`;
    return;
  }
  if (e.initialCost > state.cash) {
    el.previewBox.innerHTML = `<span class="bad">资金不足：需要 ${RMB(e.initialCost)}，当前 ${RMB(state.cash)}。</span>`;
    return;
  }

  state.product = e;
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
  const isFlagshipCamera = ['hp2_200', 'lyt900'].includes(e.input.cams.main.id);
  const hasTopRamSku = (e.skuCosting || []).some((s) => ['16_lp5x', '24_lp5x'].includes(s.ram.id));
  let premiumSignalScore = 0;
  if (isFoldableModel) premiumSignalScore += 1.3;
  if (isFlagshipSoc) premiumSignalScore += 1.0;
  if (isFlagshipCamera) premiumSignalScore += 1.0;
  if (hasTopRamSku) premiumSignalScore += 0.8;
  if (isFlagshipSoc && isFlagshipCamera) premiumSignalScore += 0.5;
  const premiumImmediateRating = clamp(premiumSignalScore * 0.35, 0, 1.8);
  const nextPriceTolGain = premiumSignalScore * 0.055;
  const nextOnlineDemandGain = premiumSignalScore * 0.05;
  const nextOfflineDemandGain = premiumSignalScore * (isFoldableModel ? 0.085 : 0.05);
  state.premiumPriceToleranceCarry = clamp((state.premiumPriceToleranceCarry || 1) + nextPriceTolGain, 1.0, 1.65);
  state.premiumOnlineDemandCarry = clamp((state.premiumOnlineDemandCarry || 1) + nextOnlineDemandGain, 1.0, 1.65);
  state.premiumOfflineDemandCarry = clamp((state.premiumOfflineDemandCarry || 1) + nextOfflineDemandGain, 1.0, 1.75);

  state.rating = clamp(
    state.rating + (state.marketPick.rating || 0) + e.input.campaign.rating + (e.qualityScore - 55) * 0.08 + premiumImmediateRating,
    1,
    100
  );
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
  el.marketBox.innerHTML = `企业：<strong>${state.companyName || '未命名科技'}</strong>（成立于 ${e.input.region.name}）<br>机型：<strong>${e.modelName}</strong><br>本局市场：<strong>${state.marketPick.name}</strong><br>${state.marketPick.text}<br>启动难度：<strong>${e.input.startupDifficulty.name}</strong><br>存储行情：<strong>${state.memoryMarket ? state.memoryMarket.name : '存储平稳'}</strong>（x${state.memoryMarket ? state.memoryMarket.factor.toFixed(2) : '1.00'}）<br>区域能力：供应链 ${e.input.region.supplyEco.toFixed(2)} / 研发 ${e.input.region.rdTalent.toFixed(2)} / 线上基础设施 ${e.input.region.onlineInfra.toFixed(2)} / 线下成熟度 ${e.input.region.offlineInfra.toFixed(2)} / 人力 ${e.input.region.labor.toFixed(2)} / 房租 ${e.input.region.rent.toFixed(2)}<br>预计渠道占比：线上 ${(e.onlineShare * 100).toFixed(1)}% / 线下 ${(e.offlineShare * 100).toFixed(1)}%，渠道成本指数：线上 ${e.onlineCostIndex.toFixed(2)} / 线下 ${e.offlineCostIndex.toFixed(2)}<br>本代可选贷款：${RMB(GENERATION_LOAN_PRINCIPAL)}（年利率 ${(GENERATION_LOAN_ANNUAL_RATE * 100).toFixed(0)}%，${GENERATION_LOAN_TERM_MONTHS} 个月后还款）。`;
  el.reportBox.innerHTML = `已在 ${e.input.region.name} 开售 <strong>${e.modelName}</strong>，首批 ${e.input.units.toLocaleString('zh-CN')} 台。采购方案：${e.input.procurement.name}（合约覆盖 ${e.contractCoverageUnits ? e.contractCoverageUnits.toLocaleString('zh-CN') : 0} 台）。预估线上销量占比 ${(e.onlineShare * 100).toFixed(1)}%，营销主打法：${e.input.marketing.name}，启动难度：${e.input.startupDifficulty.name}。<br>SKU 首发：${state.product.skuStats.map((s) => `${s.name} ${s.ramName}+${s.romName} ${s.share}%`).join('；')}<br>高端信号：${premiumSignalScore > 0 ? `已建立（当代口碑 +${premiumImmediateRating.toFixed(2)}；下代价格接受度 x${state.premiumPriceToleranceCarry.toFixed(2)}，线上高价需求 x${state.premiumOnlineDemandCarry.toFixed(2)}，线下高价需求 x${state.premiumOfflineDemandCarry.toFixed(2)}）` : '本代未形成高端信号'}<br>贷款状态：未决策（可使用或放弃，使用后第 ${GENERATION_LOAN_TERM_MONTHS} 个月到期扣款）。`;
  el.finalBox.innerHTML = '结算后显示最终表现。';
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
    ratingDelta: 2.6,
    onlineMul: 1.08
  },
  {
    id: 'headline_report',
    name: '主流媒体正向报道',
    reason: '产品被多个科技媒体集中报道，品牌可信度上升。',
    weight: 18,
    demandMul: 1.12,
    costMul: 0.99,
    ratingDelta: 1.8,
    onlineMul: 1.04
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
    ratingDelta: 2.2
  }
];

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

function takeGenerationLoan() {
  if (!state.product || !state.launched || state.phaseEnded || state.ended) {
    el.reportBox.innerHTML = '当前没有可申请贷款的在售机型。';
    return;
  }
  const p = state.product;
  if (p.loanDecision === 'taken') {
    el.reportBox.innerHTML = '本代贷款已使用，无法重复申请。';
    return;
  }
  if (p.loanDecision === 'declined') {
    el.reportBox.innerHTML = '你已放弃本代贷款，不能再次申请。';
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
  updateHeader();
  el.reportBox.innerHTML = `已使用本代贷款：到账 ${RMB(GENERATION_LOAN_PRINCIPAL)}，到期还款 ${RMB(repayAmount)}（公司第 ${dueCompanyMonth} 月扣款，不受是否换代影响）。`;
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
    return;
  }
  if (!state.launched || state.ended) {
    el.reportBox.innerHTML = '请先开售。';
    return;
  }

  state.month += 1;
  state.companyMonthsTotal += 1;
  const p = state.product;
  const dueLoans = state.loans.filter((x) => !x.settled && x.dueCompanyMonth <= state.companyMonthsTotal);
  const loanDueThisMonth = dueLoans.reduce((sum, x) => sum + x.repayAmount, 0);
  dueLoans.forEach((x) => { x.settled = true; });
  if (loanDueThisMonth > 0) {
    state.cash -= loanDueThisMonth;
    state.costTotal += loanDueThisMonth;
    state.companyCostTotal += loanDueThisMonth;
    if (state.cash <= 0) {
      el.reportBox.innerHTML = `公司第 ${state.companyMonthsTotal} 月贷款到期扣款 ${RMB(loanDueThisMonth)}，现金变为 ${RMB(state.cash)}。<br><span class="bad">现金为负，企业破产。</span>`;
      endGame('贷款到期扣款后资金链断裂，企业破产。');
      return;
    }
  }
  const noise = monthlyNoise();
  const swan = rollBlackSwan(p);
  const opportunity = rollOpportunity(p, swan);
  state.shortEvents.push(noise.name);
  if (swan) state.shortEvents.push(`黑天鹅:${swan.name}`);
  if (opportunity) state.shortEvents.push(`机遇:${opportunity.name}`);

  const swanDemandMul = swan ? (swan.demandMul || 1) : 1;
  const swanCostMul = swan ? (swan.costMul || 1) : 1;
  const swanRatingDelta = swan ? (swan.ratingDelta || 0) : 0;
  const swanCashHit = swan ? (swan.cashHit || 0) : 0;
  const swanReceivableHoldRatio = swan ? (swan.receivableHoldRatio || 0) : 0;
  const swanForcePhaseEnd = Boolean(swan && swan.forcePhaseEnd);
  const swanInstantKill = Boolean(swan && swan.instantKill);
  const oppDemandMul = opportunity ? (opportunity.demandMul || 1) : 1;
  const oppCostMul = opportunity ? (opportunity.costMul || 1) : 1;
  const oppRatingDelta = opportunity ? (opportunity.ratingDelta || 0) : 0;
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
  const demandRaw = p.baseDemand * life * brandRamp * reputation * randomness * noise.demand * swanDemandMul * oppDemandMul * demandShockMul * slumpMul * onlinePulse * stockoutDecay * saturationFactor;
  const demand = Math.max(0, Math.min(remainingMarket, demandRaw));

  const inventoryBefore = state.inventory;
  const demandTarget = Math.max(0, Math.round(demand));
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
  let preorderUnitsNew = 0;
  let preorderCashIn = 0;
  if (state.month <= PREORDER_MONTH_LIMIT && unmetDemandUnits > 0) {
    (p.skuStats || []).forEach((s) => {
      const qty = unmetBySku[s.id] || 0;
      if (qty <= 0) return;
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
  const ratingDelta = noise.rating + swanRatingDelta + oppRatingDelta + qualityDrift - returnPenalty - (effectiveStockoutRatio * 3.4) + stalePenalty + rnd(-0.9, 0.8);
  state.rating = clamp(state.rating + ratingDelta, 1, 100);
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
  const signalText = `<span class="risk-info">预警信号：供应商健康度 ${supplierHealth}/100｜舆情温度 ${sentimentHeat}/100｜渠道回款风险 ${receivableRisk}/100</span>`;
  const swanLevelClass = swan && (swanInstantKill || swan.level === 'lethal' || swan.level === 'lifecycle')
    ? 'risk-danger'
    : 'risk-warn';
  const opportunityText = opportunity
    ? `<span class="good">机遇：${opportunity.name}</span>（${opportunity.reason}；需求 x${oppDemandMul.toFixed(2)} / 成本 x${oppCostMul.toFixed(2)} / 口碑 +${oppRatingDelta.toFixed(1)} / 现金加成 ${RMB(oppCashBoost)} / 线上热度 x${oppOnlineMul.toFixed(2)}）`
    : '';
  const swanText = swan
    ? `<span class="${swanLevelClass}">黑天鹅：${swan.name}</span>（${swan.reason}；需求 x${swanDemandMul.toFixed(2)} / 成本 x${swanCostMul.toFixed(2)} / 口碑 ${swanRatingDelta >= 0 ? '+' : ''}${swanRatingDelta.toFixed(1)} / 现金冲击 ${RMB(swanCashHit)} / 回款冻结 ${RMB(receivableHold)} / 交期惩罚 ${p.leadPenaltyMonthsRemain > 0 ? `+${p.leadPenaltyExtra}月（剩${p.leadPenaltyMonthsRemain}月）` : '无'}）`
    : '';
  const eventParts = [`<strong>${noise.name}</strong>`];
  if (swanText) eventParts.push(swanText);
  if (opportunityText) eventParts.push(opportunityText);
  const eventLine = `第 ${state.month} 月事件：${eventParts.join(' + ')}｜${signalText}`;

  el.reportBox.innerHTML = [
    eventLine,
    `本月到货：${arrivedThisMonth.toLocaleString('zh-CN')} 台（可售入库 ${arrivalSkuText}；预订交付 ${preorderDeliveredText}），月初可售库存 ${inventoryBefore.toLocaleString('zh-CN')} 台`,
    `总销量 <strong>${sold.toLocaleString('zh-CN')}</strong> 台，收入 <strong>${RMB(revenue)}</strong>，月运营成本 ${RMB(monthCost)}`,
    `售后退货：${returnedUnits.toLocaleString('zh-CN')} 台（退货率 ${(effectiveReturnRate * 100).toFixed(2)}%，品控基准 ${(expectedReturnRate * 100).toFixed(2)}%），现金损失 <strong class="bad">${RMB(returnLoss)}</strong>（按成交价 90%）`,
    `退货因子：低质屏链 +${(returnProfile.factors.vendorPenalty * 100).toFixed(2)}%｜工程塑料 +${(returnProfile.factors.bodyPenalty * 100).toFixed(2)}%｜功能过多 +${(returnProfile.factors.extraPenalty * 100).toFixed(2)}%｜旗舰无VC +${(returnProfile.factors.thermalPenalty * 100).toFixed(2)}%｜折叠/墨水 +${(returnProfile.factors.displayPenalty * 100).toFixed(2)}%｜质量偏差 +${(returnProfile.factors.qualityPenalty * 100).toFixed(2)}%`,
    loanDueThisMonth > 0 ? `<span class="bad">贷款到期扣款：${RMB(loanDueThisMonth)}（公司第 ${state.companyMonthsTotal} 月）</span>` : '贷款到期扣款：无',
    `SKU 销量：${skuMonthParts.length ? skuMonthParts.join('；') : '本月无出货'}`,
    `线上 SKU：${skuOnlineParts.length ? skuOnlineParts.join('，') : '无'}；线下 SKU：${skuOfflineParts.length ? skuOfflineParts.join('，') : '无'}`,
    `线上：${soldOnline.toLocaleString('zh-CN')} 台 / ${RMB(onlineRevenue)}，出货毛利 <strong class="${onlineGross >= 0 ? 'good' : 'bad'}">${RMB(onlineGross)}</strong>，渠道成本 ${RMB(onlineOps)}，渠道净贡献 <strong class="${onlineNet >= 0 ? 'good' : 'bad'}">${RMB(onlineNet)}</strong>`,
    `线下：${soldOffline.toLocaleString('zh-CN')} 台 / ${RMB(offlineRevenue)}，出货毛利 <strong class="${offlineGross >= 0 ? 'good' : 'bad'}">${RMB(offlineGross)}</strong>，渠道成本 ${RMB(offlineOps)}，渠道净贡献 <strong class="${offlineNet >= 0 ? 'good' : 'bad'}">${RMB(offlineNet)}</strong>`,
    `线上占比 ${(dynamicOnlineShare * 100).toFixed(1)}%，生命周期阶段 ${dynamicPhaseState.phase}（生命周期基线 ${lifecycleState.phase} / 系数 ${life.toFixed(2)}），需求动量 ${dynamicPhaseState.growth >= 0 ? '+' : ''}${(dynamicPhaseState.growth * 100).toFixed(1)}%，相对峰值 ${(dynamicPhaseState.peakRatio * 100).toFixed(1)}%，线上热度系数 ${onlinePulse.toFixed(2)}，品牌爬坡系数 ${brandRamp.toFixed(2)}，波动系数 ${randomness.toFixed(2)}，需求冲击系数 ${demandShockMul.toFixed(2)}（冲击概率 ${(crashProb * 100).toFixed(0)}%），创伤衰减系数 ${slumpMul.toFixed(2)}（创伤 ${(p.demandSlump || 0).toFixed(2)}），缺货衰退系数 ${stockoutDecay.toFixed(2)}（压力 ${(p.stockoutStress || 0).toFixed(2)}），需求量 ${demandTarget.toLocaleString('zh-CN')} 台，缺货 ${unmetDemandUnits.toLocaleString('zh-CN')} 台 / 缺货率 ${(stockoutRatio * 100).toFixed(1)}%，当月出货毛利合计 ${RMB(grossTotal)}`,
    `口碑拆解：随机 ${noise.rating >= 0 ? '+' : ''}${noise.rating.toFixed(2)} + 黑天鹅 ${swanRatingDelta >= 0 ? '+' : ''}${swanRatingDelta.toFixed(2)} + 机遇 ${oppRatingDelta >= 0 ? '+' : ''}${oppRatingDelta.toFixed(2)} + 品质 ${qualityDrift >= 0 ? '+' : ''}${qualityDrift.toFixed(2)} - 退货 ${returnPenalty.toFixed(2)} - 缺货 ${(effectiveStockoutRatio * 3.4).toFixed(2)} + 滞销 ${stalePenalty.toFixed(2)} + 微扰 ${(ratingDelta - (noise.rating + swanRatingDelta + oppRatingDelta + qualityDrift - returnPenalty - (effectiveStockoutRatio * 3.4) + stalePenalty)).toFixed(2)} = <strong>${ratingDelta >= 0 ? '+' : ''}${ratingDelta.toFixed(2)}</strong>`,
    state.month <= PREORDER_MONTH_LIMIT
      ? `前 ${PREORDER_MONTH_LIMIT} 月缺货转预订：本月新增预订 ${preorderUnitsNew.toLocaleString('zh-CN')} 台，预订回款 ${RMB(preorderCashIn)}，待交付预订 ${preorderBacklogTotal.toLocaleString('zh-CN')} 台`
      : `预订池：本月交付 ${preorderDeliveredThisMonth.toLocaleString('zh-CN')} 台，待交付 ${preorderBacklogTotal.toLocaleString('zh-CN')} 台`,
    `库存 ${state.inventory.toLocaleString('zh-CN')} 台（${inventorySkuText}），累计售罄率 ${soldRate.toFixed(1)}%，合约剩余覆盖 ${Math.max(0, p.contractUnits - p.producedTotal).toLocaleString('zh-CN')} 台`,
    `现金 <strong class="${state.cash >= 0 ? 'good' : 'bad'}">${RMB(state.cash)}</strong>，口碑 <strong>${Math.round(state.rating)}</strong>（本月变化 ${ratingDelta >= 0 ? '+' : ''}${ratingDelta.toFixed(2)}）`
  ].join('<br>');

  if (state.cash <= 0) {
    endGame('资金链断裂，企业破产。');
    return;
  }
  if (swanInstantKill) {
    endGame(`黑天鹅致命事件：${swan.name}。`);
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
}

function restock() {
  if (state.phaseEnded) {
    el.reportBox.innerHTML = '旧机型已退市，无法补货。请进入下一代机型。';
    return;
  }
  if (!state.launched || state.ended) {
    el.reportBox.innerHTML = '当前不可追加生产。';
    return;
  }
  const p = state.product;
  const add = Math.round(Number(el.restockUnits ? el.restockUnits.value : 0) || 0);
  if (add < 1000 || add > 200000) {
    el.reportBox.innerHTML = '<span class="bad">补货数量需在 1000~200000 台。</span>';
    return;
  }
  const skuId = el.restockSku ? el.restockSku.value : '';
  const sku = (p.skuStats || []).find((x) => x.id === skuId);
  if (!sku) {
    el.reportBox.innerHTML = '<span class="bad">请选择要补货的 SKU。</span>';
    return;
  }
  let renewalCost = 0;
  let coverageInfo = '合约覆盖内';
  const nextProduced = p.producedTotal + add;

  if (p.input.procurement.coverageMultiplier > 0 && nextProduced > p.contractUnits) {
    renewalCost = p.input.procurement.renewUpfront;
    p.procurementRenewals += 1;
    const extendUnits = Math.ceil(add * Math.max(0.8, p.input.procurement.coverageMultiplier));
    p.contractUnits += extendUnits;
    coverageInfo = `触发续约 +${extendUnits.toLocaleString('zh-CN')} 台覆盖`;
  }

  const skuCostBase = sku.unitCost || p.unitCost;
  const cost = add * skuCostBase * (state.marketPick.cost * 0.98) / p.supplyStability + 140_000 + renewalCost;
  if (cost > state.cash) {
    el.reportBox.innerHTML = `<span class="bad">追加失败：需要 ${RMB(cost)}，现金不足。</span>`;
    return;
  }

  const leadPenalty = p.leadPenaltyMonthsRemain > 0 ? (p.leadPenaltyExtra || 0) : 0;
  const arriveMonth = state.month + Math.max(1, (p.input.procurement.leadMonths || 1) + leadPenalty);
  state.cash -= cost;
  state.costTotal += cost;
  state.companyCostTotal += cost;
  p.producedTotal += add;
  p.pipeline.push({ skuId: sku.id, units: add, arriveMonth });
  el.reportBox.innerHTML = `追加生产 ${sku.name}（${sku.ramName}+${sku.romName}）${add.toLocaleString('zh-CN')} 台，成本 ${RMB(cost)}（续约 ${RMB(renewalCost)}，${coverageInfo}，交期惩罚 ${leadPenalty > 0 ? `+${leadPenalty}月` : '无'}，预计第 ${arriveMonth} 月到货）。`;
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
  let units = 0;
  let revenue = 0;
  (product.skuStats || []).forEach((s) => {
    const left = Number(state.inventoryBySku[s.id] || 0);
    if (left <= 0) return;
    units += left;
    revenue += left * s.price * 0.3;
    state.inventoryBySku[s.id] = 0;
  });
  syncInventoryTotal();
  return { revenue, units };
}

function finishProductPhase(reason) {
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
  if (el.continueNext) el.continueNext.classList.remove('hidden');
  el.reportBox.innerHTML = [
    `<strong>${reason}</strong>`,
    `机型：<strong>${archived && archived.modelName ? archived.modelName : '未知机型'}</strong>`,
    `旧机型已进入清库存：按原价 30% 处理 ${liquidation.units.toLocaleString('zh-CN')} 台，回笼 ${RMB(liquidation.revenue)}。`,
    preorderBacklogTotal > 0 ? `未交付预订 ${preorderBacklogTotal.toLocaleString('zh-CN')} 台已自动取消。` : '无待交付预订。',
    `本代锐评：<strong>${verdictProduct(archived)}</strong>`,
    '你可以选择“进入下一代机型”继续经营，或点击“企业结算”结束公司。'
  ].join('<br>');
  el.finalBox.innerHTML = '公司未结算：可继续下一代，或企业结算查看全流程成绩。';
  updateHeader();
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
  const survival = Math.min(100, state.companyMonthsTotal * 4.2);
  const market = Math.round(state.rating);
  const biz = clamp(50 + roi * 120, 0, 100);
  const overall = Math.round(survival * 0.25 + market * 0.35 + biz * 0.4);
  const productLines = state.productHistory.length
    ? state.productHistory.map((x) =>
      `第${x.idx}代 ${x.modelName || `Gen${x.idx}`}：${x.soc}｜${x.display}｜区域${x.region}｜周期${x.months}月｜销量${x.sold.toLocaleString('zh-CN')}｜营收${RMB(x.revenue)}｜净利${RMB(x.net)}｜口碑${x.ratingEnd}｜质量${x.qualityScore.toFixed(1)}｜极客${x.geekAttraction.toFixed(1)}｜渠道占比 线上${(x.onlineShare * 100).toFixed(1)}%/线下${(x.offlineShare * 100).toFixed(1)}%｜难度${x.startupDifficulty}｜贷款${x.loanUsed ? '已使用' : x.loanDecision === 'declined' ? '已放弃' : '未决策'}｜SKU(${x.sku.join(' / ')})｜锐评：${verdictProduct(x)}`)
    : ['暂无机型记录。'];

  el.finalBox.innerHTML = [
    `<strong>${reason}</strong>`,
    `企业：${state.companyName || '未命名科技'}（成立区域：${chinaRegions[el.region.value]?.name || '未知'}）`,
    `公司经营总周期：${state.companyMonthsTotal} 个月，机型代数：${state.productHistory.length}`,
    `公司累计销量：${state.companySoldTotal.toLocaleString('zh-CN')} 台`,
    `公司累计营收：${RMB(state.companyRevenueTotal)}，累计成本：${RMB(state.companyCostTotal)}`,
    `净利润：<strong class="${net >= 0 ? 'good' : 'bad'}">${RMB(net)}</strong>，ROI ${(roi * 100).toFixed(1)}%`,
    `市场评价：${market}/100，综合评分：<strong>${overall}</strong>/100`,
    `企业锐评：<strong>${verdictEnterprise(net, roi, market, state.companyMonthsTotal, state.productHistory.length)}</strong>`,
    '--- 每代机型表现 ---',
    ...productLines
  ].join('<br>');

  updateHeader();
}

function restart() {
  state.cash = state.initialCash;
  state.inventory = 0;
  state.inventoryBySku = {};
  state.rating = 50;
  state.month = 0;
  state.chosenMarket = null;
  state.memoryMarket = null;
  state.companyName = '';
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
  state.premiumPriceToleranceCarry = 1.0;
  state.premiumOnlineDemandCarry = 1.0;
  state.premiumOfflineDemandCarry = 1.0;

  el.reportBox.innerHTML = '等待月报。';
  el.finalBox.innerHTML = '结算后显示最终表现。';
  el.previewBox.innerHTML = '等待计算。';
  el.eventHint.textContent = '请选择 1 个，它将影响整局。';
  if (el.companyName) el.companyName.value = '';
  if (el.modelBaseName) el.modelBaseName.value = 'Neo';
  updateModelNameHint();
  updateDisplayMaterialOptions();
  if (el.restockSku) el.restockSku.innerHTML = '';
  if (el.continueNext) el.continueNext.classList.add('hidden');
  initSkuRows();
  rollThreeMarkets();
  setStep(1);
  updateHeader();
}

function bind() {
  el.rollEvents.addEventListener('click', rollThreeMarkets);
  el.companyName.addEventListener('input', updateEventGateState);
  el.region.addEventListener('change', updateEventGateState);
  if (el.modelBaseName) el.modelBaseName.addEventListener('input', updateModelNameHint);
  el.confirmEvent.addEventListener('click', () => {
    if (!state.marketPick) return;
    const nameCheck = validateCompanyName(el.companyName.value);
    if (!nameCheck.ok) {
      el.eventHint.textContent = nameCheck.msg;
      return;
    }
    state.chosenMarket = state.marketPick;
    state.companyName = nameCheck.name;
    const roll = Math.random();
    state.memoryMarket = roll < 0.35
      ? memoryMarketLevels[0]
      : roll < 0.8
        ? memoryMarketLevels[1]
        : memoryMarketLevels[2];
    el.eventHint.textContent = `已选：${state.marketPick.name}；企业：${state.companyName}；成立区域：${chinaRegions[el.region.value].name}；本局存储行情：${state.memoryMarket.name}（x${state.memoryMarket.factor.toFixed(2)}）`;
    setStep(2);
  });

  el.preview.addEventListener('click', renderPreview);
  el.launch.addEventListener('click', launch);
  el.nextMonth.addEventListener('click', nextMonth);
  el.restock.addEventListener('click', restock);
  if (el.takeLoan) el.takeLoan.addEventListener('click', takeGenerationLoan);
  if (el.declineLoan) el.declineLoan.addEventListener('click', declineGenerationLoan);
  if (el.continueNext) {
    el.continueNext.addEventListener('click', () => {
      if (!state.phaseEnded || state.ended) return;
      const roll = Math.random();
      state.memoryMarket = roll < 0.35
        ? memoryMarketLevels[0]
        : roll < 0.8
          ? memoryMarketLevels[1]
          : memoryMarketLevels[2];
      state.phaseEnded = false;
      if (el.continueNext) el.continueNext.classList.add('hidden');
      el.reportBox.innerHTML = `已进入下一代机型研发阶段。沿用现金 ${RMB(state.cash)}、口碑 ${Math.round(state.rating)}，新一代存储行情：${state.memoryMarket.name}（x${state.memoryMarket.factor.toFixed(2)}）。<br>品牌溢价资产：价格接受度 x${(state.premiumPriceToleranceCarry || 1).toFixed(2)}，线上高价需求 x${(state.premiumOnlineDemandCarry || 1).toFixed(2)}，线下高价需求 x${(state.premiumOfflineDemandCarry || 1).toFixed(2)}。`;
      setStep(2);
      updateModelNameHint();
      updateDisplayMaterialOptions();
      updateDisplayQuickBox();
      updateHeader();
    });
  }
  el.stop.addEventListener('click', () => {
    if (!state.product || state.phaseEnded || state.ended || !state.launched) {
      el.reportBox.innerHTML = '当前没有在售机型可做产品停产结算。';
      return;
    }
    finishProductPhase('玩家主动对当前机型执行停产结算。');
  });
  if (el.endCompany) {
    el.endCompany.addEventListener('click', () => {
      if (state.ended) {
        el.reportBox.innerHTML = '企业已结算。';
        return;
      }
      endGame('玩家主动企业结算。');
    });
  }
  el.restart.addEventListener('click', restart);
  if (el.addSku) {
    el.addSku.addEventListener('click', () => {
      addSkuRow({ ram: '12_lp5x', rom: '256_ufs31', priceAdj: 300, share: 0 });
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
    });
  }
  window.addEventListener('resize', renderOpsChart);

  [el.dispMat, el.dispVendor, el.dispSize, el.dispRatio, el.dispForm, el.phoneH, el.phoneW].forEach((node) => {
    node.addEventListener('input', updateDisplayQuickBox);
    node.addEventListener('change', updateDisplayQuickBox);
  });
  el.displayFeatures.addEventListener('change', updateDisplayQuickBox);
}

function fillSources() {
  const links = [
    ['Qualcomm 8 Elite 产品页', 'https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-elite-mobile-platform'],
    ['Qualcomm 8 Elite Gen 5 产品简述', 'https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/snapdragon-8-elite-gen-5-product-brief.pdf'],
    ['Qualcomm 7s Gen 3 产品简述', 'https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/snapdragon-7s-gen-3-product-brief.pdf'],
    ['MediaTek Helio G81 官方页', 'https://www.mediatek.com/products/smartphones-2/mediatek-helio-g81'],
    ['MediaTek Dimensity 7300 官方页', 'https://www.mediatek.com/products/smartphones-2/mediatek-dimensity-7300'],
    ['UNISOC T7225 官方页', 'https://www.unisoc.com/en_us/home/TZNSQYCP/about/38/1742'],
    ['TechInsights 转述：Galaxy S25 Ultra 组件成本', 'https://electronics360.globalspec.com/article/21108/galaxy-s25-ultra-material-costs-estimated-at-528'],
    ['TechInsights 转述：Mate 60 Pro+ 组件成本', 'https://electronics360.globalspec.com/article/20319/huawei-mate-60-pro-material-costs-revealed'],
    ['TCL CSOT 手机显示业务', 'https://www.tcl.com/global/en/tcl-csot/products/smart-device-display'],
    ['BOE 柔性 OLED 资料', 'https://www.boe.com/en/technology/oled/'],
    ['Tianma 中小尺寸显示业务', 'https://www.tianma.com/en/products/small-medium-size-display/'],
    ['OV50H 产品页', 'https://www.ovt.com/products/ov50h40/'],
    ['OV13B10 产品页', 'https://www.ovt.com/products/ov13b10/'],
    ['Samsung ISOCELL HP2 产品页', 'https://semiconductor.samsung.com/image-sensor/mobile-image-sensor/isocell-hp2/']
  ];

  el.sourceNote.innerHTML = links
    .map((x) => `<a href="${x[1]}" target="_blank" rel="noreferrer">${x[0]}</a>`)
    .join(' | ')
    + '<br>注：游戏内所有价格均为“参考估算值”，基于公开规格与公开拆解成本锚点推算，不代表真实商务采购合同。';
}

async function boot() {
  await loadForbiddenNameDictionary();
  fillOptions();
  bind();
  fillSources();
  rollThreeMarkets();
  updateHeader();
  setStep(1);
  updateDisplayQuickBox();
  updateEventGateState();
}

boot();
