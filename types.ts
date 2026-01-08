
export interface StatusUpdate {
  id: number;
  message: string;
  subMessage: string;
  type: 'success' | 'info';
  icon?: string;
}

export interface ExchangeRate {
  currency: string;
  rate: number;
  trend: 'up' | 'down' | 'stable';
}

export enum AppView {
  DASHBOARD = 'dashboard',
  STATUS_TRACKER = 'status_tracker',
  CONVERTER = 'converter',
  AI_ASSISTANT = 'ai_assistant'
}
