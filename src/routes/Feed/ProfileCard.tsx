import styled from "@emotion/styled"
import Image from "next/image"
import React from "react"
import { CONFIG } from "site.config"

type Props = {}

const ProfileCard: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <div className="content">
        <div className="top">Profile</div>
        <div className="avatar">
          <Image
            src={CONFIG.profile.image}
            fill
            css={{ objectFit: "cover" }}
            alt="profile_image"
          />
        </div>
        <div className="mid">
          <div className="name">{CONFIG.profile.name}</div>
          <div className="role">{CONFIG.profile.role}</div>
          <div className="bio">{CONFIG.profile.bio}</div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default ProfileCard

const StyledWrapper = styled.div`
  height: 100%;

  > .content {
    height: 100%;
    padding: 1rem;
    border: 1px solid
      ${({ theme }) =>
        theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 1.35rem;
    width: 100%;
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

    .top {
      margin-bottom: 0.85rem;
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.indigo11};
      text-transform: uppercase;
    }

    .avatar {
      overflow: hidden;
      position: relative;
      width: 4.5rem;
      height: 4.5rem;
      border: 1px solid
        ${({ theme }) =>
          theme.scheme === "light" ? "rgba(17, 24, 39, 0.08)" : "rgba(255, 255, 255, 0.1)"};
      border-radius: 1.25rem;
      background-color: ${({ theme }) => theme.colors.gray4};
    }

    .mid {
      display: flex;
      padding-top: 1rem;
      flex-direction: column;
      align-items: flex-start;

      .name {
        font-size: 1.15rem;
        line-height: 1.5rem;
        font-weight: 800;
        color: ${({ theme }) => theme.colors.gray12};
      }

      .role {
        margin-top: 0.2rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.gray11};
        text-transform: capitalize;
      }

      .bio {
        margin-top: 0.75rem;
        font-size: 0.875rem;
        line-height: 1.55rem;
        color: ${({ theme }) => theme.colors.gray11};
      }
    }
  }
`
