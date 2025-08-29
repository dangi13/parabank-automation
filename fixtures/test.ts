import {expect as baseExpect } from '@playwright/test';
import { mergeTests } from '@playwright/test';

import {  authFixtures } from './auth.fixture';
import {  pageObjectFixtures } from './page-objects';
import {  apiFixtures } from './api-fixtures';

export const test = mergeTests(authFixtures, pageObjectFixtures, apiFixtures);

export const expect = baseExpect;