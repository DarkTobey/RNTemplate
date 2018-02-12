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
            user: {}
        };
    }

    componentWillMount = () => {
        this.getMe();
    }

    componentWillUnmount = () => {
    }

    getMe = () => {
        Http.Get("/api/user/me", null, (d) => {
            this.setState({ user: d });
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
            <ScrollView style={styles.container} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}  >
                <List renderHeader={() => '个人中心'}>
                    <List.Item thumb={<Image source={require('../../wwwroot/icon/account_sel.png')} style={styles.img} />} extra={this.state.user.UserName} >账号</List.Item>
                    <List.Item thumb={<Image source={require('../../wwwroot/icon/activity_sel.png')} style={styles.img} />} extra={this.state.user.NickName} >姓名</List.Item>
                    <List.Item thumb={<Image source={require('../../wwwroot/icon/phone_sel.png')} style={styles.img} />} extra={this.state.user.PhoneNO} >电话</List.Item>
                    <List.Item thumb={<Image source={require('../../wwwroot/icon/comment_sel.png')} style={styles.img} />} extra={this.state.user.Email} >邮箱</List.Item>
                </List>

                <List renderHeader={() => '检查更新'}>
                    <List.Item thumb={<Image source={require('../../wwwroot/icon/notice_sel.png')} style={styles.img} />} extra={"ver:" + Config.AppVersionName} arrow="horizontal" onClick={() => { /*Http.CheckUpdate(true);*/ }}>检查更新</List.Item>
                </List>

                <List renderHeader={() => '安全退出'} >
                    <Button type="primary" onClick={() => this.logOut()} >退出登录</Button>
                </List>
            </ScrollView >
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f9',
        paddingHorizontal: 3
    },
    img: {
        width: 25,
        height: 25,
        marginRight: 8
    },
});