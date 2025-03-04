import styles from './FavoritesPage.module.css'
import {useFavoritePokemonsContext} from "../../context/FavoritePokemonsContext";

export const FavoritesPage = () => {
    const { removeFavorite, clearFavorite, favorites } = useFavoritePokemonsContext()

    return (
        <div className={styles["favorites"]}>
            <div className="container">
                <div className={styles["favorites-info"]}>
                    <h1 className={styles["favorites-title"]}>Favorite Pokemons</h1>
                    {favorites.length > 0 ? <button className={styles["favorites-button-clear"]}
                                                    onClick={() => clearFavorite()}>Clear</button> : ""}
                </div>

                <div className={styles["favorites-wrapper"]}>
                {favorites.length > 0 ? favorites.map(item => (
                            <div key={item.id} className={styles["favorites-item"]}>
                                <img width='169px' height='139px' src={item.sprites.front_shiny} alt="Pokemon"/>
                                <div className={styles["favorites-item-description"]}>
                                    <div className={styles["favorites-item-actions"]}>
                                        <button className={styles["favorites-item-button"]} onClick={() => removeFavorite(item.id)}>Delete</button>
                                        <p className={styles["favorites-item-id"]}>{item.id}</p>
                                    </div>
                                    <p className={styles["favorites-item-name"]}>{item.name}</p>
                                </div>
                            </div>
                        )) : <p className={styles["favorites-item-add"]}>Add your favorites pokemon</p>}
                </div>
            </div>
        </div>
    )
}
