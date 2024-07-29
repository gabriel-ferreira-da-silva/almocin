import { ListOrderProps } from '../../types/components-props';
import styles from './index.module.css';

  const ListOrder = ({
    name, totalPrice,items,timeToDelivery,editButtonCallback, editDisabled,
  }: ListOrderProps) => {

  const onEditOrder = () => () => {
    if (editButtonCallback) editButtonCallback();
  }

  
  return (
    <div className={styles.listOrder}>
      
      <div className={styles.topPanel}>
        <span
          data-cy={`id-${name}`}
          className={styles.listItemText}
        
        >{name}</span>

        <span
          data-cy={`id-${name}`}
          className={styles.listItemText}
        >total: R$ {totalPrice}</span>

        <span
          data-cy={`id-${name}`}
          className={styles.listItemText}
        >delivery time: {timeToDelivery}</span>
        
        {items.map((item)=>{
          return(
            <p>
              {item}
            </p>
          )
        })}
      </div>

      

      <div className={styles.buttons}>
        {
          editButtonCallback &&
          <button
            name="Cancelar"
            className={styles.editButton}
            onClick={
              onEditOrder()
            }
            disabled={editDisabled}
          >
            cancelar
          </button>
        }
      </div>
    </div>
  );
}

export default ListOrder;