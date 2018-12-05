import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { countryEntityEditScreen } from '../../../navigation/layouts'

import CountryActions from './country.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './country-entity-detail-screen-style'

class CountryEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      country: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getCountry(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.country) {
      this.setState({ country: newProps.country })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllCountries()
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
      'Delete Country?',
      'Are you sure you want to delete the Country?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteCountry(this.props.data.entityId)
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
        <Text>ID: {this.state.country.id}</Text>
        <Text testID='countryName'>CountryName: {this.state.country.countryName}</Text>
        <RoundedButton text='Edit' onPress={countryEntityEditScreen.bind(this, { entityId: this.state.country.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    country: state.countries.country,
    deleting: state.countries.deleting,
    errorDeleting: state.countries.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCountry: (id) => dispatch(CountryActions.countryRequest(id)),
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    deleteCountry: (id) => dispatch(CountryActions.countryDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryEntityDetailScreen)
