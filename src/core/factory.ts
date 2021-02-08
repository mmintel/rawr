export interface Factory<Entity, Anemic> {
  create(...args: any[]): Entity;
  reconstitute(anemic: Anemic): Entity;
}
