import { useEffect, useRef, useState } from "react";
import {
  BookHeart,
  BookOpenText,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  MessageCircle,
  Moon,
  Settings,
  ThumbsUp,
} from "lucide-react";
import { cn, formatTime } from "@/lib/utils";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardDescription } from "./components/ui/card";
import { ScrollArea } from "./components/ui/scroll-area";
import { Badge } from "./components/ui/badge";

import { getHotList, Params } from "./services/hot";
import HotRiseRanking from "./HotRiseRanking";
import { HOT_TAG_MAP, plats } from "./lib/contants";
import { NewsItem } from "./types/global";

interface MenuItem {
  label: string;
  value: string;
  img?: string;
}

const menuItems: MenuItem[] = [
  { label: "订阅", value: "subscribe" },
  { label: "综合", value: "general" },
  { label: "科技", value: "tech" },
  { label: "娱乐", value: "entertainment" },
  { label: "社区", value: "community" },
  { label: "财经", value: "finance" },
  { label: "开发", value: "development" },
];

const Header = () => {
  const [activeLink, setActiveLink] = useState<string>("general");

  const handleLinkClick = (value: string) => {
    setActiveLink(value);
  };

  return (
    <header
      className={cn("w-full h-[59px] border-b shadow-sm", "mb-5 bg-white")}
    >
      <div className="mx-auto w-[750px] xl:w-[1056px] asideSize:w-[886px] h-full flex relative items-center justify-between ">
        <div className="flex items-center align-middle">
          <div>
            <a href="https://rebang.today" target="_self">
              <strong className="text-lg asideSize:text-xl font-serif text-center select-none text-text-100 dark:text-textDark-100">
                今日热榜
              </strong>
            </a>
          </div>

          <div
            className={cn(
              "h-full ml-15 flex justify-between items-center gap-5 align-middle"
            )}
          >
            {menuItems.map((item) => (
              <div
                key={item.value}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.value);
                }}
                className={`${
                  activeLink === item.value
                    ? "text-blue-500 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                } pb-2  transition-colors cursor-pointer px-2 w-3/12 py-2 relative`}
              >
                {item.label}
                <span
                  className={`${
                    activeLink === item.value
                      ? "border-b-3 border-blue-500 absolute bottom-[-11px] w-[70%] left-[15%]"
                      : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 h-full flex items-center space-x-2 asideSize:space-x-4 md:flex">
          <Button variant="secondary" size="icon" className="text-base">
            <Moon className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="text-base">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="default" className="arco-btn-shape-round">
            登录
          </Button>
        </div>
      </div>
    </header>
  );
};

const Category = ({
  onSelected,
}: {
  onSelected: (category: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const maxVisibleTabs = 8;

  const visiblePlats = isOpen ? plats : plats.slice(0, maxVisibleTabs);

  useEffect(() => {
    const updateDimensions = () => {
      setShowToggleButton(plats.length > maxVisibleTabs);
    };

    updateDimensions();
  }, []);

  return (
    <Card className="p-1">
      <Tabs defaultValue="top">
        <TabsList className="bg-white flex flex-wrap gap-1 h-full justify-start relative">
          {visiblePlats.map((platform) => (
            <TabsTrigger
              value={platform.value}
              key={platform.value}
              className={cn(
                "data-[state=active]:bg-gray-100 data-[state=active]:text-blue-500",
                "text-gray-600 hover:bg-gray-100 m-1 p-2 flex-shrink-0 items-center cursor-pointer flex-initial"
              )}
              onClick={() => onSelected(platform.value)}
            >
              {platform.img && (
                <img
                  className="size-4"
                  src={`http://localhost:48080/${platform.img}`}
                  alt={platform.label}
                  referrerPolicy="no-referrer"
                />
              )}
              {platform.label}
            </TabsTrigger>
          ))}
          {showToggleButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "absolute top-1.5 bg-gray-200 text-gray-600 hover:bg-gray-100 transition-colors duration-200 align-middle items-center",
                isOpen ? "right-[8px]" : "right-[-55px]"
              )}
            >
              {isOpen ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </Button>
          )}
        </TabsList>
      </Tabs>
    </Card>
  );
};

// 主体
const Body = ({ className }: { className?: string }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("top");

  return (
    <div className={cn("grow flex flex-row mx-auto", className)}>
      <main className="w-screen md:w-[600px] xl:w-[770px]">
        <div className="flex flex-row">
          <div className="md:static top-[51px] z-40 sticky w-full">
            <Category onSelected={setSelectedCategory} />
            <NewsList className="mt-4" category={selectedCategory} />
          </div>
        </div>
      </main>
      <HotRiseRanking />
    </div>
  );
};

