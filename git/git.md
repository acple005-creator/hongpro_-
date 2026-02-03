## 🔁 GitHub ↔ Local 안전 동기화 가이드

📌 프로젝트 구조 예시
```
HONGPRO/
├ html/
├ python/
├ 러신머닝/
└ key/
├ key.env # API Key, 비밀 정보
└ .gitkeep
```

local = githun 연동 (url) 가져오기
```
git init
git remote add origin 깃주소git
git remote -v
```
<br>
local > github 업로드
```
git add .
git commit -m "update"
git push
```
<br>
key 폴더를 보호한 채 GitHub > Local 덮어쓰기
```
git fetch origin
git reset --hard origin/main
git clean -fd

move ..\key_backup key
```
<br>
github > local 덮어쓰기 다른 모든파일 제거
```
git fetch origin
git reset --hard origin/main
git clean -fd
```
<br>
api 폴더를 보호하면서 local > github
```
git rm --cached key/key.env
git commit -m "Remove key.env from git tracking"
git push
```

