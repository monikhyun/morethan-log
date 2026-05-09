import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import { TPost } from "../../../types"
import Image from "next/image"
import Category from "../../../components/Category"
import styled from "@emotion/styled"

type Props = {
  data: TPost
  variant?: "default" | "featured"
}

const PostCard: React.FC<Props> = ({ data, variant = "default" }) => {
  const title = data.title || "Untitled note"
  const category = (data.category && data.category?.[0]) || undefined
  const publishedAt = data?.date?.start_date || data.createdTime
  const formattedDate = publishedAt ? formatDate(publishedAt, CONFIG.lang) : ""
  const hasTags = data.tags && data.tags.length > 0

  return (
    <StyledWrapper href={`/${data.slug}`}>
      <article data-variant={variant} data-thumb={!!data.thumbnail}>
        {data.thumbnail && (
          <div className="thumbnail">
            <Image
              src={data.thumbnail}
              fill
              alt={title}
              css={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div className="content">
          <div className="meta">
            {category && <Category>{category}</Category>}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
          <h2>{title}</h2>
          {data.summary && <p className="summary">{data.summary}</p>}
          {hasTags && (
            <div className="tags">
              {data.tags?.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  display: block;
  height: 100%;

  article {
    overflow: hidden;
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    border: 1px solid
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 1.35rem;
    background:
      linear-gradient(
        180deg,
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(31, 31, 35, 0.88)"},
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(249, 250, 251, 0.82)" : "rgba(20, 20, 23, 0.9)"}
      );
    box-shadow: 0 16px 36px
      ${({ theme }) => (theme.scheme === "light" ? "rgba(15, 23, 42, 0.055)" : "rgba(0, 0, 0, 0.22)")};
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      box-shadow 180ms ease,
      background-color 180ms ease;

    :hover {
      transform: translateY(-4px);
      border-color: ${({ theme }) =>
        theme.scheme === "light" ? "rgba(79, 70, 229, 0.22)" : "rgba(129, 140, 248, 0.28)"};
      box-shadow: 0 24px 55px
        ${({ theme }) => (theme.scheme === "light" ? "rgba(15, 23, 42, 0.1)" : "rgba(0, 0, 0, 0.34)")};
    }

    &[data-variant="featured"][data-thumb="true"] {
      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
        min-height: 22rem;
      }
    }

    &[data-variant="featured"] {
      border-radius: 1.75rem;
    }

    > .thumbnail {
      overflow: hidden;
      position: relative;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray4};
      aspect-ratio: 16 / 10;

      img {
        transition: transform 260ms ease;
      }
    }

    :hover > .thumbnail img {
      transform: scale(1.035);
    }

    > .content {
      display: flex;
      padding: 1.15rem;
      flex: 1;
      flex-direction: column;

      > .meta {
        display: flex;
        margin-bottom: 0.85rem;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;

        > span {
          font-size: 0.75rem;
          line-height: 1rem;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.gray10};
        }
      }

      h2 {
        font-size: 1.1rem;
        line-height: 1.55rem;
        font-weight: 800;
        color: ${({ theme }) => theme.colors.gray12};
      }

      > .summary {
        display: -webkit-box;
        margin-top: 0.65rem;
        overflow: hidden;
        color: ${({ theme }) => theme.colors.gray11};
        font-size: 0.925rem;
        line-height: 1.65rem;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      > .tags {
        display: flex;
        margin-top: auto;
        padding-top: 1.1rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }

    &[data-variant="featured"] > .content {
      padding: 1.5rem;

      @media (min-width: 768px) {
        padding: 2rem;
      }
    }

    &[data-variant="featured"] > .thumbnail {
      @media (min-width: 768px) {
        height: 100%;
        min-height: 22rem;
        aspect-ratio: auto;
      }
    }

    &[data-variant="featured"] > .content h2 {
      font-size: 1.85rem;
      line-height: 2.25rem;

      @media (max-width: 640px) {
        font-size: 1.45rem;
        line-height: 1.95rem;
      }
    }

    &[data-variant="featured"] > .content > .summary {
      margin-top: 0.9rem;
      font-size: 1rem;
      line-height: 1.8rem;
      -webkit-line-clamp: 5;
    }
  }
`
