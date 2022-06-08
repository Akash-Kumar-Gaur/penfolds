import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";
import exploreBg from "../../assets/images/exploreBg.png";
import { collection, getDocs } from "firebase/firestore";
import { Header } from "../HomeScene";

function PenfoldsHistory({ db }) {
  const [historyData, setHistoryData] = useState([]);
  const [activeYear, setActiveYear] = useState({});
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const fetchHistory = useCallback(async () => {
    let history = [];
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "history"));
    querySnapshot.forEach((doc) => {
      history.push(doc.data());
    });
    const sortedData = history.sort((a, b) => (a.id > b.id ? 1 : -1));
    setHistoryData(sortedData);
    setLoading(false);
    setActiveYear(sortedData[0]);
  }, [db]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const innerHeight = window.innerHeight;

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
        overflowY: "hidden",
        minHeight: innerHeight,
      }}
    >
      <Header />
      <div className={styles.dataSection}>
        <div className={styles.historyCard}>
          <div className={styles.left}>
            <div className={styles.activeHeader}>
              {activeYear.year} TO EVERMORE!
            </div>
            <div className={styles.yearsWrapper} id="yearEntry">
              {historyData.map((entry, index) => {
                return (
                  <div
                    id={"yearTab"}
                    key={index}
                    onClick={() => {
                      setImgLoaded(false);
                      setActiveYear(entry);
                      if (document.getElementById("yearEntry")) {
                        const clientWidth =
                          document.getElementById("yearTab").clientWidth;
                        document
                          .getElementById("yearEntry")
                          .scrollTo(index * clientWidth - 20, 0);
                      }
                    }}
                    className={`${styles.yearOption} ${
                      entry.year === activeYear.year && styles.active
                    }`}
                  >
                    {entry.year}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.right}>
            <img
              src={activeYear?.image}
              style={{ display: imgLoaded ? "block" : "none" }}
              alt={activeYear?.year}
              className={styles.yearImg}
              onLoad={() => setImgLoaded(true)}
            />
            <div
              className={styles.imgLoader}
              style={{
                display: !loading && imgLoaded ? "none" : "block",
              }}
            />
            <div className={styles.content}>{activeYear?.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PenfoldsHistory;
