import React from 'react';
import {Button, Icon, Toast} from 'native-base';
import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const socialLinks = [
  { icon: 'lightbulb', url: 'https://lamplightsolutions.net' },
  { icon: 'github-circle', url: 'https://github.com/eddielee394' },
  { icon: 'linkedin', url: 'https://www.linkedin.com/in/eddie-padin/' },
  {
    icon: 'stack-overflow',
    url: 'https://stackoverflow.com/story/eddielee394',
  },
  { icon: 'twitter', url: 'https://twitter.com/xerotrade' },
];

const _openUrl = async url => {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#453AA4',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'overFullScreen',
        modalTransitionStyle: 'partialCurl',
        modalEnabled: true,
        // Android Properties
        showTitle: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        waitForRedirectDelay: 0,
      });
      return result;
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    Toast.show({
      text: error.message,
      type: 'danger',
    });
  }
};

export function SocialLinks (props)  {
  const renderLinks = () =>
    socialLinks.map(link => (
      <Button key={link.icon} onPress={() => _openUrl(link.url)}>
        <Icon active name={link.icon} type="MaterialCommunityIcons" />
      </Button>
    ));

  return renderLinks();
};

export default SocialLinks;
