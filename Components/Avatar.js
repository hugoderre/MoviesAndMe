// Components/Avatar.js

import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'

class Avatar extends React.Component {

    constructor(props) {
        super(props)
        this._avatarClicked = this._avatarClicked.bind(this)
    }

    _avatarClicked() {
        ImagePicker.showImagePicker({}, (response) => {
          if (response.didCancel) {
            console.log('L\'utilisateur a annulé')
          }
          else if (response.error) {
            console.log('Erreur : ', response.error)
          }
          else {
            console.log(response.path)
            let requireSource = 'file://' + response.path
            // On crée une action avec l'image prise et on l'envoie au store Redux
            const action = { type: "SET_AVATAR", value: requireSource }
            this.props.dispatch(action)
          }
        })
      }

    render() {
        console.log(this.props.avatar)
        return (
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={this._avatarClicked}>
                <Image style={styles.avatar} source={{ uri : this.props.avatar }} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableOpacity: {
        margin: 5,
        width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 75,
        height: 75,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    }
})

const mapStateToProps = (state) => {
    return {
        avatar: state.setAvatar.avatar
    }
}
export default connect(mapStateToProps)(Avatar)
