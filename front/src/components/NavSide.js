/* eslint-disable jsx-a11y/anchor-is-valid */
import './NavSide.css';
import * as React from 'react';

class NavSide extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isShown: true };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ isShown: !this.state.isShown });
    }

    render() {
        return (
            <nav className={"side" + (this.state.isShown ? "" : " collapsed")}>
                <header>
                    <img src="logo-nsure-white.svg" alt="nSure.ai Logo" />
                    <img className="mini" src="logo-nsure-white-mini.svg" alt="nSure.ai Logo" />
                </header>
                <section>
                    <a className="active">
                        <img src="icon-swap.png" alt="" />
                        <span className="link-label">Transactions</span>
                    </a>
                    <a>
                        <img src="icon-billing.png" alt="" />
                        <span className="link-label">Billing</span>
                    </a>
                </section>
                <button className="btn blue toggle" onClick={this.toggle}>
                    {this.state.isShown ? "<" : ">"}
                </button>
            </nav>
        );
    }
}

export default NavSide;
