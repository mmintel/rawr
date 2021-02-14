export interface Mapper<Domain, Anemic, Persistence = any> {
  toAnemic(domain: Domain): Anemic;
  toDomain(raw: any): Domain;
  toPersistence(domain: Domain): Persistence;
  fromPersistence(entity: Persistence): Domain;
}
