import { NavLink } from "react-router-dom";
import "../../App.css";
const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/">Don 🔫ReactQuery</NavLink>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/trad">FetchOld</NavLink>
          </li>
          <li>
            <NavLink to="/rq"> FetchRQ </NavLink>
          </li>
          <li>
            <NavLink to="/infinite-scroll">InfiniteScroll</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
