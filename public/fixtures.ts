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
