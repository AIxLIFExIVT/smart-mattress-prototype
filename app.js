const DATA = {
  stages: ["light", "light", "deep", "deep", "light", "rem", "light", "deep", "light", "rem", "rem", "light", "deep", "light", "awake", "light"],
  times: ["23:00", "23:27", "23:54", "00:21", "00:48", "01:15", "01:42", "02:09", "02:36", "03:03", "03:30", "03:57", "04:24", "04:51", "05:18", "05:45"],
  postures: ["back", "back", "leftSide", "leftSide", "rightSide", "rightSide", "back", "back", "leftSide", "leftSide", "leftSide", "back", "back", "rightSide", "moving", "back"],
  angles: [[0, 0], [0, 0], [2, 0], [2, 1], [0, 0], [1, 0], [0, 0], [0, 0], [0, 0], [1, 0], [1, 0], [0, 0], [0, 0], [0, 0], [3, 1], [0, 0]],
  pressure: ["low","low","low","medium","low","low","low","low","medium","medium","low","low","low","medium","low","low","low","medium","high","medium","low","low","medium","high","medium","low","low","medium","high","high","medium","low","low","medium","medium","high","medium","medium","low","low","low","medium","high","medium","low","low","low","medium","medium","low","low","low","low","medium","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low","low"]
};

const AIR_ZONES = ["upper", "middle", "lower"];
// Editable demonstration data only. Confirm unit, limits, sensor scale, and
// readings with the hardware team before using these values outside the mock.
const MOCK_BED_CONFIG = {
  pressure: {
    unit: "PSI",
    min: 0,
    max: 80,
    step: 1,
    rawMax: 256,
    targets: { upper: 50, middle: 55, lower: 60 },
    current: {
      left: { upper: 49, middle: 54, lower: 59 },
      right: { upper: 50, middle: 53, lower: 58 }
    },
    raw: {
      left: { upper: 128, middle: 156, lower: 184 },
      right: { upper: 132, middle: 151, lower: 179 }
    }
  }
};
const AIR_DEFAULT_TARGETS = MOCK_BED_CONFIG.pressure.targets;
const AIR_RAW_READINGS = MOCK_BED_CONFIG.pressure.raw;
const AIR_CURRENT_PSI = MOCK_BED_CONFIG.pressure.current;

function defaultPositionProfiles() {
  return [
    { id: "sleep", nameKey: "control.profileSleep", name: "Sleep", builtin: true, angles: { left: { head: 0, leg: 0 }, right: { head: 0, leg: 0 } }, airTargets: { ...AIR_DEFAULT_TARGETS }, airMode: "auto" },
    { id: "reading", nameKey: "control.profileReading", name: "Reading", builtin: true, angles: { left: { head: 35, leg: 12 }, right: { head: 35, leg: 12 } }, airTargets: { ...AIR_DEFAULT_TARGETS }, airMode: "manual" },
    { id: "tv", nameKey: "control.profileTv", name: "TV", builtin: true, angles: { left: { head: 45, leg: 8 }, right: { head: 45, leg: 8 } }, airTargets: { ...AIR_DEFAULT_TARGETS }, airMode: "manual" }
  ];
}

function readPositionProfiles() {
  const defaults = defaultPositionProfiles();
  try {
    const saved = JSON.parse(localStorage.getItem("sleep-prototype-position-profiles") || "null");
    if (!Array.isArray(saved) || !saved.length) {
      const legacy = JSON.parse(localStorage.getItem("sleep-prototype-presets") || "[]");
      if (!Array.isArray(legacy)) return defaults;
      const migrated = legacy.filter((item) => item && Number.isFinite(Number(item.head)) && Number.isFinite(Number(item.leg))).map((item, index) => ({
        id: `legacy-${index + 1}`,
        name: `Saved ${index + 1}`,
        nameKey: "",
        builtin: false,
        angles: { left: { head: Number(item.head), leg: Number(item.leg) }, right: { head: Number(item.head), leg: Number(item.leg) } },
        airTargets: { ...defaults[0].airTargets, ...(item.air || {}) },
        airMode: "manual"
      }));
      return [...defaults, ...migrated];
    }
    const normalized = saved.filter((item) => item && typeof item.id === "string" && typeof item.name === "string").map((item) => ({
      id: item.id,
      name: item.name,
      nameKey: item.nameKey || "",
      builtin: Boolean(item.builtin),
      angles: {
        left: { head: Number(item.angles?.left?.head) || 0, leg: Number(item.angles?.left?.leg) || 0 },
        right: { head: Number(item.angles?.right?.head) || 0, leg: Number(item.angles?.right?.leg) || 0 }
      },
      airTargets: Object.fromEntries(AIR_ZONES.map((zone) => [zone, Number.isFinite(Number(item.airTargets?.[zone])) ? Number(item.airTargets[zone]) : AIR_DEFAULT_TARGETS[zone]])),
      airMode: item.airMode === "manual" ? "manual" : "auto"
    }));
    for (const profile of defaults) if (!normalized.some((item) => item.id === profile.id)) normalized.unshift(profile);
    return normalized;
  } catch {
    return defaults;
  }
}

function cloneSetting(value) {
  return JSON.parse(JSON.stringify(value));
}

