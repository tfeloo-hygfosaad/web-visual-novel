import type { SupabaseClient } from '@supabase/supabase-js';

import { create, deleteOne, readOne } from '@lib/repositories/crud';

import type { Result } from '@lib/repositories/types';
import type { Database } from '@lib/supabase/types';

type Tables = Database['public']['Tables'];
type PageInsert = Tables['page']['Insert'];
type PageRow = Tables['page']['Row'];

export function createPage(
  client: SupabaseClient<Database>,
  data: PageInsert,
): Promise<Result<PageRow>> {
  return create(client, 'page', data);
}

export function readPage(
  client: SupabaseClient<Database>,
  id: string,
): Promise<Result<PageRow>> {
  return readOne(client, 'page', id);
}

export function deletePage(
  client: SupabaseClient<Database>,
  id: string,
): Promise<Result<null>> {
  return deleteOne(client, 'page', id);
}
