import {expect as baseExpect } from '@playwright/test';
import { mergeTests } from '@playwright/test';
import {  authFixtures } from './auth.fixture';
import {  pageObjectFixtures } from './pageObjects.fixture';
import {  apiFixtures } from './api.fixtures';


export const test = mergeTests(authFixtures, pageObjectFixtures, apiFixtures);

export const expect = baseExpect;