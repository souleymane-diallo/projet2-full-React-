import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSpan = styled.span`
  padding: 15px;
  color: #8186a0;
  font-size: 2em;
`;
const StyledLink = styled(Link)`
  padding: 5px 14px;
  color: #8186a0;
  text-decoration: none;
  font-size: 1.4em;
  display: block;

  &:hover {
    color: white;
    border-radius: 10px;
    background-color: #5843e4;
  }
`;

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/" className="mx-5 logo">
        <StyledSpan>Paris Event</StyledSpan>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <StyledLink to="/">Accueil</StyledLink>
        <StyledLink to="/recherche">Rechercher</StyledLink>
        <StyledLink to="/favoris">Favoris</StyledLink>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
