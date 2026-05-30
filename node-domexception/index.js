// Export the platform's native DOMException
// Since Node.js >= 18 has globalThis.DOMException natively, we export it directly.
// We also provide a graceful fallback for environmental robustness.
const NativeDOMException = typeof globalThis !== 'undefined' && globalThis.DOMException
  ? globalThis.DOMException
  : class DOMException extends Error {
      constructor(message, name) {
        super(message);
        this.name = name || 'DOMException';
      }
    };

module.exports = NativeDOMException;
