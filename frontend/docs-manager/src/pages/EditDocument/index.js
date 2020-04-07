import React,{ Component } from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import { ProgressBar } from 'react-bootstrap';
import './upload.css'

export default class EditDocument extends Component{

    async componentDidMount(){
        const {id_} = this.props.location.state || "";
        const response = await api.post(`/api/doc/${id_}`);

        this.setState({
            id : id_,
            doc : response.data,
            title : response.data.title,
            author : response.data.author,
            place : response.data.place,
            info : response.data.info,
            abstract : response.data.abstract,
        })
    }

    state = {
        id : '',
        progressBar : null,
        title : '',
        author : '',
        place : '',
        info : '',
        abstract : '',
        doc : [],
    }

    handleOnSubmit = async event =>{
        event.preventDefault();

        const response = await api.put(`/api/doc/${this.state.id}`,{
            title : this.state.title,
            author : this.state.author,
            place : this.state.place,
            info : this.state.info,
            abstract : this.state.abstract,
        })
        console.log(response)
        this.props.history.push('/');
    }

    handleChange = event =>{
        this.setState({ [event.target.name] : event.target.value })
    }

    percentage(parcial,total){
        return parseInt((100*parcial)/total)
    }

    render(){
        return(
            <div>
                <Header/>
                <form id='uploadCard' onSubmit={this.handleOnSubmit}>
                        <input 
                            type='text'
                            name='title'
                            onChange={this.handleChange}
                            value={this.state.title || ""}
                            placeholder='Título do documento'
                        />
                        <input 
                            type='text'
                            name='author'
                            onChange={this.handleChange}
                            value={this.state.author || ""}
                            placeholder='Autor do documento'
                        />
                        <input 
                            type='text'
                            name='place'
                            onChange={this.handleChange}
                            value={this.state.place || ""}
                            placeholder='local'
                        />
                        <input 
                            type='text'
                            name='info'
                            onChange={this.handleChange}
                            value={this.state.info || ""}
                            placeholder='informações do documento'
                        />
                        <textarea 
                            type='text'
                            name='abstract'
                            onChange={this.handleChange}
                            value={this.state.abstract || ""}
                            rows='10'
                            cols='10'
                            placeholder='Descrição do documento'
                        />
                        {
                            this.state.progressBar > 0 && <ProgressBar striped variant='' className='uploadProgressBar' now={this.percentage(this.state.progressBar,this.state.image.size)} label={`${this.percentage(this.state.progressBar,this.state.image.size)}%`}/>
                        }
                        <button type='submit' >Salvar</button>
                    </form>
                </div>
        )
    }
}
