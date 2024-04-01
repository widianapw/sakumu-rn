import React, {useEffect} from 'react';
import {Page, Stack, Toast, Typography} from '@tmd';
import {useDispatch} from 'react-redux';
import {getVersion} from 'react-native-device-info';
import remoteConfig from '@react-native-firebase/remote-config';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import {useModal} from '@tmd/providers/ModalProvider';

export default function SplashScreen() {
  const dispatch = useDispatch();
  const {showAlertModal, hideAlertModal} = useModal();

  useEffect(() => {
    loadVersioning();
  }, []);

  const loadVersioning = () => {
    const appVersion = getVersion();
    const currentEnv = Config.ENV;
    remoteConfig()
      .fetchAndActivate()
      .then(fetchedRemotely => {
        remoteConfig()
          .fetch(0)
          .then(res => {
            //set fetch(0), Ensure that every change is displayed instantly.
            const minimumVersion = remoteConfig().getString(
              `${Platform.OS.toLowerCase()}_${currentEnv}_version`,
            );
            const isMajor = remoteConfig().getBoolean(
              `${Platform.OS.toLowerCase()}_${currentEnv}_is_major`,
            );
            const isUpdateAvailable =
              compareVersions(minimumVersion, appVersion) > 0;
            if (isUpdateAvailable) {
              showAlertModal({
                dismissible: false,
                title: 'Update Available',
                description: `Please update your app to the latest version to continue using the app.`,
                buttonPrimaryAction: () => {
                  Toast.show('Open App Url');
                },
                buttonPrimaryTitle: 'Update',
                buttonSecondary: !isMajor,
                buttonSecondaryAction() {
                  hideAlertModal();
                  routeStart();
                },
              });
            } else {
              routeStart();
            }
          });
      })
      .catch(() => {
        // fail to fetch remote config
        showAlertModal({
          title: 'Remote Config',
          description: 'Failed to fetch remote config',
          buttonPrimaryAction: () => {
            hideAlertModal();
          },
          buttonSecondary: false,
        });
      });
  };

  const compareVersions = (
    firebaseVersion: string,
    appVersion: string,
  ): number => {
    const v1Components = firebaseVersion.split('.').map(Number);
    const v2Components = appVersion.split('.').map(Number);

    for (let i = 0; i < v1Components.length; i++) {
      if (v1Components[i] < v2Components[i]) {
        return -1; // version1 is smaller
      } else if (v1Components[i] > v2Components[i]) {
        return 1; // version1 is larger
      }
    }

    return 0; // versions are equal
  };

  const routeStart = () => {
    dispatch({
      type: 'DONE_LOADING_SPLASH',
    });
  };

  return (
    <Page>
      <Stack style={{flex: 1}} items={'center'} content={'center'}>
        <Typography style={{textAlign: 'center'}} type={'label1'}>
          SakuMu
        </Typography>
      </Stack>
    </Page>
  );
}
