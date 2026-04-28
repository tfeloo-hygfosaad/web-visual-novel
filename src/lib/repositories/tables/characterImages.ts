import type { SupabaseClient } from '@supabase/supabase-js';

import { callSafely, type Result } from '@lib/repositories/utils';
import type { Database } from '@/lib/supabase/types';

type Client = SupabaseClient<Database>;

type Row = Database['public']['Tables']['character_image']['Row'];
type Insert = Database['public']['Tables']['character_image']['Insert'];
type Update = Database['public']['Tables']['character_image']['Update'];

export function createCharacterImage(
  client: Client,
  values: Insert,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('character_image')
        .insert(values)
        .select()
        .single(),
  );
}

export function getCharacterImage(
  client: Client,
  id: Row['id'],
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('character_image')
        .select()
        .eq('id', id)
        .single(),
  );
}

export function getCharacterImagesByEntity(
  client: Client,
  entityId: Row['entity_id'],
): Promise<Result<Row[]>> {
  return callSafely(
    () =>
      client
        .from('character_image')
        .select()
        .eq('entity_id', entityId)
        .order('label'),
  );
}

export function updateCharacterImage(
  client: Client,
  id: Row['id'],
  values: Update,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('character_image')
        .update(values)
        .eq('id', id)
        .select()
        .single(),
  );
}

export function deleteCharacterImage(
  client: Client,
  id: Row['id'],
): Promise<Result<null>> {
  return callSafely(async () => {
    const { error } = await client
      .from('character_image')
      .delete()
      .eq('id', id);

    return { data: null, error };
  });
}
