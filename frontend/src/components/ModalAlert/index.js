import React,{Component} from 'react';
import {Button,Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import './index.css';

export default class ModalAlert extends Component{
    state = {
        show : false,
    }

    fadeOut = event => {
        this.setState({show : true});
    }

    onClose = event =>{
        this.props.onClose && this.props.onClose(event);
    }

    deleteDocument = event =>{
        api.delete(`/api/doc/${this.props.id_}`);    
    }

    render(){
        if(!this.props.show){
            return null;
        }

        return(
            <Modal.Dialog id='modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar documento</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                    <p>Deseja deletar DEFINITIVAMENTE o documento?</p>
                    </Modal.Body>
                
                    <Modal.Footer>
                    <Button variant="secondary" onClick={event => this.onClose(event)}>Não</Button>
                    <Link to='/'>
                        <Button variant="primary" onClick={event => this.deleteDocument(event)}>Sim</Button>
                    </Link>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}

