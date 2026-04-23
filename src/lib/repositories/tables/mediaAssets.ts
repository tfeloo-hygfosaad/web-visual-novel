import type { SupabaseClient } from '@supabase/supabase-js';

import { callSafely, type Result } from '@lib/repositories/utils';
import type { Database } from '@lib/supabase/types';

type Client = SupabaseClient<Database>;

type Row = Database['public']['Tables']['media_asset']['Row'];
type Insert = Database['public']['Tables']['media_asset']['Insert'];
type Update = Database['public']['Tables']['media_asset']['Update'];

export function createMediaAsset(
  client: Client,
  values: Insert,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('media_asset')
        .insert(values)
        .select()
        .single(),
  );
}

export function getMediaAsset(
  client: Client,
  id: Row['id'],
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('media_asset')
        .select()
        .eq('id', id)
        .single(),
  );
}

export function getMediaAssets(
  client: Client,
): Promise<Result<Row[]>> {
  return callSafely(
    () =>
      client
        .from('media_asset')
        .select()
        .order('created_at', { ascending: false }),
  );
}

export function updateMediaAsset(
  client: Client,
  id: Row['id'],
  values: Update,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('media_asset')
        .update(values)
        .eq('id', id)
        .select()
        .single(),
  );
}

export function deleteMediaAsset(
  client: Client,
  id: Row['id'],
): Promise<Result<null>> {
  return callSafely(async () => {
    const { error } = await client
      .from('media_asset')
      .delete()
      .eq('id', id);

    return { data: null, error };
  });
}
