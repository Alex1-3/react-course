import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [err, setErr] = useState(null);
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const addItemHandler = function (item) {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = function (id) {
    cartCtx.removeItem(id);
  };

  const orderHandler = function () {
    setIsCheckout((isCheckout) => !isCheckout);
  };

  const submitOrderHandler = async function (userData) {
    setIsSubmiting(true);
    try {
      const response = await fetch(
        `https://learn-9efa0-default-rtdb.firebaseio.com/orders.json`,
        {
          method: "POST",
          body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
        }
      );
      if (!response.ok) throw new Error("Something went wrong");
    } catch (error) {
      setErr(error.message);
    }
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const finishHandler = () => {
    props.onClose();
    setDidSubmit(false);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );

  const cartModalContent = (
    <Fragment>
      {" "}
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={orderHandler} onSubmit={submitOrderHandler} />
      )}
      {!isCheckout && (
        <div className={styles.actions}>
          <button onClick={props.onClose} className={styles["button--alt"]}>
            Close
          </button>
          {cartCtx.items.length > 0 ? (
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && <p>Sending order data</p>}
      {didSubmit && (
        <Fragment>
          <p>Successfully sent the order</p>
          <div className={styles.actions}>
            <button className={styles.button} onClick={finishHandler}>
              Close
            </button>
          </div>
        </Fragment>
      )}
    </Modal>
  );
};

export default Cart;
