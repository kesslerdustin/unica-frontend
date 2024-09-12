import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../config';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${productId}`);
      setProduct(response.data);
      setName(response.data.name);
      setPrice(response.data.price.toString());
      setDescription(response.data.description);
      setStock(response.data.stock.toString());
      setCategory(response.data.category);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/products/${productId}`, {
        name,
        price: parseFloat(price),
        description,
        stock: parseInt(stock),
        category,
      });
      Alert.alert('Success', 'Product updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/products/${productId}`);
      Alert.alert('Success', 'Product deleted successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      <TextInput
        style={styles.input}
        value={stock}
        onChangeText={setStock}
        placeholder="Stock"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Delete" onPress={handleDelete} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default ProductDetailsScreen;