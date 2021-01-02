export type PathLink<T extends string> = Params<T> extends never
  ? StaticPath<T>
  : ParamPath<T>;
export type Params<T extends string> = [GetParams<T>] extends [never]
  ? never
  : { [N in GetParams<T>]: string };

type StaticPath<T extends string> = { path: T; link(): T };
type ParamPath<T extends string> = { path: T; link(params: Params<T>): string };

type GetParams<T extends string> = string extends T
  ? T
  : T extends `${infer Start}/:${infer Param}/${infer Rest}` // Matches: path/param/path
  ? Param | GetParams<Start | Rest>
  : T extends `${infer Start}/:${infer Param}` // Matches: path/param
  ? Param | GetParams<Start>
  : T extends `:${infer Param}/${infer Rest}` // Matches: param/path
  ? Param | GetParams<Rest>
  : never;
