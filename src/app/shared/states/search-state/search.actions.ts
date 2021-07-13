export class FilterUsersAction {
  static readonly desc = 'Filter users';
  static readonly type = '[Search] Filter users';
  constructor(public payload: any) {}
}

export class ChangePageSizeAction {
  static readonly desc = 'Change visible users count';
  static readonly type = '[Search] Page Size';
  constructor(public size: number) {}
}

export class ChangePageAction {
  static readonly desc = 'Change page';
  static readonly type = '[Search] Change page';
  constructor(public pageNumber: number) {}
}

export class TotalUsersCountAction {
  static readonly desc = 'Get Total users count';
  static readonly type = '[Search] Total count';
}
