import React from 'react';
import { NativeModules } from 'react-native';
import { Toast, Modal } from 'antd-mobile';
import Storage from "./storage";
import Config from "./config";

export default class Http {

    static BaseURL = Config.BaseURI;

    static AccessToken = null;

    static Login(userName, passWord, callback) {
        if (userName == '' || passWord == '') {
            Toast.fail("账号和密码必填!", 2, null, false);
            return;
        }

        let url = "/token";
        var _this = this;
        let body = "";
        let params = {
            "client_id": Config.ClientID,
            "client_secret": Config.ClientSecret,
            "grant_type": "password",
            "username": userName,
            "password": passWord,
        };
        for (var key in params) {
            body += key + '=' + params[key] + '&';
        }
        let option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        };

        fetch(this.BaseURL + url, option).then((response) => response.text()).then((responseText) => {
            try {
                console.log("token", responseText);

                let data = JSON.parse(responseText);
                if (data.access_token == null) {
                    Toast.fail("用户名或密码不正确!", 2, null, false);
                    return;
                }
                _this.AccessToken = data.access_token;
                Storage.Save("UserInfo", data).then(() => {
                    callback();
                });
            } catch (e) {
                Toast.fail("服务器返回值异常!", 2, null, false);
            }
        }).catch((err) => {

        });
    }

    static LogOut(callback) {
        this.AccessToken = null;
        Storage.Delete("UserInfo").then(() => {
            callback();
        });
    }

    static Get(url, params, callback) {
        if (params) {
            let paramsArray = [];
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        let option = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.AccessToken,
            },
        };

        fetch(this.BaseURL + url, option).then((response) => response.text()).then((responseText) => {
            this.Log("response from " + url + " " + responseText);
            if (responseText == '') {
                return;
            }
            var result = JSON.parse(responseText);
            if (result == null) {
                Toast.fail("数据为空", 2, null, false);
                return;
            }
            if (result.Code == 500) {
                Toast.fail("获取数据失败," + result.Message, 2, null, false);
                return;
            }
            callback(result);
        }).catch((err) => {

        });
    }

    static PostAsJson(url, params, callback) {
        let option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.AccessToken,
            },
            body: JSON.stringify(params)
        };

        fetch(this.BaseURL + url, option).then((response) => response.text()).then((responseText) => {
            this.Log("response from " + url + " " + responseText);
            if (responseText == '') {
                return;
            }
            var result = JSON.parse(responseText);
            if (result == null) {
                Toast.fail("数据为空", 2, null, false);
                return;
            }
            if (result.Code == 500) {
                Toast.fail("获取数据失败," + result.Message, 2, null, false);
                return;
            }
            callback(result);
        }).catch((err) => {

        });
    }

    static PostAsFormData(url, params, callback) {
        let body = "";
        for (var key in params) {
            body += key + '=' + params[key] + '&';
        }

        let option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.AccessToken,
            },
            body: body
        };

        fetch(this.BaseURL + url, option).then((response) => response.text()).then((responseText) => {
            this.Log("response from " + url + " " + responseText);
            if (responseText == '') {
                return;
            }
            var result = JSON.parse(responseText);
            if (result == null) {
                Toast.fail("数据为空", 2, null, false);
                return;
            }
            if (result.Code == 500) {
                Toast.fail("获取数据失败," + result.Message, 2, null, false);
                return;
            }
            callback(result);
        }).catch((err) => {

        });
    }

    static UploadImg(url, images, callback) {
        if (images == null || images.length == 0) {
            callback([]);
            return;
        }

        let formData = new FormData();
        for (var i = 0; i < images.length; i++) {
            formData.append("file", { uri: images[i].url, name: i + ".jpg", type: 'image/jpeg' });
        }

        let option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + this.AccessToken,
            },
            body: formData
        };

        fetch(this.BaseURL + url, option).then((response) => response.text()).then((responseText) => {
            this.Log("response from " + url, responseText);
            if (responseText == '') {
                return;
            }
            var result = JSON.parse(responseText);
            if (result == null) {
                Toast.fail("数据为空", 2, null, false);
                return;
            }
            if (result.Code == 500) {
                Toast.fail("获取数据失败," + result.Message, 2, null, false);
                return;
            }
            callback(result);
        }).catch((err) => {

        });
    }

    static CheckUpdate(showAlert) {
        NativeModules.MyRNModule.getVersionInfo((d) => {
            Config.AppVersionCode = d.versionCode;
            Config.AppVersionName = d.versionName;

            let url = Config.AppCheckUpdateURL + "?appId=" + Config.AppID + "&appVersionCode=" + d.versionCode;
            let option = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.AccessToken,
                },
            };

            fetch(url, option).then((response) => response.text()).then((responseText) => {
                this.Log("response from " + url + " " + responseText);
                if (responseText == '') {
                    return;
                }
                var result = JSON.parse(responseText);
                if (result == null) {
                    if (showAlert) {
                        Toast.info("已经是最新版本! ver:" + d.versionName, 4, null, false);
                    }
                    return;
                }
                if (result.Code == 500) {
                    Toast.fail("获取数据失败," + result.Message, 4, null, false);
                    return;
                }
                Modal.alert('发现新版本 ver:' + result.VersionName, "更新说明:" + result.UpdateNote, [
                    { text: '立即更新', onPress: () => { NativeModules.upgrade.upgrade(result.DownloadUrl) } },
                    { text: '取消', onPress: () => { } },
                ]);
            }).catch((err) => {

            });
        });
    }

    static Log(message) {
        if (Config.AppIsDebug) {
            console.log(message);
        }
    }
}
