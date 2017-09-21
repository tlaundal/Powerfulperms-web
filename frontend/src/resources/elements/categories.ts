interface Category {
  id: number;
  name: string;
  route: string;
}

export class Categories {

  categories: Array<Category> = [
    {id: 0, name: "Groups", route: "groups"},
    {id: 1, name: "Players", route: "players"}
  ]

  selected: number = -1;

  select(category: Category): boolean {
    this.selected = category.id;
    return true;
  }

}
