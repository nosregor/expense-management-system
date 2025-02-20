import { Document, model, Schema } from 'mongoose'

export enum ExpenseCategory {
  OFFICE = 'OFFICE',
  TRAVEL = 'TRAVEL',
  MEALS = 'MEALS',
}

/**
 * @export
 * @interface IExpense
 * @extends { Document }
 */
export interface IExpense extends Document {
  description: String
  amount: number
  category: ExpenseCategory
}

const expenseSchema = new Schema(
  {
    description: { type: String, required: [true, 'An expense must have a desription'] },
    amount: { type: Number, default: 0, min: 0 },
    category: {
      type: String,
      enum: Object.values(ExpenseCategory),
      required: true,
    },
  },
  { timestamps: true },
)

const Expense = model<IExpense>('Expense', expenseSchema)

export { Expense }
