$ErrorActionPreference = 'Stop'
$nodeCandidates = @((Get-Command node -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source), "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe")
$selectedNode = $null
foreach ($candidate in $nodeCandidates) {
  if ($candidate -and (Test-Path -LiteralPath $candidate)) {
    $version = (& $candidate -p 'process.versions.node')
    if ([version]$version -ge [version]'24.19.0' -and [version]$version -lt [version]'25.0.0') { $selectedNode = $candidate; break }
  }
}
if (-not $selectedNode) { throw 'Instala Node.js 24 LTS, versión 24.19.0 o posterior dentro de la rama 24.' }
$npmCandidates = @((Join-Path (Split-Path $selectedNode) 'node_modules\npm\bin\npm-cli.js'), 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js')
$npmCli = $npmCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $npmCli) { throw 'No se encontró npm; instala Node.js con npm.' }
$env:PATH = "$(Split-Path $selectedNode);$env:PATH"
$npmArgs = @($args)
# PowerShell consume el separador -- al invocar un script. Restáuralo para npm.
if ($npmArgs.Count -gt 2 -and $npmArgs[0] -eq 'run' -and $npmArgs[2] -ne '--') {
  $npmArgs = @($npmArgs[0], $npmArgs[1], '--') + $npmArgs[2..($npmArgs.Count - 1)]
}
if ($npmArgs.Count -gt 1 -and $npmArgs[0] -eq 'exec' -and $npmArgs[1] -ne '--') {
  $npmArgs = @('exec', '--') + $npmArgs[1..($npmArgs.Count - 1)]
}
Push-Location $PSScriptRoot
try { & $selectedNode $npmCli @npmArgs; exit $LASTEXITCODE } finally { Pop-Location }
