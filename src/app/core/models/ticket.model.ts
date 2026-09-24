export type TicketStatus =
  | 'open'
  | 'in_progress'
  | 'waiting_student'
  | 'resolved'
  | 'closed'
  | 'rejected';

export type TicketPriority = 'low' | 'normal' | 'high';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  category_id: number;
  status: TicketStatus;
  priority: TicketPriority;
  created_by: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

/** Row as returned when we also select the joined category name. */
export interface TicketWithCategory extends Ticket {
  category: { name: string } | null;
}

export interface NewTicket {
  title: string;
  description: string;
  category_id: number;
  priority: TicketPriority;
}

export const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Отворен',
  in_progress: 'Во обработка',
  waiting_student: 'Чека студент',
  resolved: 'Решен',
  closed: 'Затворен',
  rejected: 'Одбиен',
};

export const STATUS_CLASSES: Record<TicketStatus, string> = {
  open: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  waiting_student: 'bg-purple-100 text-purple-700',
  resolved: 'bg-green-100 text-green-700',
  closed: 'bg-gray-200 text-gray-700',
  rejected: 'bg-red-100 text-red-700',
};

export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: 'Ниска',
  normal: 'Нормална',
  high: 'Висока',
};
