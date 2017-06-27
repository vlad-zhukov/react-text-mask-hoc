export const getDisplayName = Comp => Comp.displayName || Comp.name || 'Unknown';

export function type(value) {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
}
