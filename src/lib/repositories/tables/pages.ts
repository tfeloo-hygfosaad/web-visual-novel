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

export async function getPageByGlobalNumber(
  client: Client,
  offset: number,
): Promise<Result<Row>> {
  return callSafely(
    () =>
      client
        .from('page')
        .select(`
          *,
          chapter!inner (
            position,
            volume!inner (position)
          )
        `)
        // Sort by Volume, then Chapter, then Page position
        .order('position', { referencedTable: 'chapter.volume', ascending: true })
        .order('position', { referencedTable: 'chapter', ascending: true })
        .order('position', { ascending: true })
        .range(offset, offset)
        .single(),
  );
}

export async function getTotalPageCount(
  client: Client,
  onlyPublished = true,
): Promise<Result<number>> {
  return callSafely(async () => {
    let query = client.from('page').select('*', { count: 'exact', head: true });

    if (onlyPublished) {
      query = query.eq('status', 'published');
    }

    const { count, error } = await query;

    return { data: count ?? 0, error };
  });
}
