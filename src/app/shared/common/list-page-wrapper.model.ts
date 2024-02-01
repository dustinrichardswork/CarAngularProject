export class ListPageWrapper<T> {
  public totalCount = 0;
  public currentPage = 0;
  public pageSize = 0;
  public items?: T[];
  constructor(totalCount: number, currentPage: number, pageSize: number, items?: T[]) {
    this.totalCount = totalCount;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.items = items;
  }
  // public page = new pageInfo();
  // public data?: T[];
}

// export class pageInfo {
//   index: 0;
//   size: 0;
// }