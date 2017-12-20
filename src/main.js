import React from 'react';
import { Button, AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { MapView, MapTypes, Geolocation } from 'react-native-baidu-map';
import Dimensions from 'Dimensions';

export default class BaiduMap extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 15,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            mapType: MapTypes.NORMAL,
            markers: [],
            SelectedPosition: '请选择',
        };
    }

    componentWillMount = () => {
        this.getLoaction();
    }

    getLoaction = () => {
        Geolocation.getCurrentPosition().then(data => {
            this.setState({
                zoom: 15,
                marker: {
                    title: '当前位置',
                    latitude: data.latitude,
                    longitude: data.longitude
                },
                center: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    rand: Math.random()
                }
            });
        }).catch(e => {
            console.warn(e, 'error');
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map} zoom={this.state.zoom} mapType={this.state.mapType}
                    center={this.state.center} marker={this.state.marker} markers={this.state.markers}
                    trafficEnabled={this.state.trafficEnabled} baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    onMarkerClick={(e) => {
                        console.warn("markerClick", JSON.stringify(e));
                    }}
                    onMapClick={(e) => {
                        Geolocation.reverseGeoCode(e.latitude, e.longitude).then(data => {
                            this.setState({ SelectedPosition: JSON.stringify(data) });
                        })
                    }}
                >
                </MapView>

                <View style={styles.row}>
                    <Button title="当前位置" onPress={() => {
                        this.getLoaction();
                    }} />

                    <Button title="普通地图" onPress={() => {
                        this.setState({
                            mapType: MapTypes.NORMAL
                        });
                    }} />
                    <Button title="卫星地图" onPress={() => {
                        this.setState({
                            mapType: MapTypes.SATELLITE
                        });
                    }} />

                    <Button title="交通情况" onPress={() => {
                        this.setState({
                            trafficEnabled: !this.state.trafficEnabled
                        });
                    }} />

                    <Button title="热力分布" onPress={() => {
                        this.setState({
                            baiduHeatMapEnabled: !this.state.baiduHeatMapEnabled
                        });
                    }} />
                </View>

                <View style={styles.row} >
                    <Text>{this.state.SelectedPosition}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 200,
    },
    row: {
        marginTop: 15,
        flexDirection: 'row',
        height: 40
    }
});