import type { SupabaseClient } from '@supabase/supabase-js';

import { callSafely, type Result } from '@lib/repositories/utils';
import type { Database } from '@/lib/supabase/types';

type Client = SupabaseClient<Database>;

type Row = Database['public']['Tables']['kb_chunk']['Row'];
type Insert = Database['public']['Tables']['kb_chunk']['Insert'];
type Update = Database['public']['Tables']['kb_chunk']['Update'];

export function createKbChunk(
  client: Client,
  values: Insert,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('kb_chunk')
        .insert(values)
        .select()
        .single(),
  );
}

export function getKbChunk(
  client: Client,
  id: Row['id'],
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('kb_chunk')
        .select()
        .eq('id', id)
        .single(),
  );
}

export function getKbChunksByEntity(
  client: Client,
  entityId: Row['entity_id'],
): Promise<Result<Row[]>> {
  return callSafely(
    () =>
      client
        .from('kb_chunk')
        .select()
        .eq('entity_id', entityId)
        .order('position'),
  );
}

export function getUnlockedKbChunks(
  client: Client,
  pageId: Row['unlock_page_id'],
): Promise<Result<Row[]>> {
  return callSafely(
    () =>
      client
        .from('kb_chunk')
        .select()
        .eq('unlock_page_id', pageId)
        .order('position'),
  );
}

export function updateKbChunk(
  client: Client,
  id: Row['id'],
  values: Update,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('kb_chunk')
        .update(values)
        .eq('id', id)
        .select()
        .single(),
  );
}

export function deleteKbChunk(
  client: Client,
  id: Row['id'],
): Promise<Result<null>> {
  return callSafely(async () => {
    const { error } = await client
      .from('kb_chunk')
      .delete()
      .eq('id', id);

    return { data: null, error };
  });
}
