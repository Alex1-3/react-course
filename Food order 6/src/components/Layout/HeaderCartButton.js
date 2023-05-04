import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = function (props) {
  const [buttonIsAnimated, setButtonIsAnimated] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const btnClasses = `${styles.button} ${buttonIsAnimated ? styles.bump : ""}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) return;
    setButtonIsAnimated(true);
    setTimeout(() => {
      setButtonIsAnimated(false);
    }, 300);
  }, [cartCtx.items]);
  return (
    <button className={btnClasses} onClick={props.onOpen}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
