import { ListItemProps } from '../../../../shared/types/components-props';
import styles from './index.module.css';

const ListItem = ({
  name, deleteBtnCallback, deleteDisabled, editButtonCallback, editDisabled
}: ListItemProps) => {

  const onEdititem = () => () => {
    if (editButtonCallback) editButtonCallback();
  }

  const onDeleteItem = () => () => {
    deleteBtnCallback();
  }
  
  return (
    <div className={styles.listItem}>
      <span
        data-cy={`item-${name}`}
        className={styles.listItemText}
      >{name}</span>
      <div className={styles.buttons}>
        {
          editButtonCallback &&
          <button
            name="Editar categoria"
            className={styles.editButton}
            onClick={
              onEdititem()
            }
            disabled={editDisabled}
          >
            Editar
          </button>
        }
        <button
          name="Excluir categoria"
          className={styles.deleteButton}
          onClick={onDeleteItem()}
          disabled={deleteDisabled}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ListItem;