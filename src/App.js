import React, { useEffect, useState } from "react";
import "./App.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import WithLoginHeader from './pages/Header/WithLoginHeader.js'
import WithlogoutHeader from "./pages/Header/WithlogoutHeader";



function App(props) {
  let [mobileView] = useState(false);
  let [loginCheckKey, setLoginKey] = useState('')
  useEffect(() => {
    if (props.AuthData.Auth.LoginKeyFlag === false) {
      setLoginKey({ loginCheckKey: false })
    } else {
      setLoginKey({ loginCheckKey: true })
    }
  },[])

  return (
    <div className="App">
      {loginCheckKey === true ? (<WithLoginHeader />) : (<WithlogoutHeader />)}
      <Dialog
        open={mobileView}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h2>This Web App Only For Mobile View</h2>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    AuthData: state.authData
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
