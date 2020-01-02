import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FetchUtil } from "../../utilfunction/FetchUtils.js";
import signup from "../../image/signup.png";
import { appendQueryParams } from "../../utilfunction/UrlUtils.js";
import Swal from "sweetalert2";
import Cryptr from "cryptr";
import Loader from "../Loader/Loader.js";
import "./signup.css";

const cryptr = new Cryptr("myTotalySecretKey");

const useStyles = makeStyles(theme => ({
  root: {
    height: 385,
    margin: "auto",
    padding: "24px 16px",
    width: "80%",
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
  text: {
    width: "100%"
  },
  btn: {
    textAlign: "center"
  }
}));

export default function SignUp(props) {
  const classes = useStyles();

  let [State, setStates] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    open: false,
    Error: "",
    format_1: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    openLoginLoddingPanel: false,
    loading: false
  });

  function closeSignUpHandle() {
    props.history.replace("/home");
  }

  function chnageTextHandle(key, e) {
    setStates({ ...State, [key]: e.target.value });
  }

  useEffect(() => {
    setStates({ ...State, open: props.open });
  }, []);

  function registerHandleBtn() {
    let { userName, userEmail, userPassword } = State;

    var mailformat = State.format_1;
    var nameFormat = /^[A-Za-z]+$/;
    if (userName.length < 3 && !userName.match(nameFormat)) {
      setStates({ ...State, Error: "name formate is invalid" });
    } else {
      if (!userEmail.match(mailformat)) {
        setStates({ ...State, Error: "email formate wrong" });
      } else {
        if (userPassword.length <= 5) {
          setStates({ ...State, Error: "password more then 5 characters" });
        } else {
          setStates({ ...State, Error: "" });
          setStates({ ...State, openLoginLoddingPanel: true, loading: true });

          let password = cryptr.encrypt(userPassword);
          let params = {
            userName,
            userEmail,
            password
          };
          return new Promise((resolve, reject) => {
            FetchUtil({
              url: appendQueryParams(`/user/registration`),
              method: "POST",
              body: JSON.stringify({
                params
              }),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(res => {
                Swal.fire(`User ${res[0].msg}`);
                if (res[0].msg !== "Alreay Exist") {
                  setStates({
                    ...State,
                    openLoginLoddingPanel: false,
                    loading: false
                  });

                  setStates({ userName: "", userEmail: "", password: "" });
                  props.history.replace("/login");
                } else {
                  Swal.fire(res[0].msg);
                  setStates({
                    ...State,
                    openLoginLoddingPanel: false,
                    loading: false
                  });
                }
              })
              .catch(err => {
                reject({ message: err });
              });
          });
        }
      }
    }
  }
  return (
    <div className="" style={{ width: "100%" }}>
      <Paper className={classes.root}>
        <p onClick={closeSignUpHandle} className={classes.close}>
          X
        </p>
        <div className="signup-icon">
          <img src={signup} />
        </div>
        <h3 className={classes.h2}>SignUp </h3>
        <TextField
          className={classes.text}
          id="standard-password-input"
          label="UserName"
          type="email"
          value={State.userName}
          autoComplete="current-password"
          margin="normal"
          onChange={e => chnageTextHandle("userName", e)}
        />
        <TextField
          className={classes.text}
          id="standard-password-input"
          label="Email"
          type="email"
          value={State.userEmail}
          autoComplete="current-password"
          onChange={e => chnageTextHandle("userEmail", e)}
          margin="normal"
        />
        <TextField
          className={classes.text}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={e => chnageTextHandle("userPassword", e)}
          margin="normal"
          value={State.userPassword}
        />
        <p className={classes.btn}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={registerHandleBtn}
          >
            SignUp
          </Button>
        </p>
        <p>{State.Error}</p>
      </Paper>
      <Loader
        openLoaderPanel={State.openLoginLoddingPanel}
        openLoader={State.loading}
      />

    </div>
  );
}
