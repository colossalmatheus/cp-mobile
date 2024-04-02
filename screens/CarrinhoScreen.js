import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Carrinho({ route }) {
  const { produtosNoCarrinho } = route.params;
  const [produtosSelecionados, setProdutosSelecionados] = useState(JSON.parse(produtosNoCarrinho));

  // Função para calcular o total do carrinho
  const calcularTotal = () => {
    let total = 0;
    let quantidadeTotal = 0;

    produtosSelecionados.forEach(produto => {
      const preco = parseFloat(produto.preco.replace('R$', '').replace(',', '.'));
      total += preco * produto.quantidade;
      quantidadeTotal += produto.quantidade;
    });

    return { total: total.toFixed(2), quantidadeTotal };
  };

  const { total, quantidadeTotal } = calcularTotal();

  const removerProduto = (produtoId) => {
    const novosProdutos = produtosSelecionados.filter(produto => produto.id !== produtoId);
    setProdutosSelecionados(novosProdutos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {produtosSelecionados.map(produto => (
          <View key={produto.id} style={styles.card}>
            <Image source={produto.imagem} style={styles.imagem} />
            <View style={styles.textoContainer}>
              <Text style={styles.nome}>{produto.nome}</Text>
              <Text style={styles.descricao}>{produto.descricao}</Text>
              <Text style={styles.preco}>Preço: {produto.preco}</Text>
              <Text style={styles.quantidade}>Quantidade: {produto.quantidade}</Text>
              <TouchableOpacity onPress={() => removerProduto(produto.id)} style={styles.botaoRemover}>
                <Text style={styles.textoBotaoRemover}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Text style={styles.total}>Total: R$ {total}</Text>
        <Text style={styles.quantidadeTotal}>Quantidade Total: {quantidadeTotal}</Text>
      </ScrollView>
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
  quantidade: {
    fontSize: 16,
    color: '#888',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
  },
  quantidadeTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  botaoRemover: {
    backgroundColor: 'red',
    marginTop: 8,
    padding: 8,
    borderRadius: 5,
  },
  textoBotaoRemover: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
