import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Button } from 'antd-mobile';
import Http from "../../utils/http";
import Config from "../../utils/config";

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.nav = this.props.navigation.navigate;
        this.ID = this.props.navigation.state.params.ID;
    }

    componentWillMount = () => {
    }

    componentWillUnmount = () => {
    }

    render() {
        return (
            <View>
                <Text>{this.ID}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});