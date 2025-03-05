import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const KeypadScreen = () => {
  const [amount, setAmount] = useState('0');

  const handlePress = (value) => {
    if (value === 'back') {
      setAmount(amount.length > 1 ? amount.slice(0, -1) : '0');
    } else {
      setAmount(amount === '0' ? value : amount + value);
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center bg-red-500 p-4`}>
        <FontAwesome name="times" size={24} color="black" />
        <FontAwesome name="check" size={24} color="black" />
      </View>

      {/* Display */}
      <View style={[tw`p-8 bg-white flex-row justify-between items-center border-b border-gray-300`, { height: 100 }]}>
        <Text style={tw`text-2xl font-bold`}>-</Text>
        <Text style={tw`text-2xl font-bold`}>{amount} PHP</Text>
      </View>

      {/* Category Section */}
      <View style={[tw`bg-red-500 p-6`, { height: 80 }]}> 
        <Text style={tw`text-white text-center font-bold`}>CATEGORY</Text>
      </View>

      {/* Keypad */}
      <View style={tw`flex-row w-full`}> 
        {/* Numbers and Backspace */}
        <View style={tw`w-3/4`}> 
          {[['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['.', '0', 'back']].map((row, rowIndex) => (
            <View key={rowIndex} style={tw`flex-row`}> 
              {row.map((key) => (
                <Pressable 
                  key={key} 
                  style={tw`flex-1 p-6 bg-red-${key === 'back' ? '900' : '700'} items-center justify-center border`} 
                  onPress={() => handlePress(key)}
                >
                  {key === 'back' ? (
                    <FontAwesome name="arrow-left" size={24} color="black" />
                  ) : (
                    <Text style={tw`text-white text-2xl font-bold`}>{key}</Text>
                  )}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
        
        {/* Operations */}
        <View style={tw`w-1/4 flex`}>
          {['/', '*', '-', '+', '='].map((op, index) => (
            <Pressable 
              key={op} 
              style={[tw`flex-1 p-6 bg-gray-300 items-center justify-center border`, { flex: index === 4 ? 1.25 : 1 }]} /* Adjusted height */
              onPress={() => handlePress(op)}
            >
              <Text style={tw`text-black text-2xl font-bold`}>{op}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default KeypadScreen;
