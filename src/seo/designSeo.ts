import type { Lang } from '../i18n/locales'

// Crawler-facing copy for /{lang}/design. Mirrors `designSeo` in
// scripts/seoData.mjs, which is what the prerender actually writes into the
// head; this copy backs runtime/SPA renders. Enforced by contract 9 in
// scripts/check-seo-sync.mjs — change both in the same commit.
export const designSeo: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'Design Work: Event Identity & Posters | Yui (Wayne) Tien',
    description:
      'Pre-AI design work by Yui (Wayne) Tien: a tarot camp identity across posters, shirts and merch, a hand-drawn heraldic camp identity, and eight posters.',
  },
  'zh-tw': {
    title: '設計作品：活動識別與海報 | Yui (Wayne) Tien',
    description:
      '田祐維（Yui / Wayne Tien）進入 AI 領域前的設計作品：以塔羅「愚者」為題、延伸到海報與營服的營隊識別系統，手繪紋章的聯合宿營識別，以及八張活動海報。',
  },
  ja: {
    title: 'デザイン作品：イベント識別とポスター | Yui (Wayne) Tien',
    description:
      'Yui (Wayne) TienがAIの仕事に移る前に手がけたビジュアルデザイン。タロット「愚者」をテーマにポスター、Tシャツ、グッズまで展開したキャンプの識別システム、手描きの中世紋章によるキャンプ識別、そして8枚のイベントポスター。',
  },
  ko: {
    title: '디자인 작업: 행사 아이덴티티와 포스터 | Yui (Wayne) Tien',
    description:
      'Yui (Wayne) Tien이 AI 분야로 오기 전에 만든 비주얼 디자인. 타로 「광대」를 주제로 포스터, 티셔츠, 굿즈까지 확장한 캠프 아이덴티티, 손으로 그린 중세 문장 캠프 아이덴티티, 그리고 여덟 장의 행사 포스터.',
  },
}
