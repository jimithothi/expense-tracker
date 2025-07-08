export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Expense {
  id: number;
  user_id: number;
  category: number;
  amount: number;
  date: string; // ISO date string
  description: string;
} 