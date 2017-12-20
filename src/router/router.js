// 路由注册, 路径区分大小写, 启动时默认加载第一条路由(数组第0个)
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
            name: 'mian',
            module: require('../main'),
            option: noHeaderOption("启动页面"),
        }
    ],
}
