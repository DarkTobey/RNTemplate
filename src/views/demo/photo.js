import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Accordion, ImagePicker, Checkbox, List, Button, Tabs, DatePicker, Picker, InputItem, TextareaItem, Toast, Tag, Modal } from 'antd-mobile';
import Http from "../../utils/http";
import Config from "../../utils/config";

const ImagePickerModule = require('react-native-image-picker');

export default class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: []
        };

        this.nav = this.props.navigation.navigate;
    }

    componentWillMount = () => {
    }

    componentWillUnmount = () => {
    }


    selectPicture = () => {
        var options = {
            title: "选择一张图片",
            cancelButtonTitle: "取消",
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "图库",
        };
        ImagePickerModule.showImagePicker(options, (response) => {
            console.log('take a photo and data is ', response);
            if (response.didCancel || response.error) {
                return;
            }
            this.state.pictures.push({
                fileName: response.fileName,
                url: response.uri,
            });
            this.setState({
                pictures: this.state.pictures,
            });
        });
    }

    render() {
        return (
            <View>
                <List renderHeader={() => "附件"}>
                    <List.Item>
                        <ImagePicker files={this.state.pictures} onAddImageClick={() => { this.selectPicture() }} onChange={(files, type) => { this.setState({ pictures: files }) }} />
                    </List.Item>
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});