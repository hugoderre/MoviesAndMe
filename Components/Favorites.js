import React from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import Avatar from './Avatar'

class Favorites extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            
            <View style={styles.favorites_container}>
                <View style={styles.avatar_container}>
                    <Avatar/>
                </View>
                <FilmList
                    films={this.props.favoritesFilm} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    favoriteList={true}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    favorites_container: {
        flex: 1,
    },
    avatar_container: {
        flex:0.4,
        justifyContent:'center',
        alignItems:'center'
    }
});

const mapStateToProps = state => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(Favorites)
