export const phoneNoRegex = /^\d{10}$/;
export const CharRegex =
    /[a-zA-Z]/;
export const upperCharRegex =
    /[A-Z]/;
export const lowerCharRegex =
    /[a-z]/;
export const numberRegex = /\d/;
export const specialcharRegex = /[!@#$%^&.*+?^${}()|[\]\\]/
export const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?!@#$%^&*()_-]).{8,15}$/;

export function isMobileValid(number: string) {
    return phoneNoRegex.test(number);
}

export function isaplhanumeric(value: string) {
    return numberRegex.test(value) && CharRegex.test(value);
}

export function upperandlowercase(value: string) {
    return upperCharRegex.test(value) && lowerCharRegex.test(value);
}

export function specialchar(value: string) {
    return specialcharRegex.test(value);
}

export function password(value: string) {
    return passwordRegex.test(value);
}