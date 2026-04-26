import type { SupabaseClient } from '@supabase/supabase-js';

import { callSafely, type Result } from '@lib/repositories/utils';
import type { Database } from '@/lib/supabase/types';

type Client = SupabaseClient<Database>;

type Row = Database['public']['Tables']['volume']['Row'];
type Insert = Database['public']['Tables']['volume']['Insert'];
type Update = Database['public']['Tables']['volume']['Update'];

export function createVolume(
  client: Client,
  values: Insert,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('volume')
        .insert(values)
        .select()
        .single(),
  );
}

export function getVolume(
  client: Client,
  id: Row['id'],
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('volume')
        .select()
        .eq('id', id)
        .single(),
  );
}

export function getVolumes(
  client: Client,
): Promise<Result<Row[]>> {
  return callSafely(
    () =>
      client
        .from('volume')
        .select()
        .order('position'),
  );
}

export function updateVolume(
  client: Client,
  id: Row['id'],
  values: Update,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('volume')
        .update(values)
        .eq('id', id)
        .select()
        .single(),
  );
}

export function deleteVolume(
  client: Client,
  id: Row['id'],
): Promise<Result<null>> {
  return callSafely(async () => {
    const { error } = await client
      .from('volume')
      .delete()
      .eq('id', id);

    return { data: null, error };
  });
}
