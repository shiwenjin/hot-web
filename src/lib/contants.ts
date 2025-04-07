export const plats = [
  {
    label: "全站",
    value: "top",
    img: "https://cdn.rebang.today/forever/tab_icon/rebang.png",
    subTab: [
      {
        label: "今日",
        value: "today",
      },
      {
        label: "本周",
        value: "weekly",
      },
      {
        label: "本月",
        value: "monthly",
      },
    ],
  },
  {
    label: "知乎",
    value: "zhihu",
    img: "https://cdn.rebang.today/forever/tab_icon/zhihu.png",
  },
  {
    label: "百度",
    value: "baidu",
    img: "https://cdn.rebang.today/forever/tab_icon/baidu.png",
    subTab: [
      {
        label: "热搜",
        value: "realtime",
      },
      {
        label: "热梗",
        value: "phrase",
      },
      {
        label: "小说",
        value: "novel",
        isShuCover: true,
      },
      {
        label: "电影",
        value: "movie",
        isShuCover: true,
      },
      {
        label: "电视剧",
        value: "teleplay",
        isShuCover: true,
      },
      {
        label: "汽车",
        value: "car",
      },
      {
        label: "游戏",
        value: "game",
      },
    ],
  },
  {
    label: "微博",
    value: "weibo",
    img: "https://cdn.rebang.today/forever/tab_icon/weibo.png",
    subTab: [
      {
        label: "热搜",
        value: "search",
      },
      {
        label: "文娱",
        value: "ent",
      },
      {
        label: "要闻",
        value: "news",
      },
    ],
  },
  {
    label: "抖音",
    value: "douyin",
    img: "https://cdn.rebang.today/forever/tab_icon/douyin.png",
  },

  {
    label: "小红书",
    value: "xiaohongshu",
    img: "https://cdn.rebang.today/forever/tab_icon/xiaohongshu.png",
    subTab: [
      {
        label: "热点",
        value: "hot-search",
      },
    ],
  },
  {
    label: "IT之家",
    value: "ithome",
    img: "https://cdn.rebang.today/forever/tab_icon/ithome.png",
    subTab: [
      {
        label: "日榜",
        value: "today",
      },
      {
        label: "最新",
        value: "latest",
      },
      {
        label: "周榜",
        value: "weekly",
      },
      {
        label: "月榜",
        value: "monthly",
      },
    ],
  },
  {
    label: "腾讯新闻",
    value: "tencent-news",
    img: "https://cdn.rebang.today/forever/tab_icon/tencent-news.png",
  },
  {
    label: "B站",
    value: "bilibili",
    img: "https://cdn.rebang.today/forever/tab_icon/bilibili.png",
  },
  {
    label: "微信",
    value: "weixin",
    img: "https://cdn.rebang.today/forever/tab_icon/weixin.png",
  },

  {
    label: "虎扑",
    value: "hupu",
    img: "https://cdn.rebang.today/forever/tab_icon/hupu.png",
  },
  {
    label: "豆瓣社区",
    value: "douban",
    img: "https://cdn.rebang.today/forever/tab_icon/douban.png",
  },
  {
    label: "观风网",
    value: "guancha-user",
    img: "https://cdn.rebang.today/forever/tab_icon/guancha.png",
  },
  {
    label: "快手",
    value: "kuaishou",
    img: "https://cdn.rebang.today/forever/tab_icon/kuaishou.png",
  },
  {
    label: "今日头条",
    value: "toutiao",
    img: "https://cdn.rebang.today/forever/tab_icon/toutiao.png",
  },
  {
    label: "喷嚏",
    value: "penti",
    img: "https://cdn.rebang.today/forever/tab_icon/penti.png",
  },
  {
    label: "吾爱破解",
    value: "52pojie",
    img: "https://cdn.rebang.today/forever/tab_icon/52pojie.png",
  },
  {
    label: "什么值得买",
    value: "smzdm",
    img: "https://cdn.rebang.today/forever/tab_icon/smzdm.png",
  },
  {
    label: "澎湃新闻",
    value: "thepaper",
    img: "https://cdn.rebang.today/forever/tab_icon/thepaper-light.png",
  },
  {
    label: "豆瓣社区",
    value: "douban-community",
    img: "https://cdn.rebang.today/forever/tab_icon/douban.png",
  },
  {
    label: "微信读书",
    value: "weread",
    img: "https://cdn.rebang.today/forever/tab_icon/weread.png",
    subTab: [
      {
        label: "飙升榜",
        value: "rising",
        isShuCover: true,
      },
      {
        label: "新书榜",
        value: "newbook",
        isShuCover: true,
      },
      {
        label: "小说榜",
        value: "general_novel_rising",
        isShuCover: true,
      },
      {
        label: "总榜",
        value: "all",
        isShuCover: true,
      },
      {
        label: "神作榜",
        value: "newrating_publish",
        isShuCover: true,
      },
      {
        label: "神作潜力榜",
        value: "newrating_potential_publish",
        isShuCover: true,
      },
      {
        label: "热搜榜",
        value: "hot_search",
        isShuCover: true,
      },
    ],
  },
  {
    label: "虎嗅网",
    value: "huxiu",
    img: "https://cdn.rebang.today/forever/tab_icon/huxiu.png",
  },
];

export const HOT_TAG_MAP: Record<string, { text: string; bg: string }> = {
  "1": { text: "新", bg: "#EB5560" },
  新: { text: "新", bg: "#EB5560" },
  new: { text: "新", bg: "#EB5560" },
  "3": { text: "热", bg: "#ff9812" },
  热: { text: "热", bg: "#ff9812" },
  hot: { text: "热", bg: "#ff9812" },
  "4": { text: "沸", bg: "#FF3300" },
  沸: { text: "沸", bg: "#FF3300" },
  "5": { text: "爆", bg: "#D0094C" },
  爆: { text: "爆", bg: "#D0094C" },
  refuteRumors: { text: "辟谣", bg: "#1a74ff" },
  onSite: { text: "现场", bg: "#1a74ff" },
  interpretation: { text: "解读", bg: "#1a74ff" },
  
};
