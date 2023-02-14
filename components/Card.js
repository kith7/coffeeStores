import React from "react";
import styles from "../styles/Card.module.css";
import Image from "next/image";
import Link from "next/link";
const Card = (props) => {
  return (
    <Link href={props.href} className={styles.cardLink}>
      <div className={styles.container + " glass"}>
        <div className={styles.cardImageWrapper}>
          <h2 className={styles.cardHeader}>{props.name}</h2>+
          <Image
            src={props.imgUrl}
            width={260}
            height={160}
            className={styles.cardImage}
            alt={props.name}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;

// cardLink
// container
// cardImageWrapper
// cardImage
// cardHeader
