export type CategoryKey =
  | "ALL"
  | "KOREAN"
  | "CHINESE"
  | "JAPANESE"
  | "WESTERN"
  | "ASIAN"
  | "ETC";
export const CATEGORY: Record<CategoryKey, string> = {
  ALL: "전체",
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  WESTERN: "양식",
  ASIAN: "아시안",
  ETC: "기타",
} as const;

export type SortByKey = "NAME" | "DISTANCE";
export const SORTBY: Record<SortByKey, string> = {
  NAME: "이름",
  DISTANCE: "거리",
};

export type TabKey = "ALL" | "FAVORITE";
export const TAB: Record<TabKey, string> = {
  ALL: "전체",
  FAVORITE: "즐겨찾기",
};
