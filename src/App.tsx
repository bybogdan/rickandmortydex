import { Component } from "solid-js";
import { CharactersList } from "./components/CharactersList";

const App: Component = () => {
  return (
    <div class="p-6 flex flex-col gap-6 items-center">
      <h1 class="text-3xl font-bold underline text-center">
        Rick and Mory dex
      </h1>
      <CharactersList />
    </div>
  );
};

export default App;
