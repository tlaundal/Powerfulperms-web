declare class Fuse<T> {
  constructor(data: Array<T>, config: Object);

  search(query: string): Array<T>;

  setCollection(collection: Array<T>);
}

export class Fused<T> {
  public view: Array<T>;

  data: Array<T>;
  fuse: Fuse<T>;
  limit: number;

  constructor(options: object, limit: number = 100) {
    this.fuse = new Fuse([], options);
    this.limit = limit;
  }

  setData(data: Array<T>) {
    this.data = data;
    this.fuse.setCollection(data);

    this.search("");
  }

  search(query: string) {
    let view;
    if (query.length === 0) {
      view = this.data;
    } else {
      view = this.fuse.search(query);
    }

    view = view.slice(0, this.limit);
    this.view = view;
  }

}
