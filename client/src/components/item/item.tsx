"use client";

import { useContext } from "react";
import { RecordsContext } from "@/app/page";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { deleteRecord } from "@/utils";

export type ItemRecord = {
  _id: string | string[] | null; // This is a string in the database, but it is an array in the URL
  name: string | null;
  price: number | null;
  status: string | null;
};

function Item({ record }: { record: ItemRecord }) {
  const { records, setRecords } = useContext(RecordsContext); // TODO: Fix type error

  useContext(RecordsContext);
  const handleDelete = (id: string) => async () => {
    await deleteRecord(id);
    setRecords(records.filter((record: ItemRecord) => record._id !== id));
  };

  return (
    <>
      <th scope="row" className="p-1 sm:p-3">
        {record.name}
      </th>
      <td className="p-1 sm:p-3">{record.price}</td>
      <td className="p-1 sm:p-3">{record.status}</td>
      <td>
        <Link
          href={`record/${record._id}?name=${record.name}&price=${record.price}&status=${record.status}`}
          className="p-1 sm:p-0"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      </td>
      <td>
        <button onClick={handleDelete(record._id)} className="p-1 sm:p-0">
          {/* TODO: Fix type error*/}
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </>
  );
}

function ItemList({ records }: { records: ItemRecord[] }) {
  return (
    <tr className="grid grid-cols-subgrid col-start-1 col-end-6 items-center justify-items-center p-2 py-4">
      {records.map((record, index) => {
        return (
          <>
            <Item key={`${index}+${Math.random()}`} record={record} />
          </>
        );
      })}
    </tr>
  );
}

export default ItemList;
