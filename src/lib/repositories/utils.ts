import type { PostgrestError } from '@supabase/supabase-js';

export type Result<T> = { success: true, data: T } | { success: false, error: string };

interface SupabaseResponse<T> {
  data: T | null,
  error: PostgrestError | null,
};

export async function callSafely<T>(
  fn: () => PromiseLike<SupabaseResponse<T>>,
): Promise<Result<T>> {
  try {
    const { data, error } = await fn();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // NOTE: Supabase may legitimately return null data in some cases
    // so we only treat it as error if YOUR domain requires it.
    if (data === null || data === undefined) {
      return {
        success: false,
        error: 'No data returned',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';

    return {
      success: false,
      error: message,
    };
  }
}
