import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, InteractionManager, Animated, Easing, Platform, Image, Alert } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Camera from 'react-native-camera';

const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');

export default class ScanCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
        };

        this.show = true;
        this.nav = this.props.navigation.navigate;
    }

    componentWillMount() {
        console.log("scancode 构建");
        this.startAnimation()
    }

    componentWillUnmount() {
        console.log("scancode 卸载");
        this.show = false;
    }

    startAnimation() {
        if (this.show) {
            this.state.anim.setValue(0);
            Animated.timing(this.state.anim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
            }).start(() => this.startAnimation());
        }
    }

    //扫描到二维码方法
    barcodeReceived = (e) => {
        if (this.show) {
            this.show = false;
            if (e) {
                // Alert.alert('提示', e.data, [{ text: '确定' }]);
                this.props.navigation.state.params.callback(e.data);
                this.props.navigation.goBack();
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera style={styles.preview} barCodeTypes={['qr']} onBarCodeRead={this.barcodeReceived}>
                    <View style={{ height: (height - 60) / 3, width: width, backgroundColor: 'rgba(0,0,0,0.5)', }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.itemStyle} />
                        <View>
                            <View style={{ position: 'absolute', left: 0, top: 0 }}>
                                <View style={{ height: 4, width: 20, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 20, width: 4, backgroundColor: '#37b44a' }} />
                            </View>
                            <View style={{ position: 'absolute', right: 2, top: -2, transform: [{ rotate: '90deg' }] }}>
                                <View style={{ height: 4, width: 20, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 20, width: 4, backgroundColor: '#37b44a' }} />
                            </View>
                            <View style={{ position: 'absolute', left: 2, bottom: -2, transform: [{ rotateZ: '-90deg' }] }}>
                                <View style={{ height: 4, width: 20, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 20, width: 4, backgroundColor: '#37b44a' }} />
                            </View>
                            <View style={{ position: 'absolute', right: 0, bottom: 0, transform: [{ rotateZ: '180deg' }] }}>
                                <View style={{ height: 4, width: 20, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 20, width: 4, backgroundColor: '#37b44a' }} />
                            </View>
                            <Animated.View style={[styles.animatiedStyle, {
                                transform: [{
                                    translateY: this.state.anim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 200]
                                    })
                                }]
                            }]}>
                            </Animated.View>
                        </View>
                        <View style={styles.itemStyle} />
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: width, alignItems: 'center' }}>
                        <Text style={styles.textStyle}>将二维码放入框内</Text>
                    </View>
                </Camera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
    },
    rectangle: {
        height: 200,
        width: 200,
    },
    animatiedStyle: {
        height: 2,
        width: 200,
        backgroundColor: '#00ff00'
    },
    itemStyle: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: (width - 200) / 2,
        height: 200
    },
    textStyle: {
        color: '#fff',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
});