import { defaultNS, resources } from "i18n/i18n";
import "i18next";
type Resources = (typeof resources)["en"];
type DefaultNS = typeof defaultNS;
declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: DefaultNS;
    // custom resources type
    resources: Resources;
  }
}
