import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RotateCcw, BarChart2, X, HelpCircle, CheckCircle2 } from 'lucide-react';

// --- القاموس الأول: الكلمات الشائعة (تكون هي الحل) ---
const COMMON_ANSWERS = [
"طاولة", "مكتبة", "تفاحة", "خزانة", "نافذة", "شاشات", "أبواب", "أقلام", "أوراق", "دفاتر", "مسطرة", "مفتاح", "سيارة", "طيارة", "دراجة", "حافلة", "شاحنة", "باخرة", "سفينة", "محطات", "مدينة", "قريات", "حديقة", "غابات", "صحراء", "هضبات", "أنهار", "أمواج", "كواكب", "قمرات", "أشعات", "أتربة", "أحجار", "أشجار", "أزهار", "وردات", "نخلات", "أعناب", "موزات", "جزرات", "بصلات", "ليمون", "خوخات", "توتات", "رمانة", "بطيخة", "قمصان", "فستان", "معاطف", "قبعات", "أحذية", "جوارب", "شنطات", "ساعات", "صابون", "منشفة", "وسادة", "ألحفة", "سجادة", "مرايا", "لوحات", "ذهبية", "فضيات", "خواتم", "قلادة", "أساور", "أطباء", "مهندس", "أستاذ", "تلميذ", "علماء", "أدباء", "فقهاء", "أمراء", "خبراء", "أوطان", "رسمات", "سباحة", "رماية", "تجارة", "أموال", "معادن", "ألماظ", "ياقوت", "مرجان", "أصداف", "بركان", "زلزال", "إعصار", "إيمان", "إسلام", "صلوات", "صدقات", "مساجد", "عبادة", "إخلاص", "أمانة", "عجائب", "ذوبان", "مبارك", "عوجاء", "معطاء", "ليونة", "بضاعة", "نصيحة", "توجيه", "بنتان", "ظرفاء", "بادية", "مادية", "شفعاء", "بائقة", "كابوس", "تلاوة", "مذاعة", "مقالة", "مسمار", "باكورة", "مرساة", "مراجع", "كارثة", "تابوت", "شواغر", "نواهي", "نوايا", "غلاظة", "ريحان", "وجيزة", "نقاهة", "نكراء", "تاريخ", "طاغوت", "وسطاء", "ولادة", "ترضية", "توصية", "خضراء", "باحثة", "منطاد", "مقولة", "مجنحة", "مؤدبة", "تعيسة", "مبتسم", "وكلاء", "عنقاء", "تابعة", "نشطاء", "براقة", "ميزان", "ثرثار", "جيران", "باهية", "مطبوع", "توظيف", "فنجان", "ماضية", "مبسطة", "مصفاة", "حيوان", "جاسوس", "رمضان", "مهارة", "تنقيب", "مترفة", "عزباء", "عذراء", "زعماء", "محلات", "ترقية", "ميلاد", "بلدان", "توضيح", "ريغان", "وسيمة", "مذاهب", "فضيحة", "مصونة", "مرجان", "مباحة", "متحور", "باعثة", "زملاء", "مثمرة", "مقدمة", "كرماء", "تسلية", "مشاكس", "عميقة", "مهينة", "توديع", "تشرذم", "توفير", "تاجرة", "وهنية", "قانون", "ملونة", "محدود", "لطفاء", "وصاية", "متعال", "مؤذية", "نظيفة", "حمراء", "ناموس", "مأمون", "مسافر", "بدانة", "توصيل", "لفافة", "جاموس", "مباني", "فواكه", "صابون", "غلمان", "مجرات", "ثقافة", "تائبة", "تأسيس", "توفيق", "ميناء", "مجيدة", "وزراء", "مباحث", "وكيلة", "تضارب", "متيمة", "تسوية", "تائهة", "ميقات", "معيشة", "بائعة", "ديوان", "صاروخ", "تعبئة", "فانوس", "تفاهة", "مأكول", "ماشية", "باهتة", "مؤيدة", "وكالة", "بطلان", "كنيسة", "مجدية", "قرنفل", "خواطر", "مجتاز", "غرامة", "معتدل", "عواطف", "زخارف", "ملامح", "عامود", "مناعة", "عصفور", "معلقة", "زرارة", "معقول", "زراعة", "تمثيل", "سداسي", "مهاجر", "جراحة", "معاكس", "شبيبة", "معابد", "مجاهد", "تجريب", "مواقد", "شريفة", "عنصري", "مساجد", "سلامة", "بطيخة", "سجادة", "رزيبة", "شحادة", "حفلات", "لطافة", "تعنيف", "متاحف", "راغبة", "معزوم", "تسلسل", "سلاحف", "مدارس", "مستور", "رباعي", "تعريف", "مواقف", "هيفاء", "ثخينة", "تحميل", "مكاتب", "علامة", "مواقع", "ثنائي", "لطيفة", "تسبيح", "مجالس", "توريد", "معاهد", "مصاحب", "رفيعة", "تحفيز", "مكتبة", "بوصلة", "كلمات", "دائرة", "مسموح", "شعراء", "زرعات", "سذاجة", "سميحة", "همسات", "جرافة", "دراجة", "مختبر", "مكياج", "مسلسل", "تصريح", "صحابة", "فارقة", "خماسي", "مجموع", "مثبتة", "ممتعة", "مماثل", "عائدة", "صناعة", "ممنوع", "مصاحف", "مكافح", "تقنية", "مجروح", "صحيحة", "فارسة", "شوائب", "ثلاثي", "مواكب", "زهراء", "سهولة", "متاجر", "مقالات", "صفراء", "توهيد", "كهيلة", "الستة", "صعوبة", "مربعة", "مجوهر", "مقاعد", "مطروح", "مكتوب", "هادفة", "مدافع", "شبابي", "ترهيب", "تجريح", "كهولة", "سجينة", "معدات", "لوحات", "هجرات", "عفراء", "مشاعر", "مرادف", "خنساء", "مدروس", "كواشف", "عباءة", "محتوى", "حلقات", "كريمة", "تسنيم", "مهنية", "شاحبة", "عصيبة", "مقتول", "موصول", "معينة", "محبوب", "باسطة", "سابقة", "مخطط", "جاهلة", "مقطور", "غفلان", "مجبور", "نشطاء", "مبعوث", "ظالمة", "محاول", "تورية", "مجاوز", "مخشية", "أجزاء", "مشيئة", "ثكلان", "موهوم", "ناضجة", "أعيان", "مغروم", "فاتحة", "منقوص", "فائحة", "مبروم", "حاكمة", "ميزان", "محسوب", "خطيرة", "محمول", "بارزة", "موشوم", "منطوق", "ساجدة", "مرصوص", "تيجان", "محمود", "إطراء", "مدموج", "ظافرة", "ملكوم", "عرفان", "مقصود", "مجزية", "إبداء", "مهنية", "واعدة", "تأميم", "لاقطة", "معدوم", "صابرة", "مكلوم", "طاعة", "مرزوق", "حاضنة", "متفوق", "ظاهرة", "تأويل", "شامخة", "تلقاء", "فاحصة", "مأبون", "راسخة", "مجدوب", "طارحة", "ملموس", "نابعة", "مرسوم", "إبقاء", "مأثوم", "عمران", "حاسمة", "مراود", "محروق", "إذعان", "مثقوب", "واثقة", "محروم", "فائزة", "متبوع", "تنمية", "ناقضة", "مخصوص", "رجحان", "متذوق", "وجدان", "مأثور", "مجروح", "مليئة", "محفوف", "شاكرة", "خاتمة", "معمور", "صادقة", "صانعة", "محروس", "مصيدة", "شكران", "مقصور", "سامعة", "توشية", "مختوم", "زاهدة", "متكون", "مرينة", "معمول", "إرضاء", "متجول", "مريعة", "طلقاء", "متكور", "شافية", "محصور", "باهتة", "مخروط", "محظور", "ذؤبان", "مجرور", "سانحة", "أشجان", "مبرود", "واطئة", "محجوز", "سلطان", "مديدة", "مأذون", "صامتة", "مخدوش", "حاملة", "كتمان", "ساعية", "حاصلة", "مجموع", "مسموم", "أبناء", "مهزوز", "منصوص", "شاهقة", "محسوم", "ناطقة", "تأييد", "محاور", "تعميم", "أحباء", "مكيدة", "مأمون", "رادعة", "متلوف", "ناضرة", "مخبول", "ناضحة", "مبروك", "تسوية", "مقصوص", "عاجزة", "محسوس", "جدران", "متخوف", "مقبوض", "واعية", "محبور", "فاسدة", "محكوم", "لاصقة", "مبخوت", "صادمة", "محصود", "مخروق", "عادلة", "محبوس", "مأخوذ", "مقذوف", "رهبان", "غامرة", "ثعبان", "ناجعة", "متقوس", "خاضعة", "محشور", "طاهرة", "محسود", "فرقان", "ملغوم", "سرعان", "مقطوف", "نبلاء", "مانعة", "محشود", "اتقان", "محصول", "مظلوم", "خافضة", "ملصوق", "مصقول", "محروز", "محدود", "سيلان", "متزوج", "إعلاء", "منقوض", "مريرة", "مجلوب", "حاشدة", "مأجور", "صاحبة", "متعوس", "ريحان", "مبغوض", "راجفة", "منقوط", "بارعة", "مجحود", "خارقة", "متلون", "صاعدة", "حازمة", "محظوظ", "صارخة", "مغمود", "هذيان", "متروك", "صبيان", "محموم", "باسم", "محلول", "ساخطة", "محذوف", "غارقة", "تأمين", "داحضة", "معيبة", "بنيان", "مجعول", "ثاقبة", "مديون", "حائزة", "مبذول", "راجية", "محبوك", "نافثة", "مأجوج", "طاحنة", "مجزوم", "بسطاء", "محجور", "حامدة", "مجاور", "هابطة", "مثلوج", "سبحان", "عارمة", "نسيان", "مثبوت", "سرطان", "مأهول", "نيران", "مخطوب", "ناصعة", "محفور", "أخطاء", "مهيبة", "عدوان", "طامحة", "إعفاء", "مقروض", "عازفة", "غفران", "حافظة", "إقصاء", "بادرة", "محقون", "خادعة", "مهموم", "حاشرة", "عصيان", "سابحة", "مأمور", "إعطاء", "فارسة", "خافقة", "ثلاثة", "أربعة", "تذكرة", "شجيرة", "ضيافة", "تدفئة", "أسبوع", "أرواح", "ضوضاء", "أعضاء", "اثنان", "أسماء", "زمكان", "تدبير", "معجون", "تجميل", "رادار", "تقارب", "معمار", "تبريد", "تغريب", "مواقف", "منثور", "أبواب", "تغليف", "مفروز", "تبريص", "منغلق", "انحرف", "تفصيد", "مفروم", "تعليل", "أطماع", "تغليظ", "منفرط", "اصطحب", "تعريف", "مقرور", "تفاحش", "منزرع", "انحبس", "تبشيع", "متكثر", "تماهل", "انفصم", "انحفر", "مؤاخذ", "تهويم", "طيبة", "لطيفة", "عذبة", "هادئة", "واضحة", "بهيجة", "رشيقة", "ناعمة", "صافية", "دافئة", "بسيطة", "شامخة", "كريمة", "صادقة", "وفية", "رزينة", "عطرة", "بهية", "نابعة", "غالية", "فخمة", "حذرة", "رقيقة", "سخية", "مهمة", "حكيمة", "مطلقة", "نبيلة", "مقدسة", "سعيدة", "غنية", "منيرة", "مشرقة", "فاضلة", "عاقلة", "واعية", "راقية", "سامية", "نقية", "زكية", "عفيفة", "شريفة", "وقورة", "هيوبة", "مهيبة", "جليلة", "عظيمة", "سمحة", "رحبة", "ودودة", "حنونة", "شفوقة", "رؤوفة", "غفورة", "ستارة", "حصيفة", "مدبرة", "محسنة", "منصفة", "متبعة", "قوامة", "حافظة", "ناصحة", "مرشدة", "موجهة", "كافية", "واقية", "عاصمة", "مانعة", "جاعلة", "رافعة", "خافضة", "قاضية", "حاكمة", "عادلة", "ناهية", "آمرة", "زاجرة", "وازعة", "رادعة", "صارمة", "لينة", "يانعة", "نامية", "واعدة", "باسطة", "قابضة", "نافعة"
];

