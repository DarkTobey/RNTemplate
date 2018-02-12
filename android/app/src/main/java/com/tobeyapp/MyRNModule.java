package com.tobeyapp;

import android.content.Context;
import android.content.pm.PackageManager;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;


public class MyRNModule extends ReactContextBaseJavaModule {

    private Context mContext;

    public MyRNModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyRNModule";
    }

    @ReactMethod
    public void show(String msg) {
        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void getVersionInfo(Callback callback) {
        try {

            int versionCode = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0).versionCode;
            String versionName = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0).versionName;
            WritableMap map = Arguments.createMap();
            map.putInt("versionCode", versionCode);
            map.putString("versionName", versionName);
            callback.invoke(map);

        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
    }
}
