import { r as registerInstance, h, g as getElement } from './core-fff910a6.js';

const WFCallbacks = {
    savePersonalizationCallback: function savePersonalizationCallback() {
        console.log("savePersonalizationCallback is called");
    },
    setBusyCallback: function setBusyCallback() {
        console.log("setBusyCallback is called");
    },
    setSafeToCloseCallback: function setSafeToCloseCallback() {
        console.log("setSafeToCloseCallback is called");
    },
    reloadPageCallback: function reloadPageCallback() {
        console.log("reloadPageCallback is called");
    },
    logCallback: function logCallback() {
        console.log("logCallback is called");
    },
    exportToCSVCallback: function exportToCSVCallback() {
        console.log("exportToCSVCallback is called");
    },
    exportToPDFCallback: function exportToPDFCallback() {
        console.log("exportToPDFCallback is called");
    },
    printPDFCallback: function printPDFCallback() {
        console.log("printPDFCallback is called");
    },
    errorCallback: function errorCallback() {
        console.log("errorCallback is called");
    },
    systemMessageCallback: function systemMessageCallback() {
        console.log("systemMessageCallback is called");
    },
    setHeaderLayoutCallback: function setHeaderLayoutCallback() {
        console.log("setHeaderLayoutCallback is called");
    },
    saveToFavoritesCallback: function saveToFavoritesCallback() {
        console.log("saveToFavoritesCallback is called");
    },
    getActionMenuCallback: function getActionMenuCallback() {
        console.log("getActionMenuCallback is called");
    },
    getWidgetDisclaimersCallback: function getWidgetDisclaimersCallback() {
        console.log("getWidgetDisclaimersCallback is called");
    },
    setContextCallback: function setContextCallback() {
        console.log("setContextCallback is called");
    },
    openPageCallback: function openPageCallback() {
        console.log("openPageCallback is called");
    },
    loggedOutCallback: function loggedOutCallback() {
        console.log("loggedOutCallback is called");
    },
    onComponentLoaded: function onComponentLoaded() {
        console.log("onComponentLoaded is called");
    },
    saveWidgetStateCallback: function saveWidgetStateCallback() {
        console.log("saveWidgetStateCallback is called");
    },
    logAuditCallback: function logAuditCallback() {
        console.log("logAuditCallback is called");
    },
    findExistingFavoriteItemCallback: function findExistingFavoriteItemCallback() {
        console.log("findExistingFavoriteItemCallback is called");
    },
    getActivePageLabelCallback: function getActivePageLabelCallback() {
        console.log("getActivePageLabelCallback is called");
    },
    getContextDataCallback: function getContextDataCallback() {
        console.log("getContextDataCallback is called");
    },
    removeFromFavoritesCallback: function removeFromFavoritesCallback() {
        console.log("removeFromFavoritesCallback is called");
    },
    renameFavoriteItemCallback: function renameFavoriteItemCallback() {
        console.log("renameFavoriteItemCallback is called");
    },
    reorderFavoriteCallback: function reorderFavoriteCallback() {
        console.log("reorderFavoriteCallback is called");
    },
    addFavoriteItemsCallback: function addFavoriteItemsCallback() {
        console.log("addFavoriteItemsCallback is called");
    },
    checkFencedStatusCallback: function checkFencedStatusCallback() {
        console.log("checkFencedStatusCallback is called");
    },
    closeDialogCallback: function closeDialogCallback() {
        console.log("closeDialogCallback is called");
    },
    displayWidgetDisclaimerCallback: function displayWidgetDisclaimerCallback() {
        console.log("displayWidgetDisclaimerCallback is called");
    },
    getDefaultClientPageCallback: function getDefaultClientPageCallback() {
        console.log("getDefaultClientPageCallback is called");
    },
    getEntitlementsCallback: function getEntitlementsCallback() {
        console.log("getEntitlementsCallback is called");
    },
    getFavoriteItemsCallback: function getFavoriteItemsCallback() {
        console.log("getFavoriteItemsCallback is called");
    },
    getNavItemByComponentNameCallback: function getNavItemByComponentNameCallback() {
        console.log("getNavItemByComponentNameCallback is called");
    },
    getRecentItemsCallback: function getRecentItemsCallback() {
        console.log("getRecentItemsCallback is called");
    },
    hideWidgetCallback: function hideWidgetCallback() {
        console.log("hideWidgetCallback is called");
    },
    hideWidgetDisclaimerCallback: function hideWidgetDisclaimerCallback() {
        console.log("hideWidgetDisclaimerCallback is called");
    },
    logSystemErrorCallback: function logSystemErrorCallback() {
        console.log("logSystemErrorCallback is called");
    },
    showWidgetCallback: function showWidgetCallback() {
        console.log("showWidgetCallback is called");
    },
    subscribeToMessageForwarderCallback: function subscribeToMessageForwarderCallback() {
        console.log("subscribeToMessageForwarderCallback is called");
    },
    broadcastInMessageForwarderCallback: function broadcastInMessageForwarderCallback() {
        console.log("broadcastInMessageForwarderCallback is called");
    },
    getWindowScreenTopCallback: function getWindowScreenTopCallback() {
        console.log("getWindowScreenTopCallback is called");
    },
    getCurrentPageIdCallback: function getCurrentPageIdCallback() {
        console.log("getCurrentPageIdCallback is called");
    },
};

window.config = {
  presets: {
    drawerLeft: (position) => {
      const config = { start: 0, end: 0 };
      if (position !== 'top' && position !== 'bottom') {
        const header = document.querySelector('#header');
        const footer = document.querySelector('#footer');
        config.start = header ? header.getBoundingClientRect().bottom : 0;
        config.end = window.innerHeight - footer ? footer.getBoundingClientRect().top : 0;
      }
      return config;
    },
    drawerBottom: (position) => {
      const config = { start: 0, end: 0 };
      if (position !== 'left' && position !== 'right') {
        const sidebar = document.querySelector('#sidebar');
        config.start = sidebar.getBoundingClientRect().width;
        config.end = 0;
      }
      return config;
    },
  },
  agGridLicenseKey:
    '[TRIAL]_10_April_2020_[v2]_MTU4NjQ3NjgwMDAwMA==4723e223afba4b709ced674df3827698',
};

const waitUntilPresent = (selector) => {
  return new Promise((resolve) => {
    const id = setInterval(() => {
      const element = document.querySelector(selector);

      if (!element) {
        return;
      }

      clearInterval(id);
      resolve(element);
    }, 100);
  });
};

const waitUntilHydrated = (element) => {
  return new Promise((resolve) => {
    const id = setInterval(() => {
      if (!element.classList.contains('hydrated')) {
        return;
      }

      clearInterval(id);
      resolve();
    }, 100);
  });
};

const defineAlias = async (tagName, aliasName) => {
  const element = document.createElement(tagName);
  const body = await waitUntilPresent('body');

  element.style.display = 'none';
  body.append(element);

  await waitUntilHydrated(element);

  window.customElements.define(aliasName, class extends element.constructor {});

  element.remove();
};

const aliases = {
  'wf-accordion': 'brml-accordion',
  'wf-expansion-panel': 'brml-expansion-panel',
  'wf-action-icon': 'brml-action-icon',
  'wf-action-menu': 'brml-action-menu',
  'wf-amount-filter': 'brml-amount-filter',
  'wf-button': 'brml-button',
  'wf-calendar-picker': 'brml-calendar-picker',
  'wf-card-body': 'brml-card-body',
  'wf-card-footer': 'brml-card-footer',
  'wf-card-header-actions': 'brml-card-header-actions',
  'wf-card-header': 'brml-card-header',
  'wf-card-title': 'brml-card-title',
  'wf-card': 'brml-card',
  'wf-checkbox': 'brml-checkbox',
  'wf-chip-list': 'brml-chip-list',
  'wf-chip': 'brml-chip',
  'wf-columns-customizer': 'brml-columns-customizer',
  'wf-drawer': 'brml-drawer',
  'wf-dropdown': 'brml-dropdown',
  'wf-flyout': 'brml-flyout',
  'wf-icon': 'brml-icon',
  'wf-input': 'brml-input',
  'wf-stepper-input': 'brml-stepper-input',
  'wf-modal': 'brml-modal',
  'wf-multiselect-dropdown': 'brml-multiselect-dropdown',
  'wf-process-navigation': 'brml-process-navigation',
  'wf-radio-option': 'brml-radio-option',
  'wf-radio': 'brml-radio',
  'wf-reorder': 'brml-reorder',
  'wf-scrollbar': 'brml-scrollbar',
  'wf-select-option': 'brml-select-option',
  'wf-select': 'brml-select',
  'wf-spinner': 'brml-spinner',
  'wf-spy': 'brml-spy',
  'wf-switch': 'brml-switch',
  'wf-table': 'brml-table',
  'wf-tab-button': 'brml-tab-button',
  'wf-tabs': 'brml-tabs',
  'wf-textarea': 'brml-textarea',
  'wf-tooltip': 'brml-tooltip',
  'wf-tag': 'brml-tag',
};

