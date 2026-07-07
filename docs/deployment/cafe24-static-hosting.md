# Cafe24 일반 웹호스팅 정적 배포 문서

## 결론

현재 Receivepower 홈페이지는 Cafe24 일반 웹호스팅에 올릴 수 있는 정적 사이트 구조다.

프레임워크 감지 결과:

- `package.json`, `vite.config.ts`, `src/`가 있으므로 프로젝트 껍데기는 React/Vite다.
- 실제 공개 홈페이지 빌드는 React 번들이 아니라 `docs/website/`를 `dist/`로 복사하는 정적 HTML 빌드다.
- Vercel도 `vercel.json`에서 `npm run build:site`와 `dist`를 사용한다.
- Cafe24도 같은 `dist` 산출물을 `/www/` 루트에 업로드하면 된다.

## Cafe24 배포 기준

목표 서버:

- `http://rcvpower.cafe24.com/`

Cafe24 업로드 위치:

- `/www/`

최종 빌드 산출물:

- `dist/`

업로드해야 하는 내용:

- `dist/index.html`
- `dist/homepage_static_draft.html`
- `dist/en.html`
- `dist/ja.html`
- `dist/assets/`
- `dist/*.html`
- `dist/subpage.css`

`dist` 폴더 자체를 올리는 것이 아니라, `dist` 안의 파일과 폴더를 Cafe24의 `/www/` 안으로 올린다.

## 빌드 명령

```bash
npm ci
npm run build:cafe24
```

`build:cafe24`는 현재 `build:site`와 동일하게 동작한다.

```bash
npm run build:site
```

## 경로 점검

현재 HTML 파일은 대부분 상대경로를 사용한다.

예:

- `index.html`
- `assets/images/...`
- `subpage.css`
- `product.html`

따라서 Cafe24 `/www/` 루트에 배치하면 에셋 경로가 정상 동작한다.

단일 HTML 내부 화면 전환은 `/company` 같은 서버 라우팅이 아니라 `index.html?page=company` 형태의 쿼리 기반 전환이다. Cafe24 일반 웹호스팅에서도 별도 라우팅 설정 없이 동작한다.

## GitHub Actions 자동 배포

추가된 워크플로우:

- `.github/workflows/deploy-cafe24.yml`

동작:

1. `main` 브랜치에 push
2. GitHub Actions 실행
3. 저장소에 `package.json`과 `scripts/build-static-site.mjs`가 있으면 `npm ci`와 `npm run build:cafe24` 실행
4. 소스 프로젝트인 경우 `dist/` 내부 파일을 Cafe24 `/www/`로 FTP 업로드
5. 현재 퍼블리시 폴더처럼 이미 정적 산출물만 있는 저장소라면 저장소 루트의 HTML/CSS/assets를 Cafe24 `/www/`로 FTP 업로드

이 구조는 현재 작업 폴더와 퍼블리시 폴더 운영이 섞여 있어도 배포가 실패하지 않도록 하기 위한 안전장치다.

## GitHub Secrets 설정

GitHub 저장소에서 아래 경로로 이동한다.

```text
Repository → Settings → Secrets and variables → Actions → New repository secret
```

필수 Secrets:

```text
CAFE24_FTP_SERVER
CAFE24_FTP_USERNAME
CAFE24_FTP_PASSWORD
CAFE24_SERVER_DIR
```

권장 값:

```text
CAFE24_SERVER_DIR=/www/
```

Cafe24 FTP 서버 주소와 계정명은 Cafe24 관리자 화면의 FTP 정보에서 확인한다.

비밀번호는 Codex 채팅창, README, 코드, `.env` 파일에 직접 적지 않는다.

Secrets가 아직 없으면 GitHub Actions는 빌드까지만 수행하고 Cafe24 FTP 업로드는 건너뛴다. 따라서 워크플로우를 먼저 커밋해도 배포 실패로 깨지지 않는다.

## 사람이 해야 할 Cafe24 설정

1. Cafe24 일반 웹호스팅 관리 화면에서 FTP 접속 정보를 확인한다.
2. 웹 루트가 `/www/`인지 확인한다.
3. GitHub 저장소 Secrets에 FTP 정보를 등록한다.
4. `CAFE24_SERVER_DIR`는 우선 `/www/`로 둔다.
5. GitHub `main` 브랜치에 커밋을 push한다.
6. GitHub Actions에서 `Deploy static site to Cafe24`가 성공했는지 확인한다.
7. `http://rcvpower.cafe24.com/`에 접속해 `index.html`, 이미지, CSS가 정상 로드되는지 확인한다.

## 수동 업로드 절차

GitHub Actions를 쓰지 않고 직접 올릴 때:

1. 로컬에서 `npm run build:cafe24` 실행
2. FTP 프로그램으로 Cafe24 접속
3. `dist/` 안의 파일과 폴더를 모두 선택
4. Cafe24 `/www/` 안으로 업로드
5. 기존 파일 덮어쓰기

## 커밋하면 어디에 반영되는가

Secrets 설정이 끝난 뒤에는 다음 구조가 된다.

- GitHub: 커밋과 push 즉시 저장소에 반영
- Vercel: 기존 `vercel.json` 기준으로 `dist/`를 자동 배포
- Cafe24: 추가된 GitHub Actions가 `dist/`를 FTP로 `/www/`에 업로드

즉, `main`에 push하면 GitHub, Vercel, Cafe24가 같은 정적 산출물 기준으로 갱신된다.

단, Cafe24는 GitHub Secrets가 정확히 설정되어 있어야 자동 반영된다.

## 현재 운영 폴더 기준

현재 운영에는 두 폴더가 있다.

- 작업 폴더: `E:\호작질\홈페이지`
- 퍼블리시 폴더: `E:\호작질\홈페이지_publish`

작업 폴더는 소스 프로젝트 구조다. 이 폴더에서는 `npm run build:cafe24`로 `dist/`를 만든다.

퍼블리시 폴더는 이미 만들어진 정적 파일만 담긴 구조다. 이 폴더에 워크플로우를 넣어도 빌드 단계 없이 루트 파일을 Cafe24 `/www/`로 업로드하도록 처리했다.

Vercel이 현재 퍼블리시 폴더 기준 저장소를 보고 있다면, Cafe24 자동배포 워크플로우도 퍼블리시 폴더에 들어가야 실제 운영 배포와 연결된다.
