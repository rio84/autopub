#!/bin/bash
## curl -o seed.sh https://raw.githubusercontent.com/rio84/autopub/master/bin/seed.sh
## sh seed.sh
## rm seed.sh
DIR=./tmp-autopub-239884
INSTALL_PATH=/var/www
TAR_NAME=autopub.tar.gz
if [ x$1 != x ]
then
    INSTALL_PATH=$1
fi
mkdir $DIR
echo "install dir is: "$INSTALL_PATH
curl -o $DIR/$TAR_NAME https://codeload.github.com/rio84/autopub/tar.gz/master

tar -xvf $DIR/$TAR_NAME -C $DIR

rm -f $DIR/$TAR_NAME

mv $DIR/* $INSTALL_PATH/autopub
rm -fr $DIR
cd $INSTALL_PATH/autopub
echo "NPM installing..."
npm install
echo "starting app.js. log to './autopub.log'"
node app.js > autopub.log &

echo "DONE"



