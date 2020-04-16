import React,{Component} from 'react';
import {Carousel} from 'react-bootstrap';
import './index.css';
import api from '../../services/api.js';

export default class CarouselCategory extends Component{

    state = {
        content : [],
        category : this.props.category,
    }

    componentDidMount = async() => {
        const response = await api.get(`/api/cat/${this.state.category}`);
        //console.log(response.data.docs);
        await this.setState({content : response.data});
    }

    render(){
        const firstCarousel = this.state.content.slice(0,4);
        const secondCarousel = this.state.content.slice(4,8);
        return(
            <div className='main'>
                <span>{this.state.category}</span>
                <Carousel className='carousel'
                indicators={false}>
                    <Carousel.Item>
                            <div className='row'>
                                {firstCarousel.map((data,index,array) =>(
                                <div key={data._id} className='col'>
                                    <a href={`${process.env.REACT_APP_BACKEND}/media/${data.video}`}><img
                                        className="d-block w-100"
                                        src={`${process.env.REACT_APP_BACKEND}/files/${data.image}`}
                                        alt=''
                                    /></a>
                                </div>
                                ))}
                            </div>
                    </Carousel.Item>
                    <Carousel.Item>
                            <div className='row'>
                                {secondCarousel.map((data,index,array) =>(
                                <div key={data._id} className='col'>
                                    <a href={`${process.env.REACT_APP_BACKEND}/media/${data.video}`}><img
                                        className="d-block w-100"
                                        src={`${process.env.REACT_APP_BACKEND}/files/${data.image}`}
                                        alt=''
                                    /></a>
                                </div>
                                ))}
                            </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
