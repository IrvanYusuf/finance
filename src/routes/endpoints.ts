const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  sources: {
    root: `${baseUrl}/sources`,
    bank: `${baseUrl}/sources/bank`,
    all: `${baseUrl}/sources/all`,
    topUp: (id: string) => `${baseUrl}/sources/top-up/${id}`,
  },
  transactions: {
    root: `${baseUrl}/transactions`,
    detail: (id: string) => `${baseUrl}/transactions/${id}/detail`,
    expenseStatictic: `${baseUrl}/transactions/expense-statistic`,
    weeklyActivity: `${baseUrl}/transactions/weekly-activity`,
  },
  categories: {
    root: `${baseUrl}/categories`,
  },
  auth: {
    login: `${baseUrl}/login`,
    register: `${baseUrl}/register`,
    logout: `${baseUrl}/logout`,
    me: `${baseUrl}/me`,
  },
  investments: {
    root: `${baseUrl}/investments`,
    detail: (id: string) => `${baseUrl}/investments/${id}/detail`,
  },
  investmentTransaction: {
    root: `${baseUrl}/investment-transactions`,
    detail: (id: string) => `${baseUrl}/investment-transactions/${id}/detail`,
  },
};
