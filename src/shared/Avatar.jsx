import defaultImg from '../assets/images.jpg';

export default function Avatar({ src, alt = 'avatar', className = '' }) {
  const imgSrc = src || defaultImg;
  return (
    <img src={imgSrc} alt={alt} className={"object-cover " + className} />
  );
}
