rm -rf site/dist/
webpack --config webpack.config.site.js --progress
# files=( site/dist/* )
# echo "${files[@]}"
# text="<html>
#   <head>
#     <title>React Pluggable Layout</title>
#     $manifest
#     <script>
#     //<![CDATA[
#     window.webpackManifest = $manifest
#     //]]>
#     </script>
#   </head>
#   <body>
#     ${files[@]}
#   </body>
# </html>"

# echo "$text" > test.html