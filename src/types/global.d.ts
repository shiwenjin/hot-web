export interface NewsItem {
  item_key: string;
  title: string;
  word: string;
  img: string; // 图片
  desc: string;
  describe: string;
  hot_tag: string; // 热度标签
  label_name: string; // 标签名称
  tag: string; // 标签
  label: string; // 标签
  show: string[];
  tab_key: string;
  sub_tab: string;
  www_url: string;
  url: string;
  mobile_url: string;
  first_time: number;
  heat_num: number; // 热度数字
  view_num: number; // 浏览量
  is_video: boolean; // 是否是视频
  heat_str: string; // 热度字符串
  hot_value: number; // 热度值
  hot_score: number; // 热度分数
  image: string; // 图片
  author: string; // 作者
  sec_uid: string; // 作者
  author_url: string; // 作者
  duration_str: string; // 时长字符串
  publish_time: number; // 发布时间
  comment_count: number; // 评论数
  comment_num: number; // 评论数
  like_num: number; // 点赞数
  reading_count: number; // 阅读数
  newRating: number; // 新热度
}
