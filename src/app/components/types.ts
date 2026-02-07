export interface User {
  username: string;
  points: number;
}

export interface ShopItem {
  name: string;
  cost: number;
  description: string;
  imageUrl?: string;
}
