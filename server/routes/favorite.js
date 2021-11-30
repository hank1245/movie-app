const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite')
//react에서는 import node에서는 require



router.post('/favoriteNumber',(req,res) =>{ //클라 Favorite에서 보낸 정보를 req로 받는다! bodyparser때문에 post정보들이 req.body에 있다.
//mongoDB에서 Favorite숫자 가져오기
//Favorite모델 안에서 전달받은 movieId를 가진 document를 찾아서 거기 추가된 favorite누른 유저들의 length만 가져오면 몇명인지 알 수 있다.
Favorite.find({"movieId":req.body.movieId}).exec((err,info)=>{ //exec은 일반 콜백이랑 비슷한것
    if(err) return res.status(400).send(err)
//프론트에 숫자정보 보내주기
    res.status(200).json({success:true, favoriteNumber:info.length})

    })
})

router.post('/favorited',(req,res) =>{ 
    Favorite.find({"movieId":req.body.movieId,"userFrom":req.body.userFrom}).exec((err,info)=>{ //exec은 일반 콜백이랑 비슷한것
        if(err) return res.status(400).send(err)
        let result = false;
        if(info.length !== 0 ){
            result = true
        }
    //프론트에 숫자정보 보내주기
        res.status(200).json({success:true, favorited:result})
    
        })
    })

router.post('/removeFromFavorite',(req,res) =>{ 
   Favorite.findOneAndDelete({movieId:req.body.movieId,userFrom:req.body.userFrom}).exec((err,doc) =>{
       if(err) return res.status(400).send(err)
       res.status(200).json({success:true,doc})
   })
    })

router.post('/addToFavorite',(req,res) =>{
    const favorite = new Favorite(req.body)  //favorite모델 이용해서 document instance 생성
    console.log(req.body)
    favorite.save((err,doc) =>{//Favorite 모델 안에 favorite document 생성
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true})
     }) 
    })
        
router.post('/getFavoredMovie',(req,res) =>{
    Favorite.find({'userFrom':req.body.userFrom}).exec((err,favorites) =>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true,favorites})
    })
    })

router.post('/removeFromFavorite',(req,res) =>{
    Favorite.findOneAndDelete({'userFrom':req.body.userFrom, 'movieId':req.body.movieId}).exec((err,doc) =>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true, doc})
    })
    })

module.exports = router;
