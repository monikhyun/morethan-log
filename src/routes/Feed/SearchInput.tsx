import styled from "@emotion/styled"
import React, { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <div className="top">Search notes</div>
      <input
        className="mid"
        type="text"
        placeholder="Search writing, tags, projects..."
        {...props}
      />
    </StyledWrapper>
  )
}

export default SearchInput

const StyledWrapper = styled.div`
  > .top {
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.indigo11};
    text-transform: uppercase;
  }

  > .mid {
    padding: 0.8rem 1rem;
    border: 1px solid
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 999px;
    outline-style: none;
    width: 100%;
    color: ${({ theme }) => theme.colors.gray12};
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "rgba(255, 255, 255, 0.78)" : "rgba(39, 39, 42, 0.72)"};
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease;

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray9};
    }

    :focus {
      border-color: ${({ theme }) =>
        theme.scheme === "light" ? "rgba(79, 70, 229, 0.28)" : "rgba(129, 140, 248, 0.34)"};
      box-shadow: 0 0 0 3px
        ${({ theme }) => (theme.scheme === "light" ? "rgba(79, 70, 229, 0.08)" : "rgba(129, 140, 248, 0.12)")};
    }
  }
`
