import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import RoomIcon from '@material-ui/icons/Room';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import axiosInstance from "../Axios";
import hero from '../Assets/hero.jpg';

const useStyles = makeStyles((theme) => ({
    home_root:{
        width:'100%',
    },
    home_content:{
        height: '400px',
        background:`url(${hero})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        position: 'relative',
        marginBottom: '60px',
        zIndex: 2,
    },
    overlay:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        
        background:'rgba(106,90,205, 0.6)',
    },
    home_info:{
        fontSize: '55px',
        color: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 5,
    },
    searchLoc:{
        width:'100%',
        maxWidth:'550px',
        height:'120px',
        padding:'0.5rem 0.4rem',
        background:'white',
        zIndex:100,
        position:'absolute',
        left:'50%',
        bottom:'-60px',
        transform: 'translateX(-50%)',
      //  boxShadow: '20px 20px 50px 10px rgba(0,0,0,0.4) inset',
    },
    search_field:{
        padding:'0.6rem 0.5rem',
    },
    search_btns:{
        padding:'0.6rem 0.5rem',
        display:'flex',
        justifyContent:'space-around',
        '& btn1':{
            flex:2,
           // width:'33%',
            margin:'0.3rem',
        },
        '& btn2':{
            flex:2,
          //  width:'33%',
            margin:'0.3rem',
        },
        '& btn3':{
            flex:1,
          //  width:'25%',
            margin:'0.3rem',
        }
    }
}));

const Home = (props) => {
    const classes = useStyles();
    
    useEffect(()=>{
        const url = 'accounts/';
        axiosInstance.get(url)
        .then(resp=>{
            console.log(resp.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [])
    return(
        <>
            <section className={classes.home_content}>
                <div className={classes.home_info}>
                    Find a event
                </div>
                <div className={classes.searchLoc}>
                    <TextField
                            className={classes.search_field}
                            id="input-with-icon-textfield"
                            placeholder='Search by location, city or state'
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <RoomIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                    <div className={classes.search_btns}>
                        <Button variant="contained" color="primary" style={{width:'35%'}} className={classes.btn1}>
                            search
                        </Button>
                        <Button variant="outlined" color="primary" style={{width:'35%'}} className={classes.btn2}>
                            reset
                        </Button>
                        <Button variant="outlined" color="primary" style={{width:'25%'}} className={classes.btn3}>
                            map view
                        </Button>
                    </div>
                </div>
                <div className={classes.overlay}></div>
            </section>
            <section className={classes.sec_2}>
                
            </section>
        </>
        );
};

const mapStateToProps = state => {
    return{
        atoken:state.auth.atoken
    };
};

export default connect(mapStateToProps)(Home);
