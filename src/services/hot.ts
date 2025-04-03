import { get } from "../lib/http";

export interface Params {
  tab: string;
  sub_tab?: string;
  page: number;
  version: number;
  date_type?: string;
}

export const getHotList = async (params: Params) => {
  return get<{ list: string }>(
    `/items?tab=${params.tab}${
      params.sub_tab ? `&sub_tab=${params.sub_tab}` : ""
    }&page=${params.page}&version=${params.version}${
      params.date_type ? `&date_type=${params.date_type}` : ""
    }`
  );
};
