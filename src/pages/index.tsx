import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <div className={inter.className}>
      <w3m-button />
    </div>
  );
}

export default Home;
