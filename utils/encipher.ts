import CryptoJS from 'crypto-js'

const secretKey = '0123456789abcdef0123456789abcdef'

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, secretKey).toString()
}

export const decrypt = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    if (!decryptedData) throw new Error('Decryption failed: Data is undefined')
    return decryptedData
  } catch (error) {
    console.error('Decryption error:', error)
    return ''
  }
}
