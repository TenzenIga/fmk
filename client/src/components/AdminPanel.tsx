import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './Sidebar';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Sets from './Sets';
import Form from './Form';

export default function AdminPanel() {
    let { path } = useRouteMatch();
    return (
       <Row>
           <Col sm={2}>
               <Sidebar />
           </Col>
           <Col sm={10}>
           <Switch>
                <Route exact path={path} >
                    <Sets />
                </Route>
                <Route path={`${path}/form`}>
                    <Form />
                </Route>
            </Switch>
           </Col>
       </Row>
    )
}
