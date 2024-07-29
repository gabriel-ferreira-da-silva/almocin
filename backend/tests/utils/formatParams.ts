export default function formatParam(param: string) {
  return param.slice(1, -1);
}

export function formatNumberParam(param: string) {
  const number = Number(param.slice(1, -1));
  if (isNaN(number)) return null
  return number;
}

export function formatPrice(param: number) {
  return parseFloat(Number(param).toFixed(2))
}

export function formatRouteWithId(route: string, id: string) {
  return route.replace(':id', id.toString());
}

export function formatUrl(url: string, id?: string) {
  const newUrl = `/api/${formatParam(url)}`
  return id ? formatRouteWithId(newUrl, id) : newUrl;
}