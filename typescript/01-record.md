```
const mapIcons = {
  cube: <CubeIcon />,
  clock: <ClockIcon />,
  grid: <GridIcon />,
} as const

type IconName = keyof typeof mapIcons

// IconName => 'cube' | 'clock' | 'grid'
```
