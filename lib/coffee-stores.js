import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForStores = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&radius=2000&sort=DISTANCE&limit=${limit}`;
};

const getImagesForCoffeeStores = async () => {
  const images = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });

  const unsplashResults = images.response.results.map(
    (result) => result.urls["small"]
  );
  return unsplashResults;
};

export const fetchCoffeStores = async () => {
  const imgUrls = await getImagesForCoffeeStores();
  const options = {
    method: "GET",
    headers: {
      Accept: "application.json",
      Authorization: process.env.NEXT_PUBLIC_COFFEE_AUTH_API_KEY,
    },
  };
  const response = await fetch(
    getUrlForStores("41.8781%2C-87.6298", "coffee", 6),
    options
  );
  if (!response.ok) {
    throw new Error("Could not fetch data from api");
  }
  const data = await response.json();
  return data.results.map((result, indx) => {
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      locality: result.location.locality,
      imgUrl: imgUrls[indx],
    };
  });
};
