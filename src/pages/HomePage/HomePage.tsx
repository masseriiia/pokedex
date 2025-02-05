import Banner from "../../assets/images/BannerComplete.png"
import styles from './HomePage.module.css'
import {Button} from "../../components/Button/Button";
import {NavLink} from "react-router-dom";

export const HomePage = () => {
    return (
        <section className={styles["home"]}>
            <div className="container">
                <div className={styles["home-wrapper"]}>
                    <div className={styles["home-info"]}>
                        <h1 className={styles["home-title"]}>
                            <b>Find</b> all your
                            favorite <b>Pokemon</b>
                        </h1>
                        <p className={styles["home-description"]}>
                            You can know the type of Pokemon, its strengths, disadvantages and abilities
                        </p>
                        <NavLink to="/pokemons">
                            <Button>See pokemons</Button>
                        </NavLink>
                    </div>
                    <div className={styles["home-image"]}>
                        <img src={Banner} alt="Banner"/>
                    </div>
                </div>
            </div>
        </section>
    )
}
