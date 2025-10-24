export interface TableColumn {
  columnDef: string;
  header: string;
  cell: (el: any) => string;
  icon?: string;
  class?: (el: any) => string;
  isShowAll?:boolean
}
