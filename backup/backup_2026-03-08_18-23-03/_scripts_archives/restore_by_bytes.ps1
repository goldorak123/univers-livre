$dirs = @("c:\Users\danie\OneDrive\Desktop\universdaniel\public", "c:\Users\danie\OneDrive\Desktop\univers-livre")
$count = 0

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) { continue }
    $files = Get-ChildItem -Path $dir -Filter "*.html" -File -Recurse
    foreach ($file in $files) {
        if ($file.FullName -match "backup|fix") { continue }
        
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $needsFix = $false
        
        for ($i=0; $i -lt ($bytes.Length - 1); $i++) {
            if ($bytes[$i] -eq 0xC3 -and $bytes[$i+1] -eq 0x83) {
                $needsFix = $true
                break
            }
        }
        
        if ($needsFix) {
            Write-Host "File needs fix: $($file.Name)"
            $content = [System.Text.Encoding]::UTF8.GetString($bytes)
            $win1252 = [System.Text.Encoding]::GetEncoding(1252)
            $origBytes = $win1252.GetBytes($content)
            $fixedContent = [System.Text.Encoding]::UTF8.GetString($origBytes)
            [System.IO.File]::WriteAllText($file.FullName, $fixedContent, [System.Text.Encoding]::UTF8)
            Write-Host "Restored $($file.Name)"
            $count++
        }
    }
}
Write-Host "Total restored by bytes: $count"
