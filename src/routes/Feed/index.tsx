import { useState } from "react"

import SearchInput from "./SearchInput"
import { FeedHeader } from "./FeedHeader"
import Footer from "./Footer"
import styled from "@emotion/styled"
import TagList from "./TagList"
import MobileProfileCard from "./MobileProfileCard"
import ProfileCard from "./ProfileCard"
import ServiceCard from "./ServiceCard"
import ContactCard from "./ContactCard"
import PostList from "./PostList"
import PinnedPosts from "./PostList/PinnedPosts"

type Props = {}

const Feed: React.FC<Props> = () => {
  const [q, setQ] = useState("")

  return (
    <StyledWrapper>
      <MobileProfileCard />
      <div className="portfolio-panels">
        <ProfileCard />
        <ServiceCard />
        <ContactCard />
      </div>
      <PinnedPosts q={q} />
      <section className="feed-controls" aria-label="Writing filters">
        <div className="control-row">
          <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
          <FeedHeader />
        </div>
        <TagList />
      </section>
      <PostList q={q} />
      <div className="footer">
        <Footer />
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 3rem 0 4rem;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.25rem 0 3rem;
    gap: 1.25rem;
  }

  :before {
    content: "";
    position: absolute;
    top: -8rem;
    left: 50%;
    width: min(56rem, 100%);
    height: 26rem;
    pointer-events: none;
    transform: translateX(-50%);
    background:
      radial-gradient(
        circle at 20% 20%,
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(79, 70, 229, 0.16)" : "rgba(99, 102, 241, 0.2)"},
        transparent 34%
      ),
      radial-gradient(
        circle at 78% 12%,
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(14, 165, 233, 0.14)" : "rgba(56, 189, 248, 0.12)"},
        transparent 30%
      );
    filter: blur(14px);
  }

  > * {
    position: relative;
  }

  > .portfolio-panels {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;

    @media (max-width: 960px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  > .feed-controls {
    padding: 1rem;
    border: 1px solid
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 1.5rem;
    background:
      linear-gradient(
        180deg,
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(255, 255, 255, 0.86)" : "rgba(24, 24, 27, 0.82)"},
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(249, 250, 251, 0.72)" : "rgba(17, 17, 19, 0.72)"}
      );
    box-shadow:
      0 18px 45px ${({ theme }) => (theme.scheme === "light" ? "rgba(15, 23, 42, 0.06)" : "rgba(0, 0, 0, 0.24)")},
      inset 0 1px 0 rgba(255, 255, 255, 0.08);

    > .control-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 1rem;
      align-items: flex-end;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      padding: 0.875rem;
      border-radius: 1.25rem;
    }
  }

  > .footer {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }
`
