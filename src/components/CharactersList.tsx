import { Character as CharacterType } from "rickmortyapi";
import { Component, createSignal, For } from "solid-js";
import { CharacterCard } from "./CharacterCard";
import { initDB, loadMoreData } from "../db";

const button =
  "inline-block px-12 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out";

const ITEMS_PER_PAGE = 20;

export const CharactersList: Component = () => {
  const [page, setPage] = createSignal<number>(1);
  const [characters, setCharacters] = createSignal<CharacterType[]>([]);

  const handleSetCharacters = (data: CharacterType[], page?: number) => {
    setCharacters([...characters(), ...data]);
    if (page) {
      setPage(page);
    } else {
      setPage(data.length ? Math.ceil(data.length / ITEMS_PER_PAGE) : 1);
    }
  };

  const loadMoreCharacters = () => {
    loadMoreData(page() + 1, handleSetCharacters);
  };

  initDB(handleSetCharacters);

  return (
    <div class="flex flex-col items-center gap-10">
      <ul class="flex gap-8 justify-center" style={{ "flex-flow": "row wrap" }}>
        <For each={characters()}>
          {(character) => <CharacterCard character={character} />}
        </For>
      </ul>
      <button
        type="button"
        class={button}
        onClick={loadMoreCharacters}
        disabled={page() >= 42}
      >
        Load more
      </button>
    </div>
  );
};
