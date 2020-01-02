import React, { Component } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { connect } from "react-redux";

const doc = new jsPDF('p', 'pt');



class PDFgenerate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            expName: '',
            expPrice: '',
            Id: '',
            textError: ''
        }
    }

    handleItemAdd = () => {
        let { expName, expPrice, listData, Id } = this.state
        if (expName.trim().length > 0 && expPrice.trim().length > 0) {
            if (expPrice.match("^[1-9][0-9]*$")) {
                listData.push({
                    expName,
                    expPrice,
                    Id: Id++
                })
                this.setState({ listData, Id: Id++, textError: '' })
            } else {
                this.setState({ textError: 'invalid price formate' })

            }

        }
        else {
            this.setState({ textError: 'please fill all field' })

        }

    }

    textChange = (e, key, ind) => {
        this.setState({ [key]: e.target.value })
    }

    PDFhandle = () => {
        let { listData } = this.state
        doc.autoTable({ html: '#table_my' });
        doc.autoTable({
            head: [['S.No', 'ExpName', 'ExpPrice']],
            body: [[
                listData.map(items => {
                    return (
                        `${items.Id}`, `${items.expName}`, `${items.expPrice}`
                    )
                })
            ]]
        });
        doc.save('table.pdf');

       ; doc.save('table.pdf');
    }

    editItemHandle() {
    }
    deleteItemHandle(ind) {
        let { listData } = this.state
        listData.splice(ind, 1)
        this.setState([listData])
    }

    closeStatusHandle = () => {
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
                            <label for="exampleInputEmail1">Expendature Name</label>
                            <input type="string" value={this.state.expName} onChange={e => this.textChange(e, "expName")} class="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                    </div>
                    <div className='p-2  rounded w-100 px-3'>
                        <div class="form-group w-100 mb-0">
                            <label for="exampleInputEmail1">Price</label>
                            <input type="number" value={this.state.expPrice} onChange={e => this.textChange(e, "expPrice")} class="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                    </div>
                    <div className=' rounded w-100 px-3'>
                        <div class="form-group w-100 mb-0">
                            <button className='btn btn-success w-100' onClick={this.handleItemAdd}>add To List</button>
                        </div>
                    </div>
                    {<p style={this.state.textError.length > 0 ? ({ color: 'red', margin: '0px 12px' }) : ({ color: '' })}>{this.state.textError}</p>}
                    {this.state.listData.length > 0 &&
                        <>
                            <div className='p-2  rounded w-100 px-3'>
                                <div class="form-group w-100 mb-0">
                                    <button className='btn btn-success' onClick={this.PDFhandle}>Generate PDF</button>
                                </div>
                            </div>

                            <table class="table table-striped" id="table_my">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Exp Name</th>
                                        <th scope="col">Exp Price</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {this.state.listData.map((items, ind) => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <th scope="row">{ind}</th>
                                                <td>{items.expName}</td>
                                                <td>{items.expPrice}</td>
                                                <td>
                                                    |
                                                    <span style={{ padding: "0px 7px" }}>
                                                        <i className='fa fa-trash' onClick={() => this.deleteItemHandle(ind)} /></span></td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </>
                    }
                </div>
            </>
        )
    }
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
)(PDFgenerate);
