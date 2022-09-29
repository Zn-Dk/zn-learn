import { defineStore } from 'pinia'
import { getListApi, getCityListApi } from '../api/api'
import type { Children, RootObject, ChinaTotal, ChinaAdd, StatisGradeCityDetail, CityData } from './type'

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list: <RootObject>{},
    item: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    cityDetail: <StatisGradeCityDetail[]>{},
    cityData: <CityData[]>[],
  }),
  actions: {
    async getList() {
      const result = await getListApi()
      this.list = result
      this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd
      this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal
      this.cityDetail = this.list.statisGradeCityDetail.slice(0, 10)
    },

    async getCityList(city: string) {
      this.cityData = await getCityListApi(city);
      console.log('折线图', this.cityData);
    }
  }
})
