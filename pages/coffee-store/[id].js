import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import styles from "../../styles/Coffee-store.module.css";
import Head from "next/head";
import Image from "next/image";
import { StoreContext } from "../_app";
import { isEmpty } from "@/utils";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const { useEffect, useState, useContext } = React;
  const router = useRouter();
  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoresByIds = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id;
        });
        setCoffeeStore(findCoffeeStoresByIds);
      }
    }
  }, [id]);

  const { name = "", imgUrl = "", address = "", locality = "" } = coffeeStore;

  const handleUpVoteBtn = () => {
    console.log("upvote");
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
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
