export const NODE_TYPES = {
  TEXT: 'textNode',
} as const;

export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES];
