export type ParamValue = string | null | undefined;

// Build a new URLSearchParams from the current searchParams and a set of updates.
// - If a value is `null` or an empty string, the key is removed.
// - Optionally resets `page` to '1' when `resetPage` is true (default).
export function buildParams(
  current: URLSearchParams,
  updates: Record<string, ParamValue>,
  options: { resetPage?: boolean } = { resetPage: true }
) {
  const params = new URLSearchParams(current.toString());
  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === undefined || value === '') {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  }
  if (options.resetPage !== false) {
    params.set('page', '1');
  }
  return params;
}

// Compose a URL string from pathname and params
export function toUrl(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
