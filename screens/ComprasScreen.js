import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Text, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

export default function Compras() {
  const navigation = useNavigation();

  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: 'Celular',
      descricao: 'Celular top',
      preco: 'R$ 1000,00',
      imagem: require('assets/celular.jpg'),
      quantidade: 0
    },
    {
      id: 2,
      nome: 'Notebook',
      descricao: 'Melhor notebook do mercado',
      preco: 'R$ 1500,00',
      imagem: require('assets/notebook.png'),
      quantidade: 0
    },
    {
      id: 3,
      nome: 'Televisão',
      descricao: 'Televisão 8k',
      preco: 'R$ 2000,00',
      imagem: require('assets/tv.jpg'),
      quantidade: 0
    }
  ]);

  const adicionarAoCarrinho = (produto) => {
    const novoProdutos = produtos.map(item => {
      if (item.id === produto.id) {
        return { ...item, quantidade: item.quantidade + 1 };
      }
      return item;
    });
    setProdutos(novoProdutos);
  };

  const removerDoCarrinho = (produto) => {
    const novoProdutos = produtos.map(item => {
      if (item.id === produto.id) {
        const novaQuantidade = item.quantidade - 1;
        return { ...item, quantidade: novaQuantidade >= 0 ? novaQuantidade : 0 };
      }
      return item;
    });
    setProdutos(novoProdutos);
  };

  const salvarCompra = () => {
    const produtosSelecionados = produtos.filter(item => item.quantidade > 0);
    navigation.navigate('CarrinhoScreen', { produtosNoCarrinho: JSON.stringify(produtosSelecionados) });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {produtos.map((produto) => (
          <TouchableOpacity key={produto.id} onPress={() => adicionarAoCarrinho(produto)}>
            <View style={styles.card}>
              <Image source={produto.imagem} style={styles.imagem} />
              <View style={styles.textoContainer}>
                <Text style={styles.nome}>{produto.nome}</Text>
                <Text style={styles.descricao}>{produto.descricao}</Text>
                <Text style={styles.preco}>{produto.preco}</Text>
                <View style={styles.botoes}>
                  <Button title="-" onPress={() => removerDoCarrinho(produto)} />
                  <Text style={styles.quantidade}>{produto.quantidade}</Text>
                  <Button title="+" onPress={() => adicionarAoCarrinho(produto)} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button title="Salvar Compra" onPress={salvarCompra} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  textoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 16,
    marginBottom: 4,
  },
  preco: {
    fontSize: 16,
    color: '#888',
  },
  botoes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantidade: {
    marginHorizontal: 8,
    fontSize: 16,
  },
});
