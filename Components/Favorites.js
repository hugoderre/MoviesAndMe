import React from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
// import { ScrollView } from 'react-native-gesture-handler'

class Favorites extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (

            <View style={styles.favorites_container}>
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
        marginTop: 25
    }
});

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Favorites)
