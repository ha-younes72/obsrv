import React from 'react'
import {
  Alert,
  //View,
  //	Text,
  //	TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
  TextInput,
  ScrollView,
  Linking
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
    //isRegistering: false,
    isSubmiting: false,
    showPass: true,
    focus: false
  }

  submit = () => {

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
      }

      this.setState({
        passwordError: '',
        emailError: '',
        isSubmiting: true
      }, () => {
        if (this.props.status) { this.props.actions.signupUser(user, this.props.status) }
        else {
          this.props.actions.signupUser(user, this.props.status)
          Alert.alert('Offline',
            'The data you will see is from last session, you can sync it as soon as you are loged in again!')
        }
      })
    }
  }

  render() {
    return (

      <ScrollView
        style={{
          //flex: 1,
        }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          paddingVertical: 35,
          backgroundColor: '#F4F7FA'
        }}
      >
        <View
          style={{
            flex: 3,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              flex: 1,
              width: '100%'
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Email
              </Text>
              <Text style={{ fontSize: 16, color: 'blue' }}>
                Forgot?
              </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderRadius: 5, marginBottom: 10 }} >
              <TextInput
                onFocus={() => {
                  this.setState({
                    focus: true
                  })
                }}
                onBlur={() => {
                  this.setState({
                    focus: false
                  })
                }}
                //blurOnSubmit={true}
                onChangeText={val => {
                  this.setState({
                    email: val
                  })
                }}
                style={{
                  width: '100%',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: 'gray',
                  backgroundColor: 'white'
                }}
              >
              </TextInput>
            </View>
            {
              this.state.emailError ? <Text style={{ color: 'red' }}>{this.state.emailError}</Text> : null
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Password
              </Text>
              <Text style={{ fontSize: 16, color: 'blue' }}>
                Forgot?
              </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderRadius: 5, marginBottom: 10 }} >
              <TextInput
                onFocus={() => {
                  this.setState({
                    focus: true
                  })
                }}
                onBlur={() => {
                  this.setState({
                    focus: false
                  })
                }}
                //blurOnSubmit={true}
                onChangeText={val => {
                  this.setState({
                    password: val
                  })
                }}
                secureTextEntry={this.state.showPass}
                style={{
                  width: '75%',
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderWidth: 1,
                  borderColor: 'gray',
                  backgroundColor: 'white'
                }}
              >
              </TextInput>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showPass: !this.state.showPass
                  })
                }}
                style={{
                  width: '25%',
                  backgroundColor: '#6E7F92',
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: 'white', fontSize: 19 }}>
                  SHOW
                </Text>
              </TouchableOpacity>
            </View>
            {
              this.state.passwordError ? <Text style={{ color: 'red' }}>{this.state.passwordError}</Text> : null
            }
            <Text style={{color:'black', fontSize:15}}>
              By joining, you are agreeing to our 
              <Text
                style={{ color: 'blue' }}
                onPress={() => { Linking.openURL('https://wikipedia.com') }}
              >
                {' '}terms of sevices{' '}
              </Text>
              and
              <Text
                style={{ color: 'blue' }}
                onPress={() => { Linking.openURL('https://wikipedia.com') }}
              >
                {' '}privacy policy.
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 7,
            opacity: this.state.focus ? 0 : 1,
            //paddingHorizontal: 20,
            //backgroundColor: 'green',
            width: '100%'
          }}>
          <TouchableOpacity
            onPress={() => this.submit()}
            style={{
              flex: 2,
              borderRadius: 5,
              width: '100%',
              //height: '85%',
              //flex: 1,
              backgroundColor: '#275D9E',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 7
            }}
          >
            <Text style={{ fontSize: 21, fontWeight: 'bold', color: 'white' }}>
              Create Account
						</Text>
          </TouchableOpacity>

          <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ fontSize: 17, color: 'gray' }}>
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
              <Text style={{ fontSize: 17, color: 'blue' }}>
                Log In
							</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
