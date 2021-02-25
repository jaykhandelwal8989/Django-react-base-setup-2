import React from 'react';
import Loader from "react-loader-spinner";

const FormLoader = () => {
    return(
        <Loader
        width={20}
        height={20}
        type='TailSpin'
        color='black'
        />        
        )
}

export default FormLoader;