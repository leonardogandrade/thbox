import React,{Component} from 'react';
import {Carousel} from 'react-bootstrap';

import './index.css';

import slide1 from '../../img/movies/galaxy.png';
import slide2 from '../../img/movies/walking_dead.png';
import slide3 from '../../img/movies/aladdin.png';
import slide4 from '../../img/movies/soltos_florida.png';

export default class ActionCarousel extends Component{
    render(){
        return(
            <div className='main-carousel'>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={slide1}
                            alt="First slide"
                        />
                        {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={slide2}
                            alt="First slide"
                        />
                        {/* <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={slide3}
                            alt="First slide"
                        />
                        {/* <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={slide4}
                            alt="First slide"
                        />
                        {/* <Carousel.Caption>
                        <h3>Fourth slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                </Carousel>                
            </div>
        )
    }
}