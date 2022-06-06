import React from "react";
import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className={styles.ldsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
