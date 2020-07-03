import React, { Component } from 'react'
import { Modal, Button, Form } from "react-bootstrap"

class CreateMedia extends Component {

    state = {
        title: "",
        year: "",
        /* imdbID: "", */
        type: "",
        poster: ""
    }

    createMedia = async () => {
        const newMedia = {
            ...this.state
        }

        const mediaResp = await fetch("http://localhost:3001/media", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMedia)
        })

        if (mediaResp.ok) {// check if the response is ok
            this.props.onNewMedia(newMedia)// tell the parent we have a new kid in town
        }
    }

    render() {
        const { onClose, show } = this.props

        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert Media in catalogue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* <Form.Group controlId="imdbID">
                            <Form.Label>imdbID</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => this.setState({ imdbID: e.currentTarget.value })}
                                value={this.state.imdbID}
                                placeholder="imdbID - Unique Media ID" />
                        </Form.Group> */}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={this.state.title}
                                onChange={(e) => this.setState({ title: e.currentTarget.value })}
                                type="text" placeholder="Title" />
                        </Form.Group>
                        <Form.Group controlId="type">
                            <Form.Label>type</Form.Label>
                            <Form.Control
                                value={this.state.type}
                                onChange={(e) => this.setState({ type: e.currentTarget.value })}
                                type="text" placeholder="type" />
                        </Form.Group>
                        <Form.Group controlId="year">
                            <Form.Label>year</Form.Label>
                            <Form.Control
                                value={this.state.year}
                                onChange={(e) => this.setState({ year: e.currentTarget.value })}
                                type="number" placeholder="year" />
                        </Form.Group>
                        <Form.Group controlId="poster">
                            <Form.Label>poster URL</Form.Label>
                            <Form.Control
                                value={this.state.poster}
                                onChange={(e) => this.setState({ poster: e.currentTarget.value })}
                                type="text" placeholder="poster URL" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.createMedia}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CreateMedia