import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Views } from './src/router/router';

//首页
let screens = {
    'main': {
        screen: require('./src/main').default,
        navigationOptions: { header: null },
    }
};

//注册其他路由
Views.map((component) => {
    screens[component.name] = {
        screen: component.module.default,
        navigationOptions: component.option
    };
});

export default App = StackNavigator(screens);

AppRegistry.registerComponent('rnmap', () => App);
