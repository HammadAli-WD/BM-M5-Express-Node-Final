import React, { Component } from 'react'
import SingleMediaItem from "./SingleMediaItem"
import { Col, Container, Row, Button } from 'react-bootstrap'
import CreateMedia from './CreateMedia'

class BackOffice extends Component {
   state = {
       media: {
        data:[]
    },
       openModal: false
   }

    render() {
        return (
            <Container>
                <h1>Welcome to the backoffice <Button onClick={() => this.setState({ openModal: true})}>Create Movie</Button></h1>
                <CreateMedia show={this.state.openModal} 
                            onClose={() => this.setState({ openModal: false})}
                            onNewMedia={(book)=> this.setState({
                                media: this.state.media.data.concat(book),
                                openModal: false
                            })}
                            />

                {this.state.media.data.map(book => 
                    <SingleMediaItem item={book}
                        onDelete={(imdbID) => 
                            this.setState({
                            media: this.state.media.data.filter(book => book.imdbID !== imdbID)
                        }) }
                        
                 
                    /> 
                )} 
            </Container>
        )
    }

    componentDidMount = async () => {
        const mediaResp = await fetch("http://localhost:3001/media")
        const media = await mediaResp.json()
        this.setState({
            media: media
            //.data.slice(0, 50)
        })
    }
}

export default BackOffice