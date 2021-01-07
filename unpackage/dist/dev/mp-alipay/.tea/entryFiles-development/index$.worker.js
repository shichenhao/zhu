if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }

function success() {
require('../../app');
require('../../components/uni-segmented-control/uni-segmented-control?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/index/index?hash=c38b953af6bdab8fe399141b33dd1ad1ceb7ea7f');
require('../../pages/record/index?hash=3fca5d62f414b968fb323273f225426df56483a1');
require('../../pages/order/index?hash=c38b953af6bdab8fe399141b33dd1ad1ceb7ea7f');
require('../../pages/orderInfo/index?hash=c38b953af6bdab8fe399141b33dd1ad1ceb7ea7f');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}