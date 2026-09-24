import { Injectable } from '@angular/core';
import { supabase } from '../../core/supabase.client';
import { Category } from '../../core/models/category.model';
import { NewTicket, Ticket, TicketStatus, TicketWithCategory } from '../../core/models/ticket.model';
import { CommentWithAuthor } from '../../core/models/comment.model';

@Injectable({ providedIn: 'root' })
export class TicketsService {

  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id');

    if (error) throw error;
    return data as Category[];
  }

  /** RLS decides the scope: a student gets their own, staff gets all. */
  async getTickets(): Promise<TicketWithCategory[]> {
    const { data, error } = await supabase
      .from('tickets')
      .select('*, category:categories(name)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as TicketWithCategory[];
  }

  async getById(id: number): Promise<TicketWithCategory> {
    const { data, error } = await supabase
      .from('tickets')
      .select('*, category:categories(name)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as TicketWithCategory;
  }

  async create(input: NewTicket): Promise<Ticket> {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) throw new Error('Не сте најавени.');

    const { data, error } = await supabase
      .from('tickets')
      .insert({ ...input, created_by: userId })
      .select()
      .single();

    if (error) throw error;
    return data as Ticket;
  }

  async updateStatus(id: number, status: TicketStatus): Promise<void> {
    const { error } = await supabase
      .from('tickets')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  }

  async assignToMe(id: number): Promise<void> {
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('tickets')
      .update({ assigned_to: userData.user?.id, status: 'in_progress' })
      .eq('id', id);

    if (error) throw error;
  }

  async getComments(ticketId: number): Promise<CommentWithAuthor[]> {
    const { data, error } = await supabase
      .from('ticket_comments')
      .select('*, author:profiles(full_name, role)')
      .eq('ticket_id', ticketId)
      .order('created_at');

    if (error) throw error;
    return data as CommentWithAuthor[];
  }

  async addComment(ticketId: number, body: string): Promise<void> {
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('ticket_comments')
      .insert({ ticket_id: ticketId, body, author_id: userData.user?.id });

    if (error) throw error;
  }
}
