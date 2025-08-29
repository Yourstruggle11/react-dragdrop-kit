import '@testing-library/jest-dom';

// Polyfill DragEvent for jsdom
class DragEventPolyfill extends Event {
  dataTransfer: DataTransfer;
  
  constructor(type: string, eventInitDict?: EventInit) {
    super(type, eventInitDict);
    this.dataTransfer = {
      dropEffect: 'none',
      effectAllowed: 'uninitialized',
      files: [] as any,
      items: [] as any,
      types: [],
      clearData: jest.fn(),
      getData: jest.fn(),
      setData: jest.fn(),
      setDragImage: jest.fn(),
    } as DataTransfer;
  }
}

// Mock DragEvent globally
global.DragEvent = DragEventPolyfill as any;
