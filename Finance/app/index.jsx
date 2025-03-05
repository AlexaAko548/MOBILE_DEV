import { View, Text, Pressable, Modal, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import React, { useState, useRef } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { Link } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
        <Text style={tw`text-white text-lg font-bold ml-2`}>HOME</Text>
      </View>

      {/* Cash Balance */}
      <View style={tw`p-4 bg-white`}>
        <Text style={tw`text-gray-500 text-sm`}>Cash</Text>
        <View style={tw`flex-row justify-between items-center bg-gray-300 p-3 rounded-md mt-1`}>
          <Text style={tw`text-lg font-bold`}>P 1,000.00</Text>
          <Pressable>
            <FontAwesome name="pencil" size={18} color="black" />
          </Pressable>
        </View>
      </View>

      {/* Sections */}
      <Section title="EXPENSE STRUCTURE/GRAPH" />
      <Section title="PLANNED PAYMENTS" />
      <Section title="RECORDS/HISTORY" />

      {/* Floating Add Button */}
      <Pressable
        style={tw`absolute bottom-5 right-5 bg-yellow-500 p-4 rounded-full`}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="plus" size={24} color="black" />
      </Pressable>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={[tw`flex-1 justify-center items-center`, { backgroundColor: 'rgba(0,0,0,0.2)' }]}>
            <View style={tw`absolute bottom-20 right-5 bg-white p-4 rounded-lg shadow-lg items-center`}>
              <Pressable
                style={tw`bg-green-500 px-6 py-3 rounded-md mb-2`}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Keypad', { type: 'Income' });
                }}
              >
                <Text style={tw`text-white font-bold`}>Income</Text>
              </Pressable>
              <Pressable
                style={tw`bg-red-500 px-6 py-3 rounded-md`}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Keypad', { type: 'Expenses' });
                }}
              >
                <Text style={tw`text-white font-bold`}>Expenses</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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

const Section = ({ title }) => (
  <View style={tw`bg-red-600 m-2 p-4 rounded-md`}>
    <Text style={tw`text-white text-lg font-bold`}>{title}</Text>
    <Pressable style={tw`mt-2 p-2 bg-red-800 items-center rounded-md`}>
      <Text style={tw`text-white text-sm`}>SHOW MORE</Text>
    </Pressable>
  </View>
);

const MenuItem = ({ title, href, onPress }) => (
  <Link href={href} asChild>
    <Pressable onPress={onPress} style={tw`py-2 border-b border-gray-300`}>
      <Text style={tw`text-black text-lg`}>{title}</Text>
    </Pressable>
  </Link>
);

export default HomeScreen;
