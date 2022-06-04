import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "./index.module.scss";
import btnBg from "../../assets/images/btnBg.png";

function ViewCart({
  cart = {},
  winesList = [],
  addToCart = () => {},
  removeFromCart = () => {},
}) {
  const cartItems = winesList.filter((wine) =>
    Object.keys(cart).includes(wine.name)
  );
  return (
    <Popup
      trigger={
        <button
          style={{
            background: "none",
            border: "none",
            color: "#fff",
          }}
        >
          <div
            className={styles.viewCartCard}
            style={{
              backgroundImage: `url(${btnBg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              width: "191px",
              height: "56px",
              cursor: "pointer",
            }}
          >
            View Cart
          </div>
        </button>
      }
      modal
    >
      {(close) => (
        <div className={styles.cartModal}>
          <div className={styles.modalHeader}>
            <div>Your Cart</div>
            <div className={styles.closeIcon} onClick={close}>
              <img src={require("../../assets/images/close.png")} />
            </div>
          </div>
          <div className={styles.cartItems}>
            {cartItems.map((item) => {
              const { imgUrl, name, subtitle } = item;
              if (cart[name]) {
                return (
                  <div className={styles.cartItem}>
                    <div className={styles.left}>
                      <img src={imgUrl} alt={name} className={styles.image} />
                      <div className={styles.details}>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.subtitle}>{subtitle}</div>
                      </div>
                    </div>
                    <div className={styles.cartActions}>
                      <div onClick={() => removeFromCart(name)}>-</div>
                      <div className={styles.count}>{cart[name]}</div>
                      <div onClick={() => addToCart(name)}>+</div>
                    </div>
                  </div>
                );
              }
              return;
            })}
          </div>
          <div className={styles.checkout}>
            <div className={styles.checkoutBtn}>Checkout</div>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default ViewCart;
