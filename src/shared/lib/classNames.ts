/**
 * classNames
 *
 * Utility for conditionally joining CSS class names together.
 * Filters out falsy values (false, null, undefined) and joins the rest.
 *
 * @example
 * classNames("base", isActive && "active", className) // => "base active custom"
 */
export function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}