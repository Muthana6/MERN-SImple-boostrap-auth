import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import customFetch from "../utils/customFetch.js";
import {useContext} from "react";
import {useAuthContext} from "../../hooks/useAuthContext.js";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const {user, dispatch} = useAuthContext()
    const navigate = useNavigate();

    const handleLogout = async ()=> {
        try {
            const result = await customFetch.get('/auth/logout')
            dispatch({type: 'LOGOUT'})

        } catch (error) {
            console.log(error?.response?.data?.msg)
            return error
        }
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary"
                 >
            <Container>
                <Navbar.Brand className={`text-primary h1`} href="#home">Meal Rep</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user && <Nav.Item className={`mt-2 text-muted`}>{user.email}</Nav.Item>}
                        <Nav.Link href="#link">Link</Nav.Link>
                        <Nav.Link
                            onClick={handleLogout}
                            className={`text-primary `}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>);
};

export default Header;
