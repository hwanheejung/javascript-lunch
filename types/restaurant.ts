type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
type Distance = 5 | 10 | 15 | 20 | 30;
type UrlString = `http://${string}` | `https://${string}`;

export interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: UrlString;
}
