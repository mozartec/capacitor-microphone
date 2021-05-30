//
//  MicrophoneExtensions.swift
//  Plugin
//
//  Created by mozart alkhateeb on 30/05/2021.
//  Copyright © 2021 Max Lynch. All rights reserved.
//

import AVFoundation

internal protocol MicrophoneAuthorizationState {
    var authorizationState: String { get }
}

extension AVAuthorizationStatus : MicrophoneAuthorizationState {
    var authorizationState: String {
        switch self {
        case .denied, .restricted:
            return "denied"
        case .authorized:
            return "granted"
        case .notDetermined:
            fallthrough
        @unknown default:
            return "prompt"
        }
    }
}
