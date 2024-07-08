const menu = {
  id: "ID",
  name: "Nome",
  createdAt: "Criado em",
  authorized: "Autorizado",
} as const;

export type MenuKey = keyof typeof menu;

export function translate(key: MenuKey): string {
  return menu[key] ?? key;
}
