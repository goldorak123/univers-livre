$apiKey = "bf45c490714748199745172635489012"
$apiEndpoint = "https://api.indexnow.org/indexnow"

# --- Configuration pour simonlero.com ---
$host1 = "www.simonlero.com"
$keyLocation1 = "https://$host1/$apiKey.txt"
$urlList1 = @(
    "https://www.simonlero.com/",
    "https://www.simonlero.com/index.html",
    "https://www.simonlero.com/livre-accueil.html",
    "https://www.simonlero.com/livre-accueil-en.html",
    "https://www.simonlero.com/livre-accueil-es.html",
    "https://www.simonlero.com/livre.html",
    "https://www.simonlero.com/livre-en.html",
    "https://www.simonlero.com/livre-es.html",
    "https://www.simonlero.com/distribution.html",
    "https://www.simonlero.com/distribution-en.html",
    "https://www.simonlero.com/distribution-es.html",
    "https://www.simonlero.com/contact.html",
    "https://www.simonlero.com/contact-en.html",
    "https://www.simonlero.com/contact-es.html",
    "https://www.simonlero.com/resume.html",
    "https://www.simonlero.com/resume-en.html",
    "https://www.simonlero.com/resume-es.html"
)

$body1 = @{
    host = $host1
    key = $apiKey
    keyLocation = $keyLocation1
    urlList = $urlList1
} | ConvertTo-Json

# --- Fonction de soumission ---
function Submit-IndexNow {
    param (
        [string]$Domain,
        [string]$JsonBody
    )
    
    Write-Host "Soumission des URL pour $Domain..." -ForegroundColor Cyan
    try {
        $response = Invoke-RestMethod -Uri $apiEndpoint -Method Post -Body $JsonBody -ContentType "application/json; charset=utf-8" -ErrorAction Stop
        Write-Host "Succès ! Réponse : $response" -ForegroundColor Green
    }
    catch {
        Write-Host "Erreur lors de la soumission pour $Domain. Code de statut : $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        Write-Host "Détails : $($_.Exception.Message)" -ForegroundColor Red
    }
}

# --- Exécution ---
Submit-IndexNow -Domain $host1 -JsonBody $body1

Write-Host "`nSoumission terminée pour simonlero.com." -ForegroundColor Yellow
