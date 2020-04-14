import React from 'react';
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            spinner: false
        }
        this.page = 0;
        this.totalPages = 0;
        this.searchInput = "";
        this._loadFilms = this._loadFilms.bind(this)
    }


    _searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films: []
        }, () => {
            this._loadFilms()
        })
    }

    _searchTextInputChanged(text) {
        this.searchInput = text;
    }
    _loadFilms() {
        if (this.searchInput.length > 0) {
            this.setState({
                spinner: true
            })
            getFilmsFromApiWithSearchedText(this.searchInput, this.page + 1).then(data => {
                {
                    this.page = data.page;
                    this.totalPages = data.total_pages
                    this.setState({
                        films: [...this.state.films, ...data.results],
                        spinner: false
                    })
                }
            });
        }
    }

    render() {
        console.log('TEST')
        return (
            <View style={styles.main_container}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Chargement...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <TextInput style={styles.textinput} placeholder="Titre du film" onSubmitEditing={() => this._searchFilms()} onChangeText={text => this._searchTextInputChanged(text)} />
                <Button style={{ height: 50 }} title="Rechercher" onPress={() => this._searchFilms()} />
                <FilmList
                    films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                    favoriteList={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    textinput: {

        marginLeft: 5,
        marginRight: 5, height: 50,
        borderColor: '#000',
        borderWidth: 1,
        paddingLeft: 5
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Search)