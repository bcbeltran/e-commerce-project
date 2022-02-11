import React from "react";
import "./App.css";
import { connect } from "react-redux";
import HomePage from "./pages/homepage/Homepage";
import { Route, Routes, Link } from "react-router-dom";
import HatsPage from "./pages/hats/HatsPage";
import JacketsPage from "./pages/jackets/JacketsPage";
import SneakersPage from "./pages/sneakers/SneakersPage";
import MensPage from "./pages/mens/MensPage";
import WomensPage from "./pages/womens/WomensPage";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInSignUpPage from "./pages/sign-in-and-sign-up/SignInSignUpPage";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {

	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					this.props.setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			}

			this.props.setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route
						exact
						path="/signin"
						element={<SignInSignUpPage />}
					/>
					<Route path="/shop" element={<ShopPage />} />
					<Route path="/shop/hats" element={<HatsPage />} />
					<Route path="/shop/jackets" element={<JacketsPage />} />
					<Route path="/shop/sneakers" element={<SneakersPage />} />
					<Route path="/shop/mens" element={<MensPage />} />
					<Route path="/shop/womens" element={<WomensPage />} />
				</Routes>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
