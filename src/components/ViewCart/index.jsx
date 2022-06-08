import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "./index.module.scss";
import btnBg from "../../assets/images/btnBg.png";
import { useNavigate } from "react-router";

function ViewCart({
  winesList = [],
  addToCart,
  cart,
  removeFromCart,
  placeOrder,
}) {
  const cartItems = winesList.filter((wine) =>
    Object.keys(cart).includes(wine.name)
  );

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderToken, setOrderToken] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const navigate = useNavigate();
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
            <div>{orderPlaced ? "Order Placed Successfully" : "Your Cart"}</div>
            <div
              className={styles.closeIcon}
              onClick={() => (orderPlaced ? navigate("/") : close())}
            >
              <img src={require("../../assets/images/close.png")} />
            </div>
          </div>
          {orderPlaced ? (
            <div className={styles.orderPlaced}>
              <h3>Your Token Number</h3>
              <h1>{orderToken}</h1>
              <h4>
                Please show this order token to get your order. Do not misplace
                this token until you pick your order. You cannot retrieve the
                token number again. Please place new order in case the token
                number is lost.
              </h4>
            </div>
          ) : (
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
          )}
          {!orderPlaced && (
            <div
              style={{
                pointerEvents: placingOrder ? "none" : "all",
                opacity: placingOrder ? 0.5 : 1,
              }}
              className={styles.checkout}
              onClick={() => {
                setPlacingOrder(true);
                placeOrder({
                  successCallback: (token) => {
                    setOrderPlaced(true);
                    setOrderToken(token);
                    setPlacingOrder(false);
                  },
                });
              }}
            >
              <div className={styles.checkoutBtn}>
                {placingOrder ? "Placing Order" : "Checkout"}
              </div>
            </div>
          )}
        </div>
      )}
    </Popup>
  );
}

export default ViewCart;
