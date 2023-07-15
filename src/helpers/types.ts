export interface IDimensions {
  columns: number;
  rows: number;
}

export type TypeWithGeneric<T> = T[];
export type extractGeneric<Type> = Type extends TypeWithGeneric<infer X>
  ? X
  : never;
