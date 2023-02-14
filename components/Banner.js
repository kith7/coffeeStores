import React from "react";
import styles from "../styles/Banner.module.css";
import Image from "next/image";
import heroPic from "../public/static/open-doodles-coffee.png";
const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>connoisseur</span>
      </h1>
      <p className={styles.subTitle}>
        Discover your favourite coffee shops nearby
      </p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
