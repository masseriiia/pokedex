import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useCallback, useEffect, useState} from "react";
import {useFavoritePokemonsContext} from "../../context/FavoritePokemonsContext";
import styles from "./PokemonDetail.module.css";

interface Pokemon {
    id: number;
    forms: { name: string }[];
    abilities: { ability: { name: string; url: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    sprites: { front_shiny?: string };
}

interface selectedPokemonProps {
    selectedPokemon: Pokemon
}

export const PokemonDetail = ({selectedPokemon}: selectedPokemonProps) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const { addFavorite, removeFavorite, favorites } = useFavoritePokemonsContext();

    const { data } = useQuery({
        queryKey: ['pokemon'],
        queryFn: async () => {
            const { data } = await axios.get(selectedPokemon.abilities[0].ability.url)
            return data
        }
    })

    useEffect(() => {
        if (favorites) {
            const isAlreadyFavorite = favorites.some(
                (fav) => fav.id === selectedPokemon.id
            );
            setIsFavorite(isAlreadyFavorite);
        }
    }, [favorites, selectedPokemon]);

    const handleToggleFavorite = useCallback(() => {
        if (isFavorite) {
            removeFavorite(selectedPokemon.id);
        } else {
            addFavorite(selectedPokemon);
        }
        setIsFavorite((prev) => !prev);
    }, [isFavorite, selectedPokemon, addFavorite, removeFavorite]);


    return (
        <div className={styles["pokemon-detail"]}>
            <div className={styles["pokemon-detail-wrapper"]}>
                <img width='169px' height='139px' src={selectedPokemon.sprites.front_shiny} alt="Pokemon"/>
                <div>
                    <div className={styles["pokemon-detail-info"]}>
                        <p className={styles["pokemon-detail-name"]}>{selectedPokemon.forms[0].name}</p>
                        <div className={styles["pokemon-detail-actions"]}>
                            {isFavorite ? <button className={styles["pokemon-detail-button"]} onClick={handleToggleFavorite}>Delete</button> : <button className={styles["pokemon-detail-button"]} onClick={handleToggleFavorite}>Add to Favorites</button> }
                            <p className={styles["pokemon-detail-id"]}>{selectedPokemon.id}</p>
                        </div>
                    </div>
                    <div className={styles["pokemon-detail-description"]}>
                        <p>{selectedPokemon.abilities[0].ability.name}</p>
                        <p>{data?.effect_entries?.[0]?.effect || "Loading..."}</p>
                    </div>
                    <div className={styles["pokemon-detail-stats"]}>
                        {
                            selectedPokemon.stats.map(element => (
                                <div key={element.stat.name} className={styles["pokemon-detail-stat"]}>
                                    <p className={styles["pokemon-detail-stat-num"]}>{element.base_stat}</p>
                                    <p className={styles["pokemon-detail-stat-name"]}>{element.stat.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
