import { useQRCode } from 'next-qrcode';

export default function QRCode({ url, width }) {
  const { Image } = useQRCode();

  return (
    <Image
      text={url}
      options={{
        type: 'image/jpeg',
        quality: 1,
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: !!width ? width : 200,
        color: {
          dark: '#000',
          light: '#FFFFFF',
        },
      }}
    />
  );
}