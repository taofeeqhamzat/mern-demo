"use client";

import { FormEvent, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { addRecord, updateRecord } from "@/utils";
import { ItemRecord } from "@/components/item/item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons/faCircleLeft";

export default function Add() {
  const params = useParams();
  // Query string parameters to prefill the form
  const searchParams = useSearchParams();

  // ID from nextjs router params
  const { id } = params;
  const [item, setItem] = useState<ItemRecord>({
    _id: id || "",
    name: searchParams.get("name") || "",
    price: Number(searchParams.get("price")) || 0,
    status: searchParams.get("status") || "",
  });
  console.log(item);

  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id === "new") {
      addRecord(item).then(() => {
        router.replace("/");
      });
      return;
    }
    updateRecord(item).then(() => {
      router.push("/");
    });
    return;
  };

  console.log(id);
  return (
    <>
      <header className="flex flex-row justify-center content-center relative w-[60%] landscape:w-[70%] landscape:md:w-[60%] min-w-80 mx-auto my-4 mt-9 p-3 items-center font-bold text-2xl sm:text-3xl text-center">
        <button onClick={() => router.back()} className="absolute left-[7.5%]">
          <FontAwesomeIcon icon={faCircleLeft} size="sm" />
        </button>
        <h1 className="">Inventory Item</h1>
      </header>
      <form
        onSubmit={handleSubmit}
        className="w-[60%] landscape:w-[70%] landscape:md:w-[60%] min-w-80 mx-auto flex flex-row flex-wrap justify-between items-center p-2 text-xs sm:text-sm md:text-lg font-bold"
      >
        <label htmlFor="item" className="w-[100%] mt-7">
          Item:
          <br />
          <input
            type="text"
            id="item"
            placeholder="e.g Crocs"
            value={item.name || ""}
            maxLength={12}
            minLength={2}
            onChange={(e) => {
              setItem({ ...item, name: e.target.value });
            }}
            className="my-1 border-2 w-full p-2 rounded-lg focus:outline-[darkgrey] focus:outline-offset-4 bg-inherit"
          />
        </label>
        <br />
        <label htmlFor="price" className="w-[25%] sm:w-[40%] mt-7">
          Price:
          <br />
          <input
            type="number"
            name="price"
            id="price"
            placeholder="e.g 99.99"
            value={item.price || 0}
            maxLength={3}
            onChange={(e) => {
              setItem({ ...item, price: Number(e.target.value) });
            }}
            className="my-1 border-2 w-full p-2 rounded-lg focus:outline-[darkgrey] focus:outline-offset-4 bg-inherit"
          />
        </label>
        <br />
        <label htmlFor="status" className="w-[70%] sm:w-[50%] mt-7">
          Status:
          <br />
          <select
            name="status"
            id="status"
            required
            value={item.status || ""}
            onChange={(e) => {
              setItem({ ...item, status: e.target.value });
            }}
            className="my-1 border-2 p-2 w-full rounded-lg focus:outline-[darkgrey] focus:outline-offset-4 focus-within:bg-slate-300 dark:focus-within:bg-slate-600 bg-inherit"
          >
            <option label="Choose an option" />
            <hr />
            <option
              label="In Stock"
              value={"In Stock"}
              className="p-2 bg-slate-200 dark:bg-slate-600"
            />
            <option
              label="Out of Stock"
              value={"Out of Stock"}
              className="p-2 bg-slate-200 dark:bg-slate-600"
            />
          </select>
        </label>
        <br />
        <label htmlFor="submit" className="sr-only">
          Click to save item
        </label>
        <input
          type="submit"
          value="Save item"
          id="submit"
          className="mx-auto my-7 w-[50%] border p-2 rounded-xl bg-slate-200 dark:bg-slate-600 border-[darkgrey] dark:border-[lightgrey]"
        />
      </form>
    </>
  );
}
