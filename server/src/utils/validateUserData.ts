export function validateEmail(email: string): RegExpMatchArray {
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.toString().match(emailRegex);
}

export function validateName(name: string): RegExpMatchArray {
  return name
    .toString()
    .match(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/);
}