// --- القاموس الثاني: EXTRA_GUESSES (يتم قبولها كمحاولات فقط) ---
const EXTRA_GUESSES = [
"عجائب", "ذوبان", "مبارك", "عوجاء", "معطاء", "ليونة", "بضاعة", "نصيحة", "توجيب", "بنتان", "ظرفاء", "بادية", "مرايا", "مادية", "شفعاء", "بائقة", "كابوس", "مقهقه", "تلاوة", "مذاعة", "مقالة", "مسمار", "مستاء", "تصويب", "باكرة", "مرساة", "مراجع", "كارثة", "تابوت", "شواغر", "نواهي", "صحراء", "نوايا", "غلاظة", "ريحان", "وجيزة", "نقاهة", "نكراء", "تاريخ", "مجلات", "طاغوت", "وسطاء", "ولادة", "ترضية", "توصية", "خضراء", "باحثة", "منطاد", "مقولة", "مجنحة", "مؤدبة", "تعيسة", "مبتسم", "وكلاء", "عنقاء", "تابعة", "متضحة", "نشطاء", "براقة", "ميزان", "ترجمة", "ثرثار", "جيران", "باهية", "مطبوع", "توظيف", "فنجان", "ماضية", "مبسطة", "مصفاة", "قمامة", "حيوان", "جاسوس", "رمضان", "عصفور", "مهارة", "مشوشة", "تنقيب", "تضاعف", "مترفة", "عزباء", "عذراء", "تجارة", "زعماء", "محلات", "ترقية", "تمايل", "ميلاد", "بلدان", "توضيح", "ريعان", "وسيمة", "مذاهب", "فضيحة", "مصونة", "مائية", "مرجان", "مباحة", "متحور", "باعثة", "زملاء", "جدارة", "مثمرة", "مقدمة", "كرماء", "تسلية", "مشاكس", "عميقة", "مهينة", "توديع", "تشرذم", "توفير", "موسوس", "شواطئ", "تاجرة", "وهمية", "باخرة", "قانون", "ملونة", "محدود", "لطفاء", "وصاية", "متعال", "مؤذية", "نظيفة", "شرفاء", "حمراء", "ناموس", "مأمون", "مسافر", "بدانة", "توصيل", "لفافة", "جاموس", "مباني", "فواكه", "صابون", "غلمان", "مجرات", "ثقافة", "تائبة", "تأسيس", "توفيق", "ميناء", "مجيدة", "وزراء", "مباحث", "وكيلة", "تضارب", "متيمة", "تسوية", "تائهة", "علماء", "ميقات", "معيشة", "بائعة", "ديوان", "صاروخ", "تعبئة", "فانوس", "تفاهة", "مأكول", "مضياف", "مشوهة", "ماشية", "باهتة", "مؤيدة", "وكالة", "بطلان", "كنيسة", "مجدية", "قرنفل", "خواطر", "مجتاز", "توفية", "غرامة", "معتدل", "عواطف", "زخارف", "ملامح", "عامود", "مناعة", "عصفور", "ملعقة", "زرافة", "معقول", "زراعة", "تمثيل", "سداسي", "مهاجر", "جراحة", "معاكس", "شبيبة", "معابد", "مجاهد", "تجريب", "مواقد", "شريفة", "عنصري", "مساجد", "سلامة", "بطيخة", "سجادة", "رزينة", "شحاذة", "حفلات", "لطافة", "تعنيف", "متاحف", "راغبة", "معزوم", "تسلسل", "سلاحف", "مدارس", "مستور", "رباعي", "تعريف", "مواقف", "هيفاء", "ثخينة", "تحميل", "مكاتب", "علامة", "مواضع", "ثنائي", "لطيفة", "تسبيح", "مجالس", "توريد", "معاهد", "مصاحب", "رفيعة", "تحفيز", "مكتبة", "بوصلة", "كلمات", "دائرة", "مسموح", "شعراء", "زرعات", "مساعد", "سذاجة", "سميحة", "همسات", "جرافة", "دراقة", "مختبر", "مكي

];

