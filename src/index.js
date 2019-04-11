import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'reactstrap';
import Login from './js/pages/Login.jsx'

ReactDOM.render(
    <div>
        <Container>
            <Login/>
        </Container>        
    </div>,
    document.getElementById('create-article-form')
)