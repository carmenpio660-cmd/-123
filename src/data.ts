import { Merchant, Story, Badge, Product, Review } from "./types";

// Featured products that display on the main landing and details.
export const featuredProducts: Product[] = [
  {
    id: "p1",
    name: "石磨面粉全麦欧包",
    price: 38,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=500",
    category: "手工烘焙",
    artisan: "谷物私语 (主厨 阿麦)",
    description: "纯正石磨传统面粉，采用天然野生酵母（鲁邦种）长达24小时的低温慢速发酵工艺，配上柴火松木慢火煨烤。麦香温厚深邃，内部气孔张力十足，富含嚼劲，是纯粹谷物风味的极致体现。",
    craftingProcess: "每日凌晨3点，阿麦在石磨旁手工称量原料，开始慢速揉面。保留胚芽与完整麸皮的面粉在24度恒温室中经过三次翻折，在极低酵母用量下缓慢酝酿出迷人的微酸。清晨7点，将鼓胀的面团送入耐火泥自建的穹顶窑炉中，用苹果木与松木交织红热烘烤45分钟，锁住表皮酥脆焦香。",
    tasteNotes: ["初咬带有松焦香脆的坚硬外皮", "内芯温润如棉，微酸的乳酸菌香在口腔扩散", "回甘散发小麦胚油的醇实油脂甜味"],
    ingredients: ["进口低寒石磨红麦粉", "山泉水", "法国布列塔尼手收灰海盐", "天然野生酵母种", "原粒胡桃碎", "有机加州葡萄干"]
  },
  {
    id: "p2",
    name: "高山枫树原酿蜂蜜",
    price: 88,
    rating: 4.8,
    image: "https://i.postimg.cc/nhQvF1dY/wild-spring-honey-1780321765609-(1).jpg",
    category: "有机素食",
    artisan: "林间果子铺 (蜂农 严大叔)",
    description: "采集自武夷大山深处百岁野生枫树蜜源，古法手工木箱蜂巢自然酿造。由于不经任何工厂高温过滤，完全保留了蜂蜜中的天然花粉、酶类与蜂王浆活性因子，稠如醍醐，琥珀透亮，香气深幽。",
    craftingProcess: "严叔每年只在清明后进山采集首茬春蜜。将天然杉木削成的木蜂箱悬挂于遮阴透风的峭壁灌木丛中。野蜂采集深山红枫花、野蔷薇等百草精粹凝结百日。割蜜时保留底巢，用棉纱布重力过滤，保证极低含水量与原生蜂蜡香气，自然静置三十天沉淀装罐。",
    tasteNotes: ["浓郁却不齁甜的草木山野甜香", "细腻如脂在暖舌间温润融化", "喉韵带有高山枫木般沉稳的微苦矿物质尾调"],
    ingredients: ["100% 纯天然峭壁野蜂百花熟蜜 (以高山红枫、杜鹃花蜜为主)"]
  },
  {
    id: "p3",
    name: "手工炭焙武夷大红袍",
    price: 158,
    rating: 4.9,
    image: "https://i.postimg.cc/cLbXTmHt/dahongpao-roasted-tea-1780321136760.jpg",
    category: "匠心私厨",
    artisan: "筑茶隐山 (非遗茶人 陆师傅)",
    description: "选用武夷正岩核心保护区春茶茶青。严遵十八道非遗手工制茶工序，由三代制茶世家陆老先生亲自操持。使用红热荔枝木炭，历经初焙、复焙、足火三次慢火重焙，焙火极为透彻，岩骨花香入骨，极为耐泡。",
    craftingProcess: "春季采摘后，经过手工摇青、杀青、揉捻，在晴好天气下自然萎凋。核心秘技在于荔枝木炭文火慢烘，每隔四小时需人工翻动茶筛并微调炭火温度。每次焙火长达8-12小时，前后跨越两个月，让火香与茶香在长达数十天的‘退火’间彻底融为一体。",
    tasteNotes: ["初泡展现刚猛深沉的干果香与炭火焦香", "汤色橙红澄澈，茶汤稠滑如绸缎，岩韵霸道强劲", "十泡后奇妙的花香与焦糖甜香依然萦绕齿颊"],
    ingredients: ["正岩手工武夷大红袍大叶种单茶（春茶）"]
  },
  {
    id: "p4",
    name: "牧场直供鲜制奶酪",
    price: 56,
    rating: 4.7,
    image: "https://i.postimg.cc/cCvJ705n/cloud-cheese-dessert-1780396183058.jpg",
    category: "有机素食",
    artisan: "素心斋 (奶酪匠人 娜玛)",
    description: "每日清晨采自崇明岛绿色有机牧场的带温鲜新牛奶，四小时内快速送达，通过手工滴干乳清。未注入任何人工防腐剂，仅添加少许海盐和野草莓果干，果香奶香碰撞，清凉酸爽，入口即化。",
    craftingProcess: "精选牧场直供冷链牛乳温热至32度，加入自制发酵引子与牛胃黏膜酶静置自然凝乳。主理人娜玛用特制竹刀将凝乳切成均匀的几何小方块，轻揉排出乳清，再用本地细密麻布将奶豆腐吊起，在恒温地窖中慢速滴干水分。最后捏制成饼，填入山林野草莓颗粒定形。",
    tasteNotes: ["爽嫩纯正的水牛奶香气", "轻盈乳酪的慕斯级细沙质感", "野樱莓的清脆果酸与奶甜形成的微咸平衡"],
    ingredients: ["崇明特供鲜挤生牛乳", "深海矿物纯海盐", "手洗野草莓果干", "苹果酸乳酸起子"]
  }
];

