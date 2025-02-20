export type IExpense = {
  _id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
};

export enum ExpenseCategory {
  OFFICE = "OFFICE",
  TRAVEL = "TRAVEL",
  MEALS = "MEALS",
}

export enum ToastType {
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export type Toast = {
  message: string;
  type: ToastType;
  show: boolean;
};
