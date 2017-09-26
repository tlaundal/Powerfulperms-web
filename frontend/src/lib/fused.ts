declare class Fuse<T> {
  constructor(data: Array<T>, config: Object);

  search(query: string): Array<T>;

  setCollection(collection: Array<T>);
}

export class Fused<T> {
  public view: Array<T>;

  data: Array<T>;
  fuse: Fuse<T>;

  constructor(options: object) {
    this.fuse = new Fuse([], options);
  }

  setData(data: Array<T>) {
    this.data = data;
    this.fuse.setCollection(data);

    this.search("");
  }

  search(query: string) {
    if (query.length === 0) {
      this.view = this.data;
    } else {
      this.view = this.fuse.search(query);
    }
  }

}
