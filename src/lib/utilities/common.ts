/* eslint-disable @typescript-eslint/no-explicit-any */

export const hideStr = (str: string) => {
    return '*'.repeat(str.length)
}

export const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const convertBlobUrlToFile = async (blobUrl: string, fileName: string) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName);
}

export const canBeCropped = (url: string) => {
    return ['blob:', 'data:'].indexOf(url.substring(0, 5)) > -1
}