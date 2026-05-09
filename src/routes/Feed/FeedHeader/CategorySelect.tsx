import useDropdown from "src/hooks/useDropdown"
import { useRouter } from "next/router"
import React from "react"
import { MdExpandMore } from "react-icons/md"
import { DEFAULT_CATEGORY } from "src/constants"
import styled from "@emotion/styled"
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery"

type Props = {}

const CategorySelect: React.FC<Props> = () => {
  const router = useRouter()
  const data = useCategoriesQuery()
  const [dropdownRef, opened, handleOpen] = useDropdown()

  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY

  const handleOptionClick = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
      },
    })
  }
  return (
    <StyledWrapper>
      <div ref={dropdownRef} className="wrapper" onClick={handleOpen}>
        {currentCategory} Notes <MdExpandMore />
      </div>
      {opened && (
        <div className="content">
          {Object.keys(data).map((key, idx) => (
            <div
              className="item"
              key={idx}
              onClick={() => handleOptionClick(key)}
            >
              {`${key} (${data[key]})`}
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  )
}

export default CategorySelect

const StyledWrapper = styled.div`
  position: relative;

  > .wrapper {
    display: flex;
    padding: 0.8rem 0.95rem;
    gap: 0.4rem;
    align-items: center;
    border: 1px solid
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 999px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.gray12};
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "rgba(255, 255, 255, 0.78)" : "rgba(39, 39, 42, 0.72)"};
    cursor: pointer;
  }

  > .content {
    position: absolute;
    right: 0;
    z-index: 40;
    min-width: 11rem;
    padding: 0.35rem;
    margin-top: 0.5rem;
    border: 1px solid
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "rgba(255, 255, 255, 0.96)" : "rgba(24, 24, 27, 0.98)"};
    color: ${({ theme }) => theme.colors.gray10};
    box-shadow: 0 18px 44px
      ${({ theme }) => (theme.scheme === "light" ? "rgba(15, 23, 42, 0.12)" : "rgba(0, 0, 0, 0.34)")};

    > .item {
      padding: 0.55rem 0.7rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      white-space: nowrap;
      cursor: pointer;

      :hover {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) =>
          theme.scheme === "light" ? "rgba(243, 244, 246, 0.9)" : "rgba(39, 39, 42, 0.9)"};
      }
    }
  }
`
