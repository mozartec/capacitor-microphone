import type { PermissionState } from '@capacitor/core';

export interface MicrophonePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  checkPermissions(): Promise<PermissionStatus>;
  requestPermissions(): Promise<PermissionStatus>;
  startRecording(): Promise<void>;
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