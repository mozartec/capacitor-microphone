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
    await Microphone.checkPermissions();
  }

  async requestPermissions() {
    await Microphone.requestPermissions();
  }

  async startRecording() {
    await Microphone.startRecording();
  }

  async stopRecording() {
    this.recording = await Microphone.stopRecording();
    console.log('recording: ' + JSON.stringify(this.recording));
  }

}
