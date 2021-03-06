import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'

import { Navigation } from "react-native-navigation";
//import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage'
import { goToAuth } from '../../../utils/navigation'
import { colors, fonts } from '../../_global/theme'
import IconWithBadge from '../../_global/Icons';
import { iconsMap } from '../../../utils/AppIcons';

class TopNav extends React.Component {

    render() {
        const { screenTitle } = this.props
        return (
            <View style={styles.container}>
                {
                    /*<TouchableOpacity style={styles.menuTrigger} onPress={() => { this.openDrawer() }}>
                        <View style={styles.menuTriggerInner}>
                            <IconWithBadge name={'ios-menu'} size={37} color={'white'} ></IconWithBadge>
                        </View>
                    </TouchableOpacity>
                    */
                }
                <TouchableOpacity style={styles.menuTrigger} onPress={() => { this.back() }}>
                    <View style={styles.menuTriggerInner}>
                        <Text style={{ color: 'black' }}>Back</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.title}>
                    <Text style={styles.titleText} > {screenTitle} </Text>
                </View>

                <TouchableOpacity
                    style={styles.menuTrigger, { paddingRight: 7 }}
                    onPress={async () => {
                        try {
                            //Alert.alert('Yes')
                            await AsyncStorage.removeItem('userToken')
                            goToAuth()
                        } catch (err) {
                            console.log('error signing out...: ', err)
                        }
                    }}
                >
                    <View style={styles.menuTriggerInner}>
                        <Text style={{ color: 'red', fontSize: 16 }}>Log Out</Text>
                    </View>
                </TouchableOpacity>


            </View>
        );
    }

    logOut = async () => {
        try {
            Alert.alert('Yes')
            //await AsyncStorage.removeItem('userToken')
            //goToAuth()
        } catch (err) {
            console.log('error signing out...: ', err)
        }
    }

    back() {
        Navigation.popToRoot("AppStack")
    }
    sync() {
        Alert.alert('I am syncing')
    }

    openCamera() {
        Navigation.push('AppStack', {
            component: {
                name: 'app.Camera',
            },
        })
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        top: 0,
        left: 0,
        height: 45,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        elevation: 2
    },
    title: {
        flex: 5,
        alignItems: 'center',
        paddingHorizontal: 7
    },
    titleText: {
        fontSize: 21,
        color: 'black',
        fontFamily: fonts.primary,
    },
    barcode: {
        flex: 1,
        alignItems: 'flex-end',
        paddingHorizontal: 7
    },
    menuTrigger: {
        paddingLeft: 7
    }
})


export default TopNav