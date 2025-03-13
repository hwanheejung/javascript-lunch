export type CategoryKey =
  | "ALL"
  | "KOREAN"
  | "CHINESE"
  | "JAPANESE"
  | "WESTERN"
  | "ASIAN"
  | "ETC";

export type SortByKey = "NAME" | "DISTANCE";

type Distance = 5 | 10 | 15 | 20 | 30;
type UrlString = `http://${string}` | `https://${string}`;

export interface Restaurant {
  id: string;
  category: Exclude<CategoryKey, "ALL">;
  name: string;
  distance: Distance;
  description?: string;
  link?: UrlString;
}

export const CATEGORY: Record<CategoryKey, string> = {
  ALL: "전체",
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  WESTERN: "양식",
  ASIAN: "아시안",
  ETC: "기타",
} as const;

export const SORTBY: Record<SortByKey, string> = {
  NAME: "이름",
  DISTANCE: "거리",
};
