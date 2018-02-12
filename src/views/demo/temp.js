import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Accordion, ImagePicker, Checkbox, List, Button, Tabs, DatePicker, Picker, InputItem, TextareaItem, Toast, Tag, Modal } from 'antd-mobile';
import Http from "../../utils/http";
import Config from "../../utils/config";

export default class Temp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.nav = this.props.navigation.navigate;
    }

    componentWillMount = () => {
    }

    componentWillUnmount = () => {
    }

    render() {
        return (
            <View>
                <Text>模板页</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});