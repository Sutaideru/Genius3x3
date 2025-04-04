import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar } from 'react-native';
import { Audio } from 'expo-av'; 

const App = () => {

  const [sequence, setSequence] = useState([]); 
  const [userSequence, setUserSequence] = useState([]); 
  const [isPlaying, setIsPlaying] = useState(false); 
  const [gameStarted, setGameStarted] = useState(false); 
  const [level, setLevel] = useState(1); 
  const [difficulty, setDifficulty] = useState('easy'); 
  const [score, setScore] = useState(0);
  const [sounds, setSounds] = useState([]);
  

  const difficultySettings = {
    easy: { 
      flashDuration: 800, 
      pauseDuration: 300 
    },
    medium: { 
      flashDuration: 600, 
      pauseDuration: 250 
    },
    hard: { 
      flashDuration: 400, 
      pauseDuration: 200 
    }
  };


  const colors = ['#FF0000','#00FF00','#0000FF','#FFFF00','#FF00FF','#00FFFF','#FFA500','#800080','#008000', ];
                 //Vermelho,  Verde,    Azul,    Amarelo,  Magenta,   Ciano,   Laranja,   Roxo,   Verde escuro
  
  const [flashingSquare, setFlashingSquare] = useState(-1);
  
  useEffect(() => {
    if (level <= 5) {
      setDifficulty('easy');
    } else if (level <= 10) {
      setDifficulty('medium');
    } else {
      setDifficulty('hard');
    }
  }, [level]);

  useEffect(() => {
    loadSounds();
    
    return () => {
      unloadSounds();
    };
  }, []);

  const loadSounds = async () => {
    try {
      
      const soundObjects = [];
      
      for (let i = 0; i < 9; i++) {
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/sounds/tone.mp3'),
          { volume: 1.0 }
        );
        soundObjects.push(sound);
      }
      
      const { sound: correctSound } = await Audio.Sound.createAsync(
        require('./assets/sounds/correct.mp3')
      );
      
      const { sound: wrongSound } = await Audio.Sound.createAsync(
        require('./assets/sounds/wrong.mp3')
      );
      
      setSounds([...soundObjects, correctSound, wrongSound]);
    } catch (error) {
      console.error("Erro ao carregar sons:", error);
    }
  };
  
  const unloadSounds = async () => {
    try {
      for (const sound of sounds) {
        if (sound) {
          await sound.unloadAsync();
        }
      }
    } catch (error) {
      console.error("Erro ao descarregar sons:", error);
    }
  };
  
  const playSound = async (index) => {
    try {
      if (sounds[index]) {
        await sounds[index].replayAsync();
      }
    } catch (error) {
      console.error("Erro ao reproduzir som:", error);
    }
  };
  
  const playCorrectSound = async () => {
    try {
      if (sounds[9]) {
        await sounds[9].replayAsync();
      }
    } catch (error) {
      console.error("Erro ao reproduzir som de acerto:", error);
    }
  };
  
  const playWrongSound = async () => {
    try {
      if (sounds[10]) {
        await sounds[10].replayAsync();
      }
    } catch (error) {
      console.error("Erro ao reproduzir som de erro:", error);
    }
  };

  const startGame = () => {
    setLevel(1);
    setScore(0);
    setGameStarted(true);
    generateSequence(1);
  };

  const generateSequence = (steps) => {
    const newSequence = [];
    for (let i = 0; i < steps; i++) {
      newSequence.push(Math.floor(Math.random() * 9));
    }
    setSequence(newSequence);
    setUserSequence([]);
    
    setTimeout(() => {
      playSequence(newSequence);
    }, 1000);
  };

  const playSequence = async (seq) => {
    setIsPlaying(true);
    
    const { flashDuration, pauseDuration } = difficultySettings[difficulty];
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, pauseDuration));
      
      setFlashingSquare(seq[i]);
      playSound(seq[i]);
      
      await new Promise(resolve => setTimeout(resolve, flashDuration));
      
      setFlashingSquare(-1);
    }
    
    setIsPlaying(false);
  };

  const handleSquarePress = (index) => {
    if (isPlaying || !gameStarted) return;
    
    setFlashingSquare(index);
    playSound(index);
    setTimeout(() => setFlashingSquare(-1), 200);
    
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);
    
    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      playWrongSound();
      Alert.alert(
        "Fim de jogo", 
        `Você errou a sequência! Sua pontuação final: ${score}`,
        [{ text: "Tentar novamente", onPress: () => startGame() }]
      );
      return;
    }
    
    if (newUserSequence.length === sequence.length) {
      playCorrectSound();
      
      const newScore = score + 1;
      setScore(newScore);
      
      const newLevel = level + 1;
      setLevel(newLevel);
      
      setTimeout(() => {
        const newSequence = [...sequence, Math.floor(Math.random() * 9)];
        setSequence(newSequence);
        setUserSequence([]);
        
        setTimeout(() => {
          playSequence(newSequence);
        }, 1000);
      }, 500);
    }
  };

  const renderSquare = (index) => {
    const isFlashing = flashingSquare === index;
    
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.square,
          { backgroundColor: isFlashing ? '#FFFFFF' : colors[index]}
        ]}
        onPress={() => handleSquarePress(index)}
        disabled={isPlaying}
      />
    );
  };
  
  const getDifficultyText = () => {
    switch(difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Fácil';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {gameStarted && (
        <View style={styles.difficultyIndicator}>
          <Text style={styles.difficultyText}>
            {getDifficultyText()}
          </Text>
        </View>
      )}
      
      <Text style={styles.title}>Jogo Genius</Text>
      
      {gameStarted ? (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Sequência: {level}</Text>
            <Text style={styles.info}>Pontuação: {score}</Text>
          </View>
          
          <View style={styles.gameContainer}>
            <View style={styles.grid}>
              {Array(9).fill().map((_, index) => renderSquare(index))}
            </View>
            
            <Text style={styles.instruction}>
              {isPlaying 
                ? 'Observe a sequência...' 
                : 'Repita a sequência!'}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setGameStarted(false)}>
            <Text style={styles.buttonText}>Voltar ao Menu</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.menuContainer}>
          <Text style={styles.menuText}>Regras:</Text>
          <Text style={styles.rulesText}>
            Memorize a sequência e repita-a!{'\n'}
            - Sequência 1-5: Fácil{'\n'}
            - Sequência 6-10: Média{'\n'}
            - Sequência 11+: Difícil
          </Text>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonStart]} 
            onPress={() => startGame()}>
            <Text style={styles.buttonText}>Iniciar Jogo</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  info: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  gameContainer: {
    alignItems: 'center',
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 300,
    height: 300,
  },
  square: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instruction: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 30,
  },
  menuContainer: {
    alignItems: 'center',
    width: '80%',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 22,
    marginBottom: 10,
  },
  rulesText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonStart: {
    backgroundColor: '#27ae60',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  difficultyIndicator: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#7d7d7d',
  },
  difficultyText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
