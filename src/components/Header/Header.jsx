import { Nav, Navbar, Container } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/" className="mx-5">
        Paris Event
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Container>
          <Nav className="justify-content-center">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/recherche">Rechercher</Nav.Link>
            <Nav.Link href="/favoris">Favoris</Nav.Link>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
