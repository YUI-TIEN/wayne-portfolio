#!/bin/bash
sed -i '' 's/window.getComputedStyle(target).cursor === .pointer. ||/target.closest(".cursor-pointer") ||/g' src/App.tsx
