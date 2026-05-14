# n8n Taiwan Open Hackathon — 網站 MVP

## 如何打開網站

### 方法一：直接雙擊 index.html（最快）

```
1. 打開檔案總管，進入 website/ 資料夾
2. 雙擊 index.html
3. 瀏覽器自動打開
```

### 方法二：用 VS Code Live Server 擴充套件（推薦）

```
1. VS Code 安裝擴充套件「Live Server」
2. 右鍵點擊 index.html → Open with Live Server
3. 瀏覽器自動打開，修改檔案時自動重載
```

### 方法三：Python 簡易伺服器（進階）

```bash
cd website
python -m http.server 8000
# 打開瀏覽器訪問 http://localhost:8000
```

---

## 檔案結構

```
website/
├── index.html    主頁面
├── styles.css    所有樣式
├── script.js     互動功能
└── README.md     本說明
```

網站會引用上層資料夾的圖片：
```
../網站所需資料/
  ├── Morris CEO形象照/
  ├── 虎智科技TigerAI_LOGO/
  ├── 博碩文化LOGO/
  ├── AMD LOGO/
  ├── 撼訊科技LOGO/
  ├── n8n LOGO/
  └── zeabur logo pack/
```

---

## 網站包含的區塊

1. **Navigation** — 固定置頂，捲動時加陰影
2. **Hero** — 大標 + n8n workflow 節點示意圖 + 倒數計時器
3. **About** — 四大參賽亮點
4. **Funnel** — 三階段流程（前哨站 → 認證講座 → 決賽）
5. **Themes** — 四大題目類別
6. **Community** — Morris 介紹 + 社群數據（計數動畫）
7. **Prizes** — 三階獎項（總冠軍 AMD 顯卡、亞季軍 Zeabur 點數）
8. **Judges** — 三位評審 + 1 個預留位
9. **Evaluation** — 五維評審標準（進度條動畫）
10. **Sponsors** — 四級合作夥伴 Logo 牆
11. **FAQ** — 12 題折疊式手風琴
12. **Final CTA** — 滿版粉橘漸層
13. **Footer** — 四欄資訊 + 電子報訂閱

---

## 已實作的互動

- ✅ 響應式佈局（桌面 / 平板 / 手機）
- ✅ 固定導覽列 + 捲動效果
- ✅ 手機漢堡選單
- ✅ 即時倒數計時器（目標 2026/06/05）
- ✅ FAQ 手風琴展開收合
- ✅ 捲動時區塊淡入動畫
- ✅ 社群數據計數動畫
- ✅ 評審標準長條圖動畫
- ✅ 目前區塊導覽列高亮
- ✅ 平滑錨點捲動

---

## 已知待補項目

- ⬜ 評審 Leo、Joseph 實際照片（目前用 placeholder）
- ⬜ Morris 第二張照片（Judges 區用 _2.png，需確認存在）
- ⬜ 報名表單連結（所有「立即報名」按鈕目前指向 `#register` 錨點）
- ⬜ Email 訂閱後端串接（目前只是示範 alert）
- ⬜ 網站 Favicon
- ⬜ OpenGraph 分享圖（OG image）

---

## 修改建議

### 改文字
直接編輯 `index.html`。

### 改顏色
編輯 `styles.css` 最上方的 `:root` 變數區塊。所有顏色都用 CSS 變數，改一處全站同步。

### 改倒數目標日期
編輯 `script.js` 找到這行：
```js
const targetDate = new Date('2026-06-05T10:00:00+08:00').getTime();
```

### 改報名連結
在 `index.html` 中搜尋 `#register`，替換為實際的 Google Form 網址。

### 評審照片規格（重要規則）

新增或更換評審照片時，**一律統一為「半身照」**：

- **構圖**：頭頂（含少量留白）到胸口／腰部之間，臉部要明顯、佔比足夠。
- **太遠的照片要裁切**：若原圖是全身照或 3/4 身照，必須裁切（crop）拉近成半身，讓所有評審的臉部大小一致。不要直接把全身照塞進卡片。
- **比例**：輸出 4:5 直幅（卡片 `.judge-photo` 是 `aspect-ratio: 4/5`），建議尺寸 640×800。
- **格式**：存成 `.jpg`，檔案大小控制在 60KB 以內（用 ffmpeg `-q:v 3`）。
- **檔名**：英文小寫，與評審英文名一致，例：`joseph.jpg`、`jason.jpg`。
- **裁切工具**：`ffmpeg -i 原圖 -vf "crop=寬:高:x:y,scale=640:800" -q:v 3 輸出.jpg`

> 原始照片放在 `../網站所需資料/評審委員照片/`，處理後的成品放在 `website/assets/photos/`。

---

## 發布到網路

若要讓外部可訪問，可選：

| 服務 | 優點 | 上手難度 |
|---|---|---|
| **Cloudflare Pages** | 免費、CDN 快、自訂網域 | 低 |
| **Vercel** | 免費、整合好 | 低 |
| **Netlify** | 免費、拖拉上傳 | 最低 |
| **GitHub Pages** | 免費 | 需會用 Git |

**最快的方法**：把 `website/` 資料夾 + `網站所需資料/` 資料夾拖進 Netlify Drop（netlify.com/drop），1 分鐘就有線上網址。
