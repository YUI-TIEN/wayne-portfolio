import type { DesignCopy } from './design.types'

export const zhTw: DesignCopy = {
  eyebrow: '設計作品 2021 — 2025',
  heading: '進 AI 之前，我在做品牌與視覺。',
  intro:
    '大學在北科讀資訊與財金，同時包下系學會幾乎所有活動的視覺。這裡收的是那幾年的活動識別系統與海報——後來做 UI/UX、再到把 AI 部署進客戶現場，起點都在這裡：先弄清楚誰會看、要讓他一眼看懂什麼。',
  identitiesLabel: '活動識別',
  identities: [
    {
      n: '01',
      kind: '活動識別系統',
      title: '北科資財營「愚者」',
      role: '營隊負責人兼美宣設計',
      concept:
        '營隊名稱取自塔羅牌「愚者」。主視覺裡向陽的太陽、純潔的蓮花、似愚非愚的小丑形象，都是在講愚者這張牌的意涵；「愚者」標準字的線條和主視覺元素互相呼應，再加上襯線讓字更俐落。',
      notes: [
        { label: '雙版本', text: '深色版走全黑金線；淺色版只讓標題字和象徵光明的烈陽跳色，畫面才有輕重之分。' },
        { label: '營服配色', text: '學員穿珊瑚藍、工作人員穿淺藻綠，現場一眼就分得出身分；藍綠兩色取自資財系平常的用色，同時延續系上品牌色。' },
        { label: '延伸物', text: '同一套元素延伸成貼紙、徽章、杯套等紀念品；各小隊貼紙依營隊故事對應不同塔羅牌，例如皇帝、魔術師、祭司。' },
      ],
      hero: { id: 'fool-board', alt: '「愚者」營隊主視覺放在黑色看板中：金色線條構成的太陽、蓮花與星月圖騰', caption: '主視覺看板' },
      detail: { id: 'fool-icons', alt: '依塔羅牌面手繪的小隊圖樣，以及系名與「愚者」的標章', caption: '小隊圖樣與標章' },
      items: [
        { id: 'fool-posters', alt: '牆上並排的「愚者」深色版與淺色版海報', caption: '深色版／淺色版海報' },
        { id: 'fool-tee-staff', alt: '淺藻綠色工作人員營服，胸前與背面印有金線圖騰', caption: '工作人員營服（淺藻綠）' },
        { id: 'fool-tee-camper', alt: '珊瑚藍色學員營服，背面印有完整主視覺', caption: '學員營服（珊瑚藍）' },
        { id: 'fool-stickers', alt: '四張黑底小隊貼紙，分別是女祭司、皇帝、隱者與魔術師的圖樣', caption: '小隊貼紙' },
        { id: 'fool-badges', alt: '印有「愚者 THE FOOL」標準字的徽章', caption: '徽章' },
        { id: 'fool-sleeve', alt: '套著「愚者」標準字杯套的外帶杯', caption: '杯套' },
      ],
    },
    {
      n: '02',
      kind: '活動識別系統',
      title: '三系聯合宿營',
      role: '主視覺與周邊設計',
      concept:
        '活動故事設定在中世紀，所以主視覺做成一面紋章：先手繪，再用 Photoshop 處理細節，最後刻意加上仿舊材質，讓它看起來像真的從那個年代留下來的東西。',
      notes: [
        { label: '營服', text: '正面放活動名稱的 LOGO，背面是主視覺紋章的變形版，延續整體風格。' },
        { label: '名牌', text: '結合奇幻與中世紀文學，用像素風格做了工作人員與學員兩套名牌，各有六種配色。' },
      ],
      hero: { id: 'camp-crest', alt: '手繪中世紀紋章主視覺，騎士頭盔、獨角獸與三系縮寫的緞帶，帶仿舊質感', caption: '手繪紋章主視覺' },
      items: [
        { id: 'camp-tee', alt: '深藍色營服，正面印活動名稱標準字、背面印金色紋章', caption: '營服' },
        { id: 'camp-tags-staff', alt: '六種配色的像素風工作人員名牌：月夜下的沙漠與樹木', caption: '工作人員名牌' },
        { id: 'camp-tags-camper', alt: '六種配色的像素風學員名牌：雲端上的浮空島與瀑布', caption: '學員名牌' },
      ],
    },
  ],
  posters: {
    eyebrow: '海報',
    heading: '每張海報先回答一件事：誰會停下來看？',
    intro: '系學會、社團，以及幫校外單位做的活動與課程海報。',
    items: [
      { id: 'poster-week', title: '資來好財週到', tags: ['3D 字體', '主視覺系統'], alt: '黑底海報，金銀雙色 3D 立體字「資來好財週到」', caption: '資財週活動海報，同一套主視覺延伸成背板與看板橫幅。' },
      { id: 'poster-graduation', title: '財與你相遇', tags: ['插畫', '活動海報'], alt: '插畫海報：戴學士帽的畢業生坐在擺滿食物的長桌前舉杯', caption: '畢業生送舊活動海報，並延伸成抽獎券。' },
      { id: 'poster-bbq', title: '資諮作響材對味', tags: ['單色版面', '圖樣'], alt: '紅白單色海報，由排列整齊的燈籠與食材圖樣組成', caption: '三系聯合系烤海報。' },
      { id: 'poster-welcome', title: '看我怎麼制服你', tags: ['插畫', '標題字'], alt: '貼在塗鴉牆上的海報，一個機器人擺出出拳姿勢', caption: '新生歡迎會海報。' },
      { id: 'poster-cup', title: '資財盃 趣味競賽', tags: ['等角字體', '版面'], alt: '藍色海報，等角透視的立體 IFM 字母與橘色標題', caption: '資財盃趣味競賽海報。' },
      { id: 'poster-guitar', title: '金魚采不會吉行', tags: ['插畫', '字體'], alt: '深藍色插畫海報：海底城門前的金魚，想著一把吉他和一支鑰匙', caption: '北科采音吉他社成果發表海報。' },
      { id: 'poster-radio', title: '打狗英語通', tags: ['校外委託', '雙配色'], alt: '深綠與亮綠兩個版本的廣播節目海報，拼貼錄音室照片', caption: '高科應英系「打狗英語通」廣播節目海報。' },
      { id: 'poster-clay', title: '石粉黏土雕塑', tags: ['校外委託', '課程'], alt: '兩張課程海報，拼貼學員的石粉黏土作品', caption: '清大石粉黏土雕塑課程與成果展海報。' },
    ],
  },
  lightbox: { label: '作品大圖', close: '關閉', prev: '上一張', next: '下一張', open: '放大檢視' },
  closing: {
    heading: '現在我把同一套思考用在 AI 上。',
    body: '設計教會我先站在使用者的位置看事情。現在換成釐清客戶現場的流程、定義驗收標準，再把 AI 部署進去——對象變了，方法沒變。',
    cta: '看 AI 作品',
  },
  backLabel: '回首頁',
}
