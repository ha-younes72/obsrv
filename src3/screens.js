import React from 'react'
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Root } from 'native-base';

import Initializing from './modules/Initializing'
import Home from './modules/app/Home';
import ObservationList from './modules/app/ObservationList';
import Camera from './modules/app/CameraWix';
import AccountDetails from './modules/app/AccountDetails'
//import Gallery from './modules/app/GalleryView';
import Auth from './modules/authentication/Auth'
import LogIn from './modules/authentication/LogIn'
import SignUp from './modules/authentication/SignUp'

export function registerScreens(store, persistor) {

    Navigation.registerComponent('app.Initializing', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Initializing {...props} />
            </PersistGate>
        </Provider>
    ), () => Initializing);

    Navigation.registerComponent('app.Auth', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Auth {...props} />
            </PersistGate>
        </Provider>
    ), () => Auth);

    Navigation.registerComponent('app.LogIn', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <LogIn {...props} />
            </PersistGate>
        </Provider>
    ), () => LogIn);

    Navigation.registerComponent('app.SignUp', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SignUp {...props} />
            </PersistGate>
        </Provider>
    ), () => SignUp);

    Navigation.registerComponent('app.Home', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Root>
                    <Home {...props} />
                </Root>
            </PersistGate>
        </Provider>
    ), () => Home);
    
    Navigation.registerComponent('app.AccountDetails', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Root>
                    <AccountDetails {...props} />
                </Root>
            </PersistGate>
        </Provider>
    ), () => AccountDetails);

    Navigation.registerComponent('app.ObservationList', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ObservationList {...props} />
            </PersistGate>
        </Provider>
    ), () => ObservationList);

    Navigation.registerComponent('app.Camera', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Camera {...props} />
            </PersistGate>
        </Provider>
    ), () => Camera);

}