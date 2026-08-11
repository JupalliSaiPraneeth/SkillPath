import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://difjsuzcdhrwkxioovlf.supabase.co';
const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 'sb_publishable_ZkRlLdVauWEGaawjjWc42g_O9Gzpahx';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

/**
 * Health check & connectivity diagnostic for Supabase
 */
export const checkSupabaseConnection = async () => {
  try {
    const startTime = performance.now();
    const { data, error } = await supabase.from('skills').select('id').limit(1);
    const latency = Math.round(performance.now() - startTime);

    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist yet, connection to Supabase REST is still valid
      if (error.message?.includes('relation') || error.code === '42P01') {
        return {
          connected: true,
          tableReady: false,
          url: SUPABASE_URL,
          latency: `${latency}ms`,
          message: 'Connected to Supabase endpoint (Tables ready for migration)'
        };
      }
      return {
        connected: false,
        tableReady: false,
        url: SUPABASE_URL,
        error: error.message || 'Connection error',
        latency: `${latency}ms`
      };
    }

    return {
      connected: true,
      tableReady: true,
      url: SUPABASE_URL,
      latency: `${latency}ms`,
      message: 'Supabase Cloud Database connected & operational'
    };
  } catch (err) {
    return {
      connected: false,
      tableReady: false,
      url: SUPABASE_URL,
      error: err.message || 'Network unreachable'
    };
  }
};

export default supabase;
