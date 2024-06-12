import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DeviceWidth = Dimensions.get('window').width;

export default function HomeScreen() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const updatedBoard = board.slice();
    updatedBoard[index] = isXNext ? 'X' : 'O';
    setBoard(updatedBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index: number) => {
    return (
      <TouchableOpacity 
        key={index} 
        style={styles.box}
        onPress={() => handleClick(index)}
      >
        <Text style={styles.boxText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    const boardRows = [];
    for (let i = 0; i < 3; i++) {
      const row = (
        <View key={i} style={styles.row}>
          {board.slice(i * 3, i * 3 + 3).map((_, idx) => renderSquare(i * 3 + idx))}
        </View>
      );
      boardRows.push(row);
    }
    return boardRows;
  };

  const calculateWinner = (board: Array<string | null>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = 'Vencedor: ' + winner;
  } else if (!board.includes(null)) {
    status = 'Empate';
  } else {
    status = 'Próximo jogador: ' + (isXNext ? 'X' : 'O');
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.boardContainer}>
          {renderBoard()}
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
  },
  boardContainer: {
    backgroundColor: 'black',
    padding: 0,
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DeviceWidth * 0.3,
    height: DeviceWidth * 0.3,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    margin: 0,
  },
  boxText: {
    fontSize: 30,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 20,
  }
});
