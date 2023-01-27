import { Character, getCharacters } from "rickmortyapi";

const DB_NAME = "db";

let db;

const getDataFromApi = async (page: number = 1) => {
  const charactersData = await getCharacters({ page });
  return charactersData.status === 200 && charactersData.data?.results
    ? charactersData.data.results
    : [];
};

const setDataDB = async (db: any, characters: Character[]) => {
  let txCharacters = db.transaction(["characters"], "readwrite");
  let storeCharacters = txCharacters.objectStore("characters");
  characters.forEach((item) => storeCharacters.add(item));
};

export const loadMoreData = async (
  page: number,
  handleSetCharacters: (data: Character[], page?: number) => void
) => {
  const request = indexedDB.open(DB_NAME, 1);
  request.onerror = (event: any) => {
    console.error("error opening database: ", event.target?.errorCode);
  };

  request.onsuccess = async (event: any) => {
    db = event.target?.result;
    const data = await getDataFromApi(page);
    setDataDB(db, data);
    handleSetCharacters(data, page);
  };
};

const getDataDB = async (
  db: any,
  handleSetCharacters: (data: Character[], page?: number) => void
) => {
  let tx = db.transaction(["characters"], "readonly");
  let store = tx.objectStore("characters");
  let req = store.openCursor();
  let allCharacters: any = [];

  req.onsuccess = async function (event: any) {
    let cursor = event.target.result;
    if (cursor != null) {
      allCharacters.push(cursor.value);
      cursor.continue();
    } else {
      if (!allCharacters.length) {
        const data = await getDataFromApi();
        setDataDB(db, data);
        handleSetCharacters(data);
        return;
      }
      handleSetCharacters(allCharacters);
    }
  };
};

export const initDB = (
  handleSetCharacters: (data: Character[], page?: number) => void
) => {
  const request = indexedDB.open(DB_NAME, 1);

  request.onerror = (event: any) => {
    console.error("error opening database: ", event.target?.errorCode);
  };

  request.onsuccess = (event: any) => {
    db = event?.target.result;
    getDataDB(db, handleSetCharacters);
  };

  request.onupgradeneeded = (event: any) => {
    db = event.target?.result;
    db.createObjectStore("characters", {
      autoIncrement: true,
    });
  };
};
