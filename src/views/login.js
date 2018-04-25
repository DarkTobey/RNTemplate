import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Toast, Button, Card, WingBlank, WhiteSpace, List, InputItem } from 'antd-mobile';
import Http from "../utils/http";
import Config from "../utils/config";

const toHome = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'home' })
    ]
});

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '1',
            passWord: '1',
        };
    }

    componentWillMount = () => {
    }

    componentWillUnmount = () => {
    }

    login = () => {
        Toast.loading("", 0, null, true)
        Http.Login(this.state.userName, this.state.passWord, () => {
            Toast.hide();
            this.props.navigation.dispatch(toHome);
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}  >
                <Image source={Config.LoginBg.img} style={styles.bg} />

                <View style={styles.logo}>
                    <Image source={Config.Logo.img} style={styles.logoimg} />
                </View>

                <View style={styles.login}>
                    <View style={styles.txt}>
                        <InputItem type="text" placeholder='请输入用户名' value={this.state.userName} onChange={(text) => this.setState({ "userName": text })} />
                    </View>
                    <View style={styles.txt}>
                        <InputItem type="password" placeholder="请输入密码" value={this.state.passWord} onChange={(text) => this.setState({ "passWord": text })} />
                    </View>
                </View>

                <Button type="primary" style={styles.btn} inline onPressIn={() => this.login()}>登录</Button>
            </KeyboardAvoidingView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        resizeMode: 'cover',
    },
    logo: {
        alignItems: 'center',
        marginTop: 100,
    },
    logoimg: {
        width: 100,
        height: 100,
    },
    login: {
        marginTop: 50,
    },
    txt: {
        marginRight: 10,
        marginBottom: 20,
    },
    btn: {
        marginHorizontal: 10,
        marginTop: 10.
    }
})