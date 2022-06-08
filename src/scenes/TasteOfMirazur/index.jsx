import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../HomeScene";
import styles from "./index.module.scss";
import exploreBg from "../../assets/images/exploreBg.png";
import { collection, getDocs } from "firebase/firestore";
import StarRatings from "react-star-ratings";

function TasteOfMirazur({ db }) {
  const TABS = ["chef", "experience"];
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const fetchData = useCallback(async () => {
    let fetchedData = [];
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "tasteOfMirazur"));
    querySnapshot.forEach((doc) => {
      fetchedData.unshift(doc.data());
    });
    setData(fetchedData[0]);
    setLoading(false);
  }, [db]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getTabContent = () => {
    const dataToMap = data[activeTab] || {};
    if (activeTab === TABS[0]) {
      const {
        imgUrl = "",
        name = "",
        info = "",
        about = [],
        rating = 0,
      } = dataToMap;
      return (
        <div className={styles.twoSidedContent}>
          <div className={styles.imgContainer}>
            <img src={imgUrl} alt={name} className={styles.chefImg} />
          </div>
          <div>
            <div className={styles.chefInfo}>
              <img src={imgUrl} alt={name} className={styles.chefImgMob} />
              <div>
                <h2>{name}</h2>
                <h3>{info}</h3>
                <div className={styles.rating}>
                  <StarRatings
                    rating={rating}
                    starRatedColor="#b12535"
                    starDimension={"32px"}
                  />
                </div>
                <div className={styles.ratingMob}>
                  <StarRatings
                    rating={rating}
                    starRatedColor="#b12535"
                    starDimension={"24px"}
                  />
                </div>
              </div>
            </div>
            <div className={styles.points}>
              {about.map((point, index) => {
                return (
                  <div key={index} className={styles.pointData}>
                    {point}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    if (activeTab === TABS[1]) {
      const { imgUrl = "", points = {} } = dataToMap;
      return (
        <div className={styles.twoSidedContent}>
          <div className={styles.imgContainer}>
            <img src={imgUrl} className={styles.infoImg} />
          </div>
          <div>
            <div>
              {Object.keys(points).map((point, index) => {
                return (
                  <div key={index}>
                    <div className={styles.pointHeader}>{point}</div>
                    <div className={styles.points}>
                      {points[point].map((subpoint, key) => {
                        return (
                          <div key={key} className={styles.pointData}>
                            {subpoint}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={styles.historyWrapper}
      style={{
        backgroundImage: `url(${exploreBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transition: "all ease .8s",
        overflow: "hidden",
        color: "#fff",
        position: "relative",
        // paddingBottom: "50px",
      }}
    >
      <Header />
      <div className={styles.tasteMirazur}>
        <div className={styles.heading}>Taste of Mirazur</div>
        <div className={styles.contentWrapper}>
          <div className={styles.left}>
            {TABS.map((entry, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.tab} ${
                    activeTab === entry && styles.activeTab
                  }`}
                  onClick={() => {
                    setLoading(true);
                    setActiveTab(entry);
                    setTimeout(() => {
                      setLoading(false);
                    }, 300);
                  }}
                >
                  {entry}
                </div>
              );
            })}
          </div>
          <div className={styles.right}>
            <div className={styles.content}>{!loading && getTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasteOfMirazur;
