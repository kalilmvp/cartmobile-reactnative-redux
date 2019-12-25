import { Alert } from 'react-native';

import { call, put, all, select, takeLatest } from 'redux-saga/effects';

import NavigationService from '../../../services/navigation';
import { formatPrice } from '../../../utils/formatter';
import api from '../../../services/api';

import {
  addToCartSuccess,
  updateAmountSuccess,
  finishOrderSuccess,
} from './actions';

function* addToCart({ id }) {
  const productExist = yield select(state =>
    state.cart.find(product => product.id === id)
  );

  const responseStock = yield call(api.get, `/stock/${id}`);
  const currentStockAmount = responseStock.data.amount;

  const amount = productExist ? productExist.amount + 1 : 1;
  if (amount > currentStockAmount) {
    Alert.alert(`Stock amount maximum is ${currentStockAmount}`);
    return;
  }

  // if the product already exists, just update it´s amount
  if (productExist) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }

  NavigationService.navigate('Cart');
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const responseStock = yield call(api.get, `/stock/${id}`);
  const currentStockAmount = responseStock.data.amount;

  if (amount > currentStockAmount) {
    Alert.alert(`Stock amount maximum is ${currentStockAmount}`);
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

function* finishOrder() {
  Alert.alert('Order completed!');

  yield put(finishOrderSuccess([]));

  NavigationService.navigate('Home');
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
  takeLatest('@cart/FINISH_ORDER_REQUEST', finishOrder),
]);
