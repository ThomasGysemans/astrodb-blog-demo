import type { StorageError } from '@supabase/storage-js'
import { createClient } from '@supabase/supabase-js'

function getClient() {
    return createClient(import.meta.env.SUPABASE_STORAGE_URL, import.meta.env.SUPABASE_KEY);
}

export async function storeImage(file: File): Promise<string | StorageError> {
    const supabase = getClient();
    const { data, error } = await supabase
        .storage
        .from(import.meta.env.SUPABASE_STORAGE_BUCKET)
        .upload(`hello/${file.name}`, file, {
            upsert: true,
        })
    if (error) {
        return error;
    }
    return data.path;
}

export function loadImage(path: string): string {
    const supabase = getClient();
    return supabase
        .storage
        .from(import.meta.env.SUPABASE_STORAGE_BUCKET)
        .getPublicUrl(path)
        .data.publicUrl;
}