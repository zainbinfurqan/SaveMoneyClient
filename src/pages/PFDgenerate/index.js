import React, { Component } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import ReactToPdf from "react-to-pdf";
import './pdfgenerate.css'
import { connect } from "react-redux";
import jsPDF from 'jspdf';
import moment from 'moment'
import 'jspdf-autotable';

const doc = new jsPDF()

const ref = React.createRef();
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});
const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [4, 2]
};
var columns = [
    { title: "ID", key: "id" },
    { title: "Name", key: "name" },
    { title: "Country", key: "country" },
    { title: "Email", key: "email" }
];
var data = [
    { "id": 1, "name": "Shaw", "country": "Tanzania", "email": "abrown@avamba.info" },
    { "id": 2, "name": "Nelson", "country": "Kazakhstan", "email": "jjordan@agivu.com" },
    { "id": 3, "name": "Garcia", "country": "Madagascar", "email": "jdean@skinte.biz" },
];

class PDFgenerate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            expendatureName: '',
            price: '',
            error: '',
            counter: 0
        }
    }
    textHandle(e, key) {
        // if (key === "expendatureName") {
        // let result = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z])*$/;
        // if (e.target.value.match(result))
        this.setState({ [key]: e.target.value, error: '' })
        // else {
        // this.setState({[key]: e.target.value, error: "expendature name not valid formate" })
        // }
        // }
    }

    submitItemHandle = () => {
        let { price, expendatureName, listData, counter } = this.state
        let expName = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z])*$/;
        let pric = /^[1-9][0.0-9]+$/;


        if (expendatureName.match(expName)) {
            if (price.match(pric)) {
                console.log("abc")
                listData.push({ counter: ++counter, expName: expendatureName, prc: price })
                this.setState({ listData, counter: ++counter })

            } else {
                this.setState({ error: "expendature pice not valid formate" })
            }
        } else {
            this.setState({ error: "expendature name not valid formate" })
        }
    }
    add = (data) => {
        //     var header = this.createHeaders(["counter", "expName", "prc"]);

        //     console.log(data)
        //         doc.text(`Email: ${this.props.authData.Email}`,10, 10)
        //         doc.text(`Email: ${this.props.authData.Email}`,10, 10)
        //     doc.table(10, 10,data, header)
        //     doc.save('a4.pdf')
        // }
        // createHeaders = (keys) => {
        //     return keys.map(key => ({
        //         'name': key,
        //         'prompt': key,
        //         'width': 85,
        //         'align': 'center',
        //         'padding': 20,
        //         'margin': 20
        //     }));

        var doc = new jsPDF('p', 'pt');
        doc.text(`Email: ${this.props.authData.Email}`, 30, 30)
        doc.autoTable(columns, data, {});
        doc.save('table.pdf');

    }

    closeStatusHandle = () => {
        //  console.log(this.props)
        this.props.history.replace("/userhome");
    }
    render() {
        return (
            <>

                <div style={{ height: '40px', padding: '5px', width: 'fit-content' }} onClick={this.closeStatusHandle}>
                    <i className="fas fa-caret-left" style={{ float: 'left', margin: '0px 0px 0px 5px', fontSize: '23px' }} />
                    <p style={{ width: 'fit-content', margin: '1px', float: 'left', fontSize: '15px' }}>Back</p>
                </div>

                <div className='d-flex flex-column rounded'>
                    <div className='p-2 rounded w-100  px-3'>
                        <div class="form-group w-100 mb-0">
                            <label >Expendature Name</label>
                            <input type="email" class="form-control" onChange={e => this.textHandle(e, "expendatureName")} class="form-control" value={this.state.expendatureName} aria-describedby="emailHelp" placeholder="Enter|Expndature Name" />
                        </div>
                    </div>
                    <div className='p-2  rounded w-100 px-3'>
                        <div class="form-group w-100 mb-0">
                            <label >Price</label>
                            <input type="number" class="form-control" onChange={e => this.textHandle(e, "price")} value={this.state.price} aria-describedby="emailHelp" placeholder="Enter|Price" />
                        </div>
                    </div>
                    <div className='p-2  rounded w-100 px-3 '>
                        <button type="button" class="btn btn-success btn-block" onClick={this.submitItemHandle}>Add to list</button>
                        <small className='text-muted'>{this.state.error}</small>

                    </div>

                </div>
                <div className='d-flex flex-row-reverse'>
                    <button onClick={() => this.add(this.state.listData)}>generate</button>
                    {/* <div className='mr-4 pdf_btn'>
                        <ReactToPdf targetRef={ref} filename="div-blue.pdf" className='btn btn-info' >
                            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
                        </ReactToPdf>
                    </div> */}
                </div>

                <div className='d-flex pl-3 pr-3 flex-column pdf_textfile' >
                    <span className='text-center'>Email: {this.props.authData.Email}</span>
                    <span className='text-center'>Date: {moment().format('MMMM Do YYYY')}</span>
                    <table class="" >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Exp Name</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listData.map((item, index) => {
                                return (
                                    <tr>
                                        <td scope="row">{index}</td>
                                        <td className='text-left'>{item.expName}</td>
                                        <td className='text-left'>{item.prc}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>


            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        authData: state.authData.Auth
    };
};

//   const mapDispatchToProps = dispatch => {
//     return {
//       getcurrentmonthstatus: data => dispatch(getcurrentmonthstatus(data))
//     };
//   };

export default connect(
    mapStateToProps,
    null
)(PDFgenerate);
