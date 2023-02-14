import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import coffeeStoreData from "../../coffee-stores.json";
import styles from "../../styles/Coffee-store.module.css";
import Head from "next/head";
import Image from "next/image";

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoreData.find((el) => el.id.toString() === params.id),
    },
  };
}
export function getStaticPaths() {
  const paths = coffeeStoreData.map((store) => {
    return {
      params: {
        id: store.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}
//fallback prop - very interesitng one, it allows us to get the request from the server and cache it (by the first user who requests the path not influced in our paths, but in order for it to work we need to use isFallback from useRouter)

//

const CoffeeStore = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { name, address, neighbourhood, imgUrl } = props.coffeeStore;
  const handleUpVoteBtn = () => {
    console.log("upvote");
  };

  // name
  // storeImgWrapper
  // storeImg
  // col2
  // iconWrapper
  // text
  // upvoteButton

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link legacyBehavior href='/'>
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={imgUrl}
              width={600}
              height={300}
              className={styles.storeImage}
              alt={name}
            />
          </div>
        </div>
        <div className={`${styles.col2} glass`}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/places.svg'
              width={24}
              height={24}
              alt='Places icon'
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/nearMe.svg'
              width='24'
              height='24'
              alt='Near me icon'
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width='24'
              height='24'
              alt='Star icon'
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpVoteBtn}>
            Up vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
