import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  useEffect(() => {
    const hideNavBar = async () => {
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBehaviorAsync("overlay-swipe");
    };

    hideNavBar();
  }, []);
  return <>
    <StatusBar hidden={true} />
    <Stack screenOptions={{
      headerShown: false
    }}/>
  </>;
}