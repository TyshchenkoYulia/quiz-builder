import { NavLink } from "react-router-dom";
import css from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : css.link
        }
      >
        Quizzes
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : css.link
        }
      >
        New Quiz
      </NavLink>
    </nav>
  );
}
