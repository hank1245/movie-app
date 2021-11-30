import React,{useEffect,useState, Fragment} from 'react'
import {API_URL,API_KEY,IMAGE_BASE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import {Row} from 'antd'

function MovieDetail(props) {
    let movieId = props.match.params.movieId  //props.match가 createServer req같은것!
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [actorToggle, setactorToggle] = useState(false)
useEffect(() => {
    let endpointCrew =`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
    fetch(endpointInfo).then(response => response.json())
    .then(response =>{
        console.log(response)
        setMovie(response)
    })

    fetch(endpointCrew).then(response => response.json())
    .then(response =>{
        setCasts(response.cast)
    })
    
},[]) //끝에 배열 없으면 미친듯이 계속 실행함 ㅜㅜㅜ!

const toggleActorView = () =>{
    setactorToggle(!actorToggle)
}
    return (
        <div>
            {/*Header */}
        <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title = {Movie.original_title}
            text = {Movie.overview}/>
            {/*Body */}
            <div style = {{width:'50%',margin:'1rem auto'}}>
                {/*Movie Info */}
                <MovieInfo movie = {Movie}/>
                <br/>

            <div style ={{display:'flex',justifyContent:'center',margin:'2rem'}}>
                <button onClick={toggleActorView}>Toggle Actor View</button>
            </div>

        {actorToggle &&
            <Row gutter ={[16,16]}>
               {Casts && Casts.map((cast,index) =>( //map 은 자바스크립트 배열의 메소드! movie는 Movies배열의 각각의 element
                   <Fragment key={index}>
                       <GridCards 
                       image ={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null} 
                       characterName = {cast.name} />
                   </Fragment> //Fragment는 div태그로 감싸는 대신 사용해서 랜더링될때 쓸모없는div태그 사용 안해도 되게 해준다!
               ))}
           </Row>

        }
            </div>
        </div>
    )
}

export default MovieDetail
