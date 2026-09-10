Add-Type -AssemblyName System.Drawing

$sourceRoot = 'C:\Users\Amruth Nanjangud\Downloads'
$outputRoot = Join-Path $PSScriptRoot '..\assets\certificates'
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

$jobs = @(
  [pscustomobject]@{
    Source = 'WhatsApp Image 2026-08-30 at 8.52.12 PM.jpeg'
    Output = 'certificate-jyotish-parishad.jpg'
    Rotate = 'None'
    Crop = [System.Drawing.Rectangle]::new(18, 24, 1135, 1485)
  }
  [pscustomobject]@{
    Source = 'WhatsApp Image 2026-08-30 at 8.51.09 PM.jpeg'
    Output = 'certificate-psychological-testing.jpg'
    Rotate = 'None'
    Crop = [System.Drawing.Rectangle]::new(72, 70, 1458, 1042)
  }
  [pscustomobject]@{
    Source = 'WhatsApp Image 2026-08-30 at 8.52.11 PM (1).jpeg'
    Output = 'certificate-jyotish-marathi-one.jpg'
    Rotate = 'Rotate270'
    Crop = [System.Drawing.Rectangle]::new(24, 24, 1148, 1530)
  }
  [pscustomobject]@{
    Source = 'WhatsApp Image 2026-08-30 at 8.52.11 PM.jpeg'
    Output = 'certificate-jyotish-marathi-two.jpg'
    Rotate = 'Rotate270'
    Crop = [System.Drawing.Rectangle]::new(28, 24, 1140, 1530)
  }
  [pscustomobject]@{
    Source = 'WhatsApp Image 2026-09-06 at 5.11.38 PM.jpeg'
    Output = 'certificate-inner-reset.jpg'
    Rotate = 'None'
    Crop = [System.Drawing.Rectangle]::new(0, 546, 720, 509)
  }
)

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$quality = [System.Drawing.Imaging.EncoderParameters]::new(1)
$quality.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
  [System.Drawing.Imaging.Encoder]::Quality,
  [long]92
)

foreach ($job in $jobs) {
  $sourcePath = Join-Path $sourceRoot $job.Source
  $outputPath = Join-Path $outputRoot $job.Output
  $source = [System.Drawing.Bitmap]::new($sourcePath)
  try {
    if ($job.Rotate -eq 'Rotate90') {
      $source.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)
    }
    elseif ($job.Rotate -eq 'Rotate270') {
      $source.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)
    }

    $crop = $job.Crop
    $cropped = [System.Drawing.Bitmap]::new($crop.Width, $crop.Height)
    try {
      $cropGraphics = [System.Drawing.Graphics]::FromImage($cropped)
      try {
        $cropGraphics.Clear([System.Drawing.Color]::White)
        $cropGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $cropGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $cropGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $cropGraphics.DrawImage($source, [System.Drawing.Rectangle]::new(0, 0, $crop.Width, $crop.Height), $crop, [System.Drawing.GraphicsUnit]::Pixel)
      }
      finally {
        $cropGraphics.Dispose()
      }

      $cleaned = [System.Drawing.Bitmap]::new($crop.Width, $crop.Height)
      try {
        $cleanGraphics = [System.Drawing.Graphics]::FromImage($cleaned)
        try {
          $cleanGraphics.Clear([System.Drawing.Color]::White)
          $cleanGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
          $cleanGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
          $cleanGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
          $cleanGraphics.DrawImage($cropped, 0, 0, $crop.Width, $crop.Height)
        }
        finally {
          $cleanGraphics.Dispose()
        }
        $cleaned.Save($outputPath, $encoder, $quality)
      }
      finally {
        $cleaned.Dispose()
      }
    }
    finally {
      $cropped.Dispose()
    }
  }
  finally {
    $source.Dispose()
  }
}
