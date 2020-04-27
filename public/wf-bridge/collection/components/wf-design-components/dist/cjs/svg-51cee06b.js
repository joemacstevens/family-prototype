'use strict';

const getPathByNameSize = (name, size) => {
    return window.config.assets[`${name}-${size}`];
};
const getAssetFilePath = (name) => {
    const path = window.config.assets[name];
    if (!path) {
        throw new Error(`Path for ${name} icon is not defined.`);
    }
    return path;
};
const getFileContent = async (path) => {
    const response = await fetch(path);
    if (response.status !== 200) {
        throw new Error(`Cannot find file under provided path.`);
    }
    return response.text();
};
const getIconBody = async (assetName, size) => {
    let assetPath;
    if (!assetName)
        return;
    if (size) {
        assetPath = getPathByNameSize(assetName, size);
    }
    if (!assetPath) {
        assetPath = getAssetFilePath(assetName);
    }
    return getFileContent(assetPath);
};

exports.getIconBody = getIconBody;
