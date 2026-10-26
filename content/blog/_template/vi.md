---
title: Tiêu đề bài viết
date: 2026-11-01
summary: Một câu tóm tắt hiện trong danh sách bài viết.
tags: [nextjs, react]
draft: true
---

Cách thêm bài mới:

1. Copy thư mục `_template` thành `content/blog/<slug-bai-viet>` (không bắt đầu bằng `_`).
2. Sửa `vi.md` (và `en.md` nếu muốn có bản tiếng Anh).
3. Xoá dòng `draft: true` để bài hiện lên.

Nội dung viết bằng **Markdown**, hỗ trợ code block:

```ts
const hello = (name: string) => `Xin chào ${name}`;
```
