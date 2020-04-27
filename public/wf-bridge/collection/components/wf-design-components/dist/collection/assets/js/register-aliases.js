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
