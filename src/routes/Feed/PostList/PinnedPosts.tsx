import PostCard from "src/routes/Feed/PostList/PostCard"
import React, { useMemo } from "react"
import usePostsQuery from "src/hooks/usePostsQuery"
import styled from "@emotion/styled"
import { filterPosts } from "./filterPosts"
import { DEFAULT_CATEGORY } from "src/constants"

type Props = {
  q: string
}

const PinnedPosts: React.FC<Props> = ({ q }) => {
  const data = usePostsQuery()

  const filteredPosts = useMemo(() => {
    const baseFiltered = filterPosts({
      posts: data,
      q,
      category: DEFAULT_CATEGORY,
      order: "desc",
    })
    return baseFiltered.filter((post) => post.tags?.includes("Pinned"))
  }, [data, q])

  if (filteredPosts.length === 0) return null

  return (
    <StyledWrapper>
      <div className="section-heading">
        <span>Pinned Notes</span>
        <h2>Selected work and references</h2>
      </div>
      <div className="post-grid">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} data={post} />
        ))}
      </div>
    </StyledWrapper>
  )
}

export default PinnedPosts

const StyledWrapper = styled.div`
  position: relative;

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
    margin-top: 1rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
`
