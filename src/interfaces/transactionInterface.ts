import { Category } from './categoryInterface';
import { Source } from './sourceInterface';

export interface TransactionInterface {
  id: string;
  name: string;
  user_id: string;
  attachment: string;
  category_id: string;
  source_id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  created_at: string;
  updated_at: string;
  category: Category;
  source: Source;
}

export interface FormTransactionErrors {
  name?: string;
  type?: string;
  amount?: string;
  attachment?: string;
  category_id?: string;
  source_id?: string;
  description?: string;
  date?: string;
}
