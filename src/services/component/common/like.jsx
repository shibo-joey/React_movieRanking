import React from 'react';


const Like = (props) => {
 
        let icon = "fa fa-heart";
        if (!props.liked === true) 
            icon += "-o";
        return ( <i 
            onClick = {props.onClick} 
            style = {{cursor : "pointer"}}
            className= {icon} 
            aria-hidden="true"></i> )};
    
 

 
export default Like ;