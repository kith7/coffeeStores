import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchCoffeStores } from "@/lib/coffee-stores";
import styles from "../../styles/Coffee-store.module.css";
import Head from "next/head";
import Image from "next/image";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeStores();

  return {
    props: {
      coffeeStore: coffeeStores.find((el) => el.id.toString() === params.id),
    },
  };
}
export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeStores();
  const paths = coffeeStores.map((store) => {
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

const CoffeeStore = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { name, imgUrl, address, locality } = props.coffeeStore;

  const handleUpVoteBtn = () => {
    console.log("upvote");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link legacyBehavior href='/'>
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={imgUrl || "/static/coffe-store.jpg"}
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
            <p className={styles.text}>{locality}</p>
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
