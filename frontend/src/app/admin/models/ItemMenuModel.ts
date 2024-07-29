import Category from "../../../shared/types/category";

export default interface ItemMenuModel {
  id: string;
  name: string;
  price: number;
  image: string;
  oldPrice: number;
  description: string;
  timeToPrepare: number;
  category: Category | null;
  hasPromotion: boolean
}
