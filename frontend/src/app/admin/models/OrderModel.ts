import Order from "../../../shared/types/order";
import ItemMenuModel from "./ItemMenuModel";

export default interface OrderModel extends Order {
  items: ItemMenuModel[];
}