import {FidgetSpinner} from "react-loader-spinner";
import styles from './Loader.module.css'

export const Loader = () => {
    return (
        <div className={styles["loading"]}>
            <div className={styles["content"]}>
                <FidgetSpinner
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="fidget-spinner-loading"
                    wrapperStyle={{}}
                    wrapperClass="fidget-spinner-wrapper"
                />
            </div>
        </div>
    )
}