const loadedProfiles = readPositionProfiles();
const initialProfileId = localStorage.getItem("sleep-prototype-selected-profile") || "sleep";
const initialProfile = loadedProfiles.find((item) => item.id === initialProfileId) || loadedProfiles[0];

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
    "app.brandPending": "Sleep system demo",
    "app.mainBedroom": "Main bedroom",
    "app.sampleData": "Sample data",
    "app.sampleOnly": "Sample data only",
    "app.mobileNav": "Mobile navigation",
    "app.goProfile": "Go to account and settings",
    "preview.group": "Preview mode",
    "preview.web": "Web",
    "preview.phone": "iPhone",
    "preview.ipad": "iPad",
    "preview.view": "Device preview",
    "preview.frameTitle": "Smart Sleep Bed device interface preview",
    "preview.note": "Device preview · sample data only",
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
    "pressure.matIncluded": "Mat sensor included · simulated data",
    "pressure.noMatPreview": "Preview only · no mat sensor selected",
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
    "report.postureTitle": "Posture and bed angles",
    "report.postureSubtitle": "Patterns in the sample data",
    "report.commonPosture": "Common posture",
    "report.approx": "Approximate",
    "report.headRange": "Head elevation range",
    "report.legRange": "Leg elevation range",
    "report.bedSample": "Sample bed adjustment",
    "report.disclaimer": "All values are generated to demonstrate the report. Real devices may show different data and accuracy.",
    "control.title": "Bed control",
    "control.description": "Adjust the bed angle and the six body-support air cells. This is a configurable demonstration.",
    "control.modelLabel": "Demonstration bed model",
    "control.modelSplit": "Independent left / right motors",
    "control.modelShared": "Linked left / right motors",
    "control.sensorLabel": "Body pressure mat",
    "control.sensorIncluded": "Sensor included · demo",
    "control.sensorPreview": "Preview only · no sensor",
    "control.modelNote": "Bed model, units, limits, and sensor feedback are demo settings pending hardware confirmation.",
    "control.modelSplitStatus": "Head and foot angles are shown independently for each side in this model preview.",
    "control.modelSharedStatus": "Head and foot angles are linked across both sides in this model preview.",
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
    "control.angleSummary": "Sample angle readout · iPad display only",
    "control.flat": "Flat",
    "control.read": "Reading",
    "control.watch": "Watch TV",
    "control.savedPreset": "Saved {number}",
    "control.savedList": "Saved bed positions",
    "control.rangeFlat": "0° Flat",
    "control.angle": "{value} degrees",
    "control.message": "Adjust a level to preview the screen",
    "control.angleUpdated": "Sample angle updated",
    "control.save": "Save setting",
    "control.savedMessage": "Updated “{label}” in this prototype",
    "control.saveToast": "Position setting saved in this prototype",
    "control.beforeSleep": "Before sleep",
    "control.beforeSleepBody": "After reading or watching TV, set both the Head and Foot angles to 0° for a level bed. This prototype does not control a real bed.",
    "control.sampleNote": "Buttons and angles simulate bed controls for UI evaluation",
    "control.bedDiagram": "Six body-support air cells",
    "control.zoneHead": "Head motor",
    "control.zoneBody": "Six body air cells",
    "control.zoneLegs": "Foot motor",
    "control.airCellGroup": "Six air cells arranged as three paired zones",
    "control.airCellHelp": "The six cells sit in the center body area. Select either cell to adjust its shared pair.",
    "control.airCellReadOnlyHelp": "The six cells sit in the center body area, arranged as three pairs with one shared target per pair.",
    "control.cellAria": "{side} air cell in the {zone} pair. Both cells use one shared target.",
    "control.airSupport": "Body air support",
    "control.airPairLabel": "Paired air cells",
    "control.airPairHelp": "Each zone contains two cells with one shared target setting.",
    "control.airMode": "Adjustment mode",
    "control.autoMode": "Automatic",
    "control.manualMode": "Manual",
    "control.autoHelp": "Automatic behavior is simulated from editable demo values; no pump is connected.",
    "control.manualHelp": "Adjust the selected pair's example target. This changes the prototype only.",
    "control.runAuto": "Preview automatic adjustment",
    "control.zoneUpper": "Upper",
    "control.zoneMiddle": "Middle",
    "control.zoneLower": "Lower",
    "control.zonePicker": "Choose an air-cell zone",
    "control.targetPressure": "Target pressure",
    "control.samplePressure": "Sample reading",
    "control.mockRange": "Editable example range · not hardware-confirmed",
    "control.rawScale": "Editable sensor and pressure examples · mock only",
    "control.mockValues": "Demo values · unit and range need hardware confirmation",
    "control.readingLeft": "Left cell sample",
    "control.readingRight": "Right cell sample",
    "control.heatmapTitle": "Body pressure heat map",
    "control.heatmapAvailable": "Mat sensor included · simulated data",
    "control.heatmapPreview": "Full feature preview · sensor not included in this model",
    "control.heatmapNote": "This body-position map is separate from the six air-cell readings.",
    "control.apiTitle": "Device feedback",
    "control.apiMock": "Mock response · no hardware or API is connected",
    "control.apiState": "Command status",
    "control.apiAccepted": "Example response · simulated",
    "control.apiUpdated": "Example response · simulated",
    "control.apiTarget": "Requested target",
    "control.apiReading": "Returned sample",
    "control.aiTitle": "How data could improve bed support",
    "control.aiLabel": "AI insight · illustrative example",
    "control.aiSignal": "Sample signal",
    "control.aiPattern": "Repeated sample readings in the middle pair differed from the saved target.",
    "control.aiRecommendation": "Review a small manual adjustment, then compare later sample readings.",
    "control.aiAction": "Review in manual controls",
    "control.aiFlow": "Collect sample readings → look for a repeated pattern → suggest a change → user reviews it",
    "control.aiToast": "Middle pair selected for your review",
    "control.autoToast": "Automatic adjustment preview restored",
    "control.feedbackNote": "This is a mock response example, not a real API acknowledgement.",
    "control.profileLabel": "Position profile",
    "control.profileSleep": "Sleep",
    "control.profileReading": "Reading",
    "control.profileTv": "TV",
    "control.profileUnsaved": "Unsaved changes",
    "control.profileSaved": "Saved setting",
    "control.updateProfile": "Update selected profile",
    "control.saveAsNew": "Save as new profile",
    "control.profileName": "Profile name",
    "control.profileNamePlaceholder": "For example, Side sleep",
    "control.createProfile": "Save new profile",
    "control.cancel": "Cancel",
    "control.profileNameError": "Enter a name that is not already in use.",
    "control.profileCreated": "New position profile saved",
    "control.profileDeleted": "Custom profile removed",
    "control.deleteProfile": "Delete this custom profile",
    "control.profileCurrent": "Selected profile: {name}",
    "control.zonePair": "{zone} pair",
    "control.readOnly": "iPad display · read only",
    "control.angleReadout": "Head {head}° · Foot {foot}°",
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
    "app.brandPending": "智能睡眠演示",
    "app.mainBedroom": "主卧室",
    "app.sampleData": "示例数据",
    "app.sampleOnly": "仅供演示的数据",
    "app.mobileNav": "移动端导航",
    "app.goProfile": "前往账户与设置",
    "preview.group": "预览模式",
    "preview.web": "网页",
    "preview.phone": "iPhone",
    "preview.ipad": "iPad",
    "preview.view": "设备预览",
    "preview.frameTitle": "智能睡眠床设备界面预览",
    "preview.note": "设备界面预览 · 仅演示数据",
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
    "pressure.matIncluded": "包含传感垫 · 模拟数据",
    "pressure.noMatPreview": "仅供预览 · 未选择传感垫",
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
    "report.postureTitle": "睡姿与床体角度",
    "report.postureSubtitle": "示例数据中的睡姿规律",
    "report.commonPosture": "常见睡姿",
    "report.approx": "约",
    "report.headRange": "床头抬升范围",
    "report.legRange": "床尾抬升范围",
    "report.bedSample": "床体调节示例",
    "report.disclaimer": "所有数值均为报告演示数据。实际设备显示的数据与准确度可能不同。",
    "control.title": "床铺控制",
    "control.description": "调节床体角度与六个身体支撑气囊。本页面为可配置的演示界面。",
    "control.modelLabel": "演示床型",
    "control.modelSplit": "左右电机独立控制",
    "control.modelShared": "左右电机联动控制",
    "control.sensorLabel": "身体压力传感垫",
    "control.sensorIncluded": "包含传感器 · 演示",
    "control.sensorPreview": "仅预览 · 无传感器",
    "control.modelNote": "床型、单位、范围和传感器反馈均为演示设置，等待硬件确认。",
    "control.modelSplitStatus": "此型号预览中，床头与床尾角度可按左右两侧分别调节。",
    "control.modelSharedStatus": "此型号预览中，左右两侧的床头与床尾角度联动。",
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
    "control.angleSummary": "示例角度读数 · 仅供 iPad 展示",
    "control.flat": "平躺",
    "control.read": "阅读",
    "control.watch": "看电视",
    "control.savedPreset": "已保存 {number}",
    "control.savedList": "已保存的床体姿势",
    "control.rangeFlat": "0° 平躺",
    "control.angle": "{value} 度",
    "control.message": "调节角度以预览界面",
    "control.angleUpdated": "示例角度已更新",
    "control.save": "保存设置",
    "control.savedMessage": "已在此原型中更新“{label}”",
    "control.saveToast": "床体姿势设置已保存到此原型",
    "control.beforeSleep": "睡前小提示",
    "control.beforeSleepBody": "阅读或看电视后，将床头和床尾角度都调至 0°，让床面恢复水平。此原型不会控制真实床具。",
    "control.sampleNote": "按钮和角度为界面评估用的模拟控制",
    "control.bedDiagram": "六个身体支撑气囊",
    "control.zoneHead": "床头电机",
    "control.zoneBody": "六个身体气囊",
    "control.zoneLegs": "床尾电机",
    "control.airCellGroup": "六个气囊分为三个成对区域",
    "control.airCellHelp": "六个气囊位于身体中部。选择任意气囊即可调节对应的一对。",
    "control.airCellReadOnlyHelp": "六个气囊位于身体中部，分为三个气囊对，每对共用一个目标值。",
    "control.cellAria": "{zone}气囊对中的{side}气囊。两个气囊共用一个目标值。",
    "control.airSupport": "身体气囊支撑",
    "control.airPairLabel": "成对气囊",
    "control.airPairHelp": "每个区域由两个气囊组成，并共用一个目标值。",
    "control.airMode": "调节模式",
    "control.autoMode": "自动",
    "control.manualMode": "手动",
    "control.autoHelp": "自动模式使用可编辑的演示数据模拟，不会控制真实气泵。",
    "control.manualHelp": "调整所选气囊对的示例目标值，仅会改变此原型。",
    "control.runAuto": "预览自动调节",
    "control.zoneUpper": "上部",
    "control.zoneMiddle": "中部",
    "control.zoneLower": "下部",
    "control.zonePicker": "选择气囊区域",
    "control.targetPressure": "目标压力",
    "control.samplePressure": "示例读数",
    "control.mockRange": "可编辑的示例范围 · 尚未经过硬件确认",
    "control.rawScale": "传感器与压力示例值 · 仅供模拟",
    "control.mockValues": "演示数据 · 单位和范围仍需硬件确认",
    "control.readingLeft": "左侧气囊示例值",
    "control.readingRight": "右侧气囊示例值",
    "control.heatmapTitle": "身体压力热力图",
    "control.heatmapAvailable": "包含传感垫 · 模拟数据",
    "control.heatmapPreview": "完整功能预览 · 此型号未包含传感垫",
    "control.heatmapNote": "身体位置热力图与六个气囊的压力读数是不同的数据。",
    "control.apiTitle": "设备反馈",
    "control.apiMock": "模拟响应 · 未连接硬件或 API",
    "control.apiState": "指令状态",
    "control.apiAccepted": "示例响应 · 模拟",
    "control.apiUpdated": "示例响应 · 模拟",
    "control.apiTarget": "请求目标",
    "control.apiReading": "返回示例值",
    "control.aiTitle": "数据可以如何改善床体支撑",
    "control.aiLabel": "AI 分析示例 · 仅供展示",
    "control.aiSignal": "示例信号",
    "control.aiPattern": "示例数据中，中部气囊对的多次读数与已保存目标存在差异。",
    "control.aiRecommendation": "可先手动检查并微调，然后比较之后的示例读数。",
    "control.aiAction": "在手动控制中查看",
    "control.aiFlow": "收集读数 → 识别重复规律 → 建议小幅调整 → 由用户确认",
    "control.aiToast": "已选中中部气囊对，供您查看",
    "control.autoToast": "已恢复自动调节预览",
    "control.feedbackNote": "此处为模拟响应示例，并非真实 API 确认。",
    "control.profileLabel": "床体姿势配置",
    "control.profileSleep": "睡眠",
    "control.profileReading": "阅读",
    "control.profileTv": "看电视",
    "control.profileUnsaved": "有未保存的更改",
    "control.profileSaved": "已保存的设置",
    "control.updateProfile": "更新所选配置",
    "control.saveAsNew": "另存为新配置",
    "control.profileName": "配置名称",
    "control.profileNamePlaceholder": "例如：侧睡",
    "control.createProfile": "保存新配置",
    "control.cancel": "取消",
    "control.profileNameError": "请输入一个尚未使用的名称。",
    "control.profileCreated": "新的床体姿势配置已保存",
    "control.profileDeleted": "已删除自定义配置",
    "control.deleteProfile": "删除此自定义配置",
    "control.profileCurrent": "当前配置：{name}",
    "control.zonePair": "{zone}气囊对",
    "control.readOnly": "iPad 展示 · 只读",
    "control.angleReadout": "床头 {head}° · 床尾 {foot}°",
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
const phonePreviewView = document.querySelector("#phone-preview-view");
const phonePreviewStage = document.querySelector(".phone-preview-stage");
const phonePreviewDevice = document.querySelector(".phone-device");
const phonePreviewFrame = document.querySelector(".phone-screen");
const previewModeButtons = [...document.querySelectorAll("[data-preview-mode]")];
const previewQuery = new URLSearchParams(location.search);
if (previewQuery.has("phonePreview") || previewQuery.has("tabletPreview")) document.documentElement.classList.add("device-preview-mode");
if (previewQuery.has("phonePreview")) document.documentElement.classList.add("phone-preview-mode");
if (previewQuery.has("tabletPreview")) document.documentElement.classList.add("tablet-preview-mode");
const state = {
  page: "home", period: "daily", segment: 5, side: "left",
  language: localStorage.getItem("sleep-prototype-language") === "zh" ? "zh" : "en",
  angles: cloneSetting(initialProfile.angles),
  bedModel: "split", heatmapSensor: true, airMode: "auto", airZone: "middle",
  airTargets: { ...initialProfile.airTargets },
  profiles: loadedProfiles, selectedProfileId: initialProfile.id, profileDirty: false,
  device: localStorage.getItem("sleep-prototype-device") || "electric",
  notifications: localStorage.getItem("sleep-prototype-notifications") !== "off"
};
state.airMode = initialProfile.airMode;

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
  document.querySelectorAll("[data-i18n-title]").forEach((node) => { node.setAttribute("title", tr(node.dataset.i18nTitle)); });
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
        <div class="section-title pressure-title"><div><h2 id="pressure-heading">${tr("pressure.title")}</h2><p>${tr(state.heatmapSensor ? "pressure.matIncluded" : "pressure.noMatPreview")}</p></div><span class="label-caps">${state.language === "en" ? tr("pressure.kicker").toUpperCase() : tr("pressure.kicker")}</span></div>
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
    <section class="stage-breakdown report-pressure" aria-labelledby="pressure-title"><div class="section-title"><div><h2 id="pressure-title">${tr("pressure.title")}</h2><p>${tr(state.heatmapSensor ? "pressure.matIncluded" : "pressure.noMatPreview")}</p></div></div>
      <div class="surface pressure-wrap">${pressureMap()}<div class="pressure-axis"><span>${tr("pressure.head")}</span><span>${tr("pressure.torso")}</span><span>${tr("pressure.legs")}</span></div></div>${pressureLegend()}</section>
    <section class="stage-breakdown" aria-labelledby="posture-title"><div class="section-title"><div><h2 id="posture-title">${tr("report.postureTitle")}</h2><p>${tr("report.postureSubtitle")}</p></div></div><div class="report-summary"><div class="metric"><span>${tr("report.commonPosture")}</span><strong>${formatPosture(record)}</strong><small>${tr("report.approx")}</small></div><div class="metric"><span>${tr("report.headRange")}</span><strong>0–12°</strong><small>${tr("report.bedSample")}</small></div><div class="metric"><span>${tr("report.legRange")}</span><strong>0–4°</strong><small>${tr("report.bedSample")}</small></div></div></section>
    <p class="report-note">${tr("report.disclaimer")}</p>${sampleFootnote()}`;
}
function slider(name, label, value) {
  return `<div class="slider-control"><div class="slider-label"><label for="${name}">${label}</label><output id="${name}-out" for="${name}">${value}°</output></div><input class="range-input" id="${name}" data-angle="${name}" type="range" min="0" max="60" step="1" value="${value}" aria-valuetext="${tr("control.angle", { value })}" style="--range-progress:${value/60*100}%"><div class="range-scale"><span>${tr("control.rangeFlat")}</span><span>60°</span></div></div>`;
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function renderAirCell(side, zone, presentation = false) {
  const selected = state.airZone === zone;
  const zoneKey = `control.zone${zone[0].toUpperCase()}${zone.slice(1)}`;
  const sideMark = state.language === "zh" ? (side === "left" ? "左" : "右") : side[0].toUpperCase();
  const ariaLabel = tr("control.cellAria", { side: tr(`control.${side}`), zone: tr(zoneKey) });
  return presentation
    ? `<span class="air-cell ${selected ? "is-selected" : ""}" role="img" aria-label="${ariaLabel}"><span class="air-cell-mark">${sideMark}</span></span>`
    : `<button type="button" class="air-cell ${selected ? "is-selected" : ""}" data-air-cell="${side}.${zone}" data-side="${side}" data-zone="${zone}" aria-pressed="${selected}" aria-label="${ariaLabel}"><span class="air-cell-mark">${sideMark}</span></button>`;
}
function renderControl() {
  const shared = state.bedModel === "shared";
  const presentation = document.documentElement.classList.contains("tablet-preview-mode");
  const angles = state.angles[state.side];
  const targets = state.airTargets;
  const target = targets[state.airZone];
  const currentLeft = AIR_CURRENT_PSI.left[state.airZone];
  const currentRight = AIR_CURRENT_PSI.right[state.airZone];
  const rawLeft = AIR_RAW_READINGS.left[state.airZone];
  const rawRight = AIR_RAW_READINGS.right[state.airZone];
  const pressure = MOCK_BED_CONFIG.pressure;
  const zoneKey = `control.zone${state.airZone[0].toUpperCase()}${state.airZone.slice(1)}`;
  const activeProfile = state.profiles.find((profile) => profile.id === state.selectedProfileId) || state.profiles[0];
  const profileName = (profile) => profile.nameKey ? tr(profile.nameKey) : escapeHtml(profile.name);
  const selectedProfileName = profileName(activeProfile);
  const targetProgress = (target - pressure.min) / Math.max(1, pressure.max - pressure.min) * 100;
  const selectedSide = (side) => shared || state.side === side;
  return `${pageHeading(tr("control.title"), tr("control.description"))}
    <div class="bed-model-toolbar">
      ${presentation ? `<span class="demo-badge">${tr("control.modelLabel")}: ${tr(shared ? "control.modelShared" : "control.modelSplit")}</span><span class="demo-badge">${tr("control.sensorLabel")}: ${tr(state.heatmapSensor ? "control.sensorIncluded" : "control.sensorPreview")}</span>` : `<div class="bed-model-settings">
        <div class="bed-model-picker"><label for="bed-model">${tr("control.modelLabel")}</label><select id="bed-model" data-bed-model aria-label="${tr("control.modelLabel")}"><option value="split" ${!shared ? "selected" : ""}>${tr("control.modelSplit")}</option><option value="shared" ${shared ? "selected" : ""}>${tr("control.modelShared")}</option></select></div>
        <div class="bed-model-picker"><label for="heatmap-sensor">${tr("control.sensorLabel")}</label><select id="heatmap-sensor" data-heatmap-sensor aria-label="${tr("control.sensorLabel")}"><option value="included" ${state.heatmapSensor ? "selected" : ""}>${tr("control.sensorIncluded")}</option><option value="preview" ${!state.heatmapSensor ? "selected" : ""}>${tr("control.sensorPreview")}</option></select></div>
      </div>`}
      <span class="demo-badge">${tr("control.simulation")}</span>
    </div>
    <p class="bed-model-note">${tr("control.modelNote")}</p>
    <section class="surface profile-control" aria-label="${tr("control.profileLabel")}">
      <div class="profile-picker">
        ${presentation ? `<span class="profile-label">${tr("control.profileLabel")}</span><strong class="profile-display">${selectedProfileName}</strong>` : `<label for="position-profile">${tr("control.profileLabel")}</label><select id="position-profile" data-position-profile aria-label="${tr("control.profileLabel")}">${state.profiles.map((profile) => `<option value="${escapeHtml(profile.id)}" ${profile.id === state.selectedProfileId ? "selected" : ""}>${profileName(profile)}</option>`).join("")}</select>`}
        <span class="profile-state ${state.profileDirty ? "is-dirty" : ""}" aria-live="polite">${tr(state.profileDirty ? "control.profileUnsaved" : "control.profileSaved")}</span>
      </div>
      ${presentation ? `<span class="demo-badge">${tr("control.readOnly")}</span>` : `<details class="profile-save-menu">
        <summary class="primary-button">${tr("control.save")}</summary>
        <div class="profile-save-options">
          <button type="button" class="quiet-button" data-action="save-profile">${tr("control.updateProfile")}: ${selectedProfileName}</button>
          <button type="button" class="quiet-button" data-action="open-profile-form">${tr("control.saveAsNew")}</button>
          ${!activeProfile.builtin ? `<button type="button" class="quiet-button danger-action" data-action="delete-profile">${tr("control.deleteProfile")}</button>` : ""}
          <form class="profile-create-form" id="profile-create-form" hidden>
            <label for="profile-name">${tr("control.profileName")}</label>
            <input id="profile-name" name="profile-name" type="text" maxlength="32" placeholder="${tr("control.profileNamePlaceholder")}" autocomplete="off" aria-describedby="profile-name-error">
            <p class="profile-name-error" id="profile-name-error" hidden>${tr("control.profileNameError")}</p>
            <div class="profile-form-actions"><button class="primary-button" type="submit">${tr("control.createProfile")}</button><button class="quiet-button" type="button" data-action="cancel-profile-form">${tr("control.cancel")}</button></div>
          </form>
        </div>
      </details>`}
    </section>
    <div class="bed-detail-grid">
      <section class="surface bed-anatomy-card" aria-label="${tr("control.bedDiagram")}">
        <div class="section-title"><div><h2>${tr("control.bedDiagram")}</h2><p>${tr(presentation ? "control.airCellReadOnlyHelp" : "control.airCellHelp")}</p></div></div>
        <div class="bed-visual bed-visual-control">
          <span class="bed-direction">↑ ${tr("control.head")}</span>
          <div class="bed-outline bed-outline-control">
            <div class="bed-head"><span class="bed-pillow ${selectedSide("left") ? "is-selected" : ""}" aria-label="${tr("control.zoneHead")}"></span><span class="bed-pillow ${selectedSide("right") ? "is-selected" : ""}" aria-hidden="true"></span></div>
            <div class="bed-body"><div class="air-cell-grid" role="group" aria-label="${tr("control.airCellGroup")}">${AIR_ZONES.map((zone) => `<div class="air-cell-row" role="group" aria-label="${tr(`control.zone${zone[0].toUpperCase()}${zone.slice(1)}`)}">${["left", "right"].map((side) => renderAirCell(side, zone, presentation)).join("")}</div>`).join("")}</div></div>
            <div class="bed-legs"><span class="bed-leg ${selectedSide("left") ? "is-selected" : ""}"></span><span class="bed-leg ${selectedSide("right") ? "is-selected" : ""}"></span></div>
          </div>
          <span class="bed-direction">${tr("control.zoneLegs")}</span>
        </div>
        <div class="bed-map-legend"><span><i class="legend-dot motor-dot"></i>${tr("control.zoneHead")}</span><span><i class="legend-dot air-dot"></i>${tr("control.zoneBody")}</span><span><i class="legend-dot motor-dot"></i>${tr("control.zoneLegs")}</span></div>
        <p class="bed-model-status">${tr(shared ? "control.modelSharedStatus" : "control.modelSplitStatus")}</p>
      </section>
      <section class="surface bed-motion-card" aria-label="${tr("control.panel")}">
        <div class="section-title"><div><h2>${tr("control.panel")}</h2><p>${tr(presentation ? "control.angleSummary" : "control.drag")}</p></div></div>
        ${presentation ? `<div class="angle-readout-grid">${(shared ? ["left"] : ["left", "right"]).map((side) => `<div class="angle-readout"><strong>${tr(`control.${side}`)}</strong><span>${tr("control.angleReadout", { head: state.angles[side].head, foot: state.angles[side].leg })}</span></div>`).join("")}</div>` : `${shared ? `<p class="linked-side-note">${tr("control.modelSharedStatus")}</p>` : `<div class="side-switch" role="group" aria-label="${tr("control.chooseSide")}"><button class="side-button" type="button" data-side-control="motor" data-side="left" aria-pressed="${state.side === "left"}">${tr("control.left")}</button><button class="side-button" type="button" data-side-control="motor" data-side="right" aria-pressed="${state.side === "right"}">${tr("control.right")}</button></div>`}
          <h3 class="control-subheading">${tr("control.zoneHead")}</h3>
          <div class="slider-stack">${slider("head-angle", tr("control.headElevation"), angles.head)}</div>
          <h3 class="control-subheading">${tr("control.zoneLegs")}</h3>
          <div class="slider-stack">${slider("leg-angle", tr("control.legElevation"), angles.leg)}</div>
          <p class="control-message" id="control-message" aria-live="polite">${tr("control.message")}</p>`}
      </section>
    </div>
    <section class="surface air-support-panel" aria-labelledby="air-support-title">
      <div class="section-title"><div><h2 id="air-support-title">${tr("control.airSupport")}</h2><p>${tr("control.airPairHelp")}</p></div><span class="label-caps">${tr("control.mockValues")}</span></div>
      <div class="air-mode-row"><span>${tr("control.airMode")}</span>${presentation ? `<span class="demo-badge">${tr(state.airMode === "auto" ? "control.autoMode" : "control.manualMode")}</span>` : `<div class="air-mode-switch" role="group" aria-label="${tr("control.airMode")}"><button class="side-button" type="button" data-air-mode="auto" aria-pressed="${state.airMode === "auto"}">${tr("control.autoMode")}</button><button class="side-button" type="button" data-air-mode="manual" aria-pressed="${state.airMode === "manual"}">${tr("control.manualMode")}</button></div>`}</div>
      <div class="air-control-grid">
        <div class="air-zone-picker" role="${presentation ? "list" : "group"}" aria-label="${tr("control.zonePicker")}">${AIR_ZONES.map((zone) => { const zoneLabel = tr(`control.zone${zone[0].toUpperCase()}${zone.slice(1)}`); return presentation ? `<div class="air-zone-button ${state.airZone === zone ? "is-selected" : ""}" role="listitem" aria-label="${tr("control.zonePair", { zone: zoneLabel })}: ${targets[zone]} ${pressure.unit}"><span>${tr("control.zonePair", { zone: zoneLabel })}</span><strong>${targets[zone]} ${pressure.unit}</strong></div>` : `<button type="button" class="air-zone-button ${state.airZone === zone ? "is-selected" : ""}" data-air-zone="${zone}" aria-pressed="${state.airZone === zone}"><span>${tr("control.zonePair", { zone: zoneLabel })}</span><strong>${targets[zone]} ${pressure.unit}</strong></button>`; }).join("")}</div>
        <div class="air-target-panel ${presentation ? "read-only-target" : ""}">
          <div class="slider-label">${presentation ? `<span>${tr("control.targetPressure")} · ${tr("control.zonePair", { zone: tr(zoneKey) })}</span>` : `<label for="air-target-range">${tr("control.targetPressure")} · ${tr("control.zonePair", { zone: tr(zoneKey) })}</label>`}<output id="air-target-output" ${presentation ? "" : 'for="air-target-range"'}>${target} ${pressure.unit}</output></div>
          ${presentation ? "" : `<input class="range-input" id="air-target-range" type="range" min="${pressure.min}" max="${pressure.max}" step="${pressure.step}" value="${target}" data-air-target aria-valuetext="${target} ${pressure.unit}" ${state.airMode === "auto" ? "disabled" : ""} style="--range-progress:${targetProgress}%"><div class="range-scale"><span>${pressure.min} ${pressure.unit}</span><span>${tr("control.mockRange")}</span><span>${pressure.max} ${pressure.unit}</span></div>`}
          <p class="air-mode-help" id="air-mode-help">${tr(state.airMode === "auto" ? "control.autoHelp" : "control.manualHelp")}</p>
          ${presentation ? "" : `<button type="button" class="quiet-button" data-action="run-auto">${tr("control.runAuto")}</button>`}
        </div>
      </div>
      <div class="mock-feedback" aria-live="polite">
        <div class="mock-feedback-heading"><strong>${tr("control.apiTitle")}</strong><span>${tr("control.apiMock")}</span></div>
        <div class="mock-feedback-values"><div><span>${tr("control.apiState")}</span><strong id="mock-api-state">${tr("control.apiAccepted")}</strong></div><div><span>${tr("control.apiTarget")}</span><strong id="mock-api-target">${target} ${pressure.unit}</strong></div><div><span>${tr("control.readingLeft")}</span><strong>${currentLeft} ${pressure.unit} · ${rawLeft}/${pressure.rawMax}</strong></div><div><span>${tr("control.readingRight")}</span><strong>${currentRight} ${pressure.unit} · ${rawRight}/${pressure.rawMax}</strong></div></div>
        <p>${tr("control.feedbackNote")}</p>
      </div>
    </section>
    <div class="bed-insight-grid">
      <section class="surface bed-heatmap-card" aria-labelledby="bed-heatmap-title">
        <div class="section-title"><div><h2 id="bed-heatmap-title">${tr("control.heatmapTitle")}</h2><p>${tr(state.heatmapSensor ? "control.heatmapAvailable" : "control.heatmapPreview")}</p></div></div>
        <div class="surface pressure-wrap">${pressureMap()}</div>${pressureLegend()}
        <p class="bed-heatmap-note">${tr("control.heatmapNote")}</p>
      </section>
      <section class="bed-ai-card" aria-labelledby="bed-ai-title">
        <div class="suggestion-mark">${ICON_INFO}<span>${tr("control.aiLabel")}</span></div>
        <h2 id="bed-ai-title">${tr("control.aiTitle")}</h2>
        <div class="ai-signal"><strong>${tr("control.aiSignal")}</strong><p>${tr("control.aiPattern")}</p></div>
        <div class="ai-recommendation"><strong>${tr("control.aiRecommendation")}</strong></div>
        <p class="ai-flow-note">${tr("control.aiFlow")}</p>
        ${presentation ? "" : `<button type="button" class="primary-button" data-action="review-ai">${tr("control.aiAction")}</button>`}
      </section>
    </div>
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
  if (state.bedModel === "shared") state.angles[state.side === "left" ? "right" : "left"][key] = Number(value);
  state.profileDirty = true;
  renderControlPreservingFocus(key);
}
function renderControlPreservingFocus(key) {
  const current = document.activeElement;
  if (current?.matches(".range-input")) {
    const input = current, output = document.querySelector(`#${key === "head" ? "head-angle" : "leg-angle"}-out`);
    if (output) output.textContent = `${input.value}°`;
    input.setAttribute("aria-valuetext", tr("control.angle", { value: input.value }));
    input.style.setProperty("--range-progress", `${Number(input.value)/60*100}%`);
    const profileState = document.querySelector(".profile-state");
    if (profileState) { profileState.textContent = tr("control.profileUnsaved"); profileState.classList.add("is-dirty"); }
    document.querySelector("#control-message").textContent = tr("control.angleUpdated");
  }
}
function renderControlAndRestoreFocus(selector) {
  render();
  const target = selector ? document.querySelector(selector) : null;
  target?.focus({ preventScroll: true });
}
function updateAirTarget(value) {
  const target = Number(value);
  state.airTargets[state.airZone] = target;
  state.profileDirty = true;
  const pressure = MOCK_BED_CONFIG.pressure;
  const output = document.querySelector("#air-target-output");
  const apiTarget = document.querySelector("#mock-api-target");
  const input = document.querySelector("#air-target-range");
  if (output) output.textContent = `${target} ${pressure.unit}`;
  if (apiTarget) apiTarget.textContent = `${target} ${pressure.unit}`;
  const apiState = document.querySelector("#mock-api-state");
  if (apiState) apiState.textContent = tr("control.apiUpdated");
  const zoneValue = document.querySelector(`[data-air-zone="${state.airZone}"] strong`);
  if (zoneValue) zoneValue.textContent = `${target} ${pressure.unit}`;
  if (input) {
    input.setAttribute("aria-valuetext", `${target} ${pressure.unit}`);
    input.style.setProperty("--range-progress", `${(target - pressure.min) / Math.max(1, pressure.max - pressure.min) * 100}%`);
  }
  document.querySelectorAll(".profile-state").forEach((node) => { node.textContent = tr("control.profileUnsaved"); node.classList.add("is-dirty"); });
}
function runAutoAdjustment() {
  state.airMode = "auto";
  state.profileDirty = true;
  renderControlAndRestoreFocus('[data-action="run-auto"]');
  showToast(tr("control.autoToast"));
}
function reviewAiSuggestion() {
  state.airMode = "manual";
  state.airZone = "middle";
  state.profileDirty = true;
  renderControlAndRestoreFocus('[data-action="run-auto"]');
  showToast(tr("control.aiToast"));
}
function changeBedModel(model) {
  const sourceSide = state.side;
  state.bedModel = model === "shared" ? "shared" : "split";
  if (state.bedModel === "shared") {
    state.angles.left = { ...state.angles[sourceSide] };
    state.angles.right = { ...state.angles[sourceSide] };
    state.side = "left";
  }
  state.profileDirty = true;
  renderControlAndRestoreFocus("#bed-model");
}
let toastTimer;
function showToast(message) {
  toast.textContent = message; toast.classList.add("is-visible");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}
