import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import {configureStore, persistor} from './store/configureStore';

class App extends Component {
	constructor(props) {
		super(props);
		this.startApp();
	}

	startApp() {
		const store = configureStore();
		registerScreens(store, persistor);
		//console.log('Screens REgisterd')
		Navigation.events().registerAppLaunchedListener(() => {
			Navigation.setRoot({
				root: {
					component: {
						name: 'app.Initializing'
					}
				},
			});
		});
	}

}

export default App;