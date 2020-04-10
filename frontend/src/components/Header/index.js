import React,{Component} from 'react';
import './index.css';
import logoutImg from '../../img/logout.png';
import { logout,isAuthenticated } from '../../services/auth';
import UploadButtom from '../AdminNavBar';
import logoMajicBox from '../../img/majicbox_2020.png';

export default class Header extends Component{

    handleSubmit = event =>{
        logout();
        this.props.history.push('/');
    }

    render(){
        return(
            <div className='main-container'>
                <header>
                    <a href='/' className='homeLink'><img src={logoMajicBox} alt=''/></a>
                        {
                            isAuthenticated() && <UploadButtom/>
                        }
                    <form onSubmit={this.handleSubmit}>
                        {
                            isAuthenticated() && <button className='logout'><img id='logout' src={logoutImg} alt=''></img></button>
                        }
                    </form>
                        
                </header>
            </div>
        )
    }
}