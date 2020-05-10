commitID=$(git log --format="%H" -n 1)
cat entry.user.js | sed -e "s/cakeresume-html-editor\/[0-9a-z]*\/index.user.js/cakeresume-html-editor\/$commitID\/index.user.js/g" > temp
mv temp entry.user.js
