export default class Injector<S, R> {
  private services: Map<new () => S, S> = new Map();
  private repositories: Map<new () => R, R> = new Map();

  public registerService(
    serviceType: new (...args: R[]) => S,
    service: S
  ): void {
    this.services.set(serviceType, service);
  }

  public getService(serviceType: new (...args: R[]) => S): S {
    return this.services.get(serviceType) as S;
  }

  public registerRepository(
    repositoryType: new (...args: R[]) => R,
    repository: R
  ): void {
    this.repositories.set(repositoryType, repository);
  }

  public getRepository(repositoryType: new (...args: never[]) => R): R {
    return this.repositories.get(repositoryType) as R;
  }
}
