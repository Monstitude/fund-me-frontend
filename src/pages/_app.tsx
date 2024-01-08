import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "styles/globals.css";

const Web3Provider = dynamic(() => import("components/Common/Web3Provider"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
}
