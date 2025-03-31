import { reactive } from "vue";
import { defineStore } from "pinia";

import type { Entry } from "@/model";

import { ElNotification } from "element-plus";

export const useEntryStore = defineStore("entry", () => {
  const entries = reactive<Entry[]>([]);

  function saveEntry(newEntry: Entry) {
    const id = crypto.randomUUID();

    newEntry = {
      id: id,
      title: newEntry.title,
      content: newEntry.content,
    };
    entries.push(newEntry);
    ElNotification({
      title: "Success",
      message: "Entry Successfully saved!",
      type: "success",
    });
  }

  return { entries, saveEntry };
});
