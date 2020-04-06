import React from 'react';
import { StyleSheet, View, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getImageFromApi, getFilmDetailFromApi } from '../API/TMDBApi'
import StarSVG from '../svg/star.svg'
import Spinner from 'react-native-loading-spinner-overlay';
import numeral from 'numeral'
import moment from 'moment'
import { connect } from 'react-redux'

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.route.params.id;
        this.navigation = props.navigation;
        this.state = {
            film: undefined,
            spinner: true
        }
    }
    componentDidMount() {
        getFilmDetailFromApi(this.id).then(data => {
            this.setState({
                film: data,
                spinner: false
            })
        })
    }

    _displayLoading() {
        if (this.state.spinner) {
            return (
                <Spinner
                    visible={this.state.spinner}
                />
            )
        }
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    componentDidUpdate() {
        // console.log(this.props.favoritesFilm)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../img/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../img/ic_favorite.png')
        }
        return (
            <Image 
                source={sourceImage}
                style={styles.favorite_image}
            />
        )
    }

    _displayFilm() {
        const { film } = this.state
        if (film != undefined) {
            return (
                <View style={styles.main_container}>
                    <Image source={{ uri: getImageFromApi(film.poster_path) }} style={styles.poster}></Image>
                    <TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <View style={styles.details_container}>
                        <View style={styles.film_title_container}>
                            <Text style={styles.film_title}>{film.title}</Text>
                        </View>
                        <View style={styles.vote_container}>
                            <Text style={styles.vote_number}>{film.vote_average}</Text>
                            <StarSVG />
                            <Text> | {film.vote_count} votes</Text>
                        </View>
                        <View style={styles.infos_list}>
                            <Text>Genres : </Text>
                            <Text>Companie(s) : {film.genres.map((item) => {
                                return item.name
                            }).join('/')}</Text>
                        </View>
                        {film.budget > 0 ? <Text>Budget : {numeral(film.budget).format('0,0')} $</Text> : <Text>Budget : N.C.</Text>}
                        <View style={styles.infos_list}>
                            <Text>Companie(s) : {film.production_companies.map((item) => {
                                return item.name
                            }).join('/')}</Text>
                        </View>
                        <Text>Sortie : {moment(film.release_date).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={styles.overview}>
                        <ScrollView >
                            <Text>{film.overview}</Text>
                        </ScrollView>
                    </View>
                    <Button title="Retour" onPress={() => this.navigation.goBack()} />
                </View>
            )
        }
    }

    render() {
        return (
            <ScrollView>
                {this._displayLoading()}
                {this._displayFilm()}
            </ScrollView>
        );
    }

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
        width: 180,
        height: 300,
        marginBottom:10
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width:40,
        height:40
    },
    details_container: {
        flex: 0.1,
        justifyContent: 'center',
        marginBottom: 10,
        width: 300,

    },
    film_title_container: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    film_title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    vote_container: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom:10
    },
    infos_list: {
        flex: 0.5,
        flexDirection: 'row'
    },
    overview: {
        flex: 0.4,
        marginBottom: 30
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Detail)
