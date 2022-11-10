import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import Navbar from "../components/Global/Navbar";
import { authOptions } from "./api/auth/[...nextauth]";
import Multiselect from "multiselect-react-dropdown";

const arrayofdiesease = [
  { id: "", name: "Itching" },
  { id: "", name: "Skin Rash" },
  { id: "", name: "Nodal Skin Eruptions" },
  { id: "", name: "Continuous Sneezing" },
  { id: "", name: "Shivering" },
  { id: "", name: "Chills" },
  { id: "", name: "Joint Pain" },
  { id: "", name: "Stomach Pain" },
  { id: "", name: "Acidity" },
  { id: "", name: "Ulcers On Tongue" },
  { id: "", name: "Muscle Wasting" },
  { id: "", name: "Vomiting" },
  { id: "", name: "Burning Micturition" },
  { id: "", name: "Spotting  urination" },
  { id: "", name: "Fatigue" },
  { id: "", name: "Weight Gain" },
  { id: "", name: "Anxiety" },
  { id: "", name: "Cold Hands And Feets" },
  { id: "", name: "Mood Swings" },
  { id: "", name: "Weight Loss" },
  { id: "", name: "Restlessness" },
  { id: "", name: "Lethargy" },
  { id: "", name: "Patches In Throat" },
  { id: "", name: "Irregular Sugar Level" },
  { id: "", name: "Cough" },
  { id: "", name: "High Fever" },
  { id: "", name: "Sunken Eyes" },
  { id: "", name: "Breathlessness" },
  { id: "", name: "Sweating" },
  { id: "", name: "Dehydration" },
  { id: "", name: "Indigestion" },
  { id: "", name: "Headache" },
  { id: "", name: "Yellowish Skin" },
  { id: "", name: "Dark Urine" },
  { id: "", name: "Nausea" },
  { id: "", name: "Loss Of Appetite" },
  { id: "", name: "Pain Behind The Eyes" },
  { id: "", name: "Back Pain" },
  { id: "", name: "Constipation" },
  { id: "", name: "Abdominal Pain" },
  { id: "", name: "Diarrhoea" },
  { id: "", name: "Mild Fever" },
  { id: "", name: "Yellow Urine" },
  { id: "", name: "Yellowing Of Eyes" },
  { id: "", name: "Acute Liver Failure" },
  { id: "", name: "Fluid Overload" },
  { id: "", name: "Swelling Of Stomach" },
  { id: "", name: "Swelled Lymph Nodes" },
  { id: "", name: "Malaise" },
  { id: "", name: "Blurred And Distorted Vision" },
  { id: "", name: "Phlegm" },
  { id: "", name: "Throat Irritation" },
  { id: "", name: "Redness Of Eyes" },
  { id: "", name: "Sinus Pressure" },
  { id: "", name: "Runny Nose" },
  { id: "", name: "Congestion" },
  { id: "", name: "Chest Pain" },
  { id: "", name: "Weakness In Limbs" },
  { id: "", name: "Fast Heart Rate" },
  { id: "", name: "Pain During Bowel Movements" },
  { id: "", name: "Pain In Anal Region" },
  { id: "", name: "Bloody Stool" },
  { id: "", name: "Irritation In Anus" },
  { id: "", name: "Neck Pain" },
  { id: "", name: "Dizziness" },
  { id: "", name: "Cramps" },
  { id: "", name: "Bruising" },
  { id: "", name: "Obesity" },
  { id: "", name: "Swollen Legs" },
  { id: "", name: "Swollen Blood Vessels" },
  { id: "", name: "Puffy Face And Eyes" },
  { id: "", name: "Enlarged Thyroid" },
  { id: "", name: "Brittle Nails" },
  { id: "", name: "Swollen Extremeties" },
  { id: "", name: "Excessive Hunger" },
  { id: "", name: "Extra Marital Contacts" },
  { id: "", name: "Drying And Tingling Lips" },
  { id: "", name: "Slurred Speech" },
  { id: "", name: "Knee Pain" },
  { id: "", name: "Hip Joint Pain" },
  { id: "", name: "Muscle Weakness" },
  { id: "", name: "Stiff Neck" },
  { id: "", name: "Swelling Joints" },
  { id: "", name: "Movement Stiffness" },
  { id: "", name: "Spinning Movements" },
  { id: "", name: "Loss Of Balance" },
  { id: "", name: "Unsteadiness" },
  { id: "", name: "Weakness Of One Body Side" },
  { id: "", name: "Loss Of Smell" },
  { id: "", name: "Bladder Discomfort" },
  { id: "", name: "Foul Smell Of urine" },
  { id: "", name: "Continuous Feel Of Urine" },
  { id: "", name: "Passage Of Gases" },
  { id: "", name: "Internal Itching" },
  { id: "", name: "Toxic Look (typhos)" },
  { id: "", name: "Depression" },
  { id: "", name: "Irritability" },
  { id: "", name: "Muscle Pain" },
  { id: "", name: "Altered Sensorium" },
  { id: "", name: "Red Spots Over Body" },
  { id: "", name: "Belly Pain" },
  { id: "", name: "Abnormal Menstruation" },
  { id: "", name: "Dischromic  Patches" },
  { id: "", name: "Watering From Eyes" },
  { id: "", name: "Increased Appetite" },
  { id: "", name: "Polyuria" },
  { id: "", name: "Family History" },
  { id: "", name: "Mucoid Sputum" },
  { id: "", name: "Rusty Sputum" },
  { id: "", name: "Lack Of Concentration" },
  { id: "", name: "Visual Disturbances" },
  { id: "", name: "Receiving Blood Transfusion" },
  { id: "", name: "Receiving Unsterile Injections" },
  { id: "", name: "Coma" },
  { id: "", name: "Stomach Bleeding" },
  { id: "", name: "Distention Of Abdomen" },
  { id: "", name: "History Of Alcohol Consumption" },
  { id: "", name: "Fluid Overload.1" },
  { id: "", name: "Blood In Sputum" },
  { id: "", name: "Prominent Veins On Calf" },
  { id: "", name: "Palpitations" },
  { id: "", name: "Painful Walking" },
  { id: "", name: "Pus Filled Pimples" },
  { id: "", name: "Blackheads" },
  { id: "", name: "Scurring" },
  { id: "", name: "Skin Peeling" },
  { id: "", name: "Silver Like Dusting" },
  { id: "", name: "Small Dents In Nails" },
  { id: "", name: "Inflammatory Nails" },
  { id: "", name: "Blister" },
  { id: "", name: "Red Sore Around Nose" },
  { id: "", name: "Yellow Crust Ooze" },
];

