import slugify from "slugify";

export const transformLocationName = (name: string): string => slugify(name, {
    lower: true,
    trim: true,
    strict: true
});