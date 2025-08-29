// helpers/data.helper.ts
import { faker } from '@faker-js/faker';
import { User } from '../types/user';

/**
 * We try to ensure that the generated username does not exceed 15 characters.
 * This is a common constraint in many systems.
 * The username is constructed from the first and last names, plus a unique suffix.
 * We truncate the names if necessary to fit within this limit.
 * @returns A randomly generated user object with realistic data.
 */
export function createRandomUser(): User {
  // Generate a unique suffix using a portion of the current timestamp.
  const uniqueSuffix = Date.now().toString().slice(-4); 

  // Generate raw first and last names.
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();

  // Ensure neither name is empty.
  if (!firstName) firstName = 'FN'; 
  if (!lastName) lastName = 'LN'; 

  // Calculate available length for the names after including the unique suffix.
  const maxNameLength = 15;
  const availableLength = maxNameLength - uniqueSuffix.length - 1; // -1 for the separator

  // Truncate names to fit within the available length.
  // We'll split the available length, giving a bit more to the first name.
  const firstHalfLength = Math.floor(availableLength / 2);
  const secondHalfLength = availableLength - firstHalfLength;
  
  const finalFirstName = `${firstName.slice(0, firstHalfLength)}`;
  const finalLastName = `${lastName.slice(0, secondHalfLength)}`;

  const finalUsername = `${finalFirstName}.${finalLastName}.${uniqueSuffix}`;
  
  // Ensure the username does not exceed 15 characters, as it's a common constraint.
  const username = finalUsername.slice(0, maxNameLength); 

  const address = faker.location.streetAddress();
  const city = faker.location.city();
  const state = faker.location.state({ abbreviated: true });
  const zipCode = faker.location.zipCode();
  const phone = faker.phone.number();
  const ssn = faker.string.numeric({ length: 9, allowLeadingZeros: true });
  const password = faker.internet.password({ length: 12 });

  const user = {
    firstName: finalFirstName,
    lastName: finalLastName,
    address,
    city,
    state,
    zipCode,
    phone,
    ssn,
    username,
    password,
  };

  console.log('Generated User Data:', JSON.stringify(user));

  return user;
}