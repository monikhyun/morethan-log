import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import styled from "@emotion/styled"

type Props = {
  q: string
}

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter()
  const data = usePostsQuery()
  const [filteredPosts, setFilteredPosts] = useState(data)

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  useEffect(() => {
    setFilteredPosts(() => {
      let newFilteredPosts = data
      // keyword
      newFilteredPosts = newFilteredPosts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(" ") : ""
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })

      // tag
      if (currentTag) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post && post.tags && post.tags.includes(currentTag)
        )
      }

      // category
      if (currentCategory !== DEFAULT_CATEGORY) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) =>
            post && post.category && post.category.includes(currentCategory)
        )
      }
      // order
      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse()
      }

      return newFilteredPosts
    })
  }, [q, currentTag, currentCategory, currentOrder, setFilteredPosts])

  const featuredPost = filteredPosts[0]
  const recentPosts = filteredPosts.slice(1)

  return (
    <StyledWrapper>
      {!filteredPosts.length && (
        <div className="empty">
          <span>No matching notes</span>
          <p>Try a different keyword, tag, or category.</p>
        </div>
      )}
      {featuredPost && (
        <section className="section">
          <div className="section-heading">
            <span>Featured Writing</span>
            <h2>Latest from the log</h2>
          </div>
          <PostCard data={featuredPost} variant="featured" />
        </section>
      )}
      {!!recentPosts.length && (
        <section className="section">
          <div className="section-heading">
            <span>Recent Notes</span>
            <h2>Writing and project notes</h2>
          </div>
          <div className="post-grid">
            {recentPosts.map((post) => (
              <PostCard key={post.id} data={post} />
            ))}
          </div>
        </section>
      )}
    </StyledWrapper>
  )
}

export default PostList

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section-heading {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: flex-end;

    @media (max-width: 640px) {
      display: block;
    }

    span {
      display: block;
      margin-bottom: 0.35rem;
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.indigo11};
      text-transform: uppercase;
    }

    h2 {
      font-size: 1.65rem;
      line-height: 2.1rem;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.gray12};

      @media (max-width: 640px) {
        font-size: 1.35rem;
        line-height: 1.8rem;
      }
    }
  }

  .post-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .empty {
    padding: 2rem;
    border: 1px dashed
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(17, 24, 39, 0.14)" : "rgba(255, 255, 255, 0.14)"};
    border-radius: 1.25rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray11};
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "rgba(255, 255, 255, 0.58)" : "rgba(24, 24, 27, 0.58)"};

    span {
      display: block;
      margin-bottom: 0.35rem;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.gray12};
    }

    p {
      margin: 0;
      font-size: 0.875rem;
      line-height: 1.5rem;
    }
  }
`
