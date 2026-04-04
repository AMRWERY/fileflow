import { defineRule, configure } from "vee-validate";
import { required, email, min, max, digits, regex } from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  // ── Built-in rules ────────────────────────────────────────────────────────
  defineRule("required", required);
  defineRule("email", email);
  defineRule("min", min);
  defineRule("max", max);
  defineRule("digits", digits);
  defineRule("regex", regex);

  // ── Custom rules ──────────────────────────────────────────────────────────

  // ── Global message generator ──────────────────────────────────────────────
  configure({
    generateMessage: (ctx) => {
      // @ts-ignore
      const t: any = nuxtApp.$t || nuxtApp.vueApp?.config?.globalProperties?.$t;

      const params = (ctx.rule?.params as unknown[]) ?? [];
      // ctx.field is the label passed to useField (already human-readable, e.g. "Email")
      const field = ctx.field;

      // Helper: try i18n key first, fall back to the English string
      const msg = (i18nKey: string, fallback: string): string => {
        if (t && typeof t === "function") {
          try {
            return t(i18nKey, { field, length: params[0] });
          } catch {
            return fallback;
          }
        }
        return fallback;
      };

      switch (ctx.rule?.name) {
        case "required":
          return msg("auth.required", `${field} is required`);
        case "email":
          return msg("auth.email", `${field} must be a valid email address`);
        case "min":
          return msg("auth.min", `${field} must be at least ${params[0]} characters`);
        case "max":
          return msg("auth.max", `${field} must be at most ${params[0]} characters`);
        case "digits":
          return msg("auth.digits", `${field} must be exactly ${params[0]} digits`);
        case "regex":
          return msg("auth.regex", `${field} format is invalid`);
        case "egyptian_mobile":
          return msg("auth.egyptian_mobile", `${field} must be a valid Egyptian mobile number`);
        case "arabic_english":
          return msg("auth.arabic_english", `${field} must contain only Arabic or English letters`);
        default:
          return msg("auth.invalid", `${field} is invalid`);
      }
    },
  });
});
