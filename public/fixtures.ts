/* eslint-disable @typescript-eslint/camelcase */

export const lineChart = {
  widgetSettings: {
    title: {
      content: 'Monthly MRR',
    },
    subtitle: {
      content: 'Subtitle',
    },
  },
  chartSettings: {
    formatValue: null,
  },
};

export const barChart = {
  chartSettings: {
    formatValue: '${number; 0,0}',
  },
  widgetSettings: {
    card: {
      backgroundColor: '#fff',
      borderRadius: 0,
      hasShadow: true,
      enabled: true,
    },
    subtitle: {
      content: 'Subtitle test',
    },
    title: {
      content: 'Logins by platform test',
    },
    legend: {
      enabled: true,
      position: 'top',
      alignment: 'left',
      layout: 'horizontal',
    },
    theme: {
      gridX: {
        enabled: true,
      },
      gridY: {
        enabled: false,
      },
    },
  },
};

export const tableData = {
  query: {
    analysis_type: 'extraction',
    event_collection: 'book_purchase',
    timeframe: {
      start: '2020-02-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
    timezone: 7200,
  },
  result: [
    {
      date: '2020-12-02',
      name: 'Harry Potter',
      author: 'J.K. Rowling',
      number: 243534,
    },
    {
      date: '2020-12-02',
      name: 'Game of Thrones',
      author: 'George R. R. Martin',
      number: 243534,
    },
    {
      date: '2020-12-02',
      name: 'Love, Anger, Madness',
      author: 'Edwidge Danticat',
      number: 243534,
    },
    {
      date: '2020-12-02',
      name: 'Love, Anger, Madness',
      author: 'Edwidge Danticat',
      number: 243534,
    },
    {
      date: '2020-12-02',
      name: 'Game of Thrones',
      author: 'George R. R. Martin',
      number: 243534,
    },
    {
      date: '2020-12-02',
      name: 'Game of Thrones',
      author: 'George R. R. Martin',
      number: 243534,
    },
  ],
};
