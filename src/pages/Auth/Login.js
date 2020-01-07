import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import loginicon from "../../image/loginicon.png";
import TextField from "@material-ui/core/TextField";
import Loader from '../Loader/Loader.js'
import Swal from "sweetalert2";
import Cryptr from "cryptr";
import "./login.css";
import { connect } from "react-redux";
import { login } from "../../Redux/acion/LoginAction.js";
const cryptr = new Cryptr("myTotalySecretKey");

const useStyles = makeStyles(theme => ({
  root: {
    height: 385,
    padding: "4px 9px",
    width: "80%",
    margin: "auto",
    marginTop: "42px"
  },
  close: {
    float: "left",
    fontSize: 22,
    margin: "0",
    width: "fit-content",
    textAlign: "left",
    fontWeight: 700,
    cursor: "pointer"
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    width: 140,
    height: 43
  },
  h2: {
    margin: "5px 0px",
    textAlign: "center"
  },
  btn: {
    textAlign: "center"
  },
  text: {
    width: "100%",
    fontSize: '23px !important'
  },
  Dialogroot: {
    margin: "8px !important"
  }
}));

function Login(props) {
  const classes = useStyles();

  let [State, setStateValues] = useState({
    email: "",
    password: "",
    open: false,
    Error_: "",
    openLoginLoddingPanel: false,
    loading: false
  });

  useEffect(() => {
    if (props.authData.LoginKey.length !== 0) {
      props.history.replace("/userhome");
    }
  }, [props]);

  function closeLoginHandle() {
    props.history.replace("/home");
  }

  function chnageTextHandle(key, e) {
    setStateValues({ ...State, [key]: e.target.value });
  }
  // function goToHome() {
  //   props.history.replace("/userhome");
  // }

  function loginHandleBtn() {
    let { email, password } = State;
    let userPassword = cryptr.encrypt(password);
    let loginKey = Math.random() * 10 + 1;
    let loginKey_ = cryptr.encrypt(loginKey);
    setStateValues({ ...State, openLoginLoddingPanel: true, loading: true });
    let params = {
      email,
      userPassword,
      loginKey_
    };
    props.login(params).then(res => {
      if (res.msg.msg === "Login Successfully") {
        setStateValues({
          ...State,
          openLoginLoddingPanel: false,
          loading: false
        });

        props.history.replace("/userhome");
      } else {
        setStateValues({
          ...State,
          openLoginLoddingPanel: false,
          loading: false
        });
        Swal.fire(res.msg.msg);
      }
    });
  }

  return (
   
    <div className="" style={{ width: "100%" }}>
      <Paper className={classes.root}>
        <p onClick={closeLoginHandle} className={classes.close}>
          X
        </p>
        <div className="login-icon">
          <img src={loginicon} alt='pic'/>
        </div>
        <h3 className={classes.h2}>Login </h3>
        <TextField
          className={`${classes.text} textbox`}
          label="Email"
          type="email"
          autoComplete="current-password"
          margin="normal"
          value={State.email}
          onChange={e => chnageTextHandle("email", e)}
        />
        <TextField
          className={classes.text}
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          value={State.password}
          onChange={e => chnageTextHandle("password", e)}
        />
        <p className={classes.btn}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={loginHandleBtn}
          >
            Login
          </Button>
        </p>
        <p style={{ color: "red" }}>{State.Error_}</p>
      </Paper>
      <Loader openLoaderPanel={State.openLoginLoddingPanel} openLoader={State.loading} />

    </div>
  );
}
const mapStateToProps = state => {
  return {
    authData: state.authData.Auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
