import { Character as CharacterType, getCharacters } from "rickmortyapi";
import { Component, createEffect, createSignal, For } from "solid-js";
import { CharacterCard } from "./CharacterCard";

const button =
  "inline-block px-12 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out";

export const CharactersList: Component = () => {
  const [page, setPage] = createSignal<number>(1);
  const [characters, setCharacters] = createSignal<CharacterType[] | []>([]);

  const handleGetCharacter = async (page: number) => {
    const charactersData = await getCharacters({ page });
    if (charactersData.status === 200 && charactersData.data?.results) {
      setCharacters([...characters(), ...charactersData.data.results]);
    }
  };

  createEffect(() => {
    handleGetCharacter(page());
  });

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
        onClick={() => setPage((value) => ++value)}
        disabled={page() >= 42}
      >
        Load more
      </button>
    </div>
  );
};
