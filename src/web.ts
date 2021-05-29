import { WebPlugin } from '@capacitor/core';

import type { MicrophonePlugin } from './definitions';

export class MicrophoneWeb extends WebPlugin implements MicrophonePlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
