import React, {Component} from 'react'
import {Button, Text, TouchableOpacity, View, StyleSheet} from 'react-native'
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class LoginScreen extends Component{
        signInWithGoogleAsync = async () => {
            try {
              const result = await Google.logInAsync({
                behaviour: "web",
                androidClientId: "880289297994-k5uk1lptlp2k7ukjlbjr3l40c7nf5t0f.apps.googleusercontent.com",
                iosClientId:"880289297994-die98hmkhidn51238l50mpivfcbh90bj.apps.googleusercontent.com",
                scopes:['profile','email'],
              });
            } catch (e) {}
          };
        isUserEqual = (googleUser, firebaseUser) => {
            if (firebaseUser) {
              var providerData = firebaseUser.providerData;
              for (var i = 0; i < providerData.length; i++) {
                if (
                  providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                  providerData[i].uid === googleUser.getBasicProfile().getId()
                ) {
                  // We don't need to reauth the Firebase connection.
                  return true;
                }
              }
            }
            return false;
          };
        
          onSignIn = googleUser => {
            var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
              unsubscribe();
              if (!this.isUserEqual(googleUser, firebaseUser)) {
                var credential = firebase.auth.GoogleAuthProvider.credential(
                  googleUser.idToken,
                  googleUser.accessToken
                );

                firebase
                  .auth()
                  .signInWithCredential(credential)
                  .then(function(result) {
                    if (result.additionalUserInfo.isNewUser) {
                      firebase
                        .database()
                        .ref("/users/" + result.user.uid)
                        .set({
                          gmail: result.user.email,
                          profile_picture: result.additionalUserInfo.profile.picture,
                          locale: result.additionalUserInfo.profile.locale,
                          first_name: result.additionalUserInfo.profile.given_name,
                          last_name: result.additionalUserInfo.profile.family_name,
                          current_theme: "dark"
                        })
                        .then(function(snapshot) {});
                    }
                  })
                  .catch(error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                  });
              } else {
                console.log("User already signed-in Firebase.");
              }
            });
          };
        
    render(){
      if(!this.state.fontsLoaded){
        return <AppLoading/>
      } else{
        return(
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <TouchableOpacity 
              title="Sign in with Google"
              onPress={()=>this.signInWithGoogleAsync()}>
            </TouchableOpacity>
          </View>
        )
      }
    }}