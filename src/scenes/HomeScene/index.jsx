import React, { useState } from "react";
import styles from "./index.module.scss";
// import Bounce from "react-reveal/Bounce";
import mainBg from "../../assets/images/mainBg.png";
import startBg from "../../assets/images/startBg.png";
import btnBg from "../../assets/images/btnBg.png";
import MyMenu from "./Menu";

function HomeScene() {
  const [started, setStarted] = useState(false);
  return (
    <div
      style={{
        backgroundImage: `url(${started ? startBg : mainBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        transition: "all ease .8s",
        overflow: "hidden",
      }}
      className={styles.homeWrapper}
    >
      <div className={styles.navHeader}>
        <div>
          <img
            src={require("../../assets/images/logo.png")}
            className={styles.logoWeb}
          />
        </div>
        <div className={styles.navLinks}>
          <button
            className={styles.authBtn}
            style={{
              backgroundImage: `url(${btnBg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            Register
          </button>
          <MyMenu />
        </div>
      </div>
      <div
        style={{
          fontSize: started ? "70px" : "120px",
          transition: "all ease 1s",
          height: started ? "50vh" : "90vh",
        }}
        className={`${styles.banner} animate__animated animate__backInUp`}
      >
        {started ? (
          <img
            src={require("../../assets/images/logo.png")}
            className={styles.logoMob}
          />
        ) : null}
        Venture Beyond
      </div>
      {started ? (
        <div
          className={`${styles.bannerInfo} ${styles.actionBtnWrapper} animate__animated animate__bounceInUp animate__delay-1s`}
        >
          <div
            className={`${styles.actionBtn} ${styles.optionBtn} animate__animated animate__fadeIn animate__delay-1s`}
          >
            <div className={styles.btnText}>Penfolds history</div>
          </div>
          <div
            className={`${styles.actionBtn} ${styles.optionBtn} animate__animated animate__fadeIn animate__delay-1s`}
          >
            <div className={styles.btnText}>Tasting Notes</div>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.bannerInfo} ${styles.actionBtn} animate__animated animate__bounceInUp animate__delay-1s`}
          onClick={() => setStarted(true)}
        >
          Click here to begin
        </div>
      )}
    </div>
  );
}

export default HomeScene;
