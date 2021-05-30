import { WebPlugin } from '@capacitor/core';

import type { MicrophonePlugin, PermissionStatus, AudioRecording } from './definitions';

export class MicrophoneWeb extends WebPlugin implements MicrophonePlugin {

  async checkPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('Not implemented on web.');
  }

  async requestPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('Not implemented on web.');
  }

  async startRecording(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  async stopRecording(): Promise<AudioRecording> {
    throw this.unimplemented('Not implemented on web.');
  }
}
