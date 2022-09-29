import { shallowRef, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { getApiList } from "@/http/index";
import type { RootObject } from "@/core/type";

export const useChartStore = defineStore("chart", () => {
  const list = shallowRef(<RootObject>{});
  const fetchList = async () => {
    let result = await getApiList();
    list.value = result;
  };

  return { fetchList, list };
});
