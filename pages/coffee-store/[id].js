import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import coffeeStoreData from "../../coffee-stores.json";
import Head from "next/head";
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
        id: store.id,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}
//fallback prop - very interesitng one, it allows us to get the request from the server and cache it (by the first user who requests the path not influced in our paths, but in order for it to work we need to use isFallback from useRouter)

const CoffeeStore = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { name, address, neighbourhood } = props.coffeeStore;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link legacyBehavior href='/'>
        <a>Back to home</a>
      </Link>
      <p>{name}</p>
      <p>{address}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};

export default CoffeeStore;
