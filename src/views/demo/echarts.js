import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Accordion, ImagePicker, Checkbox, List, Button, Tabs, DatePicker, Picker, InputItem, TextareaItem, Toast, Tag, Modal } from 'antd-mobile';
import Http from "../../utils/http";
import Config from "../../utils/config";

import Echarts from 'native-echarts';

export default class EchartsDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.nav = this.props.navigation.navigate;

        this.EchartsOption = {
            title: {
                text: 'ECharts demo'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
    }

    componentWillMount = () => {
    }

    componentWillUnmount = () => {
    }

    render() {
        return (
            <View>
                <Echarts option={this.EchartsOption} height={300} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
});