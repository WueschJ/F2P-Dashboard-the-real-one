
import { Favor } from './favor';

export interface HistoryItem {
  id: string;
  mode: string;
  asker: string;
  secondPerson?: string;
  timestamp: string;
  results: Favor[];
}
