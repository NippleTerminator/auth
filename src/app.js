//@flow

import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		const config = {
			apiKey: 'AIzaSyAV_pd3InjMBJh8rUYo2xJq02MVUecv0Yg',
			authDomain: 'auth-674a9.firebaseapp.com',
			databaseURL: 'https://auth-674a9.firebaseio.com',
			projectId: 'auth-674a9',
			storageBucket: 'auth-674a9.appspot.com',
			messagingSenderId: '344088878122'
		};
		firebase.initializeApp(config);

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<CardSection>
						<Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
					</CardSection>
				);
			case false:
				return <LoginForm />;
			default:
				return (
					<CardSection>
						<Spinner size="large" />
					</CardSection>
				);
		}
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
