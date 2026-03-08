$dirs = @("c:\Users\danie\OneDrive\Desktop\universdaniel\public", "c:\Users\danie\OneDrive\Desktop\univers-livre")
$win1252 = [System.Text.Encoding]::GetEncoding(1252)
$utf8 = [System.Text.Encoding]::UTF8

foreach ($dir in $dirs) {
    Write-Host "Restoring $dir..."
    $count = 0
    $files = Get-ChildItem -Path $dir -Filter "*.html" -File -Recurse
    foreach ($file in $files) {
        $content = [System.IO.File]::ReadAllText($file.FullName, $utf8)
        
        # If we see double encoded UTF-8 artifacts
        if ($content -match "Ã") {
            # Restore bytes
            $bytes = $win1252.GetBytes($content)
            $fixedContent = $utf8.GetString($bytes)
            
            # Write back
            [System.IO.File]::WriteAllText($file.FullName, $fixedContent, $utf8)
            Write-Host "Restored $($file.Name)"
            $count++
        }
    }
    Write-Host "Total restored in $dir: $count"
}