(async () => {
  for (const [tagName, aliasName] of Object.entries(aliases)) {
    defineAlias(tagName, aliasName);
  }
})();

window.config = {
  ...(window.config ? window.config : {}),
  assets: {
    // common icons
    'wf-check': 'skins/ubs/icons/Mark-tick-24px.svg',
    'wf-check-xs': 'skins/ubs/icons/Mark-tick-16px.svg',
    'wf-check-sm': 'skins/ubs/icons/Mark-tick-24px.svg',
    'wf-close': 'skins/ubs/icons/Mark-close-24px.svg',
    'wf-close-xs': 'skins/ubs/icons/Mark-close-16px.svg',
    'wf-close-sm': 'skins/ubs/icons/Mark-close-24px.svg',
    'wf-action': 'skins/ubs/icons/Action-24px.svg',
    'wf-action-xs': 'skins/ubs/icons/Menu-more-16px.svg',
    'wf-action-sm': 'skins/ubs/icons/Action-24px.svg',
    'wf-arrow-down': 'skins/ubs/icons/Arrow-down-24px.svg',
    'wf-arrow-down-xs': 'skins/ubs/icons/Arrow-down-16px.svg',
    'wf-arrow-down-sm': 'skins/ubs/icons/Arrow-down-24px.svg',
    'wf-arrow-up': 'skins/ubs/icons/Arrow-up-24px.svg',
    'wf-arrow-up-xs': 'skins/ubs/icons/Arrow-up-16px.svg',
    'wf-arrow-up-sm': 'skins/ubs/icons/Arrow-up-24px.svg',
    'wf-arrow-left': 'skins/ubs/icons/Arrow-left-24px.svg',
    'wf-arrow-left-xs': 'skins/ubs/icons/Arrow-left-16px.svg',
    'wf-arrow-left-sm': 'skins/ubs/icons/Arrow-left-24px.svg',
    'wf-arrow-right': 'skins/ubs/icons/Arrow-right-24px.svg',
    'wf-arrow-right-xs': 'skins/ubs/icons/Arrow-right-16px.svg',
    'wf-arrow-right-sm': 'skins/ubs/icons/Arrow-right-24px.svg',
    'wf-info': 'skins/ubs/icons/Information-24px.svg',
    'wf-info-xs': 'skins/ubs/icons/Information-16px.svg',
    'wf-info-sm': 'skins/ubs/icons/Information-24px.svg',
    'wf-user': 'skins/ubs/icons/User-24px.svg',
    'wf-user-xs': 'skins/ubs/icons/User-16px.svg',
    'wf-user-sm': 'skins/ubs/icons/User-24px.svg',
    'wf-search': 'skins/ubs/icons/Search-24px.svg',
    'wf-search-xs': 'skins/ubs/icons/Search-16px.svg',
    'wf-search-sm': 'skins/ubs/icons/Search-24px.svg',
    'wf-calendar': 'skins/ubs/icons/Calendar-16px.svg',
    'wf-calendar-xs': 'skins/ubs/icons/Calendar-16px.svg',
    'wf-calendar-sm': 'skins/ubs/icons/Calendar-24px.svg',
    'wf-locked': 'skins/ubs/icons/Status-Locked-24px.svg',
    'wf-locked-xs': 'skins/ubs/icons/Lock-16px.svg',
    'wf-locked-sm': 'skins/ubs/icons/Lock-24px.svg',
    'wf-drag': 'skins/ubs/icons/drag-icon.svg',
    'wf-example': 'skins/ubs/icons/Account-24px.svg',
    'wf-example-xxs': 'skins/ubs/icons/Account-12px.svg',
    'wf-example-xs': 'skins/ubs/icons/Account-16px.svg',
    'wf-example-sm': 'skins/ubs/icons/Account-24px.svg',
    'wf-triangle-down': 'skins/ubs/icons/Triangle-down-16px.svg',
    'wf-triangle-down-xs': 'skins/ubs/icons/Triangle-down-16px.svg',
    'wf-triangle-down-xxs': 'skins/ubs/icons/Triangle-down-12px.svg',
    'wf-triangle-up-xxs': 'skins/ubs/icons/Triangle-up-12px.svg',
    'wf-triangle-up-xs': 'skins/ubs/icons/Triangle-up-16px.svg',
    'wf-triangle-up': 'skins/ubs/icons/Triangle-up-16px.svg',
    'wf-filter': 'skins/ubs/icons/Filter-funnel-16px.svg',
    'wf-filter-xxs': 'skins/ubs/icons/Filter-funnel-12px.svg',
    'wf-filter-xs': 'skins/ubs/icons/Filter-funnel-16px.svg',
    'wf-filter-sm': 'skins/ubs/icons/Filter-funnel-24px.svg',

    // new
    'access-app-xs': 'skins/ubs/icons/Access-app-16px.svg',
    'access-app-sm': 'skins/ubs/icons/Access-app-24px.svg',
    'access-card-xs': 'skins/ubs/icons/Access-card-16px.svg',
    'access-card-sm': 'skins/ubs/icons/Access-card-24px.svg',
    'access-card-display-xs': 'skins/ubs/icons/Access-card-display-16px.svg',
    'access-card-display-sm': 'skins/ubs/icons/Access-card-display-24px.svg',
    'account-xxs': 'skins/ubs/icons/Account-12px.svg',
    'account-xs': 'skins/ubs/icons/Account-16px.svg',
    'account-sm': 'skins/ubs/icons/Account-24px.svg',
    'account-add-xs': 'skins/ubs/icons/Account-add-16px.svg',
    'account-add-sm': 'skins/ubs/icons/Account-add-24px.svg',
    'account-blankslate-sm': 'skins/ubs/icons/Account-blankslate-24px.svg',
    'account-information-xs': 'skins/ubs/icons/Account-information-16px.svg',
    'account-information-sm': 'skins/ubs/icons/Account-information-24px.svg',
    'account-payment-xs': 'skins/ubs/icons/Account-payment-16px.svg',
    'account-payment-sm': 'skins/ubs/icons/Account-payment-24px.svg',
    'account-payment-new-xs': 'skins/ubs/icons/Account-payment-new-16px.svg',
    'account-payment-new-sm': 'skins/ubs/icons/Account-payment-new-24px.svg',
    'account-payment-on-record-xs': 'skins/ubs/icons/Account-payment-on-record-16px.svg',
    'account-payments-on-record-sm': 'skins/ubs/icons/Account-payments-on-record-24px.svg',
    'account-transfer-xs': 'skins/ubs/icons/Account-transfer-16px.svg',
    'account-transfer-sm': 'skins/ubs/icons/Account-transfer-24px.svg',
    'add-inverse-sm': 'skins/ubs/icons/Add-inverse-24px.svg',
    'address-xs': 'skins/ubs/icons/Address-16px.svg',
    'address-sm': 'skins/ubs/icons/Address-24px.svg',
    'address-blankslate-sm': 'skins/ubs/icons/Address-blankslate-24px.svg',
    'add-to-list-sm': 'skins/ubs/icons/Add-To-List-24px.svg',
    'annotation-history-xs': 'skins/ubs/icons/Annotation-history-16px.svg',
    'archive-xs': 'skins/ubs/icons/Archive-16px.svg',
    'archive-sm': 'skins/ubs/icons/Archive-24px.svg',
    'arrow-doubleline-down-sm': 'skins/ubs/icons/Arrow-DoubleLine-Down-24px.svg',
    'arrow-doubleline-up-sm': 'skins/ubs/icons/Arrow-DoubleLine-Up-24px.svg',
    'arrow-down-xxs': 'skins/ubs/icons/Arrow-down-12px.svg',
    'arrow-down-xs': 'skins/ubs/icons/Arrow-down-16px.svg',
    'arrow-down-sm': 'skins/ubs/icons/Arrow-down-24px.svg',
    'arrow-down-bold-sm': 'skins/ubs/icons/Arrow-down-bold-24px.svg',
    'arrow-filled-down-sm': 'skins/ubs/icons/Arrow-filled-down-24px.svg',
    'arrow-filled-increment-sm': 'skins/ubs/icons/Arrow-filled-increment-24px.svg',
    'arrow-filled-up-sm': 'skins/ubs/icons/Arrow-filled-up-24px.svg',
    'arrow-left-xxs': 'skins/ubs/icons/Arrow-left-12px.svg',
    'arrow-left-xs': 'skins/ubs/icons/Arrow-left-16px.svg',
    'arrow-left-sm': 'skins/ubs/icons/Arrow-left-24px.svg',
    'arrow-left-bold-sm': 'skins/ubs/icons/Arrow-left-bold-24px.svg',
    'arrow-right-xxs': 'skins/ubs/icons/Arrow-right-12px.svg',
    'arrow-right-xs': 'skins/ubs/icons/Arrow-right-16px.svg',
    'arrow-right-sm': 'skins/ubs/icons/Arrow-right-24px.svg',
    'arrow-right-bold-xxs': 'skins/ubs/icons/Arrow-right-bold-12px.svg',
    'arrow-right-bold-sm': 'skins/ubs/icons/Arrow-right-bold-24px.svg',
    'arrow-up-xxs': 'skins/ubs/icons/Arrow-up-12px.svg',
    'arrow-up-xs': 'skins/ubs/icons/Arrow-up-16px.svg',
    'arrow-up-sm': 'skins/ubs/icons/Arrow-up-24px.svg',
    'arrow-up-bold-sm': 'skins/ubs/icons/Arrow-up-bold-24px.svg',
    'article-xs': 'skins/ubs/icons/Article-16px.svg',
    'article-sm': 'skins/ubs/icons/Article-24px.svg',
    'article-blankslate-sm': 'skins/ubs/icons/Article-blankslate-24px.svg',
    'attachement-xs': 'skins/ubs/icons/Attachement-16px.svg',
    'attachement-sm': 'skins/ubs/icons/Attachement-24px.svg',
    'attention-xs': 'skins/ubs/icons/Attention-16px.svg',
    'attention-sm': 'skins/ubs/icons/Attention-24px.svg',
    'attention-error-sm': 'skins/ubs/icons/Attention-error-24px.svg',
    'attention-error-md': 'skins/ubs/icons/Attention-error-36px.svg',
    'attention-error-lg': 'skins/ubs/icons/Attention-error-72px.svg',
    'attention-error-xl': 'skins/ubs/icons/Attention-error-96px.svg',
    'attention-warning-sm': 'skins/ubs/icons/Attention-warning-24px.svg',
    'attention-warning-md': 'skins/ubs/icons/Attention-warning-36px.svg',
    'attention-warning-lg': 'skins/ubs/icons/Attention-warning-72px.svg',
    'attention-warning-xl': 'skins/ubs/icons/Attention-warning-96px.svg',
    'balance-forecast-xs': 'skins/ubs/icons/Balance-forecast-16px.svg',
    'balance-forecast-sm': 'skins/ubs/icons/Balance-forecast-24px.svg',
    'bell-xxs': 'skins/ubs/icons/Bell-12px.svg',
    'bell-xs': 'skins/ubs/icons/Bell-16px.svg',
    'bell-sm': 'skins/ubs/icons/Bell-24px.svg',
    'bell-filled-xxs': 'skins/ubs/icons/Bell-filled-12px.svg',
    'bin-xxs': 'skins/ubs/icons/Bin-12px.svg',
    'bin-xs': 'skins/ubs/icons/Bin-16px.svg',
    'bin-sm': 'skins/ubs/icons/Bin-24px.svg',
    'blankslate-xxs': 'skins/ubs/icons/Blankslate-12px.svg',
    'blankslate-xs': 'skins/ubs/icons/Blankslate-16px.svg',
    'blankslate-sm': 'skins/ubs/icons/Blankslate-24px.svg',
    'bluetooth-sm': 'skins/ubs/icons/Bluetooth-24px.svg',
    'bookmark-xs': 'skins/ubs/icons/Bookmark-16px.svg',
    'budget-xs': 'skins/ubs/icons/Budget-16px.svg',
    'budget-sm': 'skins/ubs/icons/Budget-24px.svg',
    'buy-xs': 'skins/ubs/icons/Buy-16px.svg',
    'buy-sm': 'skins/ubs/icons/Buy-24px.svg',
    'calendar-xxs': 'skins/ubs/icons/Calendar-12px.svg',
    'calendar-xs': 'skins/ubs/icons/Calendar-16px.svg',
    'calendar-sm': 'skins/ubs/icons/Calendar-24px.svg',
    'calendar-month-xs': 'skins/ubs/icons/Calendar-month-16px.svg',
    'calendar-month-sm': 'skins/ubs/icons/Calendar-month-24px.svg',
    'callback-xs': 'skins/ubs/icons/Callback-16px.svg',
    'callback-sm': 'skins/ubs/icons/Callback-24px.svg',
    'car-xs': 'skins/ubs/icons/Car-16px.svg',
    'car-sm': 'skins/ubs/icons/Car-24px.svg',
    'card-xxs': 'skins/ubs/icons/Card-12px.svg',
    'card-blankslate-xs': 'skins/ubs/icons/Card-blankslate-16px.svg',
    'card-blankslate-sm': 'skins/ubs/icons/Card-blankslate-24px.svg',
    'card-ble-xs': 'skins/ubs/icons/Card-BLE-16px.svg',
    'card-ble-sm': 'skins/ubs/icons/Card-BLE-24px.svg',
    'card-block-xs': 'skins/ubs/icons/Card-block-16px.svg',
    'card-block-sm': 'skins/ubs/icons/Card-block-24px.svg',
    'card-credit-xs': 'skins/ubs/icons/Card-credit-16px.svg',
    'card-credit-sm': 'skins/ubs/icons/Card-credit-24px.svg',
    'card-credit-manager-xs': 'skins/ubs/icons/Card-credit-manager-16px.svg',
    'card-credit-manager-sm': 'skins/ubs/icons/Card-credit-manager-24px.svg',
    'card-debit-xs': 'skins/ubs/icons/Card-debit-16px.svg',
    'card-debit-sm': 'skins/ubs/icons/Card-debit-24px.svg',
    'card-lock-xs': 'skins/ubs/icons/Card-lock-16px.svg',
    'card-lock-sm': 'skins/ubs/icons/Card-lock-24px.svg',
    'card-manage-xs': 'skins/ubs/icons/Card-manage-16px.svg',
    'card-manage-sm': 'skins/ubs/icons/Card-manage-24px.svg',
    'card-nfc-xs': 'skins/ubs/icons/Card-NFC-16px.svg',
    'card-nfc-sm': 'skins/ubs/icons/Card-NFC-24px.svg',
    'card-pay-xs': 'skins/ubs/icons/Card-pay-16px.svg',
    'card-pay-sm': 'skins/ubs/icons/Card-pay-24px.svg',
    'card-reader-xs': 'skins/ubs/icons/Card-reader-16px.svg',
    'card-reader-sm': 'skins/ubs/icons/Card-reader-24px.svg',
    'card-reader-access-card-xs': 'skins/ubs/icons/Card-reader-access-card-16px.svg',
    'card-reader-access-card-sm': 'skins/ubs/icons/Card-reader-access-card-24px.svg',
    'card-replace-xs': 'skins/ubs/icons/Card-replace-16px.svg',
    'card-replace-sm': 'skins/ubs/icons/Card-replace-24px.svg',
    'cards-xs': 'skins/ubs/icons/Cards-16px.svg',
    'cards-sm': 'skins/ubs/icons/Cards-24px.svg',
    'cash-xs': 'skins/ubs/icons/Cash-16px.svg',
    'cash-sm': 'skins/ubs/icons/Cash-24px.svg',
    'cash-expenses-xs': 'skins/ubs/icons/Cash-expenses-16px.svg',
    'cash-expenses-sm': 'skins/ubs/icons/Cash-expenses-24px.svg',
    'cash-income-xs': 'skins/ubs/icons/Cash-income-16px.svg',
    'cash-income-sm': 'skins/ubs/icons/Cash-income-24px.svg',
    'cash-other-xs': 'skins/ubs/icons/Cash-other-16px.svg',
    'cash-other-sm': 'skins/ubs/icons/Cash-other-24px.svg',
    'cash-withdrawals-xs': 'skins/ubs/icons/Cash-Withdrawals-16px.svg',
    'cash-withdrawals-sm': 'skins/ubs/icons/Cash-Withdrawals-24px.svg',
    'charity-xs': 'skins/ubs/icons/Charity-16px.svg',
    'charity-sm': 'skins/ubs/icons/Charity-24px.svg',
    'chart-xs': 'skins/ubs/icons/Chart-16px.svg',
    'chart-sm': 'skins/ubs/icons/Chart-24px.svg',
    'chat-xxs': 'skins/ubs/icons/Chat-12px.svg',
    'chat-xs': 'skins/ubs/icons/Chat-16px.svg',
    'chat-sm': 'skins/ubs/icons/Chat-24px.svg',
    'client-advisor-xs': 'skins/ubs/icons/Client-advisor-16px.svg',
    'client-advisor-sm': 'skins/ubs/icons/Client-advisor-24px.svg',
    'client-advisor-blankstate-xs': 'skins/ubs/icons/Client-advisor-blankstate-16px.svg',
    'client-advisor-blankstate-sm': 'skins/ubs/icons/Client-advisor-blankstate-24px.svg',
    'client-advisor-male-xs': 'skins/ubs/icons/Client-advisor-male-16px.svg',
    'client-advisor-male-sm': 'skins/ubs/icons/Client-advisor-male-24px.svg',
    'clipboard-xxs': 'skins/ubs/icons/Clipboard-12px.svg',
    'clipboard-xs': 'skins/ubs/icons/Clipboard-16px.svg',
    'clipboard-sm': 'skins/ubs/icons/Clipboard-24px.svg',
    'cloud-xs': 'skins/ubs/icons/Cloud-16px.svg',
    'cloud-sm': 'skins/ubs/icons/Cloud-24px.svg',
    'contact-xxs': 'skins/ubs/icons/Contact-12px.svg',
    'contact-xs': 'skins/ubs/icons/Contact-16px.svg',
    'contact-sm': 'skins/ubs/icons/Contact-24px.svg',
    'contacts-xs': 'skins/ubs/icons/Contacts-16px.svg',
    'contacts-sm': 'skins/ubs/icons/Contacts-24px.svg',
    'currency-xs': 'skins/ubs/icons/Currency-16px.svg',
    'currency-sm': 'skins/ubs/icons/Currency-24px.svg',
    'currency-converter-xs': 'skins/ubs/icons/Currency-converter-16px.svg',
    'currency-converter-sm': 'skins/ubs/icons/Currency-converter-24px.svg',
    'custody-accounts-xs': 'skins/ubs/icons/Custody-accounts-16px.svg',
    'custody-accounts-sm': 'skins/ubs/icons/Custody-accounts-24px.svg',
    'cut-xs': 'skins/ubs/icons/Cut-16px.svg',
    'cut-sm': 'skins/ubs/icons/Cut-24px.svg',
    'data-xs': 'skins/ubs/icons/Data-16px.svg',
    'data-sm': 'skins/ubs/icons/Data-24px.svg',
    'data-blankslate-sm': 'skins/ubs/icons/Data-blankslate-24px.svg',
    'data-download-xs': 'skins/ubs/icons/Data-download-16px.svg',
    'data-download-sm': 'skins/ubs/icons/Data-download-24px.svg',
    'data-on-record-xs': 'skins/ubs/icons/Data-on-record-16px.svg',
    'data-on-record-sm': 'skins/ubs/icons/Data-on-record-24px.svg',
    'data-other-xs': 'skins/ubs/icons/Data-other-16px.svg',
    'data-other-sm': 'skins/ubs/icons/Data-other-24px.svg',
    'data-search-xs': 'skins/ubs/icons/Data-search-16px.svg',
    'data-search-sm': 'skins/ubs/icons/Data-search-24px.svg',
    'data-transfer-xs': 'skins/ubs/icons/Data-transfer-16px.svg',
    'data-transfer-sm': 'skins/ubs/icons/Data-transfer-24px.svg',
    'data-upload-xs': 'skins/ubs/icons/Data-upload-16px.svg',
    'data-upload-sm': 'skins/ubs/icons/Data-upload-24px.svg',
    'deselect-sm': 'skins/ubs/icons/Deselect-24px.svg',
    'device-xs': 'skins/ubs/icons/Device-16px.svg',
    'device-sm': 'skins/ubs/icons/Device-24px.svg',
    'device-add-xs': 'skins/ubs/icons/Device-add-16px.svg',
    'device-add-sm': 'skins/ubs/icons/Device-add-24px.svg',
    'device-notifications-xs': 'skins/ubs/icons/Device-notifications-16px.svg',
    'device-notifications-sm': 'skins/ubs/icons/Device-notifications-24px.svg',
    'device-other-xs': 'skins/ubs/icons/Device-other-16px.svg',
    'device-other-sm': 'skins/ubs/icons/Device-other-24px.svg',
    'diamond-xxs': 'skins/ubs/icons/Diamond-12px.svg',
    'digital-banking-xs': 'skins/ubs/icons/Digital-banking-16px.svg',
    'digital-banking-sm': 'skins/ubs/icons/Digital-banking-24px.svg',
    'download-xxs': 'skins/ubs/icons/Download-12px.svg',
    'download-xs': 'skins/ubs/icons/Download-16px.svg',
    'download-sm': 'skins/ubs/icons/Download-24px.svg',
    'drag-xxs': 'skins/ubs/icons/Drag-12px.svg',
    'duplicate-sm': 'skins/ubs/icons/Duplicate-24px.svg',
    'ebill-xs': 'skins/ubs/icons/eBill-16px.svg',
    'ebill-sm': 'skins/ubs/icons/eBill-24px.svg',
    'edit-xxs': 'skins/ubs/icons/Edit-12px.svg',
    'edit-xs': 'skins/ubs/icons/Edit-16px.svg',
    'edit-sm': 'skins/ubs/icons/Edit-24px.svg',
    'edocs-xs': 'skins/ubs/icons/eDocs-16px.svg',
    'edocs-sm': 'skins/ubs/icons/eDocs-24px.svg',
    'envelope-xxs': 'skins/ubs/icons/Envelope-12px.svg',
    'envelope-xs': 'skins/ubs/icons/Envelope-16px.svg',
    'envelope-sm': 'skins/ubs/icons/Envelope-24px.svg',
    'envelope-blankslate-sm': 'skins/ubs/icons/Envelope-blankslate-24px.svg',
    'envelope-opened-xs': 'skins/ubs/icons/Envelope-opened-16px.svg',
    'envelope-opened-sm': 'skins/ubs/icons/Envelope-opened-24px.svg',
    'eye-xxs': 'skins/ubs/icons/Eye-12px.svg',
    'eye-xs': 'skins/ubs/icons/Eye-16px.svg',
    'eye-sm': 'skins/ubs/icons/Eye-24px.svg',
    'eye-hide-xxs': 'skins/ubs/icons/Eye-hide-12px.svg',
    'face-id-xs': 'skins/ubs/icons/Face-ID-16px.svg',
    'face-id-sm': 'skins/ubs/icons/Face-ID-24px.svg',
    'family-xs': 'skins/ubs/icons/Family-16px.svg',
    'family-sm': 'skins/ubs/icons/Family-24px.svg',
    'favicon-client-sm': 'skins/ubs/icons/Favicon-client-24px.svg',
    'favicon-gear-sm': 'skins/ubs/icons/Favicon-gear-24px.svg',
    'favicon-home-sm': 'skins/ubs/icons/Favicon-home-24px.svg',
    'favicon-popup-sm': 'skins/ubs/icons/Favicon-popup-24px.svg',
    'favourite-xxs': 'skins/ubs/icons/Favourite-12px.svg',
    'favourite-xs': 'skins/ubs/icons/Favourite-16px.svg',
    'favourite-sm': 'skins/ubs/icons/Favourite-24px.svg',
    'fax-xs': 'skins/ubs/icons/Fax-16px.svg',
    'fax-sm': 'skins/ubs/icons/Fax-24px.svg',
    'filter-xxs': 'skins/ubs/icons/Filter-12px.svg',
    'filter-xs': 'skins/ubs/icons/Filter-16px.svg',
    'filter-sm': 'skins/ubs/icons/Filter-24px.svg',
    'filter-funnel-xxs': 'skins/ubs/icons/Filter-funnel-12px.svg',
    'filter-funnel-xs': 'skins/ubs/icons/Filter-funnel-16px.svg',
    'filter-funnel-sm': 'skins/ubs/icons/Filter-funnel-24px.svg',
    'filter-vertical-xxs': 'skins/ubs/icons/Filter-vertical-12px.svg',
    'filter-vertical-xs': 'skins/ubs/icons/Filter-vertical-16px.svg',
    'filter-vertical-sm': 'skins/ubs/icons/Filter-vertical-24px.svg',
    'finance-supply-chain-sm': 'skins/ubs/icons/Finance-supply-chain-24px.svg',
    'finance-trade-sm': 'skins/ubs/icons/Finance-trade-24px.svg',
    'fingerprint-xs': 'skins/ubs/icons/Fingerprint-16px.svg',
    'fingerprint-sm': 'skins/ubs/icons/Fingerprint-24px.svg',
    'fit-automatic-xs': 'skins/ubs/icons/Fit-automatic-16px.svg',
    'fit-page-xs': 'skins/ubs/icons/Fit-page-16px.svg',
    'fit-width-xs': 'skins/ubs/icons/Fit-width-16px.svg',
    'folder-xs': 'skins/ubs/icons/Folder-16px.svg',
    'folder-sm': 'skins/ubs/icons/Folder-24px.svg',
    'folder-add-xs': 'skins/ubs/icons/Folder-add-16px.svg',
    'folder-add-sm': 'skins/ubs/icons/Folder-add-24px.svg',
    'full-screen-sm': 'skins/ubs/icons/Full-screen-24px.svg',
    'funds-xs': 'skins/ubs/icons/Funds-16px.svg',
    'funds-sm': 'skins/ubs/icons/Funds-24px.svg',
    'gambling-xs': 'skins/ubs/icons/Gambling-16px.svg',
    'gambling-sm': 'skins/ubs/icons/Gambling-24px.svg',
    'goals-xs': 'skins/ubs/icons/Goals-16px.svg',
    'goals-sm': 'skins/ubs/icons/Goals-24px.svg',
    'goals-blankslate-sm': 'skins/ubs/icons/Goals-blankslate-24px.svg',
    'grab-xxs': 'skins/ubs/icons/Grab-12px.svg',
    'grab-xs': 'skins/ubs/icons/Grab-16px.svg',
    'grab-sm': 'skins/ubs/icons/Grab-24px.svg',
    'hand-xxs': 'skins/ubs/icons/Hand-12px.svg',
    'hand-xs': 'skins/ubs/icons/Hand-16px.svg',
    'health-xs': 'skins/ubs/icons/Health-16px.svg',
    'health-sm': 'skins/ubs/icons/Health-24px.svg',
    'highlighter-xs': 'skins/ubs/icons/Highlighter-16px.svg',
    'highlighter-pen-xs': 'skins/ubs/icons/Highlighter-pen-16px.svg',
    'highlighter-text-xs': 'skins/ubs/icons/Highlighter-text-16px.svg',
    'holidays-xs': 'skins/ubs/icons/Holidays-16px.svg',
    'holidays-sm': 'skins/ubs/icons/Holidays-24px.svg',
    'home-xxs': 'skins/ubs/icons/Home-12px.svg',
    'home-xs': 'skins/ubs/icons/Home-16px.svg',
    'home-sm': 'skins/ubs/icons/Home-24px.svg',
    'ideas-recommendations-sm': 'skins/ubs/icons/Ideas-Recommendations-24px.svg',
    'important-xs': 'skins/ubs/icons/Important-16px.svg',
    'important-sm': 'skins/ubs/icons/Important-24px.svg',
    'important-filled-sm': 'skins/ubs/icons/Important-filled-24px.svg',
    'information-xxs': 'skins/ubs/icons/Information-12px.svg',
    'information-sm': 'skins/ubs/icons/Information-24px.svg',
    'information-solid-sm': 'skins/ubs/icons/Information-solid-24px.svg',
    'international-xs': 'skins/ubs/icons/International-16px.svg',
    'international-sm': 'skins/ubs/icons/International-24px.svg',
    'international-payment-xs': 'skins/ubs/icons/International-payment-16px.svg',
    'international-payment-sm': 'skins/ubs/icons/International-payment-24px.svg',
    'investment-xs': 'skins/ubs/icons/Investment-16px.svg',
    'investment-sm': 'skins/ubs/icons/Investment-24px.svg',
    'investment-views-xs': 'skins/ubs/icons/Investment-views-16px.svg',
    'investment-views-sm': 'skins/ubs/icons/Investment-views-24px.svg',
    'key-xs': 'skins/ubs/icons/Key-16px.svg',
    'key-sm': 'skins/ubs/icons/Key-24px.svg',
    'keyclub-xs': 'skins/ubs/icons/KeyClub-16px.svg',
    'keyclub-sm': 'skins/ubs/icons/KeyClub-24px.svg',
    'lamp-xs': 'skins/ubs/icons/Lamp-16px.svg',
    'lamp-sm': 'skins/ubs/icons/Lamp-24px.svg',
    'legal-xs': 'skins/ubs/icons/Legal-16px.svg',
    'legal-sm': 'skins/ubs/icons/Legal-24px.svg',
    'leisure-xs': 'skins/ubs/icons/Leisure-16px.svg',
    'leisure-sm': 'skins/ubs/icons/Leisure-24px.svg',
    'liability-xs': 'skins/ubs/icons/Liability-16px.svg',
    'liability-sm': 'skins/ubs/icons/Liability-24px.svg',
    'line-xs': 'skins/ubs/icons/Line-16px.svg',
    'line-arrow-xs': 'skins/ubs/icons/Line-arrow-16px.svg',
    'line-ellipse-xs': 'skins/ubs/icons/Line-ellipse-16px.svg',
    'line-polygon-xs': 'skins/ubs/icons/Line-polygon-16px.svg',
    'line-polyline-xs': 'skins/ubs/icons/Line-polyline-16px.svg',
    'line-rectangle-xs': 'skins/ubs/icons/Line-rectangle-16px.svg',
    'link-xxs': 'skins/ubs/icons/Link-12px.svg',
    'link-xs': 'skins/ubs/icons/Link-16px.svg',
    'link-external-xxs': 'skins/ubs/icons/Link-external-12px.svg',
    'link-external-xs': 'skins/ubs/icons/Link-external-16px.svg',
    'link-external-sm': 'skins/ubs/icons/Link-external-24px.svg',
    'link-unlinked-xxs': 'skins/ubs/icons/Link-unlinked-12px.svg',
    'link-unlinked-xs': 'skins/ubs/icons/Link-unlinked-16px.svg',
    'list-xs': 'skins/ubs/icons/List-16px.svg',
    'list-sm': 'skins/ubs/icons/List-24px.svg',
    'list-add-sm': 'skins/ubs/icons/List-add-24px.svg',
    'list-blankslate-sm': 'skins/ubs/icons/List-blankslate-24px.svg',
    'list-compact-xs': 'skins/ubs/icons/List-compact-16px.svg',
    'list-enhanced-xs': 'skins/ubs/icons/List-enhanced-16px.svg',
    'location-xs': 'skins/ubs/icons/Location-16px.svg',
    'location-sm': 'skins/ubs/icons/Location-24px.svg',
    'lock-xxs': 'skins/ubs/icons/Lock-12px.svg',
    'lock-xs': 'skins/ubs/icons/Lock-16px.svg',
    'lock-sm': 'skins/ubs/icons/Lock-24px.svg',
    'lock-blankslate-sm': 'skins/ubs/icons/Lock-blankslate-24px.svg',
    'lock-double-xxs': 'skins/ubs/icons/Lock-double-12px.svg',
    'lock-double-xs': 'skins/ubs/icons/Lock-double-16px.svg',
    'lock-unlocked-xxs': 'skins/ubs/icons/Lock-unlocked-12px.svg',
    'lock-unlocked-xs': 'skins/ubs/icons/Lock-unlocked-16px.svg',
    'login-xxs': 'skins/ubs/icons/Login-12px.svg',
    'login-xs': 'skins/ubs/icons/Login-16px.svg',
    'login-sm': 'skins/ubs/icons/Login-24px.svg',
    'logout-xxs': 'skins/ubs/icons/Logout-12px.svg',
    'logout-xs': 'skins/ubs/icons/Logout-16px.svg',
    'logout-sm': 'skins/ubs/icons/Logout-24px.svg',
    'mailbox-xs': 'skins/ubs/icons/Mailbox-16px.svg',
    'mailbox-sm': 'skins/ubs/icons/Mailbox-24px.svg',
    'mark-attention-xxs': 'skins/ubs/icons/Mark-attention-12px.svg',
    'mark-attention-xs': 'skins/ubs/icons/Mark-attention-16px.svg',
    'mark-close-xxs': 'skins/ubs/icons/Mark-close-12px.svg',
    'mark-close-xs': 'skins/ubs/icons/Mark-close-16px.svg',
    'mark-close-sm': 'skins/ubs/icons/Mark-close-24px.svg',
    'mark-close-bold-sm': 'skins/ubs/icons/Mark-close-bold-24px.svg',
    'mark-exclamation-xxs': 'skins/ubs/icons/Mark-exclamation-12px.svg',
    'mark-exclamation-xs': 'skins/ubs/icons/Mark-exclamation-16px.svg',
    'mark-exclamation-sm': 'skins/ubs/icons/Mark-exclamation-24px.svg',
    'mark-minus-xxs': 'skins/ubs/icons/Mark-minus-12px.svg',
    'mark-minus-xs': 'skins/ubs/icons/Mark-minus-16px.svg',
    'mark-minus-sm': 'skins/ubs/icons/Mark-minus-24px.svg',
    'mark-minus-bold-xxs': 'skins/ubs/icons/Mark-minus-bold-12px.svg',
    'mark-minus-bold-xs': 'skins/ubs/icons/Mark-minus-bold-16px.svg',
    'mark-plus-xxs': 'skins/ubs/icons/Mark-plus-12px.svg',
    'mark-plus-xs': 'skins/ubs/icons/Mark-plus-16px.svg',
    'mark-plus-sm': 'skins/ubs/icons/Mark-plus-24px.svg',
    'mark-question-xxs': 'skins/ubs/icons/Mark-question-12px.svg',
    'mark-question-xs': 'skins/ubs/icons/Mark-question-16px.svg',
    'mark-question-sm': 'skins/ubs/icons/Mark-question-24px.svg',
    'mark-tick-xxs': 'skins/ubs/icons/Mark-tick-12px.svg',
    'mark-tick-xs': 'skins/ubs/icons/Mark-tick-16px.svg',
    'mark-tick-sm': 'skins/ubs/icons/Mark-tick-24px.svg',
    'market-update-xs': 'skins/ubs/icons/Market-update-16px.svg',
    'market-update-sm': 'skins/ubs/icons/Market-update-24px.svg',
    'media-audio-off-xs': 'skins/ubs/icons/Media-audio-off-16px.svg',
    'media-audio-off-sm': 'skins/ubs/icons/Media-audio-off-24px.svg',
    'media-audio-on-xs': 'skins/ubs/icons/Media-audio-on-16px.svg',
    'media-audio-on-sm': 'skins/ubs/icons/Media-audio-on-24px.svg',
    'media-backward-xs': 'skins/ubs/icons/Media-backward-16px.svg',
    'media-backward-sm': 'skins/ubs/icons/Media-backward-24px.svg',
    'media-forward-xs': 'skins/ubs/icons/Media-forward-16px.svg',
    'media-forward-sm': 'skins/ubs/icons/Media-forward-24px.svg',
    'media-fullscreen-off-xs': 'skins/ubs/icons/Media-fullscreen-off-16px.svg',
    'media-fullscreen-off-sm': 'skins/ubs/icons/Media-fullscreen-off-24px.svg',
    'media-fullscreen-on-xs': 'skins/ubs/icons/Media-fullscreen-on-16px.svg',
    'media-fullscreen-on-sm': 'skins/ubs/icons/Media-fullscreen-on-24px.svg',
    'media-pause-xs': 'skins/ubs/icons/Media-pause-16px.svg',
    'media-pause-sm': 'skins/ubs/icons/Media-pause-24px.svg',
    'media-play-xs': 'skins/ubs/icons/Media-play-16px.svg',
    'media-play-sm': 'skins/ubs/icons/Media-play-24px.svg',
    'media-record-xs': 'skins/ubs/icons/Media-record-16px.svg',
    'media-record-sm': 'skins/ubs/icons/Media-record-24px.svg',
    'media-record-stop-xs': 'skins/ubs/icons/Media-record-stop-16px.svg',
    'media-record-stop-sm': 'skins/ubs/icons/Media-record-stop-24px.svg',
    'media-shutdown-xs': 'skins/ubs/icons/Media-shutdown-16px.svg',
    'media-shutdown-sm': 'skins/ubs/icons/Media-shutdown-24px.svg',
    'media-skip-back-xs': 'skins/ubs/icons/Media-skip-back-16px.svg',
    'media-skip-back-sm': 'skins/ubs/icons/Media-skip-back-24px.svg',
    'media-skip-next-xs': 'skins/ubs/icons/Media-skip-next-16px.svg',
    'media-skip-next-sm': 'skins/ubs/icons/Media-skip-next-24px.svg',
    'media-stop-xs': 'skins/ubs/icons/Media-stop-16px.svg',
    'media-stop-sm': 'skins/ubs/icons/Media-stop-24px.svg',
    'menu-xs': 'skins/ubs/icons/Menu-16px.svg',
    'menu-sm': 'skins/ubs/icons/Menu-24px.svg',
    'menu-apps-xs': 'skins/ubs/icons/Menu-apps-16px.svg',
    'menu-apps-sm': 'skins/ubs/icons/Menu-apps-24px.svg',
    'menu-grid-xs': 'skins/ubs/icons/Apps-16px.svg',
    'menu-grid-sm': 'skins/ubs/icons/Menu-grid-24px.svg',
    'menu-more-xxs': 'skins/ubs/icons/Menu-more-12px.svg',
    'menu-more-xs': 'skins/ubs/icons/Menu-more-16px.svg',
    'menu-more-sm': 'skins/ubs/icons/Action-24px.svg',
    'mobile-pay-xs': 'skins/ubs/icons/Mobile-pay-16px.svg',
    'mobile-pay-sm': 'skins/ubs/icons/Mobile-pay-24px.svg',
    'money-market-xs': 'skins/ubs/icons/Money-market-16px.svg',
    'money-market-sm': 'skins/ubs/icons/Money-market-24px.svg',
    'monthly-invoice-xs': 'skins/ubs/icons/Monthly-invoice-16px.svg',
    'monthly-invoice-sm': 'skins/ubs/icons/Monthly-invoice-24px.svg',
    'movie-xs': 'skins/ubs/icons/Movie-16px.svg',
    'movie-sm': 'skins/ubs/icons/Movie-24px.svg',
    'not-categorised-xs': 'skins/ubs/icons/Not-categorised-16px.svg',
    'not-categorised-sm': 'skins/ubs/icons/Not-categorised-24px.svg',
    'off-xxs': 'skins/ubs/icons/Off-12px.svg',
    'off-xs': 'skins/ubs/icons/Off-16px.svg',
    'office-hq-xs': 'skins/ubs/icons/Office-HQ-16px.svg',
    'office-hq-sm': 'skins/ubs/icons/Office-HQ-24px.svg',
    'office-subsidiary-xs': 'skins/ubs/icons/Office-subsidiary-16px.svg',
    'office-subsidiary-sm': 'skins/ubs/icons/Office-subsidiary-24px.svg',
    'order-xxs': 'skins/ubs/icons/Order-12px.svg',
    'order-overview-xs': 'skins/ubs/icons/Order-overview-16px.svg',
    'order-overview-sm': 'skins/ubs/icons/Order-overview-24px.svg',
    'overview-xs': 'skins/ubs/icons/Overview-16px.svg',
    'overview-sm': 'skins/ubs/icons/Overview-24px.svg',
    'page-xs': 'skins/ubs/icons/Page-16px.svg',
    'page-continuous-xs': 'skins/ubs/icons/Page-continuous-16px.svg',
    'page-duplicate-xs': 'skins/ubs/icons/Page-duplicate-16px.svg',
    'page-forward-xs': 'skins/ubs/icons/Page-forward-16px.svg',
    'page-merge-xs': 'skins/ubs/icons/Page-merge-16px.svg',
    'page-multipage-xs': 'skins/ubs/icons/Page-multipage-16px.svg',
    'page-multipe-xs': 'skins/ubs/icons/Page-multipe-16px.svg',
    'page-physical-copy-xs': 'skins/ubs/icons/Page-physical-copy-16px.svg',
    'page-rotate-xs': 'skins/ubs/icons/Page-rotate-16px.svg',
    'page-rotate-left-xs': 'skins/ubs/icons/Page-rotate-left-16px.svg',
    'page-rotate-right-xs': 'skins/ubs/icons/Page-rotate-right-16px.svg',
    'page-single-xs': 'skins/ubs/icons/Page-single-16px.svg',
    'page-split-xs': 'skins/ubs/icons/Page-split-16px.svg',
    'payment-new-xs': 'skins/ubs/icons/Payment-new-16px.svg',
    'payment-new-sm': 'skins/ubs/icons/Payment-new-24px.svg',
    'payslip-qr-bill-xs': 'skins/ubs/icons/Payslip-QR-Bill-16px.svg',
    'payslip-qr-bill-sm': 'skins/ubs/icons/Payslip-QR-Bill-24px.svg',
    'pie-chart-xxs': 'skins/ubs/icons/Pie-chart-12px.svg',
    'pie-chart-xs': 'skins/ubs/icons/Pie-chart-16px.svg',
    'pie-chart-sm': 'skins/ubs/icons/Pie-chart-24px.svg',
    'piechart-blankslate-sm': 'skins/ubs/icons/Piechart-blankslate-24px.svg',
    'piechart-manage-xs': 'skins/ubs/icons/Piechart-manage-16px.svg',
    'piechart-manage-sm': 'skins/ubs/icons/Piechart-manage-24px.svg',
    'pin-xs': 'skins/ubs/icons/Pin-16px.svg',
    'pin-sm': 'skins/ubs/icons/Pin-24px.svg',
    'pin-order-xs': 'skins/ubs/icons/Pin-order-16px.svg',
    'pin-order-sm': 'skins/ubs/icons/Pin-order-24px.svg',
    'plus-sm': 'skins/ubs/icons/Plus-24px.svg',
    'portfolio-xs': 'skins/ubs/icons/Portfolio-16px.svg',
    'portfolio-sm': 'skins/ubs/icons/Portfolio-24px.svg',
    'portfolio-virtual-xs': 'skins/ubs/icons/Portfolio-virtual-16px.svg',
    'portfolio-virtual-sm': 'skins/ubs/icons/Portfolio-virtual-24px.svg',
    'print-xxs': 'skins/ubs/icons/Print-12px.svg',
    'print-xs': 'skins/ubs/icons/Print-16px.svg',
    'print-sm': 'skins/ubs/icons/Print-24px.svg',
    'private-xs': 'skins/ubs/icons/Private-16px.svg',
    'private-sm': 'skins/ubs/icons/Private-24px.svg',
    'products-xs': 'skins/ubs/icons/Products-16px.svg',
    'products-sm': 'skins/ubs/icons/Products-24px.svg',
    'profile-sm': 'skins/ubs/icons/Profile-24px.svg',
    'quotes-xs': 'skins/ubs/icons/Quotes-16px.svg',
    'quotes-sm': 'skins/ubs/icons/Quotes-24px.svg',
    'redo-xs': 'skins/ubs/icons/Redo-16px.svg',
    'refresh-xxs': 'skins/ubs/icons/Refresh-12px.svg',
    'refresh-xs': 'skins/ubs/icons/Refresh-16px.svg',
    'refresh-sm': 'skins/ubs/icons/Refresh-24px.svg',
    'renovation-xs': 'skins/ubs/icons/Renovation-16px.svg',
    'renovation-sm': 'skins/ubs/icons/Renovation-24px.svg',
    'resize-xs': 'skins/ubs/icons/Resize-16px.svg',
    'retirement-xs': 'skins/ubs/icons/Retirement-16px.svg',
    'retirement-sm': 'skins/ubs/icons/Retirement-24px.svg',
    'risk-high-xs': 'skins/ubs/icons/Risk-high-16px.svg',
    'risk-high-sm': 'skins/ubs/icons/Risk-high-24px.svg',
    'risk-low-xs': 'skins/ubs/icons/Risk-low-16px.svg',
    'risk-low-sm': 'skins/ubs/icons/Risk-low-24px.svg',
    'risk-medium-xs': 'skins/ubs/icons/Risk-medium-16px.svg',
    'risk-medium-sm': 'skins/ubs/icons/Risk-medium-24px.svg',
    'rules-xs': 'skins/ubs/icons/Rules-16px.svg',
    'rules-sm': 'skins/ubs/icons/Rules-24px.svg',
    'safe-xs': 'skins/ubs/icons/Safe-16px.svg',
    'safe-sm': 'skins/ubs/icons/Safe-24px.svg',
    'save-xs': 'skins/ubs/icons/Save-16px.svg',
    'save-sm': 'skins/ubs/icons/Save-24px.svg',
    'savings-xs': 'skins/ubs/icons/Savings-16px.svg',
    'savings-sm': 'skins/ubs/icons/Savings-24px.svg',
    'scan-xs': 'skins/ubs/icons/Scan-16px.svg',
    'scan-sm': 'skins/ubs/icons/Scan-24px.svg',
    'scan-iris-xs': 'skins/ubs/icons/Scan-iris-16px.svg',
    'scan-iris-sm': 'skins/ubs/icons/Scan-iris-24px.svg',
    'scan-qr-xs': 'skins/ubs/icons/Scan-QR-16px.svg',
    'scan-qr-sm': 'skins/ubs/icons/Scan-QR-24px.svg',
    'search-xxs': 'skins/ubs/icons/Search-12px.svg',
    'search-xs': 'skins/ubs/icons/Search-16px.svg',
    'search-sm': 'skins/ubs/icons/Search-24px.svg',
    'search-blankslate-sm': 'skins/ubs/icons/Search-blankslate-24px.svg',
    'select-xs': 'skins/ubs/icons/Select-16px.svg',
    'select-sm': 'skins/ubs/icons/Select-24px.svg',
    'sell-xs': 'skins/ubs/icons/Sell-16px.svg',
    'sell-sm': 'skins/ubs/icons/Sell-24px.svg',
    'settings-xxs': 'skins/ubs/icons/Settings-12px.svg',
    'settings-xs': 'skins/ubs/icons/Settings-16px.svg',
    'settings-sm': 'skins/ubs/icons/Settings-24px.svg',
    'settings-menu-xs': 'skins/ubs/icons/Settings-menu-16px.svg',
    'settings-menu-sm': 'skins/ubs/icons/Settings-menu-24px.svg',
    'share-xs': 'skins/ubs/icons/Share-16px.svg',
    'share-sm': 'skins/ubs/icons/Share-24px.svg',
    'shield-xxs': 'skins/ubs/icons/Shield-12px.svg',
    'shield-xs': 'skins/ubs/icons/Shield-16px.svg',
    'shield-sm': 'skins/ubs/icons/Shield-24px.svg',
    'shopping-xxs': 'skins/ubs/icons/Shopping-12px.svg',
    'shopping-xs': 'skins/ubs/icons/Shopping-16px.svg',
    'shopping-sm': 'skins/ubs/icons/Shopping-24px.svg',
    'signature-xxs': 'skins/ubs/icons/Signature-12px.svg',
    'signature-xs': 'skins/ubs/icons/Signature-16px.svg',
    'signature-sm': 'skins/ubs/icons/Signature-24px.svg',
    'skiing-xs': 'skins/ubs/icons/Skiing-16px.svg',
    'skiing-sm': 'skins/ubs/icons/Skiing-24px.svg',
    'standing-order-xs': 'skins/ubs/icons/Standing-order-16px.svg',
    'standing-order-sm': 'skins/ubs/icons/Standing-order-24px.svg',
    'star-empty-xs': 'skins/ubs/icons/Star-empty-16px.svg',
    'star-empty-sm': 'skins/ubs/icons/Star-empty-24px.svg',
    'star-full-xs': 'skins/ubs/icons/Star-full-16px.svg',
    'star-full-sm': 'skins/ubs/icons/Star-full-24px.svg',
    'star-half-xs': 'skins/ubs/icons/Star-half-16px.svg',
    'star-half-sm': 'skins/ubs/icons/Star-half-24px.svg',
    'state-complete-sm': 'skins/ubs/icons/State-complete-24px.svg',
    'state-complete-md': 'skins/ubs/icons/State-complete-36px.svg',
    'state-empty-sm': 'skins/ubs/icons/State-empty-24px.svg',
    'state-empty-md': 'skins/ubs/icons/State-empty-36px.svg',
    'state-in-progress-sm': 'skins/ubs/icons/State-in-progress-24px.svg',
    'state-in-progress-md': 'skins/ubs/icons/State-in-progress-36px.svg',
    'status-error-sm': 'skins/ubs/icons/Status-error-24px.svg',
    'status-error-md': 'skins/ubs/icons/Status-error-36px.svg',
    'status-error-lg': 'skins/ubs/icons/Status-error-72px.svg',
    'status-error-xl': 'skins/ubs/icons/Status-error-96px.svg',
    'status-good-sm': 'skins/ubs/icons/Status-good-24px.svg',
    'status-good-md': 'skins/ubs/icons/Status-good-36px.svg',
    'status-good-lg': 'skins/ubs/icons/Status-good-72px.svg',
    'status-good-xl': 'skins/ubs/icons/Status-good-96px.svg',
    'status-information-sm': 'skins/ubs/icons/Status-information-24px.svg',
    'status-information-md': 'skins/ubs/icons/Status-information-36px.svg',
    'status-information-lg': 'skins/ubs/icons/Status-information-72px.svg',
    'status-information-xl': 'skins/ubs/icons/Status-information-96px.svg',
    'status-locked-sm': 'skins/ubs/icons/Status-Locked-24px.svg',
    'status-ok-sm': 'skins/ubs/icons/Status-ok-24px.svg',
    'status-ok-md': 'skins/ubs/icons/Status-ok-36px.svg',
    'status-ok-lg': 'skins/ubs/icons/Status-ok-72px.svg',
    'status-ok-xl': 'skins/ubs/icons/Status-ok-96px.svg',
    'support-xs': 'skins/ubs/icons/Support-16px.svg',
    'support-sm': 'skins/ubs/icons/Support-24px.svg',
    'tax-xs': 'skins/ubs/icons/Tax-16px.svg',
    'tax-sm': 'skins/ubs/icons/Tax-24px.svg',
    'text-box-xs': 'skins/ubs/icons/Text-box-16px.svg',
    'time-xxs': 'skins/ubs/icons/Time-12px.svg',
    'time-xs': 'skins/ubs/icons/Time-16px.svg',
    'time-sm': 'skins/ubs/icons/Time-24px.svg',
    'time-history-xs': 'skins/ubs/icons/Time-history-16px.svg',
    'time-history-sm': 'skins/ubs/icons/Time-history-24px.svg',
    'tips-xxs': 'skins/ubs/icons/Tips-12px.svg',
    'tips-xs': 'skins/ubs/icons/Tips-16px.svg',
    'tips-sm': 'skins/ubs/icons/Tips-24px.svg',
    'tooltip-sm': 'skins/ubs/icons/Tooltip-24px.svg',
    'trading-xs': 'skins/ubs/icons/Trading-16px.svg',
    'trading-sm': 'skins/ubs/icons/Trading-24px.svg',
    'transfer-xxs': 'skins/ubs/icons/Transfer-12px.svg',
    'transfer-xs': 'skins/ubs/icons/Transfer-16px.svg',
    'transfer-sm': 'skins/ubs/icons/Transfer-24px.svg',
    'triangle-down-xxs': 'skins/ubs/icons/Triangle-down-12px.svg',
    'triangle-down-xs': 'skins/ubs/icons/Triangle-down-16px.svg',
    'triangle-up-xxs': 'skins/ubs/icons/Triangle-up-12px.svg',
    'triangle-up-xs': 'skins/ubs/icons/Triangle-up-16px.svg',
    'undo-xs': 'skins/ubs/icons/Undo-16px.svg',
    'upload-xxs': 'skins/ubs/icons/Upload-12px.svg',
    'upload-xs': 'skins/ubs/icons/Upload-16px.svg',
    'upload-sm': 'skins/ubs/icons/Upload-24px.svg',
    'user-xxs': 'skins/ubs/icons/User-12px.svg',
    'user-xs': 'skins/ubs/icons/User-16px.svg',
    'user-sm': 'skins/ubs/icons/User-24px.svg',
    'user-add-xs': 'skins/ubs/icons/User-add-16px.svg',
    'user-add-sm': 'skins/ubs/icons/User-add-24px.svg',
    'user-group-xs': 'skins/ubs/icons/User-group-16px.svg',
    'user-group-sm': 'skins/ubs/icons/User-group-24px.svg',
    'user-group-pay-xs': 'skins/ubs/icons/User-group-pay-16px.svg',
    'user-group-pay-sm': 'skins/ubs/icons/User-group-pay-24px.svg',
    'user-locked-xs': 'skins/ubs/icons/User-locked-16px.svg',
    'user-locked-sm': 'skins/ubs/icons/User-locked-24px.svg',
    'user-manage-xs': 'skins/ubs/icons/User-manage-16px.svg',
    'user-manage-sm': 'skins/ubs/icons/User-manage-24px.svg',
    'user-pay-xs': 'skins/ubs/icons/User-pay-16px.svg',
    'user-pay-sm': 'skins/ubs/icons/User-pay-24px.svg',
    'waiting-xxs': 'skins/ubs/icons/Waiting-12px.svg',
    'wallet-xs': 'skins/ubs/icons/Wallet-16px.svg',
    'wallet-sm': 'skins/ubs/icons/Wallet-24px.svg',
    'wallet-blankslate-sm': 'skins/ubs/icons/Wallet-blankslate-24px.svg',
    'zoom-in-xs': 'skins/ubs/icons/Zoom-in-16px.svg',
    'zoom-in-sm': 'skins/ubs/icons/Zoom-in-24px.svg',
    'zoom-out-xs': 'skins/ubs/icons/Zoom-out-16px.svg',
  },
};

