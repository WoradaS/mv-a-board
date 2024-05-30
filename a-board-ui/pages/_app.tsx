import Navbar from "@/components/layout/navbar";
import "@/styles/globals.css";
import { Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Flex direction={"column"}>
      <Navbar />
      <Flex direction={"column"}>
        <Component {...pageProps} />
      </Flex>
    </Flex>
  );
}
