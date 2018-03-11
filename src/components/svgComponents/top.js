import React from 'react';
import CMList from './cmlist';
import PolyGraph from './polygraph';

import { Jumbotron, Row, Col } from 'react-bootstrap';

const Top = () => (
    <Jumbotron style={{ marginLeft: "12%", marginRight: "12%", borderRadius: 10, padding: 0 }}>
        <Row className="show-grid">
            <Col md={6} mdOffset={3}>
                <PolyGraph />
            </Col>
        </Row>
        <Row>
            <Col md={10} mdOffset={1}>
                <CMList />
            </Col>
        </Row>
    </Jumbotron>
);

export default Top;