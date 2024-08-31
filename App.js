import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/component/Login";
import HomeScreen from "./screens/component/HomeScreen";
import SignUp from "./screens/component/SignUp";
import ChatAi from "./screens/component/ChatAi";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Homescreen" component={HomeScreen}/>
        <Stack.Screen name="Chat" component={ChatAi}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
