import { CONFIG } from "site.config"
import React from "react"
import { AiFillCodeSandboxCircle } from "react-icons/ai"
import styled from "@emotion/styled"

const ServiceCard: React.FC = () => {
  if (!CONFIG.projects) return null
  return (
    <StyledWrapper>
      <div className="title">Projects</div>
      <div className="list">
        {CONFIG.projects.map((project, idx) => (
          <a
            key={idx}
            href={`${project.href}`}
            rel="noreferrer"
            target="_blank"
          >
            <AiFillCodeSandboxCircle className="icon" />
            <div className="name">{project.name}</div>
          </a>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default ServiceCard

const StyledWrapper = styled.div`
  height: 100%;
  padding: 1rem;
  border: 1px solid
    ${({ theme }) =>
      theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
  border-radius: 1.35rem;
  background:
    linear-gradient(
      180deg,
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(255, 255, 255, 0.86)" : "rgba(31, 31, 35, 0.86)"},
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(249, 250, 251, 0.72)" : "rgba(20, 20, 23, 0.86)"}
    );
  box-shadow: 0 14px 34px
    ${({ theme }) => (theme.scheme === "light" ? "rgba(15, 23, 42, 0.05)" : "rgba(0, 0, 0, 0.2)")};

  .title {
    margin-bottom: 0.85rem;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.indigo11};
    text-transform: uppercase;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    > a {
      display: flex;
      padding: 0.75rem;
      gap: 0.75rem;
      align-items: center;
      border: 1px solid transparent;
      border-radius: 1rem;
      color: ${({ theme }) => theme.colors.gray11};
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "rgba(249, 250, 251, 0.7)" : "rgba(39, 39, 42, 0.58)"};
      cursor: pointer;
      transition:
        transform 180ms ease,
        border-color 180ms ease,
        color 180ms ease;

      :hover {
        transform: translateY(-2px);
        border-color: ${({ theme }) =>
          theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
        color: ${({ theme }) => theme.colors.gray12};
      }

      .icon {
        font-size: 1.35rem;
        line-height: 1.75rem;
        color: ${({ theme }) => theme.colors.indigo11};
      }

      .name {
        overflow: hidden;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`
