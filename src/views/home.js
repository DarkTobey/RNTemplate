import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import { List, Button, TabBar, Grid } from 'antd-mobile';

import Http from "../utils/http";
import Config from "../utils/config";
import Storage from "../utils/storage";

import Map from './demo/map';
import ListPage from './demo/list';
import PhotoPage from './demo/photo';
import UserCenter from "./user/usercenter";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '页面1'
        };

        this.nav = this.props.navigation.navigate;
    }

    componentWillMount = () => {
        console.log("home 构建");
    }

    componentWillUnmount = () => {
        console.log("home 卸载");
    }

    onChangeTab = (tabName) => {
        this.setState({
            selectedTab: tabName,
        });
    }

    render() {
        return (
            <TabBar unselectedTintColor="#888888" tintColor="#00A1EF" barTintColor="#FFFFFF"  >
                <TabBar.Item title="页面1" badge={0} icon={require('../wwwroot/icon/activity.png')} selectedIcon={require('../wwwroot/icon/activity_sel.png')}
                    selected={this.state.selectedTab === '页面1'} onPress={() => this.onChangeTab('页面1')}  >
                    <Map navigation={this.props.navigation} ></Map>
                </TabBar.Item>

                <TabBar.Item title="页面2" badge={2} icon={require('../wwwroot/icon/address_book.png')} selectedIcon={require('../wwwroot/icon/address_book_sel.png')}
                    selected={this.state.selectedTab === '页面2'} onPress={() => this.onChangeTab('页面2')}  >
                    <ListPage navigation={this.props.navigation} ></ListPage>
                </TabBar.Item>

                <TabBar.Item title="页面3" badge={0} icon={require('../wwwroot/icon/edit.png')} selectedIcon={require('../wwwroot/icon/edit_sel.png')}
                    selected={this.state.selectedTab === '页面3'} onPress={() => this.onChangeTab('页面3')}  >
                    <PhotoPage navigation={this.props.navigation} ></PhotoPage>
                </TabBar.Item >

                <TabBar.Item title="页面4" badge={0} icon={require('../wwwroot/icon/profile.png')} selectedIcon={require('../wwwroot/icon/profile_sel.png')}
                    selected={this.state.selectedTab === '页面4'} onPress={() => this.onChangeTab('页面4')}  >
                    <UserCenter navigation={this.props.navigation} ></UserCenter>
                </TabBar.Item >
            </TabBar >
        );
    }
}

const styles = StyleSheet.create({
});