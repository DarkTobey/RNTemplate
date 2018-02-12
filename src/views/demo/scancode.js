import React, { Component } from 'react'
import { View, StyleSheet, Text, ProgressBarAndroid, Dimensions, ActivityIndicator, ActivityIndicatorIOS, TouchableHighlight, Alert } from 'react-native'
import Camera from 'react-native-camera';

export default class ScanCode extends Component {
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

    onBarCodeRead = (e) => {
        console.log("Barcode Found!", 'type is ' + e.type + ' ,data is ' + e.data);
        this.props.navigation.state.params.callback(e.data);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera style={styles.preview}
                    onBarCodeRead={(e) => { this.onBarCodeRead(e) }}>
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
});