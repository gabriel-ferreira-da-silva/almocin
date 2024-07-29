import styles from './index.module.css';

const LoadingComponent = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner}></div>
    </div>
  );
}

export default LoadingComponent;