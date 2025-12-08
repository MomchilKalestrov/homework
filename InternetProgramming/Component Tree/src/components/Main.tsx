import Sidebar from './Sidebar.tsx'
import Content from './content/Content.tsx'

interface Post {
    id: number
    title: string
    description: string
}

interface MainProps {
    posts: Post[]
}

const Main = ({ posts }: MainProps) => {
    return (
        <main style={{ display: 'flex', padding: '1rem', gap: '1rem' }}>
            <Sidebar />
            <Content posts={posts} />
        </main>
    )
}

export default Main
