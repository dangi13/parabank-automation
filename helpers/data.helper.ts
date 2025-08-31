// helpers/data.helper.ts
import { faker } from '@faker-js/faker';
import { User } from '../types/user';
import { Payee } from '../types/payee';

/**
 * @returns A randomly generated user object with realistic data.
 */
export function createRandomUser(overrides?: Partial<User>): User {
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
  const username = uniqueId.substring(0, 15);
  const address = faker.location.streetAddress();
  const city = faker.location.city();
  const state = faker.location.state({ abbreviated: true });
  const zipCode = faker.location.zipCode();
  const phone = faker.phone.number();
  const ssn = faker.string.numeric({ length: 9, allowLeadingZeros: true });
  const password = faker.internet.password({ length: 12 });

  const user = {
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    phone,
    ssn,
    username,
    password,
  };

    const mergedUser = overrides ? { ...user, ...overrides } : user;
    console.log('Generated User Data:', JSON.stringify(mergedUser));

    return mergedUser;
}


  export function createRandomPayee(overrides?: Partial<Payee>): Payee {
    const basePayee = {
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode(),
      phone: faker.phone.number(),
      accountNumber: faker.string.numeric({ length: 5 }),
      amount: faker.number.int({ min: 1, max: 500 }).toString(), // The amount is now a string,
    };

    // Merge the base payee object with any provided overrides
    const mergedPayee = overrides ? { ...basePayee, ...overrides } : basePayee;
    console.log('Generated payee data:', JSON.stringify(mergedPayee));

    return mergedPayee;
  }

