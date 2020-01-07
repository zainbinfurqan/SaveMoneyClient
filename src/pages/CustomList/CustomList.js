import React, { Component } from 'react';
import { connect } from "react-redux";
import { addtext, checktext } from "../../Redux/acion/customListAction";
import './customlist.css'
class CustomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            itemData: [],
            i: 0,
            error: '',
        }
    }

    changeTextHandle(key, e) {
        this.setState({ [key]: e.target.value });

    }
    addItemHandle = () => {
        let { text, itemData, i } = this.state
        if (text.trim().length > 0) {
            itemData.push({
                itemId: this.props.customList.length > 0 ? this.props.customList.length :
                    i++, itemName: text, itemCheck: false
            })
            this.setState({ itemData, text: '', i: i++, itemCheck: false, error: '' });
            this.props.addtext(itemData)
        } else {
            this.setState({ error: 'please fill the field' })
        }
    }
    componentDidMount() {
        if (this.props.customList.length > 0) {
            this.setState({ itemData: this.props.customList })
        }
    }

    changeCheckHandle = (ind) => {
        let { itemData } = this.state
        let index = itemData.findIndex(itm => itm.itemId === ind);
        if (itemData[index].itemCheck === true) {
            itemData[index].itemCheck = false
        } else {
            itemData[index].itemCheck = true
        }
        this.props.checktext(itemData)
        this.setState({ itemData })
    }

    closeCustomListHandle = () => {
        // console.log(this.props)
        this.props.history.replace("/userhome");
    }
    render() {
        let { text, itemData, error } = this.state
        return (
            <>
                <div style={{ height: '40px', padding: '5px', width: 'fit-content' }} onClick={this.closeCustomListHandle}>
                    <i className="fas fa-caret-left" style={{ float: 'left', margin: '0px 0px 0px 5px', fontSize: '23px' }} />
                    <p style={{ width: 'fit-content', margin: '1px', float: 'left', fontSize: '15px' }}>Back</p>
                </div>
                <div className='p-5'>
                    <input type="string"
                        className="form-control w-75 float-left mr-2"
                        id=""
                        aria-describedby="emailHelp"
                        placeholder="Item" value={text} onChange={e => this.changeTextHandle('text', e)} />
                    <button type="button" className="btn btn-primary" onClick={this.addItemHandle}>Add</button>
                    <p className='text-red'>{error}</p>
                </div>
                <div className='p-2'>
                    {itemData.map(itm => {
                        return (
                            <div className="alert alert-success" role="alert" key={itm.itemId}>
                                <p className='text-dark'>{itm.itemName}
                                    <input type="checkbox" id="" name="" checked={itm.itemCheck} className='float-right' onChange={() => this.changeCheckHandle(itm.itemId)} />
                                    <span class="checkmark"></span>
                                </p>
                            </div>
                        )
                    })}
                </div>


            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        customList: state.customlist.customList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addtext: data => dispatch(addtext(data)),
        checktext: data => dispatch(checktext(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomList);
