interface Post {
    id: number
    title: string
    description: string
}

interface PostItemProps {
    post: Post
}

const PostItem = ({ post }: PostItemProps) => {
    const { title, description } = post

    return (
        <article style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
            <h3>{title}</h3>
            <p>{description}</p>
        </article>
    )
}

export default PostItem
