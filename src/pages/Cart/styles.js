import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.View`
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  margin: 15px;
`;

export const Products = styled.View``;
export const Product = styled.View``;
export const ProductInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const ProductImage = styled.Image`
  height: 80px;
  width: 80px;
`;
export const ProductDetails = styled.View`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
`;
export const ProductTitle = styled.Text`
  font-size: 15px;
`;
export const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
`;
export const ProductDelete = styled.TouchableOpacity`
  padding: 6px;
`;
export const ProductButtons = styled.View`
  flex-direction: row;
  align-items: center;
  background: #cfd8dc;
  padding: 8px;
  border-radius: 5px;
`;
export const ProductButton = styled.TouchableOpacity``;
export const ProductAmount = styled.TextInput.attrs({
  readonly: true,
})`
  background: #fff;
  padding: 5px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 50px;
`;
export const ProductTotal = styled.Text`
  font-size: 15px;
  font-weight: bold;
  flex: 1;
  text-align: right;
`;

export const ProductsTotalContainer = styled.View`
  margin-top: 40px;
`;
export const ProductsTotalText = styled.Text`
  text-align: center;
  color: #9ea7aa;
  font-size: 16px;
  font-weight: bold;
`;
export const ProductsTotalAmount = styled.Text`
  text-align: center;
  font-size: 34px;
  padding-top: 5px;
  font-weight: bold;
`;
export const ProductsOrderButton = styled.TouchableOpacity`
  background: ${colors.primary};
  padding: 12px;
  border-radius: 4px;
  margin-top: 10px;
`;
export const ProductsOrderText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
