import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";
import Ripple from "react-native-material-ripple";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import firebase from "react-native-firebase";

import IonIcons from "react-native-vector-icons/Ionicons";
import styles from "../config/styles";

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.userUnsubscribe = null;
    this.state = { uid: "", username: "" };
  }

  componentDidMount() {
    this.userUnsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userId = user._user.uid;
        const displayName = user._user.displayName;
        this.setState({ uid: userId, username: displayName }, () => {
          console.log(this.state);
        });
      } else {
        console.log("NO USER DATA");
      }
    });
  }

  componentWillUnmount() {
    if (this.userUnsubscribe) this.userUnsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor={"#FFFFFF"}
          animated
        />
        <View
          style={{
            width: responsiveWidth(15),
            height: responsiveWidth(15),
            borderRadius: responsiveWidth(15),
            marginLeft: responsiveWidth(-2)
          }}
        >
          <Ripple
            rippleColor={"#000000"}
            rippleContainerBorderRadius={responsiveWidth(15)}
            onPressIn={() => {
              this.props.navigation.goBack();
            }}
          >
            <View
              style={{
                borderRadius: responsiveWidth(15),
                width: responsiveWidth(15),
                height: responsiveWidth(15),
                paddingVertical: responsiveHeight(2),
                backgroundColor: "transparent",
                justifyContent: "center"
              }}
            >
              <IonIcons
                name={"md-arrow-back"}
                size={responsiveFontSize(3.6)}
                color={"#484848"}
                style={{
                  alignSelf: "center",
                  paddingHorizontal: responsiveWidth(2)
                }}
              />
            </View>
          </Ripple>
        </View>
        <Text>Chat with us</Text>
      
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}
