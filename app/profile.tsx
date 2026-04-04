import { View, Text, Button, StyleSheet } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation, useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { logout, token } = useContext(AuthContext);
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          onPress={async () => {
            await logout();
            router.replace('/');
          }} 
          title="Logout" 
          color="red" 
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Successfully Logged In!</Text>
      <Text style={styles.subText}>Token: {token?.substring(0, 20)}...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20, fontWeight: '600' },
  subText: { color: 'gray', marginTop: 10 },
});