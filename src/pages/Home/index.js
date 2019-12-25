import React, { Component } from 'react';
import { FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';

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

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const response = await api.get('/products');

    this.setState({
      products: response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      })),
    });
  };

  handleAddProduct = async id => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;
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
              <AddToCartButton onPress={() => this.handleAddProduct(item.id)}>
                <ProductAmount>
                  <Icon name="add-shopping-cart" size={18} color="#fff" />
                  <ProductAmountValue>
                    {amount[item.id] || 0}
                  </ProductAmountValue>
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
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  addToCartRequest: PropTypes.func.isRequired,
};
