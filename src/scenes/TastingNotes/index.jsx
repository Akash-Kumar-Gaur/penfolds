import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { collection, getDocs } from "firebase/firestore";
import startBg from "../../assets/images/startBg.png";
import { Header } from "../HomeScene";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

function TastingNotes({ db }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImageLoaded] = useState(false);
  let navigate = useNavigate();

  const fetchData = async () => {
    let fetchedData = [];
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "tastingNotes"));
    querySnapshot.forEach((doc) => {
      fetchedData.unshift(doc.data());
    });
    setData(fetchedData[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [db]);

  const innerHeight = window.innerHeight;
  const { intro = "", collection: wineCollection = [] } = data || {};
  return (
    <div
      className={styles.historyWrapper}
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
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.notesWrapper}>
          <div className={styles.container}>
            <div className={styles.introCard}>
              <div className={styles.cardHeader}>Tasting Notes</div>
              <h3>{intro}</h3>
            </div>
            <div className={styles.collectionWrapper}>
              {wineCollection.map((drink, index) => {
                const { name = "", imgUrl = "", intro: tag = "" } = drink;
                return (
                  <div
                    key={index}
                    className={styles.card}
                    onClick={() =>
                      navigate("/detail", { state: { details: drink } })
                    }
                  >
                    <div className={styles.collectionCard}>
                      <img
                        src={imgUrl}
                        style={{ display: imgLoaded ? "block" : "none" }}
                        alt={name}
                        className={styles.wineImg}
                        onLoad={() => setImageLoaded(true)}
                      />
                      <div
                        className={styles.placeHolder}
                        style={{
                          height: !loading && !imgLoaded ? "75px" : 0,
                          minWidth: !loading && !imgLoaded ? "125px" : 0,
                        }}
                      />
                      <div className={styles.drinkName}>{drink?.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TastingNotes;
