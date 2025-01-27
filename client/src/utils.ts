import { ItemRecord } from "./components/item/item";

const fetchRecords = async (): Promise<ItemRecord[] | undefined> => {
  const response = await fetch("http://localhost:5050/records/");

  if (!response.ok) {
    const message = `An error occured: ${response.statusText}`;
    console.error(message);
    return;
  }

  const records = await response.json();
  return records;
};

const fetchRecord = async () => {
  return;
};

const addRecord = async (item: ItemRecord) => {
  try {
    const response = await fetch(`http://localhost:5050/records/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP Error! \n Status: ${response.status} \n Message: ${response.statusText} `
      );
    }
  } catch (error) {
    console.error(error);
  }
  return;
};

const updateRecord = async (item: ItemRecord) => {
  try {
    const response = await fetch(`http://localhost:5050/records/${item._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        price: item.price,
        status: item.status,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP Error! \n Status: ${response.status} \n Message: ${response.statusText} `
      );
    }
  } catch (error) {
    console.error(error);
  }

  return;
};

const deleteRecord = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5050/records/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `HTTP Error! \n Status: ${response.status} \n Message: ${response.statusText} `
      );
    }
  } catch (error) {
    console.error(error);
  }

  return;
};

export { fetchRecords, fetchRecord, addRecord, updateRecord, deleteRecord };