function currentProfileSettings() {
  return { angles: cloneSetting(state.angles), airTargets: { ...state.airTargets }, airMode: state.airMode };
}
function persistProfiles() {
  localStorage.setItem("sleep-prototype-position-profiles", JSON.stringify(state.profiles));
  localStorage.setItem("sleep-prototype-selected-profile", state.selectedProfileId);
}
function applyPositionProfile(profileId) {
  const profile = state.profiles.find((item) => item.id === profileId);
  if (!profile) return;
  state.selectedProfileId = profile.id;
  state.angles = cloneSetting(profile.angles);
  state.airTargets = { ...profile.airTargets };
  state.airMode = profile.airMode;
  state.profileDirty = false;
  localStorage.setItem("sleep-prototype-selected-profile", profile.id);
  renderControlAndRestoreFocus("#position-profile");
}
function saveCurrentProfile() {
  const profile = state.profiles.find((item) => item.id === state.selectedProfileId);
  if (!profile) return;
  Object.assign(profile, currentProfileSettings());
  state.profileDirty = false;
  persistProfiles();
  render();
  const menu = document.querySelector(".profile-save-menu");
  if (menu) menu.open = false;
  showToast(tr("control.savedMessage", { label: profile.nameKey ? tr(profile.nameKey) : profile.name }));
}
function createPositionProfile(form) {
  const field = form.querySelector("#profile-name");
  const error = form.querySelector("#profile-name-error");
  const name = field.value.trim();
  const duplicate = state.profiles.some((profile) => profile.name.trim().toLocaleLowerCase() === name.toLocaleLowerCase());
  if (!name || duplicate) { error.hidden = false; field.setAttribute("aria-invalid", "true"); field.focus(); return; }
  const profile = { id: `custom-${Date.now()}`, name, nameKey: "", builtin: false, ...currentProfileSettings() };
  state.profiles.push(profile);
  state.selectedProfileId = profile.id;
  state.profileDirty = false;
  persistProfiles();
  render();
  showToast(tr("control.profileCreated"));
}
function deleteCurrentProfile() {
  const profile = state.profiles.find((item) => item.id === state.selectedProfileId);
  if (!profile || profile.builtin) return;
  state.profiles = state.profiles.filter((item) => item.id !== profile.id);
  const fallback = state.profiles.find((item) => item.id === "sleep") || state.profiles[0];
  state.selectedProfileId = fallback.id;
  state.angles = cloneSetting(fallback.angles);
  state.airTargets = { ...fallback.airTargets };
  state.airMode = fallback.airMode;
  state.profileDirty = false;
  persistProfiles();
  render();
  showToast(tr("control.profileDeleted"));
}
function updatePeriod(period) { state.period = period; render(); }

