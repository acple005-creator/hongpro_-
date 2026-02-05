안녕하세요 홍승현입니다.

게임 유저의 **레벨 랭킹 / 생활 랭킹(낚시·벌목·채광·채집·보물찾기)** 을  
MariaDB에서 조회해 Nuxt 3 웹작동하는 포트폴리오 프로젝트입니다.

사용 기술 스택

Nuxt 3 / Vue 3 / TypeScript / css

Nitro Server API (h3)

MariaDB

mysql2/promise

#
폴더 구조입니다.
```
app/
  assets
    css/
      bg.webp
      index.css
      level.css
  pages/
    index.vue
    ranking/
      level.vue
      life.vue
server/
  utils/
    db.ts
  api/
    ranking/
      level.get.ts
      life.get.ts
```
#

<img width="924" height="430" alt="image" src="https://github.com/user-attachments/assets/09076e81-1b08-4f8c-85dc-ff9fe846bd03" />


MariaDB를 통해 랜덤데이터를 생성하여 api를 가져왔습니다.

```
server/
  utils/
    db.ts
  api/
    ranking/
      level.get.ts
      life.get.ts
``` 
<img width="426" height="371" alt="image" src="https://github.com/user-attachments/assets/a91f9d46-52b0-4bd1-bc5a-e661d382e5e7" />

#
#
.env는 보안을위해 따로 보관하게끔 설계하여 
이미지로 웹을 보여드리겠습니다.

index

<img width="610" height="287" alt="image" src="https://github.com/user-attachments/assets/729fedfe-a762-4207-bb9e-107ef9c58a0b" />

#
레벨 랭킹 시스템

<img width="471" height="911" alt="image" src="https://github.com/user-attachments/assets/3cec063d-4da0-4b3f-9eb7-0e6fd1cf5b64" />

#

생활랭킹 시스템

<img width="449" height="911" alt="image" src="https://github.com/user-attachments/assets/05ed5f2c-4b45-490f-a20f-eef635cda0a8" />
<img width="317" height="282" alt="image" src="https://github.com/user-attachments/assets/28c0cf65-4508-456a-b895-4df0cf57b642" />


