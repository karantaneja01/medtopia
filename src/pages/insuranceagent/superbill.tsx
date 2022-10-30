import React from "react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import Navbar from "../../components/Global/Navbar";
import { authOptions } from "../api/auth/[...nextauth]";
import SuperbillComponent from "../../components/Superbill/Superbill";

function Superbill() {
  return (
    <>
      <Navbar />
      <SuperbillComponent />
    </>
  );
}

export default Superbill;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await unstable_getServerSession(req, res, authOptions);
  if (!user || !user.user || !user.user.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const data = await prisma?.user.findUnique({
    where: {
      email: user.user.email,
    },
  });
  if (data?.userrole !== "INSURANCE_AGENT") {
    return {
      redirect: {
        destination: "/redirect",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
};
