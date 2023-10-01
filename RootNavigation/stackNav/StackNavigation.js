
import Login from '../../screen/component/Login';
import RegisterPage from "../../screen/component/RegisterPage";
import DrawerNavigation from "../DrawerNav/DrawerNavigate";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
export default StackNavigator;

