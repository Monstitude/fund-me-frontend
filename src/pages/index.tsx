import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return <div className={inter.className}>Hello world</div>;
}

export default Home;
