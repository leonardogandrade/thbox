import React,{Component} from 'react';
import uploadImg from '../../img/upload.png';
import {Link} from 'react-router-dom';
import './index.css';

export default class UploadButtom extends Component{

    handleUpload = event =>{
       this.props.history.push('/upload');
    }

    render(){
        return(
            <div className='uploadButtom'>
                <Link to={'/upload'}>                  
                    <img id='logout' src={uploadImg} alt=''></img>
                </Link>
            </div>
        )            
    }
}