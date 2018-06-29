import React from 'react';
import { StyleSheet, Text, View, Dimensions, ViewStyle } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Button, Popover, Modal, List, } from 'antd-mobile';
import { MapView } from 'react-native-amap3d';

import Http from "../../utils/http";
import Config from "../../utils/config";
import Location from "../../utils/location";

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapType: 'standard',
            mapCenter: {
                longitude: 113.981718,
                latitude: 22.542449
            },
            address: '',
            modal: false,
        };

        this.nav = this.props.navigation.navigate;
        this.menu = [
            { label: "标准", callback: () => { this.changeMapType("standard") } },
            { label: "卫星", callback: () => { this.changeMapType("satellite") } },
            { label: "导航", callback: () => { this.changeMapType("navigation") } },
            { label: "夜间", callback: () => { this.changeMapType("night") } },
            { label: "公交", callback: () => { this.changeMapType("bus") } },
        ];
    }

    componentWillMount = () => {
        this.init();
    }

    componentWillUnmount = () => {
    }

    init = () => {
        Location.getCurrentPosition().then((d) => {
            console.log("当前位置", d);
            this.setState({
                address: d.address,
                mapCenter: {
                    longitude: d.longitude,
                    latitude: d.latitude
                },
            });
        });
    }

    changeMapType = (type) => {
        this.setState({ mapType: type })
    }

    pressEvent = ({ nativeEvent }) => {
        this.log('onPress', nativeEvent)
    }

    log = (event, data) => {
        console.log(event, data);
        Location.reverseGeoCode(data.latitude, data.longitude).then((d) => {
            console.log("解析结果", d);
        })
    }

    back = (data) => {
        // 通过代码使页面返回
        this.props.navigation.goBack();
        this.props.navigation.state.params.callback(data);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView style={styles.map} zoomLevel={15} mapType={this.state.mapType} coordinate={this.state.mapCenter}
                    showsCompass={true} showsScale={true} showsZoomControls={true}
                    showsLocationButton={true} locationEnabled={true} onPress={this.pressEvent}
                />
                <View style={styles.menuContainer}>
                    <Button onClick={() => { this.setState({ modal: true }) }}>菜单</Button>
                    <Modal popup visible={this.state.modal} onClose={() => { this.setState({ modal: false }) }} animationType="slide-up" >
                        <List>
                            {
                                this.menu.map((item, index) => {
                                    return (<List.Item key={index} arrow="horizontal" onClick={() => { item.callback(); this.setState({ modal: false }) }} >{item.label}</List.Item>);
                                })
                            }
                        </List>
                    </Modal>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    menuContainer: {
        position: 'absolute',
        top: 100,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});