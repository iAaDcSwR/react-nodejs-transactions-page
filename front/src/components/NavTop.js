import './NavTop.css';

function NavTop(props) {
    return (
        <nav className="top">
            <i className="btn las la-bell"></i>
            {/* <img className="btn" src="icon-bell.png" alt="Toggle Notifications" title="Toggle Notifications" /> */}
            <span>{"Merchant name"}</span>
            <img className="btn account-btn-blue" src="icon-user-white-on-blue.png" alt="" />
        </nav>
    );
}

export default NavTop;
