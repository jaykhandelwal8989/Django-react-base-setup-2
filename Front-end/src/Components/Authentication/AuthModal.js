import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme)=>({
    root:{
        maxWidth:'300px',
        textAlign:'center',
    },
    overview:{
        padding:'0.8rem',
        '& p':{
            color:'#38383897'
        }
    },
    btn:{
        borderTop:'1px solid #83838355'
    }
}))

const RegistrationErrorDialogBox = (props) => {
    const classes = useStyles();
    
    return(
        <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >  
        <div className={classes.root}>
            {props.children}
        </div>
        </Dialog>
        );
}


export default RegistrationErrorDialogBox;