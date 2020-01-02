import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../Redux/acion/LoginAction.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ClipLoader from "react-spinners/ClipLoader";
import profil_icon from '../../image/profile-icon.jpg'
import { css } from "@emotion/core";
import NetConnection from '../../utilfunction/NetConnection.js'
import "./header.css";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function Header(props) {
  let [loginFlag, setFlag] = useState(false);
  let [open, setOpen] = useState(false);
  let [Stats_, setState_] = useState({
    openLoginLoddingPanel: false,
    loading: false,
  });

  useEffect(() => {
console.log(props)
    console.log(NetConnection())
    window.addEventListener("resize", () => {

      if (window.innerWidth > 768) {

        setOpen({ open: true });
      } else {
        setOpen((open = false));
      }
    });
  });
  useEffect(() => {
    if (props.AuthData.Auth.LoginKey !== "") {

      setFlag((loginFlag = true));
    } else {
      setFlag((loginFlag = false));
    }
  });

  function logoutHandle() {
    setState_({ ...Stats_, openLoginLoddingPanel: true, loading: true });

    let params = {
      loginKey: props.AuthData.Auth.LoginKey
    };
    props.logout(params).then(() => {
      logoutRout();
    });
  }

  function loginHandle(){
  }

  function logoutRout() {
    setState_({ ...Stats_, openLoginLoddingPanel: false, loading: false });

  }

  return (
    <div className="row header_main">
      <div className="header">
        {loginFlag && (
          <div>
            <button type="button" class="btn logout-btn" onClick={logoutHandle}>
              LogOut
            </button>
            <img src={profil_icon} className='porfile-logo' />
            <p className="wellcome-text">{props.AuthData.Auth.userName}</p>
          </div>
        )}
        {!loginFlag && <p className="header-Title">
          <p>Save Ur Money</p>
        </p>}
      </div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This web app is currently only for mobile/table view
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={Stats_.openLoginLoddingPanel}
        className="loder-main"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={Stats_.loading}
            />
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
    logout: data => dispatch(logout(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
