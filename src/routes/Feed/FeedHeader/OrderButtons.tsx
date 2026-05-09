import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type TOrder = "asc" | "desc"

type Props = {}

const OrderButtons: React.FC<Props> = () => {
  const router = useRouter()

  const currentOrder = `${router.query.order || ``}` || ("desc" as TOrder)

  const handleClickOrderBy = (value: TOrder) => {
    router.push({
      query: {
        ...router.query,
        order: value,
      },
    })
  }
  return (
    <StyledWrapper>
      <a
        data-active={currentOrder === "desc"}
        onClick={() => handleClickOrderBy("desc")}
      >
        Desc
      </a>
      <a
        data-active={currentOrder === "asc"}
        onClick={() => handleClickOrderBy("asc")}
      >
        Asc
      </a>
    </StyledWrapper>
  )
}

export default OrderButtons

const StyledWrapper = styled.div`
  display: flex;
  padding: 0.25rem;
  gap: 0.25rem;
  border: 1px solid
    ${({ theme }) =>
      theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
  border-radius: 999px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "rgba(255, 255, 255, 0.62)" : "rgba(39, 39, 42, 0.62)"};

  a {
    padding: 0.55rem 0.75rem;
    border-radius: 999px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray10};
    transition:
      color 180ms ease,
      background-color 180ms ease;

    &[data-active="true"] {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "rgba(243, 244, 246, 0.95)" : "rgba(63, 63, 70, 0.82)"};
    }
  }
`
