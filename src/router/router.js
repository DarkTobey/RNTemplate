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
            height: 42
        },
        headerTitleStyle: {
            alignSelf: 'center'  //flex-start
        },
        headerTintColor: 'black',
        headerRight: <Text></Text>,
    }
}

module.exports = {
    Views: [
        {
            name: 'bdmap',
            module: require('../views/bdmap'),
            option: withHeaderOption("百度地图"),
        }
    ],
}
