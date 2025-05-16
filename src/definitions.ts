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
   * @returns {Promise<{ status: string }>} Object with status message
   * @since 0.0.3
   */
  startRecording(): Promise<{ status: string }>;

  /**
   * Stops recoding session if one is in progress
   * @returns {Promise<AudioRecording>} AudioRecording
   * @since 0.0.3
   */
  stopRecording(): Promise<AudioRecording>;
}

export interface AudioRecording {
  /**
   * The base64 encoded string representation of the audio file.
   *
   * @since 0.0.3
   */
  base64String?: string;

  /**
   * The url starting with 'data:audio/aac;base64,' and the base64 encoded string representation of the audio file.
   *
   * @since 0.0.3
   */
  dataUrl?: string;

  /**
   * platform-specific file URL that can be read later using the Filesystem API.
   *
   * @since 0.0.3
   */
  path?: string;

  /**
   * webPath returns a path that can be used to set the src attribute of an audio element can be useful for testing.
   *
   * @since 0.0.3
   */
  webPath?: string;

  /**
   * recoding duration in milliseconds
   *
   * @since 0.0.3
   */
  duration: number;

  /**
   * file extension (.m4a on mobile, and .aac on web)
   *
   * @since 0.0.3
   */
  format?: string;

  /**
   * file encoding "audio/aac"
   * (kAudioFormatMPEG4AAC for iOS)
   * (MPEG_4 / AAC for Android)
   * (AAC for Web)
   *
   * @since 0.0.3
   */
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