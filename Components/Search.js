import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import films from '../Helpers/filmsData'
import FilmItem from '../Components/FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            spinner: false
        }
        this.page = 0;
        this.totalPages = 0;
        this.searchInput = "";
    }
    
        
    _searchFilms() {
        this.page=0;
        this.totalPages=0;
        this.setState({
            films:[]
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
            getFilmsFromApiWithSearchedText(this.searchInput, this.page+1).then(data => {
                {
                    this.page = data.page;
                    this.totalPages = data.total_pages
                    this.setState({
                        films: [...this.state.films,...data.results],
                        spinner: false
                    })
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Chargement...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <TextInput style={styles.textinput} placeholder="Titre du film" onSubmitEditing={() => this._searchFilms()} onChangeText={text => this._searchTextInputChanged(text)} />
                <Button style={{ height: 50 }} title="Rechercher" onPress={() => this._searchFilms()} />
                <FlatList
                    data={this.state.films}
                    renderItem={({ item }) => <FilmItem data={item} navigation={this.props.navigation}></FilmItem>}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached= {() => {
                        if(this.state.films.length > 0 && this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
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