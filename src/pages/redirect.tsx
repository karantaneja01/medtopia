import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";

const Redirect = () => {
  return <div>Redirect</div>;
};

export default Redirect;

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
  if (data?.userrole === "UNSPECIFIED") {
    return {
      redirect: {
        destination: "/newuser",
        permanent: false,
      },
    };
  }
  if (data?.userrole === "INSURANCE_COMPANY") {
    return {
      redirect: {
        destination: "/insurancecompany",
        permanent: false,
      },
    };
  }
  if (data?.userrole === "INSURANCE_AGENT") {
    return {
      redirect: {
        destination: "/insuranceagent",
        permanent: false,
      },
    };
  }
  if (data?.userrole === "PATIENT") {
    return {
      redirect: {
        destination: "/patient/medicalhistory",
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
