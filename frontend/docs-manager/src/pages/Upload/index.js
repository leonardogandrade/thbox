import React,{Component} from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import {ProgressBar} from 'react-bootstrap';
import './upload.css'

export default class Upload extends Component{
    state = {    
        progressBar : null,
        title : '',
        author : '',
        info : '',
        place : '',
        abstract : '',
        image : null,
    }

    handleOnSubmit = async event =>{
        this.setState({progressBar : null}); //Clean statusBar status before each upload
        const config = {
            //onUploadProgress: progressEvent => console.log(this.state.image.size,"/",progressEvent.loaded)
            onUploadProgress: progressEvent => this.setState({progressBar : progressEvent.loaded})
        }

        event.preventDefault();

        const data = new FormData();
        data.append('image',this.state.image);
        data.append('title',this.state.title);
        data.append('author',this.state.author);
        data.append('info',this.state.info);
        data.append('place', this.state.place);
        data.append('abstract',this.state.abstract);
        await  api.post('/api/doc',data, config);
        this.props.history.push('/');
    }

    handleImage = event => {
        this.setState({ image : event.target.files[0]})
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
                    <input type='file' onChange={this.handleImage}/>
                        <input 
                            type='text'
                            name='title'
                            onChange={this.handleChange}
                            value={this.state.title}
                            placeholder='Título do documento'
                        />
                        <input 
                            type='text'
                            name='author'
                            onChange={this.handleChange}
                            value={this.state.author}
                            placeholder='Autor do documento'
                        />
                        <input 
                            type='text'
                            name='place'
                            onChange={this.handleChange}
                            value={this.state.place}
                            placeholder='local'
                        />
                        <input 
                            type='text'
                            name='info'
                            onChange={this.handleChange}
                            value={this.state.info}
                            placeholder='informações do documento'
                        />
                        <textarea 
                            type='text'
                            name='abstract'
                            onChange={this.handleChange}
                            value={this.state.abstract}
                            rows='10'
                            cols='10'
                            placeholder='Descrição do documento'
                        />
                        {
                            this.state.progressBar > 0 && <ProgressBar striped variant='' className='uploadProgressBar' now={this.percentage(this.state.progressBar,this.state.image.size)} label={`${this.percentage(this.state.progressBar,this.state.image.size)}%`}/>
                        }
                        <button type='submit'>Enviar</button>

                    </form>
                </div>
        )
    }
}
