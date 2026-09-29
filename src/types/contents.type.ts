// src/types/content.types.ts
//
// Shared shapes for every data file under src/data/. Nothing here holds
// display text directly — every "displayName" and every value inside
// "fields" is an i18n KEY (e.g. "personas.parents.displayName"), resolved
// with t() at render time. This is what lets one component render a
// persona, an occupation, or a country card in English/Tamil/Hindi with
// zero extra code.

export type SupportedLanguage = 'en' | 'ta' | 'hi';

/**
 * A single condition rule attached to one field, e.g.
 * { "warnIfRainChanceAbove": 50 } or { "skipIfRainChanceAbove": 60 }.
 * The key names are read by whoever writes the weather-logic evaluator —
 * they are not enforced by TypeScript here, since each persona/occupation
 * uses different rule shapes.
 */
export type ConditionRule = Record<string, number>;

/** One persona's homepage content (Parents, Agriculture, Commuters, Event Planners). */
export interface PersonaContent {
  personaId: string;
  /** i18n key for the persona's display name */
  displayName: string;
  /** icon identifier used by the UI's icon set */
  iconKey: string;
  /** UI-facing field name -> i18n key. Always includes "headline". */
  fields: Record<string, string>;
  /** optional: which fields should react to live weather data, and how */
  conditionLogic?: Record<string, ConditionRule>;
}

/** One universal-occupation entry (fisherman, vendor, etc.). */
export interface OccupationContent {
  occupationId: string;
  displayName: string;
  iconKey: string;
  fields: Record<string, string>;
  conditionLogic?: Record<string, ConditionRule>;
}

/** One row of the foreigner climate-comparison dataset. */
export interface CountryComparisonContent {
  countryCode: string;
  /** i18n key for the country's display name */
  displayName: string;
  flagEmoji: string;
  fields: Record<string, string>;
  /** raw numeric data — not translated, rendered with the app's own number formatting */
  climateData: {
    avgSummerTempC: number;
    avgWinterTempC: number;
  };
}
