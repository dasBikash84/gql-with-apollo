import { prisma } from "../../aerd_resolver";

/**
 * Retrieves multiple records from the specified model with pagination.
 *
 * @param {string} model - The name of the model to query.
 * @param {Object} args - The arguments for the query.
 * @param {number} [args.skip=0] - The number of records to skip.
 * @param {number} [args.take=10] - The number of records to retrieve.
 * @returns {Promise<Array>} A promise that resolves to an array of records.
 */
export const findManyWithPagination = async (model, args) => {
  const { skip = 0, take = 10 } = args || {};
  return await prisma[model].findMany({
    take: +take,
    skip: +skip,
  });
};

/**
 * Finds a unique record in the specified model based on the given field name and value.
 *
 * @param {string} model - The name of the model to search in.
 * @param {string} fieldName - The name of the field to search by.
 * @param {any} argFieldVal - The value of the field to search for.
 * @returns {Promise<Object|null>} - A promise that resolves to the found record or null if no record is found.
 */
export const findUnique = async (model, fieldName, argFieldVal) => {
  return await prisma[model].findUnique({
    where: { [fieldName]: argFieldVal },
  });
};
