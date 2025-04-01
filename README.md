# Jogo Genius 3x3

Este projeto envolve a criação de um jogo estilo *Genius*, mas com uma grid 3x3 ao invés de 2x2. O jogo possui 3 níveis de dificuldade: fácil, médio e difícil. O jogador deve repetir a sequência de luzes gerada aleatoriamente, e a dificuldade aumenta conforme o progresso no jogo.

## Funcionalidades

- Jogo de memória com 9 quadrados coloridos em grade 3x3
- Três níveis de dificuldade:
  - **Fácil**: Botões piscam por 0.8 segundos e tem um intervalo de 0.3 segundos entre os flashes
  - **Médio**: Botões piscam por 0.6 segundos e tem um intervalo de 0.25 segundos entre os flashes
  - **Difícil**: Botões piscam por 0.4 segundos e tem um intervalo de 0.2 segundos entre os flashes
- Sistema de pontuação baseado na quantidade de sequências completadas corretamente.

## Como Jogar

1. Leia as regras e clique em "Iniciar Jogo";
2. Após a sequência ser exibida, toque nos quadrados na mesma ordem em que piscaram;
3. Se acertar toda a sequência corretamente, um novo passo será adicionado e o jogo continuará;
4. Se errar a ordem, o jogo exibe uma mensagem de erro e o nível reinicia.

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
2. Instale o Expo CLI:
```
npm install -g expo-cli
```
3. Clone este repositório:
```
git clone https://github.com/Sutaideru/Genius3x3.git
```
4. Acesse a pasta do projeto:
```
cd JogoDaMemoriaReact
```
5. Instale as dependências:
```
npm install
```
6.Inicie o projeto:
```
expo start
```
7. Navegue até a pasta do projeto e execute `npm install`
8. Execute `expo start` ou `npm start`
9. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR Code ou execute em um emulador

## Tecnologias Utilizadas

- React Native
- JavaScript (ES6+)
- React Hooks (useState, useEffect)
- Expo
