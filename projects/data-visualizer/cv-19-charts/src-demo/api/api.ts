import axios from 'axios'

export const getListApi = () => axios.post('https://api.inews.qq.com' +
  '/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf')
  .then((res) => { return res.data.data })
  .catch((error) => { console.log(error) })

export const getCityListApi = (city: string) => axios.post('https://api.inews.qq.com' +
  '/newsqa/v1/query/pubished/daily/list?province=' + city)
  .then((res) => { return res.data.data })
  .catch((error) => { console.log(error) })