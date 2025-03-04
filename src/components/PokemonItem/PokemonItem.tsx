import styles from './PokemonItem.module.css'

interface PokemonProps {
    id: number;
    forms: { name: string }[];
    stats: { base_stat: number; stat: { name: string } }[];
    types: { slot: number; type: { name: string } }[];
    sprites: { front_shiny?: string };
}

interface PokemonItemProps {
    item: PokemonProps,
    onSelect: (id: number) => void
}

export const PokemonItem = ({ item, onSelect }: PokemonItemProps) => {
    return (
        <div className={styles["pokemon"]} onClick={() => onSelect(item.id)}>
            <div className={styles["pokemon-wrapper"]}>
                <div>
                    <p className={styles["pokemon-name"]}>{item.forms[0].name}</p>
                    <div className={styles["pokemon-stats"]}>
                        <div className={styles["pokemon-stat"]}>
                            <p className={styles["pokemon-stat-num"]} >{item.stats[0].base_stat}</p>
                            <p className={styles["pokemon-stat-name"]} >{item.stats[0].stat.name}</p>
                        </div>
                        <div>
                            <p className={styles["pokemon-stat-num"]}>{item.stats[1].base_stat}</p>
                            <p className={styles["pokemon-stat-name"]} >{item.stats[1].stat.name}</p>
                        </div>
                    </div>
                    <div className={styles["pokemon-types"]}>
                        {
                            item.types.map((element) => (
                                <span className={styles["pokemon-type"]} key={element.slot}>{element.type.name}</span>
                            ))
                        }
                    </div>
                </div>
                <img width='169px' height='139px' src={item.sprites.front_shiny} alt="Pokemon"/>

            </div>
        </div>
    )
}
