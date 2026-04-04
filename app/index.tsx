import { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../context/api';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const token = await loginUser(username, password);
      await login(token);
      router.replace('/profile');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Sign In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10 },
});