import PostList from './PostList.tsx'

interface Post {
    id: number
    title: string
    description: string
}

interface ContentProps {
    posts: Post[]
}

const Content = ({ posts }: ContentProps) => {
    return (
        <section style={{ flex: 1 }}>
            <h2>Posts</h2>
            <PostList posts={posts} />
        </section>
    )
}

export default Content
