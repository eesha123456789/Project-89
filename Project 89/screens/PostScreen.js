import React, { Component } from "react";
import {View, Text,StyleSheet, Image} from "react-native";
export default class PostScreen extends Component{
    renderItem=({item:post})=>{
        return <Postcard post={post} navigation={this.PaymentResponse.navigation}/>
    }
}
