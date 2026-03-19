
$icons = @(
    @{ Name = "mpesa.png"; Url = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" },
    @{ Name = "tigopesa.png"; Url = "https://techweez.com/wp-content/uploads/2016/02/tigo-pesa-1-1024x1024.png" },
    @{ Name = "visa.png"; Url = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/512px-Visa_Inc._logo.svg.png" },
    @{ Name = "mastercard.png"; Url = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/512px-Mastercard-logo.svg.png" }
)

mkdir public\images\payment -Force

foreach ($icon in $icons) {
    $dest = "public\images\payment\" + $icon.Name
    Write-Host "Downloading $($icon.Name)..."
    try {
        Invoke-WebRequest -Uri $icon.Url -OutFile $dest
        Write-Host "Success: $($icon.Name)"
    } catch {
        Write-Host "Failed: $($icon.Name)"
    }
}
