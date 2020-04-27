// eslint-disable-next-line
export const getIconBody = async (assetName) => {
    if (assetName === 'not-existing') {
        return null;
    }
    return `
    <svg width="20px" height="20px" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="10" fill="#000" />
    </svg>
  `;
};
