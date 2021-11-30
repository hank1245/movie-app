import React from 'react';

function MainImage(props){ //컴포넌트가 받는 prop들은 전부다 argument로 온다. 객체일것이고 복사한다면 {...props}가 될것이다. 이게 정체!!
    //근데 functional component의 인자는 상위 컴포넌트에서 넣은 props도 있지만 그거말고도 req처럼 여러가지 들어있다. props자체는 예약어가 아니지만 path,url,params 등등 정보들 다 들어있다.
    return (
    <div style = {{
        background: `linear-gradient(to bottom, rgba(0,0,0,0)
        39%,rgba(0,0,0,0)
        41%,rgba(0,0,0,0.65)
        100%),
        url('${props.image}'), #1c1c1c`,
            height: '500px',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center',
            width: '100%',
            position: 'relative'
    }}>
        <div>
            <div style={{position:'absolute',maxWidth:'500px',bottom:'2rem',marginLeft:'2rem'}}>
                <h2 style={{color:'white'}}>{props.title}</h2>
                <p style={{color:'white',fontSize:'1rem'}}>{props.text}</p>
            </div>
        </div>
    </div>    
    )
}

export default MainImage