export const mockMerchants: Merchant[] = [
  {
    id: "m1",
    name: "谷物私语",
    subtitle: "麦浪涌动，窑烤里的时光絮语",
    rating: 4.9,
    reviewCount: 328,
    pricePerCapita: 45,
    distance: "500m",
    coordinate: { x: 30, y: 40 },
    category: "手工烘焙",
    tags: ["#拍照出片", "#天然原生", "#柴火老味", "#健康麦香"],
    features: ["限时优惠", "静谧小憩", "无麸质", "宠物友好"],
    openingHours: "08:00 - 18:30",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 静安区 巨鹿路 188号",
    description: "「谷物私语」诞生于对古法面包的热爱。我们坚持使用石磨全麦面粉与手工培养的天然野生鲁邦种，在古法修筑的穹顶泥窑里用苹果松木慢火煨烤，每一支面包都刻画着木火和时间的温度。主厨阿麦坚信，好面包是富有灵魂的生命体。",
    images: [
      "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=500"
    ],
    products: [
      featuredProducts[0],
      {
        id: "p1_2",
        name: "海盐原味焦香牛角",
        price: 18,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
        category: "手工烘焙",
        artisan: "谷物私语 (主厨 阿麦)",
        description: "手工反复折叠开酥，折射出亮丽的金黄层次。海盐微咸，完美抵消了黄油的厚腻感。外皮松脆，一咬掉渣，内心却湿润温软，有着致命的麦油乳香。",
        craftingProcess: "使用AOP法国产区发酵黄油，面团经零下18度冷冻定型后，由面包师纯手工三折法，经36层重叠擀开。窑炉出炉前刷上薄薄糖水并撒上日本赤穗海盐片，令表皮焦化度拉满。",
        tasteNotes: ["表层咸脆", "酥层层层舒展", "内部组织如风箱充盈黄油奶香气"],
        ingredients: ["AOP发酵黄油", "日晒红小麦面粉", "山泉水", "赤穗大颗粒海盐"]
      },
      {
        id: "p1_3",
        name: "玫瑰红豆英式司康",
        price: 22,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400",
        category: "手工烘焙",
        artisan: "谷物私语 (烘焙师 晓晓)",
        description: "经典英式松饼，巧思融入了纯手工熬煮的平阴重瓣玫瑰酱与大颗粒红豆，带来浓郁的江南水乡温柔幽香，粉糯清甜，满口芬芳。",
        craftingProcess: "红豆提前24小时冷水泡发，小火砂锅炖煮至开花，加入冰糖捣泥并刻意留下完整红豆颗粒。在低温面团中轻柔揉入红豆与重瓣玫瑰干及冷藏黄油碎块，微火烤制25分钟至金黄开裂。",
        tasteNotes: ["外表酥松微脆", "内部粉糯细腻", "深邃的玫瑰花香随口化开，持久悠长"],
        ingredients: ["有机中筋面粉", "安佳淡奶油", "平阴重瓣玫瑰酱", "散养土鸡蛋", "特选东北冰糖红豆"]
      }
    ],
    ratingsBreakdown: {
      taste: 5.0,
      ambience: 4.8,
      ingredients: 4.9
    }
  },
  {
    id: "m2",
    name: "苏式三鲜 暖心馄饨",
    subtitle: "大筷擀面，老灶高汤里的邻里温存",
    rating: 4.9,
    reviewCount: 542,
    pricePerCapita: 28,
    distance: "1.2km",
    coordinate: { x: 55, y: 35 },
    category: "传统小吃",
    tags: ["#手擀银丝", "#汤头极鲜", "#老字号", "#街坊邻里"],
    features: ["限时优惠", "传统小吃", "传统面点", "静谧小憩"],
    openingHours: "07:00 - 14:00, 16:30 - 20:30",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 徐汇区 五原路 62号",
    description: "承载了三代人岁月的手作面坊，多年来一直靠几扇斑驳旧木门和一块手工雕刻的招牌坚守在老弄堂里。这里的银丝面完全采用大竹竿手工压制，韧性十足，汤清鲜美。最绝的是薄皮三鲜大馄饨，猪骨与整只散养鸡慢火熬汤一整夜，让人吃完暖身暖心。",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=500"
    ],
    products: [
      {
        id: "p2_1",
        name: "手包荠菜三鲜大馄饨",
        price: 18,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=500",
        category: "传统小吃",
        artisan: "苏式三鲜 (苏妈妈)",
        description: "苏妈妈每日清晨4点在菜场挑选的鲜嫩露水荠菜。搭配纯手工剁碎的鲜黑前腿猪肉，调以手工熬制的猪油，皮薄如蝉翼，汤鲜得掉眉毛。",
        craftingProcess: "荠菜纯手工摘去黄叶泥根，开水快速焯烫冷水镇凉，手工攥干水分后细细剁皮。前腿肉去筋膜手工双刀笃斩成碎（绝不用机器绞），肉馅保持绝妙的颗粒颗粒活性。馄饨皮是老两口手工手擀制，皮子薄透可映月光，一裹即成，入骨汤锅游弋即成。",
        tasteNotes: ["荠菜特有的早春山野自然清香", "黑猪肉滑弹甘美多汁", "高汤融合太湖干虾米与白胡椒粉的咸鲜"],
        ingredients: ["散养黑前腿猪肉", "头茬春荠菜", "老母鸡汤", "特级干虾皮", "手炼黑毛猪猪油"]
      },
      {
        id: "p2_2",
        name: "竹升手压金牌银丝面",
        price: 15,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400",
        category: "传统小吃",
        artisan: "苏式三鲜 (苏老伯)",
        description: "苏老伯承袭正宗竹升压面法，不加半滴水，全靠散养鸭蛋黄揉面。坐在大竹竿一端宛如跷跷板压制两小时。面条细如丝发，口感脆爽有弹性，带有纯粹的蛋香。",
        craftingProcess: "精面粉里打入十个鲜鸭蛋黄，不加水全手工揉揉开。苏老伯跨在长两米的粗毛竹竿一端，用体重反复碾压面团数百次直到面皮薄致不折。机器仅用来匀细切割。煮面水大火沸腾，过冷河两次，面条爽脆利落。",
        tasteNotes: ["入口极具爽弹张力，韧劲非凡", "鸭蛋黄的深香在咀嚼中缓缓发散", "面身挂满鲜浓汤汁"],
        ingredients: ["高筋麦芯粉", "精选散养鸭蛋黄", "纯生鸭骨原汤", "清香细野韭菜花"]
      }
    ],
    ratingsBreakdown: {
      taste: 4.9,
      ambience: 4.5,
      ingredients: 4.9
    }
  },
  {
    id: "m3",
    name: "素食心经 有机工坊",
    subtitle: "青苗食苑，林深之处的植物治愈派",
    rating: 4.8,
    reviewCount: 195,
    pricePerCapita: 62,
    distance: "800m",
    coordinate: { x: 42, y: 65 },
    category: "有机素食",
    tags: ["#健康轻食", "#无糖无油", "#绿意洋溢", "#花草世界"],
    features: ["纯素食", "午后茶点", "露天空间", "宠物友好", "无麸质"],
    openingHours: "10:00 - 19:00",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 长宁区 愚园路 1012号",
    description: "落址于老梧桐洋房下的玻璃房有机工坊。「素食心经」尊崇自然共生的法则，与江浙沪周边家庭式有机农场直接签约契作，每天早晨接收露水蔬菜。主理人娜玛擅长运用全植物原料与手工发酵食品，重构对食物色、声、香、味的极致想象，不给身体添加任何负担。",
    images: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=500"
    ],
    products: [
      featuredProducts[1],
      featuredProducts[3]
    ],
    ratingsBreakdown: {
      taste: 4.7,
      ambience: 4.9,
      ingredients: 4.9
    }
  },
  {
    id: "m4",
    name: "陈爷爷秘制老酱",
    subtitle: "火红二荆条，一罐祖辈秘法的鲜辣热烈",
    rating: 4.7,
    reviewCount: 145,
    pricePerCapita: 35,
    distance: "2.4km",
    coordinate: { x: 75, y: 55 },
    category: "传统小吃",
    tags: ["#匠人炒制", "#柴火重辣", "#祖传秘方", "#无添加"],
    features: ["限时优惠", "传统小吃", "无麸质"],
    openingHours: "09:00 - 18:00",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 黄浦区 顺昌路 212号",
    description: "坚持三十年从不做广告，全凭弄堂飘香吸引无数食客的‘陈酱铺’。年逾七旬的陈老先生，每年秋季亲自远赴四川、贵州山地寻找优质辣椒与花椒。坚持古法用石臼舂椒，用松木炭火架起生铁锅足足翻炒4个小时。他做出来的不是香辛爆辣，而是辣椒浸透醇油后持久温存的椒鲜焦香。",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIOwm6GLYmMR6F_si7yIVqb1Ll6kW9ttgS5P3pBwnHkunfzRQxoip3MU9iehtOU6PRfdlU0NFhBwMKX9mPZbF5nwN5MJbdt26tkgMr1qGy0m2mA69WvNbcs_G-yRF3JzIimgEZ7xTp8wIKq39EH5em2LLis17ZcEmEw7oo4Ual1VsKfIDUVJzy18RIyi8vq9AbWvmUCx88KCfFVPYpq7DeB--IpISgDR2mHVZNAZFcui3pkhPCM59lz95jXRSLF2ivByhRD3oyBQ",
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=500"
    ],
    products: [
      {
        id: "p4_1",
        name: "陈祖秘传生铁锅炒辣椒酱",
        price: 25,
        rating: 4.8,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIOwm6GLYmMR6F_si7yIVqb1Ll6kW9ttgS5P3pBwnHkunfzRQxoip3MU9iehtOU6PRfdlU0NFhBwMKX9mPZbF5nwN5MJbdt26tkgMr1qGy0m2mA69WvNbcs_G-yRF3JzIimgEZ7xTp8wIKq39EH5em2LLis17ZcEmEw7oo4Ual1VsKfIDUVJzy18RIyi8vq9AbWvmUCx88KCfFVPYpq7DeB--IpISgDR2mHVZNAZFcui3pkhPCM59lz95jXRSLF2ivByhRD3oyBQ",
        category: "传统小吃",
        artisan: "陈爷爷秘制酱 (陈爷爷)",
        description: "三十年家传老手艺，全过程无一滴水与人工化学添加剂，二荆条辣椒辅以精练九层榨菜籽油，大铁锅纯手工火候慢推。色泽红亮如血，醇辣隽永。",
        craftingProcess: "脱水优质朝天椒和二荆条大铁锅干炒至脆黄起白泡，放入沉甸甸老石臼上手工舂碎，保持辣椒碎片的不规则断面以吸附老油。大铁锅烧热菜籽油，下陈年霉豆瓣、花椒、生姜屑、芝麻及中草药等熬干，温降至150度倾倒辣椒碎慢火搅拌。凉透后灌瓷坛熟成半月。",
        tasteNotes: ["初入口略显醇厚香辣，无呛鼻火气", "中部展现芝麻跟豆豉复合的发酵香醇", "尾韵豆瓣酱甜伴着麻舌余波久久生津"],
        ingredients: ["脱水二荆条辣椒", "山地大粒青花椒", "手榨黄菜籽油", "秘传熟芝麻", "陈年发酵蚕豆酱"]
      }
    ],
    ratingsBreakdown: {
      taste: 4.9,
      ambience: 4.1,
      ingredients: 4.8
    }
  },
  {
    id: "m5",
    name: "筑茶隐山 独幽茶室",
    subtitle: "青砖流水，一盏大红袍里的归隐浮生",
    rating: 4.9,
    reviewCount: 88,
    pricePerCapita: 120,
    distance: "3.1km",
    coordinate: { x: 20, y: 70 },
    category: "茶事琴房",
    tags: ["#极简东方", "#禅意静谧", "#大师手作", "#老字茶宴"],
    features: ["静谧小憩", "午后茶点", "露天空间", "纯素食"],
    openingHours: "13:00 - 21:30",
    isOpen: false,
    statusText: "即将营业",
    address: "上海市 青浦区 朱家角古镇 漕河街 88号",
    description: "大隐于朱家角古镇深巷里的一座百年苏式古建。我们主张煮一壶泉水、烹一炉红炭，将古朴东方茶道引回日常劳碌之中。全店精选茶室主掌陆师傅亲自在闽北老岩制作的高山茶，配备景德镇柴烧手工盖碗，推窗看河水泛舟，品茗听琴，偷得半日闲暇。",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCL02gPpYYGz12qUdXY14g3tYhfls7Jol02gaGxVJ65jGmi9DasATz7yGDj1dJXtb8lj2LwzaYEN2QlBkME5oJ2AV7QgGCVymopYnuk1Y9V_s8HdylNUsmO4lSeIbO1uWFSkxszpp5uyhG6f451_Ip9WRRF9n8jRUgRF0oa0Y7Z3_iGcg5Vy9X6DuRv9Ap88FfdFTKCSkXWYdtTlXyOzMsqCbuzSQahRpFOcmpRqyd5jxETizdcqaNlr6_u69nhqVl8u4E8l8kEuQ",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=500",
      "https://i.postimg.cc/cLbXTmHt/dahongpao-roasted-tea-1780321136760.jpg"
    ],
    products: [
      featuredProducts[2]
    ],
    ratingsBreakdown: {
      taste: 5.0,
      ambience: 4.9,
      ingredients: 4.9
    }
  },
  {
    id: "m6",
    name: "山野林间 柴火石磨豆腐坊",
    subtitle: "青石碾磨，松木灶火下的一碗温热豆花",
    rating: 4.8,
    reviewCount: 164,
    pricePerCapita: 18,
    distance: "1.8km",
    coordinate: { x: 45, y: 50 },
    category: "非遗工坊",
    tags: ["#石磨手工", "#纯天然盐卤", "#柴火慢熬", "#设计师手作"],
    features: ["纯素食", "无麸质", "限时优惠"],
    openingHours: "06:30 - 13:00",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 青浦区 朱家角古镇 西弄 18号",
    description: "搬进朱家角古镇的设计师夫妇所创办的传统手作豆腐坊。淘洗颗粒饱满的大豆，经青石磨盘慢速碾浆，保留天然大豆脂香。老式大铁锅松木柴火慢煮，带出独特的柴焦微焦。纯手工徐徐点制，其豆香醇厚，口感温润滑嫩。",
    images: [
      "https://i.postimg.cc/KzqPvcMs/tofu-pudding-dessert-1780321894382.jpg",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=400"
    ],
    products: [
      {
        id: "p6_1",
        name: "古法柴火盐卤手工豆腐",
        price: 12,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
        category: "有机素食",
        artisan: "山野林间 (晴子 & 阿木)",
        description: "纯天然豆浆柴火慢熬，古法盐卤点成。质地极其密实，切片不散，豆香和回甘久久不散。",
        craftingProcess: "大豆浸泡十小时，黑石磨慢转出浆，双层纱布过滤。生铁锅里烧柴火慢滚三泡，以带出微焦柴香。任老汉凭几十年直觉，用细长木勺徐徐点注天然盐卤，压石板两小时凝出香豆腐。",
        tasteNotes: ["初入口质地厚重扎实", "细嚼散发大豆纯天然脂香", "微带古法盐卤的复合清甘"],
        ingredients: ["东北有机黄大豆", "深山泉水", "东海天然盐卤汁"]
      },
      {
        id: "p6_2",
        name: "古法松火石磨手工豆腐花",
        price: 8,
        rating: 4.9,
        image: "https://i.postimg.cc/KzqPvcMs/tofu-pudding-dessert-1780321894382.jpg",
        category: "传统小吃",
        artisan: "山野林间 (晴子 & 阿木)",
        description: "精选饱满黑豆、黄豆混合碾磨，生铁锅松柴文火温热烧煮，点配出清香细滑、娇嫩温热的原生态豆腐花。",
        craftingProcess: "清晨三点手推石磨推成细乳，纯菜籽油抹锅防焦，松木细梢文火慢煨。调配天然红盐卤一点即成，撒上紫菜碎、小干虾米、新鲜小绿野葱，淋入生抽与手工辣油。",
        tasteNotes: ["触唇极其滑糯如脂，温甜清香", "淡淡柴焦松烟味带出古朴原始感", "葱香、虾干之咸香与红熟辣油微辛完美和融"],
        ingredients: ["江南黑黄大豆", "本地古井清泉水", "紫菜花", "烘干虾皮", "野香葱"]
      }
    ],
    ratingsBreakdown: {
      taste: 4.8,
      ambience: 4.3,
      ingredients: 5.0
    }
  },
  {
    id: "m7",
    name: "平阴红粉 玫瑰蜜作",
    subtitle: "朝露采花，揉碎一地重瓣玫瑰的芬芳",
    rating: 4.9,
    reviewCount: 94,
    pricePerCapita: 35,
    distance: "2.1km",
    coordinate: { x: 35, y: 75 },
    category: "街角糖铺",
    tags: ["#手作花糖", "#无添加色素", "#花气扑鼻", "#非遗玫瑰"],
    features: ["午后茶点", "限时优惠", "静谧小憩"],
    openingHours: "09:30 - 18:30",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 黄浦区 绍兴路 12号",
    description: "专事鲜花手作与低糖蜜饯的精致小店。选用清晨带露水采摘的平阴重瓣红玫瑰，手工轻揉去苦涩，拌入野生土蜂蜜，在青釉瓷罐中密封陈酿数月。我们还推出了烘焙系列的玫瑰软糕和鲜花小酥，满口繁花芬芳，甜而不腻。",
    images: [
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400"
    ],
    products: [
      {
        id: "p7_1",
        name: "古法岩糖玫瑰陈酿",
        price: 36,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=500",
        category: "手工烘焙",
        artisan: "平阴红粉 (云掌柜)",
        description: "选用平阴头茬重瓣春玫瑰，手工木锤轻舂至半碎，加入大块古法黄冰糖和少许纯正白酒熟化三个月以上，香气扑鼻。",
        craftingProcess: "清晨带露采摘的重瓣玫瑰，自然风干水汽。云掌柜手工挑去花梗、花萼，放入樟木盆用木杵捣揉。按比例拌入古法黄冰糖与蜂蜜，层层码入洗净晾干的青釉陶罐中，加盖黄泥，埋入桂花树下发酵百日。",
        tasteNotes: ["极为柔和的花香炸裂", "蜜甘甜美不赘味", "尾调带有天然发酵的优雅微醺"],
        ingredients: ["平阴重瓣红玫瑰", "手工黄冰糖", "森林生野蜂蜜", "绍兴老雕白酒"]
      }
    ],
    ratingsBreakdown: {
      taste: 5.0,
      ambience: 4.8,
      ingredients: 4.9
    }
  },
    {
    id: "m8",
    name: "老街阿婆 手工青团",
    subtitle: "艾草碎泥，那一口软糯到心底的纯朴春味",
    rating: 4.9,
    reviewCount: 422,
    pricePerCapita: 15,
    distance: "1.1km",
    coordinate: { x: 62, y: 48 },
    category: "传统小吃",
    tags: ["#野生艾草", "#手捣糯米", "#咸蛋黄肉松", "#儿时纯味"],
    features: ["传统小吃", "限时优惠", "传统面点"],
    openingHours: "07:30 - 18:00",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 青浦区 朱家角古镇 东井街 16号",
    description: "朱家角古镇街坊最爱的阿婆青团。坚决不用廉价的麦青粉或人工香精，只用清明前在野地里手工采摘的真正野生艾草。经石灰水焯水、手捣成泥，再与太湖优质糯米粉揉捏成皮。中间包裹上手烤鲜蛋黄与苏式肉松，外皮碧澄，清香扑鼻，软糯极其劲道。",
    images: [
      "https://i.postimg.cc/SRccL6P5/floss-yolk-qingtuan-1780320786151.jpg",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400"
    ],
    products: [
      {
        id: "p8_1",
        name: "手捣艾草咸蛋黄肉松青团",
        price: 8,
        rating: 4.9,
        image: "https://i.postimg.cc/SRccL6P5/floss-yolk-qingtuan-1780320786151.jpg",
        category: "传统小吃",
        artisan: "老街阿婆 (陈阿婆)",
        description: "纯野生艾草汁泥揉皮，外包一整颗鲜剥烤酥咸蛋黄以及手工擦碎的熟猪肉松，饱满油润，软糯香极。",
        craftingProcess: "阿婆带上篮子清晨去田埂采野生嫩艾茎，焯水去草腥，石臼舂捣成细腻碧绿艾草泥。掺调糯米粉反复叠压百遍，揪起揉成面剂。包裹刚敲出的油润鸭蛋黄，蒸笼蒸十五分钟。",
        tasteNotes: ["浓郁却清逸的旷野艾草苦清香", "面皮粘糯拉丝，极富精骨", "咸蛋黄沙沙流油与肉松咸甜完美中和"],
        ingredients: ["太湖大颗粒圆糯米", "野生鲜艾草", "手剥散养高邮盐鸭蛋黄", "苏式前腿肉手擦肉松"]
      }
    ],
    ratingsBreakdown: {
      taste: 4.9,
      ambience: 3.8,
      ingredients: 5.0
    }
  },
  {
    id: "m9",
    name: "清溪流水 泉水磨坊",
    subtitle: "古石旋转，天然粗麦里的质朴生命力",
    rating: 4.7,
    reviewCount: 75,
    pricePerCapita: 32,
    distance: "4.5km",
    coordinate: { x: 15, y: 35 },
    category: "手工烘焙",
    tags: ["#全麦低卡", "#古石冷磨", "#纯净山泉", "#野生黑麦"],
    features: ["无麸质", "静谧小憩", "宠物友好", "纯素食"],
    openingHours: "08:30 - 17:30",
    isOpen: false,
    statusText: "即将营业",
    address: "上海市 青浦区 练塘镇 贞溪北路 22号",
    description: "一间将生活调入慢速挡的古朴磨坊。我们引进高山红石磨，以极低速干磨全麦，彻底避免了不锈钢机器在高速旋转中产生瞬时高温对麦香与微量元素的破坏。搭配天然冷冽山泉水，以及烘焙师小叶自家培育十二年的黑麦老酸面种。一千天一万次拉磨，只为带给您最富有土地生气的烤香包。",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400"
    ],
    products: [
      {
        id: "p9_1",
        name: "古石冷磨全麦酸面包",
        price: 35,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400",
        category: "手工烘焙",
        artisan: "清溪流水 (烘焙师 小叶)",
        description: "冷石磨麦粉、天然黑麦酸种、经36小时慢长低温发酵。外皮有着烤杏仁硬香，芯部富有强健的咀嚼弹力。",
        craftingProcess: "用重达五百斤的红石磨慢转小麦。加入千日养护的黑麦野生起子酵母。冰水和面，纯手工十次翻面。在生铁窑230度大火锁死外部水分中微火烤40分钟。",
        tasteNotes: ["初咬带烟熏木香与烘烤坚豆味", "越嚼面粉本身的古朴麦香越发纯美", "尾韵中带有高级的原酿苹果微酸"],
        ingredients: ["冷磨红硬春全麦粉", "古法天然黑麦老面老酵母", "天目山清泉水"]
      }
    ],
    ratingsBreakdown: {
      taste: 4.8,
      ambience: 4.6,
      ingredients: 4.9
    }
  },
  {
    id: "m10",
    name: "丰山松火 窑藏瓦罐肉",
    subtitle: "大窑慢火，封罐煨炖出的红亮糯滑",
    rating: 4.9,
    reviewCount: 164,
    pricePerCapita: 98,
    distance: "1.5km",
    coordinate: { x: 65, y: 40 },
    category: "私房膳食",
    tags: ["#松木慢炖", "#红泥封罐", "#油亮软糯", "#沈大主厨"],
    features: ["午后茶点", "限时优惠"],
    openingHours: "11:00 - 21:00",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 普陀区 宜昌路 588号",
    description: "大厨沈师傅三十年专注于古法泥封窑烧瓦罐肉。每只砂罐封泥，采用优质老松木薪柴隔空慢炖。慢熬八小时之后，红亮糯滑，肥而不腻，带着独特松焦烟熏香。",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400"
    ],
    products: [
      {
        id: "p10_1",
        name: "大窑古法封坛红烧肉",
        price: 98,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400",
        category: "匠心私厨",
        artisan: "丰山松火 (大厨 沈师傅)",
        description: "选用肥瘦黄金比散养黑五花肉，绍兴黄酒与冰糖生抽在陶罐内文火煨干，红亮油润，软糯而不腻。",
        craftingProcess: "五花肉切成黄金大方块，沸水快速焯水。灌进紫砂粗坛，层层叠葱姜老冰糖，倒满老绍酒。用大黄泥糊严坛口，送入热黄土窑由杉木木炭慢焐整夜。",
        tasteNotes: ["肉皮酥软肥糯至极，入口化汁", "瘦肉部分充分噙满陈酿酒香，绝不干柴", "卤汁拌饭散发淡淡原木焦甜韵调"],
        ingredients: ["散养江南黑毛猪五花肉", "绍兴三年陈老黄酒", "手工大颗粒红糖", "高邮土老姜"]
      }
    ],
    ratingsBreakdown: {
      taste: 5.0,
      ambience: 4.4,
      ingredients: 5.0
    }
  },
  {
    id: "m11",
    name: "手琢春山 竹筒糯米糕",
    subtitle: "翠竹清油，一筒桂蜜下的原乡甜润",
    rating: 4.8,
    reviewCount: 154,
    pricePerCapita: 18,
    distance: "0.9km",
    coordinate: { x: 28, y: 56 },
    category: "传统小吃",
    tags: ["#淡竹清香", "#手工精拉", "#柴灶慢蒸", "#金桂生蜜"],
    features: ["传统小吃", "限时优惠", "纯素食"],
    openingHours: "07:00 - 16:30",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 青浦区 朱家角古镇 漕平路 12号",
    description: "宋师傅守着一间斑驳的江南小木屋，几十年只做最本色的竹筒糯米蒸糕。我们选用太湖当年新鲜圆糯米，多日泉水浸泡后，在青石一锤一锤手工舂粉。将玉粉放入清晨刚从竹林中劈下的淡绿嫩竹筒中，置于杉木甑子上，以山野松木劈柴猛火蒸蒸，翠竹的微苦清香和温热的蜜甜糯面完美交融。",
    images: [
      "https://i.postimg.cc/L5Mtwgk6/look1.jpg",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=400"
    ],
    products: [
      {
        id: "p11_1",
        name: "古法松木淡竹筒红豆糯蒸糕",
        price: 10,
        rating: 4.8,
        image: "https://i.postimg.cc/L5Mtwgk6/look1.jpg",
        category: "传统小吃",
        artisan: "手琢春山 (糕点匠 宋师傅)",
        description: "精磨糯粉、手捣红豆沙，加入野金桂花蜜，盛进新鲜淡竹筒蒸煮，清润软香。",
        craftingProcess: "太湖糯米磨成粉，石磨压干，揉入桂糖和细腻红豆沙，塞满清晨砍下的淡绿嫩竹筒。置大木锅用纯松木大火慢熏蒸两熟。",
        tasteNotes: ["初入口带有一缕嫩竹的木本清冷气", "极为软糯，嚼到最后依旧带有一股麦芽甜", "桂花的原生花蜜带来明澈而不燥的清香"],
        ingredients: ["太湖当造精优质糯米", "野生金桂花原蜜", "新鲜劈制淡翠竹筒"]
      }
    ],
    ratingsBreakdown: {
      taste: 4.9,
      ambience: 4.5,
      ingredients: 4.9
    }
  },
  {
    id: "m12",
    name: "素园隐记 柴火窑烤纯植斋",
    subtitle: "纯植生鲜，一席温热泥炭里的自然恩赐",
    rating: 4.8,
    reviewCount: 68,
    pricePerCapita: 78,
    distance: "3.5km",
    coordinate: { x: 50, y: 72 },
    category: "有机素食",
    tags: ["#窑烤红薯面包", "#无糖低脂", "#纯植根菜", "#泥炉焦香"],
    features: ["纯素食", "无麸质", "静谧小憩", "宠物友好"],
    openingHours: "11:00 - 20:30",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 崇明区 建设镇 滧建设路 44号",
    description: "隐于崇明岛自然风光里的纯植玻璃暖房。主理人娜施崇尚纯素无加工理念。我们不用人造大豆素肉，而是在泥炭瓦窑里慢烤刚刚从沙地里挖掘出的红薯、甜栗。再佐以香草与崇明大盐片，带出最本真的植物脂香。",
    images: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400"
    ],
    products: [
      {
        id: "p12_1",
        name: "崇明泥柴窑烤板栗红薯粗麦饼",
        price: 36,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
        category: "有机素食",
        artisan: "素园隐记 (主理人 娜施)",
        description: "烤得焦黄糖油爆溢的沙地红薯，手工捣泥，混入大粒野生熟栗和自磨粗麦，温润甜糯。",
        craftingProcess: "起柴火将崇明甜甘薯烤出红糖焦焦，手工挑皮锤烂，填入爆香的板栗碎，在红土泥窑中用其余灰焐烤两小时熟化。",
        tasteNotes: ["浓重和煦的烤薯焦糖微苦芬芳", "薯泥丝团极糯，颗粒香栗大而沙软", "全麦干面包芯的咸麦香平衡了多余甜度"],
        ingredients: ["崇明沙地红皮甘薯", "野生沙地香板栗", "手工磨红春红小麦粗屑"]
      }
    ],
    ratingsBreakdown: {
      taste: 4.7,
      ambience: 4.9,
      ingredients: 5.0
    }
  },
    {
    id: "m13",
    name: "隐溪琴石 私房汤药煲",
    subtitle: "文火砂煲，一鼎陈艾人参老鸡汤的温补",
    rating: 4.9,
    reviewCount: 78,
    pricePerCapita: 198,
    distance: "4.8km",
    coordinate: { x: 68, y: 80 },
    category: "私房膳食",
    tags: ["#老陶砂煲", "#林下散养鸡", "#三十年陈艾", "#节气温补"],
    features: ["静谧小憩", "限时优惠"],
    openingHours: "12:00 - 22:00",
    isOpen: false,
    statusText: "即将营业",
    address: "上海市 青浦区 练塘镇 贞溪南路 102号",
    description: "藏身于古溪水榭深处的养生私房汤房。主厨老陆精挑细选各省深山野生草药，依据二十四节气，坚持用天然红陶砂罐，以极慢的竹叶和干杉木微火，慢炖林下散养土鸡整整十个小时。汤色澄澈纯美，滋补调理，通体安舒。",
    images: [
      "https://i.postimg.cc/bYSgNbmv/herbal-chicken-soup-1780321367407.jpg",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400"
    ],
    products: [
      {
        id: "p13_1",
        name: "二十四节气人参陈皮慢炖土鸡汤",
        price: 198,
        rating: 4.9,
        image: "https://i.postimg.cc/bYSgNbmv/herbal-chicken-soup-1780321367407.jpg",
        category: "私房膳食",
        artisan: "老陆",
        description: "以深山散养土老鸡为底，配伍吉林野生参片和新会优质陈皮，盖面抹泥。架在松木炭炉上以极文火丝丝慢煨半日。",
        craftingProcess: "将温热 of 土鸡碎块连同野生吉林人参、正秋陈皮一同填入优质陶质内煲里，加入野生陈艾与温火慢煨12小时，不添加任何盐与味精，慢火熬炖十小时，让药材元气渗进鸡肉，温醇鲜甜。",
        tasteNotes: ["药香极其幽柔，参香、陈皮香、艾香完美交扣", "亮黄色汤底没有半分多余油脂，细腻香甜", "鸡肉软骨炖得酥碎，嚼汁鲜酥"],
        ingredients: ["高山走地土母母鸡", "吉林野山生熟参", "正庄新会老陈皮", "野生干艾叶"]
      }
    ],
    ratingsBreakdown: {
      taste: 4.9,
      ambience: 4.9,
      ingredients: 5.0
    }
  },
  {
    id: "m14",
    name: "老牌弄堂 油墩子蜜糕",
    subtitle: "老铁长勺，外酥里温金黄脆香的小温暖",
    rating: 4.8,
    reviewCount: 288,
    pricePerCapita: 12,
    distance: "0.5km",
    coordinate: { x: 38, y: 32 },
    category: "传统小吃",
    tags: ["#手擦白萝卜丝", "#纯菜籽油炸", "#老铁勺生压", "#小时候滋味"],
    features: ["传统小吃", "限时优惠", "传统面点"],
    openingHours: "06:00 - 19:00",
    isOpen: true,
    statusText: "营业中",
    address: "上海市 黄浦区 顺昌路 15号",
    description: "张大叔一辆干净的小推车，一做就是三十多个春秋。萝卜必须洗净皮手工擦丝，用大粒盐腌出微苦的水分，抓大把葱碎。老熟菜油烧在大铁锅中，在磨得很亮的铁柄深勺里抹上面酱打底，压上萝卜丝香葱，放入滚油中炸至金脆。咔嚓一口，满口多汁清甜在冷风中温热了路人的心田。",
    images: [
      "https://i.postimg.cc/bJD5h5Gd/sweet-honey-cake-1780321514964.jpg",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400"
    ],
    products: [
      {
        id: "p14_1",
        name: "老式手擦萝卜丝金黄油墩子",
        price: 4,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400",
        category: "传统小吃",
        artisan: "老牌弄堂 (张大叔)",
        description: "水嫩白萝卜手工精细擦丝，传统长勺在黄菜籽滚油中高温慢炸，外壳酥脆，内芯烫嫩多汁。",
        craftingProcess: "鲜甜萝卜手擦匀细，挤干涩汁。开匀稀面糊。大铁勺抹糊垫底，填满重重萝卜丝、嫩葱花，最后封顶面糊。下入滚烫的纯黄菜籽油里，控油炸制，直至自行脱模，表面炸出起酥金黄泡。",
        tasteNotes: ["外表极其香油酥脆，一嘴渣", "萝卜丝中吸饱了热油和葱花香，甜而烫口", "面粉壳淡淡微焦带有天然菜籽油脂芳甜"],
        ingredients: ["太湖大沙甜白萝卜", "春熟野小葱", "手生黄菜籽油", "中筋面粉"]
      },
      {
        id: "p14_2",
        name: "手作桂花软糯蜜糕",
        price: 6,
        rating: 4.9,
        image: "https://i.postimg.cc/bJD5h5Gd/sweet-honey-cake-1780321514964.jpg",
        category: "传统小吃",
        artisan: "老牌弄堂 (张大叔)",
        description: "精选崇明优质糯米揉粉，混入干桂花与天然百花蜜慢火蒸制。糕体温润弹牙，甜香甘怡。",
        craftingProcess: "糯米淘净晾干磨粉，拌入自家酿制的糖桂花。调蜜水和匀，层层铺糯米粉至竹蒸屉中。猛火蒸熟，淋上透亮的新鲜野百花蜜，趁热切成菱形块。",
        tasteNotes: ["入口极具稻米纯正微甜，糯而不粘", "桂花清香浮现，蜜甜滋润回甘长久", "温热吃时松软可口，冷放后柔韧有嚼度"],
        ingredients: ["高山手磨糯米粉", "手工糖腌金桂花", "高山野生百花蜂蜜", "白砂糖"]
      }
    ],
    ratingsBreakdown: {
      taste: 4.9,
      ambience: 3.5,
      ingredients: 4.8
    }
  }
];

