if [ ! -d "dist" ]; then
  mkdir dist
  mkdir dist/monaco-editor
fi
if [ ! -d "dist/monaco-editor" ]; then
  mkdir dist/monaco-editor
fi
cp -r assets dist/
