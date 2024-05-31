import Navbar from "@/components/layout/navbar";
import "@/styles/globals.css";
import { Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React, { useMemo } from "react";
import { useState } from "react";

export interface IError {
  open: boolean;
  message?: string;
}

type TAppContextContent = {
  error: IError;
  setError: React.Dispatch<React.SetStateAction<IError>>;
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
  userID: number | undefined;
  setUserID: React.Dispatch<React.SetStateAction<number | undefined>>;
  community: string | undefined;
  setCommunity: React.Dispatch<React.SetStateAction<string | undefined>>;
  refresh: boolean | undefined;
  setRefresh: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

export const AppContext = React.createContext<TAppContextContent>({
  error: {
    open: false,
  },
  setError: () => {},
  username: undefined,
  setUsername: () => {},
  userID: undefined,
  setUserID: () => {},
  community: undefined,
  setCommunity: () => {},
  refresh: false,
  setRefresh: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState<string>();
  const [userID, setUserID] = useState<number>();

  // Filter
  const [community, setCommunity] = useState<string>();

  const [refresh, setRefresh] = useState<boolean>();

  const [error, setError] = useState<IError>({
    open: false,
  });

  const value = useMemo(
    () => ({
      error,
      setError,
      username,
      setUsername,
      userID,
      setUserID,
      community,
      setCommunity,
      refresh,
      setRefresh,
    }),
    [error, setError, username, setUsername, userID, setUserID, community, setCommunity, refresh, setRefresh]
  );

  return (
    <AppContext.Provider value={value}>
      <Flex direction={"column"}>
        <Navbar />
        <Flex direction={"column"}>
          <Component {...pageProps} />
        </Flex>
      </Flex>
    </AppContext.Provider>
  );
}
