# react native

## required

1. Android Studio
2. AVD
3. node, yarn
4. firebase json, plist

## preinstall

### android

download `google-services.json` from [here](https://console.firebase.google.com/project/a-simple-tag/settings/general/android:com.ast.mvp)
and locate it in `android/app/google-services.json`

### ios

download `GoogleService-Info.plist` from [here](https://console.firebase.google.com/project/a-simple-tag/settings/general/ios:com.ast.mvp)
and locate it in `ios/GoogleService-Info.plist`

## install guide

1. `yarn install`
2. `yarn run link`

### android

execute avd or connect device and `yarn run android`

### ios

`cd ios && pod install && yarn run ios`
