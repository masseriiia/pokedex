import IconLogo from '../../assets/images/logo.svg'
import {NavLink} from "react-router-dom";
import styles from './Header.module.css'

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
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className={styles["header-item"]}>
                            <NavLink to="/pokemons">Pokemons</NavLink>
                        </li>
                        <li className={styles["header-item"]}>
                            <NavLink to="/">Legendaries</NavLink>
                        </li>
                        <li className={styles["header-item"]}>
                            <NavLink to="/">Documentation</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
