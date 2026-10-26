import type { L } from "@/lib/i18n";

/**
 * All portfolio content lives here. Edit this file to update the site —
 * every user-facing string has a `vi` and an `en` version.
 */

export const profile = {
  name: "Trần Tuấn Anh",
  handle: "tuananh",
  role: { vi: "Software Engineer", en: "Software Engineer" } satisfies L,
  stackLine: "Web · Mobile · Front-end · Back-end",
  location: { vi: "Huế, Việt Nam", en: "Hue, Vietnam" } satisfies L,
  avatar: "/avatar.png",
  cv: "/cv/Tran-Tuan-Anh-CV.pdf",
  githubUser: "TuanAnh164",
  tagline: {
    vi: "Mình xây sản phẩm web và mobile từ giao diện đến API — gọn, rõ ràng và chạy được thật.",
    en: "I build web and mobile products end to end, from the interface to the API — clean, clear and actually shipped.",
  } satisfies L,
  about: [
    {
      vi: "Mình là sinh viên Kỹ thuật Phần mềm tại Đại học FPT Đà Nẵng. Mình thích làm việc ở cả hai phía của một sản phẩm: dựng giao diện bằng React / Next.js và viết API với Node.js, MongoDB, MySQL.",
      en: "I'm a Software Engineering student at FPT University Da Nang. I like working on both sides of a product: building interfaces with React / Next.js and writing APIs with Node.js, MongoDB and MySQL.",
    },
    {
      vi: "Gần đây mình dành nhiều thời gian cho FlintFlow — một nền tảng AI Business Analyst — nơi mình làm từ luồng import tài liệu SRS, dịch tài liệu đa ngôn ngữ đến tích hợp mô hình AI ở backend.",
      en: "Lately most of my time has gone into FlintFlow, an AI Business Analyst platform, where I worked on everything from SRS document import and multilingual translation to AI model integration on the backend.",
    },
    {
      vi: "Mình quan tâm đến code dễ đọc, giao diện nhất quán và làm việc nhóm có quy trình rõ ràng (Git flow, Jira, code review).",
      en: "I care about readable code, consistent UI and teamwork with a clear process (Git flow, Jira, code review).",
    },
  ] satisfies L[],
  contact: {
    email: "xmy283480@gmail.com",
    phone: "0333241182",
    phoneDisplay: "033-324-1182",
    facebook: "https://www.facebook.com/tran.tuananh.615673",
    github: "https://github.com/TuanAnh164",
  },
};

export type SkillGroup = { title: L; items: string[] };

/** Self-assessed level shared by every group. */
export const skillLevel: L = { vi: "Khá", en: "Intermediate" };

export const skills: SkillGroup[] = [
  { title: { vi: "Ngôn ngữ", en: "Languages" }, items: ["JavaScript", "TypeScript", "Dart", "HTML", "CSS"] },
  {
    title: { vi: "Front-end", en: "Front-end" },
    items: ["React", "Next.js", "Redux Toolkit", "React Hook Form", "Zod"],
  },
  { title: { vi: "UI / UX", en: "UI / UX" }, items: ["Tailwind CSS", "shadcn/ui", "Radix UI", "Figma"] },
  {
    title: { vi: "Back-end", en: "Back-end" },
    items: ["Node.js", "Express", "NestJS", "REST API", "JWT Auth", "Socket.io"],
  },
  { title: { vi: "Cơ sở dữ liệu", en: "Databases" }, items: ["MongoDB", "Mongoose", "MySQL"] },
  { title: { vi: "Mobile", en: "Mobile" }, items: ["React Native", "Expo", "NativeWind", "Flutter"] },
  { title: { vi: "Công cụ", en: "Tools" }, items: ["Git", "GitHub", "Jira", "Vitest"] },
];

export type TimelineItem = {
  period: string | L;
  org: string;
  title: L;
  points: L[];
};

