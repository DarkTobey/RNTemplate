import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Button } from 'antd-mobile';
import Http from "../../utils/http";
import Config from "../../utils/config";
import { MapView } from 'react-native-amap3d'

export default class Map extends React.Component {
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

    render() {
        return (
            <MapView mapType='standard' style={StyleSheet.absoluteFill} />
        );
    }
}

const styles = StyleSheet.create({
});