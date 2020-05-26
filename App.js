import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
// import { createSwitchNavigator, createAppContainer , create } from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

// const Screen1 = () =>(
//   <View><Text>Screen 1</Text></View>
// );

// const Screen2 = () =>(
//   <View><Text>Screen 2</Text></View>
// );

// const Screen3 = () =>(
//   <View><Text>Screen 3</Text></View>
// );

// export default createAppContainer(createSwitchNavigator({
//   Screen1 : {
//     screen: Screen1
//   },
//   Screen2 : {
//     screen: Screen2
//   },
//   Screen3 : {
//     screen: Screen3
//   },
// }))


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turma: '',
      sala: '',
      doing: '',
      turmas : []
    };
  };


  componentDidMount(){
    AsyncStorage.getItem('turmas').then(
      ar => {
        if(ar){
          let turmas = JSON.parse(ar);
          this.setState({turmas: turmas});
        }
       
      }
    );
    
  }

  clearTurmas = () => {
    AsyncStorage.setItem('turmas', JSON.stringify([]))
    this.setState({turmas: []});
  };

  salvarTurma = () => {
    const { turma, sala } = this.state;

    if (turma && sala) {
      AsyncStorage.getItem('turmas').then(
        turmas => {
          let ar = [];

          if(turmas){
            ar = JSON.parse(turmas);
            let t = { turma : turma , sala: sala};
            ar.push(t);

            AsyncStorage.setItem('turmas', JSON.stringify(ar));

          }else{
            let t = { turma : turma , sala: sala};
            ar.push(t);
            AsyncStorage.setItem('turmas', JSON.stringify(ar));
          }
          this.setState({turmas: ar});
        }
      )

     
      
      alert('Dado Salvo!');
    } else {
      alert('Favor preencher o dado!');
    };
  };

  listarTurmas = () => {
    
  };


  updateTurmasState = () => {
    
  }

  listaTurmasScreen = () => {

    const {turmas} = this.state;
    
    console.log(turmas);

    return(
      <View style={styles.container}>
      <Text>Turmas do Adalto</Text>      
      {
        turmas.map(t => {
            return <Text>Turma: {t.turma} | Sala: {t.sala}</Text>
        })
      }


    <TouchableOpacity
      onPress={()=> this.setState({doing: ''}) }
      style={styles.button}>
      <Text style={styles.buttonText}>Voltar</Text>
    </TouchableOpacity> 
      </View>
    )
  }

//   <View style={styles.container}>      
//   <TextInput
//     placeholder="Registre um Aluno"
//     value={this.state.textInputData}
//     onChangeText={data => this.setState({textInputData: data})}
//     style={styles.textInputStyle}
//   />
  
//   <TouchableOpacity
//     onPress={this.saveValueFunction}
//     style={styles.button}>
//     <Text style={styles.buttonText}>Salvar Aluno</Text>
//   </TouchableOpacity>
  
//   <TouchableOpacity
//     onPress={this.getValueFunction}
//     style={styles.button}>
//     <Text style={styles.buttonText}>Ler Aluno</Text>
//   </TouchableOpacity>       
  
//   <Text style={styles.text}>{this.state.getValue}</Text> 
// </View>

  addTurmaScreen = () => (
    <View style={styles.container}>      
        <TextInput
          placeholder="Nome da turma"
          value={this.state.turma}
          onChangeText={data => this.setState({turma: data})}
          style={styles.textInputStyle}
        />

      <TextInput
        placeholder="Número da sala:"
        value={this.state.sala}
        onChangeText={data => this.setState({sala: data})}
        style={styles.textInputStyle}
      />

      <TouchableOpacity
        onPress={this.salvarTurma}
        style={styles.button}>
        <Text style={styles.buttonText}>Salvar Turma</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
          onPress={()=> this.setState({doing: ''}) }
          style={styles.button}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>    
      
      <Text style={styles.text}>{this.state.getValue}</Text> 
    </View>
  );

  welcomeScreen = () => (
    <View style={styles.container}>      
    <Text>O que tu quer?</Text>
  
    <TouchableOpacity
      onPress={()=> this.setState({doing: 'addTurma'}) }
      style={styles.button}>
      <Text style={styles.buttonText}>Adicionar Turma</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={()=> this.setState({doing: 'listarTurmas'}) }
      style={styles.button}>
      <Text style={styles.buttonText}>Listar Turmas</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={()=> this.clearTurmas() }
      style={styles.button}>
      <Text style={styles.buttonText}>Apagar Turmas</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={()=> this.setState({doing: 'addAlunoTurma'}) }
      style={styles.button}>
      <Text style={styles.buttonText}>Add aluno na Turma</Text>
    </TouchableOpacity>
  </View>
  )

  renderHelper = state => {
    const { doing } = this.state;

    switch(doing){
      case 'addTurma':
        return this.addTurmaScreen();

      case 'listarTurmas':
        return this.listaTurmasScreen();

      default:
        return this.welcomeScreen();
    }
  }

  render () {
    return (
      this.renderHelper()
    )
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