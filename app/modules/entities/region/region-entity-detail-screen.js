import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { regionEntityEditScreen } from '../../../navigation/layouts'

import RegionActions from './region.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './region-entity-detail-screen-style'

class RegionEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      region: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getRegion(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.region) {
      this.setState({ region: newProps.region })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllRegions()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Region?',
      'Are you sure you want to delete the Region?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteRegion(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.region.id}</Text>
        <Text testID='regionName'>RegionName: {this.state.region.regionName}</Text>
        <RoundedButton text='Edit' onPress={regionEntityEditScreen.bind(this, { entityId: this.state.region.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    region: state.regions.region,
    deleting: state.regions.deleting,
    errorDeleting: state.regions.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRegion: (id) => dispatch(RegionActions.regionRequest(id)),
    getAllRegions: (options) => dispatch(RegionActions.regionAllRequest(options)),
    deleteRegion: (id) => dispatch(RegionActions.regionDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionEntityDetailScreen)
