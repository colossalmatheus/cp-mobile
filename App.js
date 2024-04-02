import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, StatusBar, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ComprasScreen from './screens/ComprasScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: 'Celular',
      descricao: 'Celular top',
      preco: 'R$ 1000,00',
      imagem: require('./assets/celular.jpg'),
      quantidade: 0
    },
    {
      id: 2,
      nome: 'Notebook',
      descricao: 'Melhor notebook do mercado',
      preco: 'R$ 1500,00',
      imagem: require('./assets/notebook.png'),
      quantidade: 0
    },
    {
      id: 3,
      nome: 'Televisão',
      descricao: 'Televisão 8k',
      preco: 'R$ 2000,00',
      imagem: require('./assets/tv.jpg'),
      quantidade: 0
    }
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#000'}/>
      <View style={styles.logo}>
        <Image source={require('./assets/logo.png')} style={styles.logoImage} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ComprasScreen', { produtos })}
        >
          <Text style={styles.buttonText}>Compras</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Matheus Colossal Araujo RM99572</Text>
        <Text style={styles.footerText}>João Vitor Souza Nunes RM550381</Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ComprasScreen" component={ComprasScreen} />
        <Stack.Screen name="CarrinhoScreen" component={CarrinhoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 8,
  },
  logo: {
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -120,
    gap: 20,
  },
  button: {
    backgroundColor: '#5CE1E6',
    width: 80,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 8,
    right: 8,
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
  }
});
