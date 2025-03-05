import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { Colors } from '@/constants/Colors';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Stack screenOptions={{headerStyle: {backgroundColor: theme.headerBackground}}}>
        <Stack.Screen name="index" options={{ headerShown: false,title:'Home' }} />
        <Stack.Screen name="Keypad" options={{ headerShown: false,title:'Computations' }} />
        <Stack.Screen name="PlannedPayments" options={{ headerShown: false,title:'Pay' }} />
        <Stack.Screen name="HistoryRecords" options={{ headerShown: false,title:'Records' }} />
        <Stack.Screen name="ExpenseStructure" options={{ headerShown: false,title:'Expense' }} />


        <Stack.Screen name="+not-found" />
      </Stack>

  );
}
