import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import { StoreContext, ACTION_TYPES } from "./_app";

import { fetchCoffeeStores } from "@/lib/coffee-stores";
import useTrackLocation from "../hooks/useGeoLocation";
import { useEffect, useState, useContext } from "react";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();
  const [isFindingGeo, setIsFindingGeo] = useState(false);

  const [errorMsg, seterrorMsg] = useState(null);

  useEffect(() => {
    const fetchNewStores = async () => {
      if (latLong) {
        try {
          seterrorMsg("");
          const res = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=9`
          );
          const coffeeStores = await res.json();
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: coffeeStores,
            },
          });
        } catch (err) {
          seterrorMsg(err.message);
          console.log(err);
        }
      }
    };
    fetchNewStores();
  }, [latLong]);

  const handleOnBannerClick = () => {
    setIsFindingGeo(true);
    handleTrackLocation();
    setIsFindingGeo(false);
  };
  console.log({ latLong, locationErrorMsg });
  return (
    <>
      <Head>
        <title>Coffee sites</title>
        <meta
          name='description'
          content='Page for coffee lovers who want to find the best coffee shops in their vicinity'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Coffee sites</h1>
        <Banner
          buttonText={isFindingGeo ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerClick}
        />
        {locationErrorMsg && `Something went wrong... ${locationErrorMsg}`}
        <Image
          src='/static/open-doodles-coffee.png'
          alt='A man drinking coffee'
          height={400}
          width={500}
          className={styles.heroImage}
        />
        {errorMsg && <p>Something went wrong: {errorMsg}</p>}
        {coffeeStores && (
          <>
            <h2 className={styles.heading2}>Stores in my location</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => (
                <Card
                  id={store.id}
                  key={store.id}
                  name={store.name}
                  imgUrl={store.imgUrl || "/static/coffe-store.jpg"}
                  href={`/coffee-store/${store.id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </>
        )}

        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store) => (
                <Card
                  id={store.id}
                  key={store.id}
                  name={store.name}
                  neighbourhood={store.neighbourhood}
                  imgUrl={store.imgUrl || "/static/coffe-store.jpg"}
                  href={`/coffee-store/${store.id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
