export default class Injector {
  private services: Map<new () => unknown, unknown> = new Map<never, never>();
  private repositories: Map<new () => unknown, unknown> = new Map<never, never>();

  public registerService<S>(
    serviceType: new (...args: never[]) => S,
    service: S
  ): void {
    this.services.set(serviceType, service);
  }

  public getService<S>(serviceType: new (...args: never[]) => S): S {
    return this.services.get(serviceType) as S;
  }

  public registerRepository<R>(
    repositoryType: new (...args: never[]) => R,
    repository: R
  ): void {
    this.repositories.set(repositoryType, repository);
  }

  public getRepository<R>(repositoryType: new (...args: never[]) => R): R {
    return this.repositories.get(repositoryType) as R;
  }
}
