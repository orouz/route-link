export interface PathLink<T extends string> {
  path: T;
  link(...[params]: Params<T> extends never ? [] : [params: Params<T>]): string;
}

type Params<T extends string> = string extends T
  ? never
  : T extends `${infer Start}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof Params<Rest>]: string }
  : T extends `${infer Start}:${infer Param}`
  ? { [k in Param]: string }
  : never;

const pattern = /(:\w+)/gi;

// this function only exists because i didn't succeed calling `link` with a generic string
// it always infers the arguments length as 1, which is the length for a non-parametrized path
// this function executes while path/link provide type-safety
// ideally we'd only need to type 1 link function
const createURL = (path: string, params?: Record<string, string>) =>
  params ? path.replace(pattern, (key) => params[key.slice(1)]) : path;

/**
 *
 * @param path a template string separated by `/` and parametrized by `/:`
 * @param params the param keys inferred from the template string
 * @example
 * link('/posts/:post_id', { post_id: "1" })
 * link('/posts')
 */
export const link = <T extends string>(
  ...[path, params]: Params<T> extends never
    ? [path: T]
    : [path: T, params: Params<T>]
): string => createURL(path, params);

/**
 *
 * @param template a string separated by `/` and parametrized by `/:`
 * @example
 * path('/posts/:post_id')
 * path('/posts')
 */
export const path = <T extends string>(template: T): PathLink<T> => ({
  path: template,
  link: (...[params]: Params<T> extends never ? [] : [params: Params<T>]) =>
    createURL(template, params),
});
