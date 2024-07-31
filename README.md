# CDX ARCHIVE(친구들과의 추억 저장소)

**사이트**: [CDX Archive]([http://cdxarchive.com](http://cdxarchive.com.s3-website.ap-northeast-2.amazonaws.com))

**개발 기간** : 23.11.28 ~

**개발 인원** : 1인

- FrontEnd: ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white)

- BackEnd: ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white)

- DB: ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

- Deployment: ![Amazon_S3](https://img.shields.io/badge/Amazon_S3-569A31?style=flat&logo=amazons3&logoColor=white) ![Amazon Route 53](https://img.shields.io/badge/Route_53-8C4FFF?style=flat&logo=amazonroute53&logoColor=white) 

---

**23.12.27**

* 원본 사진을 볼 수 있는 Modal 업데이트

**23.12.28**

* Modal 나가기 트리거를 버튼에서 화면 클릭으로 변경
* Gallery 상단 메뉴 바 업데이트
* 사진 업로드 용량 제한 10MB로 변경

**23.12.31**

* 사진 여러 개 업로드 가능하게 변경
* 사진 업로드 용량 제한 최대 50MB로 변경
* 사진 이름에 한글이 있을 경우 S3 삭제 안되던 버그 수정
* 업로드 페이지 로딩 화면 업데이트

**24.01.16**

* Axios를 그만 보내도 되는 경우, 백에서 isEnd를 false에서 true로 수정해 프론트로 보내주도록 변경

**24.03.27**

* 사진 업로드 드래그 앤 드롭으로도 가능하게 변경(사진 한번에 최대 6개, 용량 제한은 그대로)
