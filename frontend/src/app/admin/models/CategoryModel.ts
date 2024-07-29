import Category from "../../../shared/types/category";
import ItemMenuModel from "./ItemMenuModel";

export default interface CategoryModel extends Category {
  items: ItemMenuModel[];
}
