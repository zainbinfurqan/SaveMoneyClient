import React, { useEffect, useSate } from 'react';
import './WebHome.css';
import Paper from "@material-ui/core/Paper";
import right_arrow from '../../image/Right-Arrow.png'
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import menu_icon from '../../image/menu-icon.png'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 2),
        // margin: "25px 5px",
        height: 90,
        width: "100%",
        margin: "auto",
        // marginTop: "30px"

    },
}))
function WebHome(props) {
    const classes = useStyles();
    // let [Stats_, SetState__] = useSate({
    //     text: '',
    //     isDeleting: false,
    //     loopNum: 0,
    //     typingSpeed: 150
    // })

    useEffect(() => {
        console.log(props)
    })
    function openMenuHandle() {
        props.history.replace('/userhome');

    }

    function loginHandle() {
        props.history.replace('/home');

    }
   


    return (
        <div className="row Webhome-container">
            <div className='header'>
                <div className='header-sub'>

                    {!props.AuthData.Auth.LoginKeyFlag &&
                        <button type="button" class="btn loginbtn" onClick={loginHandle}>
                            login
                      </button>
                    }
                    {props.AuthData.Auth.LoginKeyFlag &&
                        <div>
                            <img src={menu_icon} onClick={openMenuHandle} />
                            <p className='menu'>Menu</p>
                        </div>
                    }
                </div>
            </div>
            <div className="intro-main">
                <div class="flex">
                    <span>{this.state.text}</span>
                    <p class="header-sub-title blink">|</p>
                </div>
                {/* <img src={intro} /> */}
            </div>
            <div className='intro-sub-main'>
                <div className='into-sub-left'></div>
                <div className='into-sub-right'></div>
            </div>
            <div className='info-tabs'>
                <Paper className={classes.root}>
                    <p>How To Use<img src={right_arrow} />  </p>
                    <p><img src={right_arrow} />Donate Us  </p>
                    <p><img src={right_arrow} />Report A Bug  </p>
                </Paper>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        AuthData: state.authData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // login: data => dispatch(login(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WebHome);