if [ ! -d "dist" ]; then
  mkdir dist
  mkdir dist/monaco-editor
fi
if [ ! -d "dist/monaco-editor" ]; then
  mkdir dist/monaco-editor
fi
cp -r node_modules/monaco-editor/min/vs/ dist/monaco-editor/vs
cp -r assets dist/
