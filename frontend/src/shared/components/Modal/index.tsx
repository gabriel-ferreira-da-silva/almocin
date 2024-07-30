import { ReactNode, useCallback } from 'react';
import styles from './index.module.css';

const Modal = ({ children, className, open, title, closeButtonCallback }: {
  children: ReactNode,className?: string,
  open: boolean, title?: string, closeButtonCallback: () => void
}) => {
  const handleClose = useCallback(() =>{
    closeButtonCallback();
  }, [closeButtonCallback])

  return (
    <div
      className={`${styles.modal} ${open ? styles.activeModal : ''} ${className} `}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      role="dialog"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 id="modalTitle">{title}</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            X
          </button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;