export function initIndexedDB(): void {
  let db: IDBDatabase | null = null;
  let objectStore = null;
  const DBOpenReq = indexedDB.open('nina-si', 1);

  DBOpenReq.addEventListener('error', (err) => {
    console.warn(err);
  });

  DBOpenReq.addEventListener('success', () => {
    db = DBOpenReq.result;
  });

  DBOpenReq.addEventListener('upgradeneeded', () => {
    db = DBOpenReq.result;
    if (!db?.objectStoreNames.contains('nina-si')) {
      objectStore = db?.createObjectStore('usersStore', {
        keyPath: 'email',
      });
    }
  });
}
