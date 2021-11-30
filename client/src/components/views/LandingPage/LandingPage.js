import React from 'react'
import { FaCode } from "react-icons/fa";
import {useEffect,useState} from 'react';
import {API_URL,API_KEY} from '../../Config'
import MainImage from './Sections/MainImage';
import { IMAGE_BASE_URL } from '../../Config';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';
import { Fragment } from "react";
 
function LandingPage() {
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
       const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, [])

const fetchMovies = (endpoint) =>{
    fetch(endpoint) //axios랑 비슷함. get방식으로 주소에 요청 보내는거!!
    .then(response => response.json())
    .then(response => {
     setMovies([...Movies,...response.results]) //20개의 객체를 받는데 그것들을 복사해서 배열에 넣는다.
     setCurrentPage(response.page)
     setMainMovieImage(response.results[0])
    })
}


const loadMoreItems = () =>{
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`;
    fetchMovies(endpoint);
}
    return (
       <div style={{width:'100%',margin:'0'}}>
            {/*main Image */}
            {MainMovieImage &&
            <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title = {MainMovieImage.original_title}
            text = {MainMovieImage.overview}/>
            }
           <div style = {{width:'85%',margin:'1rem auto'}}>
               <h2>Movies by latest</h2>
               <hr/>  {/*수평선 태그 */}
           {/*grid card */}
           <Row gutter ={[16,16]}>
               {Movies && Movies.map((movie,index) =>( //map 은 자바스크립트 배열의 메소드! movie는 Movies배열의 각각의 element
                   <Fragment key={index}>
                       <GridCards 
                       landingPage
                       image ={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null} 
                       movieId = {movie.id}
                       movieName = {movie.original_title} />
                   </Fragment> //Fragment는 div태그로 감싸는 대신 사용해서 랜더링될때 쓸모없는div태그 사용 안해도 되게 해준다!
               ))}
           </Row>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <button onClick={loadMoreItems}>Load more</button>
            </div>
       </div>
    )
}

export default LandingPage
