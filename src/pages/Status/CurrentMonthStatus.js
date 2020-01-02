import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { getcurrentmonthstatus } from "../../Redux/acion/CurrentMonthStatusAction.js";
import "./currentstatus.css";
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
const ref = React.createRef();



function CurrentMonthStatus(props) {

  let [State_, setValues] = useState({
    StausData: [],
    TotalMoney: "",
    Name: "",
    Email: "",
    loading: false
  });

  function closeStatusHandle() {
    props.history.replace("/userhome");
  }

  useEffect(() => {
    console.log(props);
    if (props.authData.LoginKeyFlag !== false) {
    } else {
      props.history.replace("/home");
    }
    return () => {
    };
  });
  useEffect(() => {

    if (props.authData.LoginKeyFlag !== false) {
      setValues({ ...State_, loading: true })
      let params = {
        loginKey: props.authData.LoginKey,
        email: props.authData.Email
      };
      props.getcurrentmonthstatus(params).then(res => {
        setValues({
          ...State_,
          StausData: res[0],
          TotalMoney: res[1][0].TotalMoney,
          Email: props.authData.Email,
          loading: false
        });
      });
    } else {
      props.history.replace("/home");
    }
  }, []);


  return (
    <div className="currentStatus">
      <div style={{height:'40px',padding:'5px',width:'fit-content'}} onClick={closeStatusHandle}>
        <i className="fas fa-caret-left"  style={{float:'left',margin:'0px 0px 0px 5px', fontSize: '23px' }} />
        <p style={{width:'fit-content', margin: '1px',float:'left',fontSize:'15px'}}>Back</p>
      </div>
      <div className="container" ref={ref}>
        <div className="pdf-page">
          <h2 className="">E-STATEMENT OF MONTH</h2>
          <div className="profile-detail">
            <p>
              <span>Email: {State_.Email}</span>
            </p>
          </div>
          <table className="statusTable table-striped">
            <thead>
              <tr>
                <td>Expendature Name</td>
                <td>Expendature</td>
                <td>Date</td>
              </tr>
            </thead>
            <tbody>
              {State_.StausData.map(items => {
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
                <td>{State_.TotalMoney}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "right",
          margin: "0px 23px 0px 0px"
        }}
      >
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={State_.loading}
        />
        
      </div>
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
    getcurrentmonthstatus: data => dispatch(getcurrentmonthstatus(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentMonthStatus);
