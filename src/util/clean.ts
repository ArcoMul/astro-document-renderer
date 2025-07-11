export function clean(value: string) {
  return value.replace(/\s+data-[a-zA-Z-]+="[^"]*"/g, "").replace(/\n/g, "");
}
