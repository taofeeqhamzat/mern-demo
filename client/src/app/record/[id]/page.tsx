"use client";

import { FormEvent, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { addRecord, updateRecord } from "@/utils";
import { ItemRecord } from "@/components/item/item";

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Item Name</label>
        <br />
        <input
          type="text"
          id="full-name"
          value={item.name || ""}
          onChange={(e) => {
            setItem({ ...item, name: e.target.value });
          }}
          className="p-1 border-2 text-black"
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          type="number"
          name="price"
          id="price"
          value={item.price || 0}
          onChange={(e) => {
            setItem({ ...item, price: Number(e.target.value) });
          }}
          className="p-1 border-2 text-black"
        />
        <br />
        <label htmlFor="status">Item Status</label>
        <br />
        <select
          name="status"
          id="status"
          required
          value={item.status || ""}
          onChange={(e) => {
            setItem({ ...item, status: e.target.value });
          }}
          className="p-1 border-2 text-black"
        >
          <option
            // label="Please choose an option"
            value={"Please choose an option"}
          />
          <hr />
          <option label="In Stock" value={"In Stock"} />
          <option label="Out of Stock" value={"Out of Stock"} />
        </select>
        <br />
        <input type="submit" value="Save item" />
      </form>
    </>
  );
}
