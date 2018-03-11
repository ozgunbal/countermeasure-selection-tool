import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class HomeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false}
        this.toggleDisplay = this.toggleDisplay.bind(this);
    }
    toggleDisplay() {
        this.setState((prevState, props) => {
            return {show: !prevState.show};
        })
    }
    render() {
        const {headContent, detailsContent} = this.props;
        return (
            <div>
                <h3><strong>{headContent}</strong></h3>
                <Button bsStyle="info" onClick={this.toggleDisplay}>Show Details</Button>
                <Modal
                    show={this.state.show}
                    onHide={this.toggleDisplay}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    {detailsContent}
                </Modal>
            </div>
        );
    }
}

export default HomeDetail;