import TeamRocket from '../../assets/images/teamRocket.png'
import {Button} from "../../components/Button/Button";
import styles from './NotFoundPage.module.css'
import {NavLink} from "react-router-dom";
import Error from '../../assets/images/404.png'

export const NotFoundPage = () => {
    return (
        <div className={styles["not-found-page"]}>
            <div className={styles["overlay"]}>
                <img className={styles["not-found-image"]} src={Error} alt="404"/>
                <div className={styles["content"]}>
                    <img src={TeamRocket} alt="Team Rocket"/>
                    <p className={styles["not-found-page-title"]}>
                        The rocket team <span className={styles["not-found-text"]}>has won this time.</span>
                    </p>
                    <NavLink to="/">
                        <Button color="secondary">Return</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
