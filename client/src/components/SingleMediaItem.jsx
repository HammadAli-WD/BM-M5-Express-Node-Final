import React, { Component } from 'react'
import { Media, Button, Card, Container, Row, Col} from "react-bootstrap"
import { Link } from 'react-router-dom'

class SingleMediaItem extends Component {

    deleteBook = async (imdbID) =>{
        const mediaResp = await fetch("http://localhost:3001/media/" + imdbID, {
            method: "DELETE"
        })
        if (mediaResp.ok){
            this.props.onDelete(imdbID)
        }
    }

 
    render() {
        const { title, poster, type, year, imdbID } = this.props.item

        return (
            <Media>
            <poster
              width={64}
              height={64}
              className="mr-3"
              src={poster}
              alt="Generic placeholder"
            />
            <Media.Body>
              <Container>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 text-center">
                  <Col >
                <Card border="primary" style={{ width: '18rem' }}>
                    <Card.Header>{title}</Card.Header>
                    <Card.Body>
                      <Card.Title>{type}</Card.Title>
                      <Card.Text>
                      {year}
                      </Card.Text>
                      <Button className="ml-5" variant="danger" onClick={() => this.deleteBook(imdbID) } >DeleteMovie</Button>
                      <Button className="ml-5" variant="warning"><Link to={"/details/" + imdbID}>Edit Movie</Link></Button>
                    </Card.Body>
                  </Card>
                  <br />
                  </Col>
                  </Row>
                </Container>


             {/*  <h5>{title}</h5>
              <p>
                {type} - {year}
                <Button className="ml-5" variant="danger" onClick={() => this.deleteBook(imdbID) } >DeleteMovie</Button>
                <Button className="ml-5" variant="warning"><Link to={"/details/" + imdbID}>Edit Movie</Link></Button>
              </p> */}
            </Media.Body>
          </Media>
        )
    }
}

export default SingleMediaItem