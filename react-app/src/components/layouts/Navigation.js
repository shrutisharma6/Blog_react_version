import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './layouts.css';
import { useNavigate } from 'react-router-dom';


function Navigation() {
  const authToken = localStorage.getItem('authToken');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_id');
    navigate('/');
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark" sticky="top" id="navbar">
      
        <Navbar.Brand as={Link} to="/">Blogify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Users">Bloggers</Nav.Link>
            <Nav.Link as={Link} to="/SignUp ">Sign Up</Nav.Link>
            {authToken ? (
              <Nav.Link onClick={handleLogout} className="nav-link">
              Log Out
            </Nav.Link>
            ):null}

          {authToken ?  null: (
            <Nav.Link as={Link} to="/Login">Log In</Nav.Link>
          ) }
           
            <NavDropdown title="Articles" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/Articles">Read Articles</NavDropdown.Item>
              {authToken ?(
                <NavDropdown.Item as={Link} to="/CreateArticle">Write an article</NavDropdown.Item>
              ) :null }
              
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/Categories">Visit Categories</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
}

export default Navigation;