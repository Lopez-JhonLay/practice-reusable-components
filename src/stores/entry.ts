import { reactive, ref } from "vue";
import { defineStore } from "pinia";

import type { Entry } from "@/model";

import { ElNotification } from "element-plus";

export const useEntryStore = defineStore("entry", () => {
  const entries = reactive<Entry[]>(
    JSON.parse(localStorage.getItem("entry") || "[]")
  );
  const isLoading = ref(false);

  async function saveEntry(
    newEntry: Omit<Entry, "id, date">
  ): Promise<boolean> {
    isLoading.value = true;

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      const newEntryWithId: Entry = {
        id: crypto.randomUUID(),
        date: new Date().toDateString(),
        ...newEntry,
      };

      entries.push(newEntryWithId);

      ElNotification({
        title: "Success",
        message: "Entry Successfully saved!",
        type: "success",
        duration: 5000,
      });

      localStorage.setItem("entry", JSON.stringify(entries));

      return true;
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "Failed to save entry",
        type: "error",
        duration: 5000,
      });
      console.error("Error saving entry:", error);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  return { entries, saveEntry, isLoading };
});
