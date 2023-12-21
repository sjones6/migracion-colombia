"use client";

import { format, parse } from "date-fns";
import { useState } from "react";

export default function DisponibleCitas({
  name,
  total,
  disponibles,
}: {
  name: string;
  total: number;
  disponibles: {
    date: string;
    available: number;
  }[];
}) {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={() => setVisible(!visible)}
        className={`text-md font-semibold flex flex-row gap-2 mb-2 ${
          total ? "text-white" : "text-gray-700"
        }`}
      >
        {name}
        <span className="rounded text-[.7em] bg-gray-700 text-gray-100 flex justify-center place-items-center h-6 p-2">
          {total}
        </span>
      </button>
      <div>
        {visible && (
          <>
            {disponibles.length ? (
              <div className="w-[300px] border border-gray-700 rounded p-4">
                <table className="w-full table-fixed border-collapse mb-3">
                  <thead className="">
                    <tr className="">
                      <th className="p-2">Date</th>
                      <th className="w-24 p-2">Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disponibles.map((fecha) => (
                      <tr
                        key={fecha.date}
                        className="hover:bg-gray-100/10 px-2 rounded"
                      >
                        <td className="p-1">
                          {format(
                            parse(fecha.date, "yyyy-M-d", new Date()),
                            "eee, MMM d",
                          )}
                        </td>
                        <td className="w-24 text-center p-1">
                          {fecha.available}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => setVisible(false)}
                  className="bg-gray-800 text-gray-100 px-2 py-1 rounded"
                >
                  Hide schedule
                </button>
              </div>
            ) : (
              <div className="text-gray-500">
                <p>
                  No appointments currently available for this service. Check
                  back later as appointments can be added at any time.
                </p>
                <p>
                  For official schedule, refer to the{" "}
                  <a
                    href="https://agendamigracol.naturasoftware.com/agenda"
                    rel="noreferer noopener"
                    target="_blank"
                    className="underline text-white"
                  >
                    Migración Colombia site
                  </a>
                  .
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
