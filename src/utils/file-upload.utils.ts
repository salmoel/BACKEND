import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (
    !file.originalname
      .trim()
      .toLowerCase()
      .match(/\.(jpg|jpeg|png|webp|gif)$/)
  ) {
    return callback(
      new Error('Somente arquivos de imagem são permitidos!'),
      false
    );
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

export function nameAdjustment(file): string {
  const name = file.originalname.split('.')[0];
  let nameEdited = name;

  console.log(`NOME SEM AJUSTE >:: ${nameEdited} ::< ${nameEdited}`);

  if (nameEdited.indexOf('@') > -1) {
    const withoutarroba = nameEdited.replace(/@/g, '');
    // console.log(`O Nome editado sem @ ${withoutarroba}`)
    nameEdited = withoutarroba;
  }
  if (nameEdited.indexOf('(') > -1) {
    const withLeftParentheses = nameEdited.replace(/@/g, '');
    // console.log(`O Nome editado sem @ ${withoutarroba}`)
    nameEdited = withLeftParentheses;
  }
  if (nameEdited.indexOf(')') > -1) {
    const withRightParentheses = nameEdited.replace(/@/g, '');
    // console.log(`O Nome editado sem @ ${withoutarroba}`)
    nameEdited = withRightParentheses;
  }

  if (nameEdited.indexOf('-') > -1) {
    const withoutdashes = nameEdited.replace(/-/g, '');
    // console.log(`O Nome editado sem - ${withoutdashes}`)
    nameEdited = withoutdashes;
  }

  if (nameEdited.indexOf(' ') > -1) {
    const nameWithoutSpace = nameEdited.replace(/ /g, '');
    // console.log(`O Nome editado sem ESPAÇOS ${nameWithoutSpace}`)
    nameEdited = nameWithoutSpace;
  }

  if (nameEdited.indexOf('_') > -1) {
    const nameWithoutUnderline = nameEdited.replace(/_/g, '');
    // console.log(`O Nome editado sem _ ${nameWithoutUnderline}`)
    nameEdited = nameWithoutUnderline;
    return nameEdited;
  }
  console.log(`NOME AJUSTADO >:: ${nameEdited} ::<`);

  return nameEdited;
}
