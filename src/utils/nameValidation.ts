import { profanity } from '@2toad/profanity';

// Extended list of offensive patterns
const OFFENSIVE_PATTERNS = [
  /\bn[i1]gg[ae3]r/i,
  /\bf[a@]g/i,
  /\bk[i1]k[e3]/i,
  /\bc[u|v]nt/i,
  /\bb[i1]tch/i,
  /\bwh[o0]re/i,
  /\br[a@]pe/i,
  /\bn[a@]z[i1]/i,
  /\bk[i1]ll/i,
  /\bh[i1]tl[e3]r/i,
  /\bt[e3]rr[o0]r/i,
  /\bj[i1]h[a@]d/i,
] as const;

export const TRIBE_NAME_CONSTRAINTS = {
  MIN_LENGTH: 4,
  MAX_LENGTH: 50,
  PATTERN: /^[a-zA-Z0-9][a-zA-Z0-9\s\-_&()]*$/,
  // Allowed: letters, numbers, spaces, hyphens, underscores, ampersands, parentheses
  // Must start with letter or number
} as const;

export const TRIBE_NAME_ERROR_MESSAGES = {
  TOO_SHORT: `Tribe name must be at least ${TRIBE_NAME_CONSTRAINTS.MIN_LENGTH} characters long`,
  TOO_LONG: `Tribe name must be less than ${TRIBE_NAME_CONSTRAINTS.MAX_LENGTH} characters long`,
  INVALID_CHARACTERS: 'Tribe name can only contain letters, numbers, spaces, and basic punctuation (-, _, &, ())',
  INAPPROPRIATE: 'This name contains inappropriate content and is not allowed',
  STARTS_WITH_SPECIAL: 'Tribe name must start with a letter or number',
  CONSECUTIVE_SPECIAL: 'Tribe name cannot contain consecutive special characters',
  RESERVED: 'This name is reserved and cannot be used',
  SPAM: 'Name contains too many repeated characters',
} as const;

// Reserved words that shouldn't be used as tribe names
const RESERVED_WORDS = new Set([
  'admin',
  'administrator',
  'mod',
  'moderator',
  'system',
  'official',
  'support',
  'help',
  'staff',
  'team',
  'owner',
  'super',
  'supervisor',
  'manager',
  'exec',
  'executive',
  'ceo',
  'cto',
  'cfo',
  'president',
  'founder',
  'leadership',
  'corporate',
  'test',
  'testing',
  'demo',
  'sample',
  'example',
]);

// Character substitution map for detecting evasion attempts
const SUBSTITUTION_MAP: Record<string, string[]> = {
  'a': ['4', '@', 'α', 'а', 'à', 'á', 'â', 'ã', 'ä', 'å'],
  'e': ['3', 'є', 'е', 'è', 'é', 'ê', 'ë'],
  'i': ['1', '!', 'і', 'í', 'ì', 'î', 'ï'],
  'o': ['0', 'о', 'ο', 'ó', 'ò', 'ô', 'õ', 'ö'],
  's': ['5', '$', 'ѕ', 'š'],
  't': ['7', 'т'],
  'u': ['υ', 'ц', 'ù', 'ú', 'û', 'ü'],
  'y': ['ү', 'у', 'ý', 'ÿ'],
};

// Normalize text by replacing similar-looking characters
const normalizeText = (text: string): string => {
  let normalized = text.toLowerCase();
  
  // Replace all substitution characters with their base letter
  Object.entries(SUBSTITUTION_MAP).forEach(([base, substitutions]) => {
    substitutions.forEach(sub => {
      normalized = normalized.replace(new RegExp(sub, 'g'), base);
    });
  });

  return normalized;
};

// Check for character spamming (e.g., 'aaaaaa', 'hahahahaha')
const hasCharacterSpam = (name: string): boolean => {
  // Check for repeated single characters
  if (/(.)\1{3,}/.test(name)) return true;
  
  // Check for repeated patterns
  const normalized = name.toLowerCase();
  for (let length = 2; length <= 4; length++) {
    for (let i = 0; i < normalized.length - length * 2; i++) {
      const pattern = normalized.slice(i, i + length);
      const restOfString = normalized.slice(i + length);
      if (restOfString.includes(pattern) && pattern.length > 1) {
        const patternCount = (normalized.match(new RegExp(pattern, 'g')) || []).length;
        if (patternCount >= 3) return true;
      }
    }
  }
  
  return false;
};

// Check for offensive content using both profanity list and patterns
const containsOffensiveContent = (name: string): boolean => {
  const normalized = normalizeText(name);
  
  // Check against profanity filter
  if (profanity.exists(normalized)) return true;
  
  // Check against offensive patterns
  for (const pattern of OFFENSIVE_PATTERNS) {
    if (pattern.test(normalized)) return true;
  }
  
  return false;
};

export function validateTribeName(name: string): { isValid: boolean; error?: string } {
  // Remove any existing -tribe suffix for validation
  const baseName = name.replace(/-tribe$/, '').trim();
  
  // Basic length validation
  if (baseName.length < TRIBE_NAME_CONSTRAINTS.MIN_LENGTH) {
    return { isValid: false, error: TRIBE_NAME_ERROR_MESSAGES.TOO_SHORT };
  }
  if (baseName.length > TRIBE_NAME_CONSTRAINTS.MAX_LENGTH) {
    return { isValid: false, error: TRIBE_NAME_ERROR_MESSAGES.TOO_LONG };
  }

  // Normalize for offensive content check
  const normalizedName = normalizeText(baseName);
  
  // Check for offensive content
  if (containsOffensiveContent(normalizedName)) {
    return { isValid: false, error: TRIBE_NAME_ERROR_MESSAGES.INAPPROPRIATE };
  }

  // Check for reserved words
  const normalizedWords = normalizedName.toLowerCase().split(/[\s-_]+/);
  if (normalizedWords.some(word => RESERVED_WORDS.has(word))) {
    return { isValid: false, error: TRIBE_NAME_ERROR_MESSAGES.RESERVED };
  }

  // Check for character spam
  if (hasCharacterSpam(normalizedName)) {
    return { isValid: false, error: TRIBE_NAME_ERROR_MESSAGES.SPAM };
  }

  // Pattern validation
  if (!TRIBE_NAME_CONSTRAINTS.PATTERN.test(baseName)) {
    if (/^[^a-zA-Z0-9]/.test(baseName)) {
      return { isValid: false, error: TRIBE_NAME_ERROR_MESSAGES.STARTS_WITH_SPECIAL };
    }
    return { isValid: false, error: TRIBE_NAME_ERROR_MESSAGES.INVALID_CHARACTERS };
  }

  return { isValid: true };
}
