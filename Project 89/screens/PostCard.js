import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";


export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme:true,
      post_id:this.props.post.key,
      post_data:this.props.post.value
    };
  }

  async _loadFontsAsync() {
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <View style={styles.authorContainer}>
                <View style={styles.authorImageContainer}>
                    <Image
                    source={require("../assets/profile_img.png")}
                    style={styles.profileImage}
                    ></Image>
                </View>
            <View style={styles.authorNameContainer}>
              <Text style={styles.authorNameContainer}> {this.props.post.author} </Text>
            </View>
            </View>
                    <Image
                    source={require("../assets/post.jpeg")}
                    style={styles.postImage}
                    />
            <View style={styles.captionContainer}>
              <Text style={styles.captionText}> {this.props.post.caption} </Text>
            </View>
            <View style={styles.actionContainer}>
                <View styles={styles.likeButton}>
                    <Ionicons name={'heart'} size={RFValue(30)} color={'white'}/>
                    <Text styles={this.state.light_theme ? styles.likeTextLight:styles.likeText}>12k</Text>
                </View>
            </View>
        </View>
     </View>

            
      );
    }
  }
}

const styles=StyleSheet.create({
    container: {
        flex: 1
      },
      cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
      },
      authorContainer:{

      },
      authorImageContainer:{

      },
      profileImage: {
        resizeMode: "contain",
        width: "95%",
        alignSelf: "center",
        height: RFValue(250)
      },
      authorNameContainer: {
        paddingLeft: RFValue(20),
        justifyContent: "center"
      },
      captionContainer:{
          
      },
      captionText: {
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10)
      },
      actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
      },
      likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
      },
      likeText: {
        color: "white",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
      },
      likeText: {
        color: "black",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
      }
    });