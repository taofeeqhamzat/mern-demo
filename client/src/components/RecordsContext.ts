import { createContext, Dispatch, SetStateAction } from "react";
import { ItemRecord } from "@/components/item/item";

export const RecordsContext = createContext<{
  records: ItemRecord[];
  setRecords: Dispatch<SetStateAction<ItemRecord[]>>;
}>({ records: [], setRecords: () => {} });
