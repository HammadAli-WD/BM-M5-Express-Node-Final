import React, { Component } from 'react'
import { ListGroup, Container, Row, Card, Button, Col } from 'react-bootstrap'
import SingleMedia from "./SingleMedia"


export default class HomePage extends Component {
    state = {
        media : {
            data:[]
        }
    }
    render() {
        return (
            <Container>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 text-center">

                {this.state.media.data.map(entry =>                 
                 <>
                 {/* <ListGroup>
                  <ListGroup.Item>{entry.title}-{entry.year} <br />
                  {entry.TimeOfArrival}
                  </ListGroup.Item>                  
                </ListGroup> */}
                <Col className="mb-2">
                <Card style={{ width: '12rem' }}>
                    <Card.Img variant="top" src={entry.poster} />
                    <Card.Body>
                        <Card.Title>{entry.title}</Card.Title>
                        <Card.Text>
                        {entry.year}
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                
                </>
                )}
                </Row>
            </Container>
        )
    }
    componentDidMount = async() => {
        const mediaResp = await fetch("http://localhost:3001/media")
        console.log(mediaResp)
        const media = await mediaResp.json()
        console.log(media)
        this.setState({
            media : media
        })
    }
}