import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

export default class FilmItem extends React.Component {

    constructor(props) {
        super(props)
        this.film = props.film;
    }

    render() {
        return (
            <FadeIn>
                <TouchableOpacity style={styles.container} onPress={() => this.props.displayDetailForFilm(this.film.id)}>
                    <Image style={styles.poster} source={{ uri: getImageFromApi(this.film.poster_path) }}></Image>
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            {this.props.isFilmFavorite && <Image source={require('../img/ic_favorite.png')} style={styles.isFavorite} />}
                            <Text style={styles.title}>{this.film.original_title}</Text>
                            <Text style={styles.vote}>{this.film.vote_average}</Text>
                        </View>
                        <Text style={styles.description_container} numberOfLines={5} >{this.film.overview}</Text>
                        <View style={styles.footer_container}>
                            <Text style={styles.footer_release_date}>Sorti le {this.film.release_date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        padding: 5,
        height: 180,
        borderWidth: 1,
        borderColor: 'grey'
    },
    poster: {
        flex: 0.25,
        backgroundColor: 'grey'
    },
    content_container: {
        flex: 0.75,
        paddingLeft: 5
    },
    header_container: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        flex: 0.8,
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },
    isFavorite: {
        width: 25,
        height: 25
    },
    vote: {
        flex: 0.2,
        fontSize: 18,
        textAlign: 'right'
    },
    description_container: {
        flex: 0.65,
        fontStyle: 'italic',
        color: 'grey'
    },
    footer_container: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footer_release_date: {
        alignItems: 'center',
        paddingTop: 10
    }
});
