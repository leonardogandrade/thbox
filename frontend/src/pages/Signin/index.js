import React,{Component} from 'react';
import api from '../../services/api';
import { login } from '../../services/auth';
import './index.css';
import logo from '../../img/valeBig.png';

export default class Signin extends Component{
    state = {
        user : '',
        passwd : ''
    }

    handleChange = async event => {
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit = async event =>{
        event.preventDefault();
        const response = await api.post('/login/signin',{
            username : this.state.user,
            password : this.state.passwd 
        })
        
        if(response.data.token){
            login(response.data.token);
            this.props.history.push('/');
        }
    }

   render(){
       return(
        <div className='main-container'>
            <div className='login-container'>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text'
                        name='user'
                        placeholder='usuário'
                        onChange={this.handleChange}
                        value={this.state.user}
                    />
                    <input 
                        type='password'
                        name='passwd'
                        placeholder='senha'
                        onChange={this.handleChange}
                        value={this.state.passwd}
                    />
                    <button type='submit'>Entrar</button>
                </form>
                <div id='logoWaterMark'><img alt='' src={logo}/></div>
            </div>
        </div>
       )
   }
}