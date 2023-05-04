import { Fragment } from "react";
import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = function (props) {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onOpen={props.onOpen} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
