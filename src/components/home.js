import React, { Component } from 'react';
import HomeDetail from './homeDetail';
import { Jumbotron, Row, Col } from 'react-bootstrap';

const HomePage = () => (
    <Jumbotron style={{ marginLeft: "7%", marginRight: "7%", borderRadius: 10, padding: "2%" }}>
        <Row className="show-grid">
            <Col xs={10} xsOffset={1}>
                <h2><strong>Countermeasure Selection Tool</strong></h2>
                <p>{
                    `This tool for simulating attacks and countermeasures in the context of system security. 
            The goal is representing them in different geometric models and decide best countermeasure option with the help of metrics and visual clues.`
                }</p>
            </Col>
        </Row>
        <Row className="show-grid">
            <Col xs={3} xsOffset={2}>
                <HomeDetail headContent="3D Volume Model" detailsContent={
                    <div>
                        <p><em>Details will be added</em></p>
                        <p style={{ color: "darkblue" }}><b>Reference:</b> Granadillo, Gustavo & Garcia-Alfaro, Joaquin & Debar, Hervé. (2015). Using a 3D geometrical model to improve accuracy in the evaluation and selection of countermeasures against complex cyber attacks. . 10.13140/RG.2.1.3232.7127.</p>
                    </div>
                } />
            </Col>
            <Col xs={4} xsOffset={1}>
                <HomeDetail headContent="n-Sided Polygonal Model" detailsContent={
                    <div>
                        <em>Details will be added</em>
                        <p style={{ color: "darkblue" }}><b>Reference:</b> Granadillo, Gustavo & Garcia-Alfaro, Joaquin & Debar, Hervé. (2016). An n-sided polygonal model to calculate the impact of cyber security events. In: International Conference on Risks and Security of Internet and Systems</p>
                    </div>
                } />
            </Col>
        </Row>
    </Jumbotron>
);



export default HomePage;