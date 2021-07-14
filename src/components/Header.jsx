import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="container-fluid">
      <ul className="d-flex">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/recherche">Recherche</Link>
        </li>
        <li>
          <Link to="/favoris">Favoris</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