function fitPhonePreview() {
  const availableWidth = phonePreviewStage.clientWidth;
  const availableHeight = phonePreviewStage.clientHeight;
  if (!availableWidth || !availableHeight || !phonePreviewDevice.offsetWidth || !phonePreviewDevice.offsetHeight) return;
  const scale = Math.min(1, availableHeight / phonePreviewDevice.offsetHeight, availableWidth / phonePreviewDevice.offsetWidth);
  phonePreviewDevice.style.setProperty("--phone-preview-fit-scale", String(scale));
}
function setPreviewMode(mode) {
  const preview = mode === "phone" || mode === "ipad";
  phonePreviewView.hidden = !preview;
  phonePreviewView.dataset.previewMode = preview ? mode : "web";
  document.body.classList.toggle("phone-preview-active", preview && mode === "phone");
  document.body.classList.toggle("ipad-preview-active", preview && mode === "ipad");
  previewModeButtons.forEach((button) => {
    const selected = (button.dataset.previewMode === (preview ? mode : "web"));
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  if (preview) {
    const previewUrl = new URL(location.href);
    previewUrl.search = mode === "ipad" ? "?tabletPreview=1" : "?phonePreview=1";
    previewUrl.hash = state.page;
    if (phonePreviewFrame.src !== previewUrl.href) phonePreviewFrame.src = previewUrl.href;
    requestAnimationFrame(fitPhonePreview);
  }
}

document.querySelector("#language-select").addEventListener("change", (event) => {
  state.language = event.target.value === "zh" ? "zh" : "en";
  localStorage.setItem("sleep-prototype-language", state.language);
  render();
  if (!phonePreviewView.hidden) requestAnimationFrame(fitPhonePreview);
});
previewModeButtons.forEach((button) => button.addEventListener("click", () => setPreviewMode(button.dataset.previewMode)));
window.addEventListener("resize", () => {
  if (!phonePreviewView.hidden) requestAnimationFrame(fitPhonePreview);
});
phonePreviewFrame.addEventListener("load", () => { if (!phonePreviewView.hidden) requestAnimationFrame(fitPhonePreview); });
window.addEventListener("storage", (event) => {
  if (event.key !== "sleep-prototype-language" || !event.newValue) return;
  state.language = event.newValue === "zh" ? "zh" : "en";
  render();
  if (!phonePreviewView.hidden) requestAnimationFrame(fitPhonePreview);
});
document.addEventListener("change", (event) => {
  const positionProfile = event.target.closest("[data-position-profile]");
  if (positionProfile) { applyPositionProfile(positionProfile.value); return; }
  const model = event.target.closest("[data-bed-model]");
  if (model) { changeBedModel(model.value); return; }
  const sensor = event.target.closest("[data-heatmap-sensor]");
  if (sensor) {
    state.heatmapSensor = sensor.value === "included";
    renderControlAndRestoreFocus("#heatmap-sensor");
  }
});
document.addEventListener("click", (event) => {
  const segment = event.target.closest("[data-segment]");
  if (segment) { state.segment = Number(segment.dataset.segment); render(); return; }
  const page = event.target.closest("[data-page]");
  if (page) { event.preventDefault(); navigate(page.dataset.page); return; }
  const period = event.target.closest("[data-period]");
  if (period) { updatePeriod(period.dataset.period); return; }
  const airCell = event.target.closest("[data-air-cell]");
  if (airCell) {
    state.airZone = airCell.dataset.zone;
    renderControlAndRestoreFocus(`[data-air-cell="${airCell.dataset.airCell}"]`);
    return;
  }
  const airZone = event.target.closest("[data-air-zone]");
  if (airZone) {
    state.airZone = airZone.dataset.airZone;
    renderControlAndRestoreFocus(`[data-air-zone="${state.airZone}"]`);
    return;
  }
  const airMode = event.target.closest("[data-air-mode]");
  if (airMode) {
    state.airMode = airMode.dataset.airMode === "manual" ? "manual" : "auto";
    state.profileDirty = true;
    renderControlAndRestoreFocus(`[data-air-mode="${state.airMode}"]`);
    return;
  }
  const side = event.target.closest("[data-side-control]");
  if (side) { state.side = side.dataset.side; renderControlAndRestoreFocus(`[data-side-control="${side.dataset.sideControl}"][data-side="${state.side}"]`); return; }
  if (event.target.closest('[data-action="save-profile"]')) { saveCurrentProfile(); return; }
  if (event.target.closest('[data-action="open-profile-form"]')) {
    const form = document.querySelector("#profile-create-form");
    form.hidden = false;
    form.querySelector("#profile-name").focus();
    return;
  }
  if (event.target.closest('[data-action="cancel-profile-form"]')) {
    const form = document.querySelector("#profile-create-form");
    form.reset();
    form.hidden = true;
    return;
  }
  if (event.target.closest('[data-action="delete-profile"]')) {
    const profile = state.profiles.find((item) => item.id === state.selectedProfileId);
    if (profile && window.confirm(`${tr("control.deleteProfile")}: ${profile.name}?`)) deleteCurrentProfile();
    return;
  }
  if (event.target.closest('[data-action="run-auto"]')) { runAutoAdjustment(); return; }
  if (event.target.closest('[data-action="review-ai"]')) { reviewAiSuggestion(); return; }
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
document.addEventListener("submit", (event) => {
  if (event.target.id !== "profile-create-form") return;
  event.preventDefault();
  createPositionProfile(event.target);
});
document.addEventListener("input", (event) => {
  if (event.target.id === "profile-name") {
    const error = document.querySelector("#profile-name-error");
    if (error) error.hidden = true;
    event.target.removeAttribute("aria-invalid");
  }
});
document.addEventListener("input", (event) => {
  const airTarget = event.target.closest("[data-air-target]");
  if (airTarget) { updateAirTarget(airTarget.value); return; }
  const input = event.target.closest("[data-angle]");
  if (!input) return;
  updateAngle(input.dataset.angle === "head-angle" ? "head" : "leg", input.value);
});
window.addEventListener("hashchange", () => {
  const next = location.hash.slice(1);
  if (["home", "control", "report", "profile"].includes(next) && !(next === "control" && state.device !== "electric")) { state.page = next; render(); }
});

fetch("./design-tokens.json?v=bed-control-20260930").then((response) => {
  if (!response.ok) throw new Error("Failed to load design tokens");
  return response.json();
}).then((tokens) => {
  applyTokens(tokens);
  document.querySelector('meta[name="theme-color"]').content = tokens.color.primitive.navy["950"].$value;
  const initial = location.hash.slice(1);
  if (["home", "control", "report", "profile"].includes(initial) && !(initial === "control" && state.device !== "electric")) state.page = initial;
  render();
  const requestedPreview = previewQuery.get("show");
  if (requestedPreview === "phone" || requestedPreview === "ipad") setPreviewMode(requestedPreview);
}).catch((error) => {
  document.querySelector("#main-content").innerHTML = `<section class="surface signal-section"><h1>${tr("app.errorTitle")}</h1><p>${tr("app.errorText")}</p><p>${error.message}</p></section>`;
});
