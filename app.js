const DATA = {
  stages: ["light", "light", "deep", "deep", "light", "rem", "light", "deep", "light", "rem", "rem", "light", "deep", "light", "awake", "light"],
  times: ["23:00", "23:27", "23:54", "00:21", "00:48", "01:15", "01:42", "02:09", "02:36", "03:03", "03:30", "03:57", "04:24", "04:51", "05:18", "05:45"],
  postures: ["back", "back", "leftSide", "leftSide", "rightSide", "rightSide", "back", "back", "leftSide", "leftSide", "leftSide", "back", "back", "rightSide", "moving", "back"],
  angles: [[0, 0], [0, 0], [2, 0], [2, 1], [0, 0], [1, 0], [0, 0], [0, 0], [0, 0], [1, 0], [1, 0], [0, 0], [0, 0], [0, 0], [3, 1], [0, 0]],
  pressure: ["low","low","low","medium","low","low","low","low","medium","medium","low","low","low","medium","low","low","low","medium","high","medium","low","low","medium","high","medium","low","low","medium","high","high","medium","low","low","medium","medium","high","medium","medium","low","low","low","medium","high","medium","low","low","low","medium","medium","low","low","low","low","medium","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low"]
};

const PERIODS = {
  daily: { range: "lastNight", duration: 438, heart: 58, movement: 14, perNight: false, posture: "leftSide", posturePercent: 38, stages: [84, 98, 242, 14], percents: [19, 22, 55, 4], chart: [59, 56, 57, 55, 58, 62, 60, 57, 56, 58, 61, 59] },
  weekly: { range: "lastSevenNights", duration: 426, heart: 59, movement: 12, perNight: true, posture: "back", posturePercent: 42, stages: [78, 91, 241, 16], percents: [18, 21, 56, 5], chart: [62, 59, 58, 57, 60, 63, 58, 56, 57, 59, 61, 58] },
  monthly: { range: "lastThirtyNights", duration: 412, heart: 60, movement: 13, perNight: true, posture: "rightSide", posturePercent: 35, stages: [72, 86, 238, 16], percents: [18, 20, 57, 5], chart: [64, 61, 59, 58, 61, 65, 60, 58, 59, 62, 64, 60] }
};

