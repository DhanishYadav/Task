import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from "../../screen/component/Profile"
import StudentDetails from "../../screen/component/StudentDetails"
import StudentRegisterPage from '../../screen/component/StudentRegisterPage';
import Colors from "../../screen/Constant/Colors";
import DrawerMenu from "../../RootNavigation/DrawerNav/Drawermenu"
import { View } from 'react-native';
const Drawer = createDrawerNavigator();

const MyDrawer = ({ navigation }) => {
  return (
    <Drawer.Navigator screenOptions={({ navigation, route }) => ({
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.accent : "",
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold',
        color: "white",
        fontWeight: "bold",
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans',
        color: "white",
        fontWeight: "bold",
      },
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
        </View>
      ),
      headerTintColor: Platform.OS === "android" ? "white" : Colors.accent,
      headerShown: true,

    })} drawerContent={props => <DrawerMenu {...props} />}>
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Student Register Page" component={StudentRegisterPage} />
      <Drawer.Screen name="StudentDetails" component={StudentDetails} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;