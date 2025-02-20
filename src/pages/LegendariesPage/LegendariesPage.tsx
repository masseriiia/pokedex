import styles from './LegendariesPage.module.css'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {useCallback, useEffect, useMemo, useState} from "react";
import {Loader} from "../../components/Loader/Loader";
import GoldenPokeball from '../../assets/images/goldenPokeball.svg'
import GoldenPokeball1 from '../../assets/images/goldenPokeball1.png'
import 'swiper/css';
import 'swiper/css/navigation';

export const LegendariesPage = () => {
    const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
    const [offset, setOffset] = useState(0)
    const [pokemon, setPokemon] = useState(null)
    const limit = 1000

    const { data: pokemonList, isLoading: isListLoading, error: listError } = useQuery({
        queryKey: ['pokemonsList', offset, limit],
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: true,
        placeholderData: (previousData) => previousData,
        queryFn: async () => {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
            return data.results
        },
    })

    const { data: pokemonDetails, isLoading: isDetailsLoading } = useQuery({
        queryKey: ['pokemonUrl'],
        enabled: !!pokemonList,
        placeholderData: (previousData) => previousData,
        queryFn: async () => {
            const urls = pokemonList?.map(pokemon => pokemon.url)
            const responses = await Promise.all(urls.map(url => axios.get(url)))
            return responses.map((res) => res.data)
        },
    })

    const { data: pokemonSpecies, isLoading: isPokemonSpeciesLoading } = useQuery({
        queryKey: ['pokemonSpecies', offset],
        enabled: !!pokemonDetails && !isDetailsLoading,
        placeholderData: (previousData) => previousData,
        queryFn: async () => {
            if (!pokemonDetails) return [];
            const species = pokemonDetails.map(pokemon => pokemon.species.url)
            const responses = await Promise.all(species.map(url => axios.get(url)))
            return responses.map((res) => res.data)
        },
    })

    const legendaryPokemons = useMemo(() => {
        return pokemonDetails?.filter(pokemon => {
            const species = pokemonSpecies?.find(species => species.id === pokemon.id)
            return species?.is_legendary
        })}, [pokemonDetails, pokemonSpecies])

    useEffect(() => {
        if (legendaryPokemons && legendaryPokemons.length > 0) {
            setPokemon(legendaryPokemons[0]);
        }
    }, [legendaryPokemons]);

    const onClickPokemon = useCallback((id: number) => {
        if (!legendaryPokemons) return;
        const pokemonLeg = legendaryPokemons.find((item) => item.id === id)
        if (pokemonLeg) setPokemon(pokemonLeg);
    }, [legendaryPokemons])

    console.log(pokemonSpecies)

    return (
        <div className={styles["legendaries"]}>
            <div className="container">
                <h1 className={styles["legendaries-title"]}>Legendaries</h1>
                {isListLoading || isDetailsLoading || isPokemonSpeciesLoading ? (
                    <Loader/>
                ) : (
                    <div className={styles["legendaries-wrapper"]}>
                        <div className={styles["legendaries-content"]}>
                            <img width='373px' height='417px' src={pokemon?.sprites.front_default}
                                 alt="Pokemon"/>
                            <div className={styles["legendaries-item"]}>
                                <p className={styles["legendaries-item-name"]}>{pokemon?.name}</p>
                                <p className={styles["legendaries-item-description"]}>Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit. Ad aspernatur, consequuntur deleniti eligendi et eum
                                    excepturi explicabo illo incidunt ipsam iste iusto nam non officiis praesentium quam
                                    quas qui voluptas.</p>
                                <div className={styles["legendaries-stats"]}>
                                    {
                                        pokemon?.stats.map(item => (
                                            <div key={item.stat.name} className={styles["legendaries-stat"]}>
                                                <p className={styles["legendaries-stat-name"]}>{item.stat.name}</p>
                                                <p className={styles["legendaries-stat-num"]}>{item.base_stat}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles["legendaries-swiper-container"]}>
                            <Swiper
                                spaceBetween={50}
                                slidesPerView={6}
                                loop={true}
                                navigation={{
                                    nextEl: '.swiper-button-next-custom',
                                    prevEl: '.swiper-button-prev-custom',
                                }}
                                modules={[Navigation]}
                            >
                                {legendaryPokemons?.map((pokemon) => (
                                    <SwiperSlide className={styles["swiper"]} key={pokemon.id}>
                                        <div onClick={() => onClickPokemon(pokemon.id)}
                                             className={styles["legendaries-swiper"]}>
                                            <img width='169px' height='139px' src={pokemon.sprites.front_shiny}
                                                 alt="Pokemon"/>
                                            <div className={styles["legendaries-swiper-content"]}>
                                                <p className={styles["legendaries-swiper-name"]}>{pokemon.name}</p>
                                                <img className={styles["legendaries-swiper-img"]} src={GoldenPokeball1} alt="GoldenPokeball"/>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}

                            </Swiper>
                            <div className={`${styles['swiper-button-prev']} swiper-button-prev-custom`}>
                                <BiSolidLeftArrow/></div>
                            <div className={`${styles['swiper-button-next']} swiper-button-next-custom`}>
                                <BiSolidRightArrow/></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
