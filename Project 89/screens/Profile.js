import React, { Component } from 'react';
import { Text, View, Image, Switch, SafeAreaView, TouchableOpacity,  } from 'react-native';
let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};
import firebase from "firebase";
export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            fontsLoaded: false,
            isEnabled:false,
            light_theme:true,
            profile_image:"",
            name:""
        }

    }
    toggleSwitch(){
        const previous_state=this.state.isEnabled
        const theme=!this.state.isEnabled?"dark":"light"
        var updates={}
        updates["/users/"+firebase.auth().currentUser.uid+"/current_theme"]=theme
        firebase.database().ref().update(updates)
        this.setState({isEnabled:!previous_state,light_theme:previous_state})
    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    async fetchUser(){
        let theme,name,image
        await firebase
        .database()
        .ref("/users/"+firebase.auth().currentUser.uid)
        .on("value",function(snapshot){
          theme=snapshot.val().currentTheme
          name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
          image=snapshot.val().profile_picture
        })
        this.setState({
          light_theme:theme==="light"?true:false,
          isEnable:theme==="light"?false:true,
          name:name,
          profile_image:image
        })
      }
    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
    }
    render() {
        return (
            <View style={this.state.light_theme ? styles.containerLight:styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.appTitle}>
                    <Image source={require("../assets/logo.png")}
                    style={styles.appIcon}>
                    </Image>
                    <Text style={this.state.light_theme ? styles.appTitleTextLight:styles.appTitleText}>{"Spectagram App"}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={()=>this.signInWithGoogleAsync()}>
                        <Image 
                            source={require("../assests/google_icon.png")} 
                            style={styles.googleIcon}>
                        </Image>
                        <Text style={styles.this.state.light_theme ? styles.goggleTextLight:googleText}>Sign in with Google</Text>
                    </TouchableOpacity>
                    </View>
                <View style={styles.cloudContainer}>
                    <Image
                        source={require("../assets/cloud.png")}
                        style={styles.cloudImage}>
                    </Image>
                </View>
            <Switch 
            style={{transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]}}   
            trackColor={{ false: "#767577", true: "white" }} 
            thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"} 
            ios_backgroundColor="#3e3e3e" 
            onValueChange={() => this.toggleSwitch()} 
            value={this.state.isEnabled}/>
        </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#15193C",
    },
    containerLight: {
      flex: 1,
      backgroundColor:"#eaeaea",
    },
    droidSafeArea:{
      marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
    },
    appTitle:{
      flex:0.07,
      flexDirection:"row"
    },
    appIcon:{
      flex:0.03,
      justifyContent:"center",
      alignItems:"center"
    },
    appTitleText:{
      color:"white",
      fontSize:RFValue(28),
      fontfamily:"Bubblegum-Sans"
    },
    appTitleTextLight:{
      color:"black",
      fontSize:RFValue(28),
      fontfamily:"Bubblegum-Sans"
    },
    buttonContainer:{
      flex:0.5,
      justifyContent:"center",
      alignItems:"center"
    },
    button:{
        flex:0.5,
        justifyContent:"center",
        alignItems:"center"
    },
    googleIcon:{
      width:RFValue(140),
      height:RFValue(140),
      borderRadius:RFValue(70)
    },
    googleText: { 
        color: "white", 
        fontSize: RFValue(30), 
        fontFamily: "Bubblegum-Sans", 
        marginRight: RFValue(15) 
    },
    cloudContainer:{ 
      flex: 0.2,
       flexDirection: "row", 
       justifyContent: "center", 
       marginTop: RFValue(20) 
    }, 
    cloudImage:{
        width:'100%',
        height:"100%",
        resizeMode:"contain"
    },
  });