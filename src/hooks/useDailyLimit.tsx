import { useState, useEffect } from 'react';

interface DailyLimit {
  wordsUsed: number;
  lastResetDate: string;
  isLimitReached: boolean;
  remainingWords: number;
}

const DAILY_WORD_LIMIT = 2500;
const STORAGE_KEY = 'amplifyX_daily_word_usage';

export const useDailyLimit = () => {
  const [dailyUsage, setDailyUsage] = useState<DailyLimit>({
    wordsUsed: 0,
    lastResetDate: new Date().toDateString(),
    isLimitReached: false,
    remainingWords: DAILY_WORD_LIMIT
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();
    
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // Reset if it's a new day
      if (parsed.lastResetDate !== today) {
        const resetUsage = {
          wordsUsed: 0,
          lastResetDate: today,
          isLimitReached: false,
          remainingWords: DAILY_WORD_LIMIT
        };
        setDailyUsage(resetUsage);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resetUsage));
      } else {
        setDailyUsage({
          ...parsed,
          isLimitReached: parsed.wordsUsed >= DAILY_WORD_LIMIT,
          remainingWords: Math.max(0, DAILY_WORD_LIMIT - parsed.wordsUsed)
        });
      }
    }
  }, []);

  const updateUsage = (wordsGenerated: number) => {
    const newWordsUsed = dailyUsage.wordsUsed + wordsGenerated;
    const newUsage = {
      wordsUsed: newWordsUsed,
      lastResetDate: new Date().toDateString(),
      isLimitReached: newWordsUsed >= DAILY_WORD_LIMIT,
      remainingWords: Math.max(0, DAILY_WORD_LIMIT - newWordsUsed)
    };
    
    setDailyUsage(newUsage);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsage));
    
    return newUsage;
  };

  const canGenerate = (requestedWords: number): boolean => {
    return dailyUsage.wordsUsed + requestedWords <= DAILY_WORD_LIMIT;
  };

  return {
    dailyUsage,
    updateUsage,
    canGenerate,
    DAILY_WORD_LIMIT
  };
};