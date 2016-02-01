/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import io from "socket.io-client/socket.io";

class SocketIoClient extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:3030', {jsonp: false});
    this.state = { text: 'initial', received: [] };
    this.socket.on('text', this.handleReceivedText.bind(this));
  }
  handleChange(event) {
    this.setState({text: event.nativeEvent.text});
  }
  handleReceivedText(text) {
    console.log('args', arguments);

    this.setState(function(previousState, currentProps) {
      console.log('prev state', previousState);
      return { received: previousState.received.concat(text) };
    });
  }
  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.text}
          onChange={this.handleChange.bind(this)} />
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TouchableHighlight onPress={() => {
          this.socket.emit('text', this.state.text);
          this.setState({text: ''});
        }}><Text>Test</Text></TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    color: '#000000',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SocketIoClient', () => SocketIoClient);
