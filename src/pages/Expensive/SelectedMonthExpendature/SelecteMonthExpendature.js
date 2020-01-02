import React, { useState } from "react";
import "./SelecteMonthExpendature.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { getselectedmonthstatus } from "../../../Redux/acion/ExpendatureAction.js";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const useStyles = makeStyles(theme => ({

  close: {
    float: "left",
    cursor: "pointer",
    margin: "0",
    width: "fit-content",
    textAlign: "left",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: '8px',
    marginBottom: '6px'
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    width: 100
  }
}));

function SelecteMonthExpendature(props) {
  const classes = useStyles();

  let [_States, SetValues] = useState({
    SelectedMonth: "",
    StausData: [],
    TotalAmmount: "",
    openLoginLoddingPanel: false,
    loading: false
  });

  function closeSelectedExpendatureHanlde() {
    props.history.replace("/userhome");
  }

  function selectMnthHandle(key, e) {
    SetValues({ ..._States, SelectedMonth: e.target.value });
  }

  function getSelectedMonthStatus() {
    if (_States.SelectedMonth) {
      SetValues({ ..._States, openLoginLoddingPanel: true, loading: true });
      let params = {
        month: _States.SelectedMonth,
        loginKey: props.AuthData.Auth.LoginKey,
        Email: props.AuthData.Auth.Email
      };
      props.getselectedmonthstatus(params).then(res => {
        if (res.status) {
          SetValues({
            ..._States,
            StausData: res[0],
            TotalAmmount: res[1][0].TotalMoney,
            openLoginLoddingPanel: false,
            loading: false
          });
        } else {
          Swal.fire("no data found")
          SetValues({ ..._States, openLoginLoddingPanel: false, loading: false });

        }
      });
    }

  }
  return (
    <div className="">
      <div style={{ height: '40px', padding: '5px', width: 'fit-content' }} onClick={closeSelectedExpendatureHanlde}>
        <i className="fas fa-caret-left" style={{ float: 'left', margin: '0px 0px 0px 5px', fontSize: '23px' }} />
        <p style={{ width: 'fit-content', margin: '1px', float: 'left', fontSize: '15px' }}>Back</p>
      </div>

      <div className='container'>
        <select
          name="selectOption"
          placeholder="Select Expendature"
          onChange={e => selectMnthHandle("selectOption", e)}
        >
          <option
            value=""
            disabled={true}
            selected={true}
            style={{ color: "white" }}
          >
            Select Month
        </option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={getSelectedMonthStatus}
        >
          Fetch Data
      </Button>
        <div>
          <table className="statusTable table-striped">
            <thead>
              <tr>
                <td>Expendature Name</td>
                <td>Expendature</td>
                <td>Date</td>
              </tr>
            </thead>
            <tbody>
              {_States.StausData.map(items => {
                return (
                  <tr>
                    <td>{items.ExpendatureName}</td>
                    <td>
                      {items.Date}-{items.Month}-{items.Year}
                    </td>
                    <td>{items.Money}</td>
                  </tr>
                );
              })}
              <tr className="totalmoney-tr">
                <td>Total</td>
                <td></td>
                <td>{_States.TotalAmmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        open={_States.openLoginLoddingPanel}
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
              loading={_States.loading}
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
    getselectedmonthstatus: data => dispatch(getselectedmonthstatus(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelecteMonthExpendature);
