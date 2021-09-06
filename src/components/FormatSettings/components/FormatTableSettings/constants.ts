export enum DataTypes {
  notDefined = 'not-defined',
  string = 'string',
  number = 'number',
  dateTime = 'datetime',
  boolean = 'boolean',
}

export const DATA_TYPES = [
  {
    label: 'Select',
    value: DataTypes.notDefined,
  },
  {
    label: 'datetime',
    value: DataTypes.dateTime,
  },
  {
    label: 'number',
    value: DataTypes.number,
  },
  {
    label: 'string',
    value: DataTypes.string,
  },
  // {
  //   label: 'boolean',
  //   value: DataTypes.boolean,
  // },
];
