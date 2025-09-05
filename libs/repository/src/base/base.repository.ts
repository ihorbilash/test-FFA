interface ICurrentOrmModel {
  findMany: (...args: any[]) => any;
  create: (...args: any[]) => any;
  update: (...args: any[]) => any;
}

/** Base repository with common methods for ORM models */
export class BaseRepository<M extends ICurrentOrmModel> {
  constructor(readonly model: M) {}

  find(...args: Parameters<M['findMany']>): Promise<ReturnType<M['findMany']>> {
    return this.model.findMany(...args);
  }

  create(...args: Parameters<M['create']>): Promise<ReturnType<M['create']>> {
    return this.model.create(...args);
  }

  update(...args: Parameters<M['update']>): Promise<ReturnType<M['update']>> {
    return this.model.update(...args);
  }
}
