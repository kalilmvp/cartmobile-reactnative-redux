import styled from 'styled-components/native';

import colors from '../styles/colors';
import logorocket from '../../assets/rocketseat_logo.svg';

export const Main = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  background: ${colors.dark_greater};
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const Logo = styled(logorocket)`
  width: 185px;
  height: 25px;
`;

export const BasketCart = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const CartSize = styled.Text`
  position: absolute;
  text-align: center;
  top: -8px;
  right: -8px;
  min-width: 18px;
  min-height: 18px;
  background: ${colors.primary};
  color: #fff;
  font-size: 12px;
  padding: 3px;
  border-radius: 9px;
  overflow: hidden;
`;
