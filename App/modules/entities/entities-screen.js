import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/*eslint-disable */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  regionEntityScreen,
  countryEntityScreen,
  locationEntityScreen,
  departmentEntityScreen,
  taskEntityScreen,
  employeeEntityScreen,
  jobEntityScreen,
  jobHistoryEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/*eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>JHipster Entities will appear below</Text>
        <RoundedButton text='Region' onPress={regionEntityScreen} testID='regionEntityScreenButton' />
        <RoundedButton text='Country' onPress={countryEntityScreen} testID='countryEntityScreenButton' />
        <RoundedButton text='Location' onPress={locationEntityScreen} testID='locationEntityScreenButton' />
        <RoundedButton text='Department' onPress={departmentEntityScreen} testID='departmentEntityScreenButton' />
        <RoundedButton text='Task' onPress={taskEntityScreen} testID='taskEntityScreenButton' />
        <RoundedButton text='Employee' onPress={employeeEntityScreen} testID='employeeEntityScreenButton' />
        <RoundedButton text='Job' onPress={jobEntityScreen} testID='jobEntityScreenButton' />
        <RoundedButton text='JobHistory' onPress={jobHistoryEntityScreen} testID='jobHistoryEntityScreenButton' />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
