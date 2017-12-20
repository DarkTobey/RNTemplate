import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Views } from './src/router/router';

let screens = {};

Views.map((component) => {
    screens[component.name] = {
        screen: component.module.default,
        navigationOptions: component.option
    };
});

export default App = StackNavigator(screens);

AppRegistry.registerComponent('rnmap', () => App);
