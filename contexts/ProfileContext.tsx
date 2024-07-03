import { CryptoState } from "@/types/ProfileType";
import { mergeSummaries } from "@/utils/mergeSummaries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Children,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";

interface CryptoContextProps {
  state: CryptoState;
  dispatch: React.Dispatch<Action>;
}

interface Action {
  type:
    | "SET_CRYPTO_ASSETS"
    | "ADD_CRYPTO_ASSET"
    | "UPDATE_CRYPTO_AMOUNT"
    | "SET_USD_BALANCE"
    | "SET_OPEN_ORDERS"
    | "ADD_OPEN_ORDER"
    | "REMOVE_OPEN_ORDER"
    | "UPDATE_SELECTED_CRYPTO";
  payload?: any;
}

const initialState: CryptoState = {
  selectedCrypto: "BTCUSDT",
  cryptoAssets: [
    {
      name: "USDT Tether",
      ticker: "USDT",
      amount: 100000,
      total: 100000,
    },
  ],
  openOrders: [],
  usdBalance: 0,
};

const ProfileContext = createContext<CryptoContextProps | undefined>(undefined);

const reducer = (state: CryptoState, action: Action): CryptoState => {
  switch (action.type) {
    case "SET_CRYPTO_ASSETS":
      return { ...state, cryptoAssets: action.payload };
    case "ADD_CRYPTO_ASSET":
      return {
        ...state,
        cryptoAssets: mergeSummaries(action.payload, state.cryptoAssets),
      };
    case "UPDATE_CRYPTO_AMOUNT":
      return {
        ...state,
        cryptoAssets: [...state.cryptoAssets, action.payload].reduce((acc, current) => {
          // Check if the ticker is already present in the accumulator
          const existingIndex = acc.findIndex(asset => asset.ticker === current.ticker);
          if (existingIndex !== -1) {
              // Replace the existing entry with the current one (latest)
              acc[existingIndex] = current;
          } else {
              // Add the current entry if the ticker is not present
              acc.push(current);
          }
          return acc;
      }, []),
      };
    case "SET_OPEN_ORDERS":
      return { ...state, openOrders: action.payload };
    case "ADD_OPEN_ORDER":
      return {
        ...state,
        openOrders: [...state.openOrders, action.payload],
      };
    case "REMOVE_OPEN_ORDER":
      return {
        ...state,
        openOrders: [],
      };
    case "SET_USD_BALANCE":
      return { ...state, usdBalance: action.payload };
    case "UPDATE_SELECTED_CRYPTO":
      return { ...state, selectedCrypto: action.payload };
    default:
      return state;
  }
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadCryptoData = async () => {
      try {
        const cryptoAssets = await AsyncStorage.getItem("cryptoAssets");
        const openOrders = await AsyncStorage.getItem("openOrders");
        const usdBalance = await AsyncStorage.getItem("usdBalance");

        if (cryptoAssets) {
          dispatch({
            type: "SET_CRYPTO_ASSETS",
            payload: JSON.parse(cryptoAssets),
          });
          // await AsyncStorage.clear();
        }

        if (openOrders) {
          dispatch({
            type: "SET_OPEN_ORDERS",
            payload: JSON.parse(openOrders),
          });
          // await AsyncStorage.clear();
        }

        if (usdBalance) {
          dispatch({
            type: "SET_USD_BALANCE",
            payload: JSON.parse(usdBalance),
          });
        }
      } catch (error) {
        console.error("Error loading data from local storage", error);
      }
    };

    loadCryptoData();
  }, []);

  useEffect(() => {
    const saveCryptoData = async () => {
      try {
        await AsyncStorage.setItem(
          "cryptoAssets",
          JSON.stringify(state.cryptoAssets)
        );
        await AsyncStorage.setItem(
          "openOrders",
          JSON.stringify(state.openOrders)
        );
        await AsyncStorage.setItem(
          "usdBalance",
          JSON.stringify(state.usdBalance)
        );
      } catch (error) {
        console.error("Error saving data to local storage", error);
      }
    };

    saveCryptoData();
  }, [state.cryptoAssets, state.openOrders, state.usdBalance]);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
