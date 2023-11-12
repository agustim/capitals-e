export CAPACITOR_ANDROID_STUDIO_PATH=/opt/android-studio/bin/studio.sh
rm -rf node_modules
yarn install && yarn run static && npx cap sync && npx cap copy && npx cap open android