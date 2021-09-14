import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.trim().toLowerCase().match(/\.(jpg|jpeg|png|webp|gif)$/)) {
    return callback(new Error('Somente arquivos de imagem são permitidos!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = nameAdjustment(file);
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export function nameAdjustment(file): string{
  const name = file.originalname.split('.')[0];
  if (name.indexOf('@') > -1) {
    const withoutarroba = name.replace(/@/g,'')
    const withoutdashes = withoutarroba.replace(/-/g,'')
    const nameSemSpace = withoutdashes.replace(/ /g,'')
    return nameSemSpace
  }
  return name
}
  