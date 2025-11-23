# Import countries from countries.json to MongoDB via API

$jsonContent = Get-Content -Path "countries.json" -Raw | ConvertFrom-Json
$countries = $jsonContent.countries

Write-Host "Importing $($countries.Count) countries..." -ForegroundColor Cyan

foreach ($country in $countries) {
    $body = @{
        name = $country.name
        continent = $country.continent
        navy_founded = $country.navy_founded
        capital = $country.capital
        biggest_naval_battle = $country.biggest_naval_battle
    } | ConvertTo-Json

    try {
        $response = Invoke-WebRequest -Uri 'http://localhost:3000/api/countries' `
            -Method POST `
            -Body $body `
            -ContentType 'application/json' `
            -UseBasicParsing
        
        $result = $response.Content | ConvertFrom-Json
        Write-Host "Created: $($result.name) (ID: $($result._id))" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to create: $($country.name)" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Import complete! Verifying..." -ForegroundColor Cyan

# Verify import
$allCountries = Invoke-WebRequest -Uri 'http://localhost:3000/api/countries' -Method GET -UseBasicParsing
$countriesArray = $allCountries.Content | ConvertFrom-Json

Write-Host "Total countries in database: $($countriesArray.Count)" -ForegroundColor Yellow
