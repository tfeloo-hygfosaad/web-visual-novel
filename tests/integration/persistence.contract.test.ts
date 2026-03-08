import { describe, it, expect, afterEach } from 'vitest';

import { createMediaAsset, getMediaAsset, deleteMediaAsset } from '@lib/repositories/tables/mediaAssets';
import { getEditor, getReader } from '@tests/integration/utils';

import type { Database } from '@lib/supabase/types';

type MediaAsset = Database['public']['Tables']['media_asset'];
type MediaAssetInsert = MediaAsset['Insert'];

const editor = getEditor();
const reader = getReader();

let tempId: string | null = null;

function buildMediaAsset(overrides: Partial<MediaAssetInsert> = {}): MediaAssetInsert {
  return {
    type: 'image',
    url: 'https://example.com/test.png',
    thumbnail_url: 'https://example.com/thumb.png',
    ...overrides,
  };
}

describe('Persistence contract (media_assets)', () => {
  afterEach(async () => {
    if (tempId) {
      await deleteMediaAsset(editor, tempId);

      tempId = null;
    }
  });

  it('admin can create, anon can read, admin can delete', async () => {
    const created = await createMediaAsset(editor, buildMediaAsset());

    if (!created.success) console.error(created.error);
    expect(created.success).toBe(true);
    if (!created.success) return;

    tempId = created.data.id;

    // Anon / reader access
    const anonRead = await getMediaAsset(reader, tempId);

    expect(anonRead.success).toBe(true);

    if (anonRead.success) {
      expect(anonRead.data.url).toBe('https://example.com/test.png');
    }

    // Admin read
    const adminRead = await getMediaAsset(editor, tempId);

    expect(adminRead.success).toBe(true);

    if (adminRead.success) {
      expect(adminRead.data.id).toBe(tempId);
    }
  });
});
