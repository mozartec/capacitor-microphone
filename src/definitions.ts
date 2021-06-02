import type { PermissionState } from '@capacitor/core';

export interface MicrophonePlugin {
  /**
   * Checks microphone permission
   * @returns {PermissionStatus} PermissionStatus
   * @since 0.0.3
   */
  checkPermissions(): Promise<PermissionStatus>;

  /**
   * Requests microphone permission
   * @returns {Promise<PermissionStatus>} PermissionStatus
   * @since 0.0.3
   */
  requestPermissions(): Promise<PermissionStatus>;

  /**
   * Starts recoding session if no session is in progress
   * @since 0.0.3
   */
  startRecording(): Promise<void>;

  /**
   * Stops recoding session if one is in progress
   * @returns {Promise<AudioRecording>} AudioRecording
   * @since 0.0.3
   */
  stopRecording(): Promise<AudioRecording>;
}

export interface AudioRecording {
  base64String?: string;
  dataUrl?: string;
  path?: string;
  webPath?: string;
  duration: number;
  format?: string;
  mimeType?: string;
}

export type MicrophonePermissionState = PermissionState | 'limited';

export enum MicrophonePermissionStateValue {
  prompt = 'prompt',
  promptWithRationale = 'prompt-with-rationale',
  granted = 'granted',
  denied = 'denied',
  limited = 'limited'
}

export type MicrophonePermissionType = 'microphone';

export interface PermissionStatus {
  microphone: MicrophonePermissionState;
}

export interface MicrophonePluginPermissions {
  permissions: MicrophonePermissionType[];
}