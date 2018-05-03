import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Routers } from './src/router/router';

//获取当前路由
function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    let route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

//首页
let screens = {
    'main': {
        screen: require('./src/main').default,
        navigationOptions: { header: null },
    }
};

//注册其他路由
Routers.map((component) => {
    screens[component.name] = {
        screen: component.module.default,
        navigationOptions: component.option
    };
});

const AppNavigator = StackNavigator(screens);
export default App = () => (
    <AppNavigator onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getCurrentRouteName(currentState);
        const prevScreen = getCurrentRouteName(prevState);

        console.log("currentScreen", currentScreen);
        console.log("prevScreen", prevScreen);
    }}
    />
);

//注册应用
AppRegistry.registerComponent('tobeyapp', () => App);
