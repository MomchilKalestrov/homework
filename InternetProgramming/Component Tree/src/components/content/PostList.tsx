import PostItem from './PostItem.tsx'

interface Post {
    id: number
    title: string
    description: string
}

interface PostListProps {
    posts: Post[]
}

const PostList = ({ posts }: PostListProps) => {
    return (
        <div>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    )
}

export default PostList
