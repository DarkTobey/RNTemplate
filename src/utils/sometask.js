import React, { Component } from 'react'
import { Platform, ToastAndroid, NativeModules } from 'react-native'
import Http from "./http";
import Config from "./config";
import Storage from "./storage";
import Location from './location';

module.exports = async (data) => {
    Storage.Get("UserInfo").then((data) => {

        //判断token是否过期
        if (data == null) {
            return;
        }
        var token = JSON.parse(data);
        var addTime = new Date(token['.issued']);
        var expiresTime = new Date(token['.expires']);
        if (new Date() > expiresTime) {
            return;
        }

        Location.getCurrentPosition().then((d) => {
            console.log(d);

            let formData = {};
            formData.PosId = "";
            formData.UserId = "";
            formData.Lat = d.latitude;
            formData.Lng = d.longitude;
            formData.Height = d.altitude;
            formData.Speed = d.speed;
            formData.Angle = d.direction;
            formData.CollectDate = new Date();
            formData.CreateDate = new Date();

            Http.PostAsJson("/api/positions", formData, (d) => {
                console.log(d);
            });
        })
    })
}