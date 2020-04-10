import React,{Component} from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import PdfViewer from 'pdf-viewer-reactjs';
import ReactPlayer from 'react-player';
import { isAuthenticated } from '../../services/auth';
import AdminOptionsBar from '../../components/AdminOptionsBar';
import './index.css';

export default class DocDetail extends Component{
    state = {
        doc : {},
        ext : ''
    }

    componentDidMount = async() =>{
        const {id} = this.props.match.params;
        const response = await api.post(`/api/doc/${id}`);
        //const [name,ext] = (response.data.image).split('.');
        const [,ext] = (response.data.image).split('.');
        this.setState({
            doc : response.data,
            ext
        });
    }

    render(){
        return(
            <div>
                <Header/>
                <div className='resultList'>           
                    <article className='card' >
                        <div className='text'>
                            {
                                isAuthenticated() && <AdminOptionsBar id_={this.state.doc._id}/>
                            }                    
                            <h2 className='title'> {this.state.doc.title}</h2>
                            <span className='info'> {this.state.doc.info}</span>                           
                            {
                                this.state.ext === 'jpg' && <img src={`${process.env.REACT_APP_BACKEND}/files/${this.state.doc.image}`} alt=''/>
                            }
                            {
                                this.state.ext === 'pdf' && <PdfViewer document={{
                                    url : `${process.env.REACT_APP_BACKEND}/media/${this.state.doc.image}`
                                }}/>
                            }
                            {
                                this.state.ext === 'mp4' && <ReactPlayer
                                    className='ReactPlayer'
                                    controls 
                                    url={`${process.env.REACT_APP_BACKEND}/media/${this.state.doc.image}`}/>
                            }
                            <span className='abstract'> {this.state.doc.abstract}</span>
                        </div>
                    </article>    
                </div>
            </div>
        )
    }
}