import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';



export default function Detail({ route, navigation }) {
    const { overview, poster_path, vote_average } = route.params;
    console.log(vote_average)
    return (
        <View style={styles.main_container}>
            <Image source={{ uri: 'https://image.tmdb.org/t/p/w500' + poster_path }} style={styles.poster}></Image>
            <View>
                <Text style={styles.vote}>{vote_average}</Text>
            </View>
            <Text style={styles.overview}>{overview}</Text>
            <Button title="Retour" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    poster: {
        flex: 0.5,
        width: 180
    },
    vote: {

    },
    overview: {
        flex: 0.4,
        marginTop: 20,
        marginBottom: 30
    }
})
