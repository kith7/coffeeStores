import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import coffeeStoreData from "../../coffee-stores.json";

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoreData.find((el) => el.id.toString() === params.id),
    },
  };
}
export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true,
  };
}
//fallback prop - very interesitng one, it allows us to get the request from the server and cache it (by the first user who requests the path not influced in our paths, but in order for it to work we need to use isFallback from useRouter)

const CoffeeStore = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      CoffeeStore
      <Link legacyBehavior href='/'>
        <a>Back to home</a>
      </Link>
      <Link legacyBehavior href='/coffee-store/id'>
        <a>Back to dynamic</a>
      </Link>
      <p>{props.coffeeStore.name}</p>
      <p>{props.coffeeStore.address}</p>
    </div>
  );
};

export default CoffeeStore;
