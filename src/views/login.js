import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, Platform, KeyboardAvoidingView, TouchableOpacity, CheckBox } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Toast, Button, Card, WingBlank, WhiteSpace, List, InputItem, Modal } from 'antd-mobile';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo, Sae, Jiro, Kohana } from 'react-native-textinput-effects';

import Http from "../utils/http";
import Config from "../utils/config";
import Storage from "../utils/storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',

            autoLogin: true,
            modalContactUs: false,
            modalAboutUs: false,
        };
    }

    componentWillMount = () => {
        this.loginInfo();
    }

    loginInfo = () => {
        Storage.Get("LoginInfo").then((data) => {
            console.log(data);
            if (data != null) {
                let info = JSON.parse(data);
                this.setState(info);
                return;
            }
            this.setState({
                userName: Config.TestUserName,
                passWord: Config.TestPassword,
            });
        })
    }

    login = () => {
        let toHome = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'home' })
            ]
        });

        Toast.loading("", 0, null, true)
        Http.Login(this.state.userName, this.state.passWord, () => {
            Toast.hide();
            this.props.navigation.dispatch(toHome);
        });
    }

    setAutoLogin = () => {
        this.setState({
            autoLogin: !this.state.autoLogin
        })
    }

    forgetPassword = () => {

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image source={Config.LoginBg.img} style={styles.bg} />

                <View style={styles.logo} >
                    {/* <Image source={Config.Logo.img} style={styles.logo} /> */}
                </View>

                <View style={styles.loginContent}>
                    <KeyboardAvoidingView>
                        <View style={styles.inputItem}>
                            <Hideo
                                placeholder="账户"

                                label="账户"
                                iconClass={FontAwesomeIcon}
                                iconName={'user'}
                                iconColor={'white'}
                                iconBackgroundColor={'#B4B4AA'}

                                inputStyle={{ color: '#464949' }}
                                value={this.state.userName}
                                onChange={(event) => { this.setState({ userName: event.nativeEvent.text }) }}
                            />
                        </View>

                        <View style={styles.inputItem}>
                            <Hideo
                                placeholder="密码"

                                label="密码"
                                iconClass={FontAwesomeIcon}
                                iconName={'lock'}
                                iconColor={'white'}
                                iconBackgroundColor={'#B4B4AA'}

                                inputStyle={{ color: '#464949' }}
                                secureTextEntry={true}
                                value={this.state.passWord}
                                onChange={(event) => { this.setState({ passWord: event.nativeEvent.text }) }}
                            />
                        </View>

                        <TouchableOpacity activeOpacity={0.5} onPress={() => { this.login() }}>
                            <View style={styles.loginBtnView}>
                                <Text style={styles.loginBtn}>登录</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.tips}>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.setAutoLogin}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <CheckBox value={this.state.autoLogin} />
                                    <Text style={styles.txt}>自动登录</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.forgetPassword}>
                                <View>
                                    <Text style={styles.txt}>忘记密码?</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>

                <View style={styles.service}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { this.setState({ modalContactUs: true }) }}>
                        <View>
                            <Text style={styles.txt}>联系客服</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.txt}>  |  </Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { this.setState({ modalAboutUs: true }) }}>
                        <View >
                            <Text style={styles.txt}>关于我们</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Modal visible={this.state.modalContactUs} transparent title="联系我们" footer={[{ text: '关闭', onPress: () => { this.setState({ modalContactUs: false }) } }]} >
                    <View style={styles.modal}>
                        <Text>电话：110</Text>
                    </View>
                </Modal>

                <Modal visible={this.state.modalAboutUs} transparent title="关于我们" footer={[{ text: '关闭', onPress: () => { this.setState({ modalAboutUs: false }) } }]}>
                    <View style={styles.modal}>
                        <Text>技术支持：金禾软件</Text>
                    </View>
                </Modal>

            </View >
        );
    }
}

var styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: width,
        height: height,
        resizeMode: 'cover',
    },
    logo: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: height / 15
    },
    loginContent: {
        flex: 1,
        justifyContent: "center",
        // marginTop: height / 8,
        paddingHorizontal: 20,
    },
    inputItem: {
        height: 45,
        marginTop: 15,
        borderRadius: 5,
    },
    loginBtnView: {
        width: width - 40,
        height: 45,
        marginTop: 15,
        backgroundColor: '#3899FF',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    loginBtn: {
        fontSize: 18,
        color: 'white',
    },
    tips: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 5,
    },
    service: {
        position: 'absolute',
        left: 0,
        bottom: 10,
        width: width,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
    },
    txt: {
        fontSize: 14,
        color: 'white',
    },
    modal: {
        padding: 20,
    }
})