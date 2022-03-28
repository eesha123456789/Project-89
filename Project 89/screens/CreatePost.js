import React, { Component } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, ScrollView, TextInput, Dimensions, Platform } from "react-native";
import {RFValue} from 'react-native-responsive-fontsize'
import DropDownPicker from 'react-native-dropdown-picker'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
let customFonts={
  'Bubblegum-Sans':require("../assets/fonts/BubblegumSans-reqular.ttf")}

export default class CreatePost extends Component {
  constructor(props){
    super(props);
    this.state={
      fontsLoaded:false,
      previewImage:'image_1',
      dropDownHeight:40
    }
  }
  async _loadFontsAsync(){
    await Font.loadAsync(customFonts)
    this.setState({fontsLoaded:true})
  }
  componentDidMount(){
    this._loadFontsAsync()
  }
  async addPost(){
    if(this.caption){
      let postData={
      preview_image:this.state.previewImage,
      caption:this.state.caption,
      author:firebase.auth().currentUser.displayName,
      created_on:new Date(),
      author_uid:firebase.auth().currentUser.uid,
      profile_image:this.state.profile_image,
      likes:0 
      };
      await firebase
      .database()
      .ref(
        "/posts/"+ Math.random()
        .toString(36)
        .slice(2)
      )
      .set(postData)
      .then(function(snapshot){})
      this.props.setUpdateToTrue()
      this.props.navigation.navigate("Feed")
    }
    else{
      Alert.alert(
        "ERROR","All fields are required",
        [{text:"OK",onPress:()=>console.log("OK Pressed")}],
        {cancelLabel:false}
      )
    }
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render() {
    if(!this.state.fontsLoaded){
      return <AppLoading/>
    } else{
      let preview_Images={
        image_1:require("../assets/image_1.png"),
        image_2:require("../assets/image_2.png"),
        image_3:require("../assets/image_3.png"),
        image_4:require("../assets/image_4.png"),
        image_5:require("../assets/image_5.png")
    }
    return (
      <View style={this.state.light_theme ? styles.containerLight:styles.container}>
        <SafeAreaView style={styles.driodSafeArea}/>
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image 
            source={require("../assets/logo.png")}
            style={styles.iconImage}>
            </Image>
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text style={this.state.light_theme ? styles.appTitleTextLight:styles.appTitleText}>New Post</Text>
          </View>
        </View>
        <View style={styles.fieldsContainer}>
          <ScrollView>
          <Image source={preview_Images[this.state.previewImage]}
            style={styles.previewImage}>
            </Image>
            <View style={{height:RFValue(this.state.dropDownHeight)}}>
              <DropDownPicker
              items={[
                {label:"Image 1",value:"image_1"},
                {label:"Image 2",value:"image_2"},
                {label:"Image 3",value:"image_3"},
                {label:"Image 4",value:"image_4"},
                {label:"Image 5",value:"image_5"},
                {label:"Image 6",value:"image_6"},
                {label:"Image 7",value:"image_7"},
              ]}
            defaultValue={this.state.previewImage}
            containerStyle={{height:40, borderRadius:20, marginBottom:10}}
            onOpen={()=>{
              this.setState({dropDownHeight:170})
            }}
            onClose={()=>{
              this.setState({dropDownHeight:40})
            }}
            style={{backgroundColor:'transparent'}}
            itemStyle={{justifyContent:"flex-start"}}
            dropDownStyle={{backgroundColor:"#2a2a2a"}}
            labelStyle={{color:"white", fontFamily:"Bubblegum-Sans"}}
            arrowStyle={{color:"white", fontFamily:"Bubblegum-Sans"}}
            onChangeItem={item=>this.setState({
              previewImage:item.value
            })}/>
          </View>
          <TextInput style={styles.inputFont} 
          onChangeText={title => this.setState({ title })} 
          placeholder={"Caption"} 
          placeholderTextColor="white" /> 
          <TextInput style={[ 
            styles.inputFont, 
            styles.inputFontExtra, 
            styles.inputTextBig ]} 
            onChangeText={description => 
              this.setState({ description })} 
              placeholder={"Description"} 
              multiline={true} 
              numberOfLines={4} 
              placeholderTextColor="white" /> 
          <TextInput style={[ 
            styles.inputFont, 
            styles.inputFontExtra, 
            styles.inputTextBig ]} 
            onChangeText={post => 
              this.setState({ post })} 
              placeholder={"Post"} 
              multiline={true} 
              numberOfLines={20}
              placeholderTextColor="white" /> 
              <TextInput style={[ 
                styles.inputFont, 
                styles.inputFontExtra, 
                styles.inputTextBig ]} 
                onChangeText={moral => 
                this.setState({ moral })} 
                placeholder={"Moral of the post"} 
                multiline={true} 
                numberOfLines={4} 
                placeholderTextColor="white" />

          </ScrollView>
        </View>
      <View style={{flex:0.08}}/>
    </View>
    );
  }
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#15193C'
  },
  containerLight: {
    flex: 1,
    backgroundColor:'#eaeaea'
  },
  droidSafeArea: { 
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35) 
  }, 
  appTitle: { 
    flex: 0.07, 
    flexDirection: "row" 
  }, 
  appIcon: { 
    flex: 0.3, 
    justifyContent: "center", 
    alignItems: "center" 
  }, 
  iconImage: { 
    width: "100%", 
    height: "100%", 
    resizeMode: "contain" 
  }, 
  appTitleTextContainer: { 
    flex: 0.7, 
    justifyContent: "center" 
  }, 
  appTitleTextLight: { 
    color: "white", 
    fontSize: RFValue(28), 
    fontFamily: "Bubblegum-Sans" 
  }, 
  appTitleText: { 
    color: "black", 
    fontSize: RFValue(28), 
    fontFamily: "Bubblegum-Sans" 
  }, 
  fieldsContainer: { 
    flex: 0.85 
  }, 
  previewImage: { 
    width: "93%", 
    height: RFValue(250), 
    alignSelf: "center", 
    borderRadius: RFValue(10), 
    marginVertical: RFValue(10), 
    resizeMode: "contain" 
  }, 
  inputFont: { 
    height: RFValue(40), 
    borderColor: "white", 
    borderWidth: RFValue(1), 
    borderRadius: RFValue(10), 
    paddingLeft: RFValue(10), 
    color: "white", 
    fontFamily: "Bubblegum-Sans" 
  }, 
  inputFontExtra: { 
    marginTop: RFValue(15) 
  }, 
  inputTextBig: {
    textAlignVertical: "top", 
    padding: RFValue(5) 
  }
});
