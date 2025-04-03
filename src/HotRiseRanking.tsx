import { cn } from "./lib/utils";
import { Card, CardDescription } from "./components/ui/card";
import { useState, useEffect } from "react";
import { getHotList, Params } from "./services/hot";
import { Badge } from "./components/ui/badge";
import { plats } from "./lib/contants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { CircleAlert, RefreshCw } from "lucide-react";
import { NewsItem } from "./types/global";

const HotRiseRanking = ({ className }: { className?: string }) => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNewsList = async () => {
      const params: Params = {
        tab: "top",
        sub_tab: "lasthour",
        page: page,
        version: 1,
      };

      const res = await getHotList(params);
      const list = JSON.parse(res.list);
      setNewsList(list);
    };
    fetchNewsList();
  }, [page]);

  const handleRefresh = () => {
    if (page >= 3) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  return (
    <div className={cn("ml-4  w-[270px]", className)}>
      <Card
        className={cn(
          "py-2 rounded-t-lg rounded-b-none border-b-0 flex flex-row justify-between items-center gap-1"
        )}
      >
        <div className="flex flex-row items-center">
          <CardDescription className="ml-2">全站飙升榜</CardDescription>
          <Tooltip>
            <TooltipTrigger>
              <CircleAlert className="size-4 ml-1" />
            </TooltipTrigger>
            <TooltipContent align="center" side="top">
              <p>全站最近一小时热度飙升榜</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <span
          className="text-xs mr-2 flex cursor-pointer"
          onClick={handleRefresh}
        >
          <RefreshCw className="size-4 mr-1" /> 换一换
        </span>
      </Card>
      {newsList.map((item: NewsItem, index: number) => (
        <NewsListItem index={index} item={item} key={item.item_key} />
      ))}
    </div>
  );
};

const NewsListItem = ({
  index,
  item,
  className,
}: {
  index: number;
  item: NewsItem;
  className?: string;
}) => {
  return (
    <div className="">
      <Card
        className={cn(
          "py-4 pr-4 flex flex-row rounded-none border-b-0",
          className
        )}
      >
        <div className="text-center ml-5">
          <div
            className={cn(
              "text-sm",
              index < 3 && "text-orange-500",
              index >= 3 && "text-gray-500"
            )}
          >
            {index + 1}
          </div>
        </div>
        <div className="flex flex-row items-start">
          <a
            href={item.www_url || item.url || item.mobile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-gray-500"
          >
            {item.title}
          </a>
          <Badge className="text-xs ml-1" variant="secondary">
            {plats.find((p) => p.value === item.tab_key)?.label}
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default HotRiseRanking;
