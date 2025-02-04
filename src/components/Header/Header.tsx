import IconLogo from '../../assets/images/logo2.png'
import styles from './Header.module.css'

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className="container">
                <div className={styles["header-wrapper"]}>
                    <img src={IconLogo} alt=""/>
                    <ul className={styles["header-items"]}>
                        <li className={styles["header-item"]}>
                            <a href="">Home</a>
                        </li>
                        <li className={styles["header-item"]}>
                            <a href="">Pokédex</a>
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
