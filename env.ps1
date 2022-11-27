$path_array = @('proxy')
foreach ($path in $path_array) {
    $fullpath = $PSScriptRoot + "\" + $path
    $env:Path += (';' + $fullpath)  
}