import React,{Component} from 'react';
//import {Carousel} from 'react-bootstrap'; 
import './index.css'
import api from '../../services/api';   
import logoMajicBox from '../../img/majicbox_2020.png';
import CarouselCategory from '../../components/CarouselCategory';
import HighlightCarousel from '../../components/HighlightCarousel';
// import Footer from '../../components/Footer';

// import mp4Img from '../../img/mp4.png';
// import jpgImg from '../../img/jpg.png';
// import pdfImg from '../../img/pdf.png';

export default class Search extends Component{

    state = {
        docs : [],
        page : 1,
        search : '',
        info : [],
        ext : ''
    }

    async componentDidMount(){
        //this.loadData_();
    }

    loadData = async(page=1) =>{
        const response = await api.get(`/api/doc/${this.state.search}`);
        this.setState({
            docs : response.data,
        });
    }

    handleOnChange = event =>{
        this.setState({ search : event.target.value});
    }

    handleSubmit = async event =>{
        event.preventDefault();
        this.setState({isSubmitted :true});
        if(this.state.search){
            this.loadData();
        }
    }

    nextPage = () =>{
        const {page,info} = this.state;
        if(page === info.pages) return;

        const pageNumber = page+1;
        this.loadData(pageNumber);
    }


    prevPage = () =>{
        const {page} = this.state;
        if(page === 1) return;

        const pageNumber = page -1;
        this.loadData(pageNumber);
    }

    render(){
        //const {page,docs} = this.state;
        return(
            <div className='main-container'>
                
                <div className='main-header'>
                    <div className='header_'>
                        <img className='logo' alt='' src={logoMajicBox}/>

                        <form onSubmit={this.handleSubmit}>              
                            <input className='search'
                                type='text' 
                                name='search' 
                                onChange = {this.handleOnChange}
                                value={this.state.search}
                                placeholder='digite sua pesquisa...'/>
                            <input type='submit' hidden/>
                        </form>                          
                    </div>
                </div>

                <div className='resultList'>

                <HighlightCarousel/>
                <CarouselCategory category={'Ação'}/>
                <CarouselCategory category={'Romance'}/>

                    {/* {this.state.docs.map(docsRes =>
                        <article className='card' key={docsRes._id}>
                            {
                                (docsRes.image).match('jpg') && <img src={jpgImg} alt=''/>
                            }
                            {
                                (docsRes.image).match('pdf') && <img src={pdfImg} alt=''/>
                            }
                            {
                                (docsRes.image).match('mp4') && <img src={mp4Img} alt=''/>
                            }
                            <div className='text'>
                                <a href={`/detail/${docsRes._id}`} className='title'> {docsRes.title}</a>
                                <div className='info'> {docsRes.info}</div>
                            </div>
                        </article>    
                    )} */}
               </div>
                <div className='actions'>
                    {/* <button disabled={page===1}onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === docs.pages} onClick={this.nextPage}>Próximo</button> */}
                </div>

                {/* <Footer/> */}
            </div>
        )
    }
}