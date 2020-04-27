import bodyScroll from 'body-scroll-lock';
export const disableBodyScroll = (elem) => bodyScroll.disableBodyScroll(elem, {
    reserveScrollBarGap: true,
});
export const enableBodyScroll = (elem) => {
    bodyScroll.enableBodyScroll(elem);
    bodyScroll.clearAllBodyScrollLocks();
};
