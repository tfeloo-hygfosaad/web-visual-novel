import type { SupabaseClient } from '@supabase/supabase-js';

import { create, readOne, readMany, update, deleteOne } from './crud';

import type { Database } from '@lib/supabase/types';
import type { Result } from './types';

type Tables = Database['public']['Tables'];

export function createRepository<TableKey extends keyof Tables>(table: TableKey) {
  type Row = Tables[TableKey]['Row'];
  type Insert = Tables[TableKey]['Insert'];
  type Update = Tables[TableKey]['Update'];

  return {
    create(client: SupabaseClient<Database>, data: Insert): Promise<Result<Row>> {
      return create(client, table, data);
    },

    read(client: SupabaseClient<Database>, id: string): Promise<Result<Row>> {
      return readOne(client, table, id);
    },

    readMany(client: SupabaseClient<Database>): Promise<Result<Row[]>> {
      return readMany(client, table);
    },

    update(client: SupabaseClient<Database>, id: string, data: Update): Promise<Result<Row>> {
      return update(client, table, id, data);
    },

    delete(client: SupabaseClient<Database>, id: string): Promise<Result<null>> {
      return deleteOne(client, table, id);
    },
  };
}
