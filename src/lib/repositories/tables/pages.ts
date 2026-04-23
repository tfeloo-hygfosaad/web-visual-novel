import type { SupabaseClient } from '@supabase/supabase-js';

import { callSafely, type Result } from '@lib/repositories/utils';
import type { Database } from '@/lib/supabase/types';

type Client = SupabaseClient<Database>;

type Row = Database['public']['Tables']['page']['Row'];
type Insert = Database['public']['Tables']['page']['Insert'];
type Update = Database['public']['Tables']['page']['Update'];

export function createPage(
  client: Client,
  values: Insert,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('page')
        .insert(values)
        .select()
        .single(),
  );
}

export function getPage(
  client: Client,
  id: Row['id'],
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('page')
        .select()
        .eq('id', id)
        .single(),
  );
}

export function getPagesByChapter(
  client: Client,
  chapterId: Row['chapter_id'],
): Promise<Result<Row[]>> {
  return callSafely(
    () =>
      client
        .from('page')
        .select()
        .eq('chapter_id', chapterId)
        .order('position'),
  );
}

export function updatePage(
  client: Client,
  id: Row['id'],
  values: Update,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('page')
        .update(values)
        .eq('id', id)
        .select()
        .single(),
  );
}

export function deletePage(
  client: Client,
  id: Row['id'],
): Promise<Result<null>> {
  return callSafely(async () => {
    const { error } = await client
      .from('page')
      .delete()
      .eq('id', id);

    return { data: null, error };
  });
}

export function publishPage(
  client: Client,
  id: Row['id'],
): Promise<Result<Row>> {
  return updatePage(client, id, {
    status: 'published',
  });
}
