export interface Receipt {
  id: string;
  name: string;
  quantity: number;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  price: number;
  photo: unknown;
  createdAt: number;
  createdBy: string;
}
