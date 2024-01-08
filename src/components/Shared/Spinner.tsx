import clsx from "clsx";
import type { FC } from "react";

interface SpinnerProps {
  className?: string;
  variant?: "primary" | "white" | "black";
  size?: "xs" | "sm" | "md" | "lg";
}

const Spinner: FC<SpinnerProps> = ({ className = "", variant = "primary", size = "md" }) => {
  return (
    <div
      className={clsx(
        {
          "!border-[rgba(63,159,255,0.5)] !border-t-blue-400": variant === "primary",
          "!border-[rgba(255,255,255,0.4)] !border-t-white": variant === "white",
          "border-gray-400 !border-t-black": variant === "black",
          "h-4 w-4 border-[2px]": size === "xs",
          "h-5 w-5 border-2": size === "sm",
          "h-8 w-8 border-[4px]": size === "md",
          "h-10 w-10 border-4": size === "lg",
        },
        "animate-spin rounded-full",
        className
      )}
    />
  );
};

export default Spinner;
