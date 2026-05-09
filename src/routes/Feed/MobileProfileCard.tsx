import { CONFIG } from "site.config"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"
import {
  AiFillLinkedin,
  AiOutlineGithub,
  AiOutlineMail,
} from "react-icons/ai"

type Props = {
  className?: string
}

const TECH_STACK = ["Spring Boot", "Unity", "Docker", "AWS", "JAVA", "Android Studio", "Postman"]

const MobileProfileCard: React.FC<Props> = ({ className }) => {
  return (
    <StyledWrapper className={className}>
      <div className="hero-copy">
        <div className="eyebrow">Developer Portfolio</div>
        <h1>{CONFIG.profile.name}</h1>
        <p className="role">{CONFIG.profile.role}</p>
        <p className="bio">{CONFIG.profile.bio}</p>
        <div className="actions">
          {CONFIG.profile.github && (
            <a
              href={`https://github.com/${CONFIG.profile.github}`}
              rel="noreferrer"
              target="_blank"
            >
              <AiOutlineGithub />
              GitHub
            </a>
          )}
          {CONFIG.profile.linkedin && (
            <a
              href={`https://www.linkedin.com/in/${CONFIG.profile.linkedin}`}
              rel="noreferrer"
              target="_blank"
            >
              <AiFillLinkedin />
              LinkedIn
            </a>
          )}
          {CONFIG.profile.email && (
            <a
              href={`mailto:${CONFIG.profile.email}`}
              rel="noreferrer"
              target="_blank"
            >
              <AiOutlineMail />
              Email
            </a>
          )}
        </div>
        <div className="stack" aria-label="Tech stack">
          {TECH_STACK.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className="hero-card">
        <div className="avatar">
          <Image
            src={CONFIG.profile.image}
            fill
            css={{ objectFit: "cover" }}
            alt="profile_image"
          />
        </div>
        <div>
          <div className="status">Available for thoughtful backend work</div>
          <div className="card-title">
            Writing about systems, products, and craft.
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default MobileProfileCard

const StyledWrapper = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(17rem, 0.75fr);
  gap: 2rem;
  padding: 2rem;
  border: 1px solid
    ${({ theme }) =>
      theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
  border-radius: 2rem;
  background:
    linear-gradient(
      135deg,
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(255, 255, 255, 0.92)" : "rgba(24, 24, 27, 0.92)"},
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(244, 247, 251, 0.76)" : "rgba(17, 24, 39, 0.82)"}
    );
  box-shadow:
    0 24px 70px ${({ theme }) => (theme.scheme === "light" ? "rgba(15, 23, 42, 0.08)" : "rgba(0, 0, 0, 0.28)")},
    inset 0 1px 0 rgba(255, 255, 255, 0.12);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.25rem;
    border-radius: 1.5rem;
  }

  .hero-copy {
    .eyebrow {
      width: fit-content;
      padding: 0.35rem 0.65rem;
      margin-bottom: 1rem;
      border: 1px solid
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(79, 70, 229, 0.18)" : "rgba(129, 140, 248, 0.24)"};
      border-radius: 999px;
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.indigo11};
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "rgba(238, 242, 255, 0.72)" : "rgba(49, 46, 129, 0.22)"};
    }

    h1 {
      max-width: 42rem;
      font-size: 3.5rem;
      line-height: 1.02;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.gray12};

      @media (max-width: 640px) {
        font-size: 2.35rem;
      }
    }

    .role {
      margin: 0.75rem 0 0;
      font-size: 1.125rem;
      line-height: 1.75rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray12};
      text-transform: capitalize;
    }

    .bio {
      max-width: 34rem;
      margin: 0.5rem 0 0;
      font-size: 1rem;
      line-height: 1.85rem;
      color: ${({ theme }) => theme.colors.gray11};
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      margin-top: 1.5rem;

      a {
        display: inline-flex;
        padding: 0.65rem 0.85rem;
        gap: 0.45rem;
        align-items: center;
        border: 1px solid
          ${({ theme }) =>
            theme.scheme === "light" ? "rgba(17, 24, 39, 0.1)" : "rgba(255, 255, 255, 0.1)"};
        border-radius: 999px;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) =>
          theme.scheme === "light" ? "rgba(255, 255, 255, 0.78)" : "rgba(39, 39, 42, 0.78)"};
        box-shadow: 0 8px 22px
          ${({ theme }) => (theme.scheme === "light" ? "rgba(15, 23, 42, 0.06)" : "rgba(0, 0, 0, 0.18)")};
        transition:
          transform 180ms ease,
          border-color 180ms ease,
          background-color 180ms ease;

        :hover {
          transform: translateY(-2px);
          border-color: ${({ theme }) =>
            theme.scheme === "light" ? "rgba(79, 70, 229, 0.28)" : "rgba(129, 140, 248, 0.34)"};
        }

        svg {
          font-size: 1.1rem;
        }
      }
    }

    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1.5rem;

      span {
        padding: 0.35rem 0.6rem;
        border: 1px solid
          ${({ theme }) =>
            theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.09)"};
        border-radius: 999px;
        font-size: 0.75rem;
        line-height: 1rem;
        color: ${({ theme }) => theme.colors.gray11};
        background-color: ${({ theme }) =>
          theme.scheme === "light" ? "rgba(249, 250, 251, 0.76)" : "rgba(24, 24, 27, 0.74)"};
      }
    }
  }

  .hero-card {
    display: flex;
    min-height: 100%;
    padding: 1rem;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 1.5rem;
    background:
      linear-gradient(
        180deg,
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(255, 255, 255, 0.82)" : "rgba(39, 39, 42, 0.76)"},
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(248, 250, 252, 0.74)" : "rgba(24, 24, 27, 0.86)"}
      );

    .avatar {
      overflow: hidden;
      position: relative;
      width: 100%;
      border-radius: 1.25rem;
      background-color: ${({ theme }) => theme.colors.gray4};
      aspect-ratio: 1;
    }

    .status {
      width: fit-content;
      margin-top: 1rem;
      padding: 0.35rem 0.6rem;
      border-radius: 999px;
      font-size: 0.75rem;
      line-height: 1rem;
      color: ${({ theme }) => theme.colors.green11};
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "rgba(220, 252, 231, 0.7)" : "rgba(20, 83, 45, 0.28)"};
    }

    .card-title {
      margin-top: 0.75rem;
      font-size: 1rem;
      line-height: 1.6rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`
