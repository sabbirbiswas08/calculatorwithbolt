import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rebemzjhmzmlkvlgdjgs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlYmVtempobXptbGt2bGdkamdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3ODU3ODAsImV4cCI6MjA4NjM2MTc4MH0.QJOE-fScnCy3Tkfp4ZXV6cA2BDiNAEQLDZnrBAeYEPs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CalculationHistory {
  id: number;
  expression: string;
  result: string;
  created_at: string;
}
