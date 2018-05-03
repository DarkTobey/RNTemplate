import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import { List, Button, TabBar, Grid } from 'antd-mobile';
import UserCenter from "./user/usercenter";
import Location from "../utils/location";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '主页'
        };

        this.nav = this.props.navigation.navigate;
        this.gridData = [
            {
                text: '列表测试',
                icon: <Image source={require("../wwwroot/icon/qr_code_sel.png")} style={{ width: 50, height: 50 }} />,
                onclick: () => {
                    this.nav("list", {});
                }
            },
            {
                text: '模板页面',
                icon: <Image source={require("../wwwroot/icon/qr_code_sel.png")} style={{ width: 50, height: 50 }} />,
                onclick: () => {
                    this.nav("temp", {});
                }
            },
            {
                text: '图片选择',
                icon: <Image source={require("../wwwroot/icon/qr_code_sel.png")} style={{ width: 50, height: 50 }} />,
                onclick: () => {
                    this.nav("photo", {});
                }
            },
            {
                text: '高德地图',
                icon: <Image source={require("../wwwroot/icon/qr_code_sel.png")} style={{ width: 50, height: 50 }} />,
                onclick: () => {
                    this.nav("map", {});
                }
            },
            {
                text: '图表',
                icon: <Image source={require("../wwwroot/icon/qr_code_sel.png")} style={{ width: 50, height: 50 }} />,
                onclick: () => {
                    this.nav("echarts", {});
                }
            },
            {
                text: '扫码',
                icon: <Image source={require("../wwwroot/icon/qr_code_sel.png")} style={{ width: 50, height: 50 }} />,
                onclick: () => {
                    this.nav("scancode", { callback: (d) => { Alert.alert(d) } });
                }
            },
        ];
    }

    componentWillMount = () => {
        this.getLocation();
    }

    componentWillUnmount = () => {
    }

    onChangeTab = (tabName) => {
        this.setState({
            selectedTab: tabName,
        });
    }

    getLocation = () => {
        Location.getCurrentPosition().then((d) => {
            console.log(d);
        })

    }

    render() {
        return (
            <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="#ccc"  >
                <TabBar.Item title="主页" badge={0} icon={require('../wwwroot/icon/home.png')} selectedIcon={require('../wwwroot/icon/home_sel.png')}
                    selected={this.state.selectedTab === '主页'} onPress={() => this.onChangeTab('主页')} >
                    <View>
                        <Grid data={this.gridData} columnNum={4} isCarousel={false} carouselMaxRow={2} onClick={(item) => { item.onclick() }} />
                    </View>
                </TabBar.Item>

                <TabBar.Item title="列表" badge={0} icon={require('../wwwroot/icon/sort.png')} selectedIcon={require('../wwwroot/icon/sort_sel.png')}
                    selected={this.state.selectedTab === '列表'} onPress={() => this.onChangeTab('列表')}  >
                    <Text>列表</Text>
                </TabBar.Item>

                <TabBar.Item title="地图" badge={0} icon={require('../wwwroot/icon/activity.png')} selectedIcon={require('../wwwroot/icon/activity_sel.png')}
                    selected={this.state.selectedTab === '地图'} onPress={() => this.onChangeTab('地图')}  >
                    <Text>地图</Text>
                </TabBar.Item>

                <TabBar.Item title="我的" badge={0} icon={require('../wwwroot/icon/profile.png')} selectedIcon={require('../wwwroot/icon/profile_sel.png')}
                    selected={this.state.selectedTab === '我的'} onPress={() => this.onChangeTab('我的')}  >
                    <UserCenter navigation={this.props.navigation} ></UserCenter>
                </TabBar.Item>
            </TabBar>
        );
    }
}

const styles = StyleSheet.create({

});