import crypto from 'crypto';
import dotenv from 'dotenv';

const IV_LENGTH = 16;
const SECRET_KEY = Buffer.from(process.env.FULL_TEXT_ENCRYPTION_KEY, 'hex');

/**
 * @description encrypt text using AES-256-GCM
 * @param text - text to encrypt
 * @returns - iv, encrypted, authTag
 */
export function aes256Encrypt(text: string) {
  dotenv.config();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-gcm', SECRET_KEY, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  // iv, authTag, 암호문을 모두 저장해야 복호화 가능
  return {
    iv: iv.toString('hex'),
    encrypted,
    authTag,
  };
}

/**
 * @description decrypt text using AES-256-GCM
 * @param iv - initialization vector
 * @param encrypted - encrypted text
 * @param authTag - authentication tag
 * @returns - decrypted text
 */
export function aes256Decrypt({
  iv,
  encrypted,
  authTag,
}: {
  iv: string;
  encrypted: string;
  authTag: string;
}) {
  dotenv.config();
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    SECRET_KEY,
    Buffer.from(iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
