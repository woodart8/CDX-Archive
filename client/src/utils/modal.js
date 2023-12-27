export const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = 'sticky';
    document.body.style.width = '100%';
    document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
    document.body.style.overflowY = 'hidden';
    return currentScrollY;
};
  
export const allowScroll = (prevScrollY) => {
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, prevScrollY);
};