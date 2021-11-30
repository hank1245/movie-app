import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import {Button} from 'antd'

function Favorite(props) {
     console.log(props.movieInfo)
    const movieId = props.movieId;
    const userFrom  = props.userFrom;
    const movieTitle = props.movieInfo.original_title;
    const moviePost = props.movieInfo.backdrop_path
    const movieRuntime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFarvorited] = useState(false)
    let variables = {
        userFrom:userFrom,
        movieId: movieId,
        movieTitle:movieTitle,
        moviePost:moviePost,
        movieRuntime:movieRuntime
    }
    useEffect(() => {
      Axios.post('/api/favorite/favoriteNumber',variables).then(response =>{
          if(response.data.success){
              setFavoriteNumber(response.data.favoriteNumber)
          }else {
              alert('숫자정보를 가져오는데 실패')
          }
      })
      Axios.post('/api/favorite/favorited',variables).then(response =>{
        if(response.data.success){
           setFarvorited(response.data.favorited)
        }else {
            alert('정보를 가져오는데 실패')
        }
    })
    }, [])

    const onClickFavorite = () =>{
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite',variables).then(response =>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber-1)
                    setFarvorited(!Favorited)
                }else{
                    alert('Favorite리스트에서 지우기 실패')
                }
            })
        }else{
            Axios.post('/api/favorite/addToFavorite',variables).then(response =>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber+1)
                    setFarvorited(!Favorited)
                }else{
                    alert('Favorite리스트 추가 실패')
                }
            })
        }
    }

    return (
        <div>
              <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"}{FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
