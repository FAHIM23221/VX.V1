// Simple validation test suite
function sanitizeInput(text, maxLength = 1000) {
  if (typeof text !== 'string') return '';
  return text.trim().slice(0, maxLength).replace(/[<>"']/g, '');
}

function validateLanguage(lang) {
  return ['en', 'bn'].includes(lang) ? lang : 'en';
}

// Tests
const tests = [
  {
    name: 'sanitizeInput: normal text',
    fn: () => sanitizeInput('hello world') === 'hello world',
  },
  {
    name: 'sanitizeInput: removes HTML tags',
    fn: () => sanitizeInput('<script>alert(1)</script>') === 'scriptalert1script',
  },
  {
    name: 'sanitizeInput: respects maxLength',
    fn: () => sanitizeInput('a'.repeat(2000), 100).length === 100,
  },
  {
    name: 'validateLanguage: accepts en',
    fn: () => validateLanguage('en') === 'en',
  },
  {
    name: 'validateLanguage: accepts bn',
    fn: () => validateLanguage('bn') === 'bn',
  },
  {
    name: 'validateLanguage: defaults invalid to en',
    fn: () => validateLanguage('fr') === 'en',
  },
];

// Run tests
let passed = 0;
let failed = 0;

tests.forEach((test) => {
  try {
    if (test.fn()) {
      console.log(`✓ ${test.name}`);
      passed++;
    } else {
      console.log(`✗ ${test.name}`);
      failed++;
    }
  } catch (err) {
    console.log(`✗ ${test.name}: ${err.message}`);
    failed++;
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed out of ${tests.length} tests`);
process.exit(failed > 0 ? 1 : 0);
