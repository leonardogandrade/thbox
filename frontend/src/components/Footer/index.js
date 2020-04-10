import React,{Component} from 'react';
import logo from '../../img/majicbox_2020.png';
import './index.css';

export default class Footer extends Component{
    render(){
        return(
            <div className='main-footer'>
                <spam>Thready Systems &copy; 2018-2020 - "mudar o mundo começa mudando o mundo de quem está próximo" </spam>
                <img src={logo} alt=''/>
            </div>
        )
    }
}