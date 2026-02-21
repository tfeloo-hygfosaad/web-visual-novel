import { createClient } from '@supabase/supabase-js';
import type { Database } from '@lib/supabase/types';

let editor: ReturnType<typeof createClient<Database>> | null = null;
let reader: ReturnType<typeof createClient<Database>> | null = null;

function getEnv() {
  const {
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SECRET_KEY,
  } = process.env;

  if (!NEXT_PUBLIC_SUPABASE_URL)
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');

  if (!NEXT_PUBLIC_SUPABASE_ANON_KEY)
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');

  if (!SUPABASE_SECRET_KEY)
    throw new Error('Missing SUPABASE_SECRET_KEY');

  return {
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SECRET_KEY,
  };
}

const env = getEnv();

export function getEditor() {
  editor ??= createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
  );

  return editor;
}

export function getReader() {
  reader ??= createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return reader;
}
