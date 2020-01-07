import React, { useState, useEffect,useCallback } from "react";
import { connect } from "react-redux";
import { getcurrentmonthstatus } from "../../Redux/acion/CurrentMonthStatusAction.js";
import "./addexpensive.css";
import Loader from "../Loader/Loader.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { deleteexpendature } from "../../Redux/acion/ExpendatureAction.js";
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    width: 100
  },
  close: {
    float: "left",
    cursor: "pointer",
    margin: "0",
    width: "fit-content",
    textAlign: "left",
    fontWeight: 700,
    fontSize: "19px",
    marginTop: "8px"
  }
}));

function ExpendatureDetails(props) {
  const classes = useStyles();

  let [State_, setValues] = useState({
    StausData: [],
    openUpdate: false,
    deletePanel: false,
    deleteArray: [],
    loading: false,
    openLoginLoddingPanel: false,
    View: false,
    delete: false,
  });
  // function getData() {
  //   let params = {
  //     loginKey: props.authData.LoginKey,
  //     email: props.authData.Email
  //   };
  //   setValues({ ...State_, loading: true });
  //   setValues({ ...State_, openLoginLoddingPanel: true, loading: true });

  //   props.getcurrentmonthstatus(params).then(res => {
  //     setValues({
  //       ...State_,
  //       deletePanel: false,
  //       StausData: res[0],
  //       loading: false,
  //       openLoginLoddingPanel: false,
  //     });
  //   });
  // }
  const memoizedCallback = useCallback(
    () => {
      // getData();
      let params = {
        loginKey: props.authData.LoginKey,
        email: props.authData.Email
      };
      setValues({ ...State_, loading: true });
      setValues({ ...State_, openLoginLoddingPanel: true, loading: true });
  
      props.getcurrentmonthstatus(params).then(res => {
        setValues({
          ...State_,
          deletePanel: false,
          StausData: res[0],
          loading: false,
          openLoginLoddingPanel: false,
        });
      });
    },
    [State_,props],
  );
  useEffect(() => {
    if (props.authData.LoginKeyFlag !== false) {
      
    } else {
      props.history.replace("/home");
    }
  }, [props]);
  useEffect(() => {
    if (props.authData.LoginKeyFlag !== false) {
    } else {
      props.history.replace("/home");
    }
  });

  // function openUpdatePanelHandle() {
  //   setValues({ ...State_, openUpdate: true });
  // }
  

  function openDeletehandle(values) {

    setValues({ ...State_, deletePanel: true, deleteArray: values, delete: true });
  }

  function cancleDeleteHandle() {
    setValues({ ...State_, deletePanel: false, View: false, delete: false });
  }
  function openViewhandle(values, flage) {
    setValues({
      ...State_,
      deletePanel: true,
      deleteArray: values,
      View: flage
    });
  }

  function closeExdendDetailHandle() {
    props.history.replace("/userhome");
  }

  function deleteHandle() {
    let array_obj = State_.deleteArray;
    setValues({ ...State_, openLoginLoddingPanel: true, loading: true });
    let params = {
      array_obj,
      loginKey: props.authData.LoginKey,
      Email: props.authData.Email
    };
    props.deleteexpendature(params).then(res => {
      setValues({
        ...State_,
        deletePanel: false,
        deleteArray: "",
        openLoginLoddingPanel: false,
        loading: false
      });
      Swal.fire(res[0].msg);
      memoizedCallback();
    });
  }

  return (
    <div className="">
      <div style={{ height: '40px', padding: '5px', width: 'fit-content' }} onClick={closeExdendDetailHandle}>
        <i className="fas fa-caret-left" style={{ float: 'left', margin: '0px 0px 0px 5px', fontSize: '23px' }} />
        <p style={{ width: 'fit-content', margin: '1px', float: 'left', fontSize: '15px' }}>Back</p>
      </div>
      <div className='expendature-detail'>
        {State_.StausData.map(items => {
          return (
            <>
              <div style={{color: 'black'}} className="d-flex alert alert-primary p-0  border border-secondary rounded h-75 d-inline-block my-3">
                <div className='mr-auto p-2 align-self-start h-75'>
                  <p className="expendature-name">
                    {items.ExpendatureName.length >= 15
                      ? 
                      `${items.ExpendatureName.substr(0, 5)}... ${items.Date}`
                      : (`${items.ExpendatureName} (${items.Date} ${items.Month} ${items.Year})`)
                    }
                  </p>
                </div>
                <div className=' d-flex p-2 w-25 align-self-end h-75'>
                  <div className="p-2">
                    <span
                      className="glyphicon glyphicon-trash"
                      onClick={() => openDeletehandle(items, true)}
                    ></span>
                  </div>
                  <div className="p-2">
                    <span
                      className="glyphicon glyphicon-eye-open"
                      onClick={() => openViewhandle(items, true)}
                    ></span>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      

      <Dialog
        open={State_.deletePanel}
        className="update-main"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className="update-subdiv">
            <p>
              <span>Expendature Name : </span>
              {State_.deleteArray.ExpendatureName}
            </p>
            <p>
              <span>Date : </span>
              {State_.deleteArray.Date} {State_.deleteArray.Month} {State_.deleteArray.Year}
            </p>
            <p>
              <span>Money : </span>
              {State_.deleteArray.Money}
            </p>
            <p>You Sure You Want To Delete This Entry </p>
          </div>

          <div>
            {State_.delete && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={deleteHandle}
              >
                Delete
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={cancleDeleteHandle}
            >
              cancle
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Loader
        openLoaderPanel={State_.openLoginLoddingPanel}
        openLoader={State_.loading}
      />
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
    deleteexpendature: data => dispatch(deleteexpendature(data)),
    getcurrentmonthstatus: data => dispatch(getcurrentmonthstatus(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpendatureDetails);
