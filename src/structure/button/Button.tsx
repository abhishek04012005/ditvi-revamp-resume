import styles from './button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
      {variant === 'primary' && <span className={styles.btnShine} />}
      {variant === 'secondary'  && <span className={styles.btnShineSecondary} />}
    </button>
  );
};

export default Button;