export const experience: TimelineItem[] = [
  {
    period: "09/2025 — 12/2025",
    org: "FPT Software",
    title: { vi: "Software Engineering Intern (Front-end)", en: "Software Engineering Intern (Front-end)" },
    points: [
      {
        vi: "Phát triển các màn hình giao diện cho ứng dụng web quản lý kho bằng CRS và Biz Designer.",
        en: "Built user interface screens for a warehouse management web application using CRS and Biz Designer.",
      },
      {
        vi: "Làm nhiều tính năng nghiệp vụ kho và đảm bảo tính nhất quán giữa các màn hình.",
        en: "Worked on various warehouse management features and kept screens consistent across the application.",
      },
      {
        vi: "Phối hợp với team để nắm yêu cầu, hoàn thành task được giao và xử lý các lỗi giao diện.",
        en: "Collaborated with the team to understand requirements, deliver assigned tasks and resolve UI issues.",
      },
    ],
  },
];

export const education: TimelineItem[] = [
  {
    period: { vi: "2022 — nay", en: "2022 — present" },
    org: "FPT University Da Nang",
    title: { vi: "Kỹ thuật Phần mềm", en: "Software Engineering" },
    points: [],
  },
];

export type Project = {
  name: string;
  period: string;
  role: L;
  summary: L;
  highlights: L[];
  stack: string[];
  image?: string;
  /** Shown centered when there is no screenshot. */
  logo?: string;
  links: { label: string; href: string }[];
  meta?: L;
};

