import _ from 'lodash';

import { updateAssetState } from './actions';

class AssetManager {
  constructor(SupClient, dispatch) {
    this.SupClient = SupClient;
    this.storeDispatch = dispatch;
    _.bindAll(this, 'invoke', 'dispatch');
    this.connect();
  }

  connect() {
    this.socket = this.SupClient.connect(this.SupClient.query.project);
    this.socket.on('connect', (...args) => this.onConnect(...args));
    this.socket.on('disconnect', (...args) => this.onDisonnect(...args));
  }

  onConnect() {
    this.projectClient = new this.SupClient.ProjectClient(this.socket);
    this.projectClient.subAsset(this.SupClient.query.asset, 'dependencyBundle', {
      onAssetReceived: (...args) => this.onAssetReceived(...args),
      onAssetEdited: (...args) => this.onAssetEdited(...args),
      onAssetTrashed: (...args) => this.onAssetTrashed(...args),
    });
  }

  onDisconnect(...args) {
    this.SupClient.onDisconnected(...args);
  }

  onAssetReceived(assetId, asset) {
    this.storeDispatch(updateAssetState(asset.pub.state));
  }

  onAssetEdited(assetId, methodName, action) {
    this.storeDispatch(Object.assign(action), {
      meta: {
        ...(action.meta || {}),
        assetId,
        methodName,
      },
    });
  }

  onAssetTrashed(...args) {
    this.SupClient.onAssetTrashed(...args);
  }

  invoke(methodName, ...args) {
    return new Promise((resolve, reject) => {
      this.socket.emit('edit:assets', this.SupClient.query.asset, methodName, ...args, (err, res) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(res);
        }
      });
    });
  }

  dispatch(action) {
    return this.invoke('dispatch', action);
  }
}

export default AssetManager;
