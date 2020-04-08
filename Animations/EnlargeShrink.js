import React from 'react'
import { Animated } from 'react-native'

export default class EnlargeShrink extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            size: new Animated.Value(this._getSize())
        }
    }

    _getSize() {
        if (this.props.shouldEnlarge) {
          return 50
        }
        return 40
      }

    componentDidUpdate() {
        Animated.spring(
            this.state.size,
            {
                toValue: this._getSize()
            }
        ).start()
    }

    render() {
        return (
            <Animated.View
                style={{ width: this.state.size, height:this.state.size }}>
                {this.props.children}
            </Animated.View>
        )
    }
}