// These values should NEVER change. If
// they do, we're no longer making ulids!
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford's Base32
const ENCODING_LEN = ENCODING.length;
const TIME_MAX = 2 ** 48 - 1;
const TIME_LEN = 10;
const RANDOM_LEN = 16;

function generateRandomNumber() {
  const buffer = new Uint8Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / 0xff;
}

function randomChar(): string {
  let rand = Math.floor(generateRandomNumber() * ENCODING_LEN);
  if (rand === ENCODING_LEN) {
    rand = ENCODING_LEN - 1;
  }
  return ENCODING.charAt(rand);
}

function encodeTime(now: number, len: number): string {
  if (Number.isNaN(now)) {
    throw new Error(`${now} must be a number`);
  }
  if (now > TIME_MAX) {
    throw new Error(`Cannot encode time greater than ${TIME_MAX}`);
  }
  if (now < 0) {
    throw new Error("Time must be positive");
  }
  if (Number.isInteger(now) === false) {
    throw new Error("Time must be an integer");
  }

  let mod: number;
  let str = "";
  // biome-ignore lint: <explanation>
  for (; len > 0; len--) {
    mod = now % ENCODING_LEN;
    str = ENCODING.charAt(mod) + str;
    // biome-ignore lint: <explanation>
    now = (now - mod) / ENCODING_LEN;
  }
  return str;
}

export function decodeTime(id: string): number {
  if (id.length !== TIME_LEN + RANDOM_LEN) {
    throw new Error("Malformed ulid");
  }
  const time = id
    .substring(0, TIME_LEN)
    .split("")
    .reverse()
    .reduce((carry, char, index) => {
      const encodingIndex = ENCODING.indexOf(char);
      if (encodingIndex === -1) {
        throw new Error(`Invalid character found: ${char}`);
      }
      // biome-ignore lint: <explanation>
      return (carry += encodingIndex * ENCODING_LEN ** index);
    }, 0);
  if (time > TIME_MAX) {
    throw new Error("Malformed ulid, timestamp too large");
  }
  return time;
}

function encodeRandom(len: number): string {
  let str = "";
  // biome-ignore lint: <explanation>
  for (; len > 0; len--) {
    str = randomChar() + str;
  }
  return str;
}

export function ulid(seedTime?: number): string {
  const time = seedTime
    ? Number.isNaN(seedTime)
      ? Date.now()
      : seedTime
    : Date.now();

  return encodeTime(time, TIME_LEN) + encodeRandom(RANDOM_LEN);
}
