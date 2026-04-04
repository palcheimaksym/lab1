import { Stack } from 'expo-router';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter, useSegments } from 'expo-router';

function RootNavigation() {
  const { token, isLoading } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = token !== null;

    if (inAuthGroup && segments[0] !== 'profile') {
      router.replace('/profile');
    } else if (!inAuthGroup && segments[0] !== 'index' && segments[0] !== undefined) {
      router.replace('/');
    }
  }, [token, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="profile" options={{ title: 'My Profile', headerShown: true }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}