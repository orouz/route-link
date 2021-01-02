import type { Params, PathLink } from "types";

const pattern = /(:\w+)/gi;

/**
 *
 * @param path a template string separated by `/` and parametrized by `/:`
 * @param params the param keys inferred from the template string
 * @example
 * link('/posts/:post_id', { post_id: "1" })
 * link('/posts')
 */
export function link<T extends string>(
  ...[path, params]: Params<T> extends never
    ? [path: T]
    : [path: T, params: Params<T>] // Credit for the type spell: https://stackoverflow.com/questions/51488717/declaring-dependent-argument-types-for-optional-arguments-with-conditional-types/64796265#64796265
): string {
  if (!params) return path;

  const replacer = (key: string) => params[key.slice(1) as keyof Params<T>];
  return path.replace(pattern, replacer);
}

/**
 *
 * @param template
 */
export function path<T extends string>(template: T) {
  return {
    path: template,
    // Some type cheating with casting for the greater good
    link: (params?: Params<T>) => link(template as any, params as any),
  } as PathLink<T>;
}
