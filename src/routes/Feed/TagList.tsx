import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"
import { useTagsQuery } from "src/hooks/useTagsQuery"

type Props = {}

const TagList: React.FC<Props> = () => {
  const router = useRouter()
  const currentTag = router.query.tag || undefined
  const data = useTagsQuery()

  const handleClickTag = (value: any) => {
    // delete
    if (currentTag === value) {
      router.push({
        query: {
          ...router.query,
          tag: undefined,
        },
      })
    }
    // add
    else {
      router.push({
        query: {
          ...router.query,
          tag: value,
        },
      })
    }
  }

  return (
    <StyledWrapper>
      <div className="top">Explore Topics</div>
      <div className="list">
        {Object.keys(data).map((key) => (
          <a
            key={key}
            data-active={key === currentTag}
            onClick={() => handleClickTag(key)}
          >
            {key}
          </a>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default TagList

const StyledWrapper = styled.div`
  .top {
    margin: 1rem 0 0.5rem;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.indigo11};
    text-transform: uppercase;
  }

  .list {
    display: flex;
    gap: 0.45rem;
    overflow-x: auto;

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    a {
      display: block;
      padding: 0.45rem 0.75rem;
      border: 1px solid
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
      border-radius: 999px;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray10};
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "rgba(255, 255, 255, 0.62)" : "rgba(39, 39, 42, 0.62)"};
      flex-shrink: 0;
      cursor: pointer;
      transition:
        transform 180ms ease,
        color 180ms ease,
        border-color 180ms ease,
        background-color 180ms ease;

      :hover {
        transform: translateY(-1px);
        color: ${({ theme }) => theme.colors.gray12};
        border-color: ${({ theme }) =>
          theme.scheme === "light" ? "rgba(17, 24, 39, 0.14)" : "rgba(255, 255, 255, 0.16)"};
      }

      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.indigo12};
        border-color: ${({ theme }) =>
          theme.scheme === "light" ? "rgba(79, 70, 229, 0.28)" : "rgba(129, 140, 248, 0.34)"};
        background-color: ${({ theme }) =>
          theme.scheme === "light" ? "rgba(238, 242, 255, 0.86)" : "rgba(49, 46, 129, 0.28)"};

        :hover {
          background-color: ${({ theme }) =>
            theme.scheme === "light" ? "rgba(238, 242, 255, 0.95)" : "rgba(49, 46, 129, 0.34)"};
        }
      }
    }
  }
`
