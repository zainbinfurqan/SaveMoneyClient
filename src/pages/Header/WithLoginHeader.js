// import React, { useState, useEffect } from 'react';
// import { connect } from "react-redux";
// import './header.css'

// function WithLoginHeader(props) {

//     useEffect(()=>{
//         console.log(props)
//     })
//     return (
//         <div className='row header_main'>
//         <div className="header"></div>
//    </div>
//     )
// }

// const mapStateToProps = state => {
//     //   // console.log(state.educationHub.courseCategories.categories)
//     return {
//         AuthData: state.authData
//         //     // getRolesData: state.rolesData.getRolesData.data,
//         //     userData: state.smsData.userLogin.userData
//         //     // getAddDepartmentSetupData:
//         //     //   state.DepartmentSetupData.getAddDepartmentSetupData
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         // logout: data => dispatch(logout(data))
//         // updateDepartments: data => dispatch(updateDepartments(data)),
//         // deleteDepartments: data => dispatch(deleteDepartments(data))
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(WithLoginHeader);