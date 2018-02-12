import React from 'react';
import Http from "./http";
import Storage from "./storage";
import { Toast } from 'antd-mobile';

export default class Config {

    //决定日志是否输出
    static AppIsDebug = true;

    //更新应用相关
    static AppID = "001";
    static AppVersion = 0;
    static AppVersionName = "0.0.0";
    static AppCheckUpdateURL = "http://106.14.186.95/api/system/checkupdate";

    //获取数据相关
    static BaseURI = "http://106.14.186.95";
    static ClientID = '123';
    static ClientSecret = '456';

    //引导页面图片
    static LoadPage = [
        { img: require('../wwwroot/image/load1.jpg') },
        { img: require('../wwwroot/image/load2.jpg') },
        { img: require('../wwwroot/image/load3.jpg') },
    ];

    //登录背景
    static LoginBg = { img: require('../wwwroot/image/login.jpg') };
}