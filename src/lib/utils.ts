export async function checkDeviceCapabilities() {
    // Example implementation
    return 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
} 