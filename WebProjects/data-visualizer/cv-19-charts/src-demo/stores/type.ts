export interface ChinaTotal {
  heal: number;
  nowSevere: number;
  dead: number;
  localConfirm: number;
  confirm: number;
  nowConfirm: number;
  suspect: number;
  noInfect: number;
  noInfectH5: number;
  importedCase: number;
  showLocalConfirm: number;
  showlocalinfeciton: number;
  localConfirmH5: number;
  local_acc_confirm: number;
}

export interface ChinaAdd {
  noInfectH5: number;
  localConfirmH5: number;
  confirm: number;
  dead: number;
  suspect: number;
  noInfect: number;
  localConfirm: number;
  heal: number;
  nowConfirm: number;
  nowSevere: number;
  importedCase: number;
}

export interface ShowAddSwitch {
  suspect: boolean;
  heal: boolean;
  noInfect: boolean;
  localConfirm: boolean;
  all: boolean;
  dead: boolean;
  nowConfirm: boolean;
  nowSevere: boolean;
  importedCase: boolean;
  localinfeciton: boolean;
  confirm: boolean;
}

export interface Today {
  confirm: number;
  isUpdated: boolean;
}

export interface Total {
  showHeal: boolean;
  wzz: number;
  provinceLocalConfirm: number;
  nowConfirm: number;
  confirm: number;
  dead: number;
  showRate: boolean;
  heal: number;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  tip: string;
  wzz_add: number;
}

export interface Total {
  confirm: number;
  dead: number;
  showRate: boolean;
  heal: number;
  showHeal: boolean;
  wzz: number;
  provinceLocalConfirm: number;
  nowConfirm: number;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
}

export interface Total {
  nowConfirm: number;
  confirm: number;
  dead: number;
  showRate: boolean;
  heal: number;
  showHeal: boolean;
  wzz: number;
  provinceLocalConfirm: number;
}

export interface Children {
  name: string;
  today: Today;
  total: Total;
}

export interface Children {
  name: string;
  today: Today;
  total: Total;
  children: Children[];
}

export interface AreaTree {
  name: string;
  today: Today;
  total: Total;
  children: Children[];
}

export interface Diseaseh5Shelf {
  lastUpdateTime: string;
  chinaTotal: ChinaTotal;
  chinaAdd: ChinaAdd;
  isShowAdd: boolean;
  showAddSwitch: ShowAddSwitch;
  areaTree: AreaTree[];
}

export interface StatisGradeCityDetail {
  confirmAdd: number;
  confirm: number;
  grade: string;
  syear: number;
  province: string;
  city: string;
  nowConfirm: number;
  dead: number;
  heal: number;
  date: string;
  sdate: string;
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf;
  statisGradeCityDetail: StatisGradeCityDetail[];
}

//城市数据类型
export interface CityData {
  year: number;
  date: string;
  country: string;
  province: string;
  confirm: number;
  dead: number;
  heal: number;
  confirm_add: string;
  confirm_cuts: string;
  dead_cuts: string;
  now_confirm_cuts: string;
  heal_cuts: string;
  newConfirm: number;
  newHeal: number;
  newDead: number;
  description: string;
  wzz: number;
  wzz_add: number;
}