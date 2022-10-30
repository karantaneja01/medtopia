import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineInformationCircle } from "react-icons/hi";

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export default function Calculator() {
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    smoker: checked,
    bmiindex: "",
    noofchildren: "",
  });
  const [cost, setCost] = useState({
    cost: "",
  });

  async function handleSubmit() {
    if (
      data.name === "" ||
      data.email === "" ||
      validateEmail(data.email) === false ||
      data.gender === "" ||
      data.age === "" ||
      data.bmiindex === "" ||
      data.noofchildren === "" ||
      typeof data.smoker !== "boolean" ||
      data.smoker === null ||
      data.smoker === undefined
    ) {
      toast.error("Please fill all the fields Correctly");
      return;
    } else {
      const response = await fetch(
        `https://optumapi.herokuapp.com/predict/${data.age},${
          data.gender === "male" ? "0" : "1"
        },${data.bmiindex},${data.noofchildren},${data.smoker ? "0" : "1"}`
      );
      const res = await response.json();
      toast.success(`Your Premium is ${res.cost}`);
      console.log(res);
      setCost(res);
    }
  }
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-32">
      <div>
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
            <div>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1 rounded-md border-[3px] border-indigo-300">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="email"
                        required
                        value={data.name}
                        onChange={(e) => {
                          setData({ ...data, name: e.target.value });
                        }}
                        className="block w-full rounded-md border-indigo-300 px-4 py-3 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1 rounded-md border-[3px] border-indigo-300">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={data.email}
                        onChange={(e) => {
                          setData({ ...data, email: e.target.value });
                        }}
                        className="block w-full rounded-md border-indigo-300 px-4 py-3 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Biological Gender
                    </label>
                    <div className="mt-1 rounded-md border-[3px] border-indigo-300">
                      <select
                        className="block w-full rounded-md border-indigo-300 px-4 py-3 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        id="gender"
                      >
                        <option
                          value="male"
                          onClick={() => {
                            setData({ ...data, gender: "male" });
                          }}
                          className="block w-full rounded-md border-indigo-300 px-4 py-3 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          selected
                        >
                          Male
                        </option>
                        <option
                          className="block w-full rounded-md border-indigo-300 px-4 py-3 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          value="female"
                          onClick={() => {
                            setData({ ...data, gender: "female" });
                          }}
                        >
                          Female
                        </option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Age
                    </label>
                    <div className="mt-1 rounded-md border-[3px] border-indigo-300">
                      <input
                        id="age"
                        name="age"
                        type="number"
                        required
                        value={data.age}
                        onChange={(e) => {
                          setData({ ...data, age: e.target.value });
                        }}
                        className="block w-full rounded-md border-indigo-300 px-4 py-3 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="bmiindex"
                      className="block text-sm font-medium text-gray-700"
                    >
                      BMI Index
                    </label>
                    <div className="mt-1 rounded-md border-[3px] border-indigo-300">
                      <input
                        id="bmiindex"
                        name="bmiindex"
                        type="text"
                        required
                        value={data.bmiindex}
                        onChange={(e) => {
                          setData({ ...data, bmiindex: e.target.value });
                        }}
                        className="block w-full rounded-md border-indigo-300 px-4 py-3 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="noofchildren"
                      className="block text-sm font-medium text-gray-700"
                    >
                      No. of Children
                    </label>
                    <div className="mt-1 rounded-md border-[3px] border-indigo-300">
                      <input
                        id="noofchildren"
                        name="noofchildren"
                        type="number"
                        required
                        value={data.noofchildren}
                        onChange={(e) => {
                          setData({ ...data, noofchildren: e.target.value });
                        }}
                        className="block w-full rounded-md border-indigo-300 px-4 py-3 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {/* create a checkbox */}
                  <div>
                    <div className="relative flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="smoker"
                          name="smoker"
                          checked={checked}
                          onClick={() => {
                            setChecked(!checked);
                            setData({ ...data, smoker: !checked });
                          }}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="smoker"
                          className="font-medium text-gray-700"
                        >
                          Are You a Smoker?
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              </div>
              <div className="flex items-center justify-center px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Calculate
                </button>
              </div>
              {cost.cost && (
                <div>
                  <div className="mt-2 mb-5 border-t border-gray-200"></div>
                  <div className="flex justify-between bg-blue-100 px-2 py-2 text-blue-900">
                    <div className="flex items-center justify-center gap-2">
                      {" "}
                      <HiOutlineInformationCircle />
                      Your Insurance Premium is:{" "}
                    </div>
                    <span>{cost.cost}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
            <div className="-ml-28 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <img
                className="w-full lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="https://i.imgur.com/iWHyNUG.png"
                alt="Customer profile user interface"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
