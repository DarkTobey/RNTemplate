import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Text, View, ScrollView } from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';

export default class StopWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeElapsed: 0,
            laps: [],
            running: false,
            startTime: null
        }
    }

    componentWillMount = () => {
        console.log("StopWatch 构建");
        this.handleStartPress();
    }

    componentWillUnmount = () => {
        console.log("StopWatch 卸载");
        clearInterval(this.interval);
    }

    handleStartPress = () => {
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({ running: false });
            return
        }

        this.setState({ startTime: new Date() });
        this.interval = setInterval(() => {
            this.setState({
                timeElapsed: new Date() - this.state.startTime,
                running: true
            });
        }, 30);
    }

    render() {
        return (
            <Text style={styles.timer}>
                {formatTime(this.state.timeElapsed)}
            </Text>
        );
    }
}

var styles = StyleSheet.create({
    timer: {
        fontSize: 40
    },
});