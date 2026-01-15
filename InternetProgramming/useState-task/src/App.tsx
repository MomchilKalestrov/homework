import { useState } from 'react'
import './App.css'

type Screen = 'start' | 'question' | 'finish'

type Question = {
  text: string
  answers: [string, string, string]
}

function App() {
  const questions: Question[] = [
    {
      text: 'Кое число трябва да стои вместо ? в редицата: 2, 4, 8, 16, ?',
      answers: ['24', '32', '34'],
    },
    {
      text: 'Коя дума НЕ принадлежи към групата?',
      answers: ['Котка', 'Куче', 'Стол'],
    },
    {
      text: 'Ако всички лалета са цветя и всички цветя имат листа, кое е вярно?',
      answers: [
        'Всички лалета имат листа',
        'Нито едно лале няма листа',
        'Някои цветя не са лалета',
      ],
    },
  ]

  const [screen, setScreen] = useState<Screen>('start')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const currentQuestion = questions[currentQuestionIndex]

  const startTest = () => {
    setCurrentQuestionIndex(0)
    setScreen('question')
  }

  const restartTest = () => {
    setCurrentQuestionIndex(0)
    setScreen('start')
  }

  const answerCurrent = () => {
    const nextIndex = currentQuestionIndex + 1
    if (nextIndex >= questions.length) {
      setScreen('finish')
      return
    }

    setCurrentQuestionIndex(nextIndex)
  }

  return (
    <>
      <h1>Логически тест</h1>

      {screen === 'start' && (
        <div className="card">
          <p>Натиснете бутона, за да започнете.</p>
          <button onClick={startTest}>Започни теста</button>
        </div>
      )}

      {screen === 'question' && currentQuestion && (
        <div className="card">
          <p>{currentQuestion.text}</p>
          <div className="answers">
            <button onClick={answerCurrent}>A: {currentQuestion.answers[0]}</button>
            <button onClick={answerCurrent}>B: {currentQuestion.answers[1]}</button>
            <button onClick={answerCurrent}>C: {currentQuestion.answers[2]}</button>
          </div>
        </div>
      )}

      {screen === 'finish' && (
        <div className="card">
          <p>Тестът е завършен!</p>
          <button onClick={restartTest}>Започни отначало</button>
        </div>
      )}
    </>
  )
}

export default App
