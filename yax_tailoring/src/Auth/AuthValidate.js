import React from 'react'
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default {

    onAuth: async () => {

        const token_id = cookies.get("token_id");
        const user_id = cookies.get("user_id");

        // auth 
        if (token_id || user_id) {

            // By the way heders are not needed
            let headersList = {
                "Accept": "*/*",
                "token_id": token_id // Currently i am passing login token by headers, but i have passed login token via cookie
            }

            // making the post request
            let response = await fetch("http://localhost:5000/auth", {
                method: "POST",
                headers: headersList,
            });

            let data = await response.json();
            if (response.ok) {
                return "logged";
            }
            else {
                // If Error then remove cookies from the client 
                try {
                    cookies.remove("token_id");
                    cookies.remove("user_id");
                } catch {
                    console.log("Error during Removing cookie");
                }

                return "error";


            }

        } else {
            return "notLogged"
        }
    }


}