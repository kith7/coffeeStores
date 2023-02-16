import "@/styles/globals.css";
import { createContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};
function storeReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return { ...state, latLong: payload.latLong };
    case ACTION_TYPES.SET_COFFEE_STORES:
      return { ...state, coffeeStores: payload.coffeeStores };
    default:
      throw new Error("Unhandled action type");
  }
}

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
