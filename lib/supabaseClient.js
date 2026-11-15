// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// 👇 REEMPLAZÁ estos dos valores con los tuyos (los que copiaste en la Parte A)
const supabaseUrl = 'https://kglgnogmbedvkoyrvmvk.supabase.co';
const supabaseAnonKey = 'sb_publishable_JJhcTSJpTWSodyqVQXrwuA_jtf_0EmK...';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);