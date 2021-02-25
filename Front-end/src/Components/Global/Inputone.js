import React from 'react';

const Inputone = (props) => {
    return(
        <>
        <input className='linput' type={props.type || "text"} required={props.required || true} value={props.value} onChange={props.onChange} name={props.name}/>
        <div class="underline"></div>
        <label>{props.label}</label>
        </>                      
        );
};

export default Inputone;