import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { MMKV } from 'react-native-mmkv';

export const storageQuery = new MMKV({
  id: 'postapp-query-storage',
});

const clientStorage = {
  setItem: (key: string, value: string) => {
    storageQuery.set(key, value);
  },
  getItem: (key: string) => {
    const value = storageQuery.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    storageQuery.delete(key);
  },
};

export const clientPersister = createSyncStoragePersister({
  storage: clientStorage,
});