const TEXT = {
  en: {
    "app.title": "Smart Sleep Bed",
    "app.description": "Smart mattress and electric bed interface prototype",
    "app.skip": "Skip to main content",
    "app.menu": "Menu",
    "app.primaryNav": "Primary navigation",
    "app.brand": "Sleep system",
    "app.brandPending": "Prototype · name pending",
    "app.mainBedroom": "Main bedroom",
    "app.sampleData": "Sample data",
    "app.sampleOnly": "Sample data only",
    "app.mobileNav": "Mobile navigation",
    "app.goProfile": "Go to account and settings",
    "app.noScript": "This prototype needs JavaScript to show the interface and sample data.",
    "app.errorTitle": "The prototype could not load",
    "app.errorText": "Open this page through a local web server and make sure design-tokens.json is in the prototype folder.",
    "nav.home": "Overview",
    "nav.control": "Bed control",
    "nav.report": "Sleep report",
    "nav.profile": "Account & settings",
    "device.electric": "Electric bed",
    "device.mattress": "Mattress only",
    "device.demoMode": "Demo mode",
    "language.label": "Language",
    "home.title": "Sleep overview",
    "home.description": "Review your sleep patterns and comfort from last night.",
    "date.lastNight": "Last night",
    "signal.title": "Last night's sleep rhythm",
    "signal.select": "Select a time segment for details",
    "signal.duration": "Estimated time in bed",
    "signal.timeline": "Sleep timeline",
    "signal.scroll": "Timeline; scroll horizontally on small screens",
    "signal.group": "Select a sleep period",
    "signal.legend": "Sleep-stage legend",
    "signal.aria": "{time}, {stage}, {posture}, head of bed {head} degrees",
    "signal.stage": "Sleep stage",
    "signal.posture": "Posture",
    "signal.bedAngle": "Bed angle",
    "signal.headLeg": "Head {head}° · leg {leg}°",
    "signal.rangeNote": "Colors show a simulated pattern · not a medical diagnosis",
    "signal.view": "Daily view",
    "stage.deep": "Deep sleep",
    "stage.rem": "REM",
    "stage.light": "Light sleep",
    "stage.awake": "Awake",
    "posture.back": "On your back",
    "posture.leftSide": "Left side",
    "posture.rightSide": "Right side",
    "posture.moving": "Moving",
    "pressure.title": "Pressure map",
    "pressure.subtitle": "Approximate sensor positions · sample",
    "pressure.aria": "Sample pressure map showing low, medium, and high levels",
    "pressure.head": "Head zone",
    "pressure.torso": "Torso",
    "pressure.legs": "Legs",
    "pressure.low": "Low",
    "pressure.medium": "Medium",
    "pressure.high": "High",
    "pressure.kicker": "Pressure map",
    "suggestion.tag": "Observation from sample data",
    "suggestion.title": "A left-side posture was held for a stretch",
    "suggestion.body": "Around 02:10–03:30, the sample shows a continued left-side posture. Shift position if you feel uncomfortable.",
    "suggestion.note": "Example message · no real alerts",
    "metric.sleepSummary": "Sleep summary",
    "metric.heart": "Average heart rate",
    "metric.movement": "Movement",
    "metric.commonPosture": "Common posture",
    "metric.sampleNight": "Sample values for the night",
    "report.title": "Sleep report",
    "report.description": "Review sleep trends, heart rate, and movement.",
    "report.period": "Choose a report period",
    "period.daily": "Daily",
    "period.weekly": "Weekly",
    "period.monthly": "Monthly",
    "range.lastNight": "Last night",
    "range.lastSevenNights": "Past 7 nights",
    "range.lastThirtyNights": "Past 30 nights",
    "report.duration": "Estimated time in bed",
    "report.heart": "Average heart rate",
    "report.movement": "Movement",
    "report.sample": "Sample data",
    "report.chartTitle": "Heart rate",
    "report.chartUnit": "Beats per minute · sample",
    "report.chartAria": "Sample heart-rate chart in beats per minute",
    "report.stages": "Sleep stages",
    "report.stageSubtitle": "Stages simulated from sensor data",
    "report.stageAria": "{stage}, {percent} percent",
    "report.pressureSubtitle": "Approximate sensor positions · sample data",
    "report.postureTitle": "Posture and bed angles",
    "report.postureSubtitle": "Patterns in the sample data",
    "report.commonPosture": "Common posture",
    "report.approx": "Approximate",
    "report.headRange": "Head elevation range",
    "report.legRange": "Leg elevation range",
    "report.bedSample": "Sample bed adjustment",
    "report.disclaimer": "All values are generated to demonstrate the report. Real devices may show different data and accuracy.",
    "control.title": "Bed control",
    "control.description": "Adjust head and leg angles independently for each side.",
    "control.chooseSide": "Choose a side of the bed",
    "control.left": "Left side",
    "control.right": "Right side",
    "control.simulation": "Simulated controls · not connected to a real bed",
    "control.panel": "Bed angle controls",
    "control.head": "Head of bed",
    "control.headElevation": "Head elevation",
    "control.legElevation": "Leg elevation",
    "control.sideHeading": "{side} bed angle",
    "control.drag": "Move the slider to preview the adjustment",
    "control.flat": "Flat",
    "control.read": "Reading",
    "control.watch": "Watch TV",
    "control.savedPreset": "Saved {number}",
    "control.savedList": "Saved bed positions",
    "control.rangeFlat": "0° Flat",
    "control.angle": "{value} degrees",
    "control.message": "Adjust a level to preview the screen",
    "control.angleUpdated": "Sample angle updated",
    "control.save": "Save position",
    "control.savedMessage": "Saved “{label}” in this prototype",
    "control.saveToast": "Position saved in this prototype",
    "control.beforeSleep": "Before sleep",
    "control.beforeSleepBody": "After reading or watching TV in a reclined position, choose “Flat” to return the bed to a level position. This prototype does not send commands to a real bed.",
    "control.sampleNote": "Buttons and angles simulate bed controls for UI evaluation",
    "profile.title": "Account & settings",
    "profile.description": "Manage your device and app preferences.",
    "profile.sampleAccount": "Sample account",
    "profile.prototypeData": "Example details for the prototype screen",
    "profile.noAccount": "No real account data is stored or connected",
    "profile.settings": "System settings",
    "profile.deviceType": "Device setup",
    "profile.deviceTypeHelp": "Choose whether your setup includes an electric bed",
    "profile.chooseDevice": "Choose a device type",
    "profile.bedAndMattress": "Mattress + electric bed",
    "profile.mattressOnly": "Mattress only",
    "profile.notifications": "Notifications",
    "profile.notificationsHelp": "Example in-app notification setting",
    "profile.toggleNotifications": "Toggle notifications",
    "profile.privacy": "Privacy",
    "profile.privacyHelp": "Data storage and sharing",
    "profile.details": "View details",
    "profile.note": "This prototype uses synthetic data only. Account policies, security, and real data retention need to be defined before development.",
    "profile.mattressMode": "Mattress-only mode",
    "profile.mattressModeBody": "Bed controls are hidden. You can still view the overview and sleep reports.",
    "sample.default": "Sample data for this screen · not from a real device",
    "sample.demo": "Buttons and angles are simulated · no real bed commands are sent",
    "toast.electric": "Bed controls are now shown",
    "toast.mattress": "Bed controls are now hidden",
    "toast.notificationsOn": "Sample notifications turned on",
    "toast.notificationsOff": "Sample notifications turned off",
    "toast.privacy": "Privacy details will be defined during system development"
  },
  zh: {
    "app.title": "智能睡眠床",
    "app.description": "智能床垫与电动床应用原型",
    "app.skip": "跳转到主要内容",
    "app.menu": "菜单",
    "app.primaryNav": "主导航",
    "app.brand": "睡眠系统",
    "app.brandPending": "原型 · 名称待定",
    "app.mainBedroom": "主卧室",
    "app.sampleData": "示例数据",
    "app.sampleOnly": "仅供演示的数据",
    "app.mobileNav": "移动端导航",
    "app.goProfile": "前往账户与设置",
    "app.noScript": "此原型需要启用 JavaScript 才能显示界面和示例数据。",
    "app.errorTitle": "原型无法加载",
    "app.errorText": "请通过本地 Web 服务器打开此页面，并确认 prototype 文件夹中包含 design-tokens.json。",
    "nav.home": "概览",
    "nav.control": "床铺控制",
    "nav.report": "睡眠报告",
    "nav.profile": "账户与设置",
    "device.electric": "电动床",
    "device.mattress": "仅床垫",
    "device.demoMode": "演示模式",
    "language.label": "语言",
    "home.title": "睡眠概览",
    "home.description": "查看昨晚的睡眠规律与舒适度。",
    "date.lastNight": "昨晚",
    "signal.title": "昨晚的睡眠节律",
    "signal.select": "选择时段以查看详情",
    "signal.duration": "估算卧床时长",
    "signal.timeline": "睡眠时间轴",
    "signal.scroll": "睡眠时间轴；小屏幕可横向滑动",
    "signal.group": "选择睡眠时段",
    "signal.legend": "睡眠阶段图例",
    "signal.aria": "{time}，{stage}，{posture}，床头抬高 {head} 度",
    "signal.stage": "睡眠阶段",
    "signal.posture": "睡姿",
    "signal.bedAngle": "床体角度",
    "signal.headLeg": "床头 {head}° · 床尾 {leg}°",
    "signal.rangeNote": "颜色仅表示模拟规律 · 不构成医疗诊断",
    "signal.view": "每日视图",
    "stage.deep": "深睡",
    "stage.rem": "快速眼动睡眠",
    "stage.light": "浅睡",
    "stage.awake": "清醒",
    "posture.back": "仰卧",
    "posture.leftSide": "左侧卧",
    "posture.rightSide": "右侧卧",
    "posture.moving": "翻身活动",
    "pressure.title": "压力分布图",
    "pressure.subtitle": "传感器估算位置 · 示例数据",
    "pressure.aria": "压力分布示例图，显示低、中、高压力区域",
    "pressure.head": "头部区域",
    "pressure.torso": "躯干区域",
    "pressure.legs": "腿部区域",
    "pressure.low": "低",
    "pressure.medium": "中",
    "pressure.high": "高",
    "pressure.kicker": "压力分布",
    "suggestion.tag": "示例数据观察",
    "suggestion.title": "曾有一段时间持续保持左侧卧",
    "suggestion.body": "约在 02:10–03:30，示例数据呈现持续左侧卧的状态。如感到不适，可按需调整姿势。",
    "suggestion.note": "示例提示 · 不会发送真实通知",
    "metric.sleepSummary": "睡眠摘要",
    "metric.heart": "平均心率",
    "metric.movement": "翻身次数",
    "metric.commonPosture": "常见睡姿",
    "metric.sampleNight": "整夜示例数据",
    "report.title": "睡眠报告",
    "report.description": "查看睡眠趋势、心率与翻身情况。",
    "report.period": "选择报告周期",
    "period.daily": "每日",
    "period.weekly": "每周",
    "period.monthly": "每月",
    "range.lastNight": "昨晚",
    "range.lastSevenNights": "过去 7 晚",
    "range.lastThirtyNights": "过去 30 晚",
    "report.duration": "估算卧床时长",
    "report.heart": "平均心率",
    "report.movement": "翻身次数",
    "report.sample": "示例数据",
    "report.chartTitle": "心率",
    "report.chartUnit": "次/分钟 · 示例数据",
    "report.chartAria": "心率示例图，单位为每分钟心跳次数",
    "report.stages": "睡眠阶段",
    "report.stageSubtitle": "根据传感器数据模拟的睡眠阶段",
    "report.stageAria": "{stage}，{percent}%",
    "report.pressureSubtitle": "传感器估算位置 · 示例数据",
    "report.postureTitle": "睡姿与床体角度",
    "report.postureSubtitle": "示例数据中的睡姿规律",
    "report.commonPosture": "常见睡姿",
    "report.approx": "约",
    "report.headRange": "床头抬升范围",
    "report.legRange": "床尾抬升范围",
    "report.bedSample": "床体调节示例",
    "report.disclaimer": "所有数值均为报告演示数据。实际设备显示的数据与准确度可能不同。",
    "control.title": "床铺控制",
    "control.description": "左右两侧的床头与床尾角度可独立调节。",
    "control.chooseSide": "选择床铺一侧",
    "control.left": "左侧",
    "control.right": "右侧",
    "control.simulation": "模拟控制 · 尚未连接真实床具",
    "control.panel": "床体角度控制面板",
    "control.head": "床头",
    "control.headElevation": "抬高床头",
    "control.legElevation": "抬高床尾",
    "control.sideHeading": "{side}床体角度",
    "control.drag": "拖动滑块预览调节效果",
    "control.flat": "平躺",
    "control.read": "阅读",
    "control.watch": "看电视",
    "control.savedPreset": "已保存 {number}",
    "control.savedList": "已保存的床体姿势",
    "control.rangeFlat": "0° 平躺",
    "control.angle": "{value} 度",
    "control.message": "调节角度以预览界面",
    "control.angleUpdated": "示例角度已更新",
    "control.save": "保存姿势",
    "control.savedMessage": "已在此原型中保存“{label}”",
    "control.saveToast": "姿势已保存到此原型",
    "control.beforeSleep": "睡前小提示",
    "control.beforeSleepBody": "阅读或看电视后，可选择“平躺”让床体恢复水平。此原型不会向真实床具发送指令。",
    "control.sampleNote": "按钮和角度为界面评估用的模拟控制",
    "profile.title": "账户与设置",
    "profile.description": "管理设备与应用偏好设置。",
    "profile.sampleAccount": "示例账户",
    "profile.prototypeData": "用于展示原型界面的示例信息",
    "profile.noAccount": "未存储或连接真实账户信息",
    "profile.settings": "系统设置",
    "profile.deviceType": "设备类型",
    "profile.deviceTypeHelp": "选择是否使用电动床",
    "profile.chooseDevice": "选择设备类型",
    "profile.bedAndMattress": "床垫 + 电动床",
    "profile.mattressOnly": "仅床垫",
    "profile.notifications": "通知",
    "profile.notificationsHelp": "应用内通知设置示例",
    "profile.toggleNotifications": "切换通知设置",
    "profile.privacy": "隐私",
    "profile.privacyHelp": "数据存储与共享",
    "profile.details": "查看详情",
    "profile.note": "此原型仅使用合成数据。正式开发前仍需定义账户政策、安全措施与真实数据保留规则。",
    "profile.mattressMode": "仅床垫模式",
    "profile.mattressModeBody": "床铺控制菜单已隐藏，仍可查看概览和睡眠报告。",
    "sample.default": "此页面为示例数据 · 并非来自真实设备",
    "sample.demo": "按钮和角度均为模拟 · 不会向真实床具发送指令",
    "toast.electric": "已显示床铺控制菜单",
    "toast.mattress": "已隐藏床铺控制菜单",
    "toast.notificationsOn": "已开启示例通知设置",
    "toast.notificationsOff": "已关闭示例通知设置",
    "toast.privacy": "隐私详情将在系统开发阶段定义"
  }
};

