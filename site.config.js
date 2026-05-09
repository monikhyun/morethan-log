const CONFIG = {
  // profile setting (required)
  profile: {
    name: "IkHyun",
    image: "/my-profile.jpeg", // 노션 프로필 이미지를 쓰시려면 노션에서 이미지 주소를 복사해 넣거나, public 폴더에 저장 후 경로를 수정해야 합니다.
    role: "Backend Developer",
    bio: "문익현의 개발 일기",
    email: "mih2001103@naver.com", // 필요시 실제 이메일로 수정하세요.
    linkedin: "monikhyun0813", // 링크드인 ID가 같다면 유지, 아니라면 수정 필요
    github: "monikhyun",
    instagram: "",
  },
  projects: [
    {
      name: `TRIBE`,
      href: "https://github.com/monikhyun/tribe-api",
    },
    {
      name: `MEETNY`,
      href: "https://github.com/monikhyun/Meetny-Backend",
    },
  ],
  // blog setting (required)
  blog: {
    title: "IkHyun-log",
    description: "개발 공부 일기장",
    scheme: "system", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "https://monikhyun.space", // 실제 배포될 URL
  since: 2026, 
  lang: "ko-KR", 
  ogImageGenerateURL: "https://og-image-korean.vercel.app", 

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: "monikhyun/morethan-log", // 댓글이 저장될 본인의 GitHub 레포지토리 주소
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", 
    },
  },
  isProd: process.env.VERCEL_ENV === "production", 
  revalidateTime: 60, 
}

module.exports = { CONFIG }
