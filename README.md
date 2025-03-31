# Jogo Gênius 3x3

Este projeto envolve a criação de um jogo estilo *Genius*, mas com uma grid 3x3 ao invés de 2x2. O jogo possui 3 níveis de dificuldade: fácil, médio e difícil. O jogador deve repetir a sequência de luzes gerada aleatoriamente, e a dificuldade aumenta conforme o progresso no jogo.

## Funcionalidades

- Jogo de memória com 9 quadrados coloridos em grade 3x3
- Três níveis de dificuldade:
  - **Fácil**: Sequência inicial com 2 passos, velocidade mais lenta
  - **Médio**: Sequência inicial com 3 passos, velocidade média
  - **Difícil**: Sequência inicial com 4 passos, velocidade mais rápida
- Sistema de pontuação baseado no nível atual e tamanho da sequência
- Interface simples e intuitiva

## Como Jogar

1. Selecione um nível de dificuldade na tela inicial
2. Observe a sequência de quadrados que irão piscar
3. Repita a sequência tocando nos quadrados na mesma ordem
4. Se acertar, a sequência aumentará em um passo
5. Se errar, o jogo termina e exibe sua pontuação final

## Implementação Técnica

### Estrutura do Código

O jogo foi desenvolvido com React Native, utilizando hooks como `useState` e `useEffect` para gerenciar o estado do jogo e os efeitos colaterais.

### Principais Componentes

- **App.js**: Componente principal que contém toda a lógica do jogo
- **Hooks utilizados**:
  - `useState`: Para gerenciar diversos estados do jogo (sequência, nível, pontuação, etc.)
  - `useEffect`: Para controlar efeitos colaterais e sincronização

### Estados Principais

- `sequence`: Array com a sequência atual de quadrados a serem clicados
- `userSequence`: Array com a sequência inserida pelo usuário
- `isPlaying`: Booleano que indica se o jogo está mostrando a sequência
- `level`: Número inteiro que representa o nível atual
- `difficulty`: String que representa a dificuldade selecionada
- `score`: Número que representa a pontuação atual
- `flashingSquare`: Controla qual quadrado está piscando no momento

### Funções Principais

- `startGame`: Inicia um novo jogo com a dificuldade selecionada
- `generateSequence`: Cria uma nova sequência aleatória de passos
- `playSequence`: Reproduz visualmente a sequência para o jogador
- `handleSquarePress`: Gerencia o toque do usuário em um quadrado

## Como Executar o Projeto

1. Certifique-se de ter o Node.js e npm instalados
2. Instale o Expo CLI: `npm install -g expo-cli`
3. Clone este repositório
4. Navegue até a pasta do projeto e execute `npm install`
5. Execute `expo start` ou `npm start`
6. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR Code ou execute em um emulador

## Possíveis Melhorias

- Adicionar efeitos sonoros para cada quadrado
- Implementar sistema de recordes (high scores)
- Adicionar animações mais elaboradas
- Criar modo de jogo infinito
- Adicionar cronômetro para tempo de resposta

## Tecnologias Utilizadas

- React Native
- JavaScript (ES6+)
- React Hooks (useState, useEffect)
- Expo
