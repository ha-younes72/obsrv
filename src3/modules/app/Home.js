import React from "react";
import { Navigation } from "react-native-navigation";
import { TouchableOpacity, Alert } from "react-native";

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
  StyleProvider,
  getTheme,
  Thumbnail,
  Spinner,
  Fab
} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
import Icon from "react-native-vector-icons/Ionicons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import customVariables from "../_global/variables";

import * as offsActions from "./actions";

class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false
      }
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isRefreshing: false,
      sightingsActive: true
    };

    Navigation.events().bindComponent(this);
  }

  async componentDidMount() {
    //AsyncStorage.removeItem(this.props.user.email)
    this.props.actions.retrieveObservations(
      this.props.status,
      this.props.user,
      this.props.token
    );
  }

  async componentDidAppear() { }

  async componentDidDisappear() { }

  componentWillReceiveProps(nextProps) {
    if (nextProps.observations || nextProps.newObservations) {
      this.setState({ isLoading: false });
    }
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      goToAuth();
    } catch (err) {
      console.log("error signing out...: ", err);
    }
  };

  async componentWillUnmount() { }

  render() {
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner large color="blue"></Spinner>
      </View>
    ) : (
        <StyleProvider style={getTheme(customVariables)}>
          <Container>
            {this.state.sightingsActive ?
              this.props.observations.length > 0 ||
                this.props.newObservations.length > 0 ? (
                  <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      //flex: 1,
                      padding: 15
                    }}
                  >
                    <List>
                      {this.props.observations.map((data, i) => (
                        //data.sessionID = 81000,
                        <ListItem
                          key={i}
                          style={{
                            marginLeft: 0,
                            marginBottom: 10,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 4
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 4.65,
                            elevation: 4,
                            borderRadius: 7
                          }}
                          thumbnail
                        >
                          <Left>
                            <Thumbnail
                              square
                              large
                              size={120}
                              source={{ uri: data.img }}
                            />
                          </Left>
                          <Body style={{ paddingLeft: 10 }}>
                            <Text style={{ paddingBottom: 4 }} numberOfLines={1}>
                              {data.sessionID}
                            </Text>
                            <Text numberOfLines={1} note>
                              {/*data.date*/} {data.time}
                            </Text>
                            <Text style={{ paddingBottom: 4 }} numberOfLines={1} note>
                              {data.lat} {data.lon}
                            </Text>
                            <TouchableOpacity>
                              <Text style={{ color: "blue" }} note>
                                View More
                        </Text>
                            </TouchableOpacity>
                          </Body>
                        </ListItem>
                      ))}
                      {this.props.newObservations.map(
                        (data, i) => (
                          (data.sessionID = 81000),
                          (
                            <ListItem
                              key={i}
                              style={{
                                marginLeft: 0,
                                marginBottom: 10,
                                paddingHorizontal: 10,
                                borderRadius: 5,
                                shadowColor: "#000",
                                shadowOffset: {
                                  width: 0,
                                  height: 4
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 4.65,
                                elevation: 4,
                                borderRadius: 7
                              }}
                              thumbnail
                            >
                              <Left>
                                <Thumbnail
                                  square
                                  large
                                  size={120}
                                  source={{ uri: data.img.uri }}
                                />
                              </Left>
                              <Body style={{ paddingLeft: 10 }}>
                                <Text style={{ paddingBottom: 4 }} numberOfLines={1}>
                                  {data.sessionID}
                                </Text>
                                <Text numberOfLines={1} note>
                                  {data.time}
                                </Text>
                                <Text
                                  style={{ paddingBottom: 4 }}
                                  numberOfLines={1}
                                  note
                                >
                                  {data.lon} {data.lat}
                                </Text>
                                <TouchableOpacity>
                                  <Text style={{ color: "blue" }} note>
                                    View More
                            </Text>
                                </TouchableOpacity>
                              </Body>
                            </ListItem>
                          )
                        )
                      )}
                    </List>
                    <TouchableOpacity
                      style={{
                        //alignSelf:'flex-end',
                        position: "absolute",
                        right: 2,
                        top: 2,
                        backgroundColor: "blue",
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      onPress={() => {
                        Alert.alert("Syncing", "I am symcing!");
                        NetInfo.fetch().then(state => {
                          console.log("Connection type", state.type);
                          console.log("Is connected?", state.isConnected);
                          this.setState({ isConnected: state.isConnected }, () => {
                            this.props.actions.syncObservations(
                              this.state.isConnected,
                              this.props.user,
                              this.props.token,
                              this.props.newObservations
                            );
                          });
                        });
                      }}
                    >
                      <Icon
                        name="ios-sync"
                        style={{ color: "white", fontSize: 24 }}
                      />
                    </TouchableOpacity>
                  </Content>
                ) : (
                  <Content
                    contentContainerStyle={{
                      //flex: 1,
                      padding: 15
                    }}
                  >
                    <View>
                      <Text>There are no observations</Text>
                    </View>
                  </Content>
                )
              :
              <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  //flex: 1,
                  padding: 15,
                  paddingTop: 25
                }}
              >
                <Text style={{ fontSize: 22, paddingBottom: 10 }}>Profile</Text>
                <Text style={{ fontSize: 15, color: 'gray', paddingVertical: 5 }}>
                  MEMBERSHIP DETAILS
                </Text>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 15,
                    marginVertical: 7,
                    borderRadius: 5,
                    elevation: 5,
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}
                >
                  <Text style={{ fontSize: 20 }}>
                    Free Plan
                  </Text>
                  <Text style={{ fontSize: 18, color: 'blue' }}>
                    Upgrade
                  </Text>
                </View>
                <Text style={{ fontSize: 15, color: 'gray', paddingVertical: 5, marginTop: 20 }}>
                  SOCIAL MEDIA SHARING
                </Text>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 15,
                    marginVertical: 7,
                    borderRadius: 5,
                    elevation: 5,
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    Facebook
                  </Text>
                  <Text style={{ fontSize: 18, color: 'blue' }}>

                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 15,
                    marginVertical: 7,
                    borderRadius: 5,
                    elevation: 5,
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    Twitter
                  </Text>
                  <Text style={{ fontSize: 18, color: 'blue' }}>
                    Add
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 15,
                    marginVertical: 7,
                    borderRadius: 5,
                    elevation: 5,
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    Instagram
                  </Text>
                  <Text style={{ fontSize: 18, color: 'blue' }}>
                    Add
                  </Text>
                </View>

                <Text style={{ fontSize: 15, color: 'gray', paddingVertical: 5, marginTop: 20 }}>
                  ACCOUNT DETAILS
                </Text>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 15,
                    marginVertical: 7,
                    borderRadius: 5,
                    elevation: 5,
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}
                >
                  <Text style={{ fontSize: 20 }}>
                    {this.props.email}
                  </Text>
                  <Text
                    onPress={() => {
                      Navigation.push("AppStack", {
                        component: {
                          name: "app.AccountDetails",
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
                      })
                    }}
                    style={{ fontSize: 18, color: 'blue' }}>
                    Manage
                  </Text>
                </View>
              </Content>
            }
            <Footer>
              <FooterTab
                style={{
                  borderBottomWidth: this.state.sightingsActive ? 4 : 0,
                  borderBottomColor: "blue"
                }}
              >
                <Button
                  onPress={() => {
                    this.setState({
                      profileActive: false,
                      sightingsActive: true
                    })
                  }}
                  bordered
                  style={{
                    borderColor: "white"
                  }}
                >
                  <Text>Sightings</Text>
                </Button>
              </FooterTab>
              <FooterTab>
                <Button
                  onPress={() => {
                    Navigation.push("AppStack", {
                      component: {
                        name: "app.ObservationList",
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
                  bordered
                  style={{
                    borderColor: "white"
                  }}
                >
                  <View
                    square
                    style={{
                      width: 50,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: "blue",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 4
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 4.65,
                      elevation: 4
                    }}
                  >
                    <Text style={{ fontSize: 13 }}>Log</Text>
                  </View>
                </Button>
              </FooterTab>
              <FooterTab
                style={{
                  borderBottomWidth: this.state.profileActive ? 4 : 0,
                  borderBottomColor: "blue"
                }}
              >
                <Button
                  onPress={() => {
                    this.setState({
                      profileActive: true,
                      sightingsActive: false
                    })
                  }}
                  bordered
                  style={{
                    borderColor: "white"
                  }}
                >
                  <Text>Profile</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </StyleProvider>
      );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    observations: state.appReducer.observations,
    newObservations: state.appReducer.newObservations,
    status: state.authReducer.status,
    user: state.authReducer.user,
    token: state.authReducer.token,
    email: state.authReducer.user.email,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(offsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
