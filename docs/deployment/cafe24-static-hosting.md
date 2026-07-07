# Cafe24 서버호스팅 정적 배포 문서

## 결론

현재 Receivepower 홈페이지는 Cafe24 서버호스팅에 배포할 수 있는 정적 사이트다.

프레임워크 감지 결과:

- 저장소에는 `package.json`, `vite.config.ts`, `src/`가 있으므로 React/Vite 프로젝트 구조가 있다.
- 실제 공개 홈페이지는 React 앱 번들이 아니라 `docs/website/`의 정적 HTML/CSS/assets를 `dist/`로 복사해 만든다.
- Vercel은 `vercel.json` 기준으로 `npm run build:site`를 실행하고 `dist/`를 배포한다.
- Cafe24 서버호스팅도 같은 정적 산출물을 서버의 웹 루트에 배포하면 된다.

## Cafe24 서버호스팅 배포 기준

목표 도메인:

- `http://rcvpower.cafe24.com/`

최종 빌드 산출물:

- `dist/`

서버 배포 방식:

- SSH 접속
- GitHub Actions에서 정적 파일을 서버의 릴리스 폴더로 업로드
- 서버 안에서 릴리스 폴더 내용을 실제 웹 루트로 동기화

## 빌드 명령

```bash
npm ci
npm run build:cafe24
```

`build:cafe24`는 현재 `build:site`와 동일하다.

```bash
npm run build:site
```

## 경로 점검

현재 HTML은 대부분 상대경로를 사용한다.

예:

- `index.html`
- `assets/images/...`
- `subpage.css`
- `product.html`

따라서 웹 루트에 `dist/` 안의 파일과 폴더를 직접 배치하면 정상 동작한다.

단일 HTML 내부 화면 전환은 `/company` 같은 서버 라우팅이 아니라 `index.html?page=company` 형태의 쿼리 기반 전환이다. Cafe24 서버호스팅에서도 별도 라우팅 설정 없이 동작한다.

## GitHub Actions 자동 배포

추가된 워크플로우:

- `.github/workflows/deploy-cafe24.yml`

동작:

1. `main` 브랜치에 push
2. GitHub Actions 실행
3. 소스 프로젝트라면 `npm ci`와 `npm run build:cafe24` 실행
4. 정적 퍼블리시 저장소라면 현재 저장소 루트를 산출물로 사용
5. 산출물을 Cafe24 서버의 릴리스 폴더로 SCP 업로드
6. SSH로 서버에 접속해 릴리스 폴더를 실제 웹 루트로 동기화

Secrets가 아직 없으면 GitHub Actions는 빌드까지만 수행하고 Cafe24 서버 배포는 건너뛴다.

## GitHub Secrets 설정

GitHub 저장소에서 아래 경로로 이동한다.

```text
Repository → Settings → Secrets and variables → Actions → New repository secret
```

필수 Secrets:

```text
CAFE24_SSH_HOST
CAFE24_SSH_USER
CAFE24_SSH_KEY
CAFE24_WEB_ROOT
```

현재 도메인 기준으로 SSH 접속도 같은 주소에서 된다면 아래처럼 넣는다.

```text
CAFE24_SSH_HOST=rcvpower.cafe24.com
```

만약 Cafe24가 별도 SSH 접속 주소를 제공한다면, 도메인 대신 그 SSH 접속 주소를 넣는다.

선택 Secrets:

```text
CAFE24_SSH_PORT
CAFE24_RELEASE_DIR
```

권장값:

```text
CAFE24_SSH_PORT=22
CAFE24_RELEASE_DIR=~/receivepower-release
```

`CAFE24_WEB_ROOT`는 실제 도메인 `rcvpower.cafe24.com`이 바라보는 서버 폴더를 넣는다.

예시는 서버마다 다르다.

```text
/home/계정명/www
/home/계정명/public_html
/var/www/html
```

정확한 값은 Cafe24 서버호스팅 관리자 화면 또는 SSH 접속 후 웹서버 설정에서 확인해야 한다.

## SSH 키 처리

비밀번호를 Codex 채팅창이나 README에 쓰지 않는다.

권장 방식:

1. 배포 전용 SSH 키를 만든다.
2. 공개키는 Cafe24 서버의 `~/.ssh/authorized_keys`에 등록한다.
3. 개인키 전체 내용을 GitHub Secret `CAFE24_SSH_KEY`에 넣는다.

개인키는 코드, 문서, `.env`에 저장하지 않는다.

## 사람이 해야 할 Cafe24 설정

1. Cafe24 서버호스팅에서 SSH 접속 정보를 확인한다.
2. `rcvpower.cafe24.com`의 실제 웹 루트 경로를 확인한다.
3. 배포 전용 SSH 키를 만들고 공개키를 서버에 등록한다.
4. GitHub Actions Secrets에 `CAFE24_SSH_HOST`, `CAFE24_SSH_USER`, `CAFE24_SSH_KEY`, `CAFE24_WEB_ROOT`를 넣는다.
5. 필요하면 `CAFE24_SSH_PORT`, `CAFE24_RELEASE_DIR`도 넣는다.
6. `main` 브랜치에 커밋을 push한다.
7. GitHub Actions에서 `Deploy static site to Cafe24 server hosting`이 성공했는지 확인한다.
8. `http://rcvpower.cafe24.com/`에 접속해 HTML, CSS, 이미지가 정상 로드되는지 확인한다.

## 커밋하면 어디에 반영되는가

Secrets 설정이 끝난 뒤에는 다음 구조가 된다.

- GitHub: 커밋과 push 즉시 저장소에 반영
- Vercel: 기존 `vercel.json` 기준으로 정적 산출물을 자동 배포
- Cafe24: GitHub Actions가 SSH/SCP로 서버 웹 루트에 정적 산출물을 배포

즉, `main`에 push하면 GitHub, Vercel, Cafe24가 같은 정적 산출물 기준으로 갱신된다.

단, Cafe24는 SSH Secrets와 실제 웹 루트 경로가 정확히 설정되어 있어야 자동 반영된다.

## 현재 운영 폴더 기준

현재 운영에는 두 폴더가 있다.

- 작업 폴더: `E:\호작질\홈페이지`
- 퍼블리시 폴더: `E:\호작질\홈페이지_publish`

작업 폴더는 소스 프로젝트 구조다. 이 폴더에서는 `npm run build:cafe24`로 `dist/`를 만든다.

퍼블리시 폴더는 이미 만들어진 정적 파일만 담긴 구조다. 이 폴더에 워크플로우를 넣어도 빌드 단계 없이 루트 파일을 Cafe24 서버로 업로드하도록 처리했다.
