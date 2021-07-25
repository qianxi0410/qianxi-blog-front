export function getQueryVariable(variable: string): string | undefined {
  const query = window.location.search.substring(1);
  const vars = query.split('&');

  return vars.find(v => v.split('=')[0] === variable)?.split('=')[1];
}
