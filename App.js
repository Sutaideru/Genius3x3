import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const ExemploUseEffect = () => {
  const[contador,setContador] = useState(0);
  const[mensagem,setMensagem] = useState("Componente montado")

  useEffect(() => {
    setMensagem(`'O contador foi alterado para' ${contador}`);
  }, [contador]);
  return (
    <View>
      <Text>{mensagem}</Text>
      <Text>Contador: {contador}</Text>
      <Button title="Incrementar" onPress={() => setContador(contador+1)}/>
    </View>
  );

}

export default ExemploUseEffect;
