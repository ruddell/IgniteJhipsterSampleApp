import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import BankAccountActions from '../Redux/BankAccountRedux'
import { Actions as NavigationActions } from 'react-native-router-flux' // eslint-disable-line

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/BankAccountEntityScreenStyle'

class BankAccountEntityScreen extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    page: 0,
    sort: 'id,asc',
    size: 20,
    loading: true,
    done: false,
    dataObjects: []
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {
    return (
      <TouchableOpacity onPress={NavigationActions.bankAccountEntityDetail.bind(this, { entityId: item.id })}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{item.name} - ${item.amount}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  // renderHeader = () =>
  //   <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  // renderFooter = () =>
  //  <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <AlertMessage title='No BankAccounts Found' show={!this.props.fetching} />

  // renderSeparator = () =>
  //  <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  fetchBankAccounts = () => {
    this.props.getAllBankAccounts({ page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.state.done || this.props.fetching) {
      return
    }
    this.setState({
      page: this.state.page + 1,
      loading: true
    })
    this.fetchBankAccounts()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.bankAccounts) {
      this.setState({
        done: newProps.bankAccounts.length < this.state.size,
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.bankAccounts] : newProps.bankAccounts,
        loading: false
      })
    }
  }

  componentWillMount () {
    this.fetchBankAccounts()
    NavigationActions.refresh({
      rightTitle: 'Create',
      onRight: () => {
        NavigationActions.bankAccountEntityEdit({ entityId: null })
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          onEndThreshold={100}
          /* ListHeaderComponent={this.renderHeader} */
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    bankAccounts: state.bankAccounts.bankAccounts,
    fetching: state.bankAccounts.fetchingAll,
    error: state.bankAccounts.errorAll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBankAccounts: (options) => dispatch(BankAccountActions.bankAccountAllRequest(options))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountEntityScreen)
