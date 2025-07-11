import { Source } from './sourceInterface';

export interface InvestmentInterface {
  id: string;
  user_id: string;
  name: string;
  type: 'goal' | 'stock';
  target_amount?: number;
  due_date?: string;
  purchase_amount?: number;
  current_value?: number;
  expected_return?: number;
  saved_amount?: number;
  notes?: string;
}
export interface InvestmentTransactionInterface {
  id: string;
  user_id: string;
  source_id: string;
  investment_id: string;
  amount: number;
  transaction_date?: string;
  notes?: string;
  source: Source;
  investment: InvestmentInterface;
}

export interface FormInvestmentErrors {
  name?: string;
  type?: string;
  target_amount?: string;
  notes?: string;
}
export interface FormInvestmentTransactionErrors {
  source_id?: string;
  investment_id?: string;
  amount?: string;
  notes?: string;
  transaction_date?: string;
}
