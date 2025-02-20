import axios from "axios";
import {useEffect, useState} from "react";
import {PokemonItem} from "../../components/PokemonItem/PokemonItem";
import {Input} from "../../components/Input/Input";
import {Modal} from "../../components/Modal/Modal";
import {PokemonDetail} from "../../components/PokemonDetail/PokemonDetail";
import {Button} from "../../components/Button/Button";
import {useDebounce} from "use-debounce";
import {useQuery} from "@tanstack/react-query";
import {Loader} from "../../components/Loader/Loader";
import styles from './PokemonsPage.module.css'

export const PokemonsPage = () => {
    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
    const [hasMore, setHasMore] = useState(true)
    const [allPokemons, setAllPokemons] = useState([])
    const [offset, setOffset] = useState(0)
    const limit = 12
    const [filteredData, setFilteredData] = useState([])
    const [debouncedValue] = useDebounce(value, 300)

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
        queryKey: ['pokemonUrl', offset],
        enabled: !!pokemonList,
        placeholderData: (previousData) => previousData,
        queryFn: async () => {
            const urls = pokemonList.map(pokemon => pokemon.url)
            const responses = await Promise.all(urls.map(url => axios.get(url)))

            return responses.map((res) => res.data)
        },
    })

    useEffect(() => {
        if (pokemonList && pokemonDetails.length > 0) {
            setAllPokemons(prev => {
                const uniqueDetails = pokemonDetails.filter(
                    newPokemon => !prev.some(existingPokemon => existingPokemon.id === newPokemon.id)
                );
                return [...prev, ...uniqueDetails];
            })
        }
    }, [pokemonDetails]);

    useEffect(() => {
        setHasMore(filteredData.length > 8);
    }, [filteredData]);

    useEffect(() => {

        if (debouncedValue.trim() === '') {
            setFilteredData(allPokemons)
        } else {
            const valueToLower = debouncedValue.toLowerCase()
            const filtred = allPokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(valueToLower))
            setFilteredData(filtred)
        }
    }, [debouncedValue, allPokemons]);

    const handlePokemonClick = (id: number) => {
        const pokemon = allPokemons.find((item) => item.id === id)
        if (pokemon) {
            setSelectedPokemon(pokemon)
            setIsOpen(true)
        }
    }

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const fetchMoreData = () => {
        setOffset(prev => prev + limit)
    }

    if (isListLoading || isDetailsLoading) {
        return <Loader/>;
    }

    const onClear = () => {
        setValue('')
    }

    return (
        <section className={styles["pokemons"]}>
            <div className="container">
                <div className={styles["pokemons-wrapper"]}>
                    <h1 className={styles["pokemons-title"]}>
                        800 <b>Pokemons</b> for you to choose your favorite
                    </h1>
                    <Input value={value} onSearch={onChangeSearch} onClear={onClear}/>
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        {selectedPokemon && <PokemonDetail selectedPokemon={selectedPokemon}/>}
                    </Modal>
                        <div className={styles["pokemons-items"]}>
                            {
                                filteredData.map((item) => (
                                    <PokemonItem onSelect={(id) => handlePokemonClick(id)}
                                                 key={item.id} item={item}/>
                                ))
                            }
                        </div>
                    {hasMore && <Button onClickButton={fetchMoreData}>Показать ещё</Button>}
                </div>
            </div>
        </section>
    )
}
