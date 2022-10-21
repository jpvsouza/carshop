export default interface IService<T> {
  // Todas as classes que implementarem essa interface devem ter essas funções
  create(obj: T): Promise<T>;
  //   read(): Promise<T[]>;
  //   readOne(_id: string): Promise<T | null>;
  //   update(_id: string, obj: Partial<T>): Promise<T | null>;
  //   delete(_id: string): Promise<T | null>;
}
