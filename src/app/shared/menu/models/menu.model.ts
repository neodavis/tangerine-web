import { Receipt } from '../../receipt/models';

export interface Menu {
  id: string;
  name: string;
  receipts: Receipt[]
  createdAt: number;
  createdBy: string;
}
