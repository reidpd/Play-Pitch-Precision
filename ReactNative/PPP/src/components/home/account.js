import React from 'react';
import { Text, View} from 'react-native';
import Button from '../common/Button';

const Account = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      {/* <Text style={textStyle}>{props.headerText}</Text> */}
      <Button>Log-In</Button>
      <Button>Sign-Up</Button>
    </View>
  );
};


const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 98,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 30,
  }
};

export default Account;
