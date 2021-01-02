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
 * link('/posts', {} as never) // use `define` to avoid this
 */
export const link = <T extends string>(path: T, params: Params<T>) =>
  path.replace(/(:\w+)/gi, (key) => params?.[key.slice(1) as keyof Params<T>] || "");

/**
 *
 * @param paths a `Record<string,string>` with its values being a template string separated by `/` and parametrized by `/:`
 */
export const define = <T extends RoutesLike>(paths: T) =>
  // Some cheating is done with casting for the greater good
  // PRs are welcome to type this properly
  Object.fromEntries(Object.entries(paths).map(createPathLinkEntry)) as PathLinks<T>;
