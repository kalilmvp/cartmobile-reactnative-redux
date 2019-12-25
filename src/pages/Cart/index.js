import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../utils/formatter';

import {
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductButtons,
  ProductButton,
  ProductAmount,
  ProductTotal,
  ProductsTotalContainer,
  ProductsTotalText,
  ProductsTotalAmount,
  ProductsOrderButton,
  ProductsOrderText,
} from './styles';

import colors from '../../styles/colors';

function Cart({
  products,
  total,
  removeFromCart,
  updateAmountRequest,
  finishOrderRequest,
}) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function handleFinishOrder() {
    finishOrderRequest();
  }

  return (
    <Container>
      {products && products.length ? (
        <Products>
          {products.map(product => (
            <Product key={product.id}>
              <ProductInfo>
                <ProductImage source={{ uri: product.image }} />
                <ProductDetails>
                  <ProductTitle>
                    <Text>{product.title}</Text>
                  </ProductTitle>
                  <ProductPrice>
                    <Text>{product.priceFormatted}</Text>
                  </ProductPrice>
                </ProductDetails>
                <ProductDelete onPress={() => removeFromCart(product.id)}>
                  <Icon
                    name="delete-forever"
                    size={30}
                    color={colors.primary}
                  />
                </ProductDelete>
              </ProductInfo>
              <ProductButtons>
                <ProductButton onPress={() => decrement(product)}>
                  <Icon
                    name="remove-circle-outline"
                    size={22}
                    color={colors.primary}
                  />
                </ProductButton>
                <ProductAmount value={String(product.amount)} readonly />
                <ProductButton onPress={() => increment(product)}>
                  <Icon
                    name="add-circle-outline"
                    size={22}
                    color={colors.primary}
                  />
                </ProductButton>
                <ProductTotal>{product.subtotal}</ProductTotal>
              </ProductButtons>
            </Product>
          ))}
          <ProductsTotalContainer>
            <ProductsTotalText>TOTAL</ProductsTotalText>
            <ProductsTotalAmount>{total}</ProductsTotalAmount>
            <ProductsOrderButton onPress={() => handleFinishOrder()}>
              <ProductsOrderText>FINISH ORDER</ProductsOrderText>
            </ProductsOrderButton>
          </ProductsTotalContainer>
        </Products>
      ) : (
        <View>
          <Text>No products included</Text>
        </View>
      )}
    </Container>
  );
}

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
    priceFormatted: formatPrice(product.price),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

/* Cart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.shape({}),
}; */
