/* eslint-disable jsx-a11y/anchor-is-valid */
import './NavSide.css';

function NavSide(props) {
    return (
        <nav className="side">
            <header>
                <img src="logo-nsure-white.svg" alt="nSure.ai Logo" />
            </header>
            <section>
                <a className="active"><img src="icon-swap.png" alt="" />Transactions</a>
                <a><img src="icon-billing.png" alt="" />Billing</a>
            </section>
        </nav>
    );
}

export default NavSide;
