import Header from './components/Header.tsx'
import Main from './components/Main.tsx'
import Footer from './components/Footer.tsx'

const posts = [
    { id: 1, title: 'React Basics', description: 'Въведение в React компоненти.' },
    { id: 2, title: 'Component Tree', description: 'Как компонентите създават дървовидна структура.' },
    { id: 3, title: 'Props and State', description: 'Предаване на данни надолу по дървото.' },
]

function App() {
    return (
        <div className="app">
            <Header />
            <Main posts={posts} />
            <Footer />
        </div>
    )
}

export default App
