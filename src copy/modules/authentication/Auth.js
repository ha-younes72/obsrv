import React from 'react'
import {
	Alert,
	//View,
	//	Text,
	//	TextInput,
	TouchableOpacity,
	//ScrollView
} from 'react-native'

import {
	Container,
	Content,
	Text,
	View,
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

class Register extends React.Component {
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


	onChangeText = (key, value) => {
		this.setState(
			{
				[key]: value,
				isSubmiting: false
			}
		)
		//if (this.props.message) this.rmError()
	}

	submit = (btn) => {

		if (btn === 'logIn') {
			this.setState({
				isRegistering: false
			})
			//Alert.alert('IN')
		}
		if (btn === 'register') {
			this.setState({
				isRegistering: true
			})
			//Alert.alert('UP')
		}

		const emailError = validate('email', this.state.email)
		const passwordError = validate('password', this.state.password)
		//const fnameError = validate('firstname', this.state.fname)

		this.setState({
			emailError: emailError,
			passwordError: passwordError,
			//fnameError: fnameError
		})

		if (!emailError && !passwordError) {
			var user = {
				password: this.state.password,
				email: this.state.email,
				gpsPermission: this.state.gpsPermission,
				cameraPermission: this.state.cameraPermission
			}

			this.setState({
				passwordError: '',
				emailError: '',
				isSubmiting: true
			}, () => {

				if (this.state.isRegistering) {
					if (this.props.status) { this.props.actions.signupUser(user, this.props.status) }
					else {
						this.props.actions.signupUser(user, this.props.status)
						Alert.alert('Offline', 'You are offline, we will register you when you are online. All data is stored locally.')
					}
				}
				else {
					if (this.props.status) { this.props.actions.signinUser(user, this.props.status) }
					else {
						this.props.actions.signinUser(user, this.props.status)
						Alert.alert('Offline',
							'The data you will see is from last session, you can sync it as soon as you are connected')
					}
				}
			})
		}
	}

	rmError() {
		this.setState({
			isRegistering: false,
		})
		this.props.actions.clearError();
	}

	render() {
		return (
			<Container>
				<Content
					//padder
					contentContainerStyle={styles.container}
				>
					<Form
						style={{
							width: '90%'
						}}
					>
						<Input
							onChangeText={val => this.onChangeText('email', val)}
							placeholder='Mail'
							value={this.state.email}
							onBlur={() => {
								this.setState({
									emailError: validate('email', this.state.email)
								})
							}}

							leftIcon={
								<IconWithBadge
									style={{ margin: 0 }}
									name='ios-mail'
									size={24}
									color={colors.primary}
								/>
							}

							errorStyle={{ color: 'red' }}
							errorMessage={this.state.emailError ? this.state.emailError : null}
						></Input>

						<Input
							onChangeText={val => this.onChangeText('password', val)}
							placeholder='Password'
							value={this.state.password}
							onBlur={() => {
								this.setState({
									passwordError: validate('password', this.state.password)
								})
							}}

							leftIcon={
								<IconWithBadge
									style={{ margin: 0 }}
									name='ios-key'
									size={24}
									color={colors.primary}
								/>
							}

							errorStyle={{ color: 'red' }}
							errorMessage={this.state.passwordError ? this.state.passwordError : null}
						></Input>

					</Form>
					<List style={{ paddingVertical: 15 }}>
						<ListItem style={{ borderBottomWidth: 0 }}>
							<CheckBox
								checked={this.state.gpsPermission}
								color={colors.primary}
								onPress={() => this.setState({
									gpsPermission: !this.state.gpsPermission
								})}
							>
							</CheckBox>
							<Text style={{
								paddingLeft: 7
							}}>
								GPS
							</Text>
						</ListItem>
						<ListItem style={{ borderBottomWidth: 0 }}>
							<CheckBox
								checked={this.state.cameraPermission}
								color={colors.primary}
								onPress={() => this.setState({
									cameraPermission: !this.state.cameraPermission
								})}
							>
							</CheckBox>
							<Text style={{
								paddingLeft: 7
							}}>
								Camera
							</Text>
						</ListItem>
					</List>
					<View style={{
						//flex:1,
						width: '90%',
						flexDirection: 'row',
						justifyContent: 'space-evenly',
					}}
					>
						<Button
							bordered
							rounded
							iconLeft
							small
							style={{ borderColor: colors.primary }}
							disabled={this.state.isSubmiting}
						//disabled={true}
						//style={{ marginHorizontal: 20 }}
						>
							<TouchableOpacity
								onPress={() => this.submit('logIn')}
								style={{ flexDirection: 'row' }}
							>
								<Icon
									name='ios-log-in'
									style={{ color: colors.primary }}
								//style={{ fontSize: 25, padding: 5 }}
								/>

								<Text style={{ color: colors.primary }}>Sing In</Text>
							</TouchableOpacity>
						</Button>
						<Button
							bordered
							rounded
							iconLeft
							small
							disabled={this.state.isSubmiting}
							//color={colors.primary}
							style={{ borderColor: colors.primary }}
						>
							<TouchableOpacity
								onPress={() => this.submit('register')}
								style={{ flexDirection: 'row' }}
							>
								<Icon
									name='ios-person-add'
									//color={colors.primary}
									style={{ color: colors.primary }}
								/>
								<Text style={{ color: colors.primary }} >Register</Text>
							</TouchableOpacity>
						</Button>
					</View>
				</Content>
			</Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
