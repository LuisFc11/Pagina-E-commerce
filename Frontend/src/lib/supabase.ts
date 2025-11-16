import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// frontend/src/lib/types.ts (renombra supabase.ts a types.ts y elimina el cliente de Supabase, ya que ahora usamos backend MongoDB)

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imagen: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: string;
  total_amount: number;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  is_bot: boolean;
  created_at: string;
}
