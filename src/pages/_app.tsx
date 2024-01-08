import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "styles/globals.css";

const Providers = dynamic(() => import("components/Common/Providers"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
