import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Platform, TextInput, Dimensions, Alert, NativeModules, NativeEventEmitter, ToastAndroid, Button } from 'react-native'
import { Views } from './router/router';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.nav = this.props.navigation.navigate;
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.content}>
                {
                    Views.map((item, index) => {
                        return (<Button title={item.name} onPress={() => { this.nav(item.name) }} />)
                    })
                }
            </View >
        )
    }
}

const styles = {
    content: {
        flexDirection: 'column',
    }
}

