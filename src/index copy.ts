export {};
// import { NonParamKeys, ParamKeys, GetParams, Params, RoutesLike } from "./types";

// const products = "/products" as const;
// const product = `${products}/:product_id` as const;
// const applications = `${product}/applications` as const;
// const application = `${applications}/:app_id` as const;
// const policies = `${application}/policies` as const;
// const policy = `${policies}/:policy_id` as const;

// const paths = { policy, products, product };

// export const createLink = (path: string, params?: Record<string, string>) =>
//   path.replace(/(:\w+)/gi, (key) => params?.[key.slice(1)] || "");

// export function define<
//   T extends RoutesLike,
//   P extends <U extends keyof T>(name: U, path: T[U]) => { [k: string]: (...x: any[]) => any }
// >(paths: T, wrapper: P = {} as P) {
//   type WithoutParams = {
//     [K in NonParamKeys<T>]: {
//       path: T;
//       link(): T;
//     };
//   };
//   type WithParams = {
//     [K in ParamKeys<T>]: {
//       path: T;
//       link(params: K extends keyof T ? Params<T[K]> : never): string;
//     };
//   };

//   type WithWrapper = {
//     [K in keyof T]: {
//       // mapped ??

//       // just pass generic
//       // [N in keyof P]: <T1>(params: Params<T[K]>, ...rest: Second<Parameters<P[N]>>) => P[N]<x>;

//       // default return value, not always useful
//       //   [N in keyof P]: Params<T[K]>;
//       [N in keyof ReturnType<P>]: <T1>(
//         params: Params<T[K]>,
//         ...rest: Second<Parameters<ReturnType<P>[N]>>
//       ) => ReturnType<ReturnType<P>[N]>;
//     };
//   };
//   type Second<T extends any[]> = T extends [any, ...infer U] ? U : never;
//   type PathLinks = WithParams & WithoutParams;
//   const o = Object.fromEntries(
//     Object.entries(paths).map(([k, v]) => {
//       const entry = [
//         k,
//         {
//           path: k,
//           link: (params?: any) => {
//             const path = paths[k];
//             return createLink(path, params);
//           },
//           ...wrapper,
//         },
//       ];
//       return entry;
//     })
//   ) as PathLinks;

//   return o;
// }

// // MAP strings to functions
// // customize function names
// declare const ff: <T>(x: any) => Promise<T>;
// const routes = define(paths, (name, path) => ({
//   get: <T>(params, query: { size?: number }, zoo: string) => ff<T>("foo"),
//   create: (params, query: { size?: number }, body: { data: number }) => 1,
// }));

// type xx = Params<typeof product>;
// routes.product.link({ product_id: "1" });
// routes.product.get<1>({ product_id: "1" }, { size: 1 }, "1");
// routes.products.get<1>({}, { size: 1 }, "1");
// routes.product.create({ product_id: "1" }, { size: 1 }, { data: 1 });

// // /// Routes
// // /// <Link to={routes.policy.link({policy_id: "1", app_id: "1"})}
// // /// <Route path={routes.policy.path}

// // /// API Client

// const pathlinks = define(paths);
// declare const http: { get: any; post: any };
// type LinkParams<T extends (...x: any[]) => any> = Parameters<T>[0];
// const apiClientRaw = {
//   getProduct: (o: LinkParams<typeof pathlinks.product.link>) => http.get(pathlinks.product.link(o)),
//   createProduct: (o: Params<typeof product>, body: { other?: any }) => http.post(pathlinks.product.link(o), { body }),
// };
