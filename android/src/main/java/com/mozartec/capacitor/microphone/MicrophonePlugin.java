package com.mozartec.capacitor.microphone;

import android.Manifest;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import org.json.JSONException;

import java.util.List;

@CapacitorPlugin(
        name = "Microphone",
        permissions = {
                @Permission(strings = {Manifest.permission.RECORD_AUDIO}, alias = MicrophonePlugin.MICROPHONE),
        }
)
public class MicrophonePlugin extends Plugin {

    // Permission alias constants
    static final String MICROPHONE = "microphone";

    private Microphone implementation = new Microphone();

    // Looks like checkPermissions is avaialble out of the box

    @PluginMethod
    public void requestPermissions(PluginCall call) {
        // Save the call to be able to access it in microphonePermissionsCallback
        bridge.saveCall(call);
        // If the microphone permission is defined in the manifest, then we have to prompt the user
        // or else we will get a security exception when trying to present the microphone. If, however,
        // it is not defined in the manifest then we don't need to prompt and it will just work.
        if (isPermissionDeclared(MICROPHONE)) {
            // just request normally
            super.requestPermissions(call);
        } else {
            // the manifest does not define microphone permissions, so we need to decide what to do
            // first, extract the permissions being requested
            JSArray providedPerms = call.getArray("permissions");
            List<String> permsList = null;
            try {
                permsList = providedPerms.toList();
            } catch (JSONException e) {
            }

            if (permsList != null && permsList.size() == 1 && permsList.contains(MICROPHONE)) {
                // the only thing being asked for was the microphone so we can just return the current state
                checkPermissions(call);
            } else {
                // we need to ask about photos so request storage permissions
                requestPermissionForAlias(MICROPHONE, call, "checkPermissions");
            }
        }
    }

    @PermissionCallback
    private void microphonePermissionsCallback(PluginCall call) {
        checkPermissions(call);
    }

    @PluginMethod
    public void startRecording(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }

    @PluginMethod
    public void stopRecording(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }
}
