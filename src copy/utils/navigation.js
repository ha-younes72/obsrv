import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from "../modules/_global/theme";
import { iconsMap, iconsLoaded } from './AppIcons';


defaultOptions = {
  bottomTabs: {
    backgroundColor: colors.primaryLight
  },
  bottomTab: {
    iconColor: colors.primary,
    selectedIconColor: 'white',
    textColor: colors.primary,
    selectedTextColor: 'white'
  },
  animations: {
    setRoot: {
      enabled: 'true',// | 'false', // Optional, used to enable/disable the animation
      alpha: {
        from: 0,
        to: 1,
        duration: 1000,
        startDelay: 0,
        interpolation: 'accelerate'
      }
    },
    push: {
      enabled: 'true',
      alpha: {
        from: 0,
        to: 1,
        duration: 2000,
        startDelay: 0,
        interpolation: 'accelerate'
      }
    }
  },
  /*
  topBar: {
    leftButtons: [
      {
        id: 'openDrawer',
        icon: require('./signin.png')
      }
    ],
    rightButtons: [
      {
        id: 'openCamera',
        icon: require('./signin.png')
      }
    ]
  },*/
  topBar: {
    /*leftButtons: [
      {
        id: 'openDrawer',
        icon: iconsMap['ios-menu']//require('./signin.png')
      }
    ],
    rightButtons: [
      {
        id: 'openCamera',
        icon: iconsMap['ios-barcode']//require('./signin.png')
      }
    ],*/
    visible: false,
    animate: false, // Controls whether TopBar visibility changes should be animated
    hideOnScroll: false,
    buttonColor: colors.primary,
    drawBehind: true,
    testID: 'topBar',
    title: {
      text: 'Title',
      fontSize: 18,
      color: colors.primary,
      alignment: 'center'
      /*fontFamily: 'Helvetica',
      component: {
        name: 'example.CustomTopBarTitle',
        alignment: 'center'
      }
      */
    },
    /*
    subtitle: {
      text: 'Title',
      fontSize: 14,
      color: 'red',
      fontFamily: 'Helvetica',
      alignment: 'center'
    },
    */
    backButton: {
      //icon: require('./signin.png'),
      //visible: true
    },
    background: {
      color: colors.gray,//'#00ff00',
      /*component: {
        name: 'example.CustomTopBarBackground'
      }
      */
    },

  }
}
Navigation.setDefaultOptions(defaultOptions);

export const goToAuth = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'AuthStack',
      children: [
        {
          component: {
            name: 'app.Auth',
            options: {
              /*bottomTab: {
                text: 'Sign Up',
                fontSize: 12,
                icon: iconsMap['ios-person-add']//require('./signup.png')
              }*/
            }
          },
        },
      ],
    }
  }
});

export const goHome2 = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'App',
      children: [
        {
          component: {
            name: 'app.Home',
            options: {
              bottomTab: {
                text: 'Home',
                fontSize: 12,
                icon: iconsMap['ios-home']//require('./signup.png')
              }
            }
          }
        }
      ],
    }
  }
})


export const goHome = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'AppStack',
      children: [
        {
          stack: {
            id: 'HomeStack',
            children: [
              {
                component: {
                  id: 'AppBottonTabHome',
                  name: 'app.Home',
                }
              }
            ],
            options: defaultOptions
          }
        },
      ]
    }
  }
});