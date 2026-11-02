/**
 * ARGUS & Co. — Deductive Engine Compatibility Layer
 * Delegates all analysis to the universalCaseAnalyzer.
 */

import { extractCaseEntities, generateUniversalCaseDeductions, generateExpansiveCluesWeb } from './universalCaseAnalyzer.js';

export const scanCaseEntities = extractCaseEntities;
export const generateFactualBureauDeductions = generateUniversalCaseDeductions;
export { extractCaseEntities, generateUniversalCaseDeductions, generateExpansiveCluesWeb };
