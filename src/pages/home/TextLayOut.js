import React, { Component } from 'react';
import './home.css';
const words = ["Save.", "Your.", "Money."];

class TextLayOut extends Component {
    constructor() {
        super()
        this.state = {
            text: '',
            isDeleting: false,
            loopNum: 0,
            typingSpeed: 150
        }
    }
    componentDidMount() {
        this.handleType();
    }
    handleType = () => {
        const { isDeleting, loopNum, text, typingSpeed } = this.state;
        const i = loopNum % words.length;
        const fullText = words[i];
        this.setState({
            text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
            typingSpeed: isDeleting ? 150 : 150
        });
        if (!isDeleting && text === fullText) {
            setTimeout(() => this.setState({ isDeleting: true }), 500);
        } else if (isDeleting && text === '') {
            this.setState({
                isDeleting: false,
                loopNum: loopNum + 1
            });
        }
        setTimeout(this.handleType, typingSpeed);
    };
    render() {
        return (
            <>
                <div class="flex">
                    <p className="header-sub-title text_">{this.state.text}</p>
                    <p className="text_ header-sub-title blink text_">|</p>
                </div>
            </>
        )
    }
}


export default TextLayOut;
