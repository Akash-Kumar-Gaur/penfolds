import React, { useState } from "react";
import styles from "./index.module.scss";
// import Bounce from "react-reveal/Bounce";
import mainBg from "../../assets/images/mainBg.png";
import startBg from "../../assets/images/startBg.png";
import btnBg from "../../assets/images/btnBg.png";
import MyMenu from "./Menu";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className={styles.navHeader}>
      <div>
        <Link to="/">
          <img
            src={require("../../assets/images/logo.png")}
            className={styles.logoWeb}
          />
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Link to="/">
          <button className={styles.homeBtn}>Home</button>
        </Link>
        <Link to="/explore">
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
        </Link>
        <MyMenu />
      </div>
    </div>
  );
};

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
      <Header />
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
          <Link to="/history">
            <div
              className={`${styles.actionBtn} ${styles.optionBtn} animate__animated animate__fadeIn animate__delay-1s`}
            >
              <div className={styles.btnText}>Penfolds history</div>
            </div>
          </Link>
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
