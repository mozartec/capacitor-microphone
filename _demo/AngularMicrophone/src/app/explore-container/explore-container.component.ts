import { Component, OnInit, Input } from '@angular/core';
import { AudioRecording, Microphone } from '@mozartec/capacitor-microphone'

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  recording: AudioRecording;

  constructor() { }

  ngOnInit() { }

  echo() {
    Microphone.echo({
      value: "Hello Code 🤓"
    });
  }

  async startRecording() {
    await Microphone.requestPermissions();
    await Microphone.startRecording();
  }

  async stopRecording() {
    this.recording = await Microphone.stopRecording();
    console.log('recording: ' + JSON.stringify(this.recording));
  }

}
