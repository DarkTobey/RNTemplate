import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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

        // 获取参数
        //this.ID = this.props.navigation.state.params.ID;

        // 通过代码使页面返回
        // this.props.navigation.state.params.callback(code);
        // this.props.navigation.goBack();
    }

    componentWillMount = () => {
        console.log("构建");
    }

    componentWillUnmount = () => {
        console.log("卸载");
    }

    render() {
        return (
            <ScrollView>
                <Text>模板页</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
});