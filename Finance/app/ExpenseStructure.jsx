import { View, Text, Pressable, Modal, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import React, { useState, useRef } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { Link } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ExpenseStructureScreen = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const navigation = useNavigation();

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSidebarVisible(false));
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center bg-green-900 p-4`}>
        <Pressable onPress={openSidebar}>
          <FontAwesome name="bars" size={24} color="white" />
        </Pressable>
        <Text style={tw`text-white text-lg font-bold ml-2`}>EXPENSE STRUCTURE/GRAPH</Text>
      </View>

      {/* Spent Amount */}
      <View style={tw`m-4 p-6 bg-white shadow-lg rounded-md`}>
        <Text style={tw`text-black font-bold text-lg`}>SPENT AMOUNT</Text>
        <Text style={tw`text-black text-xl font-bold`}>P 300,000</Text>
      </View>

      {/* Top 5 Expenses */}
      <Text style={tw`text-black font-bold text-lg px-4`}>TOP 5 EXPENSES</Text>
      <View style={tw`p-4`}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={tw`bg-red-800 h-10 rounded-md my-1`} />
        ))}
      </View>

      {/* Sidebar (Left Drawer) */}
      {sidebarVisible && (
        <Modal transparent visible={sidebarVisible} animationType="none">
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={[tw`flex-1`, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
              <Animated.View
                style={[
                  tw`absolute top-0 left-0 h-full bg-white p-6`,
                  { width: SCREEN_WIDTH * 0.7, transform: [{ translateX: slideAnim }] },
                ]}
              >
                <Text style={tw`text-lg font-bold mb-4`}>MENU</Text>
                <MenuItem title="Home" href="/" onPress={closeSidebar} />
                <MenuItem title="Planned Payments" href="/PlannedPayments" onPress={closeSidebar} />
                <MenuItem title="Expense Structure" href="/ExpenseStructure" onPress={closeSidebar} />
                <MenuItem title="History / Records" href="/HistoryRecords" onPress={closeSidebar} />
                <MenuItem title="Add More Details" href="/AddDetails" onPress={closeSidebar} />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const MenuItem = ({ title, href, onPress }) => (
  <Link href={href} asChild>
    <Pressable onPress={onPress} style={tw`py-2 border-b border-gray-300`}>
      <Text style={tw`text-black text-lg`}>{title}</Text>
    </Pressable>
  </Link>
);

export default ExpenseStructureScreen;
