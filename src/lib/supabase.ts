import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cnfehcheloaafqlixwrr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZmVoY2hlbG9hYWZxbGl4d3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2ODczNTYsImV4cCI6MjA4ODI2MzM1Nn0.shyfwxpqAXSg4_QTreFn1Nz8xx7Ysrj5ZrgJ6Rx7Xb4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CalculationHistory {
  id: number;
  expression: string;
  result: string;
  created_at: string;
}
