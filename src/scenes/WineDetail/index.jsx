import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";
import startBg from "../../assets/images/startBg.png";
import { Header } from "../HomeScene";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useCart from "../../customHooks/useCart";
import btnLight from "../../assets/images/btnLight.png";
import ViewCart from "../../components/ViewCart";
import { collection, getDocs } from "firebase/firestore";

function WineDetail({ db }) {
  const innerHeight = window.innerHeight;
  const { state } = useLocation();
  const { details = {} } = state;
  const { intro = "", name = "" } = details;

  const POINTS = ["colour", "nose", "palate"];
  const [activeTab, setActiveTab] = useState(POINTS[0]);
  const [winesList, setWinesList] = useState([]);

  const { addToCart, cart, removeFromCart, isCartEmpty, placeOrder } =
    useCart();

  const fetchWines = useCallback(async () => {
    let wines = [];
    const querySnapshot = await getDocs(collection(db, "wines"));
    querySnapshot.forEach((doc) => {
      wines.push(doc.data());
    });
    setWinesList(wines);
  }, [db]);

  useEffect(() => {
    fetchWines();
  }, [fetchWines]);

  return (
    <div
      className={styles.detailContainer}
      style={{
        backgroundImage: `url(${startBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transition: "all ease .8s",
        overflow: "hidden",
        color: "#fff",
        position: "relative",
        minHeight: innerHeight,
      }}
    >
      <Header />
      <div className={styles.detailWrapper}>
        <div className={styles.detailCard}>
          <Link to="/notes">
            <div className={styles.backBtn}>{`< Back`}</div>
          </Link>
          <div className={styles.details}>
            <div className={styles.left}>
              <div>
                <h3>{intro}</h3>
                <h2>{name}</h2>
              </div>
              <div className={styles.pointsContainer}>
                {POINTS.map((point, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setActiveTab(point)}
                      className={`${styles.point} ${
                        activeTab === point && styles.active
                      }`}
                    >
                      {point}
                    </div>
                  );
                })}
              </div>
              <div className={styles.tabData}>
                {details[activeTab]?.map((item, index) => {
                  return (
                    <div key={index} className={styles.tabPoint}>
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.imgWrapper}>
              <img src={details?.imgFull} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cartBtn}>
        {cart[name] ? (
          <div className={styles.addedToCart}>
            <div
              className={`${styles.updateBtn} ${styles.btnMinus}`}
              onClick={() => removeFromCart(name)}
            >
              -
            </div>
            <div>{cart[name]}</div>
            <div
              className={`${styles.updateBtn} ${styles.btnPlus}`}
              onClick={() => addToCart(name)}
            >
              +
            </div>
            <ViewCart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              isCartEmpty={isCartEmpty}
              winesList={winesList}
              placeOrder={placeOrder}
            />
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
  );
}
export default WineDetail;
