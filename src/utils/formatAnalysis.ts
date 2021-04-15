/**
 * Formats analysis name
 *
 * @param analysisName - name of analysis
 * @return formatted analysis
 *
 */
export const formatAnalysis = (analysis: string) =>
  analysis
    .split('_')
    .map((word) => word[0].toUpperCase() + word.substr(1))
    .join(' ');

export default formatAnalysis;
