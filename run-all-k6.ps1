$files = Get-ChildItem -Path ".\test\" -Filter *.js

foreach ($file in $files) {
    Start-Process powershell -ArgumentList "--% k6 run $($file.FullName); pause"
    Start-Sleep -Milliseconds 500
}
