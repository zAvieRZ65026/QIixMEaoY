// 代码生成时间: 2025-09-05 14:39:19
const sanitizeHtml = require('sanitize-html');

// XSS Protection Middleware
// This module provides a middleware function to sanitize user input to protect against XSS attacks.

// Configuration for sanitize-html to allow only safe tags and attributes
const sanitizeConfig = {
  allowedTags: [
    'b', 'i', 'em', 'strong', 'p', 'br', 'span', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'blockquote', 'code', 'pre', 'div', 'hr', 'table', 'thead', 'tbody', 'tfoot', 'th', 'td', 'tr',
    'img', 'figure', 'figcaption', 'video', 'source', 'audio', 'track', 'iframe'
  ],
  allowedAttributes: {
    'a': ['href', 'name', 'target'],
    'img': ['src', 'alt'],
    'iframe': ['src', 'title'],
    'video': ['src', 'controls', 'poster'],
    'audio': ['src', 'controls'],
    'source': ['src', 'type'],
    'track': ['src', 'label', 'kind']
  },
  // More options can be added here to enhance the sanitation process
};

// Middleware to protect against XSS attacks
function xssProtectionMiddleware(req, res, next) {
  try {
    // Sanitize any form of input that could contain HTML
    req.sanitizedInput = sanitizeHtml(req.body, sanitizeConfig);
    next();
  } catch (error) {
    // Handle any errors that occur during the sanitization process
    console.error('Error sanitizing input:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Export the middleware for use in Nuxt routes or store
module.exports = {
  xssProtectionMiddleware
};

/*
 * Usage:
 * In your Nuxt route or middleware configuration, you can use this module to sanitize user inputs.
 * For example, in a route:
 *
 * async asyncData({ req }) {
 *   try {
 *     await this.$xssProtectionMiddleware(req);
 *     // proceed with your route logic
 *   } catch (error) {
 *     // handle error or re-throw
 *   }
 * }
 */