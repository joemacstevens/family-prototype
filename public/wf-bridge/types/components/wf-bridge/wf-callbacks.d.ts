declare const WFCallbacks: {
    savePersonalizationCallback: () => void;
    setBusyCallback: () => void;
    setSafeToCloseCallback: () => void;
    reloadPageCallback: () => void;
    logCallback: () => void;
    exportToCSVCallback: () => void;
    exportToPDFCallback: () => void;
    printPDFCallback: () => void;
    errorCallback: () => void;
    systemMessageCallback: () => void;
    setHeaderLayoutCallback: () => void;
    saveToFavoritesCallback: () => void;
    getActionMenuCallback: () => void;
    getWidgetDisclaimersCallback: () => void;
    setContextCallback: () => void;
    openPageCallback: () => void;
    loggedOutCallback: () => void;
    onComponentLoaded: () => void;
    saveWidgetStateCallback: () => void;
    logAuditCallback: () => void;
    findExistingFavoriteItemCallback: () => void;
    getActivePageLabelCallback: () => void;
    getContextDataCallback: () => void;
    removeFromFavoritesCallback: () => void;
    renameFavoriteItemCallback: () => void;
    reorderFavoriteCallback: () => void;
    addFavoriteItemsCallback: () => void;
    checkFencedStatusCallback: () => void;
    closeDialogCallback: () => void;
    displayWidgetDisclaimerCallback: () => void;
    getDefaultClientPageCallback: () => void;
    getEntitlementsCallback: () => void;
    getFavoriteItemsCallback: () => void;
    getNavItemByComponentNameCallback: () => void;
    getRecentItemsCallback: () => void;
    hideWidgetCallback: () => void;
    hideWidgetDisclaimerCallback: () => void;
    logSystemErrorCallback: () => void;
    showWidgetCallback: () => void;
    subscribeToMessageForwarderCallback: () => void;
    broadcastInMessageForwarderCallback: () => void;
    getWindowScreenTopCallback: () => void;
    getCurrentPageIdCallback: () => void;
};
export default WFCallbacks;
