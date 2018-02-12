import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Platform, Dimensions, NativeModules, NativeEventEmitter } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Carousel, Button } from 'antd-mobile';
import Storage from "./utils/storage";
import Http from "./utils/http";
import Config from "./utils/config";

const toLogin = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'login' })
    ]
});

const toHome = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'home' })
    ]
});

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.nav = this.props.navigation.navigate;
    }

    componentWillMount() {
        this.start()
    }

    componentWillUnmount() {
    }

    start = () => {
        Storage.Get("UserInfo").then((data) => {
            if (data == null) {
                this.props.navigation.dispatch(toLogin);
            }
            else {
                var token = JSON.parse(data);
                var addTime = new Date(token['.issued']);           //添加时间   TODO  当前时间 <  添加时间+30  时重新登录
                var expiresTime = new Date(token['.expires']);      //过期时间   TODO  当前时间 >  过期时间     时刷新token
                if (new Date() > expiresTime) {
                    this.props.navigation.dispatch(toLogin);
                }
                else {
                    Http.AccessToken = token.access_token;
                    this.props.navigation.dispatch(toHome);
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.container} >
                {/* <Carousel autoplay={false} infinite={false} selectedIndex={0} swipeSpeed={40} dots={true} afterChange={index => console.log('slide to', index)}>
                    {
                        Config.LoadPage.map((x, index) => {
                            var length = Config.LoadPage.length - 1;
                            if (index != length) {
                                return (<View key={index} style={styles.wrapper}>
                                    <Image source={x.img} style={styles.img} />
                                </View>)
                            } else {
                                return (<View key={index} style={styles.wrapper}>
                                    <Image source={x.img} style={styles.img} >
                                        <Text style={styles.txt} onPress={() => { this.start() }} >开始使用</Text>
                                    </Image>
                                </View>)
                            }
                        })
                    }
                </Carousel> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    img: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        resizeMode: 'cover',
    },
    txt: {
        width: Dimensions.get("window").width,
        height: 50,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: Dimensions.get("window").height / 10 * 8,
    }
});
