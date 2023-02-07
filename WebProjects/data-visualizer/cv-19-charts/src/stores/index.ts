import { shallowRef, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { getApiList } from "@/http/index";
import type {
  RootObject,
  Children,
  ChinaAdd,
  ChinaTotal,
  LocalCityNCOVDataList,
} from "@/core/type";

export const useChartStore = defineStore("chart", () => {
  // state
  const list = shallowRef(<RootObject>{});
  const item = shallowRef(<Children[]>[]);

  // getters

  // 新增信息
  const chinaAdd = computed<ChinaAdd>(() => {
    return list.value.diseaseh5Shelf?.chinaAdd;
  });
  // 总数信息
  const chinaTotal = computed<ChinaTotal>(() => {
    return list.value.diseaseh5Shelf?.chinaTotal;
  });
  // 新增 Top10
  const newTop10 = computed(() => {
    const dataList = list.value.localCityNCOVDataList;
    return dataList.slice(0, 10).map((item) => {
      return {
        name: item.city,
        value: item.local_confirm_add,
      };
    });
  });

  // actions
  const fetchList = async () => {
    let result = await getApiList();
    list.value = result;
  };

  return {
    fetchList,
    list,
    item,
    chinaAdd,
    chinaTotal,
    newTop10,
  };
});
