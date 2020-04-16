import React,{Component} from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import {ProgressBar} from 'react-bootstrap';
import './index.css'
import thumbnail from '../../img/thumbnail.png'

export default class Upload extends Component{

    state = {    
        progressBar : null,
        title : '',
        author : '',
        info : '',
        place : '',
        abstract : '',
        image : null,
        video : null,
        category : '',
        categoryArray : []
    }

    async componentDidMount(){
        const categories = await api.get('/api/cat');
        this.setState({categoryArray : categories.data});
        console.log(categories.data);
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
        data.append('video',this.state.video);
        data.append('title',this.state.title);
        data.append('author',this.state.author);
        data.append('info',this.state.info);
        data.append('place', this.state.place);
        data.append('abstract',this.state.abstract);
        data.append('category',this.state.category);
        await  api.post('/api/doc',data, config);
        //this.props.history.push('/');
        console.log(data);
    }

    handleImage = event => {
        this.setState({ image : event.target.files[0]})
    }

    handleVideo = event => {
        this.setState({ video : event.target.files[0]})
    }

    handleChange = event =>{
        this.setState({ [event.target.name] : event.target.value })
    }

    percentage(parcial,total){
        return parseInt((100*parcial)/total)
    }
    
    render(){
        return(
            <div className='main-container'>
                <Header/>
                <form id='uploadCard' onSubmit={this.handleOnSubmit}>
                    <div className='image-upload'>
                        <label htmlFor='file-input'>
                            <img src={thumbnail} alt=''/>
                        </label>
                        <input id='file-input' type='file' onChange={this.handleImage}/>
                    </div>
                    <input type='file' onChange={this.handleVideo}/>
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
                        <select
                            type='text'
                            name='category'
                            onChange={this.handleChange}
                            value={this.state.category}>
                            {this.state.categoryArray.map(cat =>(
                                <option>{cat.category}</option>
                            ))}
                        </select>
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
                            this.state.progressBar > 0 && <ProgressBar striped variant='' className='uploadProgressBar' now={this.percentage(this.state.progressBar,this.state.video.size)} label={`${this.percentage(this.state.progressBar,this.state.video.size)}%`}/>
                        }
                        <button type='submit'>Enviar</button>
                </form>
            </div>
        )
    }
}
