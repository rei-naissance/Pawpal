import * as SecureStore from 'expo-secure-store';

//save values
export const saveToSecureStore = async (key : any, value : any) => {
    try {
        await SecureStore.setItemAsync(key, value, {keychainAccessible: SecureStore.WHEN_UNLOCKED});
    } catch (error) {
        // console.error("Error saving to Secure Store", error);
    }
}

//return values
export const getFromSecureStore = async (key : any) => {
    try {
        const value = await SecureStore.getItemAsync(key);
        return value;
    } catch (error) {
        // console.error("Error retrieving to Secure Store", error);
        return null;
    }
}

//delete values
export const deleteFromSecureStore = async  (key : any) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        // console.error("Error deleting to Secure Store", error);
    }
}
