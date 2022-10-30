import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Navbar from "../components/Global/Navbar";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";
import toast from "react-hot-toast";
import { Role } from "@prisma/client";
import { useRouter } from "next/router";

export default function Page() {
  const [selected, setSelected] = useState<Role>("UNSPECIFIED");
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const mutation = trpc.user.changeuserrole.useMutation();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!session || !session.user || !session.user.email) {
      toast.error("Please select a role");
      return;
    } else {
      toast.loading("Loading...");
      mutation.mutate(
        { id: session.user.email, role: selected },
        {
          onSuccess(data, variables, context) {
            if (data.success) {
              toast.dismiss();
              toast.success(data.message);
              router.push("/redirect");
            } else {
              toast.dismiss();
              toast(JSON.stringify(data.message));
              router.push("/redirect");
            }
          },
          onError() {
            toast.dismiss();
            toast.error("Something went wrong");
            router.push("/redirect");
          },
        }
      );
    }
  }

  return (
    <>
      <Navbar />
      <div className="my-10 flex items-center justify-center py-2">
        <div className="flex w-full max-w-md flex-col items-center justify-center space-y-4 rounded-md bg-white px-4 py-6">
          <div className="flex items-center justify-center rounded-full bg-blue-400 px-5 py-3 font-bold text-white">
            1
          </div>
          <div className="flex items-center justify-center space-y-2 text-blue-400">
            Select Role
          </div>
        </div>
        <div className="flex w-full max-w-md flex-col items-center justify-center space-y-4 rounded-md bg-white px-4 py-6">
          <div className="flex items-center justify-center rounded-full border border-blue-400 px-5 py-3 font-bold text-blue-500">
            2
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 text-blue-800">
            Profile Details
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-2 text-xl font-bold text-blue-700">
        Select Your Role
      </div>
      <div className="my-10 flex flex-wrap items-center justify-center">
        {/** CREATE GRID OF BUTTONS HAVING 3 BUTTONS IN A ROW */}
        <div className="grid grid-cols-4 gap-10">
          <div className="flex items-center justify-center">
            <button
              onClick={() => setSelected("PATIENT")}
              className={`${
                selected === "PATIENT"
                  ? "bg-blue-400 text-white"
                  : "bg-white text-blue-400"
              } flex items-center justify-center rounded-md border border-blue-400 px-5 py-3 font-bold`}
            >
              Patient
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setSelected("INSURANCE_COMPANY")}
              className={`${
                selected === "INSURANCE_COMPANY"
                  ? "bg-blue-400 text-white"
                  : "bg-white text-blue-400"
              } flex items-center justify-center rounded-md border border-blue-400 px-5 py-3 font-bold`}
            >
              Insurance Company
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setSelected("INSURANCE_AGENT")}
              className={`${
                selected === "INSURANCE_AGENT"
                  ? "bg-blue-400 text-white"
                  : "bg-white text-blue-400"
              } flex items-center justify-center rounded-md border border-blue-400 px-5 py-3 font-bold`}
            >
              Insurance Agent
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setSelected("LAB_AGENT")}
              className={`${
                selected === "LAB_AGENT"
                  ? "bg-blue-400 text-white"
                  : "bg-white text-blue-400"
              } flex items-center justify-center rounded-md border border-blue-400 px-5 py-3 font-bold`}
            >
              Lab Agent
            </button>
          </div>
        </div>
      </div>
      {/** NEXT BUTTON */}
      <div className="flex items-center justify-center py-2">
        <button
          onClick={(e) => handleSubmit(e)}
          className="flex items-center justify-center rounded-md bg-blue-800 px-8 py-3 font-bold text-white"
        >
          Next
        </button>
      </div>
    </>
  );
}

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
  if (data?.userrole !== "UNSPECIFIED") {
    return {
      redirect: {
        destination: "/",
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
