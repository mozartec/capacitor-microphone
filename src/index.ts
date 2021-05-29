import { registerPlugin } from '@capacitor/core';

import type { MicrophonePlugin } from './definitions';

const Microphone = registerPlugin<MicrophonePlugin>('Microphone', {
  web: () => import('./web').then(m => new m.MicrophoneWeb()),
});

export * from './definitions';
export { Microphone };
