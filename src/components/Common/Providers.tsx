import type { ReactNode } from "react";
import Web3Provider from "./Web3Provider";
import { Toaster } from "react-hot-toast";

function Providers({ children }: { children: ReactNode }) {
  return (
    <Web3Provider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
          style: {
            fontSize: "18px",
            fontWeight: 500,
            zIndex: 999999,
          },
        }}
      />
      {children}
    </Web3Provider>
  );
}

export default Providers;
