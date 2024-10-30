import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.arkcutt.app',
  appPath: 'app',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    minSdkVersion: 23,
    targetSdkVersion: 33,
    packageName: 'com.arkcutt.app',
    versionName: '1.0.0',
    versionCode: 1
  }
} as NativeScriptConfig;