import Button from "@mui/material/Button"
import styles from "./PageNotFound.module.css"
import { Link } from "react-router"

export const PageNotFound = () => (
    <div className={styles.div}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>page not found</h2>
        <Button component={Link} to='/' variant="contained">
            Вернуться на главную
        </Button>
    </div>
)