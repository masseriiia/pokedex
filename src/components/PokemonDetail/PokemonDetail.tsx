import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import styles from "./PokemonDetail.module.css";

export const PokemonDetail = ({selectedPokemon}: any) => {

    const { data } = useQuery({
        queryKey: ['pokemon'],
        queryFn: async () => {
            const { data } = await axios.get(selectedPokemon.abilities[0].ability.url)
            return data
        }
    })

    return (
        <div className={styles["pokemon-detail"]}>
            <div className={styles["pokemon-detail-wrapper"]}>
                <img width='169px' height='139px' src={selectedPokemon.sprites.front_shiny} alt="Pokemon"/>
                <div>
                    <div className={styles["pokemon-info"]}>
                        <p className={styles["pokemon-detail-name"]}>{selectedPokemon.forms[0].name}</p>
                        <p className={styles["pokemon-detail-id"]}>{selectedPokemon.id}</p>
                    </div>
                    <div className={styles["pokemon-detail-description"]}>
                        <p>{selectedPokemon.abilities[0].ability.name}</p>
                        <p>{data?.effect_entries?.[0]?.effect || "Loading..."}</p>
                    </div>
                    <div className={styles["pokemon-detail-stats"]}>
                        {
                            selectedPokemon.stats.map(element => (
                                <div className={styles["pokemon-detail-stat"]}>
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
