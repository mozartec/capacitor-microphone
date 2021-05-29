import { Component, OnInit, Input } from '@angular/core';
import { Microphone } from '@mozartec/capacitor-microphone'

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit() { }

  echo() {
    Microphone.echo({
      value: "Hello Code 🤓"
    });
  }

}
