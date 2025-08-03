import yellowWords from './yellow_keywords.json';

// 拼音关键词列表（可扩展）
const pinyinWords: string[] = [
  'luanlun', 'seqing', 'youma', 'wuma', 'rujiaojiao',
  'jiaochi', 'diaojiao', 'tuokuan'
];

// 正则匹配（番号识别、色情平台）
const regexPatterns: RegExp[] = [
  /[A-Z]{2,5}-\d{3,4}/g, // 番号如 SSNI-123、IPX-456
  /\b(91porn|javlibrary|草榴社区|xvideos|东京热)\b/i
];

// 清洗字符串中的特殊符号、变形写法
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '') // 移除表情符号/特殊字符
    .replace(/\s+/g, '');
}

// 检查是否命中关键词（包括拼音和正则）
export function containsYellowContent(inputText: string): boolean {
  const cleanText = normalizeText(inputText);

  // 1. 中文关键词匹配
  for (const word of yellowWords.yellowWords) {
    if (cleanText.includes(word.toLowerCase())) return true;
  }

  // 2. 拼音关键词匹配
  for (const py of pinyinWords) {
    if (cleanText.includes(py)) return true;
  }

  // 3. 番号 / 平台关键字 正则匹配
  for (const pattern of regexPatterns) {
    if (pattern.test(inputText)) return true;
  }

  return false;
}
