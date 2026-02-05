#📌 git 백업 (release) 생성
#
폴더 구조
```
HONGPRO/
├ html/ # 현재 개발 중인 최신 코드
├ python/
├ key/
│ └ key.env # API Key (Git 추적 제외)
```
GitHub에 버전 스냅샷 저장
```
git add releases/v1.2.0
git commit -m "release v1.2.0"
git push
```
이전 버전으로 롤백하기
```
xcopy releases\v1.1.0\html html /E /I /Y
xcopy releases\v1.1.0\python python /E /I /Y
```
배포할 버전을 바꿀 때:
Settings → Pages → Folder → 
```
/html   (개발 버전)
/releases/v1.2.0/html   (운영 버전)
```
