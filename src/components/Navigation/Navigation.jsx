import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Home
      </NavLink>
      <NavLink
        to={{
          pathname: `/movies`,
          state: { from: `/movies` },
        }}
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Movies
      </NavLink>
    </nav>
  )
}
