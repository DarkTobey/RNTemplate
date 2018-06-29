import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const backImage = require("../../wwwroot/navbar/back.png");
const rightImage = require("../../wwwroot/navbar/more.png");

export default class NavBar extends Component {

    static propTypes = {
        leftIcon: PropTypes.number,
        onLeftClick: PropTypes.func,

        rightIcon: PropTypes.number,
        rightText: PropTypes.object,
        onRightClick: PropTypes.func,

        bgColor: PropTypes.string,
        imageColor: PropTypes.string,
        titleColor: PropTypes.string,
    };

    static defaultProps = {
        leftIcon: backImage,
        rightIcon: rightImage,
        bgColor: 'white',
        titleColor: 'black',
    };

    _renderRight() {
        if (this.props.rightText) {
            return (<Text style={styles.text_right}>
                {this.props.rightText}
            </Text>)
        }

        return (<Image source={this.props.rightIcon} style={styles.image_header_right} />)
    }

    render() {
        return (
            <View style={[styles.view_container, { backgroundColor: this.props.bgColor }]}>
                <View style={styles.view_left}>
                    <TouchableOpacity shadowOpacity={0.5} onPress={this.props.onLeftClick}>
                        <Image source={this.props.leftIcon} style={styles.image_header_left} />
                    </TouchableOpacity>
                </View>
                <View style={styles.view_title}>
                    <Text style={[styles.text_title, { color: this.props.titleColor }]}>{this.props.title}</Text>
                </View>
                <View style={styles.view_right}>
                    <TouchableOpacity shadowOpacity={0.5} onPress={this.props.onRightClick}>
                        <View>
                            {this._renderRight()}
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    view_container: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    view_title: {
        flex: 1,
    },
    view_left: {
        paddingLeft: 8,
    },
    view_right: {
        paddingRight: 8,
    },
    image_header_left: {
        height: 20,
        width: 20,
    },
    image_header_right: {
        height: 20,
        width: 20,
    },
    text_right: {
        fontSize: 18,
    },
    text_title: {
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
})
