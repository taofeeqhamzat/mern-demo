"use client";

import ItemList, { type ItemRecord } from "@/components/item/item";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchRecords } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { RecordsContext } from "@/components/RecordsContext";

export default function Home() {
  const [records, setRecords] = useState<ItemRecord[]>([]);

  useEffect(() => {
    fetchRecords().then((data) => {
      if (data) {
        setRecords(data.reverse());
      }
    });
  }, [records.length]);

  return (
    <table className="flex flex-col p-2 sm:p-3 mx-auto mb-4 bg-slate-200 dark:bg-slate-600 border-[darkgrey] dark:border-[lightgrey] border-2 rounded-xl dark:text-white">
      <caption className="p-2 border-[3px] border-[darkgrey] dark:border-[lightgrey] rounded-t-md font-bold text-2xl sm:text-3xl text-center">
        Inventory
      </caption>
      <thead className="grid grid-cols-custom-sm sm:grid-cols-custom py-3">
        <tr className="grid grid-cols-subgrid col-start-1 col-end-4 px-2">
          <th scope="col" className="w-full text-nowrap text-center">
            Name
          </th>
          <th scope="col" className="w-full text-nowrap text-center">
            Price
          </th>
          <th scope="col" className="w-full text-nowrap text-center">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="grid grid-cols-custom-sm sm:grid-cols-custom items-start min-h-[25vh] max-h-[50vh] overflow-y-scroll p-2 border-[3px] border-[darkgrey] dark:border-[lightgrey] rounded-b-md text-sm text-start md:text-md lg:text-lg">
        <RecordsContext.Provider value={{ records, setRecords }}>
          <ItemList records={records} />
        </RecordsContext.Provider>
      </tbody>
      <tfoot className="p-2 text-sm md:text-md lg:text-lg">
        <tr className="w-full block pt-4">
          <td className="flex flex-row justify-center items-center mx-auto text-center text-nowrap">
            <Link
              href="/record/new"
              className="scale-150 p-0 border-0 border-spacing-2 shadow-black shadow-xl hover:shadow-none rounded-full"
            >
              <FontAwesomeIcon icon={faCirclePlus} size="2xl" />
            </Link>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

// let cards = ['Jack', 8, 2, 2, 6, 'King', 5, 3, 'Queen', 'King', 'Queen'];
// const ranks = {
//   '1': 1,
//   '2': 2,
//   '3': 3,
//   '4': 4,
//   '5': 5,
//   '6': 6,
//   '7': 7,
//   '8': 8,
//   '9': 9,
//   '10': 10,
//   'Jack': 11,
//   'Queen': 12,
//   'King': 13
// }
// cards.sort((next, prev) => {
//   return ranks[next.toString()] - ranks[prev.toString()];
// })

// console.log(cards);
