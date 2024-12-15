import {Stack} from "expo-router";
import SearchFilters from "@/app/(user_dashboard)/(search)/SearchFilters";

const SearchLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search"/>
            <Stack.Screen name="SearchFilters"/>
        </Stack>
    )
}

export default SearchLayout