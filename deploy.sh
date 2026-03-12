[ $# -lt 1 ] && { echo "usage: ./deploy.sh \"{commit message}\""; exit 1; }
npm run build || { echo "❌ npm build failed"; exit 1; }
git add .
git commit -m "$*"
git checkout main || { echo "❌ Errore: Checkout su main fallito. Fai il cazzo di commit prima."; exit 1; }
git rm -rf .
git checkout development -- build
git checkout development -- CNAME
git checkout development -- .gitignore
mv build/* .
rmdir build
git add .
git commit -m "$*"
git checkout development
