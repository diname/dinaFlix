import { Link } from 'react-router-dom'
import styles from './header.module.css'

export function Header() {
  return (
    <header>
      <Link className={styles.logo} to="/">
        DinaFlix
      </Link>
      <Link className={styles.favoritos} to="/favoritos">
        Meus filmes
      </Link>
    </header>
  )
}
