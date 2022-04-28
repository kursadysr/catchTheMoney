import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timerCount, setTimer] = useState(10);
  const [text, setText] = useState("Start");
  const [isDisable, setIsDisable] = useState(false);
  const [positionT, setPositionT] = useState("50%");
  const [positionL, setPositionL] = useState("47%");




  function addScore()  {
    setCurrentScore(currentScore + 1);
    if (currentScore>=highScore) {
      setHighScore(currentScore+1)
    }
  }


  function startGame() {
    
    setCurrentScore(0)
    setIsDisable(true)
    let interval = setInterval(() => {
      let temp;
      
      setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval)
          temp = lastTimerCount - 1
          return temp
      })

      setPositionL(Math.floor(Math.random() * 90) + "%");
      setPositionT(Math.floor(Math.random() * 90) + "%");

      if (temp == 0) {

        setText("Start")
        setIsDisable(false)
        setPositionL("47%")
        setPositionT("50%")
        


      } else {
        setText(temp.toString())
      }


    
    }, 1000) //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval), setTimer(10)
  }



  return (
    <View style={styles.container}>

      <View style={styles.canvas}>
        <TouchableHighlight style={[styles.icon, {left: positionL, top: positionT}]} onPress={addScore} disabled={!isDisable}>
          <Entypo name="credit" size={34} color="#85bb65" />
        </TouchableHighlight>
      </View>

      <View style={styles.info}>
        <Text> Current score: {currentScore}</Text>
        <Text>High score: {highScore}</Text>
        <Button
          title={text}
          color="#841584"
          onPress={startGame}
          disabled={isDisable}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  canvas: {
    height: '85%',

  },
  icon: {
      position: "absolute",
  },
  info: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
