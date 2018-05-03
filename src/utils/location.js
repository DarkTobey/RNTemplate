import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, NativeModules, Platform, DeviceEventEmitter } from 'react-native';

const _module = NativeModules.LocationModule;

export default class Loaction {

  static reverseGeoCode(lat, lng) {
    return new Promise((resolve, reject) => {
      try {
        _module.reverseGeoCode(lat, lng);
      }
      catch (e) {
        reject(e);
        return;
      }
      DeviceEventEmitter.once('onGetReverseGeoCodeResult', resp => {
        resolve(resp);
      });
    });
  }

  static getCurrentPosition() {
    if (Platform.OS == 'ios') {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          try {
            _module.reverseGeoCodeGPS(position.coords.latitude, position.coords.longitude);
          }
          catch (e) {
            reject(e);
            return;
          }
          DeviceEventEmitter.once('onGetReverseGeoCodeResult', resp => {
            resp.latitude = parseFloat(resp.latitude);
            resp.longitude = parseFloat(resp.longitude);
            resolve(resp);
          });
        }, (error) => {
          reject(error);
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          _module.getCurrentPosition();
        }
        catch (e) {
          reject(e);
          return;
        }
        DeviceEventEmitter.once('onGetCurrentLocationPosition', resp => {
          resolve(resp);
        });
      });
    }
  }

};
