RECEIVEPOWER homepage text draft package

MANDATORY DOCUMENT NAMING RULE

- Every newly created review, walkthrough, handoff, work log, and generated task document must include its creation date and time in the filename.
- Required format: YYYY-MM-DD-HHMMSS-document-name.md
- Example: 2026-07-21-024654-homepage-text-consistency-walkthrough.md
- A date-only filename such as YYYY-MM-DD-document-name.md is not allowed for new task documents.
- When a source review and its walkthrough belong to the same task, use the same timestamp for both files.
- All Markdown and text documents must be saved as Korean UTF-8.

PUBLISHING PIPELINE

- Working source: E:\호작질\홈페이지
- Publish repository: E:\호작질\홈페이지_publish
- Copy only the verified final files from the working source to the publish repository.
- Commit and push the publish repository's main branch to GitHub.
- Vercel deploys automatically from the GitHub main branch.
- Do not use a separate direct Vercel upload path.

Open index.html first.
The same file is also available as homepage_static_draft.html.

Main navigation:
- product.html: Lambda product family
- technology.html: technology to economics translation
- business.html: lease + operation + SaaS business model
- market.html: roadless middle-mile market framing
- ip.html: patent/IP architecture framing
- ir.html: investor return logic
- visitor_vc.html / visitor_jp_government.html / visitor_kr_government.html / visitor_drone_company.html / visitor_individual.html: stakeholder-specific text paths

This package is a text-and-structure draft for homepage branding review.
