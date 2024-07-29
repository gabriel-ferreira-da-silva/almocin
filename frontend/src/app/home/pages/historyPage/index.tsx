import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderContext";

import LoadingComponent from "../../../../shared/components/Loading";
import BaseLayout from "../../../../shared/components/BaseLayout";

import styles from './index.module.css';
import { listItemUser } from "../../../../shared/types/base-layout";
import { OrderStatus } from "../../../../shared/types/order";

import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const { service, state } = useContext(OrderContext);

  const navigate = useNavigate();

  function translateStatus(status: OrderStatus) {
    switch (status) {
      case OrderStatus.inProgress:
        return 'Em andamento';
      case OrderStatus.concluded:
        return 'Entregue';
      case OrderStatus.canceled:
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  }

  function selectOrder(orderId: string, status: OrderStatus) {
    return () => {
      if (status == OrderStatus.inProgress) navigate(`/pedido/${orderId}`);
    }
  }

  useEffect(() => {
    service.getOrdersByUserId('user-id-1')
  }, [service]);

  return (
    <BaseLayout titlePage="Historico" listItem={listItemUser}>
      {state.getOrdersByUserRequestStatus.maybeMap({
        loading: () => <LoadingComponent></LoadingComponent>,
        failed: () => (
          <span>Erro ao carregar seus pedidos!</span>
        ),
        succeeded: (orders) => (
          <div className={styles.orderContainer}>
            {orders.filter(el => el.status != OrderStatus.inCart).map(
              (order, index) => {
                return (
                  <div
                    key={index}
                    className={styles.order}
                    onClick={selectOrder(order.id, order.status)}
                    style={
                      OrderStatus.inProgress === order.status ? {
                        border: '1px solid blue',
                        cursor: 'pointer'
                      } : {}}
                  >
                    <div className={styles.orderList}>
                      {order.items.map((itemMenu, i) => {
                        return (
                          <li key={i} className={styles.itemContainer}>
                            <div className={styles.itemInfo}>
                              <h2>{itemMenu.name}</h2>
                              <span className={styles.itemPrice}>
                                R$ {itemMenu.price.toFixed(2)}
                              </span>
                            </div>
                            <img src={itemMenu.image} alt="itemImg" />
                          </li>
                        );
                      })}
                    </div>
                    <div className={styles.flex}>
                      <span style={
                        order.status === OrderStatus.canceled
                        ? { color: 'red' }
                        : order.status === OrderStatus.concluded
                        ? { color: 'green' }
                        : { color: 'blue' }
                      }>
                        {translateStatus(order.status)}
                      </span>
                      <span className={styles.totalPrice}>
                        Total: R$ {order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              }
            )}
            {orders.filter(el => el.status != OrderStatus.inCart).length === 0 && (
              <span>Você ainda não fez nenhum pedido</span>
            )}
          </div>
        ),
      })}
    </BaseLayout>
  );
};

export default HistoryPage;
