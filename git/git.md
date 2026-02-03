# 🔁 GitHub ↔ Local 안전 동기화 가이드  
> **API Key 보호 + 포트폴리오용 실무 워크플로우**

---

## 📌 프로젝트 구조 예시

HONGPRO/
├ html/
├ python/
├ 러신머닝/
└ key/
├ key.env # API Key, 비밀 정보
└ .gitkeep


> `key/key.env`는 **GitHub에 절대 올라가면 안 되는 민감 정보**

---

## 1️⃣ GitHub → Local (원격으로 로컬 덮어쓰기)

> GitHub 저장소 상태를 **정답**으로 보고  
> 로컬 파일을 GitHub 상태로 강제 동기화

⚠️ 이 작업은 **로컬 파일을 전부 덮어쓴다**

```bash
git fetch origin
git reset --hard origin/main
git clean -fd
결과
Local = GitHub와 완전히 동일
2️⃣ Local → GitHub (로컬 작업을 원격에 반영)
작업한 내용을 GitHub에 업로드

git add .
git commit -m "update"
git push
3️⃣ 🔐 API Key를 보호하면서 GitHub ↔ Local 동기화
key/key.env는

GitHub에 올라가면 안 되고

로컬에서도 절대 삭제되면 안 됨

3-1. GitHub가 key.env를 추적하지 않게 설정
.gitignore에 추가:

key/key.env
이미 Git이 추적 중이라면:

git rm --cached key/key.env
git commit -m "Remove key.env from git tracking"
git push
파일은 로컬에 남고
GitHub에서만 제거됨

3-2. key 폴더를 보호한 채 GitHub → Local 덮어쓰기
move key ..\key_backup

git fetch origin
git reset --hard origin/main
git clean -fd

move ..\key_backup key