export interface Props {
  headings: {
    key: string;
    title: string;
  }[];
  people: {
    name: string;
    title: string;
    email: string;
    role: string;
  }[];
}

export default function DynamicTable({ headings, people }: Props) {
  return (
    // <div className="mt-8 flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {headings.map((heading) => (
                  <th
                    key={heading.key}
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {heading.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {people.map((person, personIdx) => (
                <tr
                  key={personIdx}
                  className={personIdx % 2 === 0 ? undefined : "bg-gray-50"}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {person.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {person.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {person.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {person.role}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit<span className="sr-only">, {person.name}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // </div>
  );
}