export const mockStories: Story[] = [
  {
    id: "s1",
    title: "择一事终一生：造一座苹果木窑的“麦香疯子”",
    summary: "在机械化吐司流水线充斥城市的年代，阿麦在闹市区亲手和黄泥造了一座220度火温的意式穹顶老窑，用最笨拙的天然老面，烤着一块块硬邦邦却香出眼泪的全麦欧包。是什么让他坚持了八年？",
    content: "坐在巨鹿路弄堂落叶深处的阿麦，满身总是挂着白扑扑的麦面粉。在决定开办‘谷物私语’之前，阿麦是一名写字楼里习惯深夜加班的程序员。‘那时候觉得日子踩不到地，飘在半空’，阿麦在案板上用力折叠面团，脸上带着自嘲的笑容。‘直到一次去意大利乡村旅行，一个饱经柴烟熏黑的白发老奶奶，随手从黄泥建造的老窑里掏出一大块烫手欧包递给我。那口咬下去，真正的石磨麦屑在舌尖蹦开，那是泥土、阳光与木头燃烧揉捏出的甜汁。我当即决定，回国也造一座。’ \n\n为了筑造这只穹顶生铁窑，阿麦在巨鹿路一间废气庭院里跟三个泥水匠耗了三个月，手工糊了百来层火山岩耐火泥。‘烘干、热窑、控温，全是精细活。稍微一阵贼风，火温便从240度跌回160度，烤出来的面包就会塌憋。’ \n\n现在的欧包每天限量烤四十个，‘天然野生鲁邦种（Lievito Madre）非常娇贵，我们养了整整六年。每天要像照顾熟睡的小婴儿大口喂面喂泉水。’阿麦抚摸着那只表面满覆乳酸白粉的厚实面罐。‘现代工业用单株人工干酵母， 2小时就能出炉一筐完美的切片白吐司；我们却要让野菌群带上大豆、苹果的天然碎渣在5度的冰柜里缓慢吞吐24小时。但慢是有回报的——谷物深处的蛋白质在此退去粗戾，转化为浓密多姿的游离氨基酸，散发出不可复制的果香与乳脂甜。这就是纯手工，这是慢火的魔力。’\n\n每天清晨10点门刚推开，巨鹿路上已站满了排队十几人的相熟面友。阿麦微笑着将沉甸甸的暖欧包用棕黄布袋包起：‘看着大家把一整条欧包切成片，嚼着面、喝着热茶，我觉得我整个人已经落入到泥土深处，根深叶茂，无比踏实。’",
    image: "https://i.postimg.cc/ry96jBL4/artisanal-sourdough-1780274060881.jpg",
    tag: "匠人访谈",
    author: "寻味编辑部 - 小愚",
    date: "2026-05-18",
    readTime: "6分钟"
  },
  {
    id: "s2",
    title: "周末市集漫游指南：去愚园路捕获一抹手制的治愈微光",
    summary: "又是一年秋浓。本周末愚园路创意“匠心寻味”手工美食与创艺市集再度落幕。从一块野生果干酸奶酪，到一捧非遗揉团艾青团，让我们跟随着二十位民间手作主厨的摊位，感受生活真实的纹理。",
    content: "梧桐泛黄的愚园路这周末被一阵诱人的焦糖与热高汤包围了。‘匠心寻味市集’摆出了成排温暖的灯盏，汇聚了江浙沪各路执着于‘纯手作’、‘不添加’的民间匠人。\n\n漫步到市集中央，一眼就会被娜玛的‘植物酸奶酪坊’所吸引。几块用藏青染布铺设的案板上，盛放着用麻布包起的、粉嘟嘟的有机果干鲜奶酪。‘这都是今晨5点从崇明牧场奶罐里提取的新鲜牛乳，历经四次麻布吊滤手工挤水制成，绝对没有凝乳剂和香精。’娜玛爽朗地递过来一份盛在椰壳刨片里的小勺，塞入嘴中，那是一种宛如在春风地里滚了一圈的微酸奶甜，野草莓碎颗粒的脆甜在牙齿缝里跳跃。\n\n旁边是陈爷爷和他的孙子租用的小推车。一口有些年头的大生铁锅，不时飘出辣得出魂却令人唾液横流的老豆豉焦底香。‘陈酱铺’红艳艳的招牌下挤满了一手托盘、一手摇扇的外地食客。老爷子微眯着眼守着锅：‘炒辣酱是个良心仗，人不能欺锅，手一软少翻炒了十分钟，那股椒皮里的香气便化不进菜油，味道便是空洞、浮夸的。’\n\n市集不仅有食物，更有流淌在其间的温热目光。年轻人和满头银发的大师挨肩并坐着，讨论着全麦粉研磨的网目。生活在无处不在的面片翻飞、高汤翻腾间被拉回最真实的日常本色。下个周六，不妨携一只藤编竹篮，不带目的来愚园路走一走，在日常手作微光里偶遇那款专属于你的烟火好味道。",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    tag: "市集寻宝",
    author: "行摄行旅 - 林探长",
    date: "2026-05-24",
    readTime: "5分钟"
  },
  {
    id: "s3",
    title: "正岩独幽：闽北深山与炭火深处的三代焙茶绝技",
    summary: "武夷山三十六峰，陆师傅世世代代与野茶树打交道。不插电、不走捷径，在温度近40度的闷热炭焙间里坚持三天三夜的九翻慢烘，只为提炼一缕通透的“岩骨花香”。让我们走近非遗匠人陆师傅。",
    content: "在乌篷船吱呀、粉墙黛瓦的朱家角古镇，有一处几乎被世俗遗忘的角落——‘筑茶隐山’。一推开厚重的黑漆木门，热烈而深沉的荔枝木炭火气与干燥温暖的熟茶香扑鼻而来。这里的茶室主掌陆老先生，已经是制茶世家的第三代传人。他在闽北的正岩悬崖边生长，大半生都交交给了掌心中的一片叶子。 \n\n‘很多人不理解，现在的电焙箱调好温度时间，一键就能烘干，为什么还要用最原始的干松木炭、荔枝木炭火焙？’陆老先生用一把竹制茶夹挑起熟褐乌亮的条索，眼里露出一丝坚韧。‘电烘没有火的灵性。荔枝松炭燃烧时，木质纤维分解释放出极其细微的果焦气息，这种香，是以极柔和饱满的分子姿态，在几十个小时的高温烘制中，一丝一缕渗透进绿茶干枯的脉络里的。这种岩韵是‘种在茶叶骨头里’的，绝不是电发热管能模仿得来的。’ \n\n每年春季制茶，老人家都要带上唯一的徒弟，足不出林守在焙房里长达半月。焙房温度高过普通桑拿房，热窑通红。隔四个小时，就要纯手工将筛上的茶叶轻轻翻倒，力道多一分会揉脱碎末，少一分则烘火不均。焙一笼极品大红袍，前后需足火三次，历时六十多天。 \n\n静坐独幽茶室，取一盏青瓷，注一壶滚烫的古镇山泉。当沸水与大红袍相遇，那是炭香、茶香与水乳交融的过程，气流翻滚，白露飘零。抿上一口，那种浓烈而不刺喉的饱满岩韵，在喉头化作深厚醇甜。这种坚持几十年流尽汗水沉淀出来的人工风骨，才是真正能够温热灵魂的手作神髓。",
    image: "https://i.postimg.cc/cLbXTmHt/dahongpao-roasted-tea-1780321136760.jpg",
    tag: "匠人访谈",
    author: "茶道月刊 - 茗风",
    date: "2026-05-26",
    readTime: "7分钟"
  },
  {
    id: "s4",
    title: "一根大竹杠，两万次晨敲：苏老伯和他的本帮银丝面",
    summary: "五原路老弄堂上午十一点，苏老伯正跨在两米长的巨型毛竹竿上，用全身重量敲打着一团刚打入十只纯鸭蛋黄的面团。不掺一滴水，纯手工压实，只为给老街坊做一碗嚼劲十足的苏式银丝面。",
    content: "走在徐汇区深处的五原路，在法式梧桐阴下，总能听到一阵沉稳有规律的‘咚、咚、咚’巨木撞击地面的闷响。那是苏老伯在用生命中的最后那根‘定海神针’——一根长达两米、磨得通体金黄铮亮的粗毛竹，来压制他沿袭了半个多世纪的竹升金牌银丝面。 \n\n苏老伯今年已经七十四岁，背有些微驼，干起体力活来却依然步履精准。‘压面是个笨力气活，省不得一分，掺不得一点假。’老爷子一边说，一边跨在大竹竿的一端，借助身体重力的弹性，上下腾跃，把身下裹了十颗鲜金黄鸭蛋黄的面团反复揉磨碾压。半天下来，面皮薄到能微微透光，却坚韧如皮革，用机器刀一拉，千万根如发丝般均匀、挺直的银丝面便倾泻而下。 \n\n‘现在外面的面，为了弹性加各种筋胶、增稠剂、防腐剂，吃着是韧，可那是死韧，不香，更不养胃。’苏大伯擦了擦额头大汗，‘我这面只用麦芯粉和纯鸭蛋黄揉开，靠这根竹竿千万次的物理撞击，将小麦蛋白质的分子链条彻底拉出最天然的韧劲，这叫活筋。有蛋香、有麦甜，过沸水两滚，脆爽爽利落落，这才是中国人肚皮最亲、最熨帖的老底子面！’ \n\n晌午时分，弄堂里的两张木桌迅速坐满了老老少少。一碗热腾腾的银丝面淋上清流鲜鸡高汤，吸溜一口，那是有生命力的脆弹与蛋香，在舌根激起温暖的余味。几十年过去，老街坊搬走又回来，只要瞧见那一抹火热通红的老灶台 and 苏老伯熟悉的身影，就会明白：真正好的生活手艺，从未走远。",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600",
    tag: "探店心得",
    author: "市民小食记 - 袁叔",
    date: "2026-05-23",
    readTime: "5分钟"
  },
  {
    id: "s5",
    title: "寻找牧场里最温柔的风：在愚园路邂逅全植物“云朵乳酪”",
    summary: "娜玛擅长运用最质朴的全自然植物与崇明岛有机生鲜，手工过滤滴干乳清。在梧桐飞扬的洋房露台上，吃一口不加任何工业化学添加剂的野莓云朵奶酪，是对劳顿身体与生活的最大自然治愈。",
    content: "愚园路上的一栋古朴阳光老洋房，每到周一至周五下午，总会被一阵极其温存的轻酸果甜与澄澈的浓郁奶香所环绕。主理人娜玛是一位常年在高原与江浙沪有机牧场奔走、气质高远的女匠人。她的‘素食心经’工坊就像一座充满了薄荷与迷迭香的绿意温室。 \n\n这里的招牌‘云朵鲜奶酪’，几乎是每一位挑剔的健康轻食达人梦寐以求的圣品。‘我们不使用任何工业化的香精、色素或是明胶增稠剂，’娜玛端出一小碟凝乳如初雪般的甜豆腐。‘每天黎明前，崇明签约牧场的优质牛乳就会送达。把它们加温、静置、然后用极细密的麻布吊挂在凉爽阴凉的地窖里，仅凭牛奶自身的重力让清澈的乳清缓慢滴落十二到十六个小时。虽然出脂率极低，但过滤出的凝乳干酪，其细润度宛如刚下树的棉桃，入口即化，满是生牛乳自带的天然植物脂香与微咸。’ \n\n为了给奶酪带来层次感，娜玛在崇明野生丛林手工采摘野生草莓、樱野莓，文火煨至半碎，用其微咸、柔和的果酸调和浓郁的奶脂。品尝一口，那是一种洗尽铅华的纯粹感，细沙滑在暖舌间温润化开，野莓的果酸与甜香激发起沉睡的味蕾。在这浮躁喧闹的都市一隅，能享受到一份如此质朴而极具匠人温度 of 食物，仿佛整片田野的微风 and 阳光，都随着这一口奶酪吹拂进了每个人的身体深处。",
    image: "https://i.postimg.cc/cCvJ705n/cloud-cheese-dessert-1780396183058.jpg",
    tag: "探店心得",
    author: "乐活轻食客 - 淇淇",
    date: "2026-05-27",
    readTime: "4分钟"
  },
  {
    id: "s6",
    title: "顺昌路三十载：陈爷爷和他的生铁锅，在烈火中慢熬的温厚辣香",
    summary: "陈酱铺坚持三十年不打广告、全靠香气留人。年近八旬的陈爷爷，在红泥炉旁用生铁锅翻炒红艳艳的二荆条长达4小时，不添加防腐剂。这一坛家传熟酱，不仅是香辣，更是岁月的悠长深沉。",
    content: "顺昌路的旧居即将迎来城市的现代改建，但只要你向老上海人问起‘陈老伯买酱’，每个人的神色里都会露出无比温热幸福的笑容。在弄堂的一扇斑驳老红漆门前，红亮红亮的干朝天椒和二荆条像山一般高高推起。陈老先生在通红的红泥炉子旁，手里握着一柄有些沉重的生铁大铲，一下下、用力地在锅底掀起火辣辣的烟雾。 \n\n‘做辣酱，机器一分钟能搅拌万次，可刀割得太细容易破坏椒肉的纤维质，吃起来只有燥辣；我坚持用传统的沉石臼手工舂椒，让二荆条外皮开裂成大小不均的粗颗粒。’陈爷爷指着黑亮通红、油亮清润的老酱，满眼都是自豪的心血。‘这口饱经风烟的生铁锅，受热慢但火候扎实透彻。把二荆条碎、手榨黄菜籽油、自酿霉豆瓣、老花椒和各种中药材小火连推四个小时，直到菜籽油的草本芳香完全把每一粒椒粒的细胞壁浸透熟化，那股辣火就会完全退去，转为沉稳、油润、无比咸鲜的熟香！’ \n\n即使无添加任何现代防腐剂，这罐老辣酱在瓷坛密封半月后，其红亮香滑也足以保存经年。这不仅仅是一瓶普通的下饭神料。配上一口最家常的白米饭或者手擀粗面，嚼下去，豆瓣和熟辣的温暖在口中弥漫扩散，那是对大自然泥土、大丰收的热烈眷恋。在陈爷爷一铲铲不曾妥协的翻炒间，这缕老弄堂的风骨正在滚荡的生铁香气里，越酿越醇厚。",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600",
    tag: "匠人访谈",
    author: "市井寻古 - 陆探员",
    date: "2026-05-21",
    readTime: "6分钟"
  },
  {
    id: "s7",
    title: "追寻一粒糯米的自我修行：寻访弄堂老手艺竹筒蒸糕",
    summary: "隐藏在朱家角弄堂的老伯手作竹筒蒸糕，坚持选用当年太湖新鲜圆糯米。历经十二道繁复工序、经杉木甑子古法柴烧两小时。清甜软糯而不粘牙，散发江南古朴的竹叶幽香，是难得的非遗甜美。",
    content: "走进青浦朱家角古镇，清晨的河道两岸笼罩在乳白色的薄薄晨雾之中。在深宅大院的一堵黛瓦墙下，升腾起几股滚烫而带有清洌杉木与翠竹香气的浓浓水汽。七十岁的宋师傅，正微眯着眼睛，用一只斑驳红漆长筷挑起大竹罱中枚小巧、圆滚、洁白如羊脂玉的竹筒蒸糕。 \n\n宋师傅家的糯米蒸糕，在江南一带有口皆碑。‘要做出真正松软甘润、放冷也毫不干硬的老腔调蒸糕，大有讲究。太湖圆糯米洗净后，必须在山泉水里泡满十三个小时。手工在石磨上磨出浆，大白棉布袋扎紧，用大青石重重压去七成水。之后，还得用细细铜网筛出如同初雪般的颗粒。在这个过程里，多一分水会粘牙成浆，少一分水则粗糙掉砂。’宋师傅熟练地将糯面扑入新鲜劈下的翠绿淡竹筒中，中间轻轻捻入两颗自己用桂蜜慢煨的熟红豆。 \n\n柴灶大火渐旺，热气透出杉木盖。在接近蒸汽最高点的二十分钟里，淡竹筒里的丰富纤维素及清油，与饱浸桂花香的糯米分子深度碰撞。起锅时趁热一抖，玉粉红豆糕滑溜而落。一咬下去，外极软糯湿润，中间糯米粒粒带筋，桂花原蜜的清甜与淡竹沁香交融，不觉齁甜，只有一种朴实纯真的自然芬芳。生活也许在现代科技红利中走得太快，但只要这古朴柴火老灶升起，那一筷子软糯，就能把人们瞬间拉回外婆家摇椅上的江南暖夏。",
    image: "https://i.postimg.cc/L5Mtwgk6/look1.jpg",
    tag: "市集寻宝",
    author: "江南食趣 - 阿珍",
    date: "2026-05-25",
    readTime: "5分钟"
  },
  {
    id: "s8",
    title: "深山悬崖上的甘甜传奇：蜂农严大叔进山寻野蜂春蜜记",
    summary: "每年谷雨后，五十多岁的严大叔便要攀上武夷野山里近九十度笔直的石壁，只为检查藏在峭壁悬灌下的天然木质蜂箱，采集极品枫树春蜜。这是人类用身手与胆量，对大自然最甜的回敬。",
    content: "武夷山大安村的清晨，山岚盘踞在九曲溪畔如梦似幻。五十多岁的蜂农严大叔，正把一捆有些沉重的尼龙大绳背上泛红的肩膀，手中拿着一柄微焦的杉木烟棒。为了追寻整座山林最醇正深甜的百草金蜜，他每年这个时候都要去挑战惊险的攀岩旅程——去峭壁和山崖深处寻访野石蜂的足迹。 \n\n‘野蜂比家养意蜂机灵、皮实，它们不喜欢人居喧嚣，只会把蜂巢筑在高达数十米的绝壁裂缝或者野树蓬里。’严叔一边手脚并用地攀爬一条几乎垂直的野藤，一边大声招呼。他在数十个几乎难以落脚的岩缝里，悬挂了自家杉木劈凿、抹了原生蜂蜡的木质‘招蜂箱’。 \n\n每只木蜂箱一整年里只在秋分割一次蜜。野蜂们采集漫山遍野的高山杜鹃、野山茶花、百年野枫树等百余种中草药花蕊的精华，不打抗生素、不要白糖水，由自然界的温度 and 风力，将野蜜本身的水分自然风干到２３度以下，形成琥珀金透、香气带有一丝草木深寂与坚果焦甜的原生醍醐。 \n\n‘割蜜要讲仁义。’严叔微眯着眼，吹出一缕松针淡淡青烟驱散野蜂，仅用细钢丝极轻极准地片下三分之二饱满蜜牌，绝不伤损幼蜂底座。‘人把事做绝了，来年野蜂就会弃箱搬家。人敬森林一尺，森林还人一丈。’刚割下的生蜜用多层干净棉纱布滴滤沉淀，装进小瓦罐。挖起一勺，亮汪汪的蜂蜜稠如脂玉，抿在嘴里有一股清晨露水拍过万叶的幽然草木凉香，回甘带有令人震撼的矿物高山韵调。这种伴随生命冒险与对自然极度敬畏孕育出的蜜甜，是这个速食世界最圣洁、最无可挑剔的手作珍宝。",
    image: "https://i.postimg.cc/nhQvF1dY/wild-spring-honey-1780321765609-(1).jpg",
    tag: "探店心得",
    author: "山野拾遗 - 老金",
    date: "2026-05-22",
    readTime: "8分钟"
  },
  {
    id: "s9",
    title: "瓦罐里的人文微光：寻找那盅炖了六小时的黑猪五花肉",
    summary: "丰山松火烤肉坊的老张，每日坚持只用亲手烧制的紫砂粗陶罐，盛纳上等高山黑猪五花，配上风干冬笋，封入土窑中用红松温火慢煨六个小时。肉酥骨化，全是炭烧和时间的味道。",
    content: "走进丰山松窑前，总能听到木屑劈裂的清脆声音和隐隐传来的香甜油脂气息。这里的主理人老张不爱穿白色厨师服，而更偏爱穿一件染得油亮的工装围裙。‘我这瓦罐炖五花，没有任何巧劲，一字以贯之，就是‘煨’。’\n\n大叔特地向我们展示了他的那些粗陶瓦罐：‘这每个陶罐表面都有极细微的火山灰矿物微孔，能完美锁住黄酒、冰糖和香料浸润的热流。我们用的猪肉是放养山林的黑猪肉，肉质弹牙有胶质。把切得四四方方的整肉丢进罐子，中间不加一滴水，底下垫上去年秋分亲手晾制的野生干笋干。最后用几层香棕叶把盖死死扎紧，整排整排摆进烧着陈年红松木炭的大窑底。’\n\n一煨就是六个小时，火力多一分肉散成屑，少一分则油脂不融、肥腻粘牙。我们静坐尝了第一口：红亮的油色极其晶莹，红松木燃烧的独特果木焦香已和酱汁混成一体。猪皮表面那层焦红极香滑紧致，肉叉轻轻一碰便化开，吸饱了五花油脂的煨笋爽脆极鲜。这一碗让人肚腹暖融的瓦罐，是对都市漂泊人最好的手作疗愈。",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    tag: "探店心得",
    author: "都市漂流记 - 希希",
    date: "2026-05-28",
    readTime: "5分钟"
  },
  {
    id: "s10",
    title: "石磨上的豆蔻年华：一对设计师夫妇在朱家角开的柴火豆腐坊",
    summary: "阿木与晴子选择放下写字楼的键盘与图纸，隐入古镇，用一架沉重的青石磨盘、和清晨四点在冷风中点燃的泥炉柴灶，揉磨一盘充满温热植物大豆香的新鲜手作豆浆。",
    content: "朱家角西弄的一角，在一张用几块磨盘拼接而成的灰度石桌上，我们见到了刚刚给土灶添柴回来的阿木。他和他的妻子晴子都毕业于上海核心美院，却在三年前作出了一个在外人看来惊世骇俗的举动：搬进上海最隐秘的古镇深处，开办了‘野林间豆腐坊’。\n\n‘大家都觉得做豆腐是苦力活、脏活。但当你跨着两百斤的青石磨盘，在沉稳的摩擦声里看着白花花、香暖高热的醇纯豆浆像融化的白玉般流在滤布上时，你会感受到极度的舒适和宁静。’晴子系着灰黄色的染布头巾，神情怡然。 \n\n每天清晨三点，两人就要淘洗颗粒饱满的有机黑豆与黄豆。石磨压面碾浆能保持大豆内部细胞活性，免受电磨高速切割升温产生的苦涩。他们的灶不插电，老老实实用红松木和桑木柴叶烧火。大锅滚沸时，面上的金黄泡沫豆腐皮厚实无比，这就是毫无豆浆精催化的最好证明。卤水点得克制轻柔，成豆腐娇嫩鲜弹，带着丝丝松木柴烟的焦香。许多周边的年轻人早起，就是为了来石桌旁喝一碗撒着碧绿野葱、生抽和手工磨碎的虾皮热豆腐花，这是充满大自然力量的饱满早晨。",
    image: "https://i.postimg.cc/KzqPvcMs/tofu-pudding-dessert-1780321894382.jpg",
    tag: "匠人访谈",
    author: "青绿手记 - 小林",
    date: "2026-05-29",
    readTime: "6分钟"
  },
  {
    id: "s11",
    title: "一温热的热汤：隐溪琴房里的八小时紫砂药煲参鸡汤",
    summary: "隐身于小桥古窗一隅的琴石膳舍，琴声冷冽幽远。老板不卖网红轻食，只坚持用传世三代的紫砂煲和山泉水煨黑鸡、人参、黄芪足足八个小时，在登桌前更需要投入一块滚烫火成岩。",
    content: "跨入高高的木质门槛，瞬间会被优雅深沉的竹箫与七弦古琴的声音包围。这里的主办人是一位熟稔琴乐与中草药食同源的养生茶人。这里的每一只招牌‘汤药煲’，都需要经过一整天极慢的等待。 \n\n‘现在的饭店用不锈钢大锅、高压气阀，四十分钟就能把鸡肉吹得肉松汤烂。但那纯是高压破坏。我们选用沉淀多年的紫砂药煲，其砂质带有天然的铁、锌等微量元素，和水、艾草、人参、枸杞缓慢受热八小时。大火煮皮、中火煨筋、文火浸骨，才能把草本的清苦化为深层的甘润。’ \n\n最为精巧的是他们古老的岩烹工序：在汤锅即将被黑衣阿姨托上桌前，厨师需用火炉将一块取自浙西山林、通体黑红的火山火成岩彻底烤红炙热，然后当着食客的面用特制生铁夹平稳投入沸鸡汤中。滚烫的坚硬矿石遇汤瞬间爆发出沉闷的草皮、人参和松木香烟，油脂和汤质在此刻深度碰撞，清油在一眨眼内被吸附分解。端起粗陶小碗啜一口：汤金色亮，黑土鸡肉丝软糯温甜。在这古雅琴声里，所有工作日累积的重负和焦虑，仿佛都被这一碗温热、深邃的手作汤药彻底治愈。",
    image: "https://i.postimg.cc/bYSgNbmv/herbal-chicken-soup-1780321367407.jpg",
    tag: "探店心得",
    author: "东方养生道 - 妙妙",
    date: "2026-05-30",
    readTime: "7分钟"
  },
  {
    id: "s12",
    title: "春意、赤豆与野生草莓香油：徐阿婆的古法手作艾草青团",
    summary: "在机械青团、香精艾粉充斥的当下。朱家角老弄堂的徐阿婆，仍然坚持每日在后山背着竹筐人工割青，用大石臼将鲜艾草捣碎。杉木蒸屉开笼的瞬间，满街都是质朴的原野芳香。",
    content: "每年春分至端午，大批渴望吃到老底子手艺的年轻人，就会从四面八方慕名涌入朱家角的大石弄。年过七旬的徐阿婆戴着副老花镜，在一只饱经岁月擦洗磨损的杉木大盆前，动作温厚而规律地搓揉着一团墨绿色的糯米面。\n\n阿婆家的青团是公认的‘原野香气’。‘好艾叶是种出来的。我们不用市面上的冷冻干艾粉来染色，只用自家露水未干时采下的鲜艾。在热水锅里加入少许面碱焯去艾叶的涩气，取出后必须在大石臼里双手持长木棒舂烂成细腻的艾叶浆，连叶片里的极细纤维一并揉进糯米里。’\n\n而阿婆家的红豆馅更是独树一帜的秘密——红小豆浸泡整夜，文火炖到融沙，在生铁锅里用菜油小火推满三个小时。蒸熟出屉的青团呈现出生机如碧的黑墨玉色，阿婆用干净细刷，在每个青团温热的脊背上轻轻刷上一层自制的、极轻盈纯正的野草莓草本提取香油。一咬下去，外皮有难以置信的艾草微涩以及浓郁草木清气，赤豆沙在口中呈浓郁软沙质，甜咸度高雅适口，两块钱一个。在阿婆那一双揉了五十年艾泥、厚实温暖的手前，不仅味蕾得到了原野的喂养，心灵也收获了久违的人情温存。",
    image: "https://i.postimg.cc/SRccL6P5/floss-yolk-qingtuan-1780320786151.jpg",
    tag: "市集寻宝",
    author: "食野寻春 - 楠楠",
    date: "2026-05-31",
    readTime: "6分钟"
  }
];

