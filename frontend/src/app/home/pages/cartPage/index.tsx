import { useCallback, useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";

import LoadingComponent from "../../../../shared/components/Loading";
import BaseLayout from "../../../../shared/components/BaseLayout";
import { useNavigate } from "react-router-dom";
import styles from './index.module.css';
import { listItemUser } from "../../../../shared/types/base-layout";
import ItemMenuModel from "../../../admin/models/ItemMenuModel";
import { Order, OrderStatus } from "../../../../shared/types/order";

const CartPage = () => {
  const { service, state } = useContext(OrderContext);
  const [timeToDelivery, setTimeToDelivery] = useState<number | null>(null);
  const [cep, setCep] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [items, setItems] = useState<ItemMenuModel[]>([]);
  const [orderId, setOrderId] = useState<string>('');
  const [order, setOrder] = useState<Order>({} as Order);

  const navigate = useNavigate();

  const searchTimeToDelivery = useCallback(() => {
    const formatedCep = cep.toString().replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
    service.getDeliveryTime(orderId, formatedCep)
  }, [cep, orderId, service]);

  const onChangeCep = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCep(event.target.value);
  }, []);

  function removeItemFromCart(idToRemove: string) {
    return () => {
      const newOrder: Order = {
        ...order,
        itemsId: order.itemsId.filter(id => id !== idToRemove)
      }
      service.updateOrder(orderId, newOrder)
    }
  };

  function confirmOrder() {
    return () => {
      const newOrder: Order = {
        ...order,
        status: OrderStatus.inProgress
      }
      service.updateOrder(orderId, newOrder)
      navigate('/pedido/' + orderId)
    }
  }

  useEffect(() => {
    state.getDeliveryTimeRequestStatus.maybeMap({
      succeeded: (response) => {
        setTimeToDelivery(response)
      }
    });
  }, [state.getDeliveryTimeRequestStatus])

  useEffect(() => {
    state.getOrdersByUserRequestStatus.maybeMap({
      succeeded: (response) => {
        const cartItems = response.filter(el => el.status === OrderStatus.inCart)
        if (!cartItems.length) return setItems([])
        setOrderId(cartItems[0].id);
        setItems(cartItems[0].items);
        setTotalPrice(cartItems[0].totalPrice);
        setOrder(cartItems[0]);
      }
    });
  }, [state.getOrdersByUserRequestStatus])

  useEffect(() => {
    service.getOrdersByUserId('user-id-1')
  }, [service, state.updateOrderRequestStatus]);

  return (
    <BaseLayout titlePage="Carrinho" listItem={listItemUser}>
      {state.getOrdersByUserRequestStatus.maybeMap({
        loading: () => <LoadingComponent></LoadingComponent>,
        failed: () => (
          <span>Erro ao carregar o order!</span>
        )
      })}

      {items.length != 0 && items.map((itemMenu, i) => {
        return (
          <li key={i} className={styles.cartItem}>
            <img src={itemMenu.image} alt="itemImg" />
            <p>{itemMenu.name}</p>
            <div className={styles.cartItemActions}>
              <button
                className={styles.cartItemDeleteButton}
                type="button"
                onClick={removeItemFromCart(itemMenu.id)}
              >Remover</button>
              <span className={styles.cartItemPrice}>
                R$ {itemMenu.price.toFixed(2)}
              </span>
            </div>
          </li>
        )
      })}

      {items.length === 0 && (
        <span>Seu carrinho está vazio!</span>
      )}
      <div className={styles.orderActions}>
        <span className={styles.totalPrice}>Total: R$ {totalPrice.toFixed(2)}</span>
        <div className={styles.deliveryTimeContainer}>
          <span>Tempo de entrega:</span>
          {
            timeToDelivery === null ? (
              <div className={styles.deliveryTime}>
                <input
                  type="number"
                  value={cep}
                  onChange={onChangeCep}
                  placeholder="Digite seu CEP"
                />
                <button type="button" onClick={searchTimeToDelivery}>Buscar</button>
              </div>
            ) : (
              <div className={styles.deliveryTime}>
                {timeToDelivery} Minutos
              </div>
            )
          }
        </div>
        <button
          type="button"
          className={styles.confirmButton}
          disabled={timeToDelivery === null}
          onClick={confirmOrder()}
        >Continue</button>
      </div>
    </BaseLayout>
  );
};

export default CartPage;