const ICONS = {
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>',
  control: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16M8 5v6m8 0V5m-8 8v6m8-6v6"/></svg>',
  report: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5h16M6.5 16V9m5 7V4.5m5 11.5v-5"/><path d="m5.5 6.5 5.8-3 5.2 4.2 2.8-1.5"/></svg>',
  profile: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-3.2 3.1-5 7-5s6.3 1.8 7 5"/></svg>'
};
const SIGNAL_HEIGHTS = ["mid", "mid", "short", "short", "tall", "tall", "tall", "short", "tall", "mid", "short", "tall", "short", "tall", "short", "mid"];
const ICON_INFO = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></svg>';
const app = document.querySelector("#main-content");
const toast = document.querySelector("#toast");
let savedValues = [];
try { savedValues = JSON.parse(localStorage.getItem("sleep-prototype-presets") || "[]"); } catch { savedValues = []; }
const state = {
  page: "home", period: "daily", segment: 5, side: "left",
  language: localStorage.getItem("sleep-prototype-language") === "zh" ? "zh" : "en",
  angles: { left: { head: 12, leg: 4 }, right: { head: 0, leg: 0 } },
  device: localStorage.getItem("sleep-prototype-device") || "electric",
  notifications: localStorage.getItem("sleep-prototype-notifications") !== "off",
  saved: Array.isArray(savedValues) ? savedValues.filter((item) => item && Number.isFinite(Number(item.head)) && Number.isFinite(Number(item.leg))).map((item) => ({ head: Number(item.head), leg: Number(item.leg) })).slice(-4) : []
};

