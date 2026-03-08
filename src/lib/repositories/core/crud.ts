import { callSafely } from '@/lib/repositories/core/utils';

import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@lib/supabase/types';
import type { Result } from '@/lib/repositories/core/types';

type Tables = Database['public']['Tables'];

// Create
export async function create<TableKey extends keyof Tables>(
  client: SupabaseClient<Database>,
  table: TableKey,
  data: Tables[TableKey]['Insert'],
): Promise<Result<Tables[TableKey]['Row']>> {
  return callSafely(
    () =>
      client
        .from(table)
        .insert(data as any) // eslint-disable-line @typescript-eslint/no-explicit-any
        .select()
        .single(),
  );
}

// Read
export async function readOne<TableKey extends keyof Tables>(
  client: SupabaseClient<Database>,
  table: TableKey,
  id: Tables[TableKey]['Row']['id'],
): Promise<Result<Tables[TableKey]['Row']>> {
  return callSafely(
    () =>
      client
        .from(table)
        .select()
        .eq('id', id as any) // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        .single(),
  );
}

export async function readMany<TableKey extends keyof Tables>(
  client: SupabaseClient<Database>,
  table: TableKey,
): Promise<Result<Tables[TableKey]['Row'][]>> {
  return callSafely(
    () =>
      client
        .from(table)
        .select(),
  );
}

// Update
export async function update<TableKey extends keyof Tables>(
  client: SupabaseClient<Database>,
  table: TableKey,
  id: Tables[TableKey]['Row']['id'],
  data: Tables[TableKey]['Update'],
): Promise<Result<Tables[TableKey]['Row']>> {
  return callSafely(
    () =>
      client
        .from(table)
        .update(data as any) // eslint-disable-line @typescript-eslint/no-explicit-any
        .eq('id', id as any) // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        .select()
        .single(),
  );
}

// Delete
export async function deleteOne<TableKey extends keyof Tables>(
  client: SupabaseClient<Database>,
  table: TableKey,
  id: Tables[TableKey]['Row']['id'],
): Promise<Result<null>> {
  return callSafely(
    () =>
      client
        .from(table)
        .delete()
        .eq('id', id as any), // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
  );
}
