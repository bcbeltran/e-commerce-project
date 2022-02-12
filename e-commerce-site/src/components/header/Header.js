import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/xrp-logo.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => {
    return (
		<div className="header">
			<Link className="logo-container" to="/">
				<Logo className="logo" />
			</Link>
			<div className="options">
				<Link className="option" to="/shop">
					SHOP
				</Link>
				<Logo className="logo2" />
				<Link className="option" to="/shop">
					CONTACT
				</Link>
				<Logo className="logo2" />
				{currentUser ? (
					<div className="option" onClick={() => auth.signOut()}>
						SIGN OUT
					</div>
				) : (
					<Link className="option" to="/signin">
						SIGN IN
					</Link>
				)}
				<CartIcon />
			</div>
			{hidden ? null : <CartDropdown />}
		</div>
	);
}

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
	currentUser,
	hidden
});

export default connect(mapStateToProps)(Header);