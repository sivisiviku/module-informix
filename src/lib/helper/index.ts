export * from "./helper";
export function apiLogNormal(...args: [any?, ...any[]]): void {
    // TODO use winston or debug
    // eslint-disable-next-line no-console
    console.log.apply(null, args);
}
