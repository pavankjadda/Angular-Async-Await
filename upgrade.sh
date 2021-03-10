git add .
git commit -m "Before Upgrade"
git push origin master
npm update
npm install typescript@4.1.5 --save
git add .
git commit -m "After Upgrade"
