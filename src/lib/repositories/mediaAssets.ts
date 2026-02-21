import type { SupabaseClient } from '@supabase/supabase-js';

import { create, readOne, deleteOne } from '@lib/repositories/crud';

import type { Result } from '@lib/repositories/types';
import type { Database } from '@lib/supabase/types';

type Tables = Database['public']['Tables'];
type MediaAssetInsert = Tables['media_asset']['Insert'];
type MediaAssetRow = Tables['media_asset']['Row'];

export function createMediaAsset(
  client: SupabaseClient<Database>,
  data: MediaAssetInsert,
): Promise<Result<MediaAssetRow>> {
  return create(client, 'media_asset', data);
}

export function getMediaAsset(
  client: SupabaseClient<Database>,
  id: string,
): Promise<Result<MediaAssetRow>> {
  return readOne(client, 'media_asset', id);
}

export function deleteMediaAsset(
  client: SupabaseClient<Database>,
  id: string,
): Promise<Result<null>> {
  return deleteOne(client, 'media_asset', id);
}
