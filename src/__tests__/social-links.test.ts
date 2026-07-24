import { SOCIAL_LINKS } from '../config/site';

describe('Social Links Configuration', () => {
  it('should not contain empty values, bare domains, or TODO placeholders', () => {
    const urls = Object.entries(SOCIAL_LINKS);
    
    expect(urls.length).toBeGreaterThan(0);

    urls.forEach(([key, url]) => {
      // 1. Must not be empty or undefined
      expect(url).toBeDefined();
      expect(url.trim()).not.toBe('');

      // 2. Must not contain TODO
      expect(url).not.toContain('TODO');

      // 3. Must not be a bare platform domain with a trailing slash (e.g., https://www.instagram.com/)
      const isBareDomain = url.match(/^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/?$/);
      expect(isBareDomain).toBeFalsy();
    });
  });
});
