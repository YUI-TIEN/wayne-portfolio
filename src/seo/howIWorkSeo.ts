import type { Lang } from '../i18n/locales'

// Crawler-facing copy for /{lang}/how-i-work. Mirrors `howIWorkSeo` in
// scripts/seoData.mjs, which is what the prerender actually writes into the
// head; this copy backs runtime/SPA renders. Enforced by contract 8 in
// scripts/check-seo-sync.mjs — change both in the same commit.
export const howIWorkSeo: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'How I Work | Yui (Wayne) Tien',
    description:
      'The five operating rules Yui (Wayne) Tien enforces when building with AI agents: operating contracts before autonomy, evidence-based verification, diagnosis before rebuild, persistent context over prompting, and handoff as part of the deliverable.',
  },
  'zh-tw': {
    title: '我怎麼做事 | Yui (Wayne) Tien',
    description:
      '田祐維（Yui / Wayne Tien）跟 AI agent 協作時實際執行的五條規則：先有操作規範再談自主、用證據驗收、先診斷再重建、用持久脈絡取代提示詞技巧、交接算在交付範圍內。',
  },
  ja: {
    title: '仕事の進め方 | Yui (Wayne) Tien',
    description:
      'Yui (Wayne) TienがAIエージェントと仕事をするときに実際に運用している五つの規則 — 自律の前に運用規約、証拠にもとづく検証、作り直す前に診断、プロンプトより持続する文脈、引き継ぎまでが成果物。',
  },
  ko: {
    title: '일하는 방식 | Yui (Wayne) Tien',
    description:
      'Yui (Wayne) Tien이 AI 에이전트와 일할 때 실제로 강제하는 다섯 가지 규칙 — 자율성보다 운영 규약, 증거 기반 검증, 재구축 전 진단, 프롬프트보다 지속되는 맥락, 결과물에 포함되는 인수인계.',
  },
}