export default function Disease() {
  const [recData, setRecData] = useState<any>([]);
  const [selectedDisease, setSelectedDisease] = useState([]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(selectedDisease.toString());
    const data = await fetch(
      `https://dispredoptum.herokuapp.com/predict/${selectedDisease.toString()}`
    );
    const res = await data.json();
    console.log(res);
    setRecData(res);
  }

  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-extrabold leading-tight text-blue-800">
                Disease Prediction
              </h1>

              <div className="mt-5 flex gap-x-4">
                {/** CREATE A DROPDOWN TO SELECT MULTIPLE VALUES FROM THE ARRAY */}
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-x-4">
                    <Multiselect
                      options={arrayofdiesease}
                      displayValue="name"
                      placeholder="Select Disease"
                      onSelect={(selectedList, selectedItem) => {
                        console.log(selectedList);
                        console.log(selectedItem);
                        setSelectedDisease(
                          selectedList.map(
                            (item: { name: string }) => item.name
                          )
                        );
                      }}
                      onRemove={(selectedList, removedItem) => {
                        console.log(selectedList);
                        console.log(removedItem);
                        setSelectedDisease(
                          selectedList.map(
                            (item: { name: string }) => item.name
                          )
                        );
                      }}
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </header>

          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-3xl font-semibold text-gray-900 sm:pl-6"
                            >
                              Name of Disease:{" "}
                              <span className="text-blue-800">
                                {recData.predicted_disease}
                              </span>
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-3xl font-semibold text-gray-900"
                            >
                              Risk Factor:{" "}
                              <span className="text-red-500">
                                {recData.risk_factor}
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white"></tbody>
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
