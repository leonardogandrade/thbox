import React,{Component} from 'react';
import {Carousel} from 'react-bootstrap';
import './index.css';

import t1 from '../../img/movies/T1.png';
import t2 from '../../img/movies/T2.png';
import t3 from '../../img/movies/T3.png';
import t4 from '../../img/movies/T4.png';
import t5 from '../../img/movies/T5.png';
import t6 from '../../img/movies/T6.png';
import t7 from '../../img/movies/T7.png';
import t8 from '../../img/movies/T8.png';

export default class ActionCarousel extends Component{
    render(){
        return(
            <div className='main'>
                <spam>Ação</spam>
                <Carousel className='carousel'
                indicators={false}>
                    <Carousel.Item>
                        <div className='row'>
                            <div className='col'>
                                <a href='/'><img
                                    className="d-block w-100"
                                    src={t1}
                                    alt="First slide"
                                /></a>
                            </div>
                            <div className='col'>
                            <a href='/'><img
                                    className="d-block w-100"
                                    src={t2}
                                    alt="First slide"
                                /></a>
                            </div>
                            <div className='col'>
                            <a href='/'><img
                                    className="d-block w-100"
                                    src={t3}
                                    alt="First slide"
                                /></a>
                            </div>
                            <div className='col'>
                            <a href='/'><img
                                    className="d-block w-100"
                                    src={t4}
                                    alt="First slide"
                                /></a>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='row'>
                            <div className='col'>
                            <a href='/'><img
                                    className="d-block w-100"
                                    src={t5}
                                    alt="First slide"
                                /></a>
                            </div>
                            <div className='col'>
                            <a href='/'><img
                                    className="d-block w-100"
                                    src={t6}
                                    alt="First slide"
                                /></a>
                            </div>
                            <div className='col'>
                            <a href='/'><img
                                    className="d-block w-100"
                                    src={t7}
                                    alt="First slide"
                                /></a>
                            </div>
                            <div className='col'>
                            <a href='/'><img
                                    className="d-block w-100"
                                    src={t8}
                                    alt="First slide"
                                /></a>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}