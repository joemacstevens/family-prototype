export const checkIfPresetExist = (preset) => {
    const windowPreset = window.config ? window.config.presets[preset] : null;
    if (!windowPreset) {
        throw new Error(`Drawer preset ${preset} is not exist.`);
    }
    return true;
};
export const getPositionFromPreset = (preset, position) => {
    let presets;
    if (preset && preset.length > 0) {
        presets = window.config.presets[preset](position);
    }
    return presets || null;
};
