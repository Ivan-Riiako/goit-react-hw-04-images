export default function imagesArreyNormalaize(arrayImages) {
  const {
    data: { totalHits, hits: arrayPictures },
  } = arrayImages;
  const totalPage = Math.ceil(totalHits / 12);
  return { arrayPictures, totalPage };
}
