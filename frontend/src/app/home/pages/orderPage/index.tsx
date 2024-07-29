import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import { OrderContext } from "../../context/OrderContext";
import LoadingComponent from "../../../../shared/components/Loading";
import BaseLayout from "../../../../shared/components/BaseLayout";
import { listItemUser } from "../../../../shared/types/base-layout";
import { useParams, useNavigate } from "react-router-dom";
import { Order, OrderStatus } from "../../../../shared/types/order";

const OrderPage = () => {
  const { service, state } = useContext(OrderContext);
  const [time, setTime] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  function cancelOrder(orderId: string) {
    return () => {
      service.updateOrder(orderId, {
        status: OrderStatus.canceled
      } as Order);
      navigate('/historico');
    }
  }

  function passedTime(createdAt: Date) {
    const timeNow = new Date().getTime();
    const timeOrder = new Date(createdAt).getTime();
    const timeCount = Math.floor(
      (timeNow - timeOrder) / 60000
    );

    return timeCount;
  }

  const concludeOrder = useCallback((timeRemaining: number, order: Order, status: OrderStatus) => {
    if (timeRemaining === 0 && status === OrderStatus.inProgress) {
      setTimeout(() => {
        service.updateOrder(order.id, {
          ...order,
          status: OrderStatus.concluded
        });

        navigate('/historico');
      }, 5000)
    }
  }, [service, navigate]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (time === 0 || time - 1 < 0) {
        clearInterval(interval);
      }

      setTime(Math.max(time - 1, 0));
    }, 60000);
  }, [time]);

  useEffect(() => {
    state.getOrderByIdRequestStatus.maybeMap({
      succeeded: (order) => {
        const timeInMinutes = passedTime(order.createdAt);
        const timeRemaining = Math.max(30 - timeInMinutes, 0);
        setTime(timeRemaining)
        concludeOrder(timeRemaining, order, order.status);
      },
    });
  }, [
    state.getOrderByIdRequestStatus,
    concludeOrder,
  ]);

  useEffect(() => {
    if (id) {
      service.getOrderById(id);
    }
  }, [service, id, service.updateOrder]);

  return (
    <BaseLayout titlePage="Pedidos" listItem={listItemUser}>
      <div className={styles.listContainer}>
        {state.getOrderByIdRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => <p>Pedido não encontrado</p>,
          succeeded: (order) => (
            <div className={styles.orderContainer}>
              <div className={styles.listItem}>
                <h1>Pratos selecionados</h1>
                {order.items.map(
                  (item, i) => {
                    return (
                      <div key={i} className={styles.itemContainer}>
                        <div className={styles.itemInfo}>
                          <h2>{item.name}</h2>
                          <span>
                            Preparo: {item.timeToPrepare} minutos
                          </span>
                          <span className={styles.itemPrice}>
                            R$ {item.price.toFixed(2)} reais
                          </span>
                        </div>
                        <img src={item.image} alt="imagem" />
                      </div>
                    );
                  }
                )}
              </div>
              <div>
                <div className={styles.orderInfo}>
                  <p className={styles.orderPanelStatus}>
                    {translateStatus(order.status)}
                  </p>
                  <p>
                    Tempo estimado:
                    <br />
                    <span className={styles.timeToDelivery}>
                      {order.totalDeliveryTime} minutos
                    </span>
                  </p>
                  <p>
                    Tempo limite para cancelamento:
                    <br />
                    <span className={styles.timeRemaining}>
                      {order.status === OrderStatus.inProgress
                        ? time : 0
                      } minutos
                    </span>
                  </p>

                  <p className={styles.totalPrice}>
                    Total: R$ {order.totalPrice} reais
                  </p>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    disabled={time === 0}
                    onClick={cancelOrder(order.id)}
                  >Cancelar</button>
                </div>
              </div>
            </div>
          ),
        })}
      </div>
    </BaseLayout>
  );
};

export default OrderPage;
