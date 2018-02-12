import React, { AsyncStorage } from 'react-native';

export default class Storage {

    static Get(key) {
        return AsyncStorage.getItem(key);
    }

    static Save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    static Update(key, value) {
        return Storage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }

    static Delete(key) {
        return AsyncStorage.removeItem(key);
    }

}
