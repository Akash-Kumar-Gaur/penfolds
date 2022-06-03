import React, { useEffect, useRef, useState } from "react";
import { Header } from "../HomeScene";
import exploreBg from "../../assets/images/exploreBg.png";
import btnLight from "../../assets/images/btnLight.png";
import bigBtn from "../../assets/images/bigBtn.png";
import btnBg from "../../assets/images/btnBg.png";
import { collection, getDocs } from "firebase/firestore";
import styles from "./index.module.scss";
import useCart from "../../customHooks/useCart";

function ExploreWines({ db }) {
  const WINE_TYPES = [
    "THEMATIC",
    "PENFOLDS BINS",
    "LUXURY & ICONS",
    "INNOVATIONS",
  ];
  const [activeType, setActiveType] = useState(WINE_TYPES[0]);
  const [winesList, setWinesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchWines = async () => {
    let wines = [];
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "wines"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      wines.push(doc.data());
    });
    setWinesList(wines);
    setLoading(false);
  };
  useEffect(() => {
    fetchWines();
  }, [db]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const listRef = useRef(null);

  const handleScroll = (direction) => {
    let wineCard = document.getElementById("wineCard");
    listRef.current.scroll({
      left: wineCard?.clientWidth * direction + direction * 50,
      behavior: "smooth",
    });
  };

  const showControls =
    winesList.filter((wine) => wine.type.includes(activeType)).length > 4;

  const { addToCart, cart, removeFromCart } = useCart();

  console.warn("cart", cart);

  return (
    <div
      style={{
        backgroundImage: `url(${exploreBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        transition: "all ease .8s",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      <Header />
      <div className={styles.explore}>
        <div className={styles.left}>
          <div
            style={{
              marginTop: 109,
            }}
          >
            <ul>
              {WINE_TYPES.map((type, key) => {
                const isActive = activeType === type;
                return (
                  <li
                    onClick={() => {
                      setLoading(true);
                      setActiveType(type);
                      setTimeout(() => {
                        setLoading(false);
                      }, 200);
                    }}
                    style={{
                      borderLeftWidth: 13,
                      borderLeftColor: isActive ? "#B12535" : "transparent",
                      borderLeftStyle: "solid",
                      paddingLeft: 56,
                      transition: "border ease .8s",
                      opacity: isActive ? 1 : 0.6,
                      marginTop: 51,
                      fontWeight: isActive ? 700 : 300,
                      fontSize: 22,
                      cursor: "pointer",
                    }}
                    key={key}
                  >
                    {type}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.header}>Explore Our Wines</div>
          <div className={styles.carousel}>
            {showControls && (
              <div
                className={`${styles.leftArrow} ${styles.controls}`}
                onClick={() => handleScroll(-1)}
              >
                <img src={require("../../assets/images/left.png")} />
              </div>
            )}
            <div className={styles.winelist} ref={listRef}>
              {!loading &&
                winesList.map((wine, index) => {
                  const { type, name, subtitle, imgUrl } = wine;
                  if (type.includes(activeType)) {
                    return (
                      <div key={index} className={styles.cardWrapper}>
                        <div className={styles.wineCard} id="wineCard">
                          <div
                            style={{
                              height: "299px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={imgUrl}
                              alt={name}
                              className={`${styles.wineImgMain}  animate__animated animate__bounceInUp`}
                            />
                          </div>
                          <div className={styles.infoWrapper}>
                            <div className={styles.wineName}>{name}</div>
                            <div className={styles.subtitle}>{subtitle}</div>
                          </div>
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
                              <div
                                className={styles.updateBtn}
                                onClick={() => addToCart(name)}
                              >
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
                    );
                  }
                  return;
                })}
            </div>
            {showControls && (
              <div
                className={`${styles.rightArrow} ${styles.controls}`}
                onClick={() => handleScroll(1)}
              >
                <img src={require("../../assets/images/right.png")} />
              </div>
            )}
          </div>
          {Object.keys(cart).length &&
          Object.values(cart).reduce((cur, sum) => sum + cur) ? (
            <div
              className={`${styles.cartInfoCard}  animate__animated animate__fadeInUp`}
            >
              <div
                className={styles.cartCard}
                style={{
                  backgroundImage: `url(${bigBtn})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  width: "602px",
                  height: "109px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "50px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "42px",
                      marginRight: "10px",
                    }}
                  >
                    {Object.values(cart).reduce((cur, sum) => sum + cur)}
                  </span>{" "}
                  {Object.values(cart).reduce((cur, sum) => sum + cur) > 1
                    ? "products "
                    : "product "}
                  added
                </div>
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
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ExploreWines;
