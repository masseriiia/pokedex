import IconLogo from '../../assets/images/logo2.png'
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={styles["header"]}>
            <div className="container">
                <div className={styles["header-wrapper"]}>
                    <NavLink to="/">
                        <img src={IconLogo} alt="Logo"/>
                    </NavLink>
                    <ul className={styles["header-items"]}>
                        <li className={styles["header-item"]}>
                            <a href="">Home</a>
                        </li>
                        <li className={styles["header-item"]}>
                            <NavLink to="/pokemons">Pokemons</NavLink>
                        </li>
                        <li className={styles["header-item"]}>
                            <a href="">Legendaries</a>
                        </li>
                        <li className={styles["header-item"]}>
                            <a href="">Documentation</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
