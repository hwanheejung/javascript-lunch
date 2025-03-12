type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
type UrlString = `http://${string}` | `https://${string}`;

export interface Restaurant {
  category: Category;
  name: string;
  distance: number;
  description: string;
  link: UrlString;
}
