import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 时间格式化函数
export function formatTime(timestamp: number) {
  const now = new Date(); // 当前时间
  const inputTime = new Date(timestamp * 1000); // 传入的时间戳
  const diff = (now.getTime() - inputTime.getTime()) / 1000; // 时间差（秒）

  const minutes = Math.floor(diff / 60); // 转换为分钟
  const hours = Math.floor(diff / 3600); // 转换为小时
  const days = Math.floor(diff / 86400); // 转换为天

  // 如果是今天内的时间
  if (days < 1) {
    if (minutes < 1) {
      return "刚刚";
    } else if (minutes < 60) {
      return `${minutes}分钟前`;
    } else {
      return `${hours}小时前`;
    }
  }
  // 如果是昨天
  else if (days === 1) {
    const yesterdayHour = inputTime.getHours();
    const yesterdayMinute = inputTime.getMinutes();
    return `昨天 ${yesterdayHour}:${String(yesterdayMinute).padStart(2, "0")}`;
  }
  // 如果是两天前或更早
  else {
    const year = inputTime.getFullYear();
    const month = String(inputTime.getMonth() + 1).padStart(2, "0");
    const day = String(inputTime.getDate()).padStart(2, "0");
    const hour = String(inputTime.getHours()).padStart(2, "0");
    const minute = String(inputTime.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }
}
