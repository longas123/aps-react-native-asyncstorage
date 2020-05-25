import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputData: '',
      getValue: '',
    };
  };

  saveValueFunction = () => {
    if (this.state.textInputData) {
      AsyncStorage.setItem('key_default', this.state.textInputData);
      this.setState({textInputData: ''});
      alert('Dado Salvo!');
    } else {
      alert('Favor preencher o dado!');
    };
  };

  getValueFunction = () => {
    AsyncStorage.getItem('key_default').then(
      value => this.setState({getValue: value})
    );
  };

  render () {
    return (
      <View style={styles.container}>      
        <TextInput
          placeholder="Registre um Aluno"
          value={this.state.textInputData}
          onChangeText={data => this.setState({textInputData: data})}
          style={styles.textInputStyle}
        />
        
        <TouchableOpacity
          onPress={this.saveValueFunction}
          style={styles.button}>
          <Text style={styles.buttonText}>Salvar Aluno</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={this.getValueFunction}
          style={styles.button}>
          <Text style={styles.buttonText}>Ler Aluno</Text>
        </TouchableOpacity>       
        
        <Text style={styles.text}>{this.state.getValue}</Text> 
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  textInputStyle: {
    textAlign: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'blue',
    fontSize: 30,
  },
  button: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: 'blue',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
  },
});