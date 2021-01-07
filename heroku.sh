cd lol-heimer-frontend ;\
echo "start npm install";\
npm install ;\
echo "end npm install";\
echo "================";\
echo "start build";\
npm run build ;\
mv ./lol-heimer-frontend/build/index.html ./application/views/home.html ;\
mv ./lol-heimer-frontend/build/* ./ ;\