function tr(key, values = {}) {
  const template = TEXT[state.language][key] ?? TEXT.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}
function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60), rest = minutes % 60;
  if (state.language === "zh") return `${hours ? `${hours}小时` : ""}${rest ? `${rest}分钟` : ""}` || "0分钟";
  return [hours ? `${hours} hr` : "", rest ? `${rest} min` : ""].filter(Boolean).join(" ") || "0 min";
}
function formatStageDuration(minutes) {
  const hours = Math.floor(minutes / 60), rest = minutes % 60;
  if (state.language === "zh") return `${hours ? `${hours}时` : ""}${rest ? `${rest}分` : ""}` || "0分";
  return `${hours ? `${hours}h` : ""}${hours && rest ? " " : ""}${rest ? `${rest}m` : ""}` || "0m";
}
function formatMovement(record) {
  if (state.language === "zh") return record.perNight ? `每晚 ${record.movement} 次` : `${record.movement} 次`;
  return `${record.movement} ${record.perNight ? "times/night" : "times"}`;
}
function formatPosture(record) {
  const name = tr(`posture.${record.posture}`);
  return state.language === "zh" ? `${name} ${record.posturePercent}%` : `${name} ${record.posturePercent}%`;
}
function sampleFootnote(text = tr("sample.default")) {
  return `<div class="sample-note">${ICON_INFO}<span>${text}</span></div>`;
}
function dateLabel() {
  const locale = state.language === "zh" ? "zh-CN" : "en-US";
  return new Intl.DateTimeFormat(locale, { weekday: "short", month: "short", day: "numeric", timeZone: "Asia/Bangkok" }).format(new Date("2026-09-24T12:00:00+07:00"));
}
function cssName(path) {
  return `--${path.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replaceAll(".", "-").toLowerCase()}`;
}
function applyTokens(node, path = "") {
  if (!node || typeof node !== "object") return;
  if (Object.hasOwn(node, "$value")) {
    const raw = node.$value;
    let value = raw;
    if (typeof raw === "string" && /^\{[^}]+\}$/.test(raw)) value = `var(${cssName(raw.slice(1, -1))})`;
    else if (Array.isArray(raw)) value = `cubic-bezier(${raw.join(", ")})`;
    document.documentElement.style.setProperty(cssName(path), String(value));
    return;
  }
  for (const [key, child] of Object.entries(node)) if (!key.startsWith("$")) applyTokens(child, path ? `${path}.${key}` : key);
}
function localizeShell() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  document.title = tr("app.title");
  document.querySelector('meta[name="description"]').content = tr("app.description");
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = tr(node.dataset.i18n); });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => { node.setAttribute("aria-label", tr(node.dataset.i18nAria)); });
  document.querySelector("#language-select").value = state.language;
}
function navigate(page) {
  if (page === "control" && state.device !== "electric") page = "home";
  state.page = page;
  history.replaceState(null, "", `#${page}`);
  render();
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
}
function navLink(page) {
  return `<a class="nav-link ${state.page === page ? "is-active" : ""}" href="#${page}" data-page="${page}" ${state.page === page ? 'aria-current="page"' : ""}>${ICONS[page]}<span>${tr(`nav.${page}`)}</span></a>`;
}
function syncNavigation() {
  const controlLink = document.querySelector('.primary-nav [data-page="control"]');
  if (controlLink) controlLink.hidden = state.device !== "electric";
  document.querySelectorAll("[data-page]").forEach((link) => {
    const active = link.dataset.page === state.page;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
  const pages = state.device === "electric" ? ["home", "control", "report", "profile"] : ["home", "report", "profile"];
  document.querySelector("#mobile-nav").innerHTML = pages.map(navLink).join("");
  document.querySelector("#sidebar-device-title").textContent = tr(state.device === "electric" ? "device.electric" : "device.mattress");
  document.querySelector("#sidebar-device-note").textContent = tr("device.demoMode");
}
function pageHeading(title, desc, end = "") {
  return `<header class="page-heading"><div><h1>${title}</h1><p>${desc}</p></div>${end}</header>`;
}
function legend() {
  return `<div class="signal-legend" role="group" aria-label="${tr("signal.legend")}">
    <span class="legend-item"><i class="legend-dot deep"></i>${tr("stage.deep")}</span>
    <span class="legend-item"><i class="legend-dot rem"></i>${tr("stage.rem")}</span>
    <span class="legend-item"><i class="legend-dot light"></i>${tr("stage.light")}</span>
    <span class="legend-item"><i class="legend-dot awake"></i>${tr("stage.awake")}</span>
  </div>`;
}
function signalRow() {
  return DATA.stages.map((stage, i) => `<button type="button" class="signal-segment" data-segment="${i}" data-stage="${stage}" aria-pressed="${state.segment === i}" aria-label="${tr("signal.aria", { time: DATA.times[i], stage: tr(`stage.${stage}`), posture: tr(`posture.${DATA.postures[i]}`), head: DATA.angles[i][0] })}" data-height="${SIGNAL_HEIGHTS[i]}"></button>`).join("");
}
function signalInspector() {
  const i = state.segment, stage = DATA.stages[i];
  return `<div class="signal-detail" aria-live="polite">
    <strong>${DATA.times[i]}</strong>
    <div class="detail-fact"><span>${tr("signal.stage")}</span><strong class="detail-stage"><i style="background:var(--color-semantic-sleep-${stage})"></i>${tr(`stage.${stage}`)}</strong></div>
    <div class="detail-fact"><span>${tr("signal.posture")}</span><strong>${tr(`posture.${DATA.postures[i]}`)}</strong></div>
    <div class="detail-fact"><span>${tr("signal.bedAngle")}</span><strong>${tr("signal.headLeg", { head: DATA.angles[i][0], leg: DATA.angles[i][1] })}</strong></div>
  </div>`;
}
function pressureMap() {
  const shape = [0,0,0,1,1,1,1,0,0,0, 0,0,1,1,1,1,1,1,0,0, 0,1,1,1,1,1,1,1,1,0, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 0,1,1,1,1,1,1,1,1,0, 0,0,1,1,1,1,1,1,0,0, 0,0,0,1,1,1,1,0,0,0, 0,0,0,0,1,1,0,0,0,0];
  return `<div class="pressure-map" role="img" aria-label="${tr("pressure.aria")}" title="${tr("pressure.aria")}">
    ${DATA.pressure.slice(0, 90).map((level, i) => `<span class="pressure-cell ${shape[i] ? level : "is-empty"}" aria-hidden="true"></span>`).join("")}
  </div>`;
}
function pressureLegend() {
  return `<div class="pressure-legend"><span class="legend-item"><i class="legend-dot low"></i>${tr("pressure.low")}</span><span class="legend-item"><i class="legend-dot medium"></i>${tr("pressure.medium")}</span><span class="legend-item"><i class="legend-dot high"></i>${tr("pressure.high")}</span></div>`;
}
function renderHome() {
  const record = PERIODS.daily;
  return `${pageHeading(tr("home.title"), tr("home.description"), `<div class="heading-date"><strong>${tr("date.lastNight")}</strong><span>${dateLabel()}</span></div>`)}
    <section class="surface signal-section" aria-labelledby="signal-title">
      <div class="section-title"><div><h2 id="signal-title">${tr("signal.title")}</h2><p>${tr("signal.select")}</p></div><span class="label-caps">${state.language === "en" ? tr("signal.view").toUpperCase() : tr("signal.view")}</span></div>
      <div class="night-summary"><strong>${formatDuration(record.duration)}</strong><span>${tr("signal.duration")}</span></div>
      <div class="signal-head"><strong>${tr("signal.timeline")}</strong>${legend()}</div>
      <div class="signal-scroll" aria-label="${tr("signal.scroll")}"><div class="signal-row" role="group" aria-label="${tr("signal.group")}">${signalRow()}</div></div>
      <div class="time-scale"><span>23:00</span><span>01:00</span><span>03:00</span><span>05:00</span><span>06:18</span></div>
      ${signalInspector()}
      <p class="signal-footnote">${tr("signal.rangeNote")}</p>
    </section>
    <div class="home-lower">
      <section class="pressure-section" aria-labelledby="pressure-heading">
        <div class="section-title pressure-title"><div><h2 id="pressure-heading">${tr("pressure.title")}</h2><p>${tr("pressure.subtitle")}</p></div><span class="label-caps">${state.language === "en" ? tr("pressure.kicker").toUpperCase() : tr("pressure.kicker")}</span></div>
        <div class="surface pressure-wrap">${pressureMap()}<div class="pressure-axis"><span>${tr("pressure.head")}</span><span>${tr("pressure.torso")}</span><span>${tr("pressure.legs")}</span></div></div>
        ${pressureLegend()}
      </section>
      <section class="suggestion-section" aria-labelledby="suggestion-heading">
        <div class="suggestion-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4m0-12.8L17 7M7 17l-1.4 1.4"/><circle cx="12" cy="12" r="4"/></svg>${tr("suggestion.tag")}</div>
        <h3 id="suggestion-heading">${tr("suggestion.title")}</h3>
        <p>${tr("suggestion.body")}</p>
        <span class="suggestion-meta">${tr("suggestion.note")}</span>
      </section>
    </div>
    <div class="metrics-row" aria-label="${tr("metric.sleepSummary")}">
      <div class="metric"><span>${tr("metric.heart")}</span><strong>${record.heart} <small>bpm</small></strong><small>${tr("metric.sampleNight")}</small></div>
      <div class="metric"><span>${tr("metric.movement")}</span><strong>${formatMovement(record)}</strong><small>${tr("metric.sampleNight")}</small></div>
      <div class="metric"><span>${tr("metric.commonPosture")}</span><strong>${formatPosture(record)}</strong><small>${tr("metric.sampleNight")}</small></div>
    </div>${sampleFootnote()}`;
}
function periodSwitch() {
  return `<div class="period-switch" role="group" aria-label="${tr("report.period")}">${["daily", "weekly", "monthly"].map((key) => `<button class="period-button" type="button" data-period="${key}" aria-pressed="${state.period === key}">${tr(`period.${key}`)}</button>`).join("")}</div>`;
}
function chartSvg(values) {
  const width = 720, height = 180, left = 28, right = 700, top = 22, bottom = 148;
  const points = values.map((v, i) => `${left + i * (right-left)/(values.length-1)},${bottom - (v-48)*5}`).join(" ");
  return `<svg class="heart-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${tr("report.chartAria")}">
    <path class="chart-grid-line" d="M${left} 38H${right}M${left} 88H${right}M${left} 138H${right}"/>
    <path class="chart-area" d="M${points.replaceAll(" ", " L")} L${right} ${bottom} L${left} ${bottom} Z"/>
    <polyline class="chart-line" points="${points}"/>${values.map((v,i) => `<circle class="chart-point" cx="${left + i * (right-left)/(values.length-1)}" cy="${bottom - (v-48)*5}" r="4"/>`).join("")}
    <text class="chart-label" x="${left}" y="172">00:00</text><text class="chart-label" x="330" y="172" text-anchor="middle">03:00</text><text class="chart-label" x="${right}" y="172" text-anchor="end">06:00</text>
    <text class="chart-label" x="4" y="42">68</text><text class="chart-label" x="4" y="92">58</text><text class="chart-label" x="4" y="142">48</text>
  </svg>`;
}
function renderReport() {
  const record = PERIODS[state.period];
  const names = ["deep", "rem", "light", "awake"];
  const stageRows = names.map((key, i) => `<div class="stage-row"><span class="stage-name"><i class="legend-dot ${key}"></i>${tr(`stage.${key}`)}</span><div class="stage-track" role="img" aria-label="${tr("report.stageAria", { stage: tr(`stage.${key}`), percent: record.percents[i] })}"><div class="stage-fill" style="--stage-color:var(--color-semantic-sleep-${key});width:${record.percents[i]}%"></div></div><span class="stage-duration">${formatStageDuration(record.stages[i])}</span></div>`).join("");
  return `${pageHeading(tr("report.title"), tr("report.description"), periodSwitch()).replace('class="page-heading"','class="page-heading report-heading"')}
    <section class="report-summary" aria-label="${tr("report.period")}">
      <div class="metric"><span>${tr(`range.${record.range}`)}</span><strong>${formatDuration(record.duration)}</strong><small>${tr("report.duration")}</small></div>
      <div class="metric"><span>${tr("report.heart")}</span><strong>${record.heart} <small>bpm</small></strong><small>${tr("report.sample")}</small></div>
      <div class="metric"><span>${tr("report.movement")}</span><strong>${formatMovement(record)}</strong><small>${tr("report.sample")}</small></div>
    </section>
    <section class="surface report-chart" aria-labelledby="heart-title"><div class="chart-header"><h2 id="heart-title">${tr("report.chartTitle")}</h2><span>${tr("report.chartUnit")}</span></div>${chartSvg(record.chart)}</section>
    <section class="stage-breakdown" aria-labelledby="stage-title"><div class="section-title"><div><h2 id="stage-title">${tr("report.stages")}</h2><p>${tr("report.stageSubtitle")}</p></div></div>${stageRows}</section>
    <section class="stage-breakdown report-pressure" aria-labelledby="pressure-title"><div class="section-title"><div><h2 id="pressure-title">${tr("pressure.title")}</h2><p>${tr("report.pressureSubtitle")}</p></div></div>
      <div class="surface pressure-wrap">${pressureMap()}<div class="pressure-axis"><span>${tr("pressure.head")}</span><span>${tr("pressure.torso")}</span><span>${tr("pressure.legs")}</span></div></div>${pressureLegend()}</section>
    <section class="stage-breakdown" aria-labelledby="posture-title"><div class="section-title"><div><h2 id="posture-title">${tr("report.postureTitle")}</h2><p>${tr("report.postureSubtitle")}</p></div></div><div class="report-summary"><div class="metric"><span>${tr("report.commonPosture")}</span><strong>${formatPosture(record)}</strong><small>${tr("report.approx")}</small></div><div class="metric"><span>${tr("report.headRange")}</span><strong>0–12°</strong><small>${tr("report.bedSample")}</small></div><div class="metric"><span>${tr("report.legRange")}</span><strong>0–4°</strong><small>${tr("report.bedSample")}</small></div></div></section>
    <p class="report-note">${tr("report.disclaimer")}</p>${sampleFootnote()}`;
}
function slider(name, label, value) {
  return `<div class="slider-control"><div class="slider-label"><label for="${name}">${label}</label><output id="${name}-out" for="${name}">${value}°</output></div><input class="range-input" id="${name}" data-angle="${name}" type="range" min="0" max="60" step="1" value="${value}" aria-valuetext="${tr("control.angle", { value })}" style="--range-progress:${value/60*100}%"><div class="range-scale"><span>${tr("control.rangeFlat")}</span><span>60°</span></div></div>`;
}
function renderControl() {
  const angles = state.angles[state.side];
  const presets = [
    ["flat", tr("control.flat"), 0, 0], ["read", tr("control.read"), 35, 12], ["watch", tr("control.watch"), 45, 8],
    ...state.saved.map((preset, i) => [`saved-${i}`, tr("control.savedPreset", { number: i + 1 }), preset.head, preset.leg])
  ];
  const sideName = tr(`control.${state.side}`);
  return `${pageHeading(tr("control.title"), tr("control.description"))}
    <div class="control-toolbar"><div class="side-switch" role="group" aria-label="${tr("control.chooseSide")}"><button class="side-button" type="button" data-side="left" aria-pressed="${state.side === "left"}">${tr("control.left")}</button><button class="side-button" type="button" data-side="right" aria-pressed="${state.side === "right"}">${tr("control.right")}</button></div><span class="label-caps">${tr("control.simulation")}</span></div>
    <section class="surface bed-control" aria-label="${tr("control.panel")}">
      <div class="bed-visual" aria-hidden="true"><span class="bed-direction">${tr("control.head")}</span><div class="bed-outline"><div class="bed-head"><span class="bed-pillow ${state.side === "left" ? "is-selected" : ""}"></span><span class="bed-pillow ${state.side === "right" ? "is-selected" : ""}"></span></div><div class="bed-body"><span class="bed-side ${state.side === "left" ? "is-selected" : ""}"></span><span class="bed-side ${state.side === "right" ? "is-selected" : ""}"></span><i class="bed-seam"></i></div><div class="bed-legs"><span class="bed-leg ${state.side === "left" ? "is-selected" : ""}"></span><span class="bed-leg ${state.side === "right" ? "is-selected" : ""}"></span></div></div></div>
      <div><div class="section-title"><div><h2>${tr("control.sideHeading", { side: sideName })}</h2><p>${tr("control.drag")}</p></div></div><div class="slider-stack">${slider("head-angle", tr("control.headElevation"), angles.head)}${slider("leg-angle", tr("control.legElevation"), angles.leg)}</div>
        <div class="preset-row" aria-label="${tr("control.savedList")}">${presets.map(([id,label,head,leg]) => `<button type="button" class="preset-button ${angles.head === head && angles.leg === leg ? "is-selected" : ""}" data-preset="${id}" data-head="${head}" data-leg="${leg}">${label}</button>`).join("")}</div>
        <div class="control-footer"><span class="control-message" id="control-message" aria-live="polite">${tr("control.message")}</span><button type="button" class="primary-button" id="save-preset">${tr("control.save")}</button></div>
      </div>
    </section>
    <section class="control-tip"><h2>${tr("control.beforeSleep")}</h2><p>${tr("control.beforeSleepBody")}</p></section>${sampleFootnote(tr("control.sampleNote"))}`;
}
function renderProfile() {
  return `${pageHeading(tr("profile.title"), tr("profile.description"))}
    <div class="profile-layout">
      <section class="surface profile-summary"><div class="profile-avatar" aria-hidden="true">A</div><h2>${tr("profile.sampleAccount")}</h2><p>${tr("profile.prototypeData")}</p><div class="sample-note">${ICON_INFO}<span>${tr("profile.noAccount")}</span></div></section>
      <section class="surface profile-settings"><h2 class="settings-heading">${tr("profile.settings")}</h2>
        <div class="setting-row"><div class="setting-copy"><strong>${tr("profile.deviceType")}</strong><span>${tr("profile.deviceTypeHelp")}</span></div><div class="device-options" role="group" aria-label="${tr("profile.chooseDevice")}"><button class="device-option" type="button" data-device="electric" aria-pressed="${state.device === "electric"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17V8m0 6h18v-4a3 3 0 0 0-3-3h-5a3 3 0 0 0-3 3v4M3 20v-3m18 3v-3"/></svg>${tr("profile.bedAndMattress")}</button><button class="device-option" type="button" data-device="mattress" aria-pressed="${state.device === "mattress"}">${tr("profile.mattressOnly")}</button></div></div>
        <div class="setting-row"><div class="setting-copy"><strong>${tr("profile.notifications")}</strong><span>${tr("profile.notificationsHelp")}</span></div><button class="toggle-button" type="button" role="switch" aria-checked="${state.notifications}" aria-label="${tr("profile.toggleNotifications")}"></button></div>
        <div class="setting-row"><div class="setting-copy"><strong>${tr("profile.privacy")}</strong><span>${tr("profile.privacyHelp")}</span></div><button class="quiet-button" type="button" data-action="privacy">${tr("profile.details")}</button></div>
        <p class="profile-note">${tr("profile.note")}</p>
      </section>
    </div>${state.device === "mattress" ? `<div class="control-tip"><h2>${tr("profile.mattressMode")}</h2><p>${tr("profile.mattressModeBody")}</p></div>` : ""}${sampleFootnote()}`;
}
function render() {
  localizeShell();
  syncNavigation();
  app.innerHTML = state.page === "home" ? renderHome() : state.page === "control" ? renderControl() : state.page === "report" ? renderReport() : renderProfile();
}
function updateAngle(key, value) {
  state.angles[state.side][key] = Number(value);
  renderControlPreservingFocus(key);
}
function renderControlPreservingFocus(key) {
  const current = document.activeElement;
  if (current?.matches(".range-input")) {
    const input = current, output = document.querySelector(`#${key === "head" ? "head-angle" : "leg-angle"}-out`);
    if (output) output.textContent = `${input.value}°`;
    input.setAttribute("aria-valuetext", tr("control.angle", { value: input.value }));
    input.style.setProperty("--range-progress", `${Number(input.value)/60*100}%`);
    document.querySelectorAll(".preset-button").forEach((button) => button.classList.remove("is-selected"));
    document.querySelector("#control-message").textContent = tr("control.angleUpdated");
    document.querySelectorAll(".bed-side").forEach((el, i) => el.classList.toggle("is-selected", state.side === (i === 0 ? "left" : "right")));
  }
}
let toastTimer;
function showToast(message) {
  toast.textContent = message; toast.classList.add("is-visible");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}
function savePreset() {
  state.saved.push({ head: state.angles[state.side].head, leg: state.angles[state.side].leg });
  state.saved = state.saved.slice(-4);
  localStorage.setItem("sleep-prototype-presets", JSON.stringify(state.saved));
  render();
  const label = tr("control.savedPreset", { number: state.saved.length });
  document.querySelector("#control-message").textContent = tr("control.savedMessage", { label });
}
function updatePeriod(period) { state.period = period; render(); }

document.querySelector("#language-select").addEventListener("change", (event) => {
  state.language = event.target.value === "zh" ? "zh" : "en";
  localStorage.setItem("sleep-prototype-language", state.language);
  render();
});
document.addEventListener("click", (event) => {
  const segment = event.target.closest("[data-segment]");
  if (segment) { state.segment = Number(segment.dataset.segment); render(); return; }
  const page = event.target.closest("[data-page]");
  if (page) { event.preventDefault(); navigate(page.dataset.page); return; }
  const period = event.target.closest("[data-period]");
  if (period) { updatePeriod(period.dataset.period); return; }
  const side = event.target.closest("[data-side]");
  if (side) { state.side = side.dataset.side; render(); return; }
  const preset = event.target.closest("[data-preset]");
  if (preset) { state.angles[state.side] = { head: Number(preset.dataset.head), leg: Number(preset.dataset.leg) }; render(); return; }
  const save = event.target.closest("#save-preset");
  if (save) { savePreset(); showToast(tr("control.saveToast")); return; }
  const device = event.target.closest("[data-device]");
  if (device) {
    state.device = device.dataset.device; localStorage.setItem("sleep-prototype-device", state.device);
    if (state.device === "mattress" && state.page === "control") state.page = "home";
    render(); showToast(tr(state.device === "electric" ? "toast.electric" : "toast.mattress")); return;
  }
  const toggle = event.target.closest(".toggle-button");
  if (toggle) { state.notifications = !state.notifications; localStorage.setItem("sleep-prototype-notifications", state.notifications ? "on" : "off"); toggle.setAttribute("aria-checked", String(state.notifications)); showToast(tr(state.notifications ? "toast.notificationsOn" : "toast.notificationsOff")); return; }
  if (event.target.closest('[data-action="privacy"]')) showToast(tr("toast.privacy"));
});
document.addEventListener("input", (event) => {
  const input = event.target.closest("[data-angle]");
  if (!input) return;
  updateAngle(input.dataset.angle === "head-angle" ? "head" : "leg", input.value);
});
window.addEventListener("hashchange", () => {
  const next = location.hash.slice(1);
  if (["home", "control", "report", "profile"].includes(next) && !(next === "control" && state.device !== "electric")) { state.page = next; render(); }
});

fetch("./design-tokens.json").then((response) => {
  if (!response.ok) throw new Error("Failed to load design tokens");
  return response.json();
}).then((tokens) => {
  applyTokens(tokens);
  document.querySelector('meta[name="theme-color"]').content = tokens.color.primitive.navy["950"].$value;
  const initial = location.hash.slice(1);
  if (["home", "control", "report", "profile"].includes(initial) && !(initial === "control" && state.device !== "electric")) state.page = initial;
  render();
}).catch((error) => {
  document.querySelector("#main-content").innerHTML = `<section class="surface signal-section"><h1>${tr("app.errorTitle")}</h1><p>${tr("app.errorText")}</p><p>${error.message}</p></section>`;
});
