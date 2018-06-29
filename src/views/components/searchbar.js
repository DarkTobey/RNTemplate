import React from 'react';
import { Text, Image, TextInput, View, Platform, StyleSheet, Button } from 'react-native';
import Config from '../../utils/config';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            showBtn: false,
        };
    }

    onChange = (event) => {
        let val = event.nativeEvent.text;
        this.setState({
            value: val
        });
        if (this.props.onChange) {
            this.props.onChange(val);
        }
    }

    onSubmit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.value);
        }
    }

    onFocus = () => {
        this.setState({
            showBtn: true
        });
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    onBlur = () => {
        this.setState({
            showBtn: false
        });
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <Image source={require('../../wwwroot/searchbar/icon_search.png')} style={styles.searchIcon} />
                    <TextInput
                        style={styles.inputText}
                        underlineColorAndroid='transparent'
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                </View>
                {/* <View style={styles.btnBox}>
                    <Button onPress={this.onSubmit} title="搜索" color="#2F8DFE" />
                </View> */}
                {
                    this.state.showBtn ? (<View style={styles.btnBox}>
                        <Button onPress={this.onSubmit} title="搜索" color="#2F8DFE" />
                    </View>) : <View />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {//整个容器
        flexDirection: 'row',
        backgroundColor: Config.BackgroundColor,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,     // 处理iOS状态栏    
        height: Platform.OS === 'ios' ? 68 : 48,        // 处理iOS状态栏    
    },
    searchBox: {//搜索框  
        height: 36,
        flexDirection: 'row',
        flex: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    searchIcon: {//图标    
        height: 20,
        width: 20,
        marginHorizontal: 5,
        resizeMode: 'stretch'
    },
    inputText: {//文本框
        flex: 1,
        fontSize: 15,
        padding: 0,
        backgroundColor: 'transparent',
    },
    btnBox: {//搜索按钮
        width: 60,
        marginLeft: 5,
    }
});
