export interface TicketComment {
  id: number;
  ticket_id: number;
  author_id: string;
  body: string;
  created_at: string;
}

export interface CommentWithAuthor extends TicketComment {
  author: { full_name: string; role: string } | null;
}
