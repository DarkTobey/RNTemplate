// 路由注册, 路径区分大小写
import React from 'react';
import { Text } from 'react-native';

noHeaderOption = (titleText) => {
    return {
        header: null,
        headerTitle: titleText,
    }
}

withHeaderOption = (titleText) => {
    return {
        headerTitle: titleText,
        headerStyle: {
            backgroundColor: 'white',
            height: 45
        },
        headerTitleStyle: {
            alignSelf: 'center'  //居左flex-start , 居中center
        },
        headerTintColor: 'black',
        headerRight: <Text></Text>,
    }
}

withHeaderNoLeft = (titleText) => {
    return {
        headerTitle: titleText,
        headerStyle: {
            backgroundColor: 'white',
            height: 45
        },
        headerTitleStyle: {
            alignSelf: 'center',  //居左flex-start , 居中center
            textAlign: 'center',
        },
        headerTintColor: 'black',
        headerRight: <Text></Text>,
        headerLeft: <Text></Text>,
    }
}

module.exports = {
    Routers: [
        {
            name: 'temp',
            module: require('../views/demo/temp'),
            option: withHeaderOption("模板页"),
        },
        {
            name: 'list',
            module: require('../views/demo/list'),
            option: withHeaderOption("列表页"),
        },
        {
            name: 'detail',
            module: require('../views/demo/detail'),
            option: withHeaderOption("详细页"),
        },
        {
            name: 'photo',
            module: require('../views/demo/photo'),
            option: withHeaderOption("拍照"),
        },
        {
            name: 'echarts',
            module: require('../views/demo/echarts'),
            option: withHeaderOption("图表"),
        },
        {
            name: 'map',
            module: require('../views/demo/map'),
            option: withHeaderOption("地图"),
        },
        {
            name: 'login',
            module: require('../views/login'),
            option: noHeaderOption("登录"),
        },
        {
            name: 'home',
            module: require('../views/home'),
            option: noHeaderOption("主页"),
        },
        {
            name: 'usercenter',
            module: require('../views/user/usercenter'),
            option: noHeaderOption("个人中心"),
        },
    ],
}
