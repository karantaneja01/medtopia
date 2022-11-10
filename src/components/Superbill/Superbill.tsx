import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { AiOutlineCloudUpload, AiOutlineSave } from "react-icons/ai";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const deliveryMethods = [
  {
    id: 1,
    title: "Brief",
    turnaround: "New Patient",
    price: "99202",
  },
  { id: 2, title: "Brief", turnaround: "New Patient", price: "99202" },
];
const paymentMethods = [
  { id: "self-pay", title: "Self Pay" },
  { id: "co-pay", title: "Co-Pay" },
  { id: "previous-balance", title: "Previous Balance" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const mutation = trpc.user.addsuperbill.useMutation();
  const { data: session } = useSession();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [image, setImage] = useState("");
  const [allData, setAllData] = useState({
    date: "",
    chartno: "",
    patientname: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    insurancenumber: "",
    primaryinsurance: "",
    paymenttype: "",
    totalcharge: "",
    payment: "",
    balance: "",
    deliverymethod: selectedDeliveryMethod,
  });

  function encodeFileBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(allData);
    if (!session || !session.user || !session.user.email) {
      toast.error("Please select a role");
      return;
    } else {
      toast.loading("Loading...");
      mutation.mutate(
        {
          email: session.user.email,
          superbill: JSON.stringify(allData),
          image,
        },
        {
          onSuccess(data, variables, context) {
            if (data.success) {
              toast.dismiss();
              toast.success(data.message);
            } else {
              toast.dismiss();
              toast(JSON.stringify(data.message));
            }
          },
          onError() {
            toast.dismiss();
            toast.error("Something went wrong");
          },
        }
      );
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <form className="mx-auto flex max-w-4xl items-center justify-center">
          <div>
            <div className="pt-10">
              <h2 className="text-lg font-medium text-gray-900">Details</h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="date"
                      name="date"
                      autoComplete="given-name"
                      value={allData.date}
                      onChange={(e) => {
                        setAllData({ ...allData, date: e.target.value });
                      }}
                      placeholder="DD-MM-YYYY"
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="chartnumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Chart Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="chartnumber"
                      name="chartnumber"
                      value={allData.chartno}
                      onChange={(e) => {
                        setAllData({ ...allData, chartno: e.target.value });
                      }}
                      placeholder="123456"
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Patient Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="patientname"
                      name="patientname"
                      autoComplete="name"
                      placeholder="Hane A. Smith"
                      value={allData.patientname}
                      onChange={(e) => {
                        setAllData({ ...allData, patientname: e.target.value });
                      }}
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="dateofbirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    DOB
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="dateofbirth"
                      name="DD-MM-YYYY"
                      autoComplete="Date of Birth"
                      placeholder="DD-MM-YYYY"
                      value={allData.dob}
                      onChange={(e) => {
                        setAllData({ ...allData, dob: e.target.value });
                      }}
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="1234 Main St"
                      value={allData.address}
                      onChange={(e) => {
                        setAllData({ ...allData, address: e.target.value });
                      }}
                      autoComplete="street-address"
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="city"
                      value={allData.city}
                      onChange={(e) => {
                        setAllData({ ...allData, city: e.target.value });
                      }}
                      placeholder="Toronto"
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={allData.state}
                      onChange={(e) => {
                        setAllData({ ...allData, state: e.target.value });
                      }}
                      autoComplete="state"
                      placeholder="State"
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      value={allData.phone}
                      onChange={(e) => {
                        setAllData({ ...allData, phone: e.target.value });
                      }}
                      autoComplete="phone"
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="zipcode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="postalcode"
                      id="postalcode"
                      autoComplete="postalcode"
                      value={allData.zip}
                      onChange={(e) => {
                        setAllData({ ...allData, zip: e.target.value });
                      }}
                      placeholder="110001"
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <h2 className="my-10 text-lg font-medium text-gray-900">
                Insurance
              </h2>

              <div className="sm:col-span-1">
                <label
                  htmlFor="insurance"
                  className="block text-sm font-medium text-gray-700"
                >
                  Insurance Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="insurance"
                    id="insurance"
                    value={allData.insurancenumber}
                    onChange={(e) => {
                      setAllData({
                        ...allData,
                        insurancenumber: e.target.value,
                      });
                    }}
                    placeholder="123456789"
                    className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="my-4 sm:col-span-1">
                <label
                  htmlFor="insurance"
                  className="block text-sm font-medium text-gray-700"
                >
                  Primary Insurance
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="primaryinsurance"
                    id="primaryinsurance"
                    value={allData.primaryinsurance}
                    onChange={(e) => {
                      setAllData({
                        ...allData,
                        primaryinsurance: e.target.value,
                      });
                    }}
                    placeholder="DD-MM-YYYY"
                    className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-indigo-200 pt-10">
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
              >
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Delivery method
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "ring-2 ring-indigo-500" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <div className="flex flex-1">
                            <div className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {deliveryMethod.turnaround}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.price}
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked ? (
                            <CheckCircleIcon
                              className="h-5 w-5 text-indigo-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t border-indigo-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          value={paymentMethod.id}
                          onClick={() => {
                            setAllData({
                              ...allData,
                              paymenttype: paymentMethod.title,
                            });
                          }}
                          defaultChecked
                          className="h-4 w-4 border border-indigo-300 text-indigo-600 focus:outline-none focus:ring-indigo-500"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          className="h-4 w-4 border border-indigo-300 text-indigo-600 focus:outline-none focus:ring-indigo-500"
                        />
                      )}

                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                <div className="col-span-4">
                  <label
                    htmlFor="totalcharge"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Charge
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="totalcharge"
                      value={allData.totalcharge}
                      onChange={(e) => {
                        setAllData({
                          ...allData,
                          totalcharge: e.target.value,
                        });
                      }}
                      name="totalcharge"
                      placeholder="10000"
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="payment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Payment
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="payment"
                      value={allData.payment}
                      onChange={(e) => {
                        setAllData({
                          ...allData,
                          payment: e.target.value,
                        });
                      }}
                      id="payment"
                      placeholder="9000"
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="balance"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Balance
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="balance"
                      id="balance"
                      placeholder="1000"
                      value={allData.balance}
                      onChange={(e) => {
                        setAllData({
                          ...allData,
                          balance: e.target.value,
                        });
                      }}
                      className="block w-full rounded-md border border-indigo-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="relative mt-8 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="pointer-events-none top-0 left-0 mb-2 flex h-full w-full items-center justify-center">
                <AiOutlineCloudUpload size={32} />
              </span>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Upload Image
              </span>
              <input
                type="file"
                onChange={async (e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    if (file) {
                      const encodedfile = await encodeFileBase64(file);
                      // setAllData({
                      //   ...allData,
                      //   image: encodedfile as string,
                      // });
                      setImage(encodedfile as string);
                    }
                  }
                }}
              />
            </button>
            {/** SUBMIT BUTTON */}
            <div className="mt-8">
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineSave size={24} />
                </span>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
