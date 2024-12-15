import {ScrollView, View} from "react-native";
import {H3, P} from "@/components/Typography";
import SearchBarBox from "@/components/search/SearchBarBox"
import PawPalList from "@/components/search/PawPalList";

const Search = () => {
    return (
        <ScrollView>
            <View className={"m-8 gap-3"}>
                <H3>Search</H3>
                <SearchBarBox/>
                <PawPalList/>
            </View>
        </ScrollView>
    )
}

export default Search;