import React,{Component} from 'react';
import optionImg from '../../img/options.png'
import {ButtonToolbar,Popover,OverlayTrigger,Button} from 'react-bootstrap';
import './index.css';
import ModalAlert from '../ModalAlert';
import {Link} from 'react-router-dom';

export default class AdminOptinBar extends Component{
    state = {
        show : false,
    }

    showModal = event => {
        this.setState({show : !this.state.show});
    }

    handleEditar = event =>{
        //console.log('Editar');
        console.log(this.props.id_)    
    }

    handleExcluir = event =>{
        console.log(this.props.id_)
    }

    render(){
        return(
            <div className='container'>
               <ModalAlert id_={this.props.id_} onClose={this.showModal} show={this.state.show}>Message Modal</ModalAlert>
               <ButtonToolbar>
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={
                            <Popover id=''>
                            <Popover.Title as="h3">TITLE</Popover.Title>
                            <Popover.Content>
                                <Link to={{
                                    pathname : `/edit/${this.props.id_}`,
                                    state : {
                                        id_ : this.props.id_
                                    }
                                }}>
                                    <Button variant='' onClick={this.handleEditar}>Editar</Button>
                                </Link>
                                <hr/>
                                <Button variant='' onClick={event => this.showModal()}>Excluir</Button>
                            </Popover.Content>
                            </Popover>
                        }
                    >
                    <Button variant='' ><img alt='' className='optionButtom' src={optionImg}/></Button>
                    </OverlayTrigger>
                </ButtonToolbar>
            </div>
        )
    }
}