package com.takuzu;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.os.Bundle;

import org.devio.rn.splashscreen.SplashScreen;

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

        SplashScreen.show(this);
        super.onCreate(savedInstanceState);

    }
}
