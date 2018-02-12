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
            userName: '',
            passWord: '',
        };
    }

    componentDidMount = () => {
        this.setState({
            userName: '1',
            passWord: '1'
        });
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
            <View style={styles.container}>
                <Image source={Config.LoginBg.img} style={styles.imgBg} />
                <View style={styles.loginContent} >
                    <List>
                        <InputItem type="text" placeholder='请输入用户名' value={this.state.userName} onChange={(text) => this.setState({ "userName": text })} >账号
                            </InputItem>
                        <WhiteSpace size="lg" />
                        <InputItem type="password" placeholder="请输入密码" value={this.state.passWord} onChange={(text) => this.setState({ "passWord": text })} >密码
                            </InputItem>
                    </List>
                    <Button type="primary" inline style={{ marginTop: 15, marginHorizontal: 5 }} onPressIn={() => this.login()}>登录</Button>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        resizeMode: 'cover',
    },
    loginContent: {
        marginTop: 230,
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 5,
        borderColor: 'white',
        backgroundColor: "white",
        opacity: 1,
    }
})