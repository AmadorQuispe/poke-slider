import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";


interface Props {
    id: number | string,
    size?: number,
    backImage?:boolean
}

export const PokemonImage = component$(({ id, size = 200,backImage=false }: Props) => {

    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
        track(() => id);
        imageLoaded.value = false
    })

    const urlImage = useComputed$(()=>{
        return backImage 
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    })

   return(
        <div class="card" style={{ width: `${size}px`, height: `${size}px` }}>
            {!imageLoaded.value && <span>Cargando...</span>}
            <img
                src={urlImage.value}/*  */
                alt="Pokemon sprite"
                width={size}
                height={size}
                onLoad$={() => imageLoaded.value = true}
            />
        </div>
    )
});