import React from 'react';
import { Navigation } from "react-native-navigation";
import {
  RefreshControl,
  ScrollView,
  //Text,
  TouchableOpacity,
  //View,
  Platform,
  FlatList,
  Alert,
  Image,
  PermissionsAndroid,
  StyleSheet
  //AsyncStorage,
  //Button
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  View,
  List,
  ListItem,
  Right,
  Left,
  Body,
  Header,
  Title,
  StyleProvider,
  getTheme,
  Segment,
  Input,
  Item,
  Form,
  Textarea
} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons';
//import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import customVariables from '../_global/variables';

import * as offsActions from './actions';
//import CardOne from './components/CardOne';
//import CardTwo from './components/CardTwo';
//import Card from "./components/Card";
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Home.style';
import { iconsMap } from '../../utils/AppIcons';
import { colors } from '../_global/theme';
import TopNav from './components/TopNav3';
import RNPicker from "rn-modal-picker";
//import firebase from 'react-native-firebase';
//import { MessageBar } from 'react-native-messages';
//import { showMessage } from 'react-native-messages';
import ImagePicker from 'react-native-image-picker';
import NetInfo from "@react-native-community/netinfo";
import animalDataSource from '../../constants/animalsInput'
import humanDataSource from '../../constants/humansInput'
import activityInput from '../../constants/activityList'

class ObservationList extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {

    }


    //this._viewMovie = this._viewMovie.bind(this);
    //this._onRefresh = this._onRefresh.bind(this);
    Navigation.events().bindComponent(this);

    //this.MessageBar = React.createRef();
  }

  async componentDidMount() {
  }

  async componentDidAppear() {

  }

  render() {
    return (
      <StyleProvider style={getTheme(customVariables)}>
        <Container>
          <TopNav screenTitle='' ></TopNav>
          <Content padder contentContainerStyle={{ paddingTop: 25 }}>
            <Text style={{ color: 'gray', fontSize: 16 }}>
              ACCOUNT DETAILS
            </Text>
            <View
              style={{
                width: '100%',
                padding: 12,
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 5,
                marginTop: 12,
                marginBottom: 40
              }}
            >
              <Text style={{ color: 'black', fontSize: 21 }}>
                {this.props.email}
              </Text>
            </View>
            <Text style={{ color: 'gray', fontSize: 16, marginBottom: 40 }}>
              RESET PASSWORD
            </Text>

            <Text style={{ color: 'gray', fontSize: 16, marginBottom: 40 }}>
              RESET PASSWORD
            </Text>

            <Text style={{ color: 'gray', fontSize: 16, marginBottom: 40 }}>
              RESET PASSWORD
            </Text>
          </Content>

        </Container>
      </StyleProvider>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    //newObservations: state.appReducer.newObservations,
    currentIndex: state.appReducer.currentIndex,
    user: state.authReducer.user,
    email: state.authReducer.user.email,
    token: state.authReducer.token,
    wantToAddPhoto: state.appReducer.wantToAddPhoto,
    tempObservation: state.appReducer.tempObservation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(offsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ObservationList);

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    backgroundColor: colors.gray,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 7,
		/*
		shadowOpacity: 1.0,
		shadowRadius: 5,
		shadowOffset: {
			width: 1,
			height: 1
		},
		backgroundColor: "rgba(255,255,255,1)",
		shadowColor: "#d3d3d3",
		borderRadius: 10,
		elevation: 3,
		marginLeft: 10,
		marginRight: 10
		*/
  },

  selectLabelTextStyle: {
    color: 'black',
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: 'black', //"#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },

  pickerStyle: {
    marginLeft: 18,
    //elevation: 3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    backgroundColor: colors.gray,
		/*
		shadowOpacity: 1.0,
		shadowOffset: {
			width: 1,
			height: 1
		},
		borderWidth: 1,
		shadowRadius: 10,
		backgroundColor: "rgba(255,255,255,1)",
		shadowColor: "#d3d3d3",
		*/
    borderRadius: 5,
    flexDirection: "row"
  }
});