const WF_FONTS_SRC = "css/fonts.css";
const WF_SKINS_PATH = "skins";
const WF_SKINS_STYLES_SRC = "styles.css";
const WF_SKINS_ASSET_CONFIG_SRC = "scripts.js";
const WF_STYLES_SRC = "wf-bridge/collection/components/wf-design-components/dist/wf-styles.css";
const WF_DESIGN_COMPONENT_MODULE_SRC = "wf-bridge/collection/components/wf-design-components/dist/wf-design-components/wf-design-components.esm.js";
const WF_DESIGN_COMPONENT_SRC = "wf-bridge/collection/components/wf-design-components/dist/wf-design-components/wf-design-components.js";
function getBaseUrl() {
    const bridgeScript = document.querySelector('script[src*="wf-bridge.js"]');
    const url = new URL(bridgeScript.src);
    return url.pathname.match(/(.*?)\/wf-bridge\//)[1];
}
function cssLoader(pathToFile) {
    const cssElement = document.createElement("link");
    cssElement.setAttribute("rel", "stylesheet");
    cssElement.setAttribute("type", "text/css");
    cssElement.href = `${getBaseUrl()}/${pathToFile}`;
    document.head.appendChild(cssElement);
}
function scriptLoader(pathToFile, type = "") {
    const scriptElement = document.createElement("script");
    if (type) {
        scriptElement.setAttribute("type", type);
    }
    scriptElement.src = `${getBaseUrl()}/${pathToFile}`;
    document.head.appendChild(scriptElement);
}
function updateAssetConfigs(theme) {
    const keys = Object.keys(window.config.assets);
    const baseUrl = getBaseUrl();
    keys.forEach((key) => {
        let path = window.config.assets[key];
        if (theme !== 'ubs') {
            path = path.replace('/skins/ubs/icons/', `/skins/${theme}/icons/`);
        }
        if (!path.includes(baseUrl)) {
            window.config.assets[key] = `${baseUrl}/${path}`;
        }
    });
}
const WFBridge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.theme = "ubs";
    }
    componentWillLoad() {
        cssLoader(WF_FONTS_SRC);
        cssLoader(`${WF_SKINS_PATH}/${this.theme}/${WF_SKINS_STYLES_SRC}`);
        scriptLoader(`${WF_SKINS_PATH}/${this.theme}/${WF_SKINS_ASSET_CONFIG_SRC}`);
        updateAssetConfigs(this.theme);
        cssLoader(WF_STYLES_SRC);
        scriptLoader(WF_DESIGN_COMPONENT_MODULE_SRC, "module");
        scriptLoader(WF_DESIGN_COMPONENT_SRC, "nomodule");
    }
    componentDidRender() {
        const children = Array.prototype.slice.call(this.host.children);
        children.length > 0 &&
            children.forEach(element => {
                Object.entries(WFCallbacks).forEach(([callbackName, callback]) => {
                    element[callbackName] = callback;
                });
            });
    }
    render() {
        return (h("div", null, h("slot", null)));
    }
    get host() { return getElement(this); }
};

const WFTestComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.handleClick = () => {
            this.logCallback && this.logCallback();
        };
    }
    componentDidLoad() {
        this.onComponentLoaded();
    }
    render() {
        return (h("div", null, "Hello World!", h("wf-button", { type: "button", variant: "primary", onClick: this.handleClick }, h("span", null, "logCallback")), h("wf-select", null, h("wf-select-option", { name: "Option 1", value: "1" }), h("wf-select-option", { name: "Option 2", value: "2" }), h("wf-select-option", { name: "Option 3", value: "3", disabled: true }))));
    }
};

export { WFBridge as wf_bridge, WFTestComponent as wf_test_component };
