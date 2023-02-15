import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import StoresData from "../coffee-stores.json";
import { fetchCoffeStores } from "@/lib/coffee-stores";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeStores();
  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const handleOnBannerClick = () => {
    console.log("hi");
  };
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
          buttonText='View stores nearby'
          handleOnClick={handleOnBannerClick}
        />
        <Image
          src='/static/open-doodles-coffee.png'
          alt='A man drinking coffee'
          height={400}
          width={500}
          className={styles.heroImage}
        />
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store) => (
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
      </main>
    </>
  );
}
