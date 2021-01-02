export type PathLinks<T extends RoutesLike> = WithParams<T> & WithoutParams<T>;

export type Params<T extends string> = [GetParams<T>] extends [never] ? never : { [N in GetParams<T>]: string };

export type ParamsOf<T extends PathLinks<any>> = {
  [K in keyof T]: Parameters<T[K]["link"]>[0];
};

export interface RoutesLike {
  readonly [name: string]: RouteDef;
}

type WithoutParams<T extends RoutesLike> = {
  [K in NonParamKeys<T>]: {
    path: GetKey<T, K>;
    link(): GetKey<T, K>;
  };
};

type WithParams<T extends RoutesLike> = {
  [K in ParamKeys<T>]: {
    path: GetKey<T, K>;
    link(params: K extends keyof T ? Params<T[K]> : never): GetKey<T, K>;
  };
};

type GetKey<T, K> = K extends keyof T ? T[K] : never;

type GetParams<T extends string> = string extends T
  ? T
  : T extends `${infer Start}/:${infer Param}/${infer Rest}` // Matches: path/param/path
  ? Param | GetParams<Start | Rest>
  : T extends `${infer Start}/:${infer Param}` // Matches: path/param
  ? Param | GetParams<Start>
  : T extends `:${infer Param}/${infer Rest}` // Matches: param/path
  ? Param | GetParams<Rest>
  : never;

type RouteDef = string;

type ParamKeys<T extends RoutesLike> = keyof {
  [K in keyof T as Params<T[K]> extends never ? never : K]: any;
};

type NonParamKeys<T extends RoutesLike> = keyof {
  [K in keyof T as Params<T[K]> extends never ? K : never]: any;
};
