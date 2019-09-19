import React from "react";



const Card = (props) => {
        console.log("MY POOPS",props)
        return props.list.map(item =>(
        <div key={Math.random(10000000)} class="card card2">
            <div class="card-header">
                {item.subscription}
                
            </div>
            <div class="card-body test">
                {item.plan}
            </div >
        </div>
        )) 
}


export default Card;