export {};
// import { ParamsOf, PathLinks, RoutesLike } from "types";
// import { define, link } from ".";

// const products = "/products" as const;
// const product = `${products}/:product_id` as const;
// const applications = `${product}/applications` as const;
// const application = `${applications}/:app_id` as const;
// const policies = `${application}/policies` as const;
// const policy = `${policies}/:policy_id` as const;
// const versions = `${policy}/versions` as const;
// const version = `${versions}/:version_id` as const;

// const entities = [
//   [{ product }, { products }],
//   [{ policy }, { policies }],
//   [{ application }, { applications }],
//   [{ version }, { versions }],
// ] as const;

// const paths = { policies, policy, applications, application, versions, version, products, product };

// const routes = define(paths);

// function defineEntities<T extends ReadonlyArray<readonly [Record<string, string>, Record<string, string>]>>(x: T) {}
// const f = defineEntities(entities);
// // Create links
// routes.product.link(); // {product_id: "1"} -works
// routes.products.link();
// // Use path
// routes.products.path;
// // this can be used to create a router and api client

// const foo = link(version, { product_id: "1", version_id: "2", app_id: "3", policy_id: "4" });
// const foo2 = link(products, {});
// // routes.products.create(body)
// // routes.products.get()
// // routes.product.get({product_id:"1"})
// /// api client
// declare const http: { get: any; post: any };
// type Params = ParamsOf<typeof routes>;

// const productApi = {
//   getProduct: (o: Params["product"]) => http.get(routes.product.link(o)),
//   deleteProduct: (o: Params["product"]) => http.get(routes.product.link(o)),
//   createProduct: (body: any) => http.post(routes.products.link(), body),
//   getProducts: () => http.get(routes.products.link()),
// };

// type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

// type Singles = keyof UnionToIntersection<typeof entities[number][0]>;
// type Many = keyof UnionToIntersection<typeof entities[number][1]>;
// const getSingle = () => ({
//   update: (link, query, body) => http.post(link, query, body),
//   delete: (link, query) => http.delete(link, query),
//   get: (link, query) => http.get(link, query),
// });
// const getMany = () => ({
//   create: (link, query, body) => http.post(link, query, body),
//   get: (link, query) => http.get(link, query),
// });

// const singles = [] as Singles[];
// const isSingle = (x: string): x is Singles => singles.includes(x as any);
// const api = Object.fromEntries(
//   entities.map((e) => {
//     const [single, many] = e;
//     const k1 = Object.keys(single)[0] as keyof UnionToIntersection<typeof single>;
//     const k2 = Object.keys(many)[0] as keyof UnionToIntersection<typeof many>;

//     const singleObj = {
//       ...routes[k1],
//       yaySingle: 1,
//     };
//     const manyObj = {
//       ...routes[k2],
//       yayMany: 2,
//     };
//     return [
//       [k1, singleObj],
//       [k2, manyObj],
//     ] as const;
//   })
// );

// const x = api[0];
// // api.products.create()
// // api.products.get()
// // api.product.get({}, query,)
// // api.product.delete({}, query)
// // api.product.update({product_id}, query, body)