const HotTag = ({ hotTag }: { hotTag: string }) => {
  const [tag, setTag] = useState({ text: "", bg: "" });

  useEffect(() => {
    const tagInfo = HOT_TAG_MAP[hotTag];

    if (!tagInfo) return;
    setTag(tagInfo);
  }, [hotTag]);

  return (
    hotTag && (
      <span
        className={`ml-2 shrink-0 text-center rounded text-xs leading-4 p-0.5 text-white`}
        style={{ backgroundColor: tag.bg }}
      >
        {tag.text}
      </span>
    )
  );
};

// 新闻列表项
const NewsListItem = ({
  index,
  item,
  isShuCover,
  category,
}: {
  index: number;
  item: NewsItem;
  isShuCover: boolean;
  category: string;
}) => {
  const converAuthorUrl = (item: NewsItem) => {
    switch (category) {
      case "douyin":
        return `https://www.douyin.com/user/${item.sec_uid}`;
      case "weread":
        return `https://weread.qq.com/web/search/books?author=${item.author}`;
      default:
        return ``;
    }
  };

  return (
    <div>
      <Card className={cn("py-4 pr-4 flex flex-row rounded-none border-b-0")}>
        <div className="text-center w-10 xl:w-12 flex-none">
          <div
            className={cn(
              "text-base font-bold",
              index < 3 && "text-orange-500",
              index >= 3 && "text-gray-500"
            )}
          >
            {index + 1}
          </div>
        </div>
        <div className="flex flex-col overflow-hidden w-full">
          <div className="flex flex-row">
            <div className="overflow-hidden flex-1 relative pb-[38px] md:pb-[35px]">
              <a
                href={item.mobile_url || item.url || item.www_url}
                className="hover:text-blue-500 dark:hover:text-blue-500 font-bold duration-300 text-foreground visited:text-muted-foreground dark:visited:text-muted-foreground" // Use foreground and muted-foreground
                title={item.title}
              >
                <h2 className="text-base line-clamp-2">
                  {item.title || item.word}
                  <HotTag
                    hotTag={
                      item.label || item.label_name || item.tag || item.hot_tag
                    }
                  />
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {item.desc || item.describe}
                </p>
                {item.show &&
                  item.show.map((s) => (
                    <div key={s} className="text-sm text-muted-foreground mt-2">
                      {s}
                    </div>
                  ))}
              </a>
              <div className="absolute bottom-0 w-full flex items-center text-sm text-muted-foreground">
                <div className="space-x-2 md:space-x-4 flex items-center overflow-x-auto no-scrollbar ">
                  {item.tab_key && (
                    <Badge variant="secondary" className="shrink-0">
                      <span className="mr-1">
                        <img
                          className="size-3"
                          src={`http://localhost:48080/${
                            plats.find((p) => p.value === item.tab_key)?.img
                          }`}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                        />
                      </span>
                      <span>
                        {plats.find((p) => p.value === item.tab_key)?.label}
                      </span>
                    </Badge>
                  )}
                  {(item.heat_str ||
                    item.hot_score ||
                    item.heat_num ||
                    item.view_num ||
                    item.hot_value) && (
                    <div className="flex">
                      <span className="flex items-center align-middle">
                        <Flame className="size-4 mr-1 text-amber-500" />
                        {item.heat_str ||
                          item.hot_score ||
                          item.heat_num ||
                          item.view_num ||
                          item.hot_value}
                      </span>
                    </div>
                  )}

                  {item.author && (
                    <span
                      className="flex items-center align-middle cursor-pointer "
                      onClick={() => {
                        window.open(converAuthorUrl(item));
                      }}
                    >
                      {`@${item.author}`}
                    </span>
                  )}

                  {item.reading_count && (
                    <span className="flex items-center align-middle">
                      <BookOpenText className="size-4 mr-1" />
                      {item.reading_count}
                    </span>
                  )}

                  {item.newRating && (
                    <span className="flex items-center align-middle">
                      <BookHeart className="size-4 mr-1" />
                      {(item.newRating / 10).toFixed(1) + '%'}
                    </span>
                  )}

                  {item.publish_time && (
                    <span className="flex items-center align-middle">
                      <Clock className="size-4 mr-1" />
                      {formatTime(item.publish_time)}
                    </span>
                  )}
                  {(item.comment_count >= 0 || item.comment_num >= 0) && (
                    <span className="flex items-center align-middle">
                      <MessageCircle className="size-4 mr-1" />
                      {item.comment_count >= 0
                        ? item.comment_count
                        : item.comment_num}
                    </span>
                  )}
                  {item.like_num && (
                    <span className="flex items-center align-middle">
                      <ThumbsUp className="size-4 mr-1" />
                      {item.like_num}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {item.img || item.image ? (
              <a href={item.mobile_url || item.url || item.www_url}>
                <div className="relative ml-2 md:ml-4 flex-none">
                  <div
                    className={cn(
                      "relative rounded overflow-hidden",
                      isShuCover ? "h-[158px] w-[98px]" : "w-[158px] h-[98px]"
                    )}
                  >
                    {/* 图片 */}
                    {isShuCover}
                    <img
                      src={`http://localhost:48080/https://img.rebang.today/${
                        item.img || item.image
                      }`}
                      className="rounded w-full h-full object-cover"
                      alt="News Thumbnail"
                      referrerPolicy="no-referrer"
                    />

                    {/* 时长显示 */}
                    {item.duration_str && (
                      <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white text-xs px-1 py-0.5 rounded-tl">
                        {item.duration_str}
                      </div>
                    )}
                  </div>
                </div>
              </a>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
};

// 新闻列表组件
const NewsList = ({
  className,
  category,
}: {
  className?: string;
  category: string;
}) => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [subTab, setSubTab] = useState("");
  const [subTabs, setSubTabs] = useState<
    { label: string; value: string; isShuCover?: boolean }[]
  >([]);
  const [isShuCover, setIsShuCover] = useState(false);
  const categoryRef = useRef(category);

  // 当 category 变化时，更新 subTabs 并同步 subTab 但不触发额外的请求
  useEffect(() => {
    const subTabQuery = plats.find((p) => p.value === category)?.subTab || [];

    setSubTabs(() => subTabQuery);

    setSubTab(() => {
      if (category === "tencent-news") {
        return "hot";
      }
      if (category === "top") {
        return "today";
      }
      return subTabQuery[0]?.value || "";
    });
    setIsShuCover(() => {
      return subTabQuery[0]?.isShuCover || false;
    });
    categoryRef.current = category;
  }, [category]);

  // 监听 subTab 变化后再请求数据
  useEffect(() => {
    const fetchNewsList = async () => {
      const params: Params = {
        tab: categoryRef.current,
        sub_tab: subTab,
        page: 1,
        version: 1,
      };

      if (categoryRef.current === "zhihu" || categoryRef.current === "douyin") {
        params.date_type = "now";
      }

      if (categoryRef.current === "weibo") {
        params.version = 2;
      }

      const res = await getHotList(params);
      const list = JSON.parse(res.list);
      console.log(list);
      setNewsList(list);
    };
    // 只有当 subTab 变化时才执行
    if (subTab !== previousSubTab.current) {
      fetchNewsList();
    }
  }, [subTab]); // 仅在 subTab 变化时请求

  // 记录上一次的 subTab 值
  const previousSubTab = useRef(subTab);
  useEffect(() => {
    previousSubTab.current = subTab;
  }, [subTab]);

  const selectedSubTab = (value: string, isShuCover: boolean) => {
    setSubTab(value);
    setIsShuCover(isShuCover);
  };

  return (
    <ScrollArea className={cn("h-full w-full pb-10", className)}>
      <div>
        {subTabs.length > 0 && (
          <Card className={cn("py-2 rounded-t-lg rounded-b-none border-b-0")}>
            <CardDescription>
              <Tabs value={subTab}>
                <TabsList className="bg-white">
                  {subTabs.map((platform) => (
                    <TabsTrigger
                      value={platform.value}
                      key={platform.value}
                      className={cn(
                        "data-[state=active]:bg-gray-100 data-[state=active]:text-blue-500",
                        "text-gray-600 hover:bg-gray-100 m-1 p-2 cursor-pointer"
                      )}
                      onClick={() =>
                        selectedSubTab(
                          platform.value,
                          platform.isShuCover || false
                        )
                      }
                    >
                      {platform.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardDescription>
          </Card>
        )}
        {newsList.map((item: NewsItem, index: number) => (
          <NewsListItem
            index={index}
            item={item}
            key={item.item_key}
            category={category}
            isShuCover={isShuCover}
          />
        ))}
        <Card
          className={cn("py-4 pr-4 text-center rounded-t-none rounded-b-lg")}
        >
          <CardDescription>— 没有更多了 —</CardDescription>
        </Card>
      </div>
    </ScrollArea>
  );
};

const Hot = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between bg-primary-foreground">
        <Header />
        <Body />
      </div>
    </>
  );
};

export default Hot;
