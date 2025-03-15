import { CategoryKey } from "./filters";

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
