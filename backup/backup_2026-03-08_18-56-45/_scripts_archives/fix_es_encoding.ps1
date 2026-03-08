$files = Get-ChildItem -Path "c:\Users\danie\OneDrive\Desktop\univers-livre" -Filter "faq-es.html" -File
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    $content = $content -replace 'Ã³', 'ó'
    $content = $content -replace 'Ã¡', 'á'
    $content = $content -replace 'Ã©', 'é'
    $content = $content -replace 'Ã­', 'í'
    $content = $content -replace 'Ãº', 'ú'
    $content = $content -replace 'Ã±', 'ñ'
    $content = $content -replace 'Ã', 'à'  
    $content = $content -replace 'Ãˆ', 'È'
    $content = $content -replace 'ÃŠ', 'Ê'
    $content = $content -replace 'Ã€', 'À'
    $content = $content -replace 'Ã§', 'ç'
    $content = $content -replace 'Ã´', 'ô'
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Fixed $($file.Name)"
}
