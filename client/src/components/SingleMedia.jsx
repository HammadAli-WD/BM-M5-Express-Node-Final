import React, { Component } from 'react'
import { Card, Button } from "react-bootstrap"

class SingleMedia extends Component {

    render() {
        const { title, poster, type, year, imdbID } = this.props.entry

        return (
            <Card>
                <Card.poster variant="top" src={poster} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {type} - {year}
                    </Card.Text>
                    <Button variant="primary">Details</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default SingleMedia