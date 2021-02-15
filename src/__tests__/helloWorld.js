const DEFAULT_NA = '-';
const getUnixTime = (value, defaultValue = DEFAULT_NA) => value ? new Date(value * 1000).toISOString() : defaultValue;

const SAMPLE = {
  CASE_1: '1642575267',
}

const EXPECTED_RESULT = {
  CASE_1: '2022-01-19T06:54:27.000Z',
}

describe('getUnixTime', () => {
  it(`test default value `, () => {
    expect(getUnixTime(null)).toEqual(DEFAULT_NA);
    expect(getUnixTime(null, 'Hello World')).toEqual('Hello World'); // replace another default value
  });

  it(`test unix time `, () => {
    expect(getUnixTime(SAMPLE.CASE_1)).toEqual(EXPECTED_RESULT.CASE_1);
  });
});
