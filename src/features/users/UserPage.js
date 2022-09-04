import { useSelector } from "react-redux"
import { selectUserById } from "./usersSlice"
import { selectAllPosts } from "../posts/postsSlice"
import { Link, useParams } from "react-router-dom"
import { useGetPostsByUserIdQuery } from "../posts/postsSlice"

const UserPage = () => {
  const { userId } = useParams()
  const user = useSelector(state => selectUserById(state, Number(userId)))

  const { data: postsForUser, isLoading, isSuccess, isError, error } = useGetPostsByUserIdQuery(userId)


  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = postsForUser.ids.map(id => (
      <li key={id}>
        <Link to={`/post/${id}`}>{postsForUser.entities[id].title}</Link>
      </li>
    ))
  } else if (isError) {
    content = <p>{error}</p>
  }
  return (
    <section>
      < h2>
        {user?.name}
        <ol>{content}</ol>
      </>
    </section>
  )
}

export default UserPage