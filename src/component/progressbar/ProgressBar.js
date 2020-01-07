import React, { Component } from 'react';
import { colordata } from '../common/colordata/colordata'

class ProgressBar extends Component {


    render() {
        return (
            <>
                <p className='m-0'>Total Money: <span style={{
                    fontWeight: 700
                }}>{this.props.spend.TotalMoney}</span></p>
                <p className='m-0'>Expendature Name: <span style={{
                    fontWeight: 700
                }}>{this.props.spend.ExpendatureName}</span></p>
                <div style={{
                    width: `${((this.props.spend.TotalMoney / this.props.total) * 100)}%`,
                    border: 'black solid',
                    height: '20px',
                    marginRight: '5px',
                    borderColor: `${colordata[this.props.ind].color}`,
                    backgroundColor: `${colordata[this.props.ind].color}`,
                    borderRadius: '10px',
                    float: 'left'
                }}> </div><span>{((this.props.spend.TotalMoney / this.props.total) * 100).toFixed(2)}%</span>
            </>
        )
    }
}

export default ProgressBar;