interface ICardList {
  mainT?: string
  subT?: string
  body?: string
}

interface ITree {
  title: string
  body?: string
  children?: ITree[] | [] // children 也是接口自身
}

// 导出 interface接口/type 需要使用 type
export type { ICardList, ITree }
