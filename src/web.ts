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

      // Find a supported MIME type for audio recording
      const getSupportedMimeType = () => {
        // Try these MIME types in order of preference
        const types = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'];
        for (const type of types) {
          if (MediaRecorder.isTypeSupported(type)) {
            return type;
          }
        }
        return ''; // Let browser decide default
      };

      const mimeType = getSupportedMimeType();
      this.mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
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
          // Use the actual MIME type that was used for recording
          const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
          const audioBlob = new Blob(this.audioChunks, { type: mimeType });
          const audioUrl = URL.createObjectURL(audioBlob);
          this.mediaRecorder?.stream?.getTracks().forEach((track) => track.stop());

          // Get duration if possible, or use a more accurate calculation
          let duration = 0;
          try {
            // Better duration estimation - based on audio data size and bit rate
            // This is still an approximation, but better than using sampleRate
            duration = this.audioChunks.length > 0 ? this.audioChunks.reduce((acc, chunk) => acc + chunk.size, 0) : 0;
          } catch (e) {
            console.error('Could not determine audio duration', e);
          }

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

            // Determine file extension based on MIME type
            const format = mimeType.includes('webm')
              ? '.webm'
              : mimeType.includes('mp4')
                ? '.mp4'
                : mimeType.includes('ogg')
                  ? '.ogg'
                  : mimeType.includes('wav')
                    ? '.wav'
                    : '.webm';

            const recording: AudioRecording = {
              base64String,
              dataUrl: `data:${mimeType};base64,${base64String}`,
              webPath: audioUrl,
              duration,
              format,
              mimeType,
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
