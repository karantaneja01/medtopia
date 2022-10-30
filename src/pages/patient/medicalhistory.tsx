import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import Navbar from "../../components/Global/Navbar";
import DynamicTable from "../../components/Global/DynamicTable";

const headings = [
  { key: "name", title: "Name" },
  { key: "age", title: "Age" },
  { key: "email", title: "Email" },
  { key: "role", title: "Role" },
];

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
];

const information = [
  {
    key: "Lindsay Walton",
    value: "Name",
  },
  {
    key: "Male",
    value: "Gender",
  },
  {
    key: "01/01/2000",
    value: "Date of Birth",
  },
  {
    key: "123-45-6789",
    value: "Social Security Number",
  },
  {
    key: "123456789",
    value: "Driver License Number",
  },
  {
    key: "123456789",
    value: "Passport Number",
  },
  {
    key: "Single",
    value: "Martial Status",
  },
  {
    key: "White",
    value: "Race",
  },
  {
    key: "Hispanic",
    value: "Ethinicity",
  },
  {
    key: "USA",
    value: "Birth Place",
  },
  {
    key: "123 Main St, New York, NY 10001",
    value: "Current Address",
  },
  {
    key: "New York",
    value: "City",
  },
  {
    key: "NY",
    value: "State",
  },
  {
    key: "New York",
    value: "County",
  },
  {
    key: "10001",
    value: "PIN",
  },
  {
    key: "$0",
    value: "Health Care Coverage",
  },
  {
    key: "None",
    value: "Health Care Expenses",
  },
  {
    key: "$0",
    value: "Income",
  },
];

export default function MedicalHistory() {
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <h1 className="sr-only">Order information</h1>

          <section
            aria-labelledby="summary-heading"
            className="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
          >
            <div className="mx-auto max-w-lg lg:max-w-none">
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Details
              </h2>
              <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
                {information.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <dt className="text-indigo-900">{item.value}</dt>
                    <dd>{item.key}</dd>
                  </div>
                ))}
                {/* <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">$361.80</dd>
                </div> */}
              </dl>
              <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                  <div className="mx-auto max-w-lg">
                    <Popover.Button className="flex w-full items-center py-6 font-medium">
                      <span className="mr-auto text-base">Total</span>
                      <span className="mr-2 text-base">$361.80</span>
                      <ChevronUpIcon
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>
                </div>
                <Transition.Root as={Fragment}>
                  <div>
                    <Transition.Child
                      as={Fragment}
                      enter="transition-opacity ease-linear duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="translate-y-full"
                      enterTo="translate-y-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-y-0"
                      leaveTo="translate-y-full"
                    >
                      <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                        <dl className="mx-auto max-w-lg space-y-6">
                          {information.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <dt className="text-gray-600">{item.value}</dt>
                              <dd>{item.key}</dd>
                            </div>
                          ))}
                        </dl>
                      </Popover.Panel>
                    </Transition.Child>
                  </div>
                </Transition.Root>
              </Popover>
            </div>
          </section>

          <div className="pt-16 pb-36 sm:px-2 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
            <div className="mx-auto">
              {/** ACCORDION */}
              <div className="w-full py-16">
                <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                  <h1 className="mb-8 text-xl font-bold text-indigo-800">
                    Medical Information
                  </h1>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex min-w-[30vw] items-center justify-between rounded-lg bg-indigo-100 px-8 py-4 text-left  text-lg font-bold text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                          <span>Vaccination Details</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-indigo-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="min-w-[30vw] px-4 pt-4 pb-2 text-sm text-gray-500">
                          <DynamicTable headings={headings} people={people} />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex min-w-[30vw] items-center justify-between rounded-lg bg-indigo-100 px-8 py-4 text-left  text-lg font-bold text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                          <span>Medicine Details</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-indigo-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="min-w-[30vw] px-4 pt-4 pb-2 text-sm text-gray-500">
                          <DynamicTable headings={headings} people={people} />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex min-w-[30vw] items-center justify-between rounded-lg bg-indigo-100 px-8 py-4 text-left  text-lg font-bold text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                          <span>Test Details</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-indigo-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="min-w-[30vw] px-4 pt-4 pb-2 text-sm text-gray-500">
                          <DynamicTable headings={headings} people={people} />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex min-w-[30vw] items-center justify-between rounded-lg bg-indigo-100 px-8 py-4 text-left  text-lg font-bold text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                          <span>Insurance Details</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-indigo-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="min-w-[30vw] px-4 pt-4 pb-2 text-sm text-gray-500">
                          <DynamicTable headings={headings} people={people} />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex min-w-[30vw] items-center justify-between rounded-lg bg-indigo-100 px-8 py-4 text-left  text-lg font-bold text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                          <span>Treatment Details</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-indigo-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="min-w-[30vw] px-4 pt-4 pb-2 text-sm text-gray-500">
                          <DynamicTable headings={headings} people={people} />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
