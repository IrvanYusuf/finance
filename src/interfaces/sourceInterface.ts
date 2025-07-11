export interface Source {
  id: string;
  name: string;
  type: string;
  provider?: string;
  account_number?: string;
  account_holder?: string;
  balance: number;
  note?: string;
  user_id: string;
  color_card: string;
  created_at: string;
  updated_at: string;
}

export interface FormSourceErrors {
  name?: string;
  type?: string;
  balance?: string;
  account_number?: string;
  account_holder?: string;
  provider?: string;
  note?: string;
}
