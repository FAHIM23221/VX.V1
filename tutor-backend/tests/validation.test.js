const validateLanguage = (lang) => ['en', 'bn'].includes(lang) ? lang : 'en';
const sanitizeInput = (text, maxLength = 1000) => {
  if (typeof text !== 'string') return '';
  return text.trim().slice(0, maxLength);
};

const validateRequestBody = (body, requiredFields) => {
  const errors = [];
  requiredFields.forEach(field => {
    if (!(field in body)) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  return errors.length > 0 ? errors : null;
};

describe('Input Validation', () => {
  describe('sanitizeInput', () => {
    test('should return empty string for non-string input', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(123)).toBe('');
      expect(sanitizeInput({})).toBe('');
    });

    test('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
      expect(sanitizeInput('\t\ntest\n\t')).toBe('test');
    });

    test('should respect maxLength', () => {
      const longText = 'a'.repeat(2000);
      const result = sanitizeInput(longText, 100);
      expect(result.length).toBe(100);
    });

    test('should allow normal text', () => {
      expect(sanitizeInput('Hello, how are you?')).toBe('Hello, how are you?');
    });

    test('should handle Bengali text', () => {
      const bengaliText = 'আপনি কেমন আছেন?';
      expect(sanitizeInput(bengaliText)).toBe(bengaliText);
    });
  });

  describe('validateLanguage', () => {
    test('should accept en', () => {
      expect(validateLanguage('en')).toBe('en');
    });

    test('should accept bn', () => {
      expect(validateLanguage('bn')).toBe('bn');
    });

    test('should default to en for invalid language', () => {
      expect(validateLanguage('fr')).toBe('en');
      expect(validateLanguage('es')).toBe('en');
      expect(validateLanguage('')).toBe('en');
      expect(validateLanguage(null)).toBe('en');
    });
  });

  describe('validateRequestBody', () => {
    test('should return null if all required fields present', () => {
      const body = { message: 'test', language: 'en' };
      expect(validateRequestBody(body, ['message'])).toBeNull();
    });

    test('should return error array if required field missing', () => {
      const body = { language: 'en' };
      const errors = validateRequestBody(body, ['message']);
      expect(Array.isArray(errors)).toBe(true);
      expect(errors[0]).toContain('message');
    });

    test('should check multiple required fields', () => {
      const body = { message: 'test' };
      const errors = validateRequestBody(body, ['message', 'language', 'context']);
      expect(errors.length).toBe(2);
    });
  });
});
