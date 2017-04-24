import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPressCallback, children }) => {
  const { textStyle, buttonStyle } = styles;
  return (
    <TouchableOpacity
      onPress={onPressCallback}
      style={buttonStyle}
    >
      <Text style={textStyle}>
        {children}
      </Text>

    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#ff69b4',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fffff0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffb6c1',
    marginLeft: 5,
    marginRight: 5
  }
};


export default Button;
