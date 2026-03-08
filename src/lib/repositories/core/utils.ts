import { Result } from '@/lib/repositories/core/types';

export async function callSafely<T>(fn: () => PromiseLike<{ data: T | null, error: Error | null }>): Promise<Result<T>> {
  try {
    const { data, error } = await fn();

    if (error) return { success: false, error: error.message };
    if (!data) return { success: false, error: 'No data returned' };

    return { success: true, data };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
};
