import React, { Component, useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector, useDispatch } from 'react-redux';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddToCartButton,
  ProductAmount,
  ProductAmountValue,
  AddToCartButtonText,
} from './styles';
import api from '../../services/api';
import { formatPrice } from '../../utils/formatter';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      return amount;
    }, {})
  );

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');

      const products = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(products);
    }

    getProducts();
  }, []);

  const dispatch = useDispatch();

  handleAddProduct = async id => {
    dispatch(CartActions.addToCartRequest(id));
  };

  return (
    <Container>
      <FlatList
        horizontal
        data={products}
        extraData={this.props}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Product key={item.id}>
            <ProductImage source={{ uri: item.image }} />
            <ProductTitle>{item.title}</ProductTitle>
            <ProductPrice>{item.priceFormatted}</ProductPrice>
            <AddToCartButton onPress={() => handleAddProduct(item.id)}>
              <ProductAmount>
                <Icon name="add-shopping-cart" size={18} color="#fff" />
                <ProductAmountValue>{amount[item.id] || 0}</ProductAmountValue>
              </ProductAmount>
              <AddToCartButtonText>ADD TO CART</AddToCartButtonText>
            </AddToCartButton>
          </Product>
        )}
        contentContainerStyle={{
          marginTop: 100,
        }}
      />
    </Container>
  );
}
