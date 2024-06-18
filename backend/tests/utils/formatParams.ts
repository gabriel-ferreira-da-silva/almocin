export default function formatParam(param: string) {
  return param.slice(1, -1);
}

export function formatNumberParam(param: string) {
  const number = Number(param.slice(1, -1));
  if (isNaN(number)) return null
  return number;
}