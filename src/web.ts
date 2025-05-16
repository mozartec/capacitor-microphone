import { WebPlugin } from '@capacitor/core';

import type { MicrophonePlugin, PermissionStatus, AudioRecording } from './definitions';
import { StatusMessageTypes } from './status-message-types';

export class MicrophoneWeb extends WebPlugin implements MicrophonePlugin {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  async checkPermissions(): Promise<PermissionStatus> {
    const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
    return { microphone: permissionStatus.state as 'granted' | 'denied' | 'prompt' };
  }

  async requestPermissions(): Promise<PermissionStatus> {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return { microphone: 'granted' };
    } catch {
      return { microphone: 'denied' };
    }
  }

  async startRecording(): Promise<{ status: string }> {
    // Check permission first
    const permissionStatus = await this.checkPermissions();
    if (permissionStatus.microphone !== 'granted') {
      throw StatusMessageTypes.MicrophonePermissionNotGranted;
    }

    // Check if there's already a recording in progress
    if (this.mediaRecorder !== null) {
      throw StatusMessageTypes.RecordingInProgress;
    }

    try {
      const stream = await navigator?.mediaDevices?.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      return {
        status: StatusMessageTypes.RecordingStared,
      };
    } catch (error) {
      throw StatusMessageTypes.RecordingFailed;
    }
  }

  async stopRecording(): Promise<AudioRecording> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(StatusMessageTypes.NoRecordingInProgress);
        return;
      }

      this.mediaRecorder.onstop = () => {
        try {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/aac' });
          const audioUrl = URL.createObjectURL(audioBlob);
          this.mediaRecorder?.stream?.getTracks().forEach((track) => track.stop());
          const duration = this.mediaRecorder?.stream?.getTracks()[0]?.getSettings()?.sampleRate || 0;

          const reader = new FileReader();
          reader.onerror = () => {
            this.mediaRecorder = null;
            reject(StatusMessageTypes.FailedToFetchRecording);
          };

          reader.onloadend = () => {
            const base64String = reader.result?.toString().split(',')[1];

            if (!base64String || duration < 0) {
              this.mediaRecorder = null;
              reject(StatusMessageTypes.FailedToFetchRecording);
              return;
            }

            const recording: AudioRecording = {
              base64String,
              dataUrl: 'data:audio/aac;base64,' + base64String,
              webPath: audioUrl,
              duration,
              format: 'aac',
              mimeType: 'audio/aac',
            };

            this.mediaRecorder = null;
            resolve(recording);
          };

          reader.readAsDataURL(audioBlob);
        } catch (error) {
          this.mediaRecorder = null;
          reject(StatusMessageTypes.FailedToFetchRecording);
        }
      };

      try {
        this.mediaRecorder.stop();
      } catch (error) {
        this.mediaRecorder = null;
        reject(StatusMessageTypes.FailedToFetchRecording);
      }
    });
  }
}
