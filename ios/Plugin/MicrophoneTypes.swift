//
//  MicrophoneTypes.swift
//  Plugin
//
//  Created by mozart alkhateeb on 30/05/2021.
//  Copyright © 2021 Max Lynch. All rights reserved.
//

struct AudioRecording {
    let base64String: String?
    let dataUrl: String?
    let path: String?
    let webPath: String?
    let duration: Int
    let format: String?
    let mimeType: String?
    
    func toDictionary() -> Dictionary<String, Any> {
        var result: [String: Any] = [:]
        
        if base64String != nil {
            result["base64String"] = base64String
        }
        
        if dataUrl != nil {
            result["dataUrl"] = dataUrl
        }
        
        if path != nil {
            result["path"] = path
        }
        
        if webPath != nil {
            result["webPath"] = webPath
        }
        
        result["duration"] = duration
        
        if format != nil {
            result["format"] = format
        }
        
        if mimeType != nil {
            result["mimeType"] = mimeType
        }
        
        return result
    }
}

enum Messages: String {
    case MISSING_MICROPHONE_PERMISSION = "MISSING_MICROPHONE_PERMISSION"
    case CANNOT_RECORD_ON_THIS_PHONE = "CANNOT_RECORD_ON_THIS_PHONE"
    case FAILED_TO_RECORD = "FAILED_TO_RECORD"
    case RECORDING_HAS_NOT_STARTED = "RECORDING_HAS_NOT_STARTED"
    case FAILED_TO_FETCH_RECORDING = "FAILED_TO_FETCH_RECORDING"
    case ALREADY_RECORDING = "ALREADY_RECORDING"
    case MICROPHONE_IS_BUSY = "MICROPHONE_IS_BUSY"
    case RECORDING_STARTED = "RECORDING_STARTED"
}

enum AudioRecorderPermissionType: String, CaseIterable {
    case microphone
}
