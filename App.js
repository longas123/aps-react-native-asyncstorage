import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text,Button } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turma: '',
      sala: '',
      doing: '',
      turmas : [],
      turmaSelecionada: {},
      novoAluno: '',
      matriculaNovo : ''
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

  lastIdPlusOne = () => {
    let { turmas } =  this.state;
 
    let last = 0;
    if(turmas){
      turmas.map( t => t.id > last ? last = t.id : last = last)
    }
    return last +1;
  }

  salvarTurma = () => {
    const { turma, sala } = this.state;

    if (turma && sala) {
      AsyncStorage.getItem('turmas').then(
        turmas => {
          let ar = [];

          let id = this.lastIdPlusOne(turmas);

          if(turmas){
            ar = JSON.parse(turmas);
            let t = { id: id ,turma : turma , sala: sala, alunos: []};
            ar.push(t);

            AsyncStorage.setItem('turmas', JSON.stringify(ar));

          }else{
            let t = { id: id, turma : turma , sala: sala, alunos: []};
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


  verTurma = (turma) => {
    this.setState({doing: 'pageTurma', turmaSelecionada: turma});
  }

  listaTurmasScreen = () => {

    const {turmas} = this.state;
    
    // console.log(turmas);

    return(
      <View style={styles.container}>
      <Text>Turmas do Adalto</Text>      
      {
        turmas.map(t => {
            let { turma, sala, id } = t;

            return (<View>
            <Text>Id: {id} | Turma: {turma} | Sala: {sala}</Text>
            <Button title='Ver turma' onPress={() => this.verTurma(t)} />
            </View>)
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

  salvarNovoAluno = () =>{
    //Array de turma do State
    let { turmas, novoAluno, matriculaNovo } = this.state;

    //Id da selecionada
    let {id, turma } = this.state.turmaSelecionada;
    
    //Novo aluno
    const novo = { nome: novoAluno, matricula: matriculaNovo, turma: turma };
    
    //Procura a turma seleciona pelo id e adiciona o novo aluna
    turmas.map(t=> {
      if(t.id == id){
        t.alunos.push(novo);
      }
    })

    //Salva no dispositivo fazendo overide
    AsyncStorage.setItem('turmas', JSON.stringify(turmas));

    //Atualiza no state
    console.log(turmas);
    this.setState({turmas: turmas});


  }

  pageTurmaScreen = () => {
    let { turma, sala, alunos } = this.state.turmaSelecionada;
    

    return(
    <View style={styles.container}>
        <Text>Turma: {turma} | Sala {sala} </Text>      
        <TextInput
          placeholder="Nome do aluno"
          value={this.state.novoAluno}
          onChangeText={data => this.setState({novoAluno: data})}
          style={styles.textInputStyle}
        />

      <TextInput
        placeholder="Matricula"
        value={this.state.matriculaNovo}
        onChangeText={data => this.setState({matriculaNovo: data})}
        style={styles.textInputStyle}
      />

      <TouchableOpacity
        onPress={this.salvarNovoAluno}
        style={styles.button}>
        <Text style={styles.buttonText}>Salvar Aluno</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
          onPress={()=> this.setState({doing: 'listarTurmas'}) }
          style={styles.button}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>    
      
        {
        alunos.map(a => {
            let { nome, matricula } = a;

            return (<View>
            <Text>Aluno: {nome} | Matricula: {matricula} </Text>
            </View>)
        })
      }
    </View>
  )};



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

  </View>
  )

  renderHelper = state => {
    const { doing } = this.state;

    switch(doing){
      case 'addTurma':
        return this.addTurmaScreen();

      case 'listarTurmas':
        return this.listaTurmasScreen();

      case 'pageTurma':
        return this.pageTurmaScreen();

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