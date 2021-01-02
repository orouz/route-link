import { RoutesLike, PathLinks, Params } from "./types";

const createPathLink = (path: string) => ({
  path,
  link: link.bind(null, path),
});

const createPathLinkEntry = ([name, path]: [string, string]) => [name, createPathLink(path)] as const;

/**
 *
 * @param path a template string separated by `/` and parametrized by `/:`
 * @param params the param keys inferred from the template string
 * @example
 * link('/posts/:post_id', { post_id: "1" })
 * link('/posts', {}) // see #1234
 */
export const link = <T extends string>(path: T, params: Params<T>) =>
  path.replace(/(:\w+)/gi, (key) => params?.[key.slice(1) as keyof Params<T>] || "");

/**
 *
 * @param paths a `Record<string,string>` with its values being a template string separated by `/` and parametrized by `/:`
 */
export const define = <T extends RoutesLike>(paths: T) =>
  // NOTE: Casting to PathLinks is what enables the type-checking of the template strings,
  // But we're losing type-safety by doing so.
  // I don't think it's possible to safely type Object.keys/entries
  // Which means we can't map all keys correctly
  Object.fromEntries(Object.entries(paths).map(createPathLinkEntry)) as PathLinks<T>;
