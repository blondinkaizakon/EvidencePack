export enum CaseStatus {
  ACTIVE = 'В производстве',
  ARCHIVED = 'Архив',
  RISK = 'Риск оставления без движения',
}

export enum DocumentType {
  POA = 'Доверенность',
  NOTIFICATION = 'Уведомление о вручении',
  PAYMENT = 'Госпошлина',
  CONTRACT = 'Договор',
  OTHER = 'Иное',
}

export interface CaseDocument {
  id: string;
  name: string;
  type: DocumentType;
  uploadedAt: string;
  isValidated: boolean;
  contentSnippet?: string; // Simulated extracted text
  hasCriticalError?: boolean;
}

export interface Case {
  id: string;
  caseNumber: string; // Номер дела
  courtName: string;
  plaintiff: string; // Истец
  defendant: string; // Ответчик
  baseDate: string; // Базовая дата (Дата решения или подачи)
  claimAmount: number;
  status: CaseStatus;
  documents: CaseDocument[];
  deadlines: Deadline[];
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  description: string;
  isMet: boolean;
  daysRemaining: number;
}

export interface KPIMetric {
  label: string;
  value: number;
  change?: number; // percentage
  unit: string;
}

export interface AnalysisResult {
  foundPattern: boolean;
  patternName: string;
  snippet: string;
  confidence: string;
}