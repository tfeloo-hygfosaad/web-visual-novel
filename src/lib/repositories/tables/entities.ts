import type { SupabaseClient } from '@supabase/supabase-js';

import { callSafely, type Result } from '@lib/repositories/utils';
import type { Database } from '@/lib/supabase/types';

type Client = SupabaseClient<Database>;

type Row = Database['public']['Tables']['entity']['Row'];
type Insert = Database['public']['Tables']['entity']['Insert'];
type Update = Database['public']['Tables']['entity']['Update'];

export function createEntity(
  client: Client,
  values: Insert,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('entity')
        .insert(values)
        .select()
        .single(),
  );
}

export function getEntity(
  client: Client,
  id: Row['id'],
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('entity')
        .select()
        .eq('id', id)
        .single(),
  );
}

export function getEntityBySlug(
  client: Client,
  slug: Row['slug'],
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('entity')
        .select()
        .eq('slug', slug)
        .single(),
  );
}

export function getEntities(
  client: Client,
): Promise<Result<Row[]>> {
  return callSafely(
    () =>
      client
        .from('entity')
        .select()
        .order('created_at', { ascending: false }),
  );
}

export function getEntitiesByType(
  client: Client,
  type: Row['type'],
): Promise<Result<Row[]>> {
  return callSafely(
    () =>
      client
        .from('entity')
        .select()
        .eq('type', type)
        .order('title'),
  );
}

export function updateEntity(
  client: Client,
  id: Row['id'],
  values: Update,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('entity')
        .update(values)
        .eq('id', id)
        .select()
        .single(),
  );
}

export function deleteEntity(
  client: Client,
  id: Row['id'],
): Promise<Result<null>> {
  return callSafely(async () => {
    const { error } = await client
      .from('entity')
      .delete()
      .eq('id', id);

    return { data: null, error };
  });
}
