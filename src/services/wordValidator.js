import {
  API,
  VALIDATION_RESULT,
  VALIDATION_MESSAGES,
  COMMON_PROPER_NOUNS,
} from '../utils/constants';

// Check if string contains numbers
function containsNumbers(str) {
  return /\d/.test(str);
}

// Check if word is likely a proper noun (simple heuristic)
function isLikelyProperNoun(word) {
  const lower = word.toLowerCase();
  return COMMON_PROPER_NOUNS.has(lower);
}

// Validate word against Datamuse API
async function checkDatamuse(word) {
  try {
    const response = await fetch(
      `${API.DATAMUSE}?sp=${encodeURIComponent(word)}&md=f&max=1`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      // Check if exact match
      if (result.word.toLowerCase() === word.toLowerCase()) {
        return { exists: true, data: result };
      }
    }
    return { exists: false };
  } catch (error) {
    console.error('Datamuse API error:', error);
    return { exists: false, error: true };
  }
}

// Validate word against Free Dictionary API
async function checkDictionary(word) {
  try {
    const response = await fetch(
      `${API.DICTIONARY}/${encodeURIComponent(word)}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        return { exists: true, data: data[0] };
      }
    }
    return { exists: false };
  } catch (error) {
    console.error('Dictionary API error:', error);
    return { exists: false, error: true };
  }
}

// Main validation function
export async function validateWord(word, lastWord, usedWords) {
  // Normalize word
  const normalizedWord = word.trim().toLowerCase();

  // 1. Check if empty
  if (!normalizedWord) {
    return {
      isValid: false,
      reason: VALIDATION_RESULT.INVALID_EMPTY,
      message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_EMPTY],
    };
  }

  // 2. Check for numbers
  if (containsNumbers(normalizedWord)) {
    return {
      isValid: false,
      reason: VALIDATION_RESULT.INVALID_NUMBER,
      message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_NUMBER],
    };
  }

  // 3. Check chain rule (if not first word)
  if (lastWord) {
    const requiredLetter = lastWord.slice(-1).toLowerCase();
    if (!normalizedWord.startsWith(requiredLetter)) {
      return {
        isValid: false,
        reason: VALIDATION_RESULT.INVALID_CHAIN_RULE,
        message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_CHAIN_RULE](
          requiredLetter
        ),
      };
    }
  }

  // 4. Check if already used
  if (usedWords.has(normalizedWord)) {
    return {
      isValid: false,
      reason: VALIDATION_RESULT.INVALID_USED,
      message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_USED],
    };
  }

  // 5. Check for common proper nouns (client-side)
  if (isLikelyProperNoun(normalizedWord)) {
    return {
      isValid: false,
      reason: VALIDATION_RESULT.INVALID_PROPER_NOUN,
      message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_PROPER_NOUN],
    };
  }

  // 6. API validation - try Datamuse first
  const datamuseResult = await checkDatamuse(normalizedWord);

  if (datamuseResult.exists) {
    return {
      isValid: true,
      reason: VALIDATION_RESULT.VALID,
      message: VALIDATION_MESSAGES[VALIDATION_RESULT.VALID],
    };
  }

  // 7. Fallback to Dictionary API if Datamuse fails or doesn't find it
  const dictionaryResult = await checkDictionary(normalizedWord);

  if (dictionaryResult.exists) {
    return {
      isValid: true,
      reason: VALIDATION_RESULT.VALID,
      message: VALIDATION_MESSAGES[VALIDATION_RESULT.VALID],
    };
  }

  // 8. Word not found in any dictionary
  return {
    isValid: false,
    reason: VALIDATION_RESULT.INVALID_NOT_WORD,
    message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_NOT_WORD],
  };
}

// Quick client-side validation (before API call)
export function quickValidate(word, lastWord, usedWords) {
  const normalizedWord = word.trim().toLowerCase();

  if (!normalizedWord) {
    return {
      isValid: false,
      reason: VALIDATION_RESULT.INVALID_EMPTY,
      message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_EMPTY],
    };
  }

  if (containsNumbers(normalizedWord)) {
    return {
      isValid: false,
      reason: VALIDATION_RESULT.INVALID_NUMBER,
      message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_NUMBER],
    };
  }

  if (lastWord) {
    const requiredLetter = lastWord.slice(-1).toLowerCase();
    if (!normalizedWord.startsWith(requiredLetter)) {
      return {
        isValid: false,
        reason: VALIDATION_RESULT.INVALID_CHAIN_RULE,
        message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_CHAIN_RULE](
          requiredLetter
        ),
      };
    }
  }

  if (usedWords.has(normalizedWord)) {
    return {
      isValid: false,
      reason: VALIDATION_RESULT.INVALID_USED,
      message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_USED],
    };
  }

  if (isLikelyProperNoun(normalizedWord)) {
    return {
      isValid: false,
      reason: VALIDATION_RESULT.INVALID_PROPER_NOUN,
      message: VALIDATION_MESSAGES[VALIDATION_RESULT.INVALID_PROPER_NOUN],
    };
  }

  return { isValid: true, needsApiValidation: true };
}
