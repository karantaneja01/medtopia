import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import Link from "next/link";
import { HiArrowDown } from "react-icons/hi";
import Navbar from "../components/Global/Navbar";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Medicines() {
  const [search, setSearch] = useState("");
  const [recData, setRecData] = useState<any>([]);

  function firstchar(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const data = await fetch(
      `https://genericmed.herokuapp.com/predict/${firstchar(search)}`
    );
    const res = await data.json();
    // convert to array
    const arr = Object.entries(res);
    // sort by value
    setRecData(arr);
    console.log(arr);
  }

  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-extrabold leading-tight text-blue-800">
                Pill Cabinet
              </h1>

              <div className="mt-5 flex gap-x-4">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-md bg-gray-200 px-4 py-2"
                />
                <div>
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="flex items-center justify-center whitespace-nowrap rounded-md bg-blue-800 px-8 py-2 font-bold text-white"
                  >
                    <div>Seach</div>
                  </button>
                </div>
              </div>
            </div>
          </header>
          {/** CREATE THREE BUTTONS */}

          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {/* Replace with your content */}
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {recData.map(
                            (
                              person: (
                                | string
                                | number
                                | boolean
                                | React.ReactElement<
                                    any,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | React.ReactFragment
                                | React.ReactPortal
                                | null
                                | undefined
                              )[],
                              personIdx: React.Key | null | undefined
                            ) => (
                              <tr key={personIdx}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {person[0]}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {person[1]}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

// THIS IS A BASIC GOOGLE AUTH PROTECTION
// TODO: For every request, we have to check if the user is a INSURANCE COMPANY
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await unstable_getServerSession(req, res, authOptions);
  if (!user) {
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
