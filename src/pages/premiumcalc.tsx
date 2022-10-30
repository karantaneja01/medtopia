import type { NextPage } from "next";
import Navbar from "../components/Global/Navbar";
import Calculator from "../components/PremiumCalculator/Calculator";

const PremiumCalc: NextPage = () => {
  return (
    <>
      <Navbar />
      <Calculator />
    </>
  );
};

export default PremiumCalc;
