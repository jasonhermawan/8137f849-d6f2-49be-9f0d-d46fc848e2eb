export interface IGetEmployeesQuery {
  page?: string;
  sortBy?: string;
  sortOrder?: string;
  ITEM_PER_PAGE?: string;
}

export interface IEmployee {
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
}

export interface ICreateEmployee {
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
}

export interface IUpdateEmployee {
  firstName?: string;
  lastName?: string;
  position?: string;
  phone?: string;
  email?: string;
}