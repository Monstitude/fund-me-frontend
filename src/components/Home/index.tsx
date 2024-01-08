import { useState } from "react";
import { useAccount, useBalance, useContractEvent, useContractWrite } from "wagmi";
import { Inter } from "next/font/google";
import { FUND_ME } from "data/constants";
import { FundMe } from "abis/FundMe";
import clsx from "clsx";
import toast from "react-hot-toast";
import getErrorMessage from "lib/getErrorMessage";
import { formatEther, parseEther, parseGwei } from "viem";
import Spinner from "components/Shared/Spinner";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("");

  const { data: balance, refetch: refetchBalance } = useBalance({
    address: FUND_ME,
  });

  const onError = (error) => {
    toast.error(
      getErrorMessage(error).includes("User rejected")
        ? "User rejected request"
        : getErrorMessage(error)
    );
  };

  const {
    data,
    write,
    isLoading: fundLoading,
    isSuccess: isFundSuccess,
  } = useContractWrite({
    address: FUND_ME,
    abi: FundMe,
    functionName: "fund",
    onSuccess: () => {
      toast.success("Tx sent successfully");
    },
    onError,
  });

  useContractEvent({
    address: FUND_ME,
    abi: FundMe,
    eventName: "NewOwner",
    listener(log) {
      console.log(log);
    },
  });

  return (
    <div
      className={clsx(
        "relative w-full h-full flex justify-center items-center p-2 text-lg",
        inter.className
      )}>
      <div className="absolute w-full flex justify-end items-center top-2 right-2">
        <w3m-button />
      </div>
      <div className="w-full min-h-[450px] max-w-[460px] flex flex-col justify-between py-5 px-4 bg-gray-50 border border-gray-200 rounded-2xl gap-4">
        {isConnected ? (
          <>
            <div className="w-full space-y-4">
              <h4 className="text-center text-2xl font-semibold">Fund me</h4>
              <div className="w-full flex justify-between items-center gap-1.5">
                <span>
                  <span className="font-semibold">Balance:</span>{" "}
                  {balance ? `${formatEther(balance.value)}` : "0"} {balance?.symbol}
                </span>
                <button
                  className="bg-green-500 text-white font-medium text-base px-3.5 py-1 rounded-lg"
                  onClick={() => refetchBalance()}>
                  Get Balance
                </button>
              </div>
            </div>
            <div className="w-full space-y-5">
              <div className="w-full flex flex-col gap-3">
                <div className="group relative flex bg-white focus-within:border-blue-500 border border-gray-300 rounded-xl overflow-hidden">
                  <input
                    value={amount}
                    className="w-full px-3 py-2 bg-transparent"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    type="number"
                    min={0}
                  />
                  <div className="flex justify-center items-center px-4 font-medium bg-gray-200 group-focus-within:bg-blue-500 group-focus-within:text-white">
                    ETH
                  </div>
                </div>
                <button
                  onClick={() => {
                    write({
                      value: parseEther(amount),
                    });
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-60 duration-150 ease-in-out text-white text-xl flex justify-center items-center gap-3 font-medium py-2.5 px-4 rounded-xl"
                  disabled={!amount || fundLoading}>
                  {fundLoading && (
                    <Spinner
                      variant="white"
                      size="sm"
                    />
                  )}{" "}
                  <span>Fund</span>
                </button>
              </div>
              <div className="w-full bg-gray-300 h-[1px]"></div>
              <div className="w-full flex flex-col gap-3">
                <button className="w-full bg-red-500 hover:bg-red-400 disabled:opacity-60 duration-150 ease-in-out text-white text-xl font-medium py-2.5 px-4 rounded-xl">
                  Withdraw
                </button>
              </div>
            </div>
            {isFundSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
          </>
        ) : (
          <div className="w-full h-full my-auto flex flex-col justify-center items-center gap-4">
            <span className="text-xl font-medium">Connect Wallet to continue</span>
            <w3m-button />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
