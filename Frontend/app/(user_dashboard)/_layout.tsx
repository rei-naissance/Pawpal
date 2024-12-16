import {Tabs} from "expo-router";
import Dashboard from "@/app/(user_dashboard)/Dashboard";
import {TabBarIcon} from "@/components/navigation/TabBarIcon";
import {Colors} from "@/constants/Colors";

const UserDashboard_Layout = () => {
    return (
        <Tabs screenOptions={{
            title: "",
            headerShown: false,
            tabBarActiveTintColor: Colors["light"].tint,
        }}>
            <Tabs.Screen name="Dashboard" options={{
                tabBarIcon: ({color, focused}) => (
                    <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}></TabBarIcon>
                )
            }} />
            <Tabs.Screen name="(search)" options={{
                tabBarIcon: ({color, focused}) => (
                    <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color}></TabBarIcon>
                )
            }} />
            <Tabs.Screen name="Bookings" options={{
                tabBarIcon: ({color, focused}) => (
                    <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color}></TabBarIcon>
                )
            }} />
        </Tabs>
    )
}

export default UserDashboard_Layout;