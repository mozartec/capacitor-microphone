package com.mozartec.capacitor.microphone

import com.getcapacitor.JSObject

enum class StatusMessageTypes(val value: String) {
    MicrophonePermissionNotGranted("microphone permission not granted"),
    CannotRecordOnThisPhone("cannot record on this phone"),
    RecordingFailed("recording failed"),
    NoRecordingInProgress("no recording in progress"),
    FailedToFetchRecording("failed to fetch recording"),
    RecordingInProgress("recording in progress"),
    MicrophoneIsBusy("microphone is busy"),
    RecordingStared("recording stared")
}

class Recording(val base64String: String?, val dataUrl: String?, val path: String?, val webPath: String?, val duration: Int, val format: String?, val mimeType: String?) {
    fun toJSObject(): JSObject {
        var result = JSObject()

        if (base64String != null) {
            result.put("base64String", base64String)
        }

        if (dataUrl != null) {
            result.put("dataUrl", dataUrl)
        }

        if (path != null) {
            result.put("path", path)
        }

        if (webPath != null) {
            result.put("webPath", webPath)
        }

        result.put("duration", duration)

        if (format != null) {
            result.put("format", format)
        }

        if (mimeType != null) {
            result.put("mimeType", mimeType)
        }

        return result
    }
}