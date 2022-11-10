import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { unstable_getServerSession } from "next-auth/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";
import Navbar from "../../components/Global/Navbar";
import { authOptions } from "../api/auth/[...nextauth]";
import { SuperBill } from "@prisma/client";
import { prisma } from "../../server/db/client";
import { useEffect, useState } from "react";

export default function InsuranceAgent({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [tableData, setTableData] = useState<any[]>([]);
  // console.log(data[0]);

  useEffect(() => {
    const finaldata = data.map(
      (item: { data: string; status: string; userId: string }) => {
        return {
          data: JSON.parse(item.data),
          id: item.userId,
          status: item.status,
        };
      }
    );
    setTableData(finaldata);
  }, []);

  // console.log(tableData);

  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-extrabold leading-tight text-blue-800">
                Super Bill Dashboard
              </h1>
              <div className="mt-5 flex gap-x-4">
                {/** CREATE A SEARCH BAR HERE */}

                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-md bg-gray-200 px-4 py-2"
                />
                <div>
                  <button
                    onClick={() => router.push("/insuranceagent/superbill")}
                    className="flex items-center justify-center whitespace-nowrap rounded-md bg-blue-800 px-8 py-2 font-bold text-white"
                  >
                    <HiPlus className="mr-2" />
                    <div>Add New</div>
                  </button>
                </div>
              </div>
            </div>
          </header>
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
                              Patient ID
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Super Bill
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {tableData?.map((data, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? undefined : "bg-gray-50"
                              }
                            >
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {data.id}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {data.data.patientname}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <Link target="_blank" href={"/"}>
                                  <a className="text-blue-800 hover:underline">
                                    Open
                                  </a>
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {data.data.date}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                                {data.status === "Approved" ? (
                                  <span className="rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                    {data.status}
                                  </span>
                                ) : (
                                  <span className="rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                    {data.status}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
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
  const data = await prisma.superBill.findMany({
    where: {
      User: {
        email: user.user?.email,
      },
    },
    select: {
      image: false,
      status: true,
      data: true,
      id: true,
      userId: true,
    },
  });
  return {
    props: {
      data,
    },
  };
};
