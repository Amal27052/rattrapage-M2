import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import { Button } from './Button';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  title?: string;
  onDownload?: () => void;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 250,
  title,
  onDownload,
}) => {
  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-code-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {title && (
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      )}
      
      <div className="bg-white p-6 rounded-xl border-4 border-primary shadow-lg">
        <QRCodeSVG
          id="qr-code-svg"
          value={value}
          size={size}
          level="H"
          includeMargin
        />
      </div>

      <Button
        variant="primary"
        size="md"
        className="mt-6"
        onClick={downloadQRCode}
      >
        <Download size={18} className="mr-2" />
        Télécharger le QR Code
      </Button>
    </div>
  );
};
