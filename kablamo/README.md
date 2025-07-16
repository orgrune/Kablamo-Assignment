# Kablamo Assignment - Stopwatch Component

This code fixes the three bugs that were preventing the code from compiling.

## Overview

A React stopwatch component that tracks elapsed time and lap times. The component has been debugged and is now functional.

## Issues Fixed

- Fixed compilation errors that were preventing the code from running

## Recommended Improvements

There are several things I would do differently. This assumes we want to keep it as a class otherwise I recommend we move to a functional component format. The reason for this is that while class is still an accepted approach, the industry has largely moved to function classes.

### 1. State Management
**Current Issue:** Laps are managed as a class property (`this.laps = []`) rather than React state, forcing the use of `forceUpdate()` throughout the code.

**Recommendation:** Move laps to React state and use `setState()` for updates instead of `forceUpdate()`.

### 2. Type Safety
**Current Issue:** Using `any` type for incrementer, laps, and lastClearedIncrement variables.

**Recommendation:** Create a proper state interface:

```typescript
interface StopwatchState {
  secondsElapsed: number;
  lastClearedIncrementer: number | null;
  laps: number[];
}
```

### 3. Simplified Logic
**Current Issue:** Using `lastClearedIncrement` to check if timer is running.

**Recommendation:** Use a simple `isRunning` boolean variable instead of comparing increment values.

### 4. Race Condition Fix
**Current Issue:** Asynchronous bug when pressing start too quickly before state updates, generating multiple timers.

**Recommendation:** Implement proper state management or disable the button during state transitions.

### 5. Component Architecture
**Recommendation:** Consider migrating from class components to functional components with hooks, as this is the current industry standard.

### 6. Testing
**Recommendation:** Add comprehensive test files to ensure component reliability.

## Getting Started

1. Clone the repository
2. Install dependencies
3. Run the application
