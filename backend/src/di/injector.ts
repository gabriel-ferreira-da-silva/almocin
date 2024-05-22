export default class Injector<T> {
  private services: Map<new () => T, any> = new Map();
  private repositories: Map<new () => T, any> = new Map();

  public registerService(
    serviceType: new (...args: any[]) => T,
    service: T
  ): void {
    this.services.set(serviceType, service);
  }

  public getService(serviceType: new (...args: any[]) => T): T {
    return this.services.get(serviceType) as T;
  }

  public registerRepository(
    repositoryType: new (...args: any[]) => T,
    repository: T
  ): void {
    this.repositories.set(repositoryType, repository);
  }

  public getRepository(repositoryType: new (...args: any[]) => T): T {
    return this.repositories.get(repositoryType) as T;
  }
}
