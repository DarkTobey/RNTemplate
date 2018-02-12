package android_upgrade;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

class UpdateApp {

    private static boolean isContextValid(Context context) {
        return context instanceof Activity && !((Activity) context).isFinishing();
    }

    public static void goToDownload(Context context, String downloadUrl) {
        Intent intent = new Intent(context.getApplicationContext(), DownloadService.class);
        intent.putExtra(DownloadService.APK_DOWNLOAD_URL, downloadUrl);
        context.startService(intent);
    }
}
