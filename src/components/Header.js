import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Main, Container, Logo, BasketCart, CartSize } from './styles';
import { useSelector } from 'react-redux';

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <Main>
      <Container>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Logo />
        </TouchableOpacity>
        <BasketCart onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#fff" size={25} />
          <CartSize>{cartSize || 0}</CartSize>
        </BasketCart>
      </Container>
    </Main>
  );
}
