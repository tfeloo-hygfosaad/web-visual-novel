import { createClient } from '@supabase/supabase-js';
import type { Database } from '@lib/supabase/types';

let editor: ReturnType<typeof createClient<Database>> | null = null;
let reader: ReturnType<typeof createClient<Database>> | null = null;

export function getEditor() {
  if (!editor) {
    editor = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!,
    );
  }

  return editor;
}

export function getReader() {
  if (!reader) {
    reader = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }

  return reader;
}

