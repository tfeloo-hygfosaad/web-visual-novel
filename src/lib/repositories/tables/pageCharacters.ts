import type { SupabaseClient } from '@supabase/supabase-js';

import { callSafely, type Result } from '@lib/repositories/utils';
import type { Database } from '@/lib/supabase/types';

type Client = SupabaseClient<Database>;

type Row = Database['public']['Tables']['page_character']['Row'];
type Insert = Database['public']['Tables']['page_character']['Insert'];
type Update = Database['public']['Tables']['page_character']['Update'];

export function createPageCharacter(
  client: Client,
  values: Insert,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('page_character')
        .insert(values)
        .select()
        .single(),
  );
}

export function getPageCharacter(
  client: Client,
  id: Row['id'],
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('page_character')
        .select()
        .eq('id', id)
        .single(),
  );
}

export function getPageCharactersByPage(
  client: Client,
  pageId: Row['page_id'],
): Promise<Result<Row[]>> {
  return callSafely(
    () =>
      client
        .from('page_character')
        .select()
        .eq('page_id', pageId)
        .order('z_index')
        .order('position_slot'),
  );
}

export function updatePageCharacter(
  client: Client,
  id: Row['id'],
  values: Update,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('page_character')
        .update(values)
        .eq('id', id)
        .select()
        .single(),
  );
}

export function deletePageCharacter(
  client: Client,
  id: Row['id'],
): Promise<Result<null>> {
  return callSafely(async () => {
    const { error } = await client
      .from('page_character')
      .delete()
      .eq('id', id);

    return { data: null, error };
  });
}
