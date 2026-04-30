import axios from "axios";

export const getUsers = async () => {
    try {
        const res = await axios.get("https://dummyjson.com/users");
        return res.data.users;
    } catch (error) {
        console.log(error);
        return [];
    }
};

