$dir = "c:\Users\danie\OneDrive\Desktop\univers-livre"
$files = Get-ChildItem -Path $dir -Filter "*.html" -File -Recurse
$count = 0

foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw -Encoding UTF8
    $original = $content
    
    $content = $content -replace 'Ã³', 'ó'
    $content = $content -replace 'Ã¡', 'á'
    $content = $content -replace 'Ã©', 'é'
    $content = $content -replace 'Ã­', 'í'
    $content = $content -replace 'Ãº', 'ú'
    $content = $content -replace 'Ã±', 'ñ'
    $content = $content -replace 'Ãˆ', 'È'
    $content = $content -replace 'ÃŠ', 'Ê'
    $content = $content -replace 'Ã€', 'À'
    $content = $content -replace 'Ã§', 'ç'
    $content = $content -replace 'Ã´', 'ô'
    $content = $content -replace 'Ã¢', 'â'
    $content = $content -replace 'Ã®', 'î'
    $content = $content -replace 'Ã¯', 'ï'
    $content = $content -replace 'Ã¹', 'ù'
    $content = $content -replace 'Ã»', 'û'
    $content = $content -replace 'Ã‰', 'É'
    $content = $content -replace 'Ã‡', 'Ç'
    $content = $content -replace 'Ã¿', 'ÿ'
    $content = $content -replace 'Ãœ', 'Ü'
    $content = $content -replace 'Ã¼', 'ü'
    $content = $content -replace 'Ã‘', 'Ñ'
    $content = $content -replace 'Â´', '´'
    $content = $content -replace 'Â«', '«'
    $content = $content -replace 'Â»', '»'
    $content = $content -replace 'â€™', '’'
    $content = $content -replace 'â€œ', '“'
    $content = $content -replace 'â€ ', '”'
    $content = $content -replace 'â€”', '—'
    $content = $content -replace 'â€“', '–'
    $content = $content -replace 'â€¦', '…'
    $content = $content -replace 'Ã ', 'à'
    $content = $content -replace 'Ã¨', 'è'
    $content = $content -replace 'Ã', 'à' # Fallback for naked Ã

    if ($content -cne $original) {
        Set-Content -Path $f.FullName -Value $content -Encoding UTF8
        Write-Host "Fixed $($f.Name)"
        $count++
    }
}
Write-Host "Total fixed: $count"
