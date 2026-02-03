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


로컬 파일을 전부 git파일로 덮어쓴다 중요파일 또한 삭제**
```
git fetch origin
git reset --hard origin/main
git clean -fd
```

로컬에서 작업한 내용을 GitHub에 업로드
```
git add .
git commit -m "update"
git push
```

api폴더를 보호하면서 GitHub ↔ Local 동기화
api 폴더는 제외하고 커밋하여 git에 등록
```
git rm --cached key/key.env
git commit -m "Remove key.env from git tracking"
git push
```

key 폴더를 보호한 채 GitHub → Local 덮어쓰기
move key ..\key_backup
```
git fetch origin
git reset --hard origin/main
git clean -fd

move ..\key_backup key
```
