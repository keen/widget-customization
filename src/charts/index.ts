import barTransformation from './bar';
import lineTransformation from './line';
import metricTransformation from './metric';
import funnelTransformation from './funnel';
import circularTransformation from './circular';
import choroplethTransformation from './choropleth';
import heatmapTransformation from './heatmap';

const chartTransformations = {
  bar: barTransformation,
  line: lineTransformation,
  metric: metricTransformation,
  funnel: funnelTransformation,
  circular: circularTransformation,
  choropleth: choroplethTransformation,
  heatmap: heatmapTransformation,
};

export default chartTransformations;
