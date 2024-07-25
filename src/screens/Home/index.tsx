import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';

import { Participant } from '../../components/Participant';

import {styles} from './styles';

export default function Home(){
  const [participants, setParticipants] =useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd(){
    if(participants.includes(participantName)){
      return Alert.alert("Já existe!", "Já existe um participante na lista com esse nome")
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string){
    Alert.alert("Remover?", `Remover o participante ${name}?`,[
    {
      text: 'Não',
      style: 'cancel'
    },
    {
      text: 'Sim',
      onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
    }
   
    ])
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
      Chacrinha
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 16 de Setembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={text => setParticipantName(text)} //pode por só {setParticipantName}
          value={participantName}
        />
      
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

    <FlatList 
      data={participants}
      keyExtractor={item => item}
      renderItem={({item}) => (
          <Participant
            key={item} 
            name={item} 
            onRemove={()=> handleParticipantRemove(item)}
          />
        )}
      ListEmptyComponent={() => (
        <Text style={styles.listEmptyText}>
          Ninguém confirmou ainda? Corre atras deles
        </Text>
        )}
    />
       
      

    </View>
  )
}