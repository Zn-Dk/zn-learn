export interface ShowAddSwitch {
  all: boolean;
  confirm: boolean;
  nowConfirm: boolean;
  importedCase: boolean;
  noInfect: boolean;
  localConfirm: boolean;
  suspect: boolean;
  dead: boolean;
  heal: boolean;
  nowSevere: boolean;
  localinfeciton: boolean;
}

export interface Today {
  confirm: number;
  isUpdated: boolean;
}

export interface Total {
  continueDayZeroLocalConfirm: number;
  showRate: boolean;
  showHeal: boolean;
  wzz: number;
  mediumRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
  mtime: string;
  nowConfirm: number;
  confirm: number;
  provinceLocalConfirm: number;
  highRiskAreaNum: number;
  adcode: string;
  dead: number;
  heal: number;
}

export interface Today {
  dead_add: number;
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  tip: string;
  wzz_add: number;
  local_confirm_add: number;
  abroad_confirm_add: number;
}

export interface Total {
  wzz: number;
  mediumRiskAreaNum: number;
  adcode: string;
  nowConfirm: number;
  showHeal: boolean;
  showRate: boolean;
  heal: number;
  provinceLocalConfirm: number;
  highRiskAreaNum: number;
  continueDayZeroConfirmAdd: number;
  mtime: string;
  confirm: number;
  dead: number;
  continueDayZeroConfirm: number;
  continueDayZeroLocalConfirmAdd: number;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  wzz_add: number;
  local_confirm_add: number;
}

export interface Total {
  showHeal: boolean;
  highRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
  adcode: string;
  confirm: number;
  provinceLocalConfirm: number;
  mtime: string;
  dead: number;
  showRate: boolean;
  heal: number;
  continueDayZeroLocalConfirm: number;
  nowConfirm: number;
  wzz: number;
  mediumRiskAreaNum: number;
}

export interface Children {
  adcode: string;
  date: string;
  today: Today;
  total: Total;
  name: string;
}

export interface Children {
  date: string;
  today: Today;
  total: Total;
  children: Children[];
  name: string;
  adcode: string;
}

export interface AreaTree {
  name: string;
  today: Today;
  total: Total;
  children: Children[];
}

export interface ChinaTotal {
  mRiskTime: string;
  heal: number;
  dead: number;
  confirmAdd: number;
  nowLocalWzz: number;
  localConfirmAdd: number;
  nowConfirm: number;
  importedCase: number;
  showLocalConfirm: number;
  localWzzAdd: number;
  deadAdd: number;
  highRiskAreaNum: number;
  confirm: number;
  suspect: number;
  nowSevere: number;
  noInfect: number;
  noInfectH5: number;
  mtime: string;
  showlocalinfeciton: number;
  localConfirmH5: number;
  local_acc_confirm: number;
  mediumRiskAreaNum: number;
  localConfirm: number;
}

export interface ChinaAdd {
  suspect: number;
  importedCase: number;
  noInfectH5: number;
  localConfirmH5: number;
  localConfirm: number;
  confirm: number;
  heal: number;
  dead: number;
  nowConfirm: number;
  nowSevere: number;
  noInfect: number;
}

export interface Diseaseh5Shelf {
  showAddSwitch: ShowAddSwitch;
  areaTree: AreaTree[];
  lastUpdateTime: string;
  chinaTotal: ChinaTotal;
  chinaAdd: ChinaAdd;
  isShowAdd: boolean;
}

export interface LocalCityNCOVDataList {
  highRiskAreaNum: number;
  province: string;
  city: string;
  date: string;
  isUpdated: boolean;
  mtime: string;
  local_wzz_add: string;
  mediumRiskAreaNum: number;
  isSpecialCity: boolean;
  adcode: string;
  local_confirm_add: number;
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf;
  localCityNCOVDataList: LocalCityNCOVDataList[];
}
