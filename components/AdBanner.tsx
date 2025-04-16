import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import Colors from '@/constants/colors';

export default function AdBanner() {
  const [adError, setAdError] = useState(false);

  // Skip rendering on web since AdMob isn't supported
  if (Platform.OS === 'web') {
    return null;
  }

  const bannerError = (error: string) => {
    console.error("AdMob Banner error: ", error);
    setAdError(true);
  };

  // If there was an error loading the ad, don't take up space
  if (adError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID="ca-app-pub-6918954219526182/3849836396"
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={bannerError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});