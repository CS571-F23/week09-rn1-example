import { useEffect, useState } from "react";
import { Alert, Button, Image, Text, View } from "react-native";

import CS571 from "@cs571/mobile-client"

// TODO: Display the bio data from https://cs571.org/api/f23/weekly/week09/bio
// TODO: Whenever a button is clicked, display the message from https://cs571.org/api/f23/weekly/week09/message
export default function Mascot(props) {

    const [bio, setBio] = useState({
        name: "Mascot Name",
        quote: "Some inspiring quote...",
        imgSrc: undefined
    });

    useEffect(() => {
        fetch("https://cs571.org/api/f23/weekly/week09/bio", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => setBio(data))
    });

    function doSpeak() {
        fetch("https://cs571.org/api/f23/weekly/week09/message", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(resp => Alert.alert("Message received!", resp.msg))
    }

    return <View>
        {
            bio.imgSrc ? <Image style={{width: 250, height: 250}} source={{uri: bio.imgSrc}}/> : <></>
        }
        <Text style={{fontSize: 48}}>{bio.name}</Text>
        <Text style={{fontSize: 24}}>{bio.quote}</Text>
        <Button title="Speak!" onPress={doSpeak}/>
    </View>
}