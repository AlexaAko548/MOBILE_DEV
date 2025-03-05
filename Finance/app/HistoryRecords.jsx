import { View, Text, Pressable, Modal, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import React, { useState, useRef } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { Link } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;

const HistoryRecords = () => {
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
        <Text style={tw`text-white text-lg font-bold ml-2`}>History Records</Text>
      </View>

      {/* Payment List */}
      <View style={tw`p-4`}>
        <View style={tw`bg-red-500 h-12 rounded-md mb-2`} />
        <View style={tw`bg-red-500 h-12 rounded-md`} />
      </View>

      {/* Floating Add Button */}
      <Pressable
        style={tw`absolute bottom-5 right-5 bg-yellow-500 p-4 rounded-full border border-black`}
        onPress={() => navigation.navigate('AddPaymentScreen')}
      >
        <FontAwesome name="plus" size={24} color="black" />
      </Pressable>

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

export default HistoryRecords;
