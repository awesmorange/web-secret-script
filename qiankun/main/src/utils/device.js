/**
 * @description 使用用户代理字符串（User - Agent）判断用户的设备类型
 */
export const detectDevice = () => {
    const userAgent = navigator.userAgent;
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /Tablet|iPad|PlayBook/i.test(userAgent);
    // const isDesktop = !isMobile && !isTablet;

    return isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop';
}

/**
 * @description 使用视口尺寸判断用户的设备类型
 */
export const detectDeviceByViewport = () => {
    const width = window.innerWidth;
    if (width < 768) {
        return 'Mobile';
    }
    if (width >= 768 && width < 992) {
        return 'Tablet';
    }
    return 'Desktop';
}

/**
 * @description 使用 CSS 媒体查询判断用户的设备类型
 */
export const detectDeviceByMediaQuery = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
        return 'Mobile';
    } else if (window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
}