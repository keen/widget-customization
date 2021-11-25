import barTransformation from './bar';
import lineTransformation from './line';
import metricTransformation from './metric';
import funnelTransformation from './funnel';
import circularTransformation from './circular';
import choroplethTransformation from './choropleth';
import heatmapTransformation from './heatmap';
import tableTransformation from './table';
import gaugeTransformation from './gauge';

const chartTransformations = {
  bar: barTransformation,
  line: lineTransformation,
  metric: metricTransformation,
  funnel: funnelTransformation,
  circular: circularTransformation,
  choropleth: choroplethTransformation,
  heatmap: heatmapTransformation,
  table: tableTransformation,
  gauge: gaugeTransformation,
};

export default chartTransformations;
