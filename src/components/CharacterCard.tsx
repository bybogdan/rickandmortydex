import { Character as CharacterType } from "rickmortyapi";
import { Component } from "solid-js";

interface IComp {
  character: CharacterType;
}

export const CharacterCard: Component<IComp> = (props) => {
  const { character } = props;

  return (
    <li class="flex justify-center w-[330px] overflow-hidden">
      <div class="w-full flex flex-col md:flex-row md:max-w-xl rounded-lg bg-slate-200 shadow-lg">
        <img
          class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={character.image}
          alt={`${character.name} image`}
        />

        <div class="p-6 flex flex-col justify-start">
          <h5 class="text-gray-900 text-xl font-medium mb-2">
            {character.name}
          </h5>
          <p class="text-gray-700 text-base mb-4">{character.species}</p>
          <div class="flex gap-1 items-center">
            {character.status === "Alive" ? (
              <div class="bg-green-400 rounded-[50%] w-3 h-3"></div>
            ) : null}
            {character.status === "Dead" ? (
              <div class="bg-red-400 rounded-[50%] w-3 h-3"></div>
            ) : null}
            {character.status === "unknown" ? (
              <div class="bg-yellow-400 rounded-[50%] w-3 h-3"></div>
            ) : null}
            <p class="text-gray-600 text-xs">{character.status}</p>
          </div>
          <p class="text-gray-600 text-xs">id: {character.id}</p>
        </div>
      </div>
    </li>
  );
};
