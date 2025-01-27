import { ItemRecord } from "./components/item/item";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const fetchRecords = async (): Promise<ItemRecord[] | undefined> => {
  if (!apiURL) {
    throw new Error("API URL is not defined");
  }

  const response = await fetch(apiURL);

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
    if (!apiURL) {
      throw new Error("API URL is not defined");
    }

    const response = await fetch(apiURL, {
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
    if (!apiURL) {
      throw new Error("API URL is not defined");
    }

    const response = await fetch(`${apiURL}/${item._id}`, {
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
    if (!apiURL) {
      throw new Error("API URL is not defined");
    }

    const response = await fetch(`${apiURL}/${id}`, {
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
