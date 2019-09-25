import React from 'react'
import {
	Alert,
	//View,
	//	Text,
	//	TextInput,
	TouchableOpacity,
	ImageBackground,
	Text,
	View
	//ScrollView
} from 'react-native'

import {
	Container,
	Content,
	//Text,
	//View,
	Button,
	Body,
	ListItem,
	CheckBox,
	Icon,
	List,
	Form,
	Item,
	//Input,
	Label
} from 'native-base'

//import Toast from "../_global/Toast";
import { colors } from '../_global/theme'

import {
	Input,
	//	Button,
	//	CheckBox,
	//	Icon,
	//	Text
} from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import IconWithBadge from "../_global/Icons";

import styles from './styles/auth.style'
import validate from './validators/validate_wrapper'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './actions';
//import Navigation from 'react-native-navigation'
import { Navigation } from "react-native-navigation";


class Auth extends React.Component {
	state = {
		password: '',
		email: '',
		emailError: '',
		passwordError: '',
		gpsPermission: false,
		cameraPermission: false,
		isRegistering: false,
		isSubmiting: false,
		showPass: false,
	}

	render() {
		return (
			<ImageBackground
				source={require('../../../images/initBack.jpg')}
				style={{
					width: '100%',
					height: '100%'
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						paddingBottom: 15
					}}
				>
					<View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

					</View>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							paddingVertical: 7,
							//paddingHorizontal: 20,
							//backgroundColor: 'green',
							width: '100%'
						}}>
						<TouchableOpacity
							onPress={() => {
								Navigation.push("AuthStack", {
									component: {
										name: "app.SignUp",
										passProps: {
											sessionName: "General"
										},
										options: {
											topBar: {
												visible: false,
												drawBehind: true
											}
										}
									}
								});
							}}
							style={{
								borderRadius: 5,
								width: '90%',
								height: '85%',
								//flex: 1,
								backgroundColor: '#FF6167',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>
								Get Started
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
						<Text style={{ fontSize: 15, color: 'white' }}>
							Already have an account?
						</Text>
						<TouchableOpacity
							onPress={() => {
								Navigation.push("AuthStack", {
									component: {
										name: "app.LogIn",
										passProps: {
											sessionName: "General"
										},
										options: {
											topBar: {
												visible: false,
												drawBehind: true
											}
										}
									}
								});
							}}
							style={{ paddingLeft: 7 }}
						>
							<Text style={{ fontSize: 15, color: 'white' }}>
								Log In
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		message: state.authReducer.message,
		status: state.authReducer.status
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
