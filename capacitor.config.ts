import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.inergia.capitalse',
  appName: 'capitals-e',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
