/* External Dependencies */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

/* Internal Dependencies */
import styles from './Messages$.scss'
import { MessageActions } from '../../actions'
import MessageList from '../../components/MessageList'
import ContentPanel from '../../components/ContentPanel'

class Messages$ extends React.Component {

  constructor() {
    super()
    this.handleClickPostMessage = this.handleClickPostMessage.bind(this)
  }

  componentWillMount() {
    let x = this.props.geolocation.x || parseFloat(window.sessionStorage.getItem('vtag-geo-x'));
    let y = this.props.geolocation.y || parseFloat(window.sessionStorage.getItem('vtag-geo-y'));

    this.props.dispatch(MessageActions.getMessages({
      x: x,
      y: y
    }))
  }

  handleClickPostMessage(data) {
    this.props.router.push('/postMessage')
  }

  render() {
    let x = this.props.geolocation.x || parseFloat(window.sessionStorage.getItem('vtag-geo-x'));
    let y = this.props.geolocation.y || parseFloat(window.sessionStorage.getItem('vtag-geo-y'));

    return (
      <ContentPanel
        handleClickPostMessage={this.handleClickPostMessage}
        showPostMessageBtn={true}>
        <MessageList messages={this.props.messages} x={x} y={y} />
      </ContentPanel>
    )
  }

}


const mapStateToProps = (state, props) => {
  return {
    geolocation: state.GeoReducer.geolocation,
    messages: state.MessagesReducer.messages,
    temp: props.location,
    state: state
  }
}

const RoutedMessages$ = withRouter(Messages$)
const ConnectedMessages$ = connect(mapStateToProps)(RoutedMessages$)

export default ConnectedMessages$
