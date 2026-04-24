import type { SupabaseClient } from '@supabase/supabase-js';

import { callSafely, type Result } from '@lib/repositories/utils';
import type { Database } from '@/lib/supabase/types';

type Client = SupabaseClient<Database>;

type Row = Database['public']['Tables']['chapter']['Row'];
type Insert = Database['public']['Tables']['chapter']['Insert'];
type Update = Database['public']['Tables']['chapter']['Update'];

export function createChapter(
  client: Client,
  values: Insert,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('chapter')
        .insert(values)
        .select()
        .single(),
  );
}

export function getChapter(
  client: Client,
  id: Row['id'],
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('chapter')
        .select()
        .eq('id', id)
        .single(),
  );
}

export function getChaptersByVolume(
  client: Client,
  volumeId: Row['volume_id'],
): Promise<Result<Row[]>> {
  return callSafely(
    () =>
      client
        .from('chapter')
        .select()
        .eq('volume_id', volumeId)
        .order('position'),
  );
}

export function updateChapter(
  client: Client,
  id: Row['id'],
  values: Update,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('chapter')
        .update(values)
        .eq('id', id)
        .select()
        .single(),
  );
}

export function deleteChapter(
  client: Client,
  id: Row['id'],
): Promise<Result<null>> {
  return callSafely(async () => {
    const { error } = await client
      .from('chapter')
      .delete()
      .eq('id', id);

    return { data: null, error };
  });
}
