import { TRUST_METRICS } from '../config/site';

describe('TRUST_METRICS configuration', () => {
  it('should not have any null values', () => {
    // We expect all these to be replaced with actual verified numbers, never left null
    expect(TRUST_METRICS.googleRating).not.toBeNull();
    expect(TRUST_METRICS.googleReviewCount).not.toBeNull();
    expect(TRUST_METRICS.pilgrimsServed).not.toBeNull();
    expect(TRUST_METRICS.operatingSince).not.toBeNull();
    expect(TRUST_METRICS.lastVerified).not.toBeNull();
  });
});
