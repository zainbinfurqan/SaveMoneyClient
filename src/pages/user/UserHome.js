import React, { useState, useEffect } from "react";
import "./userhome.css";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import currentStatusIcon from "../../image/currentstatus.png";
import Paper from "@material-ui/core/Paper";
import settingicon from "../../image/setting.png";
import compaericon from "../../image/compaericon.png";
import selectmonth from "../../image/selectmonth.png";
import expendaturedetails from "../../image/expendaturedetails.png";
import addexpendature from "../../image/addexpendature.png";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 2),
    margin: "25px 5px"
  }
}));
function UserHome(props) {
  const classes = useStyles();
  let [_loginKey_, setLoginKey] = useState(false);


  function openAddExpendature() {
    props.history.replace("/addexpensive");
  }

  function openMonthStatus() {
    props.history.replace("/user/monthStatus");
  }

  function openExpendatureDetailHandle() {
    props.history.replace("/user/expendaturedetail");
  }

  function openSelectedMonthStatusHandle() {
    props.history.replace("/user/selectmonth");
  }
  function openSettingHandle() {
    props.history.replace("/user/setting");
  }
  function openPDFgenerateHandle() {
    props.history.replace("/user/PDFgenerate");

  }

  useEffect(() => {
    if (props.AuthData.Auth.LoginKeyFlag === _loginKey_) {
      props.history.replace("/home");
    } else {
    }

  });

  return (
    props.AuthData.Auth.LoginKeyFlag && (
      <div className="">
        <div className='container'>
          <Paper className={classes.root} onClick={openMonthStatus}>
            <Typography variant="p" component="p">
              Current Month Status
            <img src={currentStatusIcon} />
            </Typography>
          </Paper>
          <Paper className={classes.root} onClick={openAddExpendature}>
            <Typography variant="p" component="p">
              Add Expensive
            <img src={addexpendature} />
            </Typography>
          </Paper>

          <Paper className={classes.root} onClick={openExpendatureDetailHandle}>
            <Typography variant="p" component="p">
              Expentature Details
            <img src={expendaturedetails} />
            </Typography>
          </Paper>
          <Paper className={`${classes.root} disable`} onClick={openPDFgenerateHandle}>
            <Typography variant="p" component="p">
              Generate Report
              <i className='fa fa-file-pdf' style={{
                float: 'right',
                margin: '0px',
                height: '20px',
              }} />
            </Typography>
          </Paper>
          <Paper className={classes.root} onClick={openSelectedMonthStatusHandle}>
            <Typography variant="p" component="p">
              Selected Month Status
            <img src={selectmonth} />
            </Typography>
          </Paper>

          <Paper className={classes.root} onClick={openSettingHandle}>
            <Typography variant="p" component="p">
              Setting
            <img src={settingicon} />
            </Typography>
          </Paper>
          <Paper className={`${classes.root} disable`} onClick={openSelectedMonthStatusHandle}>
            <Typography variant="p" component="p">
              Custom List
              <i className='fa fa-list-alt' style={{
                float: 'right',
                margin: '0px',
                height: '20px',
              }} />
            </Typography>
          </Paper>
          <Paper className={`${classes.root} disable`}>
            <Typography variant="p" component="p">
              Comparision
            <img src={compaericon} />
            </Typography>
          </Paper>
        </div>
      </div>
    )
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
)(UserHome);
