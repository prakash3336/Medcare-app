import { Stack, useRouter } from 'expo-router';
import { AppState } from 'react-native';
import { useEffect, useRef } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', nextState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        router.replace('/auth');
      }
      appState.current = nextState;
    });

    return () => sub.remove();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="medications/add"
        options={{
          headerShown: false,
          headerBackTitle: '',
          title: '',
        }}
      />
    </Stack>
  );
}
