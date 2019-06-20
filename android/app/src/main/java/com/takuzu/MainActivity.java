package com.takuzu;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.Manifest;
import android.os.Bundle;
import com.karumi.dexter.Dexter;
import com.karumi.dexter.MultiplePermissionsReport;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.multi.MultiplePermissionsListener;

import org.devio.rn.splashscreen.SplashScreen;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Takuzu";
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

     @Override
    protected void onCreate(Bundle savedInstanceState) {
        Dexter.withActivity(MainActivity.this)
                .withPermissions(
                        Manifest.permission.SYSTEM_ALERT_WINDOW
                        )
                .withListener(new MultiplePermissionsListener() {
                    @Override
                    public void onPermissionsChecked(MultiplePermissionsReport report) {

                    }
                    @Override
                    public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {

                    }
                })
                .check();

        SplashScreen.show(this);
        super.onCreate(savedInstanceState);

    }
}
