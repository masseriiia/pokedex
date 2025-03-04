import axios from "axios";
import { Grid, AutoSizer } from 'react-virtualized';
import { useEffect, useState } from "react";
import { PokemonItem } from "../../components/PokemonItem/PokemonItem";
import { Input } from "../../components/Input/Input";
import { Modal } from "../../components/Modal/Modal";
import { PokemonDetail } from "../../components/PokemonDetail/PokemonDetail";
import { Button } from "../../components/Button/Button";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../components/Loader/Loader";
import styles from './PokemonsPage.module.css';

export const PokemonsPage = () => {
    const MIN_30_IN_MS = 1000 * 60 * 30;

    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [allPokemons, setAllPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 12;
    const [filteredData, setFilteredData] = useState([]);
    const [debouncedValue] = useDebounce(value, 300);

    const { data: pokemonList, isLoading: isListLoading, error: listError } = useQuery({
        queryKey: ['pokemonsList', offset, limit],
        staleTime: MIN_30_IN_MS,
        placeholderData: (previousData) => previousData,
        queryFn: async () => {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
            const urls = data.results.map(pokemon => pokemon.url);
            const responses = await Promise.all(urls.map(url => axios.get(url)));
            return responses.map(res => res.data);
        },
    });

    useEffect(() => {
        if (pokemonList?.length > 0) {
            setAllPokemons(prev => {
                const uniqueDetails = pokemonList.filter(
                    newPokemon => !prev.some(existingPokemon => existingPokemon.id === newPokemon.id)
                );
                return [...prev, ...uniqueDetails];
            });
        }

        if (pokemonList && pokemonList.length < limit) {
            setHasMore(false);
        }
    }, [pokemonList]);

    useEffect(() => {
        if (debouncedValue.trim() === '') {
            setFilteredData(allPokemons);
        } else {
            const valueToLower = debouncedValue.toLowerCase();
            const filtered = allPokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(valueToLower));
            setFilteredData(filtered);
        }
    }, [debouncedValue, allPokemons]);

    const handlePokemonClick = (id: number) => {
        const pokemon = allPokemons.find((item) => item.id === id);
        if (pokemon) {
            setSelectedPokemon(pokemon);
            setIsOpen(true);
        }
    };

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const fetchMoreData = () => {
        setOffset(prev => prev + limit);
    };

    if (isListLoading) {
        return <Loader />;
    }

    const cellRenderer = ({ columnIndex, key, parent, rowIndex, style }) => {
        const index = rowIndex * 3 + columnIndex;
        const item = filteredData[index];

        if (!item) return null;

        return (
            <div key={key} style={style}>
                <PokemonItem onSelect={(id) => handlePokemonClick(id)} item={item} />
            </div>
        );
    };

    return (
        <section className={styles["pokemons"]}>
            <div className="container">
                <div className={styles["pokemons-wrapper"]}>
                    <h1 className={styles["pokemons-title"]}>
                        800 <b>Pokemons</b> for you to choose your favorite
                    </h1>
                    <Input value={value} onSearch={onChangeSearch} onClear={() => setValue('')} />
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        {selectedPokemon && <PokemonDetail selectedPokemon={selectedPokemon} />}
                    </Modal>
                    {filteredData.length > 0 ? (
                        <div className={styles["pokemons-grid-container"]}>
                            <AutoSizer>
                                {({height, width}) => (
                                    <Grid
                                        className={styles["pokemons-grid"]}
                                        columnCount={3}
                                        columnWidth={width / 3}
                                        rowCount={Math.ceil(filteredData.length / 3)}
                                        rowHeight={150}
                                        width={1200}
                                        height={500}
                                        cellRenderer={cellRenderer}
                                        overscanRowCount={2}
                                    />
                                )}
                            </AutoSizer>
                        </div>
                    ) : (
                        <p className={styles["no-results"]}>No results found</p>
                    )}
                    {hasMore && <Button onClickButton={fetchMoreData}>Show more</Button>}
                </div>
            </div>
        </section>
    );
};
