path=`dirname $0`
cd $path
if [ ! -d node_modules ];then
    npm install
fi
gulp