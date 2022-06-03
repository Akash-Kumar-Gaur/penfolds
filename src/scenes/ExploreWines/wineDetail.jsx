import React, { useState } from "react";
import useCart from "../../customHooks/useCart";
import styles from "./wineDetails.module.scss";
import btnLight from "../../assets/images/btnLight.png";

function WineDetails({
  closeModal = () => {},
  wineData = {},
  addToCart,
  cart,
  removeFromCart,
}) {
  const {
    name,
    images = [],
    info,
    size,
    serveNstore,
    alcoholContent,
  } = wineData;
  const [activeImg, setActiveImg] = useState(images[0]);

  const updateImage = (image) => {
    setActiveImg(image);
  };

  return (
    <div className={styles.detailsModal}>
      <div className={styles.closeIcon} onClick={closeModal}>
        <img src={require("../../assets/images/close.png")} />
      </div>
      <div className={styles.imagesLeft}>
        <div className={styles.activeImg}>
          <img
            src={activeImg}
            alt={name}
            className="animate__animated animate__fadeIn"
          />
        </div>
        <div className={styles.thumbImages}>
          {images.slice(0, 3).map((image, key) => {
            return (
              <div className={styles.thumb} onClick={() => updateImage(image)}>
                <img key={key} src={image} alt={image} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.detailsRight}>
        <div className={styles.details}>
          <div className={styles.wineName}>{name}</div>
          <div className={styles.info}>{info}</div>
          <h4>Size</h4>
          <div className={styles.data}>{size}</div>
          <h4>Alcohol content</h4>
          <div className={styles.data}>{alcoholContent}</div>
          <h4>Serving and storage</h4>
          <div className={styles.data}>{serveNstore}</div>
        </div>
        <div className={styles.cartBtn}>
          {cart[name] ? (
            <div className={styles.addedToCart}>
              <div
                className={styles.updateBtn}
                onClick={() => removeFromCart(name)}
              >
                -
              </div>
              <div>{cart[name]}</div>
              <div className={styles.updateBtn} onClick={() => addToCart(name)}>
                +
              </div>
            </div>
          ) : (
            <div
              className={styles.addBtn}
              onClick={() => addToCart(name)}
              style={{
                backgroundImage: `url(${btnLight})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                width: "191px",
                height: "56px",
              }}
            >
              Add to cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WineDetails;
