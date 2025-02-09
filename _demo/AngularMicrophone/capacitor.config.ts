import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mozartec.capacitor.microphone.angular',
  appName: 'AngularMicrophone',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
