window.SITE_DATA = {
  categories: ["全部", "基础理论", "电机电力", "电子技术", "控制自动化"],

  frontiers: [
    {
      title: "新型电力系统与智能电网",
      image: "./assets/frontier-smart-grid.svg",
      summary: "高比例新能源、电动汽车、储能和数据中心负荷接入后，电网从单向输电网络转变为复杂的双向能量与信息网络。",
      points: ["电网容量与接入队列", "灵活性资源", "输配电协同", "电力市场与调度"],
      related: ["电力系统分析", "自动控制原理", "电力电子技术"],
      source: "IEA Electricity 2026 / DOE Grid Modernization",
      url: "https://www.iea.org/reports/electricity-2026/grids"
    },
    {
      title: "构网型逆变器与高比例电力电子电网",
      image: "./assets/frontier-inverter.svg",
      summary: "光伏、风电、储能大量通过逆变器接入电网，系统惯量、故障电流和稳定控制方式发生变化，构网型控制成为热门方向。",
      points: ["低惯量系统", "虚拟同步机", "故障穿越", "并网标准"],
      related: ["电力电子技术", "自动控制原理", "电力系统分析"],
      source: "DOE EOS / IBR Reliability Standards",
      url: "https://www.energy.gov/cmei/systems/essential-grid-reliability-standards-inverter-based-resources"
    },
    {
      title: "储能系统与长时储能",
      image: "./assets/frontier-storage.svg",
      summary: "储能用于削峰填谷、平滑新能源波动、备用容量和微电网孤岛运行。研究重点从电池本体扩展到系统集成、热管理和调度优化。",
      points: ["电池储能 BESS", "长时储能", "安全热管理", "充放电优化"],
      related: ["电力系统分析", "电力电子技术", "自动控制原理"],
      source: "IEA Batteries and Secure Energy Transitions",
      url: "https://www.iea.org/reports/batteries-and-secure-energy-transitions/outlook-for-battery-demand-and-supply"
    },
    {
      title: "虚拟电厂 VPP 与需求侧响应",
      image: "./assets/frontier-vpp.svg",
      summary: "把分布式光伏、户用电池、电动汽车、空调、楼宇负荷等聚合成可调度资源，使用户侧资源也能参与电网平衡。",
      points: ["分布式资源聚合", "需求响应", "峰荷削减", "市场机制"],
      related: ["电力系统分析", "自动控制原理", "数字电子技术"],
      source: "DOE Virtual Power Plants",
      url: "https://www.energy.gov/edf/virtual-power-plants-projects"
    },
    {
      title: "宽禁带功率半导体：SiC / GaN",
      image: "./assets/frontier-wbg.svg",
      summary: "SiC、GaN 等宽禁带器件使变换器具备更高开关频率、更高功率密度和更低损耗，推动新能源汽车、电源、光伏逆变器和充电桩升级。",
      points: ["高频高效", "高温高压", "功率模块封装", "电磁兼容"],
      related: ["电力电子技术", "模拟电子技术", "电机学"],
      source: "DOE Wide Bandgap Power Electronics Framework",
      url: "https://www.energy.gov/sites/default/files/2025-01/AMMTO%20Draft%20WBG%20PE%20Strategic%20Framework_FINAL.pdf"
    },
    {
      title: "电机驱动与新能源汽车电驱系统",
      image: "./assets/frontier-ev.svg",
      summary: "新能源汽车和机器人推动高功率密度电机、永磁同步电机控制、SiC 逆变器、热管理和故障诊断成为工程热点。",
      points: ["永磁同步电机", "矢量控制", "电驱热管理", "NVH与可靠性"],
      related: ["电机学", "电力电子技术", "自动控制原理"],
      source: "综合技术方向",
      url: "https://search.bilibili.com/all?keyword=%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%20%E7%94%B5%E9%A9%B1%E7%B3%BB%E7%BB%9F"
    },
    {
      title: "AI 调度、数字孪生与预测维护",
      image: "./assets/frontier-ai.svg",
      summary: "人工智能用于负荷预测、故障识别、设备寿命评估、调度优化和数字孪生仿真，使电气系统从经验运维走向数据驱动。",
      points: ["负荷预测", "故障诊断", "数字孪生", "强化学习调度"],
      related: ["自动控制原理", "电力系统分析", "数字电子技术"],
      source: "DOE Grid Modernization Initiative",
      url: "https://www.energy.gov/gmi/grid-modernization-initiative"
    },
    {
      title: "电气安全、网络安全与韧性电网",
      image: "./assets/frontier-security.svg",
      summary: "电网越来越依赖通信、自动化和软件控制，网络攻击、极端天气和设备老化都要求电力系统具备更高的安全性和韧性。",
      points: ["继电保护", "网络安全", "灾害韧性", "自愈控制"],
      related: ["电力系统分析", "数字电子技术", "自动控制原理"],
      source: "DOE Grid Modernization Initiative",
      url: "https://www.energy.gov/gmi/grid-modernization-initiative"
    }
  ],

  directions: [
    {
      icon: "🧲",
      title: "电机与电器",
      image: "./assets/direction-motor.svg",
      summary: "电机与电器方向研究电能与机械能之间的转换，以及电磁装置的结构设计、运行控制和可靠性。它既包含传统的变压器、异步电机、同步电机，也包含新能源汽车电驱、永磁电机、伺服电机和特种电机。",
      keyQuestions: ["怎样产生稳定而高效的电磁转矩？", "如何降低铁耗、铜耗和温升？", "电机在变频器控制下如何实现高性能运行？"],
      methods: ["电磁场有限元分析", "等效电路建模", "热-磁-机械多物理场耦合", "矢量控制与参数辨识"],
      applications: ["新能源汽车电驱", "工业变频调速", "风力发电机", "机器人伺服系统"],
      courses: ["工程电磁场", "电机学", "电力电子技术", "自动控制原理"]
    },
    {
      icon: "🏙️",
      title: "电力系统及其自动化",
      image: "./assets/direction-grid.svg",
      summary: "电力系统方向关注从发电、输电、变电、配电到用电的整体网络。它研究电压、电流、功率、频率、相角在大型网络中的分布与动态变化，是智能电网、调度自动化和新能源并网的基础。",
      keyQuestions: ["电网潮流如何计算和优化？", "故障发生时如何快速保护和隔离？", "高比例新能源接入后系统如何保持稳定？"],
      methods: ["节点导纳矩阵", "牛顿拉夫逊潮流", "短路计算", "暂态稳定仿真", "继电保护整定"],
      applications: ["电网调度", "变电站自动化", "新能源并网", "配电网故障定位"],
      courses: ["电路原理", "电机学", "电力系统分析", "自动控制原理"]
    },
    {
      icon: "🔋",
      title: "电力电子与电力传动",
      image: "./assets/direction-pe.svg",
      summary: "电力电子方向研究如何利用功率半导体器件对电能进行变换和控制。它连接电源、电机、储能、新能源与用电设备，是现代电气工程中最活跃的方向之一。",
      keyQuestions: ["如何提高变换效率并降低开关损耗？", "如何设计稳定可靠的 DC-DC、AC-DC、DC-AC 拓扑？", "如何控制电机转矩、速度和电能质量？"],
      methods: ["PWM 调制", "开关状态分析", "闭环控制", "功率器件驱动", "热设计与EMC"],
      applications: ["光伏逆变器", "充电桩", "储能变流器", "电机驱动器"],
      courses: ["模拟电子技术", "电力电子技术", "电机学", "自动控制原理"]
    },
    {
      icon: "🧠",
      title: "控制理论与自动化",
      image: "./assets/direction-control.svg",
      summary: "自动化方向研究如何让系统按照期望目标稳定、快速、准确地运行。它的对象可以是电机、电网、机器人、工业过程，也可以是新能源和储能系统。",
      keyQuestions: ["系统如何建模？", "反馈如何改善性能？", "如何在扰动和不确定性下保持稳定？"],
      methods: ["传递函数", "状态空间", "PID控制", "最优控制", "模型预测控制", "智能优化"],
      applications: ["电机伺服", "机器人", "过程控制", "储能调度"],
      courses: ["高等数学", "电路原理", "自动控制原理", "数字电子技术"]
    },
    {
      icon: "☀️",
      title: "新能源与智能电网",
      image: "./assets/direction-renewable.svg",
      summary: "新能源与智能电网方向关注风电、光伏、储能、电动汽车和柔性负荷等资源如何安全高效接入电网。它强调能源低碳化、系统灵活性和信息化控制。",
      keyQuestions: ["新能源波动如何平滑？", "储能和负荷如何参与调度？", "微电网和虚拟电厂如何运行？"],
      methods: ["新能源功率预测", "储能优化", "需求响应", "分布式控制", "数字孪生"],
      applications: ["光伏电站", "风电场", "微电网", "虚拟电厂"],
      courses: ["电力系统分析", "电力电子技术", "自动控制原理", "数字电子技术"]
    },
    {
      icon: "📡",
      title: "电气检测与信息化",
      image: "./assets/direction-sensing.svg",
      summary: "检测与信息化方向把传感器、信号处理、嵌入式系统、通信网络和人工智能用于电气设备监测、故障诊断和智能运维。",
      keyQuestions: ["如何采集高质量状态数据？", "如何识别早期故障征兆？", "如何把设备数据转化为运维决策？"],
      methods: ["传感器测量", "信号滤波", "嵌入式采集", "机器学习诊断", "边缘计算"],
      applications: ["变压器在线监测", "电缆局放检测", "设备预测维护", "工业物联网"],
      courses: ["模拟电子技术", "数字电子技术", "自动控制原理", "电路原理"]
    }
  ],

  courses: [
    {
      id: "math",
      title: "高等数学 / 线性代数",
      category: "基础理论",
      difficulty: "基础",
      icon: "∑",
      summary: "提供建模、微分方程、矩阵和优化的基础，是所有电气专业课的底层工具。",
      prerequisites: ["高中数学"],
      concepts: ["微积分", "微分方程", "矩阵", "特征值", "最优化"],
      goals: ["理解连续系统变化规律", "掌握矩阵建模和线性方程求解", "为电路、电机、控制和电力系统打基础"],
      advice: "不要把数学当作孤立课程，重点关注“变量关系、系统方程、稳定性、优化”这些工程语言。",
      video: {
        title: "高等数学 / 线性代数 B站学习入口",
        url: "https://search.bilibili.com/all?keyword=%E9%AB%98%E7%AD%89%E6%95%B0%E5%AD%A6%20%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0",
        note: "适合补齐后续专业课所需数学基础。"
      }
    },
    {
      id: "physics",
      title: "大学物理 / 电磁学",
      category: "基础理论",
      difficulty: "基础",
      icon: "🧪",
      summary: "建立力、电、磁、能量和场的物理直觉，是理解工程电磁场、电机和电力设备的基础。",
      prerequisites: ["高中物理", "高等数学"],
      concepts: ["电荷", "电场", "磁场", "电磁感应", "能量守恒"],
      goals: ["建立电磁现象的物理图像", "理解电磁感应和能量转换", "为电磁场和电机学做准备"],
      advice: "重点把公式和物理图像对应起来，例如通量、环量、场线、受力和能量。",
      video: {
        title: "大学物理电磁学 B站学习入口",
        url: "https://search.bilibili.com/all?keyword=%E5%A4%A7%E5%AD%A6%E7%89%A9%E7%90%86%20%E7%94%B5%E7%A3%81%E5%AD%A6",
        note: "适合补充电磁场与电机学前置知识。"
      }
    },
    {
      id: "circuit",
      title: "电路原理",
      category: "基础理论",
      difficulty: "基础",
      icon: "🔌",
      summary: "电气专业入门核心课，研究电路模型、基本定律、等效变换、动态电路、相量法和三相电路。",
      prerequisites: ["高等数学", "大学物理"],
      concepts: ["KCL/KVL", "戴维南定理", "相量法", "三相功率", "动态响应"],
      goals: ["能够用节点法、网孔法和等效变换分析线性电路", "理解一阶、二阶动态电路的过渡过程", "掌握正弦稳态、复功率和三相电路分析"],
      advice: "重点训练“画等效电路”和“把时域问题转成相量问题”的能力。",
      video: {
        title: "《电路原理》课程页",
        url: "https://www.bilibili.com/cheese/play/ep1688873",
        note: "适合系统学习电路模型、定律、动态电路和三相电路。"
      }
    },
    {
      id: "em",
      title: "工程电磁场",
      category: "基础理论",
      difficulty: "较难",
      icon: "🧲",
      summary: "研究电场、磁场、电磁感应和电磁波，是理解电机、变压器、高电压、电磁兼容等方向的理论基础。",
      prerequisites: ["高等数学", "大学物理", "矢量分析"],
      concepts: ["电场线", "电势", "高斯定理", "安培环路定律", "法拉第电磁感应", "麦克斯韦方程"],
      goals: ["理解场、势、通量、环量的物理意义", "掌握电场、恒定磁场和时变电磁场的基本规律", "能用麦克斯韦方程解释工程电磁问题"],
      advice: "学习时不要只记公式，要把散度、旋度和积分形式对应到“源、环流、边界、能量”这些物理图像上。",
      video: {
        title: "工程电磁场/2小时期末速成课",
        url: "https://www.bilibili.com/cheese/play/ep200817",
        note: "适合快速建立工程电磁场知识框架。"
      }
    },
    {
      id: "analog",
      title: "模拟电子技术",
      category: "电子技术",
      difficulty: "中等",
      icon: "📈",
      summary: "研究二极管、三极管、场效应管、运算放大器、放大电路、反馈电路、滤波与稳压。",
      prerequisites: ["电路原理", "半导体基础"],
      concepts: ["PN结", "小信号模型", "共射放大", "负反馈", "运算放大器", "频率响应"],
      goals: ["理解半导体器件的工作区和伏安特性", "能分析基础放大电路的增益、输入输出电阻", "理解反馈对增益、稳定性和带宽的影响"],
      advice: "建议结合 Multisim、LTspice 等仿真工具，把静态工作点、小信号增益和波形失真放在一起观察。",
      video: {
        title: "模拟电子技术基础B 视频合集",
        url: "https://space.bilibili.com/7793712/channel/series",
        note: "适合按照合集顺序学习模电基础内容。"
      }
    },
    {
      id: "digital",
      title: "数字电子技术",
      category: "电子技术",
      difficulty: "中等",
      icon: "🧮",
      summary: "研究用 0 和 1 表示信息的数字系统，包括逻辑门、组合逻辑、触发器、计数器、寄存器和状态机。",
      prerequisites: ["电路原理", "逻辑代数"],
      concepts: ["布尔代数", "卡诺图", "组合逻辑", "触发器", "计数器", "有限状态机"],
      goals: ["能够化简逻辑函数并设计组合逻辑电路", "理解触发器、时钟和时序逻辑的工作方式", "能分析和设计简单状态机"],
      advice: "学习时把真值表、逻辑表达式、门电路图和时序波形对应起来。",
      video: {
        title: "数电/数字电子技术基础 期末速成",
        url: "https://www.bilibili.com/cheese/play/ep1962115",
        note: "适合零基础快速梳理数字电子技术。"
      }
    },
    {
      id: "motor",
      title: "电机学",
      category: "电机电力",
      difficulty: "较难",
      icon: "⚙️",
      summary: "研究变压器、直流电机、异步电机、同步电机的结构、原理、等效电路、运行特性和控制方法。",
      prerequisites: ["电路原理", "工程电磁场"],
      concepts: ["旋转磁场", "电磁转矩", "等效电路", "机械特性", "变压器模型"],
      goals: ["理解电磁能量转换和转矩产生机理", "会分析变压器和电机的等效电路", "掌握电机启动、调速、制动和运行特性"],
      advice: "把电机看成“电路 + 磁路 + 机械系统”的耦合体。",
      video: {
        title: "电机学 北京交通大学",
        url: "https://www.bilibili.com/video/BV1ayzLYiEWV/",
        note: "课程包含直流电机、变压器、异步电机等内容。"
      }
    },
    {
      id: "pe",
      title: "电力电子技术",
      category: "电机电力",
      difficulty: "中等",
      icon: "🔋",
      summary: "研究电能变换和控制，核心内容包括功率器件、整流、逆变、斩波、PWM、软开关和新能源变流器。",
      prerequisites: ["电路原理", "模拟电子技术", "电机学"],
      concepts: ["晶闸管", "MOSFET/IGBT", "整流", "逆变", "Buck/Boost", "PWM"],
      goals: ["理解功率半导体器件的开关特性", "掌握 DC-DC、AC-DC、DC-AC 变换器的工作原理", "理解 PWM 调制和电能质量问题"],
      advice: "学习电力电子要同时看拓扑、开关状态、波形和能量流向。",
      video: {
        title: "电力电子技术-电子陈老师",
        url: "https://www.bilibili.com/cheese/play/ep288033",
        note: "内容覆盖器件、整流、逆变、变换器等章节。"
      }
    },
    {
      id: "power",
      title: "电力系统分析",
      category: "电机电力",
      difficulty: "较难",
      icon: "🏭",
      summary: "研究电力网络建模、标幺制、潮流计算、短路计算、暂态稳定和电网运行分析。",
      prerequisites: ["电路原理", "电机学", "高等数学"],
      concepts: ["标幺制", "节点导纳矩阵", "潮流计算", "短路电流", "暂态稳定"],
      goals: ["建立发电机、变压器、线路和负荷的等值模型", "掌握潮流计算和短路计算的基本思路", "理解功角稳定、电压稳定和频率稳定"],
      advice: "先把电力系统网络等值图画清楚，再进入矩阵方程和迭代计算。",
      video: {
        title: "清华大学-电力系统分析（国家级精品课）",
        url: "https://www.bilibili.com/list/ml2605702598?bvid=BV1KE411H7ja&oid=92428068",
        note: "适合系统学习电力系统概述、线路模型和潮流分析。"
      }
    },
    {
      id: "control",
      title: "自动控制原理",
      category: "控制自动化",
      difficulty: "中等",
      icon: "🎛️",
      summary: "研究反馈系统的建模、时域分析、频域分析、根轨迹、稳定性和控制器设计。",
      prerequisites: ["高等数学", "复变函数", "电路原理"],
      concepts: ["传递函数", "反馈", "稳定性", "根轨迹", "频率响应", "PID"],
      goals: ["理解开环、闭环和反馈控制的意义", "掌握系统稳定性、动态性能和稳态误差分析", "会用根轨迹和频域方法设计基础控制器"],
      advice: "把控制系统理解成“测量—比较—修正”的闭环过程。",
      video: {
        title: "自动控制原理课程页",
        url: "https://www.bilibili.com/cheese/play/ss515147041",
        note: "适合期末复习和考研复试梳理经典控制理论。"
      }
    }
  ],

  demos: {
    em: {
      title: "工程电磁场：电荷、电场线与等势面",
      text: "黄色中心点表示正电荷，向外发散曲线表示电场线，半透明环表示等势面。密度滑块控制场线数量，强度滑块控制场线摆动和箭头长度。",
      bullets: ["电场线方向表示正电荷受力方向", "线越密，场越强", "等势面与电场线近似垂直"]
    },
    motor: {
      title: "电机学：三相旋转磁场",
      text: "三相绕组在空间上相差 120°，三相电流在时间上相差 120°，合成磁场随时间旋转并带动转子。",
      bullets: ["三相电流产生旋转磁场", "转子受到电磁转矩", "速度和负载决定运行状态"]
    },
    analog: {
      title: "模拟电子技术：输入信号与放大输出",
      text: "蓝色曲线表示输入小信号，橙色曲线表示放大后的输出信号。强度滑块对应电压增益。",
      bullets: ["放大电路提升信号幅值", "过高增益可能导致失真", "负反馈可改善稳定性"]
    },
    digital: {
      title: "数字电子技术：逻辑电平与时钟",
      text: "柱状方块模拟 0/1 电平，黄色阶梯波表示时钟脉冲，体现时序逻辑随时钟变化。",
      bullets: ["高低电平表示 1 和 0", "时钟决定状态更新节奏", "触发器让电路拥有记忆"]
    },
    power: {
      title: "电力系统分析：发电—输电—负荷功率流",
      text: "节点表示发电厂、升压站、变电站和负荷，流动粒子表示有功功率沿线路传输。",
      bullets: ["电力网络由节点和线路组成", "潮流关注电压、相角、有功和无功", "稳定性决定受扰后的恢复能力"]
    }
  },

  roadmapStages: [
    {
      stage: "阶段 1",
      title: "数理与物理基础",
      courses: ["高等数学", "线性代数", "大学物理", "电磁学"],
      aim: "建立微分方程、矩阵、能量、场和波的基础语言。",
      output: "能读懂电路、电磁场和控制系统中的数学模型。"
    },
    {
      stage: "阶段 2",
      title: "电路与电子技术",
      courses: ["电路原理", "模拟电子技术", "数字电子技术"],
      aim: "理解电信号、器件、电路分析和逻辑系统。",
      output: "能分析电路波形、放大电路和基础数字系统。"
    },
    {
      stage: "阶段 3",
      title: "电气核心",
      courses: ["工程电磁场", "电机学", "电力电子技术", "电力系统分析"],
      aim: "进入能量转换、电能变换和电力网络分析。",
      output: "能理解电机驱动、变换器和电网运行问题。"
    },
    {
      stage: "阶段 4",
      title: "自动化与系统集成",
      courses: ["自动控制原理", "嵌入式", "继电保护", "智能电网"],
      aim: "把设备、电网、传感器、控制算法和信息系统连接起来。",
      output: "能面向新能源、储能、电驱、智能运维开展综合设计。"
    }
  ],

  graph: {
    nodes: [
      { id: "math", name: "高等数学/线代", x: 90, y: 110, group: "基础", desc: "电气建模与计算的底层数学语言。" },
      { id: "physics", name: "大学物理/电磁学", x: 90, y: 270, group: "基础", desc: "建立电磁现象、能量转换和场的物理直觉。" },
      { id: "circuit", name: "电路原理", x: 310, y: 190, group: "桥梁", desc: "连接数理基础与所有电气专业课的核心桥梁。" },
      { id: "analog", name: "模拟电子", x: 520, y: 105, group: "电子", desc: "理解器件、放大、反馈和连续信号处理。" },
      { id: "digital", name: "数字电子", x: 520, y: 275, group: "电子", desc: "理解逻辑门、触发器、计数器和状态机。" },
      { id: "em", name: "工程电磁场", x: 515, y: 430, group: "核心", desc: "解释电机、变压器、电磁兼容和高电压的基础理论。" },
      { id: "motor", name: "电机学", x: 735, y: 430, group: "核心", desc: "研究电磁能量转换和电机运行控制。" },
      { id: "pe", name: "电力电子", x: 735, y: 150, group: "核心", desc: "研究整流、逆变、变频、充电和新能源变流器。" },
      { id: "control", name: "自动控制", x: 735, y: 275, group: "系统", desc: "研究反馈、稳定性、动态性能和控制器设计。" },
      { id: "power", name: "电力系统", x: 940, y: 245, group: "系统", desc: "研究潮流、短路、稳定、调度和新能源并网。" },
      { id: "smart", name: "智能电网/前沿", x: 940, y: 430, group: "前沿", desc: "融合新能源、储能、AI、VPP、数字孪生和韧性电网。" }
    ],
    edges: [
      ["math", "circuit"], ["physics", "circuit"], ["physics", "em"],
      ["circuit", "analog"], ["circuit", "digital"], ["circuit", "em"],
      ["analog", "pe"], ["digital", "control"], ["em", "motor"],
      ["motor", "pe"], ["pe", "power"], ["control", "pe"], ["control", "power"],
      ["power", "smart"], ["pe", "smart"], ["control", "smart"]
    ]
  }
};