export const initialReviews: Review[] = [
  {
    id: "r1",
    merchantId: "m1",
    merchantName: "谷物私语",
    user: {
      name: "美食寻味",
      avatar: "https://i.postimg.cc/ry96jBL4/artisanal-sourdough-1780274060881.jpg",
      level: "资深探店 pioneer"
    },
    rating: {
      taste: 5,
      ambience: 5,
      ingredients: 5,
      overall: 5
    },
    content: "太让人惊艳了。巨鹿路这家窑烤真心是目前全上海欧包的天花板。松木火香在还没有进屋就能闻到。欧包外皮是完美的韧脆虎皮，轻轻敲击有清润的空洞声。内心气孔分布完美，扯开时有着惊人的弹性拉丝。无任何添加油脂的面包，反而爆发出浓密深幽的大自然微酸麦甜。吃完不仅不觉得腹胀，还会想念大口咀嚼麦屑的扎实安稳。主厨阿麦真是不折不扣的‘谷物疯子’，值得驱车三十公里一试！",
    images: [
      "https://i.postimg.cc/ry96jBL4/artisanal-sourdough-1780274060881.jpg",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400"
    ],
    date: "2026-05-25 14:32",
    likes: 42,
    tags: ["口感极佳", "窑烤火香", "天然健康", "主厨死硬派"]
  },
  {
    id: "r2",
    merchantId: "m2",
    merchantName: "苏式三鲜 暖心馄饨",
    user: {
      name: "美食寻味",
      avatar: "https://i.postimg.cc/ry96jBL4/artisanal-sourdough-1780274060881.jpg",
      level: "资深探店 pioneer"
    },
    rating: {
      taste: 5,
      ambience: 4,
      ingredients: 5,
      overall: 4.8
    },
    content: "弄堂里传了三代的味道，两张木桌，却常常排满了开着玛莎拉蒂和骑自行车的食客。苏妈妈的手包荠菜馄饨味道真的正。清晨露水荠菜香气，混合着手剁黑前腿肉，肉质弹韧，一咬便是饱满金黄的鲜汤。汤底里放了大量的紫菜、太湖白眼虾米和少许秘炼猪油，一勺热汤下汤，极度宽慰。苏老伯的面条则是全人工竹升一压到底，嚼劲爽滑，简直是上海少有的本帮风骨手作，人情味拉满！",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVrCLdsqvheLR2rmufTlbzQmCNL0zMfigSnVbAjPsZa9t1P7HAF3UXT7s0xYSApgLESdwjtXWGywdNKEv9UK24bueDuj6RAzwSG33Te0gBvWKj80KB-9tv9IrdBj66lHZwstUmIY6x088ewo1x6Cl72wd4hKrMtZ9V32tYkG3xuajUTJyhx3iHfumKeu8Nv6R-tNzkrj5Plxt-9JtUC6Pgv_KxLOvUfkLpgzOnStspO2n3E2aCibHvo1BP9DI8CyS1j-sJ6nnd2A",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=500"
    ],
    date: "2026-05-24 11:15",
    likes: 38,
    tags: ["街坊老味道", "手剁猪肉弹韧", "银丝脆弹"]
  },
  {
    id: "r3",
    merchantId: "m4",
    merchantName: "陈爷爷秘制老酱",
    user: {
      name: "麻辣美食狂",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      level: "探店先锋"
    },
    rating: {
      taste: 5,
      ambience: 3,
      ingredients: 5,
      overall: 4.5
    },
    content: "慕名去顺昌路。陈爷爷今年真是一边咳嗽一边在红泥炉上用生铁大锅炒，旁边堆满了深红发亮的二荆条山堆。我买了一罐香辣八宝牛肉酱和一罐招牌干煸朝天椒酱。拿回家拌挂面吃，只能用‘极其醇美、鲜麻透皮’来形容。那不是让你胃痛的化学辣椒精，而是菜籽油和肉末、豆豉在长时间翻炒中释放出最底层的大豆发酵油脂香，每一粒辣椒碎片都带着石磨的温厚不规则断面，嚼着特上瘾！强烈推荐！",
    images: [
      "https://i.postimg.cc/HkSHWfLJ/artisan-chili-sauce-1780274088687.jpg"
    ],
    date: "2026-05-22 18:20",
    likes: 54,
    tags: ["超级鲜辣", "手工柴火炒", "石舂不规则颗粒"]
  },
  {
    id: "r4",
    merchantId: "m5",
    merchantName: "筑茶隐山 独幽茶室",
    user: {
      name: "琴心茗香",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      level: "风雅茶客"
    },
    rating: {
      taste: 5,
      ambience: 5,
      ingredients: 5,
      overall: 5.0
    },
    content: "朱家角古市集里的一处茶席仙居！老式朱红雕窗下，主理人陆老先生正在生铁炉上文火慢煮一壶古法足重焙大红袍。山泉水和荔枝松炭相撞发生轻灵的噼啪声，白雾袅袅。轻呷一口，正岩独有的焙火花香混合着沉稳的岩骨茶气，在喉间泛起惊人的甘醇。佐以手工野生野莓山药糕，甘糯温软。推窗见乌篷泛流，听古琴跌宕，尘嚣尽退，不愧是偷得浮生半日闲的手作风雅，绝对值得专程拜访！",
    images: [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400"
    ],
    date: "2026-05-26 15:40",
    likes: 67,
    tags: ["岩骨花香", "炭火茶温", "环境极其清雅", "古琴悠扬"]
  },
  {
    id: "r5",
    merchantId: "m3",
    merchantName: "素食心经 有机工坊",
    user: {
      name: "健康乐活达人",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      level: "绿野旅人"
    },
    rating: {
      taste: 4,
      ambience: 5,
      ingredients: 5,
      overall: 4.7
    },
    content: "崇明牧场清爽的鲜榨牛奶在愚园路的老洋房梧桐下午终于吃到了！娜玛师傅倡导的自然滴滤奶酪，做成了云朵状的慕斯奶豆腐，表面裹满了手工搓碎的鲜酸樱野莓砂。抿在口中是天然纯净的微咸与脂香，没有一丝一毫工业香精和增稠剂的粘腻！在满院薄荷与迷迭香的露台上，看老砖瓦在阳光下微闪，吃下一口轻盈酸爽，全身都被这质朴美好的大自然风味治愈了！",
    images: [
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400",
      "https://i.postimg.cc/bYSgNbmv/herbal-chicken-soup-1780321367407.jpg"
    ],
    date: "2026-05-27 12:10",
    likes: 31,
    tags: ["原酿水牛奶", "无糖无添加", "阳光老宅", "野莓轻酸"]
  },
  {
    id: "r6",
    merchantId: "m1",
    merchantName: "谷物私语",
    user: {
      name: "烘焙狂热粉",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
      level: "品控特工"
    },
    rating: {
      taste: 5,
      ambience: 4,
      ingredients: 5,
      overall: 4.7
    },
    content: "特地挑了个清晨九点半去等晓晓的“玫瑰红豆司康”。司康出炉时还烫手，表皮开裂出金黄粗砂。真正的平阴重瓣玫瑰酱揉入面催化出熟稔的花香。极其难得的是，司康里面的红豆完全不是廉价罐头红豆沙，而是她自己用高山冰糖在紫砂煲慢煨，能清晰咬到沙沙的爆碎颗粒感，外层酥松掉渣，极其温厚。抹上少许天然滴滤原泥黄油，在老弄堂里配热茶，这一上午瞬间无憾！",
    images: [
      "https://i.postimg.cc/ZnT45Z6w/regenerated-image-1780057274921.jpg",
      "https://i.postimg.cc/2yPGxjTv/regenerated-image-1780057273792.jpg"
    ],
    date: "2026-05-26 10:15",
    likes: 23,
    tags: ["重瓣玫瑰芬芳", "大粒红豆软糯", "外酥松里温软"]
  },
  {
    id: "r7",
    merchantId: "m2",
    merchantName: "苏式三鲜 暖心馄饨",
    user: {
      name: "面痴王叔",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
      level: "面点鉴赏家"
    },
    rating: {
      taste: 5,
      ambience: 3,
      ingredients: 5,
      overall: 4.3
    },
    content: "苏老伯亲手压的“竹升银丝面”实在太地道，有我小时候徐汇老弄堂的筋骨！他不额外滴水，纯打入十只鸭蛋黄用大毛竹杠压制两个多小时，筋度拉得极高。刚下锅两滚捞出，入老鸡干虾老汤。面根根挺拔爽脆，绝不浆糊，鸭蛋香和碱香回甘持久。苏老两口不声不响，几十年守着老铁灶和雕花案板。这种纯手工、流尽汗水沉淀出的苏式风骨面点，真的让人每吃一碗都无比珍惜！",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400"
    ],
    date: "2026-05-23 08:30",
    likes: 49,
    tags: ["鸭蛋黄和面筋道", "竹升手压金骨", "弄堂老灶人情味"]
  },
  {
    id: "r8",
    merchantId: "m4",
    merchantName: "陈爷爷秘制老酱",
    user: {
      name: "湘辣老饕",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
      level: "味觉审评官"
    },
    rating: {
      taste: 4,
      ambience: 3,
      ingredients: 5,
      overall: 4.0
    },
    content: "一罐生铁大锅大铲炒辣椒，陈爷爷做了三十几年！弄堂门口堆满了红亮醇厚的干辣椒，还没去呢，在街角就会被空气中干辣温暖的中草药辛香吸引。我最喜欢打上一勺特制九层菜油豆瓣酱，没有辣椒素香精的辣心刺胃，而是陈年霉豆瓣在慢火中渗透出的深醇咸鲜。红亮醇滑的熟辣油里还撒入了黑芝麻 and 白干姜，哪怕拌在最普通的大白饭里，也能让人嚼出大丰收的热烈与踏实，厉害！",
    images: [
      "https://i.postimg.cc/HkSHWfLJ/artisan-chili-sauce-1780274088687.jpg"
    ],
    date: "2026-05-21 19:10",
    likes: 19,
    tags: ["黄菜籽油沁香", "霉豆瓣陈厚熟化", "纯手工翻炒"]
  },
  {
    id: "r9",
    merchantId: "m6",
    merchantName: "山野林间 柴火石磨豆腐",
    user: {
      name: "山野林客",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      level: "山间老饕"
    },
    rating: {
      taste: 5,
      ambience: 4,
      ingredients: 5,
      overall: 4.8
    },
    content: "清晨驱车去山脚下，就是为了这一口真正倒在柴火铁锅里、用天然石磨磨出来的豆腐。大豆洗净后，在厚重的青石磨盘下缓缓碾出乳白的浓浆。他们用松木烧火，大锅慢煮出的豆浆带着一层金黄的油皮。卤水点得极克制，成型的豆腐娇嫩欲滴，却又带着极好的柔韧。撒上一小撮盐、生抽、再加上自家种的原生态野香葱，入口时温热纯粹，满嘴是醇厚原生的豆香和淡淡的松木烟熏感。这种质朴原始的植物蛋白，真的是任何大工厂流水线无法比拟的原乡风味！",
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=400"
    ],
    date: "2026-05-28 09:45",
    likes: 35,
    tags: ["柴火慢煮", "手工石磨豆浆", "纯粹植物风味", "野葱沁香"]
  },
  {
    id: "r10",
    merchantId: "m10",
    merchantName: "丰山松火 窑藏瓦罐肉",
    user: {
      name: "大窑肉食爱好者",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      level: "特级肉食家"
    },
    rating: {
      taste: 5,
      ambience: 4,
      ingredients: 5,
      overall: 4.9
    },
    content: "这才是真正的窑藏手艺。掌柜的用肥瘦恰到好处的黑猪五花，整块塞进密封的粗陶瓦罐中，配上陈年黄酒、秘制香料以及几大块干笋。瓦罐被一排排整齐扣入深邃的炭瓦红窑里，使用高山松木的温火煨炖足足六个小时。端上来开封的一瞬间，油脂的热力与松木的独特焦香瞬间钻入鼻腔。猪肉已经是红亮半透的状态，用筷子轻轻一拨就自行分离，入口即化，连软骨都酥到骨髓。底部的煨笋吸饱了油脂和汤汁，爽脆解腻。这一罐热气腾腾的工夫菜，真叫人多添两碗大米饭，满足极了！",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400"
    ],
    date: "2026-05-29 18:30",
    likes: 52,
    tags: ["瓦罐煨炖", "松火香浓", "五花肉软糯", "煨干笋极鲜"]
  },
  {
    id: "r11",
    merchantId: "m8",
    merchantName: "老街阿婆 手工青团",
    user: {
      name: "春分食野",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150",
      level: "传统甜品控"
    },
    rating: {
      taste: 5,
      ambience: 3,
      ingredients: 5,
      overall: 4.7
    },
    content: "春天的味道全锁在阿婆的竹蒸笼里。阿婆不买市场上的现成艾草粉，而是自己挑着竹筐清晨在山坡采青，手剁成极细的艾草泥和着糯米面。蒸出的青团呈现出一种生机盎然的沉静墨绿色，表面刷了一层淡淡的小磨香油。咬开后，外皮极为软糯却带着微妙的韧劲，满是春余草木那阵清甜的芳香。里面塞满了绵沙温润的赤小豆细沙，清甜适口，丝丝毫毫不腻，还能吃到艾草残留的极细纤维。这就是记忆里外婆亲手做出的质朴味道，两块钱一个，太有人情温存了！",
    images: [
      "https://i.postimg.cc/SRccL6P5/floss-yolk-qingtuan-1780320786151.jpg"
    ],
    date: "2026-05-30 14:15",
    likes: 28,
    tags: ["手揉艾草泥", "赤豆沙细腻", "竹屉蒸汽", "原野春味"]
  },
  {
    id: "r12",
    merchantId: "m13",
    merchantName: "隐溪琴石 私房汤药煲",
    user: {
      name: "养生慢行家",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150",
      level: "汤膳养生师"
    },
    rating: {
      taste: 5,
      ambience: 5,
      ingredients: 5,
      overall: 5.0
    },
    content: "这不只是一碗汤，而是一剂由时光文火凝结而成的温润解药。店藏深巷，门口溪水叮咚、琴声幽冷。汤是用传承三代的紫砂药煲文火煨了至少八个小时的黑土鸡汤。端汤上桌前，还需将一块被火炉烤到红透的火成岩落入煲中，瞬间激发出沉闷的草本香气。汤质金黄澄莹，面上的油花已经被阿姨用勺捞得干干净净。喝下去胃里温热无比，陈年艾草、厚人参与枸杞温补气血，不仅不涩，反而带有一丝植物根茎醇香的回甘。配上清雅的琴弦声，感觉所有的都市焦虑和疲惫，都被这澄澈温暖的煲汤彻底融化了。",
    images: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=400"
    ],
    date: "2026-05-31 19:40",
    likes: 45,
    tags: ["八小时文火煲", "药食同源", "溪畔石音", "土鸡鲜醇度"]
  }
];

export const mockBadges: Badge[] = [
  {
    id: "b1",
    title: "探店先锋",
    description: "成功发现并真实点评5家隐秘于弄堂深处的手工手作匠商。",
    requirement: "撰写并发布2次及以上深度美食探店评价",
    isUnlocked: true,
    iconName: "Compass"
  },
  {
    id: "b2",
    title: "麦香诗人",
    description: "深入了解过烘焙本源，评价并收藏有手工窑烤或野生鲁邦种面包坊。",
    requirement: "收藏或点评‘手工烘焙’类商家2家以上",
    isUnlocked: true,
    iconName: "Wheat"
  },
  {
    id: "b3",
    title: "面条鉴赏家",
    description: "品鉴大竹竿手工反复敲打擀制的银丝面、手擀面，懂得传承手艺的分量。",
    requirement: "收藏或点评‘传统小吃’中有手擀面点背景的商家",
    isUnlocked: false,
    iconName: "Soup"
  },
  {
    id: "b4",
    title: "市集猎人",
    description: "参加过线下的手作市集寻宝，收集过三位以上摊主的背书与印章。",
    requirement: "阅读或参与‘市集寻宝’探店故事2篇以上",
    isUnlocked: false,
    iconName: "Gift"
  }
];
