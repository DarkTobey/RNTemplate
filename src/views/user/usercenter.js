import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, NativeModules } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List, Button, Switch } from 'antd-mobile';
import Http from "../../utils/http";
import Config from "../../utils/config";

export default class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };

        this.nav = this.props.navigation.navigate;
    }

    componentWillMount = () => {
        console.log("user 构建");
        this.getMe();
    }

    componentWillUnmount = () => {
        console.log("user 卸载");
    }

    getMe = () => {
        Http.Get("/api/user/me", null, (d) => {
            this.setState({
                user: d,
            });
            Config.CurrentUser = d;
        })
    }

    logOut = () => {
        let toLogin = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'login' })
            ]
        });

        Http.LogOut(() => {
            this.props.navigation.dispatch(toLogin);
        });
    }

    render() {
        return (
            <ScrollView style={styles.container} >
                <List renderHeader={() => '个人信息'}>
                    <List.Item wrap thumb={<Image source={require('../../wwwroot/iphone/1.png')} style={styles.img} />} extra={this.state.user.UserName} >账号</List.Item>
                    <List.Item wrap thumb={<Image source={require('../../wwwroot/iphone/11.png')} style={styles.img} />} extra={this.state.user.NickName} >姓名</List.Item>
                    <List.Item wrap thumb={<Image source={require('../../wwwroot/iphone/15.png')} style={styles.img} />} extra={this.state.user.PhoneNumber} >电话</List.Item>
                    <List.Item wrap thumb={<Image source={require('../../wwwroot/iphone/16.png')} style={styles.img} />} extra={this.state.user.Email} >邮箱</List.Item>
                </List>

                <List renderHeader={() => '系统安全'}>
                    <List.Item thumb={<Image source={require('../../wwwroot/iphone/37.png')} style={styles.img} />} arrow="horizontal" extra={"ver:" + Config.AppVersionName} onClick={() => { Http.CheckUpdate(true); }}>检查更新</List.Item>
                    <List.Item thumb={<Image source={require('../../wwwroot/iphone/46.png')} style={styles.img} />} arrow="horizontal" extra="退出" onClick={() => { this.logOut() }}>安全退出</List.Item>
                </List>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Config.BackgroundColor,
        paddingHorizontal: 3
    },
    img: {
        width: 25,
        height: 25,
        marginRight: 10
    },
});