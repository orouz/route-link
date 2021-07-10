/* eslint-disable @typescript-eslint/ban-types */
export interface RouteLink<T extends string> {
  path: T;
  link(...[params]: {} extends Params<T> ? [] : [params: Params<T>]): string;
  match: (url: string) => false | Params<T>;
}
// https://twitter.com/danvdk/status/1301707026507198464?lang=en
type Params<T extends string> = string extends T
  ? Record<string, string>
  : T extends `${infer Start}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof Params<Rest>]: string }
  : T extends `${infer Start}:${infer Param}`
  ? { [k in Param]: string }
  : {};

/**
 *
 * @param path a template string separated by `/` and parametrized by `/:`
 * @param params the param keys inferred from the template string
 * @example
 * link('/posts/:post_id', { post_id: "1" })
 * link('/posts')
 */
export const link = <T extends string>(
  ...[path, params]: {} extends Params<T>
    ? [path: T]
    : [path: T, params: Params<T>]
): string => createURL(path, params);

/**
 *
 * @param path a string separated by `/` and parametrized by `/:`
 * @example
 * route('/posts/:post_id')
 * route('/posts')
 */
export const route = <T extends string>(path: T): RouteLink<T> => ({
  path,
  match: (url: string) => match(path, url),
  link: (...[params]: {} extends Params<T> ? [] : [params: Params<T>]) =>
    createURL(path, params),
});

/**
 *
 * @param a a RouteLink<T>
 * @param b a string separated by `/` and parametrized by `/:`
 * @example
 * const posts = route('/posts')
 * const post  = extend(posts, '/:post_id')
 */
export const extend = <A extends string, B extends string>(
  a: RouteLink<A>,
  b: B
): RouteLink<`${A}${B}`> => route((a.path + b) as `${A}${B}`);

/**
 *
 * @param path a string separated by `/` and parametrized by `/:`
 * @param url a string representing a valid URL
 * @example
 * const posts = route('/posts')
 * const post  = extend(posts, '/:post_id')
 * const params  = match(post.path, '/posts/foo') // { post_id: "foo" }
 */
export const match = <T extends string>(
  path: T,
  url: string
): false | Params<T> => {
  const pathSegments = path.trim().split("/").filter(Boolean);
  const urlSegments = url.trim().split("/").filter(Boolean);

  if (pathSegments.length !== urlSegments.length) return false;

  const params: Record<string, string> = {};

  for (let i = 0; i < pathSegments.length; i++) {
    const pathSeg = pathSegments[i];
    const urlSeg = urlSegments[i];

    if (pathSeg.startsWith(":")) {
      params[pathSeg.slice(1)] = urlSeg;
      continue;
    }

    if (pathSeg !== urlSeg) return false;
  }

  return params as Params<T>;
};

// this function only exists because i didn't succeed calling `link` with a generic string
// it always infers the arguments length as 1, which is the length for a non-parametrized path
// this function executes while path/link provide type-safety
// ideally we'd only need to type 1 link function
const createURL = (path: string, params?: Record<string, string>) =>
  params ? path.replace(/(:\w+)/gi, (key) => params[key.slice(1)]) : path;
