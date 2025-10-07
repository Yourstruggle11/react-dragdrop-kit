# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 08-10-2025

### Added
- **`dropIndicatorPosition` prop** - New optional prop for `DragDropList` component to control drop indicator placement
  - Accepts `"top"` or `"bottom"` (default: `"bottom"`)
  - Allows users to customize where the drop indicator appears when dragging items
  - Available on both `DragDropList` and `DraggableItemWrapper` components

### Fixed
- **TypeScript declaration generation** - Fixed Rollup configuration to properly generate `.d.ts` type definition files
  - Added `declaration: true` to TypeScript plugin in rollup config
  - Updated `package.json` types path to point to correct location (`dist/src/index.d.ts`)
  - Ensures TypeScript consumers get proper type checking and IntelliSense support

### Changed
- Updated Rollup configuration to include TypeScript declaration output
- Updated package.json to correctly reference generated type definitions

## [1.0.0] - 30-08-2025

### Added
- Initial release
- `DragDropList` component for sortable lists with vertical/horizontal support
- `DraggableItemWrapper` component for custom drag-and-drop implementations
- Built on top of `@atlaskit/pragmatic-drag-and-drop`
- Full TypeScript support
- Customizable styling and drag previews
- Drop indicator support
- Comprehensive test suite
