export interface TableButton {
  className?: string;
  name?: string | ((el?: any) => string);
  payload: (el?: any,index?:number) => void;
  iconName?: string;
  children?:TableButton[];
  isShown?:(el:any) => boolean;
}
