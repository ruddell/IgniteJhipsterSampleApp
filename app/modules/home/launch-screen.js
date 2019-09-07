import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Navigation } from 'react-native-navigation'

import { Images } from '../../shared/themes'
import styles from './launch-screen.styles'

export default class LaunchScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
  }
  componentDidAppear () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          enabled: true
        }
      }
    })
  }
  showSideMenu () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true
        }
      }
    })
  }

  navigationButtonPressed ({ buttonId }) {
    this.showSideMenu()
  }

  render () {
    return (
      <View style={styles.mainContainer} testID='launchScreen'>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logoJhipster} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              {"Welcome to the Ignite JHipster Sample App.  The backend is running on Heroku's free plan, so it may take a minute to wake up if no one has used the app in a while."}
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}
