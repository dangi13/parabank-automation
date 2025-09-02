import { expect } from '@playwright/test';

export class DateHelper {

 public validateApiTimestampIsCurrentDayUTC(apiTimestamp: number): void {
    const nowUtc = new Date(Date.now());
    
    // 2. Set the time components to zero to get the start of the current day in UTC
    const startOfCurrentDayUtc = Date.UTC(
      nowUtc.getUTCFullYear(),
      nowUtc.getUTCMonth(),
      nowUtc.getUTCDate(),
      0, 0, 0, 0
    );
    
    // 3. Compare the API's timestamp with the calculated timestamp for the start of the current UTC day
    expect(apiTimestamp).toBe(startOfCurrentDayUtc);
  }
}