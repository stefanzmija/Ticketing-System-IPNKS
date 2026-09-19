import { Injectable, signal, computed } from '@angular/core';
import { Session} from '@supabase/supabase-js';
import { supabase } from './supabase.client';
import { Profile } from './models/profile.model';
import {form} from '@angular/forms/signals';

@Injectable({ providedIn: 'root'})

export class AuthService{

  session = signal<Session | null>(null);
  profile = signal<Profile | null>(null);

  isLoggedIn = computed(() => this.session() !== null);
  isStaff = computed(() => ['staff', 'admin'].includes(this.profile()?.role ?? ''));
  isAdmin = computed(() => this.profile()?.role === 'admin')

  constructor() {
    supabase.auth.getSession().then(({ data }) => this.setSession(data.session));

    supabase.auth.onAuthStateChange((_event, session) => this.setSession(session));
  }

  private async setSession(session: Session | null) {
    this.session.set(session);

    if (!session) {
      this.profile.set(null)
      return;
    }

    const {data} = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    this.profile.set(data as Profile)
  }

    async register(email: string, password: string, fullName: string, studentIndex: string) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, student_index: studentIndex } },
      });
      if (error) throw error;
    }

    async login(email: string, password: string) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    }

    async logout() {
      await supabase.auth.signOut();
    }
  }






