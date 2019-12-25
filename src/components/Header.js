import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Main, Container, Logo, BasketCart, CartSize } from './styles';
import { connect } from 'react-redux';

function Header({ navigation, cartSize }) {
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

const mapStateToProps = state => ({
  cartSize: state.cart.length,
});

export default connect(mapStateToProps, null)(Header);