export const projects: Project[] = [
  {
    name: "FlintFlow",
    period: "2026",
    role: { vi: "Software Developer · Đồ án tốt nghiệp", en: "Software Developer · Capstone project" },
    summary: {
      vi: "Nền tảng AI Business Analyst: dẫn người dùng từ một ý tưởng mơ hồ đến tài liệu đặc tả phần mềm (SRS) hoàn chỉnh qua 12 giai đoạn, có cổng duyệt từng bước và xuất Word theo mẫu FPT.",
      en: "An AI Business Analyst platform that takes users from a vague idea to a complete Software Requirements Specification (SRS) over 12 guided phases, with a review gate on every step and Word export in the FPT template.",
    },
    highlights: [
      {
        vi: "Import SRS có sẵn (.docx) — map mẫu FPT / IEEE, tách nội dung theo heading và sinh gap report.",
        en: "Existing SRS import (.docx) — FPT / IEEE template mapping, heading-based content splitting and gap reports.",
      },
      {
        vi: "Tài liệu theo ngôn ngữ dự án: bản dịch overlay trên dữ liệu gốc, dịch cả nhãn trên sơ đồ PlantUML.",
        en: "Project-language documents: translation overlays on the source data, including labels on PlantUML diagrams.",
      },
      {
        vi: "Change request, render .docx và phân quyền baseline / release theo vai trò.",
        en: "Change requests, .docx rendering and role-based baseline / release permissions.",
      },
      {
        vi: "Tích hợp nhà cung cấp AI Anthropic (Claude) qua Vercel AI SDK ở backend.",
        en: "Integrated the Anthropic (Claude) AI provider through the Vercel AI SDK on the backend.",
      },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Express 5", "MongoDB", "Vercel AI SDK", "PlantUML", "Vitest"],
    image: "/projects/flintflow-home.png",
    links: [{ label: "flintflow.io.vn", href: "https://www.flintflow.io.vn/" }],
    meta: { vi: "Nhóm 5 người · ~355 commit của mình", en: "Team of 5 · ~355 of my commits" },
  },
  {
    name: "MergeTrack",
    period: "06/2026 — 08/2026",
    role: { vi: "Front-end · Static rules · Đồ án WDP301", en: "Front-end · Static rules · WDP301 project" },
    summary: {
      vi: "SaaS phát hiện code smell trong pull request React / Next.js / Express: kết hợp luật tĩnh trên AST với luật tuỳ chỉnh do LLM chấm điểm, chạy dưới dạng GitHub Action hoặc dashboard kết nối qua GitHub App.",
      en: "A SaaS that detects code smells in React / Next.js / Express pull requests, combining AST static rules with LLM-scored custom rules. It runs as a GitHub Action or as a dashboard connected through a GitHub App.",
    },
    highlights: [
      {
        vi: "Xây giao diện dashboard với Next.js 16, Tailwind 4, Radix UI, bảng TanStack Table và biểu đồ Recharts.",
        en: "Built the dashboard UI with Next.js 16, Tailwind 4, Radix UI, TanStack Table and Recharts charts.",
      },
      {
        vi: "Viết bộ rule tĩnh trên AST cho React: component quá dài, quá nhiều props / state, JSX lồng sâu, lạm dụng hàm inline, component ôm nhiều trách nhiệm.",
        en: "Wrote the AST static rules for React: oversized components, too many props / states, deeply nested JSX, inline-function overuse and mixed-responsibility components.",
      },
      {
        vi: "Tự xây bộ dataset gắn nhãn (50 file, 10 kịch bản PR) để đo precision / recall của bộ phát hiện.",
        en: "Built a labelled dataset (50 files, 10 PR scenarios) to measure the detector's precision / recall.",
      },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Radix UI", "TanStack Table", "typescript-estree", "Vitest"],
    logo: "/projects/mergetrack-logo.png",
    links: [],
    meta: { vi: "Nhóm 3 người · monorepo", en: "Team of 3 · monorepo" },
  },
  {
    name: "Vistory",
    period: "05/2026 — 07/2026",
    role: { vi: "Software Developer · Đồ án EXE", en: "Software Developer · EXE project" },
    summary: {
      vi: "Nền tảng web học lịch sử Việt Nam theo kiểu “chơi mà học”: bài học ngắn theo từng giai đoạn, dòng thời gian trực quan, minigame và quiz.",
      en: "A web platform for learning Vietnamese history through play: short lessons by historical period, an interactive timeline, minigames and quizzes.",
    },
    highlights: [
      {
        vi: "Làm phần lớn các feature front-end (React 19 + Vite), router, trang và dark mode.",
        en: "Built most front-end features (React 19 + Vite), routing, pages and dark mode.",
      },
      {
        vi: "Viết model, service, route và controller ở back-end Express + MongoDB.",
        en: "Wrote models, services, routes and controllers on the Express + MongoDB back-end.",
      },
      {
        vi: "Tính năng realtime với Socket.io, ảnh lưu trên Cloudinary.",
        en: "Realtime features with Socket.io, images stored on Cloudinary.",
      },
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind", "Express", "MongoDB", "Socket.io"],
    image: "/projects/vistory.png",
    links: [
      { label: "Demo", href: "https://vistory-xi.vercel.app" },
      { label: "GitHub", href: "https://github.com/Binh1211/EXE_Project" },
    ],
    meta: { vi: "63 commit — nhiều nhất nhóm", en: "63 commits — most on the team" },
  },
  {
    name: "HabitFlow",
    period: "2026",
    role: { vi: "Cá nhân · Đồ án MMA", en: "Solo · MMA project" },
    summary: {
      vi: "Ứng dụng mobile xây thói quen với AI coach: theo dõi thói quen hằng ngày, thống kê, lịch heatmap, gamification (XP, level, huy hiệu) và nhắc nhở thông minh.",
      en: "A mobile habit-building app with an AI coach: daily habit tracking, statistics, a heatmap calendar, gamification (XP, levels, badges) and smart reminders.",
    },
    highlights: [
      {
        vi: "App Expo + React Native: Expo Router, NativeWind, React Query, Zustand, animation với Reanimated / Lottie.",
        en: "Expo + React Native app: Expo Router, NativeWind, React Query, Zustand, animations with Reanimated / Lottie.",
      },
      {
        vi: "Đăng nhập Google, onboarding 4 bước, chat với AI coach và push notification.",
        en: "Google sign-in, 4-step onboarding, AI coach chat and push notifications.",
      },
      {
        vi: "Back-end NestJS + MongoDB (11 module, JWT / Passport, cron job, Swagger), gợi ý thói quen bằng OpenAI có cache 24 giờ.",
        en: "NestJS + MongoDB back-end (11 modules, JWT / Passport, cron jobs, Swagger), OpenAI habit suggestions with a 24-hour cache.",
      },
    ],
    stack: ["React Native", "Expo", "TypeScript", "NativeWind", "React Query", "Zustand", "NestJS", "MongoDB", "OpenAI"],
    logo: "/projects/habitflow-flo.png",
    links: [],
    meta: { vi: "Tự làm toàn bộ: app mobile + back-end", en: "Built solo: mobile app + back-end" },
  },
  {
    name: "KUL Local",
    period: "05/2025 — 08/2025",
    role: { vi: "Front-end Developer · Đồ án SWP", en: "Front-end Developer · SWP project" },
    summary: {
      vi: "Hệ thống quản lý trung tâm học tập theo vai trò: lớp, phòng, ca học, lịch dạy, điểm danh, bài tập, quiz và đăng ký học viên.",
      en: "A role-based learning center management system: classes, rooms, slots, teaching schedules, attendance, assignments, quizzes and student registration.",
    },
    highlights: [
      {
        vi: "Phụ trách module giáo viên: lịch dạy theo coach, điểm danh, giao bài tập và chấm điểm.",
        en: "Owned the teacher module: coach schedules, attendance, assignment tasks and grading.",
      },
      {
        vi: "Bảng dữ liệu với TanStack Table, form với React Hook Form + Zod, state bằng Redux Toolkit, xác thực Clerk.",
        en: "Data tables with TanStack Table, forms with React Hook Form + Zod, Redux Toolkit state, Clerk auth.",
      },
    ],
    stack: ["React", "TypeScript", "Vite", "Redux Toolkit", "Tailwind", "shadcn/ui", "Clerk"],
    logo: "/projects/kul-logo.png",
    links: [{ label: "GitHub", href: "https://github.com/LeDucAnhPhuong/kul-local-front-end" }],
    meta: { vi: "Nhóm 6 người · 28 commit — nhiều nhất nhóm", en: "Team of 6 · 28 commits — most on the team" },
  },
  {
    name: "Bike Shop",
    period: "2025",
    role: { vi: "Cá nhân · Assignment FER202", en: "Solo · FER202 assignment" },
    summary: {
      vi: "Web bán xe đạp: danh sách & chi tiết sản phẩm, giỏ hàng, thanh toán, yêu thích, tài khoản và trang quản trị sản phẩm / người dùng.",
      en: "A bicycle shop SPA: product list & detail, cart, checkout, favourites, accounts and admin pages for products / users.",
    },
    highlights: [
      {
        vi: "Quản lý state bằng Context + reducer, API giả lập với json-server.",
        en: "State managed with Context + reducers, mocked API with json-server.",
      },
    ],
    stack: ["React 19", "React Router", "Bootstrap 5", "Axios", "json-server"],
    links: [{ label: "GitHub", href: "https://github.com/TuanAnh164/FER_202" }],
  },
];

export type UsesGroup = { title: L; items: { name: string; note: L }[] };

/** "Uses" page — edit freely to match your real setup. */
export const learning: { name: string; note: L }[] = [
  {
    name: "AI SDK & LLM",
    note: {
      vi: "Tích hợp mô hình ngôn ngữ vào sản phẩm: streaming, structured output, quản lý chi phí token.",
      en: "Bringing language models into products: streaming, structured output, token cost control.",
    },
  },
  {
    name: "Next.js 16",
    note: {
      vi: "App Router, Server Components và i18n — trang web này là bài thực hành.",
      en: "App Router, Server Components and i18n — this site is the practice project.",
    },
  },
  {
    name: "React Native",
    note: { vi: "Đưa kỹ năng React sang ứng dụng mobile.", en: "Taking React skills to mobile apps." },
  },
];

export const uses: UsesGroup[] = [
  {
    title: { vi: "Phát triển", en: "Development" },
    items: [
      { name: "Git & GitHub", note: { vi: "Quản lý mã nguồn, pull request, code review.", en: "Version control, pull requests, code review." } },
      { name: "Vitest · Playwright", note: { vi: "Unit, integration và E2E test.", en: "Unit, integration and E2E tests." } },
    ],
  },
  {
    title: { vi: "Thiết kế & làm việc nhóm", en: "Design & teamwork" },
    items: [
      { name: "Figma", note: { vi: "Đọc và dựng giao diện từ thiết kế.", en: "Reading and building UI from designs." } },
      { name: "Jira", note: { vi: "Theo dõi task, nhánh và commit gắn mã ticket.", en: "Task tracking, branches and commits tied to ticket keys." } },
    ],
  },
  {
    title: { vi: "Hạ tầng", en: "Infrastructure" },
    items: [
      { name: "Vercel", note: { vi: "Deploy front-end Next.js / Vite.", en: "Deploying Next.js / Vite front-ends." } },
      { name: "MongoDB Atlas · Cloudinary", note: { vi: "Cơ sở dữ liệu và lưu trữ ảnh.", en: "Database and image storage." } },
    ],
  },
];
