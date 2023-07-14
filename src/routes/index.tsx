import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import Carousel from "~/components/shared/carousel";


export default component$(() => {
  //`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
  const pokes = useStore<number[]>([1,2,3,4,5,6,7,8,9,10]);
  
  return (
    <div class="container" style={{marginTop:'2em'}}>
      <h2 class="title">Listado de pokemones</h2>
      <Carousel sliderParam={{ slidesPerView: 4, spaceBetween: 24 }}>
        {pokes.map(poke=>(
          <div key={poke} class="slider-slide">
            <PokemonImage id={poke}/>
          </div>
        ))}

      </Carousel>

    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};


/* {
  categoriesImgUrls.map((cat, i) => (
    <div
      key={cat.image + i}
      class="category__item slider-slide"
      draggable={false}
      style={{
        width: "100%"
      }}
    >
      <SimpleCard
        imgUrl={cat.image}
        title={cat.name}
      />
    </div>
  ))
} */