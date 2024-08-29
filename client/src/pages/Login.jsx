import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import customFetch from "../utils/customFetch.js";
import {useAuthContext} from "../../hooks/useAuthContext.js";
import {Link} from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState(null);
    const { dispatch } = useAuthContext();
    const {user} = useAuthContext();


    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const result = await customFetch.post('/auth/login', {email, password})
            dispatch({type: 'LOGIN', payload: result.data.user})
        } catch (error) {
            setError(error?.response?.data?.msg)
            console.log(error?.response?.data?.msg)
            return
        }
        setEmail('')
        setPassword('')
    }
    return (
        <Container className={`mt-5 `}>
            <Row className="justify-content-md-center pt-4">
                <Col xs={12} md={6} className={`pt-4`}>
                    {/*{userData()}*/}
                    <Container className={`border border-secondary rounded mb-5 p-4 shadow-1-secondary shadow`}>
                        <h2 className={`mt text-muted mb-5`}>Sign In</h2>

                        <Form className={``} onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email"
                                              value={email}
                                              onChange={(e) => setEmail(e.target.value)}
                                              placeholder="Enter email"/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              value={password}
                                              onChange={(e) => setPassword(e.target.value)}
                                              placeholder="Password"/>
                            </Form.Group >
                            {error &&
                                <div className={`mt-5`}>
                                    <p className={`text-danger border border-danger rounded  p-2`}>
                                        {error}
                                    </p>
                                </div>
                            }


                            <Button variant="primary" type="submit" className={`mt-5`}>
                            Submit
                            </Button>

                        </Form>

                        <Row className={`py-3`}>
                            <Col>
                                New Customer?
                                <Link to={ `/register`}>Register</Link>
                            </Col>
                        </Row>

                    </Container>
                </Col>
            </Row>

        </Container>
    );
};

export default Login;
