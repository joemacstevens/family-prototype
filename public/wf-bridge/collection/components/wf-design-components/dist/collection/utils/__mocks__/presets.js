const windowConfig = {
    config: {
        presets: {
            drawerLeft: () => {
                return { start: 100, end: 0 };
            },
        },
    },
};
export const checkPreset = (preset) => {
    const windowPreset = windowConfig.config ? windowConfig.config.presets[preset] : null;
    if (!windowPreset) {
        throw new Error(`Drawer preset ${preset} is not exist.`);
    }
    return true;
};
export const getPositionFromPreset = () => {
    return { start: 100, end: 0 };
};
