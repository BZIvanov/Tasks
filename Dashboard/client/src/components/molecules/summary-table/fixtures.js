export const columns = [
  { id: 'robot', label: 'Robot', minWidth: 90 },
  { id: 'country', label: 'ISO\u00a0Code', minWidth: 30, align: 'center' },
  {
    id: 'website',
    label: 'Website',
    minWidth: 120,
  },
  {
    id: 'extractionDate',
    label: 'Extraction Date',
    minWidth: 90,
    align: 'center',
  },
  {
    id: 'count',
    label: 'Count',
    minWidth: 30,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];
