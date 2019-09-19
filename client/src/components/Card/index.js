import React from "react";



const Card = (props) => {
        return props.list.map(item =>(
        <div class="card card2">
            <div class="card-header">
                {item}
            </div>
            <div class="card-body test">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            </div>
        </div>
      ))
}


export default Card;