import { Component, OnInit } from '@angular/core';
import { Microphone, AudioRecording } from '@mozartec/capacitor-microphone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  recording: AudioRecording;

  constructor() { }

  ngOnInit() { }

  async checkPermissions() {
    try {
      const checkPermissionsResult = await Microphone.checkPermissions();
      console.log('checkPermissionsResult: ' + JSON.stringify(checkPermissionsResult));
    } catch (error) {
      console.log('checkPermissions Error: ' + JSON.stringify(error));
    }
  }

  async requestPermissions() {
    try {
      const requestPermissionsResult = await Microphone.requestPermissions();
      console.log('requestPermissionsResult: ' + JSON.stringify(requestPermissionsResult));
    } catch (error) {
      console.log('requestPermissions Error: ' + JSON.stringify(error));
    }
  }

  async startRecording() {
    await Microphone.startRecording();
  }

  async stopRecording() {
    this.recording = await Microphone.stopRecording();
    console.log('recording: ' + JSON.stringify(this.recording));
  }

}