const normalize = (word) => {
if (!word) return "";
return word
.replace(/[أإآ]/g, "ا")
.replace(/ة/g, "ه")
.replace(/ى/g, "ي")
.replace(/[\u064B-\u065F]/g, "");
};

const ANSWERS_LIST = Array.from(new Set(COMMON_ANSWERS.filter(w => w.length === 5)));
const GUESSES_SET = new Set([
...ANSWERS_LIST.map(normalize),
...EXTRA_GUESSES.filter(w => w.length === 5).map(normalize)
]);

const App = () => {
const [targetWord, setTargetWord] = useState("");
const [guesses, setGuesses] = useState(Array(8).fill(""));
const [activeRow, setActiveRow] = useState(0);
const [currentGuess, setCurrentGuess] = useState("");
const [gameState, setGameState] = useState("playing");
const [letterStatuses, setLetterStatuses] = useState({});
const [errorMessage, setErrorMessage] = useState("");
const [showStats, setShowStats] = useState(false);
const [showHelp, setShowHelp] = useState(false);
const [stats, setStats] = useState({ played: 0, wins: 0, streak: 0, maxStreak: 0 });
const [shakeRow, setShakeRow] = useState(-1);
const [isAnimating, setIsAnimating] = useState(false);

const pickRandomWord = useCallback(() => {
const randomIndex = Math.floor(Math.random() * ANSWERS_LIST.length);
setTargetWord(ANSWERS_LIST[randomIndex]);
setGuesses(Array(8).fill(""));
setActiveRow(0);
setCurrentGuess("");
setGameState("playing");
setLetterStatuses({});
setIsAnimating(false);
setErrorMessage("");
}, []);

useEffect(() => {
pickRandomWord();
const savedStats = localStorage.getItem('wordle-ar-ultimate-stats');
if (savedStats) setStats(JSON.parse(savedStats));
}, [pickRandomWord]);

const updateKeyboardStatus = (allGuesses, target) => {
const newStatuses = { ...letterStatuses };
const nTarget = normalize(target);
allGuesses.forEach(guess => {
if (!guess) return;
const nGuess = normalize(guess);
for (let i = 0; i < 5; i++) {
const char = guess[i];
const nChar = nGuess[i];
if (nChar === nTarget[i]) newStatuses[char] = 'correct';
else if (nTarget.includes(nChar) && newStatuses[char] !== 'correct') newStatuses[char] = 'present';
else if (!newStatuses[char]) newStatuses[char] = 'absent';
}
});
setLetterStatuses(newStatuses);
};

const handleKeyPress = useCallback((key) => {
if (gameState !== "playing" || isAnimating || errorMessage) return;

if (key === "Enter") {
  if (currentGuess.length !== 5) {
    triggerError("الكلمة ناقصة");
    return;
  }
  const nGuess = normalize(currentGuess);
  if (!GUESSES_SET.has(nGuess)) {
    triggerError("خطأ");
    return;
  }
  submitGuess();
} else if (key === "Backspace") {
  setCurrentGuess(prev => prev.slice(0, -1));
} else if (currentGuess.length < 5 && /^[\u0600-\u06FF]$/.test(key)) {
  setCurrentGuess(prev => prev + key);
}


}, [currentGuess, gameState, isAnimating, errorMessage, targetWord]);

const submitGuess = () => {
setIsAnimating(true);
const newGuesses = [...guesses];
newGuesses[activeRow] = currentGuess;
setGuesses(newGuesses);

setTimeout(() => {
  const isWin = normalize(currentGuess) === normalize(targetWord);
  updateKeyboardStatus(newGuesses, targetWord);
  
  if (isWin) {
    endGame(true);
  } else if (activeRow === 7) {
    endGame(false);
  } else {
    setActiveRow(prev => prev + 1);
    setCurrentGuess(""); 
    setIsAnimating(false);
  }
}, 2200); 


};

const triggerError = (msg) => {
setErrorMessage(msg);
setShakeRow(activeRow);
setTimeout(() => { setErrorMessage(""); setShakeRow(-1); }, 1200);
};

const endGame = (won) => {
setGameState(won ? "won" : "lost");
const newStats = {
played: stats.played + 1,
wins: stats.wins + (won ? 1 : 0),
streak: won ? stats.streak + 1 : 0,
maxStreak: Math.max(stats.maxStreak, won ? stats.streak + 1 : 0)
};
setStats(newStats);
localStorage.setItem('wordle-ar-ultimate-stats', JSON.stringify(newStats));
setIsAnimating(false);
setTimeout(() => setShowStats(true), 1200);
};

const getCellColor = (char, index, fullGuess) => {
if (!fullGuess) return "";
const nTarget = normalize(targetWord);
const nGuess = normalize(fullGuess);
const nChar = normalize(char);

if (nChar === nTarget[index]) return "bg-[#6aaa64] border-[#6aaa64]";
const targetCount = nTarget.split('').filter(c => c === nChar).length;
const matchesBefore = nGuess.substring(0, index).split('').filter(c => c === nChar).length;
if (nTarget.includes(nChar) && matchesBefore < targetCount) return "bg-[#c9b458] border-[#c9b458]";
return "bg-[#3a3a3c] border-[#3a3a3c]";


};

const keyboardRows = [
["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
["ش", "س", "ي", "ب", "ل", "ت", "ن", "م", "ك", "ط", "ذ"],
["ر", "ز", "و", "ة", "ى", "ا", "ء", "ئ", "ؤ"],
["Enter", "Backspace"]
];

useEffect(() => {
const fn = (e) => {
if (e.key === "Enter") handleKeyPress("Enter");
else if (e.key === "Backspace") handleKeyPress("Backspace");
else handleKeyPress(e.key);
};
window.addEventListener("keydown", fn);
return () => window.removeEventListener("keydown", fn);
}, [handleKeyPress]);

return (
<div className="min-h-screen bg-[#121213] text-white flex flex-col items-center p-4 font-sans select-none overflow-hidden" dir="rtl">
{errorMessage && (
<div className="fixed top-20 bg-white text-black px-4 py-2 rounded font-bold z-[100] shadow-lg animate-fade-in-out">
{errorMessage}
</div>
)}
<header className="w-full max-w-md flex justify-between items-center border-b border-[#3a3a3c] pb-2 mb-4">
<div className="flex gap-1">
<button onClick={() => setShowHelp(true)} className="p-1.5 text-zinc-400 hover:text-white transition-colors"><HelpCircle size={22} /></button>
<button onClick={() => { if(!isAnimating) pickRandomWord(); }} className="p-1.5 text-zinc-400 hover:text-emerald-500 transition-colors"><RotateCcw size={22} /></button>
</div>
<h1 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase font-serif">كَلِمَة</h1>
<button onClick={() => setShowStats(true)} className="p-1.5 text-zinc-400 hover:text-white transition-colors"><BarChart2 size={22} /></button>
</header>
<main className="flex-grow flex flex-col justify-center gap-1.5 mb-6 overflow-y-auto w-full items-center">
{guesses.map((g, r) => {
const isCurrentRow = r === activeRow;
const isSubmitted = g && (r < activeRow || (isCurrentRow && gameState !== "playing"));
const display = isCurrentRow && gameState === "playing" ? currentGuess : g;
return (
<div key={r} className={flex gap-1.5 ${shakeRow === r ? 'animate-shake' : ''}}>
{Array(5).fill("").map((_, c) => {
const char = display[c] || "";
const colorClass = isSubmitted ? getCellColor(char, c, g) : "";
const isPop = char && isCurrentRow && !isAnimating;
return (
<div key={c} className="w-11 h-11 sm:w-14 sm:h-14 perspective-1000">
<div className={relative w-full h-full text-center transition-transform duration-700 preserve-3d ${isSubmitted ? 'animate-flip' : ''} ${isPop ? 'animate-pop' : ''}} style={{ animationDelay: ${isSubmitted ? c * 300 : 0}ms }}>
<div className={absolute inset-0 border-2 flex items-center justify-center text-2xl font-bold backface-hidden rounded-sm ${char ? 'border-[#565758]' : 'border-[#3a3a3c]'}}>{char}</div>
<div className={absolute inset-0 flex items-center justify-center text-2xl font-bold backface-hidden rotate-x-180 rounded-sm border-0 ${colorClass}}>{char}</div>
</div>
</div>
);
})}
</div>
);
})}
</main>
<div className="w-full max-w-lg space-y-2 pb-4">
{keyboardRows.map((row, i) => (
<div key={i} className="flex justify-center gap-1.5 px-1">
{row.map(k => {
const s = letterStatuses[k];
let bg = s === 'correct' ? "bg-[#6aaa64]" : s === 'present' ? "bg-[#c9b458]" : s === 'absent' ? "bg-[#3a3a3c] opacity-50" : "bg-[#818384]";
const isEnter = k === "Enter";
const isBack = k === "Backspace";
return (
<button key={k} disabled={isAnimating} onClick={() => handleKeyPress(k)} className={${bg} h-12 rounded-md flex items-center justify-center font-bold text-xs sm:text-base active:scale-95 transition-all ${isEnter || isBack ? 'flex-[2.5] min-w-[65px] sm:min-w-[85px]' : 'flex-1'} ${isAnimating ? 'cursor-not-allowed' : ''}}>
{isBack ? "حذف" : isEnter ? "إدخال" : k}
</button>
);
})}
</div>
))}
</div>
{showStats && (
<div className="fixed inset-0 bg-[#121213]/90 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
<div className="bg-[#121213] border border-[#3a3a3c] w-full max-w-sm p-8 rounded-xl text-center relative shadow-2xl">
<button onClick={() => setShowStats(false)} className="absolute top-4 left-4 text-zinc-500 hover:text-white"><X size={24}/></button>
{gameState !== "playing" && (
<div className="mb-8">
<p className="text-zinc-500 text-xs mb-1 uppercase tracking-widest">الكلمة هي</p>
<h2 className="text-4xl font-black text-white mb-4 uppercase">{targetWord}</h2>
{gameState === "won" ? <div className="text-[#6aaa64] flex items-center justify-center gap-2 font-bold"><CheckCircle2 size={20}/> تم التخمين بنجاح</div> : <div className="text-red-400 font-bold">للأسف، لم تنجح هذه المرة!</div>}
</div>
)}
<h3 className="text-lg font-bold mb-6 text-zinc-300">إحصائياتك</h3>
<div className="grid grid-cols-4 gap-2 mb-10 text-zinc-400">
<div><div className="text-2xl text-white font-black">{stats.played}</div>لعب</div>
<div><div className="text-2xl text-white font-black">{stats.played ? Math.round((stats.wins/stats.played)*100) : 0}</div>فوز %</div>
<div><div className="text-2xl text-white font-black">{stats.streak}</div>حالي</div>
<div><div className="text-2xl font-black text-white">{stats.maxStreak}</div>أفضل</div>
</div>
<button onClick={() => { pickRandomWord(); setShowStats(false); }} className="w-full bg-[#6aaa64] py-4 rounded-md font-bold text-lg active:scale-95 shadow-lg">تحدي جديد</button>
</div>
</div>
)}
<style>{@keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } } @keyframes flip { 0% { transform: rotateX(0); } 100% { transform: rotateX(180deg); } } @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } } .animate-shake { animation: shake 0.4s ease-in-out; } .animate-flip { animation: flip 0.6s forwards ease-in-out; } .animate-pop { animation: pop 0.1s ease-in-out; } .perspective-1000 { perspective: 1000px; } .preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-x-180 { transform: rotateX(180deg); } .animate-fade-in-out { animation: fade 1.2s forwards; } @keyframes fade { 0% { opacity: 0; transform: translateY(-10px); } 20% { opacity: 1; transform: translateY(0); } 80% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } } ::-webkit-scrollbar { display: none; }}</style>
</div>
);
};

export default App;
