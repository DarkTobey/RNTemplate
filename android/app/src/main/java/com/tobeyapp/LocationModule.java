package com.tobeyapp;

import android.support.annotation.Nullable;
import android.util.Log;

import com.alibaba.fastjson.JSON;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.services.core.AMapException;
import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.geocoder.GeocodeQuery;
import com.amap.api.services.geocoder.GeocodeResult;
import com.amap.api.services.geocoder.GeocodeSearch;
import com.amap.api.services.geocoder.RegeocodeAddress;
import com.amap.api.services.geocoder.RegeocodeQuery;
import com.amap.api.services.geocoder.RegeocodeResult;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class LocationModule extends ReactContextBaseJavaModule implements AMapLocationListener, GeocodeSearch.OnGeocodeSearchListener {

    public static final String TAG = "LocationModule";

    protected ReactApplicationContext context;

    protected AMapLocationClient mLocationClient = null;
    protected AMapLocationClientOption mLocationOption = null;
    protected GeocodeSearch mGeocoderSearch = null;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "LocationModule";
    }


    protected void InitLocation() {
        mLocationClient = new AMapLocationClient(context);

        mLocationOption = new AMapLocationClientOption();
        mLocationOption.setMockEnable(true);

        mLocationClient.setLocationOption(mLocationOption);
        mLocationClient.setLocationListener(this);
        Log.d(TAG, "初始化完成");
    }

    protected void InitGeocode() {
        mGeocoderSearch = new GeocodeSearch(context);
        mGeocoderSearch.setOnGeocodeSearchListener(this);
    }

    @Override
    public void onLocationChanged(AMapLocation aMapLocation) {
        if (aMapLocation == null || aMapLocation.getErrorCode() != 0) {
            return;
        }

        WritableMap params = Arguments.createMap();
        params.putDouble("latitude", aMapLocation.getLatitude());
        params.putDouble("longitude", aMapLocation.getLongitude());
        params.putDouble("altitude", aMapLocation.getAltitude());
        params.putDouble("direction", aMapLocation.getBearing());
        params.putDouble("speed", aMapLocation.getSpeed());
        params.putString("address", aMapLocation.getAddress());
        params.putString("country", aMapLocation.getCountry());
        params.putString("province", aMapLocation.getProvince());
        params.putString("cityCode", aMapLocation.getCityCode());
        params.putString("city", aMapLocation.getCity());
        params.putString("district", aMapLocation.getDistrict());
        params.putString("street", aMapLocation.getStreet());
        params.putString("streetNumber", aMapLocation.getStreetNum());
        params.putString("buildingId", aMapLocation.getBuildingId());
        params.putString("adCode", aMapLocation.getAdCode());
        params.putString("adAoiName", aMapLocation.getAoiName());

        Log.d(TAG, "获取了位置信息 " + JSON.toJSONString(aMapLocation));
        sendEvent("onGetCurrentLocationPosition", params);
        mLocationClient.stopLocation();
    }

    //地理编码查询回调
    @Override
    public void onGeocodeSearched(GeocodeResult geocodeResult, int rCode) {
        Log.d(TAG, "地理编码 查询" + JSON.toJSONString(geocodeResult.getGeocodeAddressList()));

    }

    //逆地理编码回调
    @Override
    public void onRegeocodeSearched(RegeocodeResult regeocodeResult, int rCode) {
        if (regeocodeResult == null || rCode != AMapException.CODE_AMAP_SUCCESS || regeocodeResult.getRegeocodeAddress() == null) {
            return;
        }

        RegeocodeAddress regeocodeAddress = regeocodeResult.getRegeocodeAddress();
        Log.d(TAG, "逆地理编码 位置信息" + JSON.toJSONString(regeocodeAddress));

        WritableMap params = Arguments.createMap();
        params.putString("address", regeocodeAddress.getFormatAddress());
        params.putString("province", regeocodeAddress.getProvince());
        params.putString("city", regeocodeAddress.getCity());
        params.putString("district", regeocodeAddress.getDistrict());
        params.putString("street", regeocodeAddress.getStreetNumber().getStreet());
        params.putString("streetNumber", regeocodeAddress.getStreetNumber().getNumber());

        sendEvent("onGetReverseGeoCodeResult", params);
    }

    @ReactMethod
    public void geocode(String city, String addr) {
        if (mGeocoderSearch == null) {
            InitGeocode();
        }

        // 第一个参数表示地址，第二个参数表示查询城市，中文或者中文全拼
        GeocodeQuery geocodeQuery = new GeocodeQuery(addr.trim(), city.trim());

        // 设置异步地理编码请求并等待通知 onGeocodeSearched
        mGeocoderSearch.getFromLocationNameAsyn(geocodeQuery);
    }

    @ReactMethod
    public void reverseGeoCode(double lat, double lng) {
        if (mGeocoderSearch == null) {
            InitGeocode();
        }

        // 第一个参数表示一个Latlng，第二参数表示范围多少米，第三个参数表示是火系坐标系还是GPS原生坐标系
        RegeocodeQuery query = new RegeocodeQuery(new LatLonPoint(lat, lng), 200, GeocodeSearch.AMAP);

        // 设置异步逆地理编码请求并等待通知 onRegeocodeSearched
        mGeocoderSearch.getFromLocationAsyn(query);
    }

    @ReactMethod
    public void getCurrentPosition() {
        if (mLocationClient == null) {
            InitLocation();
        }
        Log.d(TAG, "开始获取位置信息");
        mLocationClient.stopLocation();
        mLocationClient.startLocation();
    }

    /**
     * @param eventName
     * @param params
     */
    protected void sendEvent(String eventName, @Nullable WritableMap params) {
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }


}